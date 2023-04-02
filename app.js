const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000...");
});

// Loading css, images and more ! is needed in any app by using static
// which loads local files
app.use(express.static("public"));

// Express uses body-parser for parsing data from client
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  // Load the data we would like to send to a variable
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.Email;
  // const data = JSON.stringify({
  //   members: [
  //     {
  //       email_address: email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName,
  //       },
  //     },
  //   ],
  // });

  //   Here we json the data & create request params ready (the data is one of the params)
  // const jsonData = JSON.parse(data);

  const listid = "f76a83a190";
  const url = "https://us11.api.mailchimp.com/3.0/lists/" + listid + "/members";
  const options = {
    method: "POST",
    auth: "7420b9cd70210305724fa4cf7aecba95-us11",
  };

  client.setConfig({
    apiKey: "7420b9cd70210305724fa4cf7aecba95-us11",
    server: "us11",
  });

  // const add_member = async () => {
  //   const firstName = req.body.fName;
  //   const lastName = req.body.lName;
  //   const email = req.body.Email;

  const response = client.lists.addListMember(listid, {
    email_address: "welcome@gmail.com",
    status: "subscribed",
    merge_fields: {
      FNAME: "wel",
      LNAME: "come",
    },
  });

  if (response.status === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }

  // // Pack the params to request
  // const request = https.request(url, options, function (response) {
  //   response.on("data", function () {
  //     console.log(data);
  //   });
  // });
  // // Send request
  // request.write(data);
  // request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

// 7420b9cd70210305724fa4cf7aecba95-us11
// Request steps:
// 1. app.post("read where", function (req, res){here we want to send API request}
// 2. take data from the form(<form action="send where" method="post">) :
//                  const firstName = req.body.fName;
// 4. Load the data we would like to send to a variable :
//                  const data = {}
// 5. parsing the data to json :
//                  const jsonData = JSON.stringify(data);
// 6. setting all params ready:
//                  const url = "", const options = {method:'POST', auth:'apiKey, headers....'}
// 7. Pack the params to request :
//                  const request = https.request(url, options, function (response) {
//                      response.on("data", function () {
//                        console.log(JSON.parse(data));
//                      });
// 8. Send request :
//                  request.write(jsonData);
//                  request.end();
