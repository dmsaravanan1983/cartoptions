var express = require('express');
var request = require("request");
var port = 3001;
var app = express();
var router = express.Router();
var path = __dirname + '/';

app.use("/assets/js", express.static(__dirname + '/assets/js'));
app.use("/assets/css", express.static(__dirname + '/assets/css'));

router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", function(req, res) {
    res.sendFile(path + "product_list_page.html");
});

app.use("/", router);

app.get('/getData', function(req, res) {
    request({
        url: "https://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=20&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1",
        json: true
    }, function(error, response, body) {
        if (!error) {
            res.json({
                status: "success",
                result: body
            });
        } else {
            res.statusCode(500).send({
                status: "error",
                message: "error"
            })
        }
    })
});

app.listen(port, function() {
    console.log("Port Starts in http://localhost:3001/");
});