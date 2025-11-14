let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Report = require('../models/report');

//get
//post
//put
//delete
//CRUD operations
//read

// get route for the read reportlist page - read operation
router.get('/', async (req, res, next) => {
    try 
    {
    const ReportList = await Report.find();
    //console.log(reportList);
    // Render the reports list view (moved to views/Reports/list.ejs)
    res.render('Reports/list',{
        title: 'Reports',
        ReportList: ReportList
    })
    }

    catch (err)
    {
        console.error(err);
        res.render('Reports/list',{
            error:'Unable to retrieve report list'
    })
    }
})

// get route for the displaying the add page - create operation
router.get('/add',async (req, res, next) => {
    try {
        res.render('Reports/add',{
            title: 'Add Report'
        });
    }
    catch (err)
    {
        console.error(err);
        res.render('Reports/add',{
            error:'Unable to retrieve report list'
    })
    }
});
// Post route for processiong the add page - create operation
router.post('/add', async (req, res, next) => {
    try {
        let newReport = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            status: req.body.status,
            location: req.body.location,
            date: req.body.date
        };
        await Report.create(newReport);
        res.redirect('/reports');
    } catch (err) {
        console.error(err);
        res.render('Reports/add', {
            error: 'Unable to create report'
        });
    }
});
// Get route for Displaying the edit page - Update operation
router.get('/edit/:id',async (req, res, next) => {

});
// Post route for processiong the edit page - Update operation
router.post('/edit/:id',async (req, res, next) => {

});
// Get route to perform delete operation - Delete operation
router.get('/delete/:id',async (req, res, next) => {

});

module.exports = router;