import React, { Component, forwardRef, useRef, useImperativeHandle } from 'react'
import * as Chartjs from 'react-chartjs-2'
import themeSettings from '../vendor/libs/theme-settings'
import $ from 'jquery';
import { LineChart } from 'recharts';
import el from 'date-fns/esm/locale/el/index.js';

class ReactChartjs2 extends Component {

  constructor(props, ref) {
    super(props)
    // props.setTitle('React Chartjs 2 - Charts')
    this.showAlert = this.showAlert.bind(this)


  }
  state={
      datasets: [{
        data:  [],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 193, 7, 0.3)',
        borderColor: '#FFC107',
        borderDash: [5, 5],
        fill: false
      }],
      labels:[],
      iterations:1
  }

  showAlert = (event) => {
    console.log("event raised ")
    // console.log(this.state.datasets[0].data.length)
    var new_data = this.state.datasets[0].data
    var sum_of_dataset=0
    // for(var i =0;i<new_data.length, new_data[i] != null;i++){
    //     sum_of_dataset = sum_of_dataset + new_data[i]
    // }
    // var wmd_sum = (sum_of_dataset + event["detail"])/this.state.iterations
    
    new_data.push(event)
    console.log(new_data)
    
    // console.log("event detail ", event["detail"])
    // console.log(event["detail"])
    this.setState({"datasets":  [{
        data:  new_data,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 193, 7, 0.3)',
        borderColor: '#FFC107',
        borderDash: [5, 5],
        fill: false
      }]})
    var new_labels = this.state.labels
    new_labels.push(String(this.state.iterations))
    var it  = this.state.iterations +1
    this.setState({"iterations": it})
    this.setState({"labels": new_labels})
    this.forceUpdate()
  }
  render() {
    const options = {
      responsive: true,
      maintainAspectRatio: false
    }
    document.addEventListener('Inputdata', (event) => {
        // console.log("event raised ", this.state.iterations)
        console.log("event raised ")
        // console.log(this.state.datasets[0].data.length)
        var new_data = this.state.datasets[0].data
        var sum_of_dataset=0
        // for(var i =0;i<new_data.length, new_data[i] != null;i++){
        //     sum_of_dataset = sum_of_dataset + new_data[i]
        // }
        // var wmd_sum = (sum_of_dataset + event["detail"])/this.state.iterations
        
        new_data.push(event["detail"])
        console.log(new_data)
        
        // console.log("event detail ", event["detail"])
        // console.log(event["detail"])
        this.setState({"datasets":  [{
            data:  new_data,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 193, 7, 0.3)',
            borderColor: '#FFC107',
            borderDash: [5, 5],
            fill: false
          }]})
        var new_labels = this.state.labels
        new_labels.push(String(this.state.iterations))
        var it  = this.state.iterations +1
        this.setState({"iterations": it})
        this.setState({"labels": new_labels})
        // console.log("this.state.iterations", this.state.iterations)
        // console.log("this.state.data", this.state.datasets)
        // console.log("this.state.labels", this.state.labels)
      });
   
    const isDarkStyle = themeSettings.isDarkStyle()

    const scalesOptions = isDarkStyle ? {
      yAxes: [{
        gridLines: { color: '#383b40' },
        ticks: { fontColor: '#fff' }
      }],
      xAxes: [{
        gridLines: { color: '#383b40' },
        ticks: { fontColor: '#fff' }
      }]
    } : {}
    const radialScaleOptions = isDarkStyle ? {
      angleLines: { color: '#383b40' },
      gridLines: { color: '#383b40' },
      pointLabels: { fontColor: '#fff' }
    } : {}
    const legendOptions = isDarkStyle ? {
      labels: { fontColor: '#fff' }
    } : {}

    return (
        
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Charts /</span> React Chartjs 2
        </h4>

        <hr className="container-m-nx border-light mt-0 mb-5" />

        <div className="demo-vertical-spacing">
          <div id="chart_div">
          {/* <canvas id="canvas"> */}
            <Chartjs.Line
                id="chart"
              height={250}
              data={{
                labels: this.state.labels,
                datasets: this.state.datasets
              }}
              options={{
                ...options,
                scales: scalesOptions,
                legend: legendOptions,
                responsive:true
              }}
            />
            {/* </canvas> */}
          </div>


        </div>
      </div>
    )
  }
}


export default ReactChartjs2