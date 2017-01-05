var fs = require('fs');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.potteryList = function(req, res) {
    var pottery1 = {
        _id: "1",
        type: "mug",
        description: "a glazed mug with green streaks throught the middle"
    };
    var pottery2 = {
        _id: "2",
        type: "bowl",
        description: "a very round bowl with wavy orange"
    };
    var pottery3 = {
        _id: "3",
        type: "fountain",
        description: "my expensive custom fountain, fairly modular"
    }
    var potteries = [pottery1, pottery2, pottery3];
    sendJSONresponse(res, 200, potteries);
}

module.exports.potteryFile = function(req, res) {

    var file = req.files.file;
    console.log("the filepath: {}", file.path);
    fs.readFile(file.path, function (err, data) {
        if(err) {
            console.log("Could not read file data");
            sendjsonresponse(res, 400, err);
        }
        var newPath = __dirname + "/../../public/images/uploads/" + file.name;
        fs.writeFile(newPath, data, function (err) {
            if(err) {
                console.log("Could not write file data");
                sendjsonresponse(res, 400, err);
            }
            console.log("success!");
            sendJSONresponse(res, 200, file.name);
        });
    });


}
