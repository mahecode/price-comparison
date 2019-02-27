import React , { Component } from "react";

import Appbar from "../../components/Appbar/Appbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Logo from '../../components/Logo/Logo';

class Home extends Component{
    render(){
        return(
            <div>
                <Appbar />
                <Logo />
                <SearchBar />
            </div>
        )
    }
}

export default Home;