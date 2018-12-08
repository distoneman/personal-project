const express = require('express');

const PORT = 4000;
const ctrl = require('./controllers/controller.js')

const app = express();
 
app.use(express.json());

app.get('/api/players', ctrl.getAllPlayers)
app.post('/api/players', ctrl.createOnePlayer)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));