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
        //res.render
    }
})

module.exports = router;