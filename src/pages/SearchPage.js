import React, {Component, useRef} from 'react'
import { OverlayTrigger, Tooltip, Popover,Form, InputGroup, Nav, Button, ListGroup, Pagination, Media, Row, Col, Card } from 'react-bootstrap'
// import '../vendor/styles/pages/search.scss'
import $ from 'jquery';
import '../components/searchIQS.css'
// import * as Chartjs from 'react-chartjs-2'
import ReactChartjs2 from '../components/ReactChartjs2';

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
      // child: React.createRef()
      fref :React.createRef()
  
     }
  }
async g (){
    console.log("####### g")
    
    
    // this.getSearchUpdates()
    // stopSearchs([search_ids.shift()]);//
    // $("#search_btn").prop('disabled', true);
    console.log("g function");
    // $("#result_container").attr("style", "display: none");
    // $("#tweets_container").empty();
    var data = {'prototype': $('#prototype').val()};
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
      this.setState({text: event.target[0].value})
      this.setState({search_count: event.target[1].value})
      this.setState({iterations: event.target[2].value})
      this.setState({output_keywords_count: event.target[3].value})
      this.setState({keywords_start_size: event.target[4].value})
      this.setState({max_tweets_per_query: event.target[5].value})
      this.setState({min_tweet_count: event.target[6].value})
      this.setState({search_ids: []})
      this.setState({chart:$("#mychart")})
      // const {text, search_count,iterations} = this.state
      $('#result_container').attr("style", "display:block");
    await this.g()
    

}


async search(search_id, temp_search_ids){
    console.log("####### search")
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
    $('#tweetsContainer').show()
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
    console.log("tweet_htmlss")
    console.log(tweet_htmls)
}

getSearchUpdates = async () =>{
    this.stopSearchs();//
    console.log("getSearchUpdates");
    var data = {'prototype': $('#prototype').val()};
    fetch("/get_id", {
        method: "POST",
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (search_id) {
        console.log(search_id);  
        let temp_search_ids = this.state.search_ids
        temp_search_ids.push(search_id)
        this.setState({search_ids : temp_search_ids})
        
        // this.setSearchUpdatesListener(search_id);

    }).catch(function (err) {
        console.log(err);
        console.log("Booo2");
        // wait_time = wait_time * 2;
        // setTimeout(getSearchUpdates(), wait_time * 1000);
    });
}

stopSearchs = async()=> {
    console.log("stopSearchs")
    this.state.search_ids.shift()
    var data = {'search_ids': this.state.search_ids};
    fetch("/close_search", {
        method: "POST",
        body: JSON.stringify(data)
    }).catch(function () {
        console.log("Booo3");
        // wait_time = wait_time * 2;
        setTimeout(this.stopSearchs(), 10 * 1000);
    });
    // wait_time = 1;
    return null;
}




setSearchUpdatesListener = async(search_id) => {
    console.log("******setSearchUpdatesListener")
    // var self = this;
    var res = []
    var total_iterations = $('#search_count').val() * $('#iterations').val();
    var sum_wmd = 0;
    var eventSource = new EventSource("/stream?search_id=".concat(search_id));
    console.log("eventSource   ",eventSource)
    // eventSource.addEventListener("message", e => {
    //     res = [{"x":0, "y":1}].concat(res)
    //     this.setState({"chart_data" : [{id: "mmd",data : res}]});
    // });
    // this.bind(eventSource)
    var recived_massages = 0;
    // var chart = this.initGraph();
    // chart.clear();
    var test = this.state.fref.current.showAlert
    // console.log("this.state.chart_data[0].data", this.state.chart_data[0])
    eventSource.onmessage = async function (e) {
        console.log("******eventSource.onmessage ")
        recived_massages++;
        console.log("e.data   ", e.data);
        console.log("recived_massages  ", recived_massages)
        if (parseInt(e.data) !== -1) {
            var width = Math.min(100, Math.floor(recived_massages * 100 / total_iterations));
            $('.progress-bar').css('width', width.toString().concat('%')).attr({value: width});
            // var ophir = this.get_chart_data(current_chart_data)    
            var curr = {}
            sum_wmd = sum_wmd + parseFloat(e.data)
            // Create the event.
            // const event = document.createEvent('Event');
            // const chartElem = document.querySelector("ReactChartjs2").
            // const eventAwesome = new CustomEvent('datainput', {
            //   bubbles: true,
            //   detail: "hey"
            // });
            test(e.data)
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
            $("#result_container").attr("style", "display:block");
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





// addData = (chart, label, wmd)=> {
//     console.log('add data '.concat(wmd));
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(wmd);
//     });
//     chart.update();
// }


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

        <Card className="mb-4" >
          <Card.Body>
        <Form onSubmit={this.handleSubmit} style={{width:"100%"}} >
            <h2> Search Page</h2>
<br></br>
        {/* <br/> */}
        <table id="table">
            <tbody>
            <tr>
                <td  colSpan={10}>
            <div className=" row align-items-center"  >
            <label htmlFor="textarea" className="col-2 col-form-label"><h5>Text Area</h5></label>
            {/* <Form.Label>Text Area</Form.Label> */}
            <div className="col-9">
                <textarea id="prototype" name="prototype" cols="40" rows="5" className="form-control"
                          placeholder="Paste prototype document here..."></textarea>
            </div>
        </div>
        </td>
            </tr>
<br></br>

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
            <label htmlFor="iterations" className="col-6 col-form-label text-end"><h5>Iterations</h5></label>
            <div className="col-6">
                <input id="iterations" name="iterations"  type="number" defaultValue={3} className="form-control"
                      required="required"/>
            </div>
        </div>

                </td>
                <td id="td" colSpan={3}>
                <div className="form-group row align-items-center" style={{float:"left"}}>
            <label htmlFor="output_keywords_count" className="col-6 col-form-label"><h5>Output Keywords Count</h5></label>
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
        <OverlayTrigger
              placement="left"
              overlay={<Popover>
                <Popover.Title>Popover on left</Popover.Title>
                {/* <Popover.Content>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</Popover.Content> */}
              </Popover>}>
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
            </OverlayTrigger>
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
            </tbody>
        </table>

        {/* <Button id="search_btn" variant="primary" type="submit"><h5>Run IQS</h5></Button> */}
        <Button  id="search_btn" size="lg" type="submit" className="rounded-pill"><span className="ion ion-md-search"></span>&nbsp;&nbsp;Run IQS</Button>

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

          <ReactChartjs2 id="mychart" ref={this.state.fref}></ReactChartjs2>      

        {/* {this.state.curTab === 'pages' && <div> */}
        <div id="result_container" style={{display: "none"}} >
            <h2> Search Results</h2>
          <div className="row" id="tweetsContainer" >    
            <hr></hr>
          </div>

          <Button id="load" size="lg" variant="primary" className="rounded-pill" onClick={this.addMoreTweets}><span className="ion ion-md-bulb"></span>&nbsp;&nbsp;Show Tweets</Button>
        </div>
          
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
        {this.state.curTab === 'people' && <div>

          <Row>

            {this.state.searchData.people.map(user =>
              <Col md={6} xl={4} key={user.username}>
                <Card className="card-condenced mb-4">
                  <Card.Body className="media align-items-center">
                    <img src={`${process.env.PUBLIC_URL}/img/avatars/${user.avatar}`} alt="User" className="ui-w-40 rounded-circle" />
                    <Media.Body className="ml-3">
                      <a href="#d" onClick={this.prevent} className="text-body font-weight-semibold mb-2">{user.name}</a>
                      <div className="text-muted small">@{user.username}</div>
                    </Media.Body>
                    {user.following
                      ? <Button variant="success rounded-pill md-btn-flat" size="sm" className="d-block">Following</Button>
                      : <Button variant="outline-primary rounded-pill md-btn-flat" size="sm" className="d-block">Follow</Button>
                    }
                  </Card.Body>
                </Card>
              </Col>
            )}

          </Row>

          <Pagination>
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
          </Pagination>

        </div>}
        {this.state.curTab === 'images' && <div>

          <Form.Row>

            {this.state.searchData.images.map(image =>
              <Col sm={6} xl={4} key={image.path} className="mb-2">
                <a href="#d" onClick={this.prevent} className="ui-rect-60 ui-bg-cover ui-bg-overlay-container text-white" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/${image.path}')` }}>
                  <div className="ui-bg-overlay bg-dark opacity-25"></div>

                  {image.title && <div className="d-flex align-items-end ui-rect-content p-3">
                    <div className="flex-shrink-1 font-weight-semibold">{image.title}</div>
                  </div>}
                </a>
              </Col>
            )}

          </Form.Row>

          <Pagination className="mt-3">
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
          </Pagination>

        </div>}
        {/* {this.state.curTab === 'videos' && <div> */}

          <Row>

            {/* {this.state.searchData.videos.map(video =>
              <Col sm={6} md={4} xl={3} key={video.preview} className="mb-4">
                <a href="#d" onClick={this.prevent} className="ui-rect-60 ui-bg-cover text-white" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/${video.preview}')` }}>
                  <div className="d-flex justify-content-end align-items-end ui-rect-content p-2">
                    <div className="bg-dark rounded text-white small font-weight-semibold line-height-1 p-1">{video.duration}</div>
                  </div>
                </a>
                <a href="#d" onClick={this.prevent} className="d-block text-body mt-2">{video.title}</a>
                <div>
                  <span className="text-muted small"> {video.views} views</span> &nbsp;
                  <a href="#d" onClick={this.prevent} className="text-muted small"> {video.likes} likes</a> &nbsp;
                  <span className="text-muted small"> {video.reposts} reposts</span>
                </div>
              </Col>
            )} */}

          </Row>

          {/* <Pagination>
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
          </Pagination> */}

        
      </div>
    )
  }
}

export default SearchResults
