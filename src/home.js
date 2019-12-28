import React, { Component } from 'react';
import Barchart from "./BarChart.js";
import Cloud from "./WordCloud.js";
import Boxplot from "./BoxPlot.js";
import './index.css';
import Eventdrops from "./eventdrops2.js";
class Home extends Component {
    
    render(){
        return(
            <div className="home">
                <div className="bar">
                <Barchart />
                </div>
                <div className="box">
                <Boxplot />
                </div>
                <div className="cloud">
                <Cloud />
                </div>
                <div className="table">
                </div>
            </div>
            
        );
    }
}
export default Home;