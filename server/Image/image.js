const multer = require("multer");
const fs = require("fs");
const recipeModel = require("../db/Recipe/recipe-model");
const uerModel = require("../db/User/user-model");
const recipeDao = require("../db/Recipe/recipe-dao");
const userDao = require("../db/User/user-dao");


let filename;

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

module.exports = (app) =>{
    const createRecipe =(req, res) =>{
        console.log("in create recipe ");
        const recipe = JSON.parse(req.body.recipe);
        const username = req.body.username;
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            contentType:req.file.mimetype,
            image: Buffer.from(encode_img,'base64')
        };
        
        const newRecipe = {
            ...recipe,
            image: filename
        };
        
        recipeModel.create(newRecipe, function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log("Saved Recipe To database");
                res.contentType(final_img.contentType);
                res.send(final_img.image);
            }
        })
        
        recipeDao.findRecipeByFileName(filename)
            .then(recipe => {
                userDao.createRecipe(username, recipe)
                    .then(status =>
                    console.log("Save recipe in user DB"))
            })
        
        
    }
    
    
    const updateAvatar = (req, res) => {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const userAvatar = {
            contentType: req.file.mimetype,
            image: Buffer.from(encode_img, 'base64')
        };
    
        userDao.updateAvatar(req.body.username, filename, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Saved Avatar To database");
                res.contentType(userAvatar.contentType);
                res.send(userAvatar.image);
            }
        })
    }
    
    
    
    app.post("/db/upload", upload.single('file'), createRecipe);
    app.post("/db/updateAvatar", upload.single('file'), updateAvatar);
}


