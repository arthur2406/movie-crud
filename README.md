## Movie CRUD

# Prerequisites to run the project
  1. Create _.env_ file in the root folder and set following variables
  ```
PGUSER=<postgres username>
PGPASSWORD=<password>
PGDATABASE=<database>
PGPORT=<port>
PGHOST=<host>
PORT=<port for the server>

```

2.Set up PostgreSQL database on your machine

3.Install all packages with _npm install_ command

4. Run db.sql in your pg cli to create neccessary tables

5. Run the _npm start_ command to run the server

Examples of API routes are in _WebbyLab.postman_collection.json_ file

## Architecture:

All route handling happens in _movieRoutes.js_, the data is extracted from completely separate data access layer in _repository.js_