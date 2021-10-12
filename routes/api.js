// dependencies
const { raw } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { join } = require('path');

//  ---------------------------------------------------------------------     Endpoints/Routes

//  CRUD - Create, Read, Update, Delete

// get all resources - read
router.get('/', function(req, res) {
    try{
        var rawdata = fs.readFileSync('data.json');
        var chats = JSON.parse(rawdata);

        console.log(chats);

        var filteredArr = chats.filter((val) => {
            return val._id == req.params.id   // this has to be a boolean value
        })

        res.status(200).json(chats);
    } catch (err){
        res.status(500).json({message: err});
    }


});

// get resources by channel
router.get('/:channel', function(req, res) {
    try{
        var rawdata = fs.readFileSync('data.json');
        var chats = JSON.parse(rawdata);

        var filteredArr = chats.filter((val) => {
            return val.channel == req.params.channel   // this has to be a boolean value
        })
        console.log(filteredArr);
        res.status(200).json(filteredArr);
    } catch (err){
        res.status(500).json({message: err});
    }
});

// get resources by author   -------------------  needs work
// router.get('/:author', function(req, res) {
//     try{
//         var rawdata = fs.readFileSync('data.json');
//         var chats = JSON.parse(rawdata);

//         var filteredArr = chats.filter((val) => {
//             return val.author == req.params.author   // this has to be a boolean value
//         })
//         console.log(filteredArr);
//         res.status(200).json(filteredArr);
//     } catch (err){
//         res.status(500).json({message: err});
//     }
// });

// create a new resource - create
router.post('/', function(req, res) {
    try{
        console.log("Posted Object is: ", req.body);
        // open the file
        const rawdata = fs.readFileSync('data.json');
        //  parse the file so we can use it
        var chats = JSON.parse(rawdata);

        //  add data, but controlled
        var rawbody = req.body;

        var newObj = {
            message: null,
            author: null,
            channel: null,
            timeStamp: new Date()
        };

        if (rawbody.message != null){
        newObj.message = rawbody.message;
        }
        if (rawbody.author != null){
        newObj.author = rawbody.author;
        }
        if (rawbody.channel != null){
        newObj.channel = rawbody.channel;
        }    
//  THis may need to be looked at with the timeStamp junk    
        rawbody.timeStamp = new Date();
        // if (rawbody.timeStamp != Date.now()){
        //     newObj.timeStamp = rawbody.timeStamp;
        // }


        // get the actual index
        newObj._id = chats.length;
        // add our new object to the array
        chats.push(newObj);

        // save the data back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(chats));

        // return the data to the user
        res.status(201).json(newObj);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//  update a resource
router.patch('/:id', function( req, res) {
    try{
        console.log("Object being patched is: ", req.params.id, req.body);
        // open the file
        const rawdata = fs.readFileSync('data.json');
        //  parse the file so we can use it
        var chats = JSON.parse(rawdata);

        //  add data, but controlled
        var id = req.params.id;
        var rawbody = req.body;

        if (rawbody.message != null){
        chats[id].message = rawbody.message;
        }
        if (rawbody.author != null){
        chats[id].author = rawbody.author;
        }
        if (rawbody.channel != null){
        chats[id].channel = rawbody.channel;
        }    
        chats[id].timeStamp = new Date();
         

        
        // save the data back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(chats));

        // return the data to the user
        res.status(200).json(chats[id]);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// delete a resourse
router.delete('/:id', function(req, res){
    // capture the id
    var id = req.params.id;
    // open the file for reading
    const rawdata = fs.readFileSync('data.json');
        //  parse the file so we can use it
    var chats = JSON.parse(rawdata);

    // if found delete
    if(chats.length > id){
        chats.splice(id, 1);

// write back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(chats));
  // show succeful message
        res.status(200).json({message: "ok"});
    } else {
  // if no item found throw error message
        res.status(500).json({ message: "Something went wrong"});
    }
});



//  ----------------------------------------------------------------  end routes/endpoints

module.exports = router;