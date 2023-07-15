var express = require('express');
var validator = require("validator");
var router = express.Router();
var dbConn = require('../lib/db');

// display user page
router.get('/', function(req, res, next) {      
    dbConn.query('SELECT * FROM users ORDER BY id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users',{data:''});   
        } else {
            // render to views/users/index.ejs
            // console.log(rows);
            res.render('users',{data:rows});
        }
    });
});

// display add user page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('users/add', {
        name    : '',
        email    : '',
        position :'',
        href     : '/users/add',
        title    : 'Add User',
        button_type : 'Add'
    })
})

//Add a new user
router.post('/add',function (req,res,next) {
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let errors = false;

    console.log(validator.isEmail(email));
    if(name.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter name ");
        // render to add.ejs with flash message
        res.render('users/add', {
            name: name,
            email: email,
            position:position
        })
    }else if(email.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter Email");
        // render to add.ejs with flash message
        res.render('users/add', {
            name: name,
            email: email,
            position:position
        })
    }else if(validator.isEmail(email) == false) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter valid Email");
        // render to add.ejs with flash message
        res.render('users/add', {
            name: name,
            email: email,
            position:position
        })
    }else if(position === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter position ");
        // render to add.ejs with flash message
        res.render('users/add', {
            name: name,
            email: email,
            position:position
        })
    }

    if(!errors) {
        var form_data = {
            name:name,
            email:email,
            position:position,
        }
        //insert query
        dbConn.query("INSERT INTO users SET?",form_data,(err,result)=>{

            //if(err) throw err
            if(err) {

                res.render('users/add', {
                    name: form_data.name,
                    email: form_data.email,
                    position:form_data.position
                })
            }else {
                req.flash('success','User Added successfully');
                res.redirect('/users');
            }
        });

    }
})

//Get details of selected one user
router.get("/edit/:id", function (req, res, next){
    let id = req.params.id;

    dbConn.query('SELECT * FROM users WHERE id = '+id , function (err,rows) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'User not found with id = ' + id)
            res.redirect('/users')
        }else {
            res.render('users/add',{
                title       : 'Edit User',
                id          : rows[0].id,
                name        : rows[0].name,
                email       : rows[0].email,
                position    : rows[0].position,
                href        : '/users/update/'+rows[0].id,
                button_type : 'Update'
            })
        }
    })
});

//Update User Details
router.post('/update/:id',function (req,res,next) {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let errors = false;

    console.log('Tirth Shah');
    if(name.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter name ");
        // render to add.ejs with flash message
        res.render('users/add', {
            id: id,
            name: name,
            email: email,
            position:position,
            title       : 'Edit User',
            href        : '/users/update/'+rows[0].id,
            button_type : 'Update'
        })
        console.log('1');
    }else if(email.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter Email");
        // render to add.ejs with flash message
        res.render('users/add', {
            id: id,
            name: name,
            email: email,
            position:position,
            title       : 'Edit User',
            href        : '/users/update/'+rows[0].id,
            button_type : 'Update'
        })
        console.log('2');
    }else if(validator.isEmail(email) == false) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter valid Email");
        // render to add.ejs with flash message
        res.render('users/add', {
            id: id,
            name: name,
            email: email,
            position:position,
            title       : 'Edit User',
            href        : '/users/update/'+rows[0].id,
            button_type : 'Update'
        })
        console.log('3');
    }else if(position === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter position ");
        // render to add.ejs with flash message
        res.render('users/add', {
            id: id,
            name: name,
            email: email,
            position:position,
            title       : 'Edit User',
            href        : '/users/update/'+rows[0].id,
            button_type : 'Update'
        })
        console.log('4');
    }

    if(!errors) {
        var form_data = {
            name:name,
            email:email,
            position:position,
        }
        //insert query
        dbConn.query("UPDATE users SET ? WHERE id = " + id,form_data,(err,result)=>{

            //if(err) throw err
            console.log(err);
            if(err) {

                res.render('users/add', {
                    id: id,
                    name: name,
                    email: email,
                    position:position,
                    title       : 'Edit User',
                    href        : '/users/update/'+id,
                    button_type : 'Update'
                })
            }else {
                req.flash('success','User updated successfully');
                res.redirect('/users');
            }
        });

    }
})

//Delete one user

router.get('/delete/(:id)',function (req,res,next) {
    
    let id=req.params.id;
    dbConn.query('DELETE FROM users WHERE id = '+id,function (err,result) {
        if(err) {

            req.flash('error',err);
            res.redirect('/users');
        }else {
            // set flash message
            req.flash('success', 'User successfully deleted! ID = ' + id);
            // redirect to user page
            res.redirect('/users');
        }
    })
})
module.exports = router;