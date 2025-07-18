const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");

const server = http.createServer((req,res)=>{
    if(req.url == "/" && req.method == "GET"){
        fs.readFile("Todo.html","utf-8",(err,data)=>{
            if(err){
                res.end("Server is Not Working!");
            }else{
                res.end(data);
            }
        })
    }else if(req.url == "/todo.js"){
        fs.readFile("todo.js","utf-8",((err,data)=>{
            if(err){
                res.end("File No Found!");
            }else{
            res.end(data);
            }
        }))
    }else if(req.url=="/task"&&req.method=="POST"){
        console.log("runs task");
          fs.readFile("todo.json","utf-8",((err,data)=>{
            if(err){
                console.log("err");
                  res.end(JSON.stringify({mess:"err"}));
            }else{
                 data = JSON.parse(data);
                 let body = "";
                req.on("data",(chunck)=>{
                    body+=chunck 
                })
                req.on("end",()=>{
                  body= JSON.parse(body);
                  body.status=false;
                  body.id=Date.now();
                  data.push(body);
                  fs.writeFile("todo.json",JSON.stringify(data),(err)=>{
                     if(err){
                        console.log("err1");
                res.end(JSON.stringify({mess:"err"}));
            }else{
                console.log("err2");
                res.end(JSON.stringify({mess:"ok",id: body.id}));
            }
                  })
                })
            }
        }))
    }else if(req.url == "/getAll"){
        fs.readFile(__dirname+"/todo.json","utf-8",(err,data)=>{
            res.end(data);
        })
    }else{
        res.end("404 File Not Found");
    }
})

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
