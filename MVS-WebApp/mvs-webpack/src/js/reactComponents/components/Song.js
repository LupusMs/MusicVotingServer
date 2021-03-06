import React from 'react';
import { deleteSong, updateSong } from '../../api'

export class Song extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editModeOn: false,
            artist: props.data.artist,
            title: props.data.title,
        }
    }

    handleSongDelete() {
        const updatedSonglist = this.removeIndexFromArray(this.props.idx, this.props.songlist);
        deleteSong(this.props.data.id).then(() => this.props.setSongList(updatedSonglist));
    }

    removeIndexFromArray(index, array) {
        const newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (i !== index) {
                newArray.push(array[i]);
            }
        }

        return newArray;
    }

    changeValueInArray(index, array, keys, values) {
        const newArray = [];
        for (let i = 0; i < array.length; i++) {
            newArray.push(array[i]);
        }
        for (let i = 0; i < keys.length; i++) {
            newArray[index][keys[i]] = values[i];
        }

        return newArray;
    }

    handleSongUpdate() {
        this.switchEditMode();
        if ((this.state.artist === this.props.data.artist) && (this.state.title === this.props.data.title)) {
            return;
        }
        const newSongList = this.changeValueInArray(
            this.props.idx,
            this.props.songlist,
            ["artist", "title"],
            [this.state.artist, this.state.title]
        );
        updateSong(this.props.data.id, { artist: this.state.artist, title: this.state.title })
            .then(() => this.props.setSongList(newSongList));
    }

    handleInputFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    switchEditMode() {
        this.setState({ editModeOn: !this.state.editModeOn });
    }

    render() {
        const isEditable = this.props.isEditable;
        if (this.props.data) {
            if (!this.props.data.filename) {
                return (
                    <div className='song'>{this.props.data}</div>
                )
            } else {
                const artist = this.props.data.artist ? this.props.data.artist : this.props.data.filename;
                const title = this.props.data.title ? this.props.data.title : '...';
                return (
                    <div className='song' onClick={() => this.props.onClick ? this.props.onClick(this.props.data.filename) : null}>
                        <div className='artist'>{this.state.editModeOn ? <input type="text" onChange={(e) =>this.handleInputFieldChange(e)} name="artist" defaultValue={artist}></input> : artist}</div>
                        <div className='image'>
                            <img width='100%' src={this.props.data.albumImage ?
                                'data:image/png;base64,' + this.props.data.albumImage :
                                'img/no-image.png'} />
                        </div>
                        <div className='song-name'>{this.state.editModeOn ? <input type="text" onChange={(e) =>this.handleInputFieldChange(e)} name="title" defaultValue={title}></input> : title}</div>
                        {isEditable &&
                            <span id='song-options'>
                                <img src='img/delete.png' width="24px" onClick={(event) => { event.stopPropagation(); this.handleSongDelete() }}></img>
                                <img src='img/edit.png' width="24px" onClick={(event) => { event.stopPropagation(); this.switchEditMode() }}></img>
                                <img src='img/accept.png' width="24px" onClick={(event) => { event.stopPropagation(); this.handleSongUpdate() }}></img>
                            </span>
                        }
                    </div>
                )
            }
        } else {
            return (
                <div></div>
            )
        }
    }
}
