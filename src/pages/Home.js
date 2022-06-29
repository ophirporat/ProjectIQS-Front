import React, { Component } from 'react'
import {Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../vendor/styles/pages/authentication.scss'
import background from '../img/background.jpeg'

class Home extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Home')
  }

  render() {
    return (
      <div >
        <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style={{hight:"auto",width:"100%",backgroundSize: "100", backgroundImage: `url(${background})`}}>
        <div className="ui-bg-overlay bg-dark opacity-25" ></div>
        <div>
          <br></br>
          <br></br>
          <br></br>

          <h1 className="font-weight-bold py-3 mb-4" style={{color:"white"}}>&nbsp;&nbsp;&nbsp;&nbsp;Iterative Query Selection</h1>
          <br></br>
          <br></br>
          <br></br>
          <center>
          <h3 style={{color:"white"}}>Retrieve search results with <strong>Iterative Query Selection</strong> algorithm</h3>
          <br></br>
          <br></br>
          <br></br>

            <Link to="/pages/search-results">
              <p><Button  className="rounded-pill" variant="primary" size="lg">Let's Search on Twitter</Button></p>
            </Link>
            </center>
          </div>
        </div>

      </div>
    )
  }
}

export default Home
