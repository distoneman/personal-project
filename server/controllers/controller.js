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
        console.log(deleteId)
        const playerIndex = players.findIndex(
            player => player.id == deleteId)
        players.splice(playerIndex, 1);
        res.status(200).send(players)

    },

    updatePlayer: (req, res) => {
        const updateId = req.body.id;
        console.log(req.params.id)
        const playerIndex = players.findIndex(
            player => player.id == updateId
        );
        // let player = players[playerIndex]
        // players.splice(playerIndex, 1);
        players[playerIndex].firstName = req.body.firstName
        players[playerIndex].lastName = req.body.lastName
        players[playerIndex].team = req.body.team
        players[playerIndex].position = req.body.position

        res.status(200).send(players)
    }
}    
