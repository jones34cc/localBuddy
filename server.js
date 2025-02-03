const express = require("express");
const bodyparser=require("body-parser");
const app=express();
const ejs = require("ejs");







app.listen(3000,function()
{
    console.log("server is up and running on the port 3000");
})