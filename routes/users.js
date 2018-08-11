const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Icodetail = require('../models/icodetail');
const ContractDetail = require('../models/contractdetail');
const HDetail = require('../models/homedetail');
const Walletdetail = require('../models/walletaddr');
const config = require('../config/configuration');
const bcrypt = require('bcryptjs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

// Register
router.post('/register', (req, res, next) => {

    if (!req.body.email || !req.body.password)
        return res.status(200).send({
            success: false,
            message: 'Please enter email and password.'
        });

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser, (err, user) => {
        if (err)
             res.status(200).send({
                success: false,
                message: 'That email address already exists.'
            });
        else
             res.status(201).send({
                success: true,
                msg: 'User was registered'
            });
    });
});




// Authenticate
router.post('/authenticate', (req, res, next) => {

    User.findOne({
        username: req.body.username
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign({
                        data: user
                    }, config.secret);
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user : user
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Wrong password.',
                        pass: req.body.password,
                        dbpass: user.password,
                        username: req.body.username,
                        err: err,
                        isMatch: isMatch
                    });
                }
            });
        }
    });
});

// Profile
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     res.json({ user: req.user });
// });

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {

   
        return res.status(200).send({
            success: false,
            message: 'Dashboard Works!'
        });
 });


// updateprofile
router.put('/updateprofile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
console.log(req.body.password['passd1']);
var id = req.body.id;
if (id == '') {
        return res.send(400);
    }

    var updateProfile = {};
    

updateProfile.email = req.body.email1;
//updateProfile.password = req.body.password;
updateProfile.name = req.body.name1;

if(req.body.password['passd1'] === req.body.password['passd2'] && req.body.password['passd1'] != "")
{
    

    User.findById(req.body.id, function(err, p) {
                if (!p)
                return next(new Error('Could not load Document'));
                else {
                // do your updates here
                p.password = req.body.password['passd1'];
                p.name = req.body.name1;
                p.email = req.body.email1;

                p.save(function(err) {
                if (err)
               
                console.log('error');
                
                else
                {
                console.log('success');
                
                }
                

           
            });
            }
            }); 

    res.status(201).send({
success: true,
msg: 'Profile was updated'
});   
   
} else {

User.findOneAndUpdate({_id: id}, {$set : updateProfile},

 {new: true},
    function(err, result) {
            if (err) {
                res.status(400).send({
                success: false,
                message: 'Update Error'
            });
            } else {
               res.status(201).send({
                success: true,
                msg: 'Profile was updated',
                result: result
            });
            }
        });
}



});


//Create ICO
router.post('/createico', (req, res, next) => {

 Icodetail.collection.count( function(err, cont) {
        console.log(cont);

        if (cont > 0) {
            res.send({
                success: true,
                message: 'Record found.'
            });

        } else {


    const newico = new Icodetail({

        tn : req.body.tn,

        ts : req.body.ts,

        decimal : req.body.decimal,

        totalsupply : req.body.totalsupply,

        rate : req.body.rate,

        preicostartdate : req.body.preicostartdate,

        preicoenddate : req.body.preicoenddate,

        icostartdate : req.body.icostartdate,

        icoenddate : req.body.icoenddate,
            
        timerenddate : req.body.timerenddate,

        softcap : req.body.softcap,

        hardcap : req.body.hardcap,

        ownerwa : req.body.ownerwa,

        id : req.body.id

    });

    // Icodetail.addIco(newico, (err, result) => {
    //     if (err)
    //          res.status(200).send({
    //             success: false,
    //             message: 'Error'
    //         });
    //     else
    //          res.status(201).send({
    //             success: true,
    //             msg: 'ICO details saved successfully'
    //         });
    // });

    newico.save(function(err, result) {
        if (err)
             res.status(200).send({
                success: false,
                message: 'Error'
            });
        else
             res.status(201).send({
                success: true,
                msg: 'ICO details saved successfully'
            });
    });
}
});
});

// updateico
router.put('/updateico', (req, res, next) => {

var id = req.body.id;
console.log(req.body);
if (id == '') {
         res.status(400).send({
                success: false,
                message: 'Error'
            });
    }


//Icodetail.findOne({ "$or" : [ {tn: req.body.tn}, {decimal: req.body.decimal} ] }, function(err, updateico) {
    Icodetail.findOne({id: req.body.id}, function(err, updateico) {
if (!updateico)
return next(new Error('Could not load Document'));
else {
// do your updates here
updateico.tn = req.body.tn;

updateico.ts = req.body.ts;

updateico.decimal = req.body.decimal;

updateico.totalsupply = req.body.totalsupply;

updateico.rate = req.body.rate;

updateico.preicostartdate = req.body.preicostartdate;

updateico.preicoenddate = req.body.preicoenddate;

updateico.icostartdate = req.body.icostartdate;

updateico.icoenddate = req.body.icoenddate;
    
updateico.timerenddate = req.body.timerenddate;

updateico.softcap = req.body.softcap;
updateico.hardcap = req.body.hardcap;
updateico.ownerwa = req.body.ownerwa;

updateico.save(function(err) {
if (err)
{
console.log('error');
}
else
{
console.log('success');
res.status(201).send({
                success: true,
                msg: 'ICO details saved successfully'
            });
}
});
}
});


});
 


//Create Wallet
router.post('/createwallet', (req, res, next) => {

    Walletdetail.findOne({userid: req.body.userid}, function(err, p) {
        if (p)
        {
        }
        else
        {

    const newwallet = new Walletdetail({

        walletaddr : req.body.walletaddr,
        id : req.body.userid,
        userid : req.body.userid,

        });

    

    newwallet.save(function(err, result) {
        if (err)
             res.status(200).send({
                success: false,
                message: 'Error'
            });
        else
             res.status(201).send({
                success: true,
                msg: 'Wallet details saved successfully'
            });
    });
}
});
});

// updatewallet
router.put('/updatewallet', (req, res, next) => {

var userid = req.body.userid;
console.log(req.body);
if (userid == '') {
         res.status(400).send({
                success: false,
                message: 'Error'
            });
    }


Walletdetail.findOne({userid: userid}, function(err, updatewallet) {
if (!updatewallet)
{
    
}

else {
// do your updates here
updatewallet.walletaddr = req.body.walletaddr;

updatewallet.save(function(err) {
if (err)
{
console.log('error');
}
else
{
console.log('success');
res.status(201).send({
                success: true,
                msg: 'Wallet details saved successfully'
            });
}
});
}
});


});

 // ICO
router.get('/getcontractd', (req, res, next) => {
    ContractDetail.find({
        
    }, function (err, contract) {

        if (err) throw err;

        if (!contract) {
            res.send({
                success: false,
                message: 'Contract details not found.'
            });
        } else {
            console.log(contract);
    res.json({ contractdetails: contract });
    }
});
});

//Create Contract
router.post('/createcontractd', (req, res, next) => {

 ContractDetail.collection.count( function(err, cont) {
        console.log(cont);

        if (cont > 0) {
            res.send({
                success: true,
                message: 'Record found.'
            });

        } else {


    const newcontract = new ContractDetail({

        caddr : req.body.caddr,
        id : req.body.id,
        cabi : req.body.cabi,
        net : req.body.net,

        });

    // Icodetail.addIco(newico, (err, result) => {
    //     if (err)
    //          res.status(200).send({
    //             success: false,
    //             message: 'Error'
    //         });
    //     else
    //          res.status(201).send({
    //             success: true,
    //             msg: 'ICO details saved successfully'
    //         });
    // });

    newcontract.save(function(err, result) {
        if (err)
             res.status(200).send({
                success: false,
                message: 'Error'
            });
        else
             res.status(201).send({
                success: true,
                msg: 'Contract details saved successfully'
            });
    });
}
});
});

// updatewallet
router.put('/updatecontractd', (req, res, next) => {

var id = req.body.id;
console.log(req.body);
if (id == '') {
         res.status(400).send({
                success: false,
                message: 'Error'
            });
    }


ContractDetail.findOne({id: id}, function(err, updatecontract) {
if (!updatecontract)
return next(new Error('Could not load Document'));
else {
// do your updates here
updatecontract.caddr = req.body.caddr;
updatecontract.cabi = req.body.cabi;
updatecontract.net = req.body.net;

updatecontract.save(function(err) {
if (err)
{
console.log('error');
}
else
{
console.log('success');
res.status(201).send({
                success: true,
                msg: 'Contract details saved successfully'
            });
}
});
}
});


});

 // hdetails
router.get('/gethdetails', (req, res, next) => {
    HDetail.find({
        
    }, function (err, hp) {

        if (err) throw err;

        if (!hp) {
            res.send({
                success: false,
                message: 'Home page details not found.'
            });
        } else {
            console.log(hp);
    res.json({ hdetails: hp });
    }
});
});

//Create Wallet
router.post('/createhdetail', (req, res, next) => {

 HDetail.collection.count( function(err, cont) {
        console.log(cont);

        if (cont > 0) {
            res.send({
                success: true,
                message: 'Record found.'
            });

        } else {


    const newhomed = new HDetail({

        aus : req.body.aus,
        cus : req.body.cus,
        id : req.body.id,
        facebk : req.body.facebk,
        ln : req.body.ln,
        twitter : req.body.twitter,
        gplus : req.body.gplus,

        });

   

    newhomed.save(function(err, result) {
        if (err)
             res.status(200).send({
                success: false,
                message: 'Error'
            });
        else
             res.status(201).send({
                success: true,
                msg: 'Home Page details saved successfully'
            });
    });
}
});
});

// updatehdetail
router.put('/updatehdetail', (req, res, next) => {

var id = req.body.id;
console.log(req.body);
if (id == '') {
         res.status(400).send({
                success: false,
                message: 'Error'
            });
    }


HDetail.findOne({id: id}, function(err, updatehdetail) {
if (!updatehdetail)
return next(new Error('Could not load Document'));
else {
// do your updates here
updatehdetail.aus = req.body.aus;
updatehdetail.cus = req.body.cus;
updatehdetail.ln = req.body.ln;
updatehdetail.facebk = req.body.facebk;
updatehdetail.twitter = req.body.twitter;
updatehdetail.gplus = req.body.gplus;

updatehdetail.save(function(err) {
if (err)
{
console.log('error');
}
else
{
console.log('success');
res.status(201).send({
                success: true,
                msg: 'Home Page details saved successfully'
            });
}
});
}
});


});

 // ICO
router.get('/geticodetails', (req, res, next) => {
    Icodetail.find({
        
    }, function (err, ico) {

        if (err) throw err;

        if (!ico) {
            res.send({
                success: false,
                message: 'ICO details not found.'
            });
        } else {
            console.log(ico);
    res.json({ icodetails: ico });
    }
});
});


 // Wallet
router.get('/getwdetails', passport.authenticate('jwt', { session: false }),(req, res, next) => {

   Walletdetail.findOne({userid: req.user._id}, function (err, walletaddr) {

        if (err) throw err;

        if (!walletaddr) {
            res.send({
                success: false,
                message: 'Wallet details not found.'
            });
        } else {
            console.log(req.user._id);
    res.json({ waddr: walletaddr });
    }
}); 



    
});

 // Wallet
router.get('/getwalletandcontractdetails', passport.authenticate('jwt', { session: false }),(req, res, next) => {

ContractDetail.find({
        
    }, function (err, contract) {

        if (err) throw err;

        if (!contract) {
            res.send({
                success: false,
                message: 'Contract details not found.'
            });
        } else {
            console.log(contract);

   
   
   Walletdetail.findOne({userid: req.user._id}, function (err, walletaddr) {

        if (err) throw err;

        if (!walletaddr) {
            res.send({
                success: false,
                message: 'Wallet details not found.'
            });
        } else {
            console.log(req.user._id);
    res.json({ waddr: walletaddr, contractdetails: contract});
    }
}); 

 }
});

    
});


 // ICO
router.get('/geticocount', (req, res, next) => {

    Icodetail.collection.count( function(err, cont) {
        console.log(cont);

        
    res.json({ cont: cont });
});

});






 // Wcoumt
router.get('/getwalletcount', (req, res, next) => {
console.log(req);
        
        res.json({ waddr: req.walletaddr });
});


// Wcoumt
router.get('/gethpcount', (req, res, next) => {

    HDetail.collection.count( function(err, hcont) {
        console.log(hcont);

        
    res.json({ hcont: hcont });
});

});

// Wcoumt
router.get('/getcontractcount', (req, res, next) => {

    ContractDetail.collection.count( function(err, ccont) {
        console.log(ccont);

        
    res.json({ ccont: ccont });
});

});

router.get('/123', (req, res, next) => {

 let transporter = nodemailer.createTransport({
       service: 'gmail',
       pool:true,
       port: 465,
       secure: true,
        auth: {
             user: "npyrumas2018@gmail.com", // generated ethereal user
            pass: "zxcvbnm2018*" // generated ethereal password
        }
    });

 transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Craftmelon" <craftmeloncoin@gmail.com>', // sender address
        to: 'nagashwini@pyrumas.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b><a href=http://w3schools.com > w3schools </a>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);

        }
        console.log('Message sent: %s', info);
       
        res.json({ response: "sent"});
         return console.log("hi");
        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
   
});

router.post('/forgot_password', (req, res, next) => {
    var myemail = req.body.user.email;

    if (myemail == '' || myemail == undefined ) {
        return res.status(200).send({
            success: false,
            message: 'Please provide your email.'
        });
    }

    var burl = req.body.burl;
    console.log(req);
    console.log(burl);
    console.log(myemail);
     async.waterfall([
    function(done) {
      User.findOne({
        email: myemail
      }).exec(function(err, user) {
        if (user) {
          done(err, user);
        } else {
          done('User not found.');
        }
      });
    },
    function(user, done) {
      // create the random token
      crypto.randomBytes(20, function(err, buffer) {
        var token = buffer.toString('hex');
        done(err, user, token);
      });
    },
    function(user, token, done) {
      User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
        done(err, token, new_user);
      });
    },
    function(token, user, done) {
    
    let transporter = nodemailer.createTransport({
       service: 'gmail',
       pool:true,
       port: 465,
       secure: true,
        auth: {
            user: "npyrumas2018@gmail.com", // generated ethereal user
            pass: "zxcvbnm2018*" // generated ethereal password
        }
    });

//  transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Server is ready to take our messages');
//    }
// });
//  console.log(myemail);
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Craftmelon" <craftmeloncoin@gmail.com>', // sender address
        to: myemail, // list of receivers
        subject: 'Forgot Password Email', // Subject line
        //text: 'Hello world?', // plain text body
        html: '<div> <h3>'+user.name+',</h3>  <p>You having username as '+user.username+' requested for a password reset, kindly use this <a href="'+burl+'/resetpasswd?token='+token+'">link</a> to reset your password</p>  <br>  or <br> copy paste this url in browser: '+burl+'/resetpasswd?token='+token+'   </div>' 
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);

            res.status(200).send({
                success: true,
                message: 'Error, email could not be sent, please try again'
            });

        }
        console.log('Message sent: %s', info);
       
        //res.json({ message: "Check your inbox for a password reset message."});
       return res.status(200).send({
            success: true,
            message: 'Check your inbox for a password reset message.'
        });
        
    });

     }
  ], function(err) {
    return res.status(200).json({ message: err });
  });
    
});

router.post('/reset_password', (req, res, next) => {
    if (!req.body.token || req.body.token == "") 

        return res.status(200).send({
            success: true,
            message: 'Reset token not set.'
        });

    var password = req.body.password;
    var confirm = req.body.confirm;

    if (!password || password == "" || password == undefined || !confirm || confirm == "" || confirm == undefined) 

        return res.status(200).send({
            success: false,
            message: 'Password or confirm password field cannot be blank.'
        });

    
    if (password !== confirm) 

         return res.status(200).send({
            success: true,
            message: 'Passwords do not match.'
        });
    
   
if(password === confirm && password != "")
{
    

    User.findOne({
        reset_password_token: req.body.token,
    
    },  function(err, p) {
                if (!p)
                return next(new Error('Could not load Document'));
                else {
                // do your updates here
                p.password = password;
                p.reset_password_token = undefined;
                p.reset_password_expires = undefined;
                p.save(function(err) {
                if (err)
               
                console.log('error');
                
                else
                {
                console.log('success');
                
                }
                

           
            });
            }
            }); 
}
    res.status(201).send({
success: true,
message: 'Password was reset successfully'
});   
});

// // Register
// router.post('/subscribe', (req, res, next) => {

//     if (!req.body.email)
//         return res.status(200).send({
//             success: false,
//             message: 'Please enter email'
//         });

//     Subscribe.findOne({
//         email: req.body.email
//     }, function (err, user) {
//         if (err)
//              res.status(200).send({
//                 success: false,
//                 message: 'This email already subscribed'
//             });
//         else
            
   

//     const newSubscribe = new Subscribe({
        
//         email: req.body.email,
        
//     });

//     newSubscribe.save(function(err, result) {
//         if (err)
//              res.status(200).send({
//                 success: false,
//                 message: 'Error'
//             });
//         else
//              res.status(201).send({
//                 success: true,
//                 msg: 'Thank You for subscribing'
//             });
//     });
// });

// });
module.exports = router;