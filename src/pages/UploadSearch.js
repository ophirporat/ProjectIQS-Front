import React from 'react'
import {  Collapse,Form, Button, Card} from 'react-bootstrap'
import $, { nodeName } from 'jquery';
import '../components/searchIQS.css'
import ReactChartjs2 from '../components/ReactChartjs2';
import FileUpload from "../components/FileUpload";

class SearchUpload extends React.Component {
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


    this.onSearchQueryChange = this.onSearchQueryChange.bind(this)
    this.setCurTab = this.setCurTab.bind(this)
    this.state = { 
      text: "",
      search_count: "",
      iterations: "",
      output_keywords_count:"",
      keywords_start_size:"",
      max_tweets_per_query: "",
      min_tweet_count:"",
      search_ids:[],
      id:"",
      chart_data :[{id: "mmd",data: [{"x":0,"y":1}]}],
      chart: null,
      expanded: [],
      // child: React.createRef()
      fref :React.createRef(),
      oref :React.createRef(),

      iteration_arr:[]
  
     }
  }
async g (){    
    
    console.log("g function");
    var data = {'prototype': $('#prototype').val()};
    // console.log(data)
    var temp_search_ids = this.state.search_ids
    var id=""
    var res =await fetch("https://iqs.cs.bgu.ac.il/get_id", {
        method: "POST",
        body: JSON.stringify(data)})
    
   
        // console.log(response.json());
    var search_id = await res.json();
    temp_search_ids.push(search_id)
        this.setSearchUpdatesListener(search_id);
    await this.search(search_id, temp_search_ids)
    

}
timeout = (delay)=> {
    // console.log(delay)
    return new Promise( res => setTimeout(res, delay) );
}



handleSubmit = async event =>{
      event.preventDefault();
      var iteration_array = []
      for(var i =1;i<=Number(event.target[2].value);i++){
        iteration_array.push(i)
      }
      console.log(iteration_array);
      this.setState({iteration_arr: iteration_array})
      this.setState({text: this.state.oref.current.state.files[0].data})
      this.setState({search_count: event.target[1].value})
      this.setState({iterations: event.target[2].value})
      this.setState({output_keywords_count: event.target[3].value})
      this.setState({keywords_start_size: event.target[4].value})
      this.setState({max_tweets_per_query: event.target[5].value})
      this.setState({min_tweet_count: event.target[6].value})
      this.setState({search_ids: []})
      this.setState({chart:$("#mychart")})
    await this.g()
    

}


async search(search_id, temp_search_ids){
    console.log("####### search")
    const ophir ={method:'POST',body:JSON.stringify(
        {form:
            {text:this.state.oref.current.state.files[0].data,
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
    $('#show_tweets').attr("style", "display:block");
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
        tweet_htmls.forEach(getTweetDiv);

        function getTweetDiv(tweet_html) {
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
    console.log("tweet_htmlss")
    console.log(tweet_htmls)
}

getSearchUpdates = async () =>{
    this.stopSearchs();//
    console.log("getSearchUpdates");
    var data = {'prototype': $('#prototype').val()};
    fetch("https://iqs.cs.bgu.ac.il/get_id", {
        method: "POST",
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (search_id) {
        console.log(search_id);  
        let temp_search_ids = this.state.search_ids
        temp_search_ids.push(search_id)
        this.setState({search_ids : temp_search_ids})
        

    }).catch(function (err) {
        console.log(err);
        console.log("Booo2");
    });
}

stopSearchs = async()=> {
    console.log("stopSearchs")
    this.state.search_ids.shift()
    var data = {'search_ids': this.state.search_ids};
    fetch("https://iqs.cs.bgu.ac.il/close_search", {
        method: "POST",
        body: JSON.stringify(data)
    }).catch(function () {
        console.log("Booo3");
        setTimeout(this.stopSearchs(), 10 * 1000);
    });
    // wait_time = 1;
    return null;
}




setSearchUpdatesListener = async(search_id) => {
    console.log("******setSearchUpdatesListener")
    var res = []
    var total_iterations = $('#search_count').val() * $('#iterations').val();
    var sum_wmd = 0;
    var eventSource = new EventSource("/stream?search_id=".concat(search_id));
    console.log("eventSource   ",eventSource)
    var recived_massages = 0;
    var test = this.state.fref.current.showAlert
    this.state.fref.current.forceUpdate()
    eventSource.onmessage = async function (e) {
        
        console.log("******eventSource.onmessage ")
        recived_massages++;
        console.log("e.data   ", e.data);
        console.log("recived_massages  ", recived_massages)
        if (parseInt(e.data) !== -1) {
            var width = Math.min(100, Math.floor(recived_massages * 100 / total_iterations));
            $('.progress-bar').css('width', width.toString().concat('%')).attr({value: width});
            var curr = {}
            sum_wmd = sum_wmd + parseFloat(e.data)
            test(e.data)
            $("#chartdiv").attr("style", "display:block");
            $("#result_container").attr("style", "display:block");
            $("#target_div").html("Current WMD: ".concat(e.data));
        } else {
            eventSource.close();
        }
    };

    
    eventSource.onopen = function (e) {
    };

    eventSource.onerror = function (e) {
        eventSource.close();
        setTimeout(this.setSearchUpdatesListener(search_id), 2000);
    };
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
      <div>
          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
          <center>
          <FileUpload ref={this.state.oref}></FileUpload>
          <Card className="mb-4" style={{textAlign:"center",paddingRight:"10%"}}>
            <Card.Body>
              <Form onSubmit={this.handleSubmit} style={{width:"100%"}} >
                <table id="table" style={{width:"60%"}}>
                  <tbody>
                  <tr>
                    <td  colSpan={10}>
                      <div style={{display:"none"}} className=" row align-items-center" >
                        <label htmlFor="textarea" className="col-2 col-form-label"><h5>Text Area</h5></label>
                        <div className="col-9">
                          <textarea id="prototype" name="prototype" cols="40" rows="5" className="form-control"
                                placeholder="Enter Text here..."></textarea>
                        </div>
                      </div>
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
                          <input id="iterations" name="iterations"  type="number" defaultValue={3} className="form-control"
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
                    <td colSpan={3}>
                      <div className="form-group row" style={{float:"left"}}>
                        <label variant="default" htmlFor="max_tweets_per_query" className="col-6 col-form-label"><h5>Max Tweets Per Query</h5></label>
                        <div className="col-6">
                          <input id="max_tweets_per_query" name="max_tweets_per_query" type="number" defaultValue={50}
                      className="form-control" required="required"/>
                        </div>
                      </div>
                    </td>
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
        <div style={{paddingLeft:"10%"}}>
          <Button  id="search_btn" size="lg" type="submit"  className="rounded-pill"><span className="ion ion-md-search"></span>&nbsp;&nbsp;Run IQS</Button>
        </div>
        <br></br>
      </Form>
    </Card.Body>
  </Card>
</center>
<hr></hr>
        <ReactChartjs2 id="mychart" ref={this.state.fref} Iteration={this.state.iteration_arr}></ReactChartjs2>
<hr></hr>
        <center>
        <div id="result_container" style={{display: "none"}} >
          <div id="show_tweets" style={{display: "none"}}>
            <center>
              <h2> Search Results</h2>
            </center>
          
            <div className="row" id="tweetsContainer" >    
              <hr></hr>
            </div>
          </div>
          <center>
            <Button id="load" size="lg" variant="primary" className="rounded-pill" onClick={this.addMoreTweets}><span className="ion ion-md-bulb"></span>&nbsp;&nbsp;Show Tweets</Button>
          </center>
        </div>
      </center>
    </div>
    )
  }
}

export default SearchUpload
