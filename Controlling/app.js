const http = require("http");
const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Wähle den gewünschten Port

app.use(cors({ origin: '*' ,
              methods: 'GET,POST,PUT,DELETE', // Gültige HTTP-Methoden
               allowedHeaders: 'Content-Type,Authorization', // Erlaubte Header
})); // Hier wird die Herkunft auf "*" gesetzt

// Statische Dateien im "H:\Web_dev\Controlling" Verzeichnis servieren
app.use(express.static('H:\\Web_dev\\Controlling'));

 
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});