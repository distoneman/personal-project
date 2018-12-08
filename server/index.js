const express = require('express');

const PORT = 4000;
const ctrl = require('./controllers/controller.js')

const app = express();
 
app.use(express.json());

app.get('/api/players', ctrl.getAllPlayers)
app.post('/api/players', ctrl.createOnePlayer)
app.delete('/api/players', ctrl.deleteOnePlayer)
app.put('/api/players', ctrl.updatePlayer)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));