import React, { Component } from 'react';
import Highcharts from 'highcharts' //npm install --save highcharts
import * as HighchartsMore from "highcharts/highcharts-more" //npm install highcharts-more --save
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official
import { select } from "d3-selection";
import ChangeTable from "./changetable.js";
import datas from "./data/barchart.json";
import ReactDOM from "react-dom";
HighchartsMore(Highcharts)
HighchartsMore(Highstock)

class Charts extends Component {
	constructor(props){
        super(props)
    }
    render() {
    	var time= ['00:00', '03:00','06:00', '09:00','12:00', '15:00','18:00', '21:00'];
        var configs = { //bar chart
			chart: {
				type: 'column',
				height: 400,
				width: 450
			},
			title: {
				text: "各時段來電數"
			},
			xAxis: {
				title: {
					enabled: true,
					text: '時間'
				},
				categories:time
			},
			yAxis: {
				title: {
					text: '數量'
				}
			},
			plotOptions: {
				column: {
					dataLabels: {
						enabled: true
					},
					cursor: 'pointer',
					events: {
						click: function (event) {
							var filelist=datas.filename[time.indexOf(event.point.category)];
							ReactDOM.render(<ChangeTable filelist={filelist}/>, document.getElementsByClassName("table")[0]);
						}
					}
				}
			},
			series: [
				{
					showInLegend: false,
					name: '來電數量',
					color: 'rgba(119, 152, 191, .5)',
					data: datas.data
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