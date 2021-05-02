var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comments=require("../models/comment");
var middleware=require("../middleware");

router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var price=req.body.price;
	var desc=req.body.description;
	var author={id:req.user._id, username: req.user.username};
	Campground.create(
	{name: name,
	 image:image,
	 price:price,
	 description:desc,
	 author:author
	},
	function(err,campground){
		if(err) console.log(err);
		else res.redirect("/campgrounds");
	}
);	
});
router.get("/",function(req,res){
	
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log("Something Went Wrong!");
		}
		else{
			res.render("campgrounds/campgrounds",{campgrds:allcampgrounds});
		}			
	});	
});

router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err){
			console.log(err);
		}
		else{
			
			res.render("campgrounds/show",{campground:foundcampground});
		}
	});	
});

router.put("/:id",middleware.checkOwner,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,editedcampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Campground edited successfully!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});	
});


router.get("/:id/edit",middleware.checkOwner,function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
		res.render("campgrounds/edit",{campground:foundcampground});
	});
});

router.delete("/:id",middleware.checkOwner,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Campground deleted successfully!");
			res.redirect("/campgrounds");
		}
	})
})

router.get("/:id/map",function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			console.log(err);
		}
		else{
			
			res.render("campgrounds/show2",{campground:foundcampground});
		}
	});	
});



module.exports=router;