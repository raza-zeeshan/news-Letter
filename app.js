const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function (req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email: email,
                status: "subscribe",
                fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);


    const url = "https://us10.api.mailchimp.com/3.0/lists/f2dfdc95e4";

    const options = {

        method: "POST",
        auth:"zeeshan1:c8ffb0f702e66efb087d56602a67646d-us10"

    }

    const request=https.request(url,options,function(response){

        if(response.statusCode==200){
            res.sendFile(__dirname+"/succes.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }




        response.on("data",function(data){
            console.log(JSON.parse(data));

        });
    });

    request.write(jsonData);
    request.end();
    
});

app.post("/failure",function(req,res){

res.redirect("/");

})


app.listen(process.env.PORT || 5050, function () {
    console.log("server running at port 5050");
})

// c8ffb0f702e66efb087d56602a67646d-us10

// f2dfdc95e4