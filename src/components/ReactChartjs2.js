import React, { Component } from 'react'
import * as Chartjs from 'react-chartjs-2'
import themeSettings from '../vendor/libs/theme-settings'


class ReactChartjs2 extends Component {
  constructor(props, ref) {
    super(props)
    console.log("chart created")
  }
  render() {
    const options = {
      responsive: true,
      maintainAspectRatio: false
    }

    const isDarkStyle = themeSettings.isDarkStyle()

    const scalesOptions = isDarkStyle ? {
      yAxes: [{
        gridLines: { color: '#3F0991' },
        ticks: { fontColor: '#fff' }
      }],
      xAxes: [{
        gridLines: { color: '#3F0991' },
        ticks: { fontColor: '#fff' }
      }]
    } : {}
    const radialScaleOptions = isDarkStyle ? {
      angleLines: { color: '#3F0991' },
      gridLines: { color: '#3F0991' },
      pointLabels: { fontColor: '#fff' }
    } : {}
    const legendOptions = isDarkStyle ? {
      labels: { fontColor: '#fff' }
    } : {}
    console.log("render chart")
    console.log(this.props.dataset)
    console.log(this.props.labels)
    return (
        
      <div id="reactChartDiv">
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Analytics /</span> Mean Word’s Mover Distance Graph
        </h4>
        <div className="demo-vertical-spacing">
            <Chartjs.Line
              
              height={250}
              data={{
                labels: this.props.labels,
                datasets:  [{
                        label: 'MMD',
                        data:  this.props.dataset,
                        borderWidth: 1,
                        backgroundColor: '#ebebfa',
                        borderColor: '#4747d1',
                        fill: true
                      },
                    ]
              }}
              options={{
                ...options,
                scales: scalesOptions,
                legend: legendOptions,
                responsive:true
              }}
            />
          </div>
         </div>
    )
  }
}


export default ReactChartjs2