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
    console.log("chart created")
   

  }
  state={
      datasets: [{
        label: 'MMD',
        data:  [],
        borderWidth: 1,
        backgroundColor: 'rgba(233, 30, 99, 0.3)',
        borderColor: '#E91E63',
        // borderDash: [],
      }],
      labels:this.props.Iteration,
      sum_wmd:0,
      iterations:1
  }

  showAlert = (event) => {
    console.log("event raised ")
    console.log(this.state.labels)
    // console.log(this.state.datasets[0].data.length)
    var new_data = this.state.datasets[0].data
    var sum_of_dataset=0
    // for(var i =0;i<new_data.length, new_data[i] != null;i++){
    //     sum_of_dataset = sum_of_dataset + new_data[i]
    // }
    // var wmd_sum = (sum_of_dataset + event["detail"])/this.state.iterations
    var new_sum_wmd = this.state.sum_wmd + event
    new_data.push(new_sum_wmd/this.state.iterations)
    this.setState({"sum_wmd": new_sum_wmd})
    console.log(new_sum_wmd)
    this.setState({"iterations": this.state.iterations + 1})
    // console.log(new_data)
    
    
    // console.log("event detail ", event["detail"])
    // console.log(event["detail"])
    // setDatasets( [{
    //   data:  new_data,
    //   borderWidth: 1,
    //   backgroundColor: 'rgba(255, 193, 7, 0.3)',
    //   borderColor: '#FFC107',
    //   borderDash: [5, 5],
    //   fill: false
    // }])
    this.setState({"datasets":  [{
        label: 'MMD',
        data:  new_data,
        borderWidth: 1,
        backgroundColor: 'rgba(233, 30, 99, 0.3)',
        borderColor: '#E91E63',
        // borderDash: [5],
        // fill: false
      }]})
      this.setState({"labels": this.props.Iteration})
    // var new_labels = this.state.labels
    // new_labels.push(String(this.state.iterations))
    // var it  = this.state.iterations +1
    // this.setState({"iterations": it})
    // setLabels(new_labels)
    // this.setState({"labels": new_labels})
    // this.forceUpdate()
  }
  render() {
    const options = {
      responsive: true,
      maintainAspectRatio: false
    }

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
    console.log("render chart")

    return (
        
      <div>
        {/* <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Charts /</span> React Chartjs 2
        </h4> */}
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Analytics /</span> MMD
        </h4>


        {/* <hr className="container-m-nx border-light mt-0 mb-5" /> */}
{/* className="demo-vertical-spacing" */}
        <div className="demo-vertical-spacing">
          {/* <canvas id="canvas"> */}
            <Chartjs.Line
              
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
    )
  }
}


export default ReactChartjs2