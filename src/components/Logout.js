import React, {Component} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import $ from 'jquery';
import eventBus from "../EventBus";


const clientId = '787276663684-065822sghlfajpjuo5ofd8ethbu35cc0.apps.googleusercontent.com'



class Logout extends Component {
    constructor(props, ref) {
        super(props)
        this.onLogoutSuccess = this.onLogoutSuccess.bind(this)

        this.state = {
            user:null
        }
        console.log("logout created")
        
      }

    onLogoutSuccess = ()=>{
        console.log("logOut")
        eventBus.userStore = null;
        eventBus.search_text = ''
    }

    render () {

    return (
        <div>
        <div id="logOut">
            <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={this.onLogoutSuccess}
            className="rounded-pill"

            />
            
        </div>
        </div>
    )
    
    }
}
export default Logout;

