var Dog = require('../models/dog');
// List of all dogs
// List of all Costumes
exports.dog_list = async function(req, res) {
    try{
    theDog = await Dog.find();
    res.send(theDog);
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };
// for a specific dog.
exports.dog_detail = function(req, res) {
res.send('NOT IMPLEMENTED: dog detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.dog_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Dog();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    document.dogname = req.body.dogname;
    document.breed = req.body.breed;
    document.price = req.body.price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };
// Handle dog delete form on DELETE.
exports.dog_delete = function(req, res) {
res.send('NOT IMPLEMENTED: dog delete DELETE ' + req.params.id);
};
// Handle dog update form on PUT.
exports.dog_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: dog update PUT' + req.params.id);
};
// VIEWS
// Handle a show all view
exports.dog_view_all_Page = async function(req, res) {
    try{
    theDogs = await Dog.find();
    res.render('dog', { title: 'Dogs Search Results', results: theDog });
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };