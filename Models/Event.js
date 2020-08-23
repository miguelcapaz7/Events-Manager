var mongoose         = require('mongoose');

var eventSchema    = mongoose.Schema({
        
        name:   {"type" : "String"},
        date:    {"type" : "String"},
        time: {"type": "String"},
        description: {"type": "String"},
        attendees: {"type": Array}
    }, 
    {collection : 'events' },
    { versionKey : false }
    );
var Event    = mongoose.model('Event', eventSchema);
module.exports = Event;