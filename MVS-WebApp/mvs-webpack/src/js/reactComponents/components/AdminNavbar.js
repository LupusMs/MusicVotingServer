import React from 'react';
import { Navbar } from './Navbar';

export class AdminNavbar extends Navbar {
    render() {
        return (
            <div className="navbar">
                <img src="img/icon.png" onClick={() => this.props.buttonClicked("home")}></img>
                <button className="navigationbar-items collapsable" onClick={() => this.props.buttonClicked("allSongs")}>All Songs</button>
                <button className="navigationbar-items collapsable" onClick={() => this.props.buttonClicked("currentSong")}>Current Song</button>
                <button className="navigationbar-items collapsable" onClick={() => this.props.buttonClicked("mostlyVoted")}>Mostly votted</button>
                <div className="navigationbar-username">{this.state.user}</div>
            </div>
        )
    }
}
