const express =require('express');
const app=express();
const port=8080;
const path= require('path');
const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'))

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));



app.listen(port,()=>{
    console.log(`server running at ${port}`);
});

app.get("/", (req,res)=>{
    res.render('home.ejs');
});

let posts=[{
    id:uuidv4(),
    username:"prem",
    caption:"my first post",
    image:"https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    likes:"23"
},
{
    id:uuidv4(),
    username:"rahul",
    caption:"my second post",
    image:"https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
    likes:"322"
},
{
   id:uuidv4(),
   username:"rani",
   caption:"my thrid post",
   image:"https://img.freepik.com/free-vector/woman-with-braided-hair-illustration_1308-174675.jpg?semt=ais_hybrid&w=740&q=80",
   likes:"33"
}
]

// view all posts
app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
});

// create new post
app.get('/posts/new',(req,res)=>{
    res.render("create.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,image,caption,likes}=req.body;
    const id = uuidv4();
    posts.push({id,username,caption,image,likes});
    res.redirect('/posts');
})


//view specific post
app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>p.id===id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('fulldetails.ejs',{post});
});

//delete specific post
app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>p.id !== id);
    res.redirect('/posts');
});

//update specific post
app.get('/posts/edit/:id',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id == id);
    res.render('update.ejs',{post});
});

app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let {image,caption,likes}=req.body;
    let post=posts.find((p)=>p.id == id);
    post.image=image;
    post.caption=caption;
    post.likes=likes;

    res.redirect('/posts');
});

