var Campground=require("../models/campground");
var Comments=require("../models/comment");

var middlewareObj={};

middlewareObj.checkOwner=function(req,res,next){
	if(req.isAuthenticated()){
	Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			req.flash("danger","Campground does not exist!");
			res.redirect("back");
		}else{
			if(foundcampground.author.id.equals(req.user._id))
			next();
			else{req.flash("danger","Permission denied!");
				res.redirect("back");}
				
		}
	});	}else{
		req.flash("danger","Permission denied!");
		   res.redirect("back");
		   }

}

middlewareObj.checkCommentOwner=function(req,res,next){
	if(req.isAuthenticated()){
	Comments.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			req.flash("danger","Comment not found!");
			res.redirect("back");
		}else{
			if(foundcomment.author.id.equals(req.user._id))
			next();
			else
			{req.flash("danger","Permission denied!");
				res.redirect("back");}
		}
	});	}else{
		req.flash("danger","Permission denied!");
		   res.redirect("back");
		   }
}

middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
	   return next();
	   }
	req.flash("danger","Please log in first!");
	res.redirect("/login");
}




module.exports=middlewareObj;