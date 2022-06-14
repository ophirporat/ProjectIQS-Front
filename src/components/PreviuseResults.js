import React, {Component, useRef} from 'react'
import { OverlayTrigger, Collapse,Tooltip, Popover,Form, InputGroup, Nav, Button, ListGroup, Pagination, Media, Row, Col, Card } from 'react-bootstrap'
// import '../vendor/styles/pages/search.scss'
import $ from 'jquery';
import '../components/searchIQS.css'
// import * as Chartjs from 'react-chartjs-2'
import ReactChartjs2 from '../components/ReactChartjs2';
import FileUpload from "../components/FileUpload";
import ClipLoader from "react-spinners/ClipLoader";


class PreviuseResults extends React.Component {
  constructor(props) {
    super(props)
    console.log("props.data")
    console.log(props.data)
    
    // props.setTitle('Search results - Pages')
    
    this.g = this.g.bind(this)
    this.addMoreTweets = this.addMoreTweets.bind(this)
    this.search = this.search.bind(this)
    this.stopSearchs = this.stopSearchs.bind(this)
    // this.getWMD = this.getWMD.bind(this)
    this.setSearchUpdatesListener = this.setSearchUpdatesListener.bind(this)
    this.timeout = this.timeout.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)


    this.onSearchQueryChange = this.onSearchQueryChange.bind(this)
    this.setCurTab = this.setCurTab.bind(this)
    this.state = { 
      text: "",
      search_count: 1,
      iterations: "",
      output_keywords_count:"",
      keywords_start_size:"",
      max_tweets_per_query: "",
      min_tweet_count:"",
      search_ids:[],
      id:"",
      chart_data :[],
      wmdDataset:[],
      chart: null,
      expanded: [],
      // child: React.createRef()
      fref :React.createRef(),
      oref :React.createRef(),
      iteration_arr:[],
      isSearching: false,
      search_method: 0,
      index: this.props.data.index
  
     }


  }
  componentDidMount(){
    this.setState({text: this.props.data.text})
    this.setState({search_count: this.props.data.search_count})
    this.setState({iterations: this.props.data.iterations})
    this.setState({output_keywords_count: this.props.data.output_keywords_count})
    this.setState({keywords_start_size: this.props.data.keywords_start_size})
    this.setState({max_tweets_per_query: this.props.data.max_tweets_per_query})
    this.setState({min_tweet_count: this.props.data.min_tweet_count})
    // this.setState({chart:$("#mychart")})
    this.setState({isSearching:true})
    this.setState({iteration_arr: this.props.data.iteration_arr})
    if (this.props.search){
      this.g()
    }
    else {
      this.getResults()
    }
    
  }
async getResults() {
  
}
async g (){
    this.setState({isSearching:true})
    // $('#show_tweets').attr("style", "display:none");
    console.log("####### g")
    // await this.stopSearchs();//
    this.setState({search_ids:[]})
    var data = {'prototype': this.state.text};
    // console.log(data)
    var temp_search_ids = this.state.search_ids
    var id=""
    var res =await fetch("https://iqs.cs.bgu.ac.il/get_id", {
        method: "POST",
        body: JSON.stringify(data)})
    
    var search_id = await res.json();     
    temp_search_ids.push(search_id)
        
        
    this.setSearchUpdatesListener(search_id);
    await this.search(search_id, temp_search_ids)
    

}
timeout = (delay)=> {
    // console.log(delay)
    return new Promise( res => setTimeout(res, delay) );
}


async search(search_id, temp_search_ids){
    console.log("####### search")
    this.setState({"myevent":false} )
    // $("#result_container").attr("style", "display:none");

    const ophir ={method:'POST',body:JSON.stringify(
        {form:
            {text: this.state.text,
                search_count: this.state.search_count,
                iterations: this.state.iterations,
                output_keywords_count: this.state.output_keywords_count,
                keywords_start_size: this.state.keywords_start_size,
                max_tweets_per_query: this.state.max_tweets_per_query,
                min_tweet_count: this.state.min_tweet_count,
                search_id: search_id
        
        }})
    , headers: { 'Content-Type': 'application/json' },};
    try{
        const response = await fetch('https://iqs.cs.bgu.ac.il/search', ophir)
        this.setState({id:search_id})
      if(response.status === 200){
        console.log("search complete")
         
      }
     
    }
    catch(e){
        console.log(e)
        }
        this.timeout(9000)
        $("#load").prop('disabled', false)
    }
async addMoreTweets() {
  
    $(`#show_tweets_${this.props.data.index}`).attr("style", "display:block");
    console.log("*****" , "addMoreTweets")
    var data = {"search_id": this.state.id}
    var res = await fetch("https://iqs.cs.bgu.ac.il/load_results", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json' }})
    // console.log(res)
    var tweet_htmls = await res.json()
    // console.log(tweet_htmls)
    if (tweet_htmls.length > 0) {
      console.log("tweet_htmls.length > 0")
        tweet_htmls.forEach((html) => getTweetDiv(html, this.props.data.index));
        
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


stopSearchs = async()=> {
    console.log("stopSearchs")
    // this.state.search_ids.shift()
    console.log(this.state.search_ids)
    var data = {'search_ids': this.state.search_ids};
    fetch("https://iqs.cs.bgu.ac.il/close_search", {
        method: "POST",
        body: JSON.stringify(data)
    }).catch(function () {
        console.log("Booo3");
        // wait_time = wait_time * 2;
        setTimeout(this.stopSearchs(), 10 * 1000);
    });
    var tweetsContainerDiv = document.getElementById(`tweetsContainer_${this.props.data.index}`);
    var newTweetsContainerDiv= document.createElement('div')
    newTweetsContainerDiv.id = `tweetsContainer_${this.props.data.index}`
    newTweetsContainerDiv.className="row"
    var show_tweetsDiv = document.getElementById(`#show_tweets_${this.props.data.index}`);
    show_tweetsDiv.replaceChild(newTweetsContainerDiv, tweetsContainerDiv)

    // wait_time = 1;
    return null;
}


setSearchUpdatesListener = async(search_id) => {
    console.log("******setSearchUpdatesListener")
    // var self = this;
    var res = []
    var wmds= []
    var total_iterations = $('#search_count').val() * $('#iterations').val();
    var sum_wmd = 0;
    var eventSource = new EventSource("/stream?search_id=".concat(search_id));
    var recived_massages = 0;
    eventSource.onmessage = async (e)  => {
      
        console.log("******eventSource.onmessage ")
        recived_massages++;
        if (parseInt(e.data) !== -1) {  
            var curr = {}
            wmds.push(e.data)
            if(recived_massages === total_iterations){
              var iteration_array = []
              for(var i =1;i<=total_iterations;i++){
                iteration_array.push(i)
              }
              this.setState({"chart_data":res},(e)=>{
                this.setState({wmdDataset: wmds}, (s)=>{
                this.setState({"myevent":true} )

                })
                
              })
              
            }
            this.setState({isSearching:false})
            $("#result_container").attr("style", "display:block");         
            $("#target_div").html("Current WMD: ".concat(e.data));
        } else {
            eventSource.close();
        }
    };

    
    eventSource.onopen = function (e) {
        // this.timeout(1000);
    };

    eventSource.onerror = function (e) {
        // this.timeout(2000)
        // wait_time = wait_time * 2;
        eventSource.close();
        setTimeout(this.setSearchUpdatesListener(search_id), 2000);
    };
}
handleCheckbox = (num) =>{
  this.setState({search_method: num})
  this.setState({"myevent":false} )
}


toggle(e, id) {
  e.preventDefault()
  const expanded = [...this.state.expanded]

  if (expanded.indexOf(id) === -1) {
    expanded.push(id)
  } else {
    expanded.splice(expanded.indexOf(id), 1)
  }

  this.setState({ expanded })
}
isExpanded(id) {
  return this.state.expanded.indexOf(id) !== -1
} 
  onSearchQueryChange(e) {
    this.setState({
      searchQuery: e.target.value
    })
  }

  setCurTab(curTab) {
    this.setState({
      curTab
    })
  }

  uiStarClass(i, rating) {
    if (rating > (i - 1) && rating < i) return 'half-filled'
    if (rating >= i) return 'filled'
    return ''
  }

  prevent(e) {
    e.preventDefault()
  }
  
  render() {
    
    
    return (
      <div id="searchResultContainter" style={{display: this.props.show}}>
        
        <div id="chartdiv" >
          { this.props.show != 'none' & !this.state.isSearching ?
           <ReactChartjs2 id="mychart"  labels={this.state.iteration_arr} dataset={this.state.wmdDataset}></ReactChartjs2> 
           :
            null}
            <center>
            { this.state.isSearching ? <ClipLoader loading={true}  size={100} /> : null} </center>
          </div>         

        <center>

        <div id={`result_container_${this.props.data.index}`} >
          <div id={`show_tweets_${this.props.data.index}`} style={{display: "none"}}>
          <center>
            <h2> Search Results</h2>
          </center>

          <div className="row" id={`tweetsContainer_${this.props.data.index}`} >    
            
          </div>
          {/* <hr></hr> */}
          </div>
          { this.props.show != 'none' & !this.state.isSearching ? <center>
          <Button id="load" size="lg" variant="primary" className="rounded-pill" onClick={this.addMoreTweets}><span className="ion ion-md-bulb"></span>&nbsp;&nbsp;Show Tweets</Button>
          </center> : null}
        </div>
        </center>

        
      </div>
    )
  }
}

export default PreviuseResults
