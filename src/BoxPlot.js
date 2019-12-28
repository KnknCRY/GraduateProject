import React, { Component } from 'react';
import Highcharts from 'highcharts' //npm install --save highcharts
import * as HighchartsMore from "highcharts/highcharts-more" //npm install highcharts-more --save
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official
import d0 from "./data/boxplot_json/0_boxplot.json";
import d1 from "./data/boxplot_json/1_boxplot.json";
import d2 from "./data/boxplot_json/2_boxplot.json";
import ChangeTable from "./changetable.js";
import ReactDOM from "react-dom";
HighchartsMore(Highcharts)
HighchartsMore(Highstock)

class Charts extends Component {
	constructor(props){
        super(props)
    }
    render() {
        var configs = { //box plot
			chart: {
				type: 'boxplot',
				height: 400,
				width: 450
			},

			title: {
				text: ''
			},

			legend: {
				enabled: false
			},

			xAxis: {
				title: {
						text: '醫師通話時長'
					},
				categories: ['陳醫師','睿醫師','暘醫師']
			},

			yAxis:{

					labels:{
						enabled: false
					},
					visible: true
			},

			plotOptions: {
				boxplot: {
					enableMouseTracking: true,
					cursor: 'pointer',
					events: {
						click: function (event) {
							var filelist=[];
							if(event.point.category=="陳醫師"){
								filelist=d0.filename;
							}
							else if(event.point.category=="睿醫師"){
								filelist=d1.filename;
							}
							else if(event.point.category=="暘醫師"){
								filelist=d2.filename;
							}
							else{
							}
							ReactDOM.render(<ChangeTable filelist={filelist}/>, document.getElementsByClassName("table")[0]);
						}
					}
				}
			},

			series: [
				{
					name: "Box vlues",
					data: [
						{
							x: d0.x,
							low: d0.low,
							q1: d0.q1,
							median: d0.median,
							q3: d0.q3,
							high: d0.high,
							name: "陳醫師",
							color: '#1f77b4'
						},
						{
							x: d1.x,
							low: d1.low,
							q1: d1.q1,
							median: d1.median,
							q3: d1.q3,
							high: d1.high,
							name: "睿醫師",
							color: '#ff7f0e'
						},
						{
							x: d2.x,
							low: d2.low,
							q1: d2.q1,
							median: d2.median,
							q3: d2.q3,
							high: d2.high,
							name: "暘醫師",
							color: '#2ca02c'
						}
					],
				},

				{
					name: "陳醫師",
					color: "#aec7e8",
					type: 'scatter',
					data: d0.data,
					marker: {
						symbol : "circle",
						radius: 3
					},
					jitter: {
						x: 0.24 // Exact fit for box plot's groupPadding and pointPadding
					},
					tooltip: {
						pointFormat: 'Value: {point.y}'
					},
					enableMouseTracking: false
				},
				{
					name: "睿醫師",
					color: "#ffbb78",
					type: 'scatter',
					data: d1.data,
					marker: {
						symbol : "circle",
						radius: 3
					},
					jitter: {
						x: 0.24 // Exact fit for box plot's groupPadding and pointPadding
					},
					tooltip: {
						pointFormat: 'Value: {point.y}'
					},
					enableMouseTracking: false
				},
				{
					name: "暘醫師",
					color: "#98df8a",
					type: 'scatter',
					data: d2.data,
					marker: {
						symbol : "circle",
						radius: 3
					},
					jitter: {
						x: 0.24 // Exact fit for box plot's groupPadding and pointPadding
					},
					tooltip: {
						pointFormat: 'Value: {point.y}'
					},
					enableMouseTracking: false
				}
			]
		}

        return(
			<div>
				<HighchartsReact highcharts = {Highcharts} options = {configs} />
			</div>


		);
    }
}
export default Charts;
