import React, { Component } from 'react'

export default class Player extends Component {

    state={
        play:false,
        mute:false,
        shuffle:false
    }
    
    playSong=()=>{
        const song = document.getElementById("music");
        const playpause = document.getElementById("playpausebutton");
        if(this.state.play){
            song.pause();
            playpause.classList.remove("fa-pause");
            playpause.classList.add("fa-play");
            this.setState({
                play:false
            })
        }
        else{
            song.play();
            
            playpause.classList.remove("fa-play");
            playpause.classList.add("fa-pause");
            this.setState({
                play:true
            })
        }       
    }

    componentDidMount(){
        this.showSongList("e");
        }
    

    componentDidUpdate(prevProps, prevState) {

        if (prevProps !== this.props) {
            const song = document.getElementById("music");
            const playpause = document.getElementById("playpausebutton");
            document.getElementById("music").load();
            song.play();
            playpause.classList.remove("fa-play");
            playpause.classList.add("fa-pause");
            this.setState({
                play:true
            })
            if(window.innerWidth<600){
                document.getElementById("songtitle").innerHTML = `${this.props.song.title.substring(0,13)}...`;
                   

        }

    }
}


    muteVol=(e)=>{
        if(this.state.mute){
            document.getElementById("music").volume = document.getElementById("volrangebar").value/100;
            e.target.classList.add("fa-volume-up");
            e.target.classList.remove("fa-volume-mute");
            this.setState({
                mute:false
            })
        }else{
            document.getElementById("music").volume = 0;
            e.target.classList.add("fa-volume-mute");
            e.target.classList.remove("fa-volume-up");
            this.setState({
                mute:true
            })
        }  
    }


    changeVol=(e)=>{
       document.getElementById("music").volume = e.target.value/100;
    }

    updateTime=(e)=>{
        document.getElementById('tracktime').innerHTML = e.target.currentTime<9.9 ?
        "0:0"+Math.floor(e.target.currentTime+1) : "0:"+Math.floor(e.target.currentTime+1);
        document.getElementById("rangebar").value = document.getElementById("music").currentTime*3.33;
    }
   
    updateSongTime=(e)=>{
        document.getElementById("music").currentTime=e.target.value/3.33;
    }

    repeatShuffle=(e)=>{
        if(this.state.shuffle){
        document.getElementById("tooltip").innerHTML="shuffle on";
        document.getElementById("tooltip").style.display="block";
        e.target.classList.remove("fa-shuffle");
        e.target.classList.add("fa-redo")
        this.setState({
            shuffle:false
        })
        }else{
        document.getElementById("tooltip").innerHTML="repeat on";
        document.getElementById("tooltip").style.display="block";
            e.target.classList.remove("fa-redo");
            e.target.classList.add("fa-shuffle")
            this.setState({
                shuffle:true
            })
        }
        setTimeout(()=>{
        document.getElementById("tooltip").style.display="none";
        },1000)
    }

    showInfo=()=>{
        const el = document.getElementById("infobox");
        if(el.style.display==="none")
            el.style.display="flex";
        else
            el.style.display="none";
    }

    changePlayPauseIcons=()=>{
        const playpause = document.getElementById("playpausebutton")
        playpause.classList.remove("fa-pause");
        playpause.classList.add("fa-play");
        this.setState({
            play:false
        })
    }

    // function to play the next and previous song from the list
    playnext=(order)=>{
        this.props.playnext(this.props.song,order);
    }

    showMusicPlayer=(e)=>{
        document.querySelector("#mobilestyles").remove();
        e.target.style.display="none";
        document.getElementById("songlist").style.display="none";
    }

    showSongList=(e)=>{
        if(window.innerWidth<600){
        const css=document.createElement("link");
            css.setAttribute("rel", "stylesheet");
            css.setAttribute("id","mobilestyles")
            css.setAttribute("type", "text/css");
            css.setAttribute("href", "mobileplayer.css");
            document.body.appendChild(css);
            document.getElementsByClassName("fa-angle-up")[0].style.display="block";
            document.getElementById("songlist").style.display="block";
    }else{
        document.getElementsByClassName("fa-angle-up")[0].style.display="none";
        document.getElementsByClassName("fa-angle-down")[0].style.display="none";
    }
}

    render() {
        const song = this.props.song;
        return (
            <div id="player">
                <i className="fas fa-angle-down" onClick={(e)=>this.showSongList(e)}></i>
               <div id="thumbnail">
                    <img alt="song"
                     src={song.album.cover_medium}/>
                </div>
                
                <i className="fas fa-music"></i>
                <p id="songtitle">{song.title}</p>
                <i className="far fa-heart fav"onClick={(e)=>{e.target.style.color="crimson"}}></i>
            
                <div id="infobox">
                    <p>Title : <span>{song.title}</span></p>
                    <p>Artist: <span>{song.artist.name}</span></p>
                    <p>Album : <span>{song.album.title}</span></p>
                    <p>Rank : <span>{song.rank}</span></p>
                </div>
                <div id="musicplayer">
                <div id="rangetime">
                    <p id="tracktime">0:00</p>
                <input id="rangebar" value="0" onChange={(e)=>this.updateSongTime(e)} type="range"/>
                <p>0:31</p>
                </div>
                <div id="controls">
                    <i className="fas fa-random" onClick={(e)=>this.repeatShuffle(e)}><span id="tooltip"></span></i>
                    <i onClick={()=>this.playnext("prev")} className="fas fa-backward"></i>
                    <i id="playpausebutton" autoFocus onClick={()=>this.playSong()} className="fas fa-play"></i>
                    <i onClick={()=>this.playnext("next")} className="fas fa-forward"></i>
                    <i className="fas fa-info-circle" onClick={()=>this.showInfo()}></i>
                    <i className="fas fa-angle-up" onClick={(e)=>this.showMusicPlayer(e)}></i>
                </div>
                <video id="music" onPause={()=>this.changePlayPauseIcons()} onTimeUpdate={(e)=>this.updateTime(e)}>
                    <source id="songsrc" src={song.preview} type="audio/mpeg"/>
                    </video>
               
                <div id="volume">
                <i className="fas fa-volume-up" onClick={(e)=>this.muteVol(e)}></i>
                <input id="volrangebar" onChange={(e)=>this.changeVol(e)} type="range"/>
                </div>
                </div>
            </div>

                
        
            )
    }
}
