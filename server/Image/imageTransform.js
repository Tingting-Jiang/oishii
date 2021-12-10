
const path = require("path");
const fs = require('fs');

const imageTransform =(image) =>{
    const file = "../uploads/" + image;
    // const filePath = "/Users/will/2021/fall/Final_Project/oishii/server/uploads/" + recipe.image;
    const filePath = path.resolve(__dirname, file);
    
    // if (fs.existsSync(filePath)) {
    //     //file exists
    //     console.log("found file!!!")
    // }else {
    //     console.log("not found!!")
    // }
    //
    const img = fs.readFileSync(filePath);
    const encodedString = img.toString('base64');
    return encodedString;
    
}


module.exports = imageTransform;