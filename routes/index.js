var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/",function(req,res){
	res.render("campgrounds/landing");
});



router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("danger",err.message);
			res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to YelpCamp "+user.username);
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login",function(req,res){
	var mess=req.flash("error");
	res.render("login",{danger:mess});
});

router.post("/login",
	passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login",
	failureFlash:"Wrong username or password!"
})	);

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged out successfully! Please be back soon!");
	res.redirect("/campgrounds");
});


module.exports=router;