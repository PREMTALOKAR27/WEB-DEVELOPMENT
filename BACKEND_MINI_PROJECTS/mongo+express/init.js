// this file created to insert values in database for onces 
// this file is run seperatly from terminal (node init.js)

const mongoose= require("mongoose");
const Chat = require("./models/chat");

main()
.then(console.log("connection successful"))
.catch((err)=>{
    console.log(err);
});

async function  main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
  {
    from: "Amit",
    to: "Rohan",
    msg: "Hey Rohan, did you complete the project?",
    created_at: new Date()
  },
  {
    from: "Neha",
    to: "Kunal",
    msg: "Please send me the notes.",
    created_at: new Date()
  },
  {
    from: "Suresh",
    to: "Anjali",
    msg: "Meeting is scheduled for tomorrow.",
    created_at: new Date()
  },
  {
    from: "Pooja",
    to: "Vikram",
    msg: "Happy Birthday! 🎉",
    created_at: new Date()
  },
  {
    from: "Arjun",
    to: "Meera",
    msg: "Let me know once you reach home.",
    created_at: new Date()
  }
];


Chat.insertMany(allChats);
