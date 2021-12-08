const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const URI  = "mongodb+srv://oishii:oishii@cluster0.9hn8c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const conn = mongoose.createConnection(URI);
conn.once ('open', () => {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads")
})

const storage = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });


const mongoose = require('mongoose')

const fs = require('fs');
const path = require('path');




module.exports = (app) => {
    const upload = (req, res) => {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            contentType:req.file.mimetype,
            image:new Buffer(encode_img,'base64')
        };
        image.create(final_img,function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log(result.img.Buffer);
                console.log("Saved To database");
                res.contentType(final_img.contentType);
                res.send(final_img.image);
            }
        })
    }
    

    
    
    
    
    
    app.post('/api/upload',upload("file"), upload );
};