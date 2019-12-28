import React, { Component } from 'react';
import Highcharts from 'highcharts' //npm install --save highcharts
import * as HighchartsMore from "highcharts/highcharts-more" //npm install highcharts-more --save
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official

HighchartsMore(Highcharts)
HighchartsMore(Highstock)

class Charts extends Component {
	constructor(props){
        super(props)
    }
    render() {
        var radardata=require(''+this.props.file);
        var configs = { //radar chart
            chart: {
                polar: true,
                height:500,
                width:600
            },

            title: {
                text: ""
            },

            xAxis: {
                categories: ["sad","neutral","calm","fearful","happy","disguest"],
                tickmarkPlacement: 'on',
                lineWidth: 0,
                labels:{
                    style:{
                        fontSize:'20px'
                    }
                }
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                //lineWidth: 1,
                min: 0
            },

            legend: {
                enabled: false
            },

            plotOptions: {
                area: {
                    enableMouseTracking: false,
                    marker: {
                        //fillColor: "#303030",
                    },
                    //lineColor: "#303030",
                    fillOpacity: 0.3 //透明度
                },

            },

            series: [
                {
                    type: "area",
                    name: 'Allocated Budget',
                    data: radardata.data,
                    pointPlacement: 'on',
                    //color: "#ffffff"
                }
            ],
        }

        return(
			<div>
				<HighchartsReact highcharts = {Highcharts} options = {configs} />
			</div>
		);
    }
}
export default Charts;
