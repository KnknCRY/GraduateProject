import React, { Component } from 'react';
import Eventdrops from "./eventdrops2.js";
import Radar from "./Radar.js";
import queryString from 'query-string';
import SingleCloud from "./wordcloud_single.js";
import StarRatings from 'react-star-ratings';
import './call.css';
class Call extends Component {
    constructor(props){
        super(props)
    }
    render(){
        function GenerateCall(props){ //一個音檔的基本資料,雲,雷達,時間軸
            //alert(props.props.id);
            var doctorName="未知醫師";
            if(props.props.uid=="17801112191240"){
              doctorName="陳醫師";
            }
            else if(props.props.uid=="73140858551180"){
              doctorName="睿醫師";
            }
            else if(props.props.uid=="97409473651160"){
              doctorName="暘醫師";
            }
            var keywords="";
            for(var i=0;i<props.props.keywords.length;i++){
              if(i!=0){keywords+=",";}
              keywords+=props.props.keywords[i];
            }
            if(keywords==""){
              keywords="無";
            }
            return(
                <div className="single">
                    <div className="basicInfo">
                        <table border="2">
                        <tr><td>檔名</td><td><a href="#" target="_blank">播放音檔</a></td></tr>
                        <tr><td>醫生名稱</td><td>{doctorName}</td></tr>
                        <tr><td>通話時間</td><td>{props.props.time}</td></tr>
                        <tr><td>通話長度</td><td>{props.props.lenth+"秒"}</td></tr>
                        <tr><td>重點關鍵字</td><td>{keywords}</td></tr>
                        <tr><td>滿意度</td><td><StarRatings
                          rating={props.props.satisfied}
                          starRatedColor="#BBBB00"
                          numberOfStars={5}
                          name='rating'/></td></tr>
                        </table>
                    </div>
                    <div className="singlecloud">關鍵字雲<SingleCloud file={props.props.link[1]} /></div>
                    <div className="radar">情緒雷達<Radar file={props.props.link[0]}/></div>
                {/*<Eventdrops address={"./Room_1441294301270-1548763408429-17801112191240.json"} />*/}
                    <div className="eventdrops">時間軸<Eventdrops file={props.props.link[2]}/></div>
                </div>
            );
        }
        
        var calls=queryString.parse(this.props.location.search);
        console.log(calls);
        var callList=Object.values(calls);
        var jsx=[]; //儲存要return的JSX
        if(Object.keys(calls).length === 0){ //選擇0個音檔
            jsx.push( <h1>未選擇任何音檔!</h1>);
        }
        else if(callList[0].length>10){ //只選擇了1個音檔
            var obj=require("./data/info/"+callList+"_info.json");
            obj["num"]=1;
            jsx.push( <GenerateCall props={obj}/> )
        }
        else{ //選擇了複數音檔
            var eventdropList=[];
            var filelist=[];
            for(var i=0;i<callList[0].length;i++){
                var address="./data/info/"+callList[0][i]+"_info.json";
                //alert(address);
                filelist.push(address)
            }
            var jsonprops=[];
            for (var i=0;i<filelist.length;i++){
                var obj=require(''+filelist[i]);
                obj["num"]=i+1;
                jsonprops.push(obj);
            }
            for (var i=0;i<jsonprops.length;i++){
                //console.log(jsonprops[i]);
                jsx.push( <GenerateCall props={jsonprops[i]}/> );//生成表格所需的HTML code
            }
        }
        //console.log(jsx);
        return(
            <div>
                {jsx}
            </div>
        );
    }
}
export default Call;