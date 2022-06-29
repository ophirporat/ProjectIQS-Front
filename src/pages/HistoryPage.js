import React, { Component } from 'react'
import { Card, OverlayTrigger, Tooltip, Button, Collapse } from 'react-bootstrap'
import eventBus from "../EventBus";
import { Redirect } from 'react-router-dom';
import ReactChartjs2 from '../components/ReactChartjs2';
import $ from 'jquery';
import BounceLoader from "react-spinners/BounceLoader";


class History extends Component {
  constructor(props) {
    super(props)
    props.setTitle('History')
    this.getHistoryFromServer = this.getHistoryFromServer.bind(this)
    this.getChart = this.getChart.bind(this)
    this.toggle = this.toggle.bind(this)
    this.isExpanded = this.isExpanded.bind(this)
    this.addMoreTweets = this.addMoreTweets.bind(this)
    this.isLogout = function isLogout() {
      if(eventBus.userStore == null){
        this.setState({'redirect': true})
      }
    }.bind(this)
    this.intervalId = window.setInterval(this.isLogout, 3500);

    this.state = {
        historyData:[],
        redirect: false,
        expanded: {},
        isLoding: true
    }
    
  }
  componentWillUnmount(){
    clearInterval(this.intervalId) 
  }
  async componentDidMount(){
      await this.getHistoryFromServer()
      this.setState({isLoding: false})
  }
  getHistoryFromServer =async ()=> {
    var data = {'accountId': eventBus.userStore.profileObj.googleId, 'token': eventBus.userStore.accessToken};
    console.log(data)
    const res = await fetch("https://iqs.cs.bgu.ac.il/getHistory", {
        method: "POST",
        body: JSON.stringify(data),
        mode: 'cors'
    })
    var response = await res.json()
    this.setState({historyData: response})
    console.log(response)
    const expand = {} 
    response.forEach((history) => expand[history.search_id] = false)
    response.forEach((history) => this.addMoreTweets(history))
    this.setState({expanded: expand})

    return response
  }
  prevent(e) {
    e.preventDefault()
  }
  handleClick = (history)=>{
    eventBus.search_text = history.text
    // this.setState({"redirect": "search-results"})
  }

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
addMoreTweets(history) {
  history.tweets.forEach((tweet_html) => {
    var object = {
      id: "divID",
      class: "tweetCard",
      css: {
          "max-width": "18%",
          "padding-right": "25%"

      }
  };
  var $div = $("<div>", object);
  $div.html(tweet_html);
  if ($div.children.length > 0){
    $(`#tweetsContainer_${history.search_id}`).append($div);

  }

  })
         
  
}

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/'} />
    }
    return (
      <div>
        <div className="container px-0">
          <h2 className="text-center font-weight-bolder pt-5">
            User History
          </h2>
          
          <div className="text-center text-muted text-big mx-auto mt-3" style={{ maxWidth: '500px' }}>
              {/* text */}
          </div>
          {this.state.isLoding ? 
    
      <div style={{textAlign:'center', paddingRight: "85px"}}>
        <BounceLoader loading={true}  size={70} /></div> : null}
            {this.state.historyData.map((history) =>
            <Card className="mt-5">

                <div className="p-4 p-md-5">
                  <div className="d-flex flex-wrap mt-3">
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
                {this.isExpanded(history.search_id) ?
                <div>
                <ReactChartjs2 labels={ Array.from(new Array(history.wmds.length),(val,index)=> index+1 ) } dataset={history.wmds}/>
                
                </div>
                 : null}
                 <div style={{display : this.isExpanded(history.search_id) ? 'flex' : 'none'}} className="row" id={`tweetsContainer_${history.search_id}`}>
                </div>
                </div>
                </div>
      
                </div>
                </Card>

            )}
            <hr></hr>
            {!this.state.isLoding && this.state.historyData.length <1 && <center><h3 className='text-center'> No history to display</h3></center>}

          
        </div>
      </div>
    )
  }
}

export default History
