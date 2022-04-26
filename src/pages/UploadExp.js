import React, {Component, useRef} from 'react'
import { OverlayTrigger, Collapse,Tooltip, Popover,Form, InputGroup, Nav, Button, ListGroup, Pagination, Media, Row, Col, Card } from 'react-bootstrap'
// import '../vendor/styles/pages/search.scss'
import $, { nodeName } from 'jquery';
import '../components/searchIQS.css'
import { DropdownButton, Dropdown } from 'react-bootstrap'

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
      value: 'select'
     }
  }
  
  change = (event)=>{
    this.setState({value: event.target.value});
  }
//   handleSubmit = async event =>{
//     console.log("handleSubmit")
//     //  get claim
//     // console.log(claim_id)
//     await this.setState({claim_id: "51"})

//     this.addMoreTweets();
//   // await this.g()  

// }

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
    console.log("ALMIK_tweet" , tweet_htmls)
    if (ALMIK_tweet.length > 0) {
      console.log("tweet_htmls.length > 0")
      ALMIK_tweet.forEach((html) => getTweetDiv(html, "ALMIK"));

        function getTweetDiv(tweet_html, index) {
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
    } else {
        // $("#load").hide();
    }
}
componentDidMount(){
  // this.addMoreTweets()
  this.claims()
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

        <Card className="mb-4" style={{textAlign:"center",paddingRight:"10%"}}>
          <Card.Body>
        <div class="input-group">
          <select class="custom-select" id="inputGroupSelect04" onChange={this.change} value={this.state.value}>
          <option >Choose a claim...</option>
            {this.state.claims.map(c => {
                     return ( 
                       <option value={c["claim_id"]} selected={this.state.optionValue == c["claim_id"]}>{c["title"]}</option>

                   )})}
          </select>
          <div class="input-group-append">
            <button onClick={this.addMoreTweets} class="btn btn-outline-secondary" type="button" >Run</button>
          </div>
        </div>
        {/* <br/> */}
        {/* <Button id="search_btn" variant="primary" type="submit"><h5>Run IQS</h5></Button> */}
        <Form onSubmit={this.handleSubmit} style={{width:"100%"}} >
        <div style={{paddingLeft:"10%"}}>
        <Button  id="search_btn" size="lg" type="submit"  className="rounded-pill"><span className="ion ion-md-search"></span>&nbsp;&nbsp;Run</Button>
        </div>
        <br></br>
        </Form>
        </Card.Body>
        </Card>
        {/* </center> */}
        <hr></hr>      
        <center>
          <h2> Search Results</h2>
        </center>
        <div className="row" id={`tweetsContainer_ALMIK}`}></div>  
      </div>
    )
  }
}

export default Experiment
