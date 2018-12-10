import React, {Component} from 'react';
import './header.css'
import baseball from './../../images/baseball.png'

function Header(){
        return (
            <div className='header'>
                <img className='image-baseball' src={baseball} alt="baseball graphic"/>
                <h2>Team Players</h2>
            </div>
        )

}

export default Header;