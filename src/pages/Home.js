import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../vendor/styles/pages/authentication.scss'
import Footer from "../components/Footer";

class Home extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Home')
  }

  render() {
    return (
      <div>
        <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/1.jpg')`}}>
        <div className="ui-bg-overlay bg-dark opacity-25" ></div>
        <div >
          <h1 className="font-weight-bold py-3 mb-4" style={{color:"white"}}>Iterative Query Selection</h1>
          <br></br>
          <br></br>
          <br></br>
          <center>
          <h3 style={{color:"white"}}>Retrieve search results with <strong>Iterative Query Selection</strong> algorithm</h3>
          {/* <SearchResults title="ophir"></SearchResults> */}
          <br></br>
            <Link to="/pages/search-results">
              <p><Button variant="primary" size="lg">Lets Search</Button></p>
            </Link>
            </center>
          </div>
        </div>

      </div>
    )
  }
}

export default Home
