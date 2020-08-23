var HomeController   = require('./Controllers/HomeController');
var UserController   = require('./Controllers/UserController');
var EventController  = require('./Controllers/EventController')
const authMiddleware = require('./authHelper')
const cors           = require('cors');


// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);

    app.get('/User/Register', cors(), UserController.Register);
    app.post('/User/RegisterUser', cors(), UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', cors(), UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    app.get('/Event/Index', cors(), EventController.Index);
    app.post('/Event/CreateEvent', cors(), EventController.CreateEvent);
    app.post('/Event/Update',cors(), EventController.Update);
    app.post('/Event/UnAttendEvent', cors(), EventController.UnAttendEvent);
    app.delete('/Event/Delete', cors(), EventController.Delete)
    // Sign in
    app.post(
        '/auth', cors(),
        // middleware that handles the sign in process
        authMiddleware.signIn,
        authMiddleware.signJWTForUser
    )

// Accessible to authenticated user. CORS must be enabled
// for client App to access it.
    app.get('/User/SecureAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.SecureAreaJwt)

// Accessible to manager or admin. CORS must be enabled for
// client App to access it.
    app.get('/User/ManagerAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.ManagerAreaJwt)

// Receives posted data from authenticated users.
    app.post('/User/PostAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.PostAreaJwt)

};
