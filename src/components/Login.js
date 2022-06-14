import React, {Component} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import $ from 'jquery';
import eventBus from "../EventBus";


const clientId = '787276663684-065822sghlfajpjuo5ofd8ethbu35cc0.apps.googleusercontent.com'
// const {OAuth2Client} = require('google-auth-library');

// const client = new OAuth2Client(clientId)
// const googleAuth = async (token) => {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: clientId
//     })
//     const payload = ticket.getPaload();

//     console.log(`User ${payload.name} verified`)
//     const {sub, email, name, picture} = payload;
//     const userId = sub
//     return {userId, email, fullName: name, photoUrl: picture}
// }

// const refreshTokenSetup= (res) => {
//     let refreshTiming = (res.tokenObj.expies_in || 3600 - 5 *60)*1000;
//     const refreshToken = async () => {
//         const newAuthRes = await res.reloadAuthResponse();
//         refreshTiming = (newAuthRes.expies_in || 3600 - 5 * 60)* 1000;
//         console.log('newAuthToken', refreshTiming)
//         setTimeout(refreshToken, refreshTiming)
//     }
//     setTimeout(refreshToken, refreshTiming)
// }

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
        const response = await fetch("https://iqs.cs.bgu.ac.il/login", {
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

