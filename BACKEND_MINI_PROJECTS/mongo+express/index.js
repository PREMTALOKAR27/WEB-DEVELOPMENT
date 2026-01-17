const express= require("express");
const app = express();
const path= require("path");
const Chat= require("./models/chat.js");
const methodOverride= require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const mongoose= require("mongoose");

main()
.then(console.log("connection successful"))
.catch((err)=>{
    console.log(err);
});

async function  main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


app.get("/", (req,res)=>{
    res.send("root is working");
})

// index root for view all chats
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
});

// root for add new chats
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats", (req,res)=>{
    let {from, to, msg}= req.body;
    /*
    //methode 1
    let newChat={
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    };
    Chat.insertOne(newChat);
    */

    let newChat= new Chat({
        from: from,
        to: to,
        msg:msg,
        created_at: new Date()
    });

    newChat
    .save()
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    
    res.redirect("/chats");
    
});

// update information
app.get("/chats/:id/edit", async (req,res)=>{
    let {id}= req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

app.put("/chats/:id", async (req,res)=>{
    let {id}= req.params;
    let {msg: newMsg}= req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id, {msg:newMsg, created_at: new Date()}, {runValidators: true, new: true});
    res.redirect("/chats");
});

// delete information 
app.delete("/chats/:id",async (req,res)=>{
    let {id}= req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

app.listen(8080, ()=>{
    console.log("server running at 8080");
});

