const dog = require('../models/dog');
var Dog = require('../models/dog');
// List of all dogs
// List of all Costumes
exports.dog_list = async function (req, res) {
    try {
        theDog = await Dog.find();
        res.send(theDog);
    }
    catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};
// for a specific dog.
exports.dog_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await dog.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Costume create on POST.
exports.dog_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Dog();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    document.dogname = req.body.dogname;
    document.breed = req.body.breed;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};
// Handle dog delete form on DELETE.
exports.dog_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Dog.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }

};
// Handle dog update form on PUT.
exports.dog_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body 
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await dog.findById(req.params.id)
        // Do updates of properties
        if (req.body.dogname) toUpdate.dogname = req.body.dogname;
        if (req.body.breed) toUpdate.breed = req.body.breed;
        if (req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};
// VIEWS
// Handle a show all view
exports.dog_view_all_Page = async function (req, res) {
    try {
        theDogs = await Dog.find();
        res.render('dog', { title: 'Dogs Search Results', results: theDogs });
    }
    catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.dog_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await dog.findById( req.query.id)
    res.render('dogdetail', 
{ title: 'Dog Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.dog_create_Page =  function(req, res) {

    console.log("create view")
    try{
        res.render('dogcreate', { title: 'Dog Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a costume.
// query provides the id
exports.dog_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Dog.findById(req.query.id)
        res.render('dogupdate', { title: 'Dog Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.dog_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await Dog.findById(req.query.id)
        res.render('dogdelete', { title: 'Dog Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};




