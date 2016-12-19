 var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.eventsList = function(req, res) {
    var event1 = {
        _id: "1",
        name: "Minnetonka Arts Fair",
        date: "December 14, 2016",
        address: "Minnetonka Arts Center",
        time: "2PM",
        description: "Come view my work and others during the open ours of the Minnetonka Christmass Art show. "
    };
    var event2 = {
        _id: "2",
        name: "Excelsior Art by the Lake",
        date: "Jun 5th, 2016",
        address: "Excelsior Fairgrounds",
        time: "2pm",
        description: "Come view my booth outside alongside lake minnetonka."
    };
    var events = [event1, event2];
    sendJSONresponse(res, 200, events);
}            
