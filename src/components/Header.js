import React, { Component } from 'react'

export default class Header extends Component {
    state={
        searchinput:"",
        data:[]
    }


    componentDidMount(){
        if(window.innerWidth<600){
            const searchicon = document.createElement("i");
            searchicon.setAttribute("class","fas fa-search");
            document.getElementById("submitbutton").innerHTML="";
            document.getElementById("submitbutton").appendChild(searchicon);
        }
    }

    searchInput=(e)=>{

        this.setState({
            searchinput:e.target.value
        })
    }

    onKeyPress=(e)=>{
        if(e.keyCode === 13 || e.which ===13){
            this.searchSongs();
        }
    }

     searchSongs= async ()=>{
         if(this.state.searchinput.length>2){
    const res = await fetch(`https://api.deezer.com/search?q=${this.state.searchinput}`)
     const data = await res.json();
     console.log(data);
     this.setState({
       data:data.data
     },()=>{this.props.passSearchData(this.state.data)})
    }
}

    render() {
        return (
            <header>
           <div id="logo"> MusicPlay <img alt="" src="https://img.icons8.com/color/96/000000/audio-wave2.png"/></div>
            <div id="searchbox">
                <input id="searchinput" value ={this.state.searchinput}
                onChange={(e)=>this.searchInput(e)} onKeyPress={(e)=>this.onKeyPress(e) } placeholder="search songs ..."/>
                <button type="submit" onClick={()=>this.searchSongs()} id="submitbutton">Search</button>
            </div>
          </header>
        )
    }
}
