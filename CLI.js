// 'use strict';

// // Run db.
// require('child_process').exec("start-db-server.bat",  (err, stdout, stderr) => {
//     if (err) {
//         // Ooops.
//         // console.log(stderr);
//         return console.log(err);
//     }

//     // Done.
//     console.log(stdout);
// });

// // Run server.
// require('./index.js');
// const readline = require('readline');
// const axios = require('axios');

// const TerminalMenu = require('simple-terminal-menu');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// const menu = new TerminalMenu({
//     autoStart: false
// });

// menu.start(process);

// menu.addItem({
//     label: 'Get movie by id', 
//     handler: (label, index, item) => {
//         rl.question("Enter ID: ", (id) => {
//             http.get('http://localhost:3000/api/movies/' + id, (resp) => {
//                 let data = '';

//                 // A chunk of data has been received.
//                 resp.on('data', (chunk) => {
//                     data += chunk;
//                 });

//                 // The whole response has been received. Print out the result.
//                 resp.on('end', () => {
//                     console.log(JSON.parse(data));
//                 });
//             });
//             rl.close();
//         });
//     }
//   })


//const textOptions = `1:\n2:\n3:\n4:\n`;

// rl.question(textOptions, (optionId) => {
//     switch (parseInt(optionId, 10)) {
//         case 1:
//             rl.question('Enter movie ID: ', (id) => {
//                 axios.get('http://localhost:3000/api/movies/' + id)
//                     .then(result => {
//                         console.log(JSON.parse(result));
//                     })
                
//             rl.close();
//         });
//     }
// });


