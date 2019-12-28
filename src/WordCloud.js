import React , { Component } from 'react';
import WordCloud from 'react-d3-cloud';
import { select } from "d3-selection";
import ReactDOM from "react-dom";
import ChangeTable from "./changetable.js";
import data from "./data/allwordcloud.json";
import fileList from "./data/word_with_filename.json"
class cloud extends Component {
    constructor(props){
        super(props)
    }
    render(){
      var keys=Object.keys(data);
      var wordAndFreq={};
      for(var i=0;i<keys.length;++i){
        if(data[keys[i]]["draw"]){
          wordAndFreq[keys[i]]=data[keys[i]]["times"]*2+12;
        }
        else{
          //wordAndFreq[keys[i]]=(data[keys[i]]["times"]|0+6); //必大於1
          wordAndFreq[keys[i]]=0;//不要非醫療字眼
        }
      }
      var data2=[];
      for( var prop in wordAndFreq ){
        data2.push({text:prop,value:wordAndFreq[prop]});
        //console.log(wordAndFreq[prop]);
      }
      const fontSizeMapper = word => word.value;
      const rotate = word => 0;
      const onWordMouseOver = word => {
        //window.alert(word.text);
        select("#table")
        .append("text")
        .text(function() {
          return [word.text,word.value]; // Value of the text
        })
        .attr("font-size",()=>"xx-large")
        .attr("x", () => 0)
        .attr("y", () => 0)
        .attr("id", "t" + word.x + "-" + word.y);

      };
      const onWordMouseOut = word => {
        // Select text by id and then remove
        select("#t" + word.x + "-" + word.y).remove(); // Remove text location
      };
      const onWordClickEvent = word => {
        //alert(word.text+" 出現 "+(word.value-14)/3+"次")
        ReactDOM.render(<ChangeTable filelist={fileList[word.text]}/>, document.getElementsByClassName("table")[0]);
      }
      return (
        <WordCloud
          style={{"background-color":"red"}}
          width={500}
          height={400}
          data={data2}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          padding={1}
          onWordMouseOver={onWordMouseOver}
          onWordMouseOut={onWordMouseOut}
          onWordClick={onWordClickEvent}
        />
      );
    }
}

export default cloud;
