import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
class table extends Component {
    constructor(props){
      super(props)
      this.state = {
        selected:[],
      };
      for (var i=0;i<this.props.filelist;++i){
        this.state.selected.push(false);
      }
    }

    render(){
        function GenerateTd(props){
            //console.log(props.props.id);
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
            var link="/"+props.props.id+".mp3";
            return(
              <table border="2">
              <tr>
              <td>{props.props.num}</td>
              <td><input type="checkbox" 
                         name={"id"}
                         value={props.props.id}
                         ></input>選擇</td>
              <td><a href="/#" target="_blank">播放音檔</a></td>
              <td>{doctorName}</td>
              <td>{props.props.time}</td>
              <td>{props.props.lenth+" 秒"}</td>
              <td>{keywords}</td>
              </tr>
              </table>
            );
        }
        var jsonprops=[];//所有info.json
        let filelist=this.props.filelist;
        //console.log(filelist);
        for (var i=0;i<filelist.length;i++){
            var obj=require(''+filelist[i]);
            obj["num"]=i+1;
            jsonprops.push(obj);//讀檔
        }
        var rows=[];
        for (var i=0;i<jsonprops.length;i++){
            //console.log(jsonprops[i]);
            rows.push( <GenerateTd props={jsonprops[i]}/> );//生成表格所需的HTML code
        }
        return(
            <Router>
            <form action="/call" target="_blank" method="get">
            <table border="5" id="maintable">
              <table border="2" id="t_info">
              <tr>
              <td>序號</td>
              <td>選取比較</td>
              <td>檔案連結</td>
              <td>負責醫師</td>
              <td>通話時間</td>
              <td>通話長度</td>
              <td>重點關鍵字</td>
              </tr>
              </table>
                {rows}
                <input type="submit" value="開始比較" />
            </table>
            </form>
            </Router>
        );
    }

}
export default table;
