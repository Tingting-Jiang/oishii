const express = require('express');
const app = express();
const multer = require("multer");
const fs = require("fs");



//MongoDB
// const URL = 'mongodb://localhost:27017/Oishii';
const URL = "mongodb+srv://oishii:oishii@cluster0.9hn8c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const mongoose = require('mongoose');
mongoose.connect(URL);


// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json());

//add session here
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    cookie: {},
    resave: true,
    saveUninitialized: true
}));



const recipeModel = require("../server/db/Recipe/recipe-model");

console.log("in server");

// require('./service/test')(app);
require('./service/spoon')(app);
require("./db/User/user-controller")(app);
require("./db/Recipe/recipe-service")(app);

let filename;
const imgSchema = mongoose.Schema({
        img:{data:Buffer,contentType: String}}
    ,{collection: 'image'}
);

const image = mongoose.model("image", imgSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        filename = Date.now()+ "-" + file.originalname;
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })

app.post("/api/upload",
    upload.single('file'),
    (req,res) => {
        console.log("in upload1");
        console.log("________", JSON.parse(req.body.recipe));
        const recipe = JSON.parse(req.body.recipe);
        console.log(typeof recipe);
        
        console.log("in upload2");
        const username = req.body.username;
        console.log("---9999", username);
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        console.log(" in function");
        const final_img = {
            contentType:req.file.mimetype,
            image: Buffer.from(encode_img,'base64')
        };
        //
        // const newRecipe = {
        //     title : req.body.title,
        //     summary: req.body.summary,
        //     servings: req.body.servings,
        //     readyInMinutes: req.body.readyInMinutes,
        //     extendedIngredients: req.body.extendedIngredients,
        //     analyzedInstructions: req.body.analyzedInstructions,
        //     image: filename
        // };
    
        console.log("00000", recipe.title);
        console.log(typeof recipe.title);
    
        const newRecipe = {
            ...recipe,
            image: filename
        };
        //
        // const newRecipe = {
        //     // ...req.body.recipe,
        //     // image: filename
        //     title: "dljfapfjasodf"
        // };


        // userModel.updateOne({username}, {$push: {usersRecipe : newRecipe}}
        // ,function(err,result){
        //     if(err){
        //         console.log(err);
        //     }else{
        //         // console.log("----------------------", result.img.Buffer);
        //         console.log("Saved To database");
        //         res.contentType(final_img.contentType);
        //         // console.log(final_img.image);
        //         res.send(final_img.image);
        //     }
        // })

        
        
        recipeModel.create(newRecipe,function(err,result){
            if(err){
                console.log(err);
            }else{
                // console.log("----------------------", result.img.Buffer);
                console.log("Saved To database");
                res.contentType(final_img.contentType);
                // console.log(final_img.image);
                res.send(final_img.image);
            }
        })
    })




app.listen(process.env.PORT || 4000);