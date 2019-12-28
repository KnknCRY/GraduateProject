import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from "react-dom";
import WordCloud from 'react-d3-cloud';
import { select } from "d3-selection";
import data from "./wordcloud.json";
import Cloud from "./WordCloud.js";
import Eventdrops from "./eventdrop.js";
class cloud extends Component {
    constructor(props){
        super(props)
    }
    render(){
      return (
        <Eventdrops />
      );
    }
}

export default cloud;