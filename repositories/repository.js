'use strict';

const { Pool } = require('pg');

class DBConnectionError extends Error {
  constructor(args) {
    super(args);
    this.name = 'DatabaseError';
  }
}

class Repository {

    static tableNameMovie = 'Movie';

    
    static tableNameStar = 'Star';


    static tableNameStarMovie = 'StarMovie'; 
    

    constructor() {
        this.pool = new Pool();
    }


    async _getClient() {
        try {
            const client = await this.pool.connect();
            return client;
        } catch  (err) {
            throw new DBConnectionError('Database connection error occured');
        }
    }


    async _query(sqlString) {
        try {
            const client = await this._getClient();
            const { rows } = await client.query(sqlString);
            client.release();
            return rows;
        } catch (err) {
            throw err;
        }
    }


    async getMovieById(movieId) {
        try {
            if (movieId == null) throw new Error('movieId is not set.');
            const sqlString = `SELECT * FROM ${Repository.tableNameMovie} WHERE id = ${movieId}`;
            const movie = (await this._query(sqlString))[0];
            return movie;
        } catch (err) {
            throw new Error('Database error');
        }
    }


    async getMovies(title, starName) {
        try {
            let whereClause = '';
            if (title != null && starName == null) whereClause = `WHERE m.title = '${title}' `;
            else if (title != null && starName != null) whereClause = `WHERE m.title = '${title}' AND s.fullName LIKE '${starName}%' `;
            else if (title == null && starName != null) whereClause = `WHERE s.fullName LIKE '${starName}%' `;
            
            let sqlString = `SELECT m.id as "movieId", m.title as title, m.releaseYear as "releaseYear", m.format as format, s.fullName as "starName" FROM ${Repository.tableNameMovie} m `
            + `join ${Repository.tableNameStarMovie} sm on m.id = sm.movieId `
            + `join ${Repository.tableNameStar} s on sm.starId = s.id `;
            if (whereClause.length !== 0) sqlString += whereClause;
            sqlString += `ORDER BY m.title`;

            const rows = await this._query(sqlString);

            const moviesWithNames = [];

            let lastMovieId = -1;
            rows.forEach(row => {
                if (row.movieId !== lastMovieId) {
                    moviesWithNames.push({
                        movieId: row.movieId,
                        title: row.title,
                        releaseYear: row.releaseYear,
                        format: row.format,
                        stars: [
                            {
                                fullName: row.starName 
                            }
                        ]
                    })

                lastMovieId = row.movieId;
                } else {
                    moviesWithNames[moviesWithNames.length - 1].stars.push({
                        fullName: row.starName
                    });
                }
            });

            return moviesWithNames;
        } catch (err) {
            throw new Error('Database error');
        }
    }


    async createMovie(movieTitle, releaseYear, movieFormat, starNames) {
        try {
            
            const starNamesSqlValues = starNames
                .map((starName) => `('${starName}')`)
                .join(',');

            const sqlStringMovie = `INSERT INTO ${Repository.tableNameMovie} (title, releaseYear, format) `
            + `VALUES ('${movieTitle}', ${releaseYear}, '${movieFormat}') RETURNING *`;

            const createdMovie = (await this._query(sqlStringMovie))[0]; 
            
            const sqlStringStars = `INSERT INTO ${Repository.tableNameStar} (fullName) `
            + `VALUES ${starNamesSqlValues} ON CONFLICT DO NOTHING`;
            
            await this._query(sqlStringStars);

            const starNamesJoined = starNames
                .map((name) => `'${name}'`)
                .join(',');

            const sqlStringStarIds = `SELECT id from ${Repository.tableNameStar} where fullName in (${starNamesJoined})`;

            const starIds = await this._query(sqlStringStarIds);

            const starMovieSqlValues = starIds
                .map(({ id }) => `(${createdMovie.id}, ${id})`)
                .join(',');

            const sqlStringStarMovie = `INSERT INTO ${Repository.tableNameStarMovie} (movieId, starId) `
            + ` VALUES ${starMovieSqlValues}`;

            await this._query(sqlStringStarMovie);

            return createdMovie;

        } catch (err) {
            throw new Error('Database error: ' + err);
        }
    }
  

    async deleteMovie(movieId) {
        try {
            if (movieId == null) throw new Error('movieId is not set.');
            const sqlString = `DELETE FROM ${Repository.tableNameMovie} WHERE id = ${movieId} RETURNING *`;
            const movie = (await this._query(sqlString))[0];
            return movie;
        } catch (err) {
            throw new Error('Database error');
        }
    }
  
  

  
}

module.exports = new Repository();