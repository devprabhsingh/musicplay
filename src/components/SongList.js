import React, { Component } from 'react'

export default class SongList extends Component {


    sendToPlayer = (e)=>{
        this.props.sendToPlayer(this.props.songs[e.currentTarget.id])
    }

    playRandom=()=>{
        const rand = Math.round(Math.random()*25);
        this.props.sendToPlayer(this.props.songs[rand])
    }


    render() {
        return (
            <div id="songlist">
                <div id="headbar">
                    <button className="playRandom" onClick={this.playRandom}> 
                    Random Play
                    <i className="fas fa-random"></i>
                    </button>
                    <p id="songsCount">25 songs</p>
                </div>
                <div id="songs">
                    {this.props.songs.map((song,index)=>(
                        <div className="song" id={index} key={index} onClick={(e)=>this.sendToPlayer(e)}>
                            <div>
                       <h4 className="songtitle">{song.title}</h4>
                      <p className="songartist">{song.artist.name}</p>   
                      </div>
                      <p><i className="far fa-heart" onClick={(e)=>{e.target.style.color="crimson"}}></i></p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
