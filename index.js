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



/*const bcrypt = require('bcrypt-nodejs')
module.exports = app =>{    
    const encrypt = string => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(string, salt)
    }
    const data = async () =>{
        app.db('clientes')
        .whereRaw("numero_cr != '' AND presenca < 8 AND data_cr  BETWEEN data_cr   AND  date_add(data_cr, interval 1 year) ")
        .then(result=>{
            console.log(result[0].id)
        })
       
           
    }

    data()
}
*/
/*var now = Date.parse('2019-09-05 14:38:30')
var nova = new Date(now).toLocaleDateString()
var data = new Date().toLocaleDateString()

if( nova === data){
    console.log('pericles')
}else{
    console.log('juai')
}
console.log(data +' - - - -' + nova)*/

// let string = '994.497.330-07'

// let newString = string.replace('.','').replace('.','').replace('-','')
// console.log(newString)





/*****************************************************************
let data = [
    {
        id_grupo: 1,
        qtde_questoes: 40,
        ordem_gp: 1,
        id_prova: 1,
        q_p: 16,
        ordem_p: 1
    },
    {
        id_grupo: 1,
        qtde_questoes: 40,
        ordem_gp: 1,
        id_prova: 2,
        q_p: 24,
        ordem_p: 2
    },
    {
        id_grupo: 2,
        qtde_questoes: 50,
        ordem_gp: 2,
        id_prova: 3,
        q_p: 50,
        ordem_p: 1
    },
    {
        id_grupo: 3,
        qtde_questoes: 23,
        ordem_gp: 3,
        id_prova: 4,
        q_p: 23,
        ordem_p: 1
    },
]

const ordem_gp = (ordem) => ordem.ordem_gp == 1 ? ordem.ordem_p :false  

const dd = data.filter(ordem_gp)
const dada = dd.filter((ordem)=> ordem.ordem_p == 1 ? ordem.ordem_p :false )

    //console.log(dada)
let os = { acerts: '0011100111111001111100111001111110011111' }
 let array = os.acerts.split('')

let count_acertos = 0
let iterable = 0
let max_iterable = 0
let gp = 1
for (let value of dd){
    
    for( let i = 0 ; i <= value.q_p;i++){
         if(iterable == parseInt(value.q_p)){
           console.log(count_acertos)
         }
         count_acertos = count_acertos +  parseInt(array[iterable])
         iterable++
        //if(i != value.q_p) console.log(count_acertos)
     }
    
}
// let ordem_grupo = 1
// let questoes_por_grupo = {}
// for (let element  of data ){
//     element.ordem_gp == ordem_grupo ? questoes_por_grupo[ordem_grupo] = element.qtde_questoes : ordem_grupo = ordem_grupo + 1
//     if(element.ordem_gp == ordem_grupo) {
//         element.ordem_gp == ordem_grupo ? questoes_por_grupo[ordem_grupo] = element.qtde_questoes : ordem_grupo = ordem_grupo + 1   
//     }
    
// }

// console.log(questoes_por_grupo)
// let ordem_gp_prova = 1
// let ordem_prova = 1
// let questoes_por_prova = {}
// for (let element  of data ){
//     if(element.ordem_gp == ordem_gp_prova) element.ordem_p == ordem_prova ? questoes_por_grupo[ordem_gp_prova]= [...element.q_p] : ordem_prova 
//     if(element.ordem_p == ordem_prova)    ordem_prova++
    
    
// }
// console.log(questoes_por_grupo)
// data.map(async(element)=>{
//     element.ordem_gp == ordem_grupo ? questoes_por_grupo[ordem_grupo] = element.qtde_questoes : ordem_grupo = ordem_grupo + 1
    

// })
// console.log(ordem_grupo)
// console.log(questoes_por_grupo)

// data.filter((r)=>r)
// // console.log(data)
// let os = { acerts: '0011100111111001111100111001111110011111' }
// let array = os.acerts.split('')
// //console.log(array)
// let sum_acertos = 0

// const acertos = async (element, qtde_questoes) => {

// }
// // let iterable = 0
// // let qtde_questoes = 40
// // array.filter(async (element) => {

// //     if (iterable <= qtde_questoes) {
// //         parseInt(element) != 0 ? sum_acertos++ : sum_acertos
// //         iterable++
// //     }
// // })


// //console.log(sum_acertos)
// let sum_ = 0

// const fuc = async () => {
//     let op = 1
//     let og = 1
//     for await(let value of data) {
//         if (value.ordem_gp == og) {
//             if (value.ordem_p == op) {
//                 let iterable = 0 
            
//                 array.filter(async (element) => {
//                     if (iterable <= value.q_p) {
//                         parseInt(element) != 0 ? sum_++ : sum_
//                         iterable++
                        
//                     }
//                 })
//                 // console.log('ordem prova: '+op)
//                 // console.log('ordem grupo: '+og)
//                 // console.log(sum_)
//                 // console.log(iterable)
//                 op++
                
//                 if(value.ordem_p != op) 
//                 {
//                     og++
//                     op = 1
//                 }
//                 if(value.ordem_g != og)
//                 {
//                     og = 1
//                     op = 1
//                 } 
                
//             }
//         }
//     }
//     console.log(sum_)
// }
// fuc()
