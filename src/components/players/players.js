import React, { Component } from 'react'
import axios from 'axios';
import './players.css';
import DisplayPlayersList from '../displayPlayers/displayPlayers.js';
// import Button from '../button/button.js'


class Players extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [],
            // id: null,
            firstName: '',
            lastName: '',
            team: '',
            position: '',
            buttonText: 'Add New Player!',
            buttonAction: ''
        }
        // this.state.players = this.state.players.bind(this)
        this.deletePlayer = this.deletePlayer.bind(this)
        this.editPlayer = this.editPlayer.bind(this)
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
        document.getElementById("playerForm").reset();
    }

    deletePlayer(id) {
        console.log('Delete Player function')
        console.log(id)
        axios.delete(`/api/players/?${id}`)
            .then(res => {
                this.setState({
                    players: res.data
                })
            })
    }

    editPlayer(id) {
        console.log('Edit Player function')
        document.getElementById('btnAdd').style.visibility = 'hidden';
        const playerIndex = this.state.players.findIndex(
            player => player.id === id
        )
        // let player = this.state.players[playerIndex]
        this.setState({
            buttonText: 'Update Player',
            id:id,
            lastName: this.state.players[playerIndex].lastName,
            firstName: this.state.players[playerIndex].firstName,
            team: this.state.players[playerIndex].team,
            position: this.state.players[playerIndex].position
        })
        console.log(id)
    }

    updatePlayer() {
        console.log(`update player ${this.state.id}`)
        let updatePlayer = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            team: this.state.team,
            position: this.state.position
        }
        console.log(updatePlayer)
        axios.put(`/api/players/`, updatePlayer )
            .then(res =>{
                this.setState({
                    players: res.data
                })
            })

    }

    render() {
        // console.log(this.state.players);
        // console.log(this.state.players[0].firstName)
        // let displayPlayers = this.state.players.map(player => {
        //     return (
        //         // <p key={player.id}>{`${player.firstName} ${player.lastName}`}</p>
        //         <div className='player-container' key={player.id}>
        //             <div className="playerData">{`${player.firstName} ${player.lastName}`}</div>
        //             <div className="playerData">{player.team}</div>
        //             <div className="playerData">{player.position}</div>
        //             <div className="playerData playerControls">
        //                 <span className="player-control-icons" onClick={() => this.editPlayer(player.id)}><FaPencilAlt /></span>
        //                 <span className="player-control-icons" onClick={() => this.deletePlayer(player.id)}><FaTrashAlt /></span>
        //             </div>
        //         </div>
        //     )
        // })

        return (
            <div>
                <div className='input-container'>
                    <form id="playerForm">
                        <input placeholder="First Name" value={this.state.firstName}
                            onChange={(e) => this.handleChange('firstName', e.target.value)}
                        ></input>
                        <input placeholder="Last Name" value={this.state.lastName}
                            onChange={(e) => this.handleChange('lastName', e.target.value)}
                        ></input>
                        {/* <input placeholder="Team"
                            onChange={(e) => this.handleChange('team', e.target.value)}
                        ></input> */}
                        <select name="team" id="team" value={this.state.team}
                            onChange={(e) => this.handleChange('team', e.target.value)}>
                            <option value="">Select Team</option>
                            <option value="Dodgers">Dodgers</option>
                            <option value="Yankees">Yankees</option>
                            <option value="Boston">Boston</option>
                            <option value="Angels">Angels</option>
                        </select>
                        <input placeholder="Position" value={this.state.position}
                            onChange={(e) => this.handleChange('position', e.target.value)}
                        ></input>
                        <button id="btnAdd"
                            onClick={() => this.addNewPlayer()}>{this.state.buttonText}
                        </button>
                        <button
                            onClick={() => this.updatePlayer()}>Update
                        </button>
                        {/* <Button buttonAction={this.state.buttonAction}>{this.state.buttonText}</Button> */}

                    </form>
                </div>
                {/* <div className="list-container">
                    <div className="player-container">
                        <div className="playerHeader playerData">Player Name</div>
                        <div className="playerHeader playerData">Current Team</div>
                        <div className="playerHeader playerData">Position</div>
                        <div className="playerHeader playerData playerControls"></div>
                    </div>
                </div> */}
                {/* {displayPlayers} */}
                <DisplayPlayersList list={this.state.players}
                    deletePlayer={this.deletePlayer}
                    editPlayer={this.editPlayer} />
            </div>
        )
    }

}

export default Players;