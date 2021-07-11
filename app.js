require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const convert = require("xml-js");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//read environment variables
const apikey = process.env.API_KEY;

// Rate limit 1/sec
// Disable this if you're making multiple calls or chaining
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

// apply to all requests
app.use(limiter);

// Allow cross origin request
app.use(cors());

// Routes
// Default route :1800
app.get("/", (req, res) => res.send("Index"));

//A POST route
app.post("/api/someroute", async (req, res) => {
console.log("api/someroute");
  try {
    var postData = req.body;
    console.log(postData);
    
    //some operation that gets or sets data
    //...
    let data = {data: "some data"};
    
    return res.status(200).json({
        success: true,
        data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }  
});

app.listen(port, () => console.log(`App listening on port ${port}!`));