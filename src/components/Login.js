import React, {Component} from 'react'
import {GoogleLogin} from 'react-google-login'
import $ from 'jquery';

const clientId = '787276663684-065822sghlfajpjuo5ofd8ethbu35cc0.apps.googleusercontent.com'
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(clientId)

const googleAuth = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId
    })
    const payload = ticket.getPaload();

    console.log(`User ${payload.name} verified`)
    const {sub, email, name, picture} = payload;
    const userId = sub
    return {userId, email, fullName: name, photoUrl: picture}
}

const refreshTokenSetup= (res) => {
    let refreshTiming = (res.tokenObj.expies_in || 3600 - 5 *60)*1000;
    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expies_in || 3600 - 5 * 60)* 1000;
        console.log('newAuthToken', refreshTiming)
        setTimeout(refreshToken, refreshTiming)
    }
    setTimeout(refreshToken, refreshTiming)
}

class Login extends Component {
    constructor(props, ref) {
        super(props)
        this.onSuccess = this.onSuccess.bind(this)
        this.state={
            user:null
        }
        console.log("login created")
      }
    onSuccess = async (res)=> {
        console.log("success", res)
        refreshTokenSetup(res)
        var data = {'accountId': res.profileObj.googleId, 'token': res.accessToken};
        console.log(data)
        await fetch("/login", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(()=>{
            this.setState({user: res.profileObj})
            $('#login').attr("style", "display:none");
            }    
        )
        
        
    }

    onFail = (res)=> {
        console.log("fail", res)
    }
    render () {

    return (
        <div id="login">
            <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={this.onSuccess}
            onLogoutSuccess={()=> console.log("logout")}
            onFailure={this.onFail}
            cookiePolicy={'single_host_origin'}
            style={{}}
            className="auth"
                />
        </div>
    )
    
    }
}
export default Login;

