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
    // this.showAlert = this.showAlert.bind(this)
    console.log("chart created")
  }

  componentDidMount(){
    console.log(this.props.dataset)
    // console.log(this.props.secondDataset)
    // console.log(this.props.labels)
  }
  // state={
  //     datasets: [{
  //       label: 'MMD',
  //       data:  [],
  //       borderWidth: 1,
  //       backgroundColor: 'rgba(233, 30, 99, 0.3)',
  //       borderColor: '#E91E63',
  //       fill: true
  //       // borderDash: [],
  //     }],
  //     // labels:this.props.Iteration,
  //     labels:[1,2,3,4,5,6,7],
  //     sum_wmd:0,
  //     iterations:1
  // }

  // showAlert = (event) => {
  //   console.log("event raised ")
  //   console.log(this.state.labels)

  //   // var new_data = this.state.datasets[0].data


  //   // var new_sum_wmd = this.state.sum_wmd + event
  //   // new_data.push(new_sum_wmd/this.state.iterations)
  //   // this.setState({"sum_wmd": new_sum_wmd})
  //   // console.log(new_sum_wmd)
  //   // this.setState({"iterations": this.state.iterations + 1})

  //   this.setState({"datasets":  [{
  //       label: 'MMD',
  //       data:  [0.348,0.301, 0.29999, 0.276, 0.269, 0.266, 0.2],
  //       borderWidth: 1,
  //       backgroundColor: 'rgba(233, 30, 99, 0.3)',
  //       borderColor: '#E91E63',
  //       fill: true
  //       // borderDash: [5],
  //       // fill: false
  //     }]})
  //     this.setState({"labels": this.props.Iteration})

  // }
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

    return (
        
      <div>
        {/* <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Charts /</span> React Chartjs 2
        </h4> */}
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Analytics /</span> Mean Word’s Mover Distance Graph
        </h4>


        {/* <hr className="container-m-nx border-light mt-0 mb-5" /> */}
{/* className="demo-vertical-spacing" */}
        <div className="demo-vertical-spacing">
          {/* <canvas id="canvas"> */}
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
                        // borderDash: [5],
                        // fill: false
                      },
                      // {
                      //   label: 'WMD',
                      //   data: this.props.secondDataset,
                      //   borderWidth: 1,
                      //   // backgroundColor: 'rgba(233, 30, 99, 0.3)',
                      //   borderColor: '#006600',
                      //   fill: false,
                      //   borderDash: [5, 5],
                      // }
                    ]
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