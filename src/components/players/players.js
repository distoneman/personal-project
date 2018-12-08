import React, { Component } from 'react'
import axios from 'axios';


class Players extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [],
            firstName: '',
            lastName: '',
            team: '',
            position: ''
        }
        // this.state.players = this.state.players.bind(this)

    }
    componentDidMount() {
        axios.get('/api/players')
            .then(res => {
                // console.log(res)
                this.setState({
                    players: res.data
                })
            })
    }

    handleChange(prop,val){
        // console.log(val)
        this.setState({
            [prop]: val
        })
    }

    addNewPlayer(){
        console.log('add player button clicked')
        let newPlayer = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            team: this.state.team,
            position: this.state.position
        }
        axios.post('/api/players',{newPlayer})
            .then((res) => {
                this.setState({
                    players: res.data
                })
            })
    }


    render() {

        // console.log(this.state.players);
        // console.log(this.state.players[0].firstName)
        let displayPlayers = this.state.players.map(player => {
            return (
                <p key={player.id}>{`${player.firstName} ${player.lastName}`}</p>
            )
        })

        return (
            <div>
                <div className='input-container'>
                    <input placeholder="First Name"
                        onChange={(e) => this.handleChange('firstName',e.target.value)}
                    ></input>
                    <input placeholder="Last Name"
                        onChange={(e)=> this.handleChange('lastName',e.target.value)}
                    ></input>
                    <input placeholder="Team"
                        onChange={(e)=>this.handleChange('team',e.target.value)}
                    ></input>
                    <input placeholder="Position"
                        onChange={(e)=>this.handleChange('position', e.target.value)}
                    ></input>
                    <button
                        onClick={()=>this.addNewPlayer()}>Add New Player</button>
                </div>
                {displayPlayers}
            </div>
        )
    }

}

export default Players;