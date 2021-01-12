var express= require('express');
var router=express.Router();
//JUST EXAMPLE
let data = [
    { id: 1, title: 'Create a project', completed: false, createdOn: new Date() },
    { id: 2, title: 'Write code', completed: false, createdOn: new Date() },
    { id: 3, title: 'Upload to Github', completed: false, createdOn: new Date()
},
]

router.get('/', function (req, res) {
    res.status(200).json(data);
});


router.get('/:id', function (req, res) {
    
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

module.exports=router