import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

class PyPackage extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Package - Pages')
    this.state = {
      expanded: []
    }
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const { markdown } = this.state;
    return (
      <div>
        <h3 className="text-center font-weight-bold py-3 mb-4">
        IQS Python Package Documentation
        </h3>
        <hr className="container-m-nx border-light my-0" />

<br></br>
        {/* <br></br>
        <div className="text-xlarge" style={{paddingLeft:"17%"}}>
        IQS — Iterative Query Selection algorithm
        </div>
        <br></br> */}
        
        <div className="Row" style={{paddingLeft:"17%",width: "85%"}}>
        <ReactMarkdown> Implements the IQS algorithm (Iterative Query Selection).
        The IQS is an iterative approach for optimizing short keyword queries given a prototype document through interaction with an opaque search engine such as Twitter.</ReactMarkdown>
         </div>
         <div  style={{paddingLeft:"17%",width: "85%"}}>
         <h4><bold>Installing</bold></h4>
        </div>
        <div className="Row" style={{paddingLeft:"17%",width: "85%"}}>
        <h5>
        <ReactMarkdown>
        `pip install IQS-algorithm`
        </ReactMarkdown>
        </h5>

        <ReactMarkdown>
        Link to the packege in pypi: [IQS python package](https://pypi.org/project/IQS-algorithm/)        
        </ReactMarkdown>
        <ReactMarkdown>
        In order to use the package add `from IQS_algorithm import IQS` to your code.
        </ReactMarkdown>
        <br></br>
        <h4><bold>The Algorithm Function</bold></h4>
        <Card>
          <center>
            <br></br>
            <h5><ReactMarkdown>
          ```
          searchIQS(text, consumer_key, consumer_secret, access_token, access_token_secret,  num_return_tweets=12, min_tweet_count=3, search_count=1, iterations=15, keywords_start_size=3, max_tweets_per_query=100, output_keywords_count=5)
          ```
          </ReactMarkdown></h5>
          </center>
          </Card>
          <br></br>
          <ReactMarkdown>The function get the details of the most relevant tweets as a list of dict.</ReactMarkdown>
          <h5><bold>Parameters:</bold></h5>
•	<b>text</b> <i>(str)</i> – Free text of the requested query.
<br></br>
•	<b>consumer_key</b> <i>(str)</i> – Username when making API requests. This key is generated on the Twitter developer app's details page.
<br></br>
•	<b>consumer_secret</b> <i>(str)</i> – Password when making API requests. This key is generated on the Twitter developer app's details page.
<br></br>
•	<b>access_token</b> <i>(str)</i> – User-specific credentials used to authenticate OAuth 1.0a API requests. It specifies the Twitter account the request is made on behalf of. This token is generated on the Twitter developer app's details page.
<br></br>
•	<b>access_token_secret</b> <i>(str)</i> – User-specific credentials used to authenticate OAuth 1.0a API requests. It specifies the Twitter account the request is made on behalf of. This token is generated on the Twitter developer app's details page.
<br></br>
•	<b>num_return_tweets</b> <i>(int, optional)</i> – Number of tweets that will be retrieved.
<br></br>
•	<b>min_tweet_count</b> <i>(int, optional)</i> – Minimal number of tweets a query should return.
<br></br>
•	<b>search_count</b> <i>(int, optional)</i> – Number of hill climbing searches.
<br></br>
•	<b>iterations</b> <i>(int, optional)</i> – Number of iterations that the algorithm will run.
<br></br>
•	<b>keywords_start_size</b> <i>(int, optional)</i> – Initial random query size.
<br></br>
•	<b>max_tweets_per_query</b> <i>(int, optional)</i> – Number of tweets to retrieve per output query.
<br></br>
•	<b>output_keywords_count</b> <i>(int, optional)</i> – Number of output queries.
          <br></br>
          <br></br>
          <h5><bold>Returns:</bold></h5>
          <ReactMarkdown>List of [(id, username, text, wmd), list of keywords] - A sorted list of dictionaries that represent tweet information by relevance according to wmd index and a list of the most relevant keywords for the given query.</ReactMarkdown>
          <h5><bold>Return Type:</bold></h5>
          <ReactMarkdown>List of [(int, str, str, float), list of str]</ReactMarkdown>
          <br></br>
          <h4><bold>Example</bold></h4>
          </div>
          <div id="Examples" style={{paddingLeft:"17%"}}>
              <img src="../Examples.png" alt="Examples" width= "650" height="180"></img>
              </div>
      </div>
    )
  }
}

export default PyPackage
