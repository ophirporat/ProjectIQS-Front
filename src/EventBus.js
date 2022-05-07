const eventBus = {
    on(event, callback){
        document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    }
};

export var search_text = ""

export var userStore = null;
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

export default eventBus;