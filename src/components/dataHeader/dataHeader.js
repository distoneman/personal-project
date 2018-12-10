import React, { Component } from 'react';
import '../players/players.css'

class DataHeader extends Component {
    render() {
        return (
            <div>
                <div className="list-container">
                    <div className="player-container">
                        <div className="playerHeader playerData">Player Name</div>
                        <div className="playerHeader playerData">Current Team</div>
                        <div className="playerHeader playerData">Position</div>
                        <div className="playerHeader playerData playerControls"></div>
                    </div>
                </div>
            </div>
                )
            }
        }
        
export default DataHeader;