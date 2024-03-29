import React, { Component } from 'react';
import eventDrops from 'event-drops';
import * as d3 from "d3"
class eventdrop extends Component {
    constructor(props){
        super(props)
    }

    render(){
      //alert(this.props.address);
      //console.log(this.props);
      function humanizeDate(date){
          const monthNames = [
              'Jan.',
              'Feb.',
              'March',
              'Apr.',
              'May',
              'June',
              'Jul.',
              'Aug.',
              'Sept.',
              'Oct.',
              'Nov.',
              'Dec.',
          ];
          if(date.getSeconds()===57){
              return `${date.getMinutes()}:${date.getSeconds()}~${date.getMinutes()+1}:0`;
          }
          else{
              return `${date.getMinutes()}:${date.getSeconds()}~${date.getMinutes()}:${(date.getSeconds()+3)%60}`;
          }
      }
      const repositories = require('./eventdrops.json'); //視覺化用的資料
      const numberCommitsContainer = document.getElementById('numberCommits');
      const zoomStart = document.getElementById('zoomStart');
      const zoomEnd = document.getElementById('zoomEnd');
      const updateCommitsInformation = chart => { //捲動功能
          const filteredData = chart
              .filteredData()
              .reduce((total, repo) => total.concat(repo.data), []);
          numberCommitsContainer.textContent = filteredData.length;
          zoomStart.textContent = humanizeDate(chart.scale().domain()[0]);
          zoomEnd.textContent = humanizeDate(chart.scale().domain()[1]);
      };
      const tooltip = d3 //mouseover時的懸浮資訊窗
          .select('.eventdrops')
          .append('div')
          .classed('tooltip', true)
          .style('opacity', 0)
          .style('pointer-events', 'auto');
          const chart = eventDrops({ //設定繪製參數
              d3,
              zoom: {
                  onZoomEnd: () => updateCommitsInformation(chart),
              },
              drop: {
                  date: d => new Date(d.date),
                  onMouseOver: commit => { //出現關鍵字與時間
                      tooltip
                          .transition()
                          .duration(200)
                          .style('opacity', 1)
                          .style('pointer-events', 'auto');

                      tooltip
                          .html(
                              `
                              <div class="commit">
                              <div class="content">
                                  <h3 class="message">醫療關鍵字:${commit.message}</h3>
                                  <p>
                                      on <span class="date">${humanizeDate(
                                          new Date(commit.date)
                                      )}</span>
                                  </p>
                              </div>
                          `
                          )
                          .style('left', `${d3.event.pageX - 30}px`)
                          .style('top', `${d3.event.pageY + 20}px`);
                  },
                  onMouseOut: () => {
                      tooltip
                          .transition()
                          .duration(500)
                          .style('opacity', 0)
                          .style('pointer-events', 'none');
                  },
              },
          });
          const repositoriesData = repositories.map(repository => ({
              name: repository.name,
              data: repository.data,
          }));
          d3.select('.eventdrops').data([repositoriesData]).call(chart); //繪製
          updateCommitsInformation(chart);
      return(
          <div></div>
      );

    }
}

export default eventdrop;
