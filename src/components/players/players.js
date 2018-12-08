import React, { Component } from 'react'
import axios from 'axios';
import './players.css'

import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";


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

    handleChange(prop, val) {
        // console.log(val)
        this.setState({
            [prop]: val
        })
    }

    addNewPlayer() {
        console.log('add player button clicked')
        let newPlayer = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            team: this.state.team,
            position: this.state.position
        }
        // let {firstName, lastName,team, position} = this.state
        axios.post('/api/players', newPlayer)
            .then((res) => {
                this.setState({
                    players: res.data
                })
            })
        document.getElementById("createPlayerForm").reset();
    }


    render() {

        // console.log(this.state.players);
        // console.log(this.state.players[0].firstName)
        let displayPlayers = this.state.players.map(player => {
            return (
                // <p key={player.id}>{`${player.firstName} ${player.lastName}`}</p>
                <div className='player-container' key={player.id}>
                    <div className="playerData">{`${player.firstName} ${player.lastName}`}</div>
                    <div className="playerData">{player.team}</div>
                    <div className="playerData">{player.position}</div>
                    <div className="playerData playerControls"><FaPencilAlt /> <FaTrashAlt /></div>
                </div>
            )
        })

        return (
            <div>
                <div className='input-container'>
                    <form id="createPlayerForm">
                        <input placeholder="First Name"
                            onChange={(e) => this.handleChange('firstName', e.target.value)}
                        ></input>
                        <input placeholder="Last Name"
                            onChange={(e) => this.handleChange('lastName', e.target.value)}
                        ></input>
                        <input placeholder="Team"
                            onChange={(e) => this.handleChange('team', e.target.value)}
                        ></input>
                        <input placeholder="Position"
                            onChange={(e) => this.handleChange('position', e.target.value)}
                        ></input>
                        <button
                            onClick={() => this.addNewPlayer()}>Add New Player</button>
                    </form>
                </div>
                <div className="list-container">
                    <div className="player-container">
                        <div className="playerHeader playerData">Player Name</div>
                        <div className="playerHeader playerData">Current Team</div>
                        <div className="playerHeader playerData">Position</div>
                        <div className="playerHeader playerData playerControls"></div>
                    </div>
                </div>
                {displayPlayers}
            </div>
        )
    }

}

export default Players;