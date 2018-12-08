import React, { Component } from 'react';
// import './displayPlayers.css'
import '../players/players.css'


import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

class DisplayPlayersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: props.list,
            test: props.test

        }
    }
    render() {
        let displayPlayers = this.props.list.map(player => {
            return (
                // <p key={player.id}>{`${player.firstName} ${player.lastName}`}</p>
                <div className='player-container' key={player.id}>
                    <div className="playerData">{`${player.firstName} ${player.lastName}`}</div>
                    <div className="playerData">{player.team}</div>
                    <div className="playerData">{player.position}</div>
                    <div className="playerData playerControls">
                        <span className="player-control-icons" onClick={() => this.editPlayer(player.id)}><FaPencilAlt /></span>
                        <span className="player-control-icons" onClick={() => this.props.deletePlayer(player.id)}><FaTrashAlt /></span>
                    </div>
                </div>
            )
        })

        return (
            <div>
            {displayPlayers}

            </div>
        )
    }

}

export default DisplayPlayersList;
