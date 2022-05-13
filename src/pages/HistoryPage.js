import React, { Component } from 'react'
import { Card, OverlayTrigger, Tooltip, Button, Collapse } from 'react-bootstrap'
import eventBus from "../EventBus";
import { Redirect } from 'react-router-dom';
import Modals from '../components/modals';
import ReactChartjs2 from '../components/ReactChartjs2';


class History extends Component {
  constructor(props) {
    super(props)
    props.setTitle('History')
    this.getHistoryFromServer = this.getHistoryFromServer.bind(this)
    this.getChart = this.getChart.bind(this)
    this.toggle = this.toggle.bind(this)
    this.isExpanded = this.isExpanded.bind(this)


    // this.getDate = this.getDate.bind(this)

    this.state = {
        historyData:[],
        redirect:null,
        expanded: {},

    //   vacanciesData: [{
    //     title: 'Account Director',
    //     description: 'Donec dui risus, sagittis non congue vitae, auctor ornare ex. Aliquam hendrerit, odio vel dictum volutpat, nulla sapien venenatis tellus, vel aliquam enim eros vel ligula. Duis dictum, tellus et feugiat viverra, justo velit vestibulum ex, nec malesuada ex ligula consectetur mi.',
    //     department: 'Marketing',
    //     location: 'UK wide',
    //     employment: 'Full-time'
    //   }, {
    //     title: 'Java Developer',
    //     description: 'Morbi dolor ex, cursus vitae lectus in, auctor ultricies metus. Sed quis nulla lacus. Maecenas et lectus massa. Cras porta mauris nec nibh tincidunt, non porttitor elit condimentum. Etiam quis augue condimentum, luctus purus et, porttitor enim. Pellentesque quam sapien, lobortis eget dolor non, ultrices fermentum purus.',
    //     department: 'Backend Dev',
    //     location: 'New York, US',
    //     employment: 'Full-time'
    //   }, {
    //     title: 'Infrastructure Administrator',
    //     description: 'Nulla venenatis turpis vel ante accumsan cursus. Cras ultrices ornare neque eu pharetra. In dapibus sollicitudin urna sed suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce vel sapien sodales, pharetra nisl quis, molestie odio. Donec ullamcorper, tortor sed iaculis bibendum, ante ligula dignissim neque, eget cursus nibh arcu quis est. Pellentesque auctor aliquet arcu at placerat. Duis sodales porta eros vitae gravida. Duis malesuada consectetur tristique.',
    //     department: 'Service Dev',
    //     location: 'Tokyo, Japan',
    //     employment: 'Part-time'
    //   }, {
    //     title: 'Product Designer',
    //     description: 'Duis accumsan ultrices tortor, nec tristique tortor eleifend a. Nunc convallis tempor dignissim. Etiam maximus erat a nunc interdum, ac mattis eros consequat. Fusce urna erat, fringilla at faucibus a, porttitor eget tortor. Sed pharetra massa id molestie sagittis. Etiam hendrerit quis dolor ut viverra.',
    //     department: 'Design',
    //     employment: 'Freelance'
    //   }, {
    //     title: 'Frontend Developer',
    //     description: 'Quisque convallis dolor quis malesuada tempus. Fusce lacinia id ex id fringilla. Nunc sit amet tellus non quam efficitur convallis. Morbi elementum ex sed nisl mattis blandit.',
    //     department: 'Frontend Dev',
    //     location: 'New York, US',
    //     employment: 'Full-time'
    //   }]
    }
    
  }
  componentDidMount(){
      this.getHistoryFromServer()

    // this.setState({historyData:this.getHistoryFromServer()})
  }
  getHistoryFromServer =async ()=> {
    var data = {'accountId': eventBus.userStore.profileObj.googleId, 'token': eventBus.userStore.accessToken};
    console.log(data)
    const res = await fetch("/getHistory", {
        method: "POST",
        body: JSON.stringify(data)
    })
    var response = await res.json()
    this.setState({historyData: response})
    console.log(response)
    const expand = {} 
    response.forEach((history) => expand[history.search_id] = false)
    this.setState({expanded: expand})
    return response
  }
  prevent(e) {
    e.preventDefault()
  }
  handleClick = (history)=>{
    eventBus.search_text = history.text
    this.setState({"redirect": "search-results"})
  }
//   getDate = (timestamp) => {
//     var date = new Date(timestamp)
//     const dateString = ""+date.getDate()+
//     "/"+(date.getMonth()+1)+
//     "/"+date.getFullYear()+
//     " "+date.getHours()+
//     ":"+date.getMinutes()+
//     ":"+date.getSeconds()
//     return dateString
//   }
getChart = (history) => {
  const iteration_array = []
  for(var i =1;i<=Number(history.wmds.length);i++){
      iteration_array.push(i)
    }
return <ReactChartjs2 labels={iteration_array} dataset={history.wmds}></ReactChartjs2>

}
toggle = (e, id) => {
  e.preventDefault()
  console.log(id)
  const expanded = {...this.state.expanded}
  
  if (expanded.hasOwnProperty(id)) {
    expanded[id] = !expanded[id]
  } else {
    expanded[id] = true
  }

  this.setState({"expanded": expanded })
  console.log(this.state.expanded)
}
isExpanded = (id) => {
  console.log(this.state.expanded)
  return this.state.expanded[id]
  // return false
}

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }
    return (
      <div>

        <div className="container px-0">
          <h2 className="text-center font-weight-bolder pt-5">
            User History
          </h2>
          <div className="text-center text-muted text-big mx-auto mt-3" style={{ maxWidth: '500px' }}>
              {/* text */}
          </div>

          <Card className="mt-5">
            {this.state.historyData.map((history) =>
            
            //   <div key={history.index} >
                <div className="p-4 p-md-5">
                  {/* <a href="#d" onClick={this.prevent} className="text-body text-large font-weight-semibold">{vacancy.title}</a> */}
                  <div className="d-flex flex-wrap mt-3">
                    {/* {history.department &&
                      <OverlayTrigger overlay={<Tooltip>Department</Tooltip>}>
                        <div className="mr-3"><i className="ion ion-md-business text-light"></i>&nbsp; {vacancy.department}</div>
                      </OverlayTrigger>
                    } */}
                    {/* {vacancy.location &&
                      <OverlayTrigger overlay={<Tooltip>Location</Tooltip>}>
                        <div className="mr-3"><i className="ion ion-md-pin text-light"></i>&nbsp; {vacancy.location}</div>
                      </OverlayTrigger>
                    } */}
                    {history.time &&
                      <OverlayTrigger overlay={<Tooltip>time searched</Tooltip>}>
                        <div className="mr-3"><i className="ion ion-md-time text-primary"></i>&nbsp; {history.time}</div>
                      </OverlayTrigger>
                    }
                  </div>
                  <div className="mt-3 mb-4">
                    {history.text}
                  </div>
                  <div className="theme-bg-white ui-bordered mb-2" >
              <a href="#toggle"  onClick={e => this.toggle(e, history.search_id)} aria-expanded={String(this.isExpanded(history.search_id))} className="d-flex justify-content-between text-body py-1 px-2">
              <strong>MMD Chart 🡣</strong>
                <span  className="collapse-icon d-inline-block ml-1"></span>
              </a>
                <div className="px-4 pb-3">
                {this.isExpanded(history.search_id) ?<ReactChartjs2 labels={ Array.from(new Array(history.wmds.length),(val,index)=> index+1 ) } dataset={history.wmds}></ReactChartjs2> : null}
                </div>
                </div>
                </div>

            )}
          </Card>
        </div>
      </div>
    )
  }
}

export default History
