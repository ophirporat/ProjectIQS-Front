import React, {Component, useRef} from 'react'
import { OverlayTrigger, Collapse, Tabs, Tab, Tooltip, Popover,Form, InputGroup, Nav, Button, Badge, ListGroup, Pagination, Media, Row, Col, Card } from 'react-bootstrap'
// import '../vendor/styles/pages/search.scss'
import $ from 'jquery';
import '../components/searchIQS.css'
// import * as Chartjs from 'react-chartjs-2'
import ReactChartjs2 from '../components/ReactChartjs2';
import FileUpload from "../components/FileUpload";
import ClipLoader from "react-spinners/ClipLoader";
import Results from '../components/SearchResults';
import eventBus from "../EventBus";


class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    props.setTitle('Search results - Pages')
    this.stopSearchs = this.stopSearchs.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.createResults = this.createResults.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.state = {
      curTab: 0,
      lastTab : 0,
      callFunc:false,
      resultComponents:[],
      // data:{
      // text: "Was a Giant Snake Skeleton Found on Google Maps? Titanoboa was the largest snake that ever lived at a length of about 42 feet (13 meters) long, according to paleontologist Alex Hastings.",
      // iteration_arr:[1,2,3,4,5,6,7,8],
      // search_count: 1,
      // output_keywords_count:3,
      // keywords_start_size:3,
      // max_tweets_per_query: 50,
      // min_tweet_count:3,
      // iterations: 8,
      // } ,
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
      childrenRefs:[],
      iteration_arr:[],
      isSearching: false,
      search_method: 0
  
     }
  }
  componentDidMount = ()=>{
    if(eventBus.search_text != ""){
      $("#prototype").val(eventBus.search_text)
      eventBus.search_text = ''
    }
    
  }

handleSubmit = async event =>{
      this.resetSearch()
      event.preventDefault();
      var iteration_array = []
      console.log("handleSubmit")
      // console.log(event.target[0].value)
      // console.log(event.target[1].value)
      // console.log(event.target[2].value)
      // console.log(event.target[3].value)
      // console.log(event.target[4].value)
      // console.log(event.target[5].value)
      // console.log(event.target[6].value)
      // console.log(event.target[7].value)
      // console.log(event.target[8].value)
      if(this.state.search_method == 1){
        var textFiles = this.state.oref.current.state.files.map(f => f.data)
        var textNames = this.state.oref.current.state.files.map(f => f.name)
        console.log(textFiles)
        await this.setState({text: textFiles})
        await this.setState({FileNum: textFiles.length})
        await this.setState({textNames: textNames})
        await this.setState({search_count: $("#search_count").val()})
        await this.setState({iterations: $("#iterations").val()})
        await this.setState({output_keywords_count: $("#output_keywords_count").val()})
        await this.setState({keywords_start_size: $("#keywords_start_size").val()})
        await this.setState({max_tweets_per_query: $("#max_tweets_per_query").val()})
        await this.setState({min_tweet_count: $("#min_tweet_count").val()})
        for(var i =1;i<= $("#iterations").val();i++){
          iteration_array.push(i)
        }
      }
      else{
        this.setState({text: [event.target[0].value]})
        this.setState({FileNum: 1})
        this.setState({textNames: ["text"]})
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
      await this.setState({chart:$("#mychart")})
      this.setState({isSearching:true})
      await this.setState({iteration_arr: iteration_array})

      this.createResults();
    // await this.g()  

}
createResults =   () => {
  console.log("createResults")
  var textArr = this.state.text
  var container = []
  for(let i in this.state.text){
    // console.log(index)
    const data ={
      index: i,
      text: textArr[i],
      iteration_arr: this.state.iteration_arr,
      search_count:  this.state.search_count,
      output_keywords_count: this.state.output_keywords_count,
      keywords_start_size: this.state.keywords_start_size,
      max_tweets_per_query:  this.state.max_tweets_per_query,
      min_tweet_count: this.state.min_tweet_count,
      iterations: this.state.iterations,
    }

    const currRef = React.createRef()
    const refs = this.state.childrenRefs
    refs.push(currRef)
    this.setState({childrenRefs:refs})
    container.push({name: this.state.textNames[i] ,key:i, value: data, show: i == 0 ? "block" : "none", ref:currRef})  
  }
  console.log(container)
  // console.log(this.state.curTab)
  this.setState({resultComponents:container})
  this.setState({callFunc: true})
  console.log(" end createResults")
  return container
}

resetSearch = () =>{
  // this.state.oref.current.state
  console.log(this.state.childrenRefs)
  const searchIds = this.state.childrenRefs.map((ref) => ref.current.state.id)
  this.stopSearchs(searchIds)
  console.log(searchIds)
}
stopSearchs = async(searchIds)=> {
    console.log("stopSearchs")
    // this.state.search_ids.shift()
    // console.log(this.state.search_ids)
    var data = {'search_ids': searchIds};
    fetch("/close_search", {
        method: "POST",
        body: JSON.stringify(data)
    }).catch(function () {
        console.log("Booo3");
        // wait_time = wait_time * 2;
        setTimeout(this.stopSearchs(searchIds), 10 * 1000);
    });
    this.setState({resultComponents:[]})
    this.setState({callFunc: false})
    // var tweetsContainerDiv = document.getElementById("tweetsContainer");
    // var newTweetsContainerDiv= document.createElement('div')
    // newTweetsContainerDiv.id = "tweetsContainer"
    // newTweetsContainerDiv.className="row"
    // var show_tweetsDiv = document.getElementById("show_tweets");
    // show_tweetsDiv.replaceChild(newTweetsContainerDiv, tweetsContainerDiv)

    // wait_time = 1;
    return null;
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

handleTabs(selectedKey){
  console.log("handleTabs")
  console.log(selectedKey)
  console.log(this.state.lastTab)
  var compArr = this.state.resultComponents
  // var lastComp = this.state.resultComponents[this.state.lastTab]
  compArr[this.state.lastTab].show = "none"
  compArr[selectedKey].show =  "block"
  console.log(compArr)
  this.setState({resultComponents: compArr})
  this.setState({lastTab : selectedKey})
}
  
  render() {
    
    return (
      <div>
          <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
          
        <center>

        {this.state.search_method == 0  ? <h3 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Search /</span> Free text
        </h3> : null}
        {this.state.search_method == 1  ? <h3 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Search /</span> File upload
        </h3> :null}
        <Card className="mb-4" style={{textAlign:"center",paddingRight:"10%"}}>
        <div style={{paddingTop:"18px", paddingLeft:"140px"}}>
              <Form.Check inline type="radio" defaultChecked={true} name="inline-radios-example" id="inline-radios-example-1" label="Free Text" onChange={() => this.handleCheckbox(0)} />
              <Form.Check inline type="radio" name="inline-radios-example" id="inline-radios-example-2" label="Upload File"  onChange={() => this.handleCheckbox(1)}/>
              {/* <Form.Check inline type="radio" disabled name="inline-radios-example" id="inline-radios-example-3" label="URL" /> */}
            </div>
          <Card.Body>
        <Form onSubmit={this.handleSubmit} style={{width:"100%"}} >
          <br></br>
        
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
                <input id="iterations" name="iterations"  type="number" defaultValue={10} className="form-control"
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
        <Button  id="search_btn" size="md" type="submit"  className="rounded-pill"><span className="ion ion-md-search"></span>&nbsp;&nbsp;Run IQS</Button>
        </div>
        </Form>
        </Card.Body>
        </Card>
          </center>
          <hr></hr>
         <div id="myRes">
         <Nav variant="pills" defaultActiveKey={0} onSelect={(selectedKey) => this.handleTabs(selectedKey)}>
         {this.state.callFunc  ? this.state.resultComponents.map( c => {
             return <Nav.Link eventKey={c.key} title={c.key}>
               {c.name}
             </Nav.Link>
         }): null}
          </Nav>
          <div>
            {
                this.state.callFunc ? 
                this.state.resultComponents.map(c => {
                  return ( 
                  <Results 
                    key={c.key}
                    show = {this.state.resultComponents[c.key].show}
                    data={c.value}
                    ref={c.ref} />

                )}) : null
            }
        </div>
        </div>
      </div>
    )
  }
}

export default SearchResults
