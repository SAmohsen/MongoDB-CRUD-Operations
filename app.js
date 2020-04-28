
/**Loading Express From Node Modules For Creating Web Server */
const express = require('express')
const server = express()

/**Load My DB  Module */
const db = require('./db')

/**Load My EnvironMental Variables */
const dotenv = require('dotenv')
dotenv.config();



/** 
 * so I Created A new Database within Atlas UI called  Football and that 
 * Contain Only  One Collection Called players
 */

let FootballDataBase = "Football"
let playerCollection = "players"


db.dbConnectMyDataBase(process.env.CONNECTIONSTRING, FootballDataBase, function () {
    server.listen(process.env.PORTNUMBER);
})



server.get('/', function (req, res) {
    res.send(`Test DataBase `);
})

server.get('/create', function (req, res) {
    db.dbCreateDocument(playerCollection, { playerName: "Messi", club: "FCB" });
    db.dbCreateDocument(playerCollection, { playerName: "Alba", club: "FCB" });
    db.dbCreateDocument(playerCollection, { playerName: "salah", club: "LIV" });
    db.dbCreateDocument(playerCollection, { playerName: "Nymar", club: "PSG " });
    res.send(`Players Have Been Created `);

})

server.get('/AllPlayers', function (req, res) {
    db.dbReadDocuments(playerCollection, function (players) {
        res.send(players);
    })
})
server.get('/FCB', function (req, res) {
    db.dbFindDocumentSMatchedThisProperties(playerCollection, { club: "FCB" }, function (players) {
        res.send(players);
    })
})

server.get('/update', function (req, res) {
    let Nymarid = "5ea80795178ed922985cbb93"
    db.dbUpdateDocument(playerCollection,Nymarid ,{ club: "FCB" })
    res.send(`ok`);
})


