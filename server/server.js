const express = require('express');
const app = express();


image related
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
//
// app.use(methodOverride('_method'))

// const fs = require("fs"),
//     multer = require("multer");
const upload = multer({ dest: "uploads/" });


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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//add session here
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    cookie: {},
    resave: true,
    saveUninitialized: true
}));





console.log("in server");

// require('./service/test')(app);
require('./service/spoon')(app);
require("./db/User/user-controller")(app);

////////////////////////////

app.use(bodyParser.urlencoded(
    { extended:true }
))

app.use(upload.array());
app.use(express.static('public'));

const imgSchema = mongoose.Schema({
    img:{data:Buffer,contentType: String}
});
const image = mongoose.model("image", imgSchema);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
// const upload = multer({ storage: storage })

// app.post("api/uploading",
//     upload.single('file'),
//     (req,res) => {
//     console.log("in upload");
//     const img = fs.readFileSync(req.file.path);
//     const encode_img = img.toString('base64');
//     const final_img = {
//         contentType:req.file.mimetype,
//         image:new Buffer(encode_img,'base64')
//     };
//     image.create(final_img,function(err,result){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(result.img.Buffer);
//             console.log("Saved To database");
//             res.contentType(final_img.contentType);
//             res.send(final_img.image);
//         }
//     })
// })
//
//
app.post("api/upload",
    upload.single("file"),
    (req, res)=>{
    console.log("new new");
        console.log(req.body);
        console.log(req.files);
        res.json({ message: "Successfully uploaded files" });
    });


app.listen(process.env.PORT || 4000);