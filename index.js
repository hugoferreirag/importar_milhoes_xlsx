const app = require('express')()
const db = require('./db')
const xxx = require('xls-to-json')
const xxx2 = require('xlsx-to-json')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer');
app.db = db
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const pathToImg = (name, path) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + 'import' + '.xlsx')
    }
})




let storage;
let upload;
storage = pathToImg(null,'../')
upload = multer({ storage })
app.post('/upload',upload.single('file') ,(req, res) => {

    console.log(req.file)
    const path = req.file.path
    xxx2({
        input: `${path}`,
        output: `../${req.file.originalname}.json`,
        lowerCaseHeaders: true
    },async  (err, result) => {
        if (err) {
            res.status(200).json(err)
        } else {
            let chunkSize = 2500
           
            await app.db.batchInsert('respostas', result, 2500)
            .then(result=>{res.status(200).json(result)
            console.log(result)})
            .catch(err=>{res.status(500).json(err)
            console.log(err)})         
        }
    })
})
app.get('/lele',  (req, res) => {
 app.db('respostas')
 .then(result=>console.log(result))
 .catch(err=>console.log(err))
})

app.listen(3000, () => {
    console.log('runnings')
})