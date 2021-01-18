const express     = require("express");
const cors        = require("cors");
const request     = require("request");
const bodyParser  = require("body-parser");
const fetch       = require("node-fetch");

const app         = express();
const port        = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const chatApiURL          = "https://eu183.chat-api.com/instance217290/";
const chatApiToken        = "8ka7d3crjp0hktr4";
const chatApiPhoneNumber  = "+90 536 936 4350"
let fromMe  = false;
let lastMessage = ""

sapCAIURL                 = "https://api.cai.tools.sap/build/v1/dialog";
var conversationID        =
Math.random().toString(36).substring(2, 5) +
Math.random().toString(36).substring(2, 5); 
var conversationNameGen   =
Math.random().toString(36).substring(2, 15) +
Math.random().toString(36).substring(2, 15); 

process.on("unhandledRejection", (err) => {
  console.log(err);
});

app.get("/", function (req,res) {
  res.send("It's working.Project");
});

app.post("/webhook", function (req, res) {
    const data    = req.body;
  for (var i =0;i<1;i++) {
    // const body    = data.messages[messsage].body;
    // const body    = data.messages[messsage].body;
    if(i === data.messages.length-1){
      lastMessage = data.messages[i].body
    }
   // console.log(req.body);
    //res.status(200).end();
  }
  sapCAI("POST", lastMessage);
  res.send(res.statusCode)
});

function sapCAI(method,getUserMessage) {
  var sapCAIRequestOptions = {
    method: `${method}`,
    headers: {
      Authorization: "Token ada7d26151a8d18d09fe78ee2a1f851e",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        type: "text",
        content: '"' + getUserMessage + '"',
      },
      "conversation_id": conversationID + "-" + conversationNameGen,
    }),
  };
  fetch(sapCAIURL, sapCAIRequestOptions)
    .then((response) => response.json())
    .then((response) => {
      if (response.results.messages.length > 0) {
        for (let i = 0; i < response.results.messages.length; i++) {
          var sendMessageOptions = {
            phone: `${chatApiPhoneNumber}`,
            body: response.results.messages[i].content,
          };
          request({
            url:
            `${chatApiURL}sendMessage?token=${chatApiToken}`,
            method: "POST",
            headers: {
              Accept: "application-json",
            },
            json: sendMessageOptions,
          });
        }
      }
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

// `${chatApiURL}sendMessage?token=${chatApiToken}`,