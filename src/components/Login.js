import React, {Component} from 'react'
import {GoogleLogin} from 'react-google-login'
import $ from 'jquery';
import eventBus from "../EventBus";
const clientId = '787276663684-065822sghlfajpjuo5ofd8ethbu35cc0.apps.googleusercontent.com'



class Login extends Component {
    constructor(props, ref) {
        super(props)
        this.onSuccess = this.onSuccess.bind(this)

        this.state = {
            user:null,
        }
        console.log("login created")
        
      }
    onSuccess = async (res)=> {
        console.log("success", res)
        var data = {'accountId': res.profileObj.googleId, 'token': res.accessToken};
        console.log(data)
        const response = await fetch("https://iqs.cs.bgu.ac.il/login", {
            method: "POST",
            body: JSON.stringify(data)
        })
        if(response.status < 200 || response.status >= 300){
            console.log("handle err")
        }
        else{
            this.setState({user: res.profileObj})
            eventBus.userStore = res
            $('#login').attr("style", "display:none");
            this.props.handler(res.profileObj)

        }       
        
    }


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

