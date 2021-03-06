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
            teamNames: [],
            firstName: '',
            lastName: '',
            team: '',
            position: '',
            id: null
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
        axios.get('/api/teams')
            .then(res => {
                this.setState({
                    teamNames: res.data
                })
            })
        document.getElementById('btnUpdate').style.visibility = 'hidden';

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
        axios.delete(`/api/players/?id=${id}`)
            .then(res => {
                this.setState({
                    players: res.data
                })
            })
    }

    editPlayer(id) {
        console.log('Edit Player function')
        document.getElementById('btnAdd').style.visibility = 'hidden';
        document.getElementById('btnUpdate').style.visibility = 'visible';
        const playerIndex = this.state.players.findIndex(
            player => player.id === id
        )
        // let player = this.state.players[playerIndex]
        this.setState({
            buttonText: 'Update Player',
            id: id,
            lastName: this.state.players[playerIndex].lastName,
            firstName: this.state.players[playerIndex].firstName,
            team: this.state.players[playerIndex].team,
            position: this.state.players[playerIndex].position
        })
        console.log(id)
    }

    updatePlayer(id) {
        console.log(`update player ${this.state.id}`)
        let updatePlayer = {

            firstName: this.state.firstName,
            lastName: this.state.lastName,
            team: this.state.team,
            position: this.state.position
        }
        console.log(updatePlayer)
        axios.put(`/api/players/${id}`, updatePlayer)
            .then(res => {
                this.setState({
                    players: res.data
                })
            })
    }

    filterByTeam(val){
        console.log(val)
        
        axios.get(`/api/teamsFilter/${val}`)
            .then(res => {
                // console.log(res)
                this.setState({
                    players: res.data
                })
        })
        console.log("players on state = " + this.state.players)
    }

    render() {
        let teamList =
            this.state.teamNames.sort().map(team => {
                return (
                    <option key={team} value={team}>{team}</option>
                )
            })

        return (
            <div>
                <div>
                    <form id="playerForm">
                        <div className='input-container'>
                            <div className='input-elements'>
                                <input className='player-input'
                                    placeholder="First Name" value={this.state.firstName}
                                    onChange={(e) => this.handleChange('firstName', e.target.value)}
                                ></input>
                            </div>
                            <div className='input-elements'>
                                <input className='player-input'
                                    placeholder="Last Name" value={this.state.lastName}
                                    onChange={(e) => this.handleChange('lastName', e.target.value)}
                                ></input>
                            </div>
                            <div className='input-elements'>
                                <select className='player-input' name="team"
                                    id="team" value={this.state.team}
                                    onChange={(e) => this.handleChange('team', e.target.value)}>
                                    <option value="">Select Team</option>
                                    {/* <option value="Dodgers">Dodgers</option>
                                    <option value="Yankees">Yankees</option>
                                    <option value="Boston">Boston</option>
                                    <option value="Angels">Angels</option> */}
                                    {teamList}
                                </select>
                            </div>
                            <div className='input-elements'>
                                <input className='player-input'
                                    placeholder="Position" value={this.state.position}
                                    onChange={(e) => this.handleChange('position', e.target.value)}
                                ></input>
                            </div>
                            <div className='input-elements'>
                                <button id="btnAdd"
                                    onClick={() => this.addNewPlayer()}>Add New Player
                                </button>
                                <button id="btnUpdate"
                                    onClick={() => this.updatePlayer(this.state.id)}>Update Player
                                </button>
                            </div>
                        </div>
                        {/* <Button buttonAction={this.state.buttonAction}>{this.state.buttonText}</Button> */}

                    </form>
                </div>
                <DisplayPlayersList list={this.state.players}
                    deletePlayer={this.deletePlayer}
                    editPlayer={this.editPlayer}
                // updatePlayer={this.updatePlayer} 
                />

                <form>
                    <select name="teams" id="teams"
                        onChange={(e)=>this.filterByTeam(e.target.value)}>
                        <option value=''>Select Team</option>
                        <option value="Angels">Angels</option>
                        <option value="Dodgers">Dodgers</option>
                        <option value="Giants">Giants</option>
                        <option value="Rockies">Rockies</option>
                        <option value="Yankees">Dodgers</option>
                    </select>
                </form>
            </div>
        )
    }

}

export default Players;