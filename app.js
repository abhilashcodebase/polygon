//const Web3EthContract = require('web3-eth-contract');
//const dagger = require('@maticnetwork/dagger')
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Web3 = require('web3');
let web3 = new Web3("http://localhost:8545");
//var Web3 = Web3EthContract.setProvider('http://localhost:9632');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const account = "0x979eA789D5d1f6C0f55BB3cB4f5160410a3E20D0";
const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"studentID","type":"uint256"},{"indexed":false,"internalType":"string","name":"fname","type":"string"},{"indexed":false,"internalType":"string","name":"lname","type":"string"},{"indexed":false,"internalType":"uint256","name":"projectID","type":"uint256"},{"indexed":false,"internalType":"string","name":"projectName","type":"string"}],"name":"studentRegistration","type":"event"},{"inputs":[{"internalType":"uint256","name":"studentID","type":"uint256"}],"name":"getData","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"studentID","type":"uint256"},{"internalType":"string","name":"fname","type":"string"},{"internalType":"string","name":"lname","type":"string"},{"internalType":"uint256","name":"projectID","type":"uint256"},{"internalType":"string","name":"projectName","type":"string"}],"name":"setData","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"studentMap","outputs":[{"internalType":"uint256","name":"studentID","type":"uint256"},{"internalType":"string","name":"fname","type":"string"},{"internalType":"string","name":"lname","type":"string"},{"internalType":"uint256","name":"projectID","type":"uint256"},{"internalType":"string","name":"projectName","type":"string"}],"stateMutability":"view","type":"function"}];
const address = "0xB233517d11430C45F64Eb533b4cc916C9A21Ae4a";
const contracts = new web3.eth.Contract(abi, address);
//const contractDagger = dagger.contract(contracts);
//console.log(contract);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// function instanceCreator(abi, address) {
//     return new web3.eth.Contract(abi, address)
// }

// const contractInstance = instanceCreator(abi, address).methods;
//console.log(contractInstance);
// contractInstance.methods.setInstructor("abhilash",10).send({from:'0x1010101010101010101010101010101010101010'}).then(setData => console.log(setData));
// app.post('/setInstructor', async function (req, res) {
//     var name = req.body.fname;
//     var age = req.body.userAge;

//     console.log(name,age);
//     var result = await contract.setInstructor(web3.utils.asciiToHex(name),age).send(
//         {from:'0x1010101010101010101010101010101010101010'});
//         if (result.status) {
//             res.json({ "status": true, "msg": "Success" })
//         }
//         else {
//             res.send({ "status": false, "msg": "Failed,Please try again later" });
//         }
    

// });
//////
// app.post('/setInstructor', async function (req, res) {
//     //console.log("setInstructor");
//     //variable declaration
//     var name = req.body.name;
//     var age = req.body.age;
//     console.log(name);
//     console.log(age);
//     console.log("i came till here");
//     var dataresult = await contract.methods.setInstructor(web3.utils.asciiToHex(name),age).send(
//     //var result = await contract.setInstructor( web3.utils.asciiToHex(name),age).send(
//         {
//             from: `${account}`,
//             gasLimit: 2000000
//         }
//     ).then(console.log);
//     if (dataresult.status == true) {
//         res.json({ "status": true });
//     }
//     else {
//         res.json({ "status": false })
//     }
// });
app.post('/setInstructor', async function (req, res) {
        //console.log("setInstructor");
        //variable declaration
        var name = req.body.name;
        var age = req.body.age;
        console.log(name);
        console.log(age);
        console.log("i came till here");
        var dataresult = await contract.methods.setInstructor(web3.utils.asciiToHex(name),age).send(
        //var result = await contract.setInstructor( web3.utils.asciiToHex(name),age).send(
            {
                from: `${account}`,
                gasLimit: 2000000
            }
        ).then((receipt) => {
            if (receipt.status == true) {
                res.json({ "status": true })
                console.log(receipt);
            }
            else {
                res.send({ "status": false});
            }
        }).catch((error) => {
            console.log(`\nError**********${error}`)
        });
    });

    // app.post('/getInstructor', async function (req, res) {
    //     console.log("inside");
    //     //console.log("getProperty")
    //     //var propertyId = req.body.propertyId;
    //     var val = await contract.methods.getInstructor().call(
    //         {
    //             from: `${account}`
    //         }
    //     );
    //     var outputObj = {
    //         name: val[0],
    //         age: val[1],
    //     }
    //     // var outputObj = { propertyId: propertyId, squarefeet: squarefeet, location: location, currentOwner: currentOwner, district: district, state: state };
    //     console.log(outputObj);
    //     res.json(outputObj);
    app.get('/getInstructor', async function (req, res) {
        //console.log("salesList")
    
        var data = await contracts.methods.getInstructor().call();
    
        var outputObj = {
            sales: []
        }
        for (const i of data) {
            // console.log(i)
            var out = await contract.methods.getInstructor(i).call();
            var fname = web3.utils.hexToString(out[0]);
            console.log(JSON.stringify(saleId));
            var age = out[1];
            
            var obj = {
                "fname": fname,
                "age": age
    
            }
    
            outputObj.sales.push(obj);
        }
        //console.log(outputObj);
        res.json(outputObj);
    });

    app.post('/setData', async function (req, res) {
        //console.log("setInstructor");
        //variable declaration
        // var name = req.body.name;
        // var age = req.body.age;
        // console.log(name);
        // console.log(age);
        // console.log("i came till here");

        var studentID = req.body.studentID;
        var fname = req.body.fname;
        var lname = req.body.lname;
        var projectID = req.body.projectID;
        var projectName = req.body.projectName;

        var dataresult = await contracts.methods.setData(studentID,web3.utils.asciiToHex(fname),web3.utils.asciiToHex(lname),projectID,web3.utils.asciiToHex(projectName)).send(
        //var result = await contract.setInstructor( web3.utils.asciiToHex(name),age).send(
            {
                from: `${account}`,
                gasLimit: 2000000
            }
        ).then((receipt) => {
            if (receipt.status == true) {
                res.json({ "status": true }) 
                
            }
            else {
                res.send({ "status": false});
            }
        }).catch((error) => {
            console.log(`\nError**********${error}`)
        });
    });

    app.post('/getData', async function (req, res) {

        console.log("getData")
        var studentid = req.body.studentID;
        var val = await contracts.methods.getData(studentid).call({
            from:`${account}`
        }
        );
        var outputObj = {
            studentID: val[0],
            fname: web3.utils.hexToString(val[1]),
            lname: web3.utils.hexToString(val[2]),
            projectID: val[3],
            projectName: web3.utils.hexToString(val[4]),
            
        }
        // var outputObj = { propertyId: propertyId, squarefeet: squarefeet, location: location, currentOwner: currentOwner, district: district, state: state };
        
        console.log(outputObj);
        res.json(outputObj);

       
        
    
    
    })
//contract.events.studentRegistration({fromBlock:0},function(error,event){console.log(error)});
app.listen(8500)
console.log("8500");