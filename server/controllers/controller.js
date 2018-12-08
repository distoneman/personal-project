let id = 3;
let players = [
    {
        id: 0,
        firstName: 'Justin',
        lastName: 'Turner',
        team: 'Dodgers',
        position: '3rd Base'
    },
    {
        id: 1,
        firstName: 'Bryce',
        lastName: 'Harper',
        team: 'Nationals',
        position: 'Right Field'
    },
    {
        id: 2,
        firstName: 'Mickey',
        lastName: 'Mouse',
        team: 'Angels',
        position: 'Pitcher'
    }
]

module.exports = {
    getAllPlayers: (req, res) => {
        res.status(200).send(players) //send response status and array
    },

    createOnePlayer: (req, res) => {

        players.push({
            id: id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            team: req.body.team,
            position: req.body.position
        })
        id++
        res.status(200).send(players)
    },

    deleteOnePlayer: (req, res) => {
        const deleteId = req.params.id;
        const playerIndex = players.findIndex(
            player => player.id == deleteId)
        players.splice(playerIndex,1);
        res.status(200).send(players)

    },

    updatePlayer: (req, res) => {
        const{text} = req.body;
        const updateID = req.params.id;
        const playerIndex = players.findIndex(
            player => player.id == updateID
        );
        let player = players[playerIndex]

        players[playerIndex] = {
            id: player.id,
            firstName: player.firstName,
            lastName: player.lastName,
            team: player.team,
            position: player.position
            // text: text || message.text,
        }
        res.status(200).send(players)
    },


}    
