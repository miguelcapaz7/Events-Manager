const EventRepo   = require('../Data/EventRepo');
const _eventRepo  = new EventRepo();
const Event       = require('../Models/Event');

// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.Index = async function(request, response){
    let events = await _eventRepo.allEvents();
    if(events!= null) {
        response.json({ events:events })
    }
    else {
        response.json( { events:[] })
    }
};


// GET request calls here to display 'Product' create form.
exports.Create = async function(request, response) {
    response.json( { errorMessage:"", event:{} });
};

// Receives POST data and tries to save it.
exports.CreateEvent = async function(request, response) {

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempEventObj  = new Event( {
        "name": request.body.name,
        "date": request.body.date,
        "time": request.body.time,
        "description": request.body.description
    });

    // Call Repo to save 'Event' object.
    let responseObject = await _eventRepo.create(tempEventObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.json({ event:responseObject.obj,
                                            errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item not created.");
        response.json( {
                        CreateEvent:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};

exports.Update = async function(request, response) {
    let eventID = request.body._id;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email

    let newEventObj = {firstName:firstName, lastName:lastName, email:email};

    // Parcel up data in a 'Event' object.
    let tempEventObj  = new Event( {
        _id: eventID,
        attendees: newEventObj
    });

    // Call update() function in repository with the object.
    let responseObject = await _eventRepo.update(tempEventObj);


    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage == "") {
        
        console.log('Saved without errors.');
        
    }

    // Update not successful. Show edit form again.
    else {
        console.log(JSON.stringify(responseObject.errorMessage));
        response.json( { 
            movie:      responseObject.obj, 
            errorMessage: responseObject.errorMessage});
    }
};

exports.UnAttendEvent = async function(request, response) {
    let eventID = request.body._id;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email

    let newEventObj = {firstName:firstName, lastName:lastName, email:email};
    
    let tempEventObj  = new Event( {
        _id: eventID,
        attendees: newEventObj
    });

    let responseObject = await _eventRepo.unattend(tempEventObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage == "") {
        
        console.log('Saved without errors.');
        
    }

    // Update not successful. Show edit form again.
    else {
        console.log(JSON.stringify(responseObject.errorMessage));
        response.json( { 
            movie:      responseObject.obj, 
            errorMessage: responseObject.errorMessage});
    }
};

exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _eventRepo.delete(id);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let events     = await _eventRepo.allEvents();
    response.json( {events:events});
}