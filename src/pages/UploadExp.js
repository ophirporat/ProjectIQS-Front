import React from 'react'
import { Nav, Card } from 'react-bootstrap'
import $, { nodeName } from 'jquery';
import '../components/searchIQS.css'
import { Table} from 'react-bootstrap'
import BounceLoader from "react-spinners/BounceLoader";


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
      showHeadline:false,
      firstRun:false
     }
  }
  
  change = (event)=>{
    this.setState({value: event.target.value});
  }


  async claims() {
    console.log("*****" , "get claims")
    var res = await fetch("/get_claimes", {
        method: "GET",
        headers: {'Content-Type': 'application/json' }})
    var all_claims = await res.json()
    // console.log(all_claims)
    await this.setState({claims: all_claims})
}

  async addMoreTweets() {
    this.clearBox()
    this.setState({firstRun:true})

    if (this.state.value.length < 6 ){
      this.setState({showHeadline:false})
      this.setState({isSearching:true})
      console.log("*****" , "addMoreTweets")
      console.log("id" , this.state.value)
      var data = {"claim_id": this.state.value}

      var res = await fetch("/get_experiment_tweets", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json' }})
      var tweet_htmls = await res.json()
      var IQS_tweet = tweet_htmls["IQS"]
      var ALMIK_tweet = tweet_htmls["ALMIK"]
      // ALMIK
      if (ALMIK_tweet.length > 0) {
        ALMIK_tweet.forEach((html) => getTweetDiv(html, "ALMIK"));

          function getTweetDiv(tweet_html, index) {
            // console.log("getTweetDiv")
              var object = {
                id: "divID",
                class: "tweetCard",
                css: {
                    "width": "15",
                    "padding-right": "25%",
                    "float":"left"
                }
            };
            var $div = $("<div>", object);
            $div.html(tweet_html);
            // console.log(`#tweetsContainer_${index}`)
            $(`#tweetsContainer_${index}`).append($div);
          }
      } 
      // IQS
      if (IQS_tweet.length > 0) {
        IQS_tweet.forEach((html) => getTweetDiv(html, "IQS"));

          function getTweetDiv(tweet_html, index) {
            // console.log("getTweetDiv")
              var object = {
                id: "divID",
                class: "tweetCard",
                css: {
                    "width": "15",
                    "padding-right": "25%",
                    "float":"left"
                }
            };
            var $div = $("<div>", object);
            $div.html(tweet_html);
            // console.log(`#tweetsContainer_${index}`)
            $(`#tweetsContainer_${index}`).append($div);
          }
        }
        this.setState({isSearching:false})
        this.setState({showHeadline:true})
      }
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
  compArr[this.state.lastTab]= "none"
  compArr[selectedKey] =  "block"
  console.log(compArr)
  this.setState({show: compArr})
  this.setState({lastTab : selectedKey})
}

clearBox = async()=>
{
    // ALMIK
    console.log("clearBox")
    var tweetsContainerDiv = document.getElementById(`tweetsContainer_ALMIK`);
    var newTweetsContainerDiv= document.createElement('div')
    newTweetsContainerDiv.id = `tweetsContainer_ALMIK`
    newTweetsContainerDiv.className="row"
    var show_tweetsDiv = document.getElementById(`show_tweets_ALMIK`);
    show_tweetsDiv.replaceChild(newTweetsContainerDiv, tweetsContainerDiv);
    // IQS
    var tweetsContainerDiv = document.getElementById(`tweetsContainer_IQS`);
    console.log("tweetsContainerDiv", tweetsContainerDiv)
    var newTweetsContainerDiv= document.createElement('div')
    newTweetsContainerDiv.id = `tweetsContainer_IQS`
    newTweetsContainerDiv.className="row"
    var show_tweetsDiv = document.getElementById(`show_tweets_IQS`);
    console.log("show_tweetsDiv", show_tweetsDiv)
    show_tweetsDiv.replaceChild(newTweetsContainerDiv, tweetsContainerDiv);
}
  render() {
    
    return (
      <div>
          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        <center>
        <h3 className="font-weight-bold py-3 mb-4">
        <span className="text-muted font-weight-light">IQS vs. ALMIK /</span> Experiment
        </h3>
        <h5>In this experiment we reproduced the experiment performed from the academic paper.</h5>
        <h5>We run the IQS algorithm and the ALMIK algorithm on the TREC Microblog 2012 dataset.</h5>
        <br></br>
        <h5 style={{width:"55%" }}>The ALMIK method is a state-of-the-art active retrieval method proposed by Zheng & Sun (2019). We implemented the ALMIK method based on the method description presented in their paper.</h5>
        <h5 style={{width:"62%" }}>In the following experiment, we used the Twitter TREC Microblog 2012 dataset.
          The Twitter TREC Microblog 2012 consists of 59 topics (used as initial queries) and 73K judgments (relevant and irrelevant tweets) for those
335 topics. The corpus was collected over two weeks, from January 23, 2011, to February 7, 2011, containing 16M tweets.</h5>
<br></br>
<h5 style={{fontSize:"18px"}}>
<b>The experiment contains 58 claims and retrieves the most relevant tweets from the datasets.</b>
  <br></br>
  <b>Here, you can search for a claim and retrieve the experiment results from both algorithms.</b></h5>

        </center>
        <Card className="mb-4" style={{textAlign:"center",paddingRight:"10%" }}>
          <Card.Body>
            
        <div class="input-group" style={{ textAlign:"center", paddingLeft: "20%"}}>
          <select class="custom-select" id="inputGroupSelect04" onChange={this.change} value={this.state.value} style={{fontSize:"120%",width:"80%"}}>
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
        <hr></hr>     
        { this.state.showHeadline ?
 
<center>
        <Card style={{width:"30%"}}>
          <Table className="card-table" bordered  size="sm">
            <thead className="thead-light">
              <tr>
                <th>Method</th>
                <th>MAP</th>
                <th>R_Precision</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="table-success" scope="row" >IQS</th>
                <td className="table-success"><bold>0.357</bold></td>
                <td className="table-success"><bold>0.356</bold></td>
              </tr>
              <tr>
                <th scope="row">ALMIK</th>
                <td>0.164</td>
                <td>0.172</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </center>
: null}

        { this.state.firstRun ?<div> 
        <Nav variant="pills" defaultActiveKey={0} onSelect={(selectedKey) => this.handleTabs(selectedKey)}>
          <Nav.Link eventKey={0} >IQS</Nav.Link>
          <Nav.Link eventKey={1} >ALMIK</Nav.Link>
        </Nav>
        <hr></hr>

        

        </div> : null}

        <div style={{height:60, paddingRight:"10%"}}>
        <center>{ this.state.isSearching ? <BounceLoader loading={true}  size={70} /> : null} </center>
        </div>

          <div  id={`show_tweets_ALMIK`} style={{display: this.state.show[1]}}>
            <center>
            { this.state.showHeadline ?<h3> ALMIK Experiment Results</h3> : null}
            </center>
            <div className="row" id="tweetsContainer_ALMIK" style={{display: this.state.show[1]}}></div>
          </div> 

          <div id={`show_tweets_IQS`} style={{display: this.state.show[0]}}>
            <center>
            { this.state.showHeadline ?<h3> IQS Experiment Results</h3> : null}
            </center> 
            <div className="row" id="tweetsContainer_IQS" style={{display: this.state.show[0]}}></div>  
          </div> 

      </div>
    )
  }
}

export default Experiment
