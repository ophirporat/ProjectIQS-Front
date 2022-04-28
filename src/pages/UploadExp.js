import React, {Component, useRef} from 'react'
import { OverlayTrigger, Collapse,Tooltip, Popover,Form, InputGroup, Nav, Button, ListGroup, Pagination, Media, Row, Col, Card } from 'react-bootstrap'
// import '../vendor/styles/pages/search.scss'
import $, { nodeName } from 'jquery';
import '../components/searchIQS.css'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import BounceLoader from "react-spinners/BounceLoader";

// import * as Chartjs from 'react-chartjs-2'
// import ReactChartjs2 from '../components/ReactChartjs2';
// import FileUpload from "../components/FileUpload";

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    props.setTitle('Experiment results - Pages')
    // this.claims = this.claims.bind(this)
    this.addMoreTweets = this.addMoreTweets.bind(this)
    this.state = {
      claim_id: 0,
      claims: [],
      value: 'select',
      show: ["block", "none"],
      curTab: 0,
      lastTab : 0,
      isSearching: false,
      showHeadline:false
     }
  }
  
  change = (event)=>{
    this.setState({value: event.target.value});
  }


  async claims() {
  
    console.log("*****" , "get claims")
    // var data = {"search_id": this.state.id}
    var res = await fetch("/get_claimes", {
        method: "GET",
        headers: {'Content-Type': 'application/json' }})
    // console.log(res)
    var all_claims = await res.json()
    // console.log(tweet_htmls)
    console.log(all_claims)
    await this.setState({claims: all_claims})
}

  async addMoreTweets() {
    this.setState({showHeadline:false})
    this.setState({isSearching:true})
    // $(`#show_tweets_${this.props.data.index}`).attr("style", "display:block");
    console.log("*****" , "addMoreTweets")
    console.log("id" , this.state.value)

    // var data = {"search_id": this.state.claim_id}
    var data = {"claim_id": this.state.value}

    var res = await fetch("/get_experiment_tweets", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json' }})
    // console.log(res)
    var tweet_htmls = await res.json()
    var IQS_tweet = tweet_htmls["IQS"]
    var ALMIK_tweet = tweet_htmls["ALMIK"]
    // ALMIK
    if (ALMIK_tweet.length > 0) {
      console.log("tweet_htmls.length > 0")
      ALMIK_tweet.forEach((html) => getTweetDiv(html, "ALMIK"));

        function getTweetDiv(tweet_html, index) {
          console.log("ALMIK_tweet" , tweet_html)

          console.log("getTweetDiv")
            // var $div = $("<div>", {"className": "tweetCard"}, style={{width:"8"}});
            // $div.html(tweet_html);
            var object = {
              id: "divID",
              class: "tweetCard",
              css: {
                  "width": "15",
                  "padding-right": "25%"
              }
          };
          var $div = $("<div>", object);
          $div.html(tweet_html);
          console.log(`#tweetsContainer_${index}`)
          $(`#tweetsContainer_${index}`).append($div);
        }
    } 
    // IQS
    if (IQS_tweet.length > 0) {
      console.log("tweet_htmls.length > 0")
      IQS_tweet.forEach((html) => getTweetDiv(html, "IQS"));

        function getTweetDiv(tweet_html, index) {
          console.log("IQS_tweet" , tweet_html)

          console.log("getTweetDiv")
            // var $div = $("<div>", {"className": "tweetCard"}, style={{width:"8"}});
            // $div.html(tweet_html);
            var object = {
              id: "divID",
              class: "tweetCard",
              css: {
                  "width": "15",
                  "padding-right": "25%"
              }
          };
          var $div = $("<div>", object);
          $div.html(tweet_html);
          console.log(`#tweetsContainer_${index}`)
          $(`#tweetsContainer_${index}`).append($div);
        }
      }
      this.setState({isSearching:false})
      this.setState({showHeadline:true})
}
componentDidMount(){
  // this.addMoreTweets()
  this.claims()
}

handleTabs(selectedKey){
  console.log("handleTabs")
  console.log(selectedKey)
  console.log(this.state.lastTab)
  var compArr = this.state.show
  // var lastComp = this.state.resultComponents[this.state.lastTab]
  compArr[this.state.lastTab]= "none"
  compArr[selectedKey] =  "block"
  console.log(compArr)
  this.setState({show: compArr})
  this.setState({lastTab : selectedKey})
}
  render() {
    
    return (
      <div>
          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        {/* <center> */}
        {/* <h2 style={{paddingLeft:"10%"}}> Search Page</h2> */}
        {/* {this.claims()} */}
        {/* {this.addMoreTweets()} */}
        {/* <FileUpload ref={this.state.oref}></FileUpload> */}
        <center>
        <h3 className="font-weight-bold py-3 mb-4">
        <span className="text-muted font-weight-light">TREC_microblog_2012 /</span> Experiment
        </h3>
        </center>
        <Card className="mb-4" style={{textAlign:"center",paddingRight:"10%" }}>
          <Card.Body>
            
        <div class="input-group" style={{textAlign:"center", paddingLeft: "25%"}}>
          <select class="custom-select" id="inputGroupSelect04" onChange={this.change} value={this.state.value} style={{width:"80%"}}>
          <option >Choose a claim...</option>
            {this.state.claims.map(c => {
                     return ( 
                       <option value={c["claim_id"]} selected={this.state.optionValue == c["claim_id"]}>{c["title"]}</option>

                   )})}
          </select>
          <div class="input-group-append">
            <button onClick={this.addMoreTweets} class="btn btn-outline-secondary" type="button" ><span className="ion ion-md-search"></span>&nbsp;&nbsp;Run</button>
          </div>
        </div>
        </Card.Body>
        </Card>
        {/* </center> */}
        <hr></hr>      
        <Nav variant="pills" defaultActiveKey={0} onSelect={(selectedKey) => this.handleTabs(selectedKey)}>
          <Nav.Link eventKey={0} >IQS</Nav.Link>
          <Nav.Link eventKey={1} >ALMIK</Nav.Link>

        </Nav>
        <hr></hr>      

        <center>{ this.state.isSearching ? <BounceLoader loading={true}  size={100} /> : null} </center>

        <div className="row" style={{display: this.state.show[1]}}>
          <center>
          { this.state.showHeadline ?<h3> ALMIK Experiment Results</h3> : null}
          </center>
        <div className="row" id={`tweetsContainer_ALMIK`} style={{display: this.state.show[1]}}></div>
        </div> 

        <div className="row" style={{display: this.state.show[0]}}>
          <center>
          { this.state.showHeadline ?<h3> IQS Experiment Results</h3> : null}
          </center> 
        <div className="row" id={`tweetsContainer_IQS`} style={{display: this.state.show[0]}}></div>  
        </div> 

      </div>
    )
  }
}

export default Experiment
