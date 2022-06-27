import React, {Component} from 'react'
import {GoogleLogin} from 'react-google-login'
import $ from 'jquery';
import eventBus from "../EventBus";
require('dotenv').config()
const clientId = process.env.REACT_APP_clientId


class Login extends Component {
    constructor(props, ref) {
        super(props)
        this.onSuccess = this.onSuccess.bind(this)

        this.state = {
            user:null,
            // isSignedIn:false,
        }
        console.log("login created")
        
      }
    onSuccess = async (res)=> {
        console.log("success", res)
        // refreshTokenSetup(res)
        var data = {'accountId': res.profileObj.googleId, 'token': res.accessToken};
        console.log(data)
        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(data)
        })
        if(response.status < 200 || response.status >= 300){
            console.log("handle err")
        }
        else{
            this.setState({user: res.profileObj})
            // eventBus.dispatch("login", { detail: res.profileObj});
            eventBus.userStore = res
            // this.setState({"isSignedIn": true})
            // console.log(eventBus.userStore)
            $('#login').attr("style", "display:none");
            this.props.handler(res.profileObj)

        }       
        
    }
    // handleLogin = async googleData => {
    //     const res = await fetch("/api/v1/auth/google", {
    //         method: "POST",
    //         body: JSON.stringify({
    //         token: googleData.tokenId
    //       }),
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     })
    //     const data = await res.json()
    //     // store returned user somehow
    //   }

    onFail = (res)=> {
        console.log("fail", res)
    }
    render () {

    return (
        <div>
        <div id="login">
            <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={this.onSuccess}
            onLogoutSuccess={()=> console.log("logout")}
            onFailure={this.onFail}
            cookiePolicy={'single_host_origin'}
            className="rounded-pill"
            style={{}}
            isSignedIn={eventBus.userStore !== null}
                />
        </div>
        </div>
    )
    
    }
}
export default Login;

