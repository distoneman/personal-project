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
    }

}    
