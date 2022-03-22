import React, {Component, useRef} from 'react'
import { OverlayTrigger, Collapse,Tooltip, Popover,Form, InputGroup, Nav, Button, ListGroup, Pagination, Media, Row, Col, Card } from 'react-bootstrap'
// import '../vendor/styles/pages/search.scss'
import $ from 'jquery';
import '../components/searchIQS.css'
// import * as Chartjs from 'react-chartjs-2'
import ReactChartjs2 from '../components/ReactChartjs2';
import FileUpload from "../components/FileUpload";
import ClipLoader from "react-spinners/ClipLoader";


class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    const fref = React.createRef()
    const cref = React.createRef()
    props.setTitle('Search results - Pages')
    
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
      search_method: 0
  
     }
  }
async g (){
    this.setState({isSearching:true})
    $('#show_tweets').attr("style", "display:none");
    console.log("####### g")
    
    
    // this.getSearchUpdates()
    await this.stopSearchs();//
    this.setState({search_ids:[]})
    // $("#search_btn").prop('disabled', true);
    // console.log("g function");
    // $("#result_container").attr("style", "display: none");
    // $("#tweets_container").empty();
    var data = {'prototype': this.state.text};
    // console.log(data)
    var temp_search_ids = this.state.search_ids
    var id=""
    var res =await fetch("/get_id", {
        method: "POST",
        body: JSON.stringify(data)})
    
   
        // console.log(response.json());
    var search_id = await res.json();
    // console.log(search_id)
    
    
        // console.log(this.state)
       
    temp_search_ids.push(search_id)
        // id = search_id
        // console.log("*****", id);
        // to_search(search_id, temp_search_ids)
        // temp_search_ids.push(search_id)
        
        
    this.setSearchUpdatesListener(search_id);
        // runIQS(search_id);
        // await this.timeout(1000)
        // wait_time = 1;


    await this.search(search_id, temp_search_ids)
    

}
timeout = (delay)=> {
    // console.log(delay)
    return new Promise( res => setTimeout(res, delay) );
}



handleSubmit = async event =>{
      event.preventDefault();
      var iteration_array = []

      // console.log(iteration_array);
      
      
      // console.log(event.target[0].value)
      // console.log(event.target[1].value)
      // console.log(event.target[2].value)
      // console.log(event.target[3].value)
      // console.log(event.target[4].value)
      // console.log(event.target[5].value)
      // console.log(event.target[6].value)
      // console.log(this.state.search_method)
      if(this.state.search_method == 1){
        this.setState({text: this.state.oref.current.state.files[0].data})
        this.setState({search_count: event.target[2].value})
        this.setState({iterations: event.target[3].value})
        this.setState({output_keywords_count: event.target[4].value})
        this.setState({keywords_start_size: event.target[5].value})
        this.setState({max_tweets_per_query: event.target[6].value})
        this.setState({min_tweet_count: event.target[7].value})
        for(var i =1;i<= event.target[3].value;i++){
          iteration_array.push(i)
        }
      }
      else{
        this.setState({text: event.target[0].value})
        this.setState({search_count: event.target[1].value})
        this.setState({iterations: event.target[2].value})
        this.setState({output_keywords_count: event.target[3].value})
        this.setState({keywords_start_size: event.target[4].value})
        this.setState({max_tweets_per_query: event.target[5].value})
        this.setState({min_tweet_count: event.target[6].value})
        for(var i =1;i<= event.target[2].value;i++){
          iteration_array.push(i)
        }

      }
      // console.log(this.state.iterations)
      // this.setState({search_ids: []})
      this.setState({chart:$("#mychart")})
      this.setState({isSearching:true})

      this.setState({iteration_arr: iteration_array})
      // const {text, search_count,iterations} = this.state
      // $('#result_container').attr("style", "display:block");
    await this.g()
    

}


async search(search_id, temp_search_ids){
    console.log("####### search")
    this.setState({"myevent":false} )
    $("#result_container").attr("style", "display:none");
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
        const response = await fetch('/search', ophir)
        this.setState({id:search_id})
      if(response.status === 200){

        console.log("search complete")
         
        // this.addMoreTweets()
      }
     
    }
    catch(e){
        console.log(e)
        }
        this.timeout(9000)
        $("#load").prop('disabled', false)
    }
async addMoreTweets() {
    $('#show_tweets').attr("style", "display:block");
    console.log("*****" , "addMoreTweets")
    var data = {"search_id": this.state.id}
    var res = await fetch("/load_results", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json' }})
    // console.log(res)
    var tweet_htmls = await res.json()
    // console.log(tweet_htmls)
    if (tweet_htmls.length > 0) {
        tweet_htmls.forEach(getTweetDiv);

        function getTweetDiv(tweet_html) {
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
            $('#tweetsContainer').append($div);
        }
    } else {
        $("#load").hide();
    }
    // console.log("tweet_htmlss")
    // console.log(tweet_htmls)
}

// getSearchUpdates = async () =>{
//     // this.stopSearchs();//
//     console.log("getSearchUpdates");
//     var data = {'prototype': $('#prototype').val()};
//     fetch("/get_id", {
//         method: "POST",
//         body: JSON.stringify(data)
//     }).then(function (response) {
//         return response.json();
//     }).then(function (search_id) {
//         console.log(search_id);  
//         let temp_search_ids = this.state.search_ids
//         temp_search_ids.push(search_id)
//         this.setState({search_ids : temp_search_ids})
        
//         // this.setSearchUpdatesListener(search_id);

//     }).catch(function (err) {
//         console.log(err);
//         console.log("Booo2");
//         // wait_time = wait_time * 2;
//         // setTimeout(getSearchUpdates(), wait_time * 1000);
//     });
// }

stopSearchs = async()=> {
    console.log("stopSearchs")
    // this.state.search_ids.shift()
    console.log(this.state.search_ids)
    var data = {'search_ids': this.state.search_ids};
    fetch("/close_search", {
        method: "POST",
        body: JSON.stringify(data)
    }).catch(function () {
        console.log("Booo3");
        // wait_time = wait_time * 2;
        setTimeout(this.stopSearchs(), 10 * 1000);
    });
    var tweetsContainerDiv = document.getElementById("tweetsContainer");
    var newTweetsContainerDiv= document.createElement('div')
    newTweetsContainerDiv.id = "tweetsContainer"
    newTweetsContainerDiv.className="row"
    var show_tweetsDiv = document.getElementById("show_tweets");
    show_tweetsDiv.replaceChild(newTweetsContainerDiv, tweetsContainerDiv)

    // wait_time = 1;
    return null;
}

//  mytest = (a) =>{
//   this.setState({'myevent': true})
//   this.setState({'chart_data': a})
// }


setSearchUpdatesListener = async(search_id) => {
    console.log("******setSearchUpdatesListener")
    // var self = this;
    var res = []
    var wmds= []
    var total_iterations = $('#search_count').val() * $('#iterations').val();
    var sum_wmd = 0;
    var eventSource = new EventSource("/stream?search_id=".concat(search_id));
    // console.log("eventSource   ",eventSource)
    // eventSource.addEventListener("message", e => {
    //     res = [{"x":0, "y":1}].concat(res)
    //     this.setState({"chart_data" : [{id: "mmd",data : res}]});
    // });
    // this.bind(eventSource)
    var recived_massages = 0;

    // var chart = this.initGraph();
    // chart.clear();
    
    // this.state.fref.current.forceUpdate()
    // console.log("this.state.chart_data[0].data", this.state.chart_data[0])
    eventSource.onmessage = async (e)  => {
      
        console.log("******eventSource.onmessage ")
        recived_massages++;
        // console.log("e.data   ", e.data);
        // console.log("recived_massages  ", recived_massages)
        if (parseInt(e.data) !== -1) {
            // var width = Math.min(100, Math.floor(recived_massages * 100 / total_iterations));
            // $('.progress-bar').css('width', width.toString().concat('%')).attr({value: width});
            // var ophir = this.get_chart_data(current_chart_data)    
            var curr = {}
            
            // sum_wmd = sum_wmd + parseFloat(e.data)
            wmds.push(e.data)
            // res.push(sum_wmd/recived_massages)
            if(recived_massages === total_iterations){
              var iteration_array = []
              for(var i =1;i<=total_iterations;i++){
                iteration_array.push(i)
              }
              this.setState({"chart_data":res},(e)=>{
                this.setState({wmdDataset: wmds}, (s)=>{
                  // console.log(this.state.chart_data)
                // console.log(this.state.iteration_arr)
                this.setState({"myevent":true} )

                })
                
              })
              
              
              // var c = React.createElement(
              //   ReactChartjs2,
              //   {dataset: res, labels:iteration_array}
              // )
              // $('#chartdiv').append(c)
            }
            // Create the event.
            // const event = document.createEvent('Event');
            // const chartElem = document.querySelector("ReactChartjs2").
            // const eventAwesome = new CustomEvent('datainput', {
            //   bubbles: true,
            //   detail: "hey"
            // });
            
            // test(e.data)
            // $("#chartdiv").attr("style", "display:block");
            this.setState({isSearching:false})
            $("#result_container").attr("style", "display:block");
            
            // var event = new CustomEvent("Inputdata", {bubbles:true, "detail": e.data });
            
            // window.dispatchEvent(event)
            
            // this.child.getAlert();
            // for(var i =0;i<current_chart_data.length;i++){
                // sum_wmd = sum_wmd +current_chart_data[i].y;
                // curr = {
                //     "x":recived_massages,
                //     "y":sum_wmd/recived_massages
                // }
                // console.log("res  ", res)
                // console.log("curr  ", curr)
                // res.push(curr)
                
            $("#target_div").html("Current WMD: ".concat(e.data));
            // this.addData(chart, recived_massages, e.data);
        } else {
            // $("#result_container").attr("style", "display:block");
            // $("#search_btn").prop('disabled', false);
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





// addData = (chart, label, wmd)=> {
//     console.log('add data '.concat(wmd));
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(wmd);
//     });
//     chart.update();
// }

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
      <div>
          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
          
        {/* <div className="py-1 mb-2">
          <InputGroup>
            <Form.Control value={this.state.searchQuery} onChange={this.onSearchQueryChange} />
            <InputGroup.Append>
              <Button variant="primary"><i className="ion ion-ios-search"></i>&nbsp; Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </div> */}
        <center>

        {this.state.search_method == 0  ? <h3 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Search /</span> Free text
        </h3> : null}
        {this.state.search_method == 1  ? <h3 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Search /</span> File upload
        </h3> :null}
        <Card className="mb-4" style={{textAlign:"center",paddingRight:"10%"}}>
        <div style={{paddingTop:"18px", paddingLeft:"38px"}}>
              <Form.Check inline type="radio" name="inline-radios-example" id="inline-radios-example-1" label="Free Text" onChange={() => this.handleCheckbox(0)} />
              <Form.Check inline type="radio" name="inline-radios-example" id="inline-radios-example-2" label="Upload File"  onChange={() => this.handleCheckbox(1)}/>
              <Form.Check inline type="radio" disabled name="inline-radios-example" id="inline-radios-example-3" label="URL" />
            </div>
          <Card.Body>
        <Form onSubmit={this.handleSubmit} style={{width:"100%"}} >
            {/* <h2 style={{paddingLeft:"10%"}}> Search Page</h2> */}
          <br></br>
        {/* <FileUpload></FileUpload> */}
        {/* <br/> */}
        
        <table id="table" style={{width:"60%"}}>
            <tbody>
            <tr>
                <td  colSpan={10}>
            {this.state.search_method == 1  ? <FileUpload ref={this.state.oref}></FileUpload> : null }
            {this.state.search_method == 0  ? <div className=" row align-items-center" >
            <label htmlFor="textarea" className="col-2 col-form-label"><h5>Text Area</h5></label>
            <div className="col-9">
                <textarea id="prototype" name="prototype" cols="40" rows="5" className="form-control"
                          placeholder="Enter Text here..."></textarea>
            </div>
            </div> : null }
            
        </td>
            </tr>
            <br></br>
            <div className="theme-bg-white ui-bordered mb-2" >
              <a href="#toggle"  onClick={e => this.toggle(e, 'faq-25')} aria-expanded={String(this.isExpanded('faq-25'))} className="d-flex justify-content-between text-body py-3 px-4">
              <strong>More options 🡣</strong>
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-25')} className="text-muted"><div>

            <tr>
                <td id="td" colSpan={3}>
                <div  className="form-group row align-items-center" style={{float:"left"}}>
            <label htmlFor="search_count" className="col-6 col-form-label text-end"><h5>Search Count</h5></label>
            <div className="col-6">
                <input id="search_count" name="search_count"  type="number" defaultValue={1} className="form-control"
                      required="required"/>
            </div>
        </div>
                </td>
                <td id="td" colSpan={3}>
                <div  className="form-group row" style={{float:"left"}}>
            <label htmlFor="iterations" className="col-6 col-form-label text-end"><h5>Iterations </h5></label>
            <div className="col-6">
                <input id="iterations" name="iterations"  type="number" defaultValue={7} className="form-control"
                      required="required"/>
            </div>
        </div>

                </td>
                <td id="td" colSpan={3} >
                <div className="form-group row align-items-center" style={{float:"left"}}>
            <label htmlFor="output_keywords_count" className="col-6 col-form-label" ><h5>Keywords Count</h5></label>
            <div className="col-6">
                <input id="output_keywords_count" name="output_keywords_count" type="number" defaultValue={3}
                      className="form-control" required="required"/>
            </div>
        </div>
                </td>
            </tr>
            {/* <br/> */}
            <tr>
                <td colSpan={3}>
                <div className="form-group row" style={{float:"left"}}>
            <label htmlFor="keywords_start_size" className="col-6 col-form-label"><h5>Keywords Start Size</h5></label>
            <div className="col-6">
                <input id="keywords_start_size" name="keywords_start_size" type="number" defaultValue={3}
                      className="form-control" required="required"/>
            </div>
        </div>
        </td>
        {/* <OverlayTrigger
              placement="left"
              overlay={<Popover>
                <Popover.Title>Popover on left</Popover.Title>
                <Popover.Content>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</Popover.Content>
              </Popover>}> */}
              {/* <Button variant="default">Popover on left</Button> */}
                <td colSpan={3}>
                <div className="form-group row" style={{float:"left"}}>
            <label variant="default" htmlFor="max_tweets_per_query" className="col-6 col-form-label"><h5>Max Tweets Per Query</h5></label>
            <div className="col-6">
                <input id="max_tweets_per_query" name="max_tweets_per_query" type="number" defaultValue={50}
                      className="form-control" required="required"/>
            </div>
        </div>
                </td>
            {/* </OverlayTrigger> */}
                {/* </td>
                <td colSpan={3}>
                <div className="form-group row" style={{float:"left"}}>
            <label htmlFor="max_tweets_per_query" className="col-6 col-form-label"><h5>Max Tweets Per Query</h5></label>
            <div className="col-6">
                <input id="max_tweets_per_query" name="max_tweets_per_query" type="number" defaultValue={50}
                      className="form-control" required="required"/>
            </div>
        </div>
                </td> */}
                <td colSpan={3}>
                <div className="form-group row" style={{float:"left"}}>
            <label className="col-6 col-form-label" htmlFor="min_tweet_count"><h5>Min Tweet Count</h5></label>
            <div className="col-6">
                <input id="min_tweet_count" name="min_tweet_count"  type="number" defaultValue={3} className="form-control"
                      required="required"/>
            </div>
        </div>
                </td>
            </tr>
            </div></Collapse>
            </div>
            </tbody>
        </table>
        {/* <Button id="search_btn" variant="primary" type="submit"><h5>Run IQS</h5></Button> */}
        <div style={{paddingLeft:"10%"}}>
        <Button  id="search_btn" size="lg" type="submit"  className="rounded-pill"><span className="ion ion-md-search"></span>&nbsp;&nbsp;Run IQS</Button>
        </div>
<br></br>
        </Form>
        </Card.Body>
        </Card>
</center>
<hr></hr>

{/* <Nav variant="tabs tabs-alt" className="search-nav container-m-nx container-p-x mb-4" activeKey={this.state.curTab} onSelect={this.setCurTab}>
          <Nav.Link eventKey="pages"><i className="ion ion-md-copy"></i>&nbsp; Search</Nav.Link>
          <Nav.Link eventKey="people"><i className="ion ion-ios-people"></i>&nbsp; People</Nav.Link>
          <Nav.Link eventKey="images"><i className="ion ion-md-images"></i>&nbsp; Images</Nav.Link>
          <Nav.Link eventKey="videos"><i className="ion ion-md-film"></i>&nbsp; Videos</Nav.Link>
        </Nav> */}
        <div id="chartdiv" >
          { this.state.myevent ?
           <ReactChartjs2 id="mychart"  labels={this.state.iteration_arr} dataset={this.state.wmdDataset}></ReactChartjs2> 
           :
            null}
            <center>
            { this.state.isSearching ? <ClipLoader loading={true}  size={100} /> : null} </center>
          
          </div>         
           {/* </div> */}
        {/* {this.state.curTab === 'pages' && <div> */}
<hr></hr>
        <center>

        <div id="result_container" style={{display: "none"}} >
          <div id="show_tweets" style={{display: "none"}}>
          <center>
            <h2> Search Results</h2>
          </center>
          <hr></hr>
          <div className="row" id="tweetsContainer" >    
            
          </div>
          {/* <hr></hr> */}
          </div>
          <center>
          <Button id="load" size="lg" variant="primary" className="rounded-pill" onClick={this.addMoreTweets}><span className="ion ion-md-bulb"></span>&nbsp;&nbsp;Show Tweets</Button>
          </center>
        </div>
        </center>

          
          {/* <Pagination className="mt-3">
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
          </Pagination> */}

        {/* </div> */}
        
      </div>
    )
  }
}

export default SearchResults
