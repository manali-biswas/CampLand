var express=require("express"),
    app=express(),
 	bodyParser=require("body-parser"),
 	mongoose=require("mongoose"),
	flash=require("connect-flash-plus"),
	passport=require("passport"),
	localStrategy=require("passport-local"),
	methodOverride=require("method-override"),
	Campground=require("./models/campground"),
	Comments=require("./models/comment"),
	User=require("./models/user"),
	seedDB=require("./seeds.js");
	//User=require("./models/user");
//seedDB();

var commentRoutes=require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes=require("./routes/index");
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true, useUnifiedTopology:true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); 
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
		secret:"Rusty",
		resave:false,
		saveUninitialized:false
		}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.danger=req.flash("danger");
	res.locals.success=req.flash("success");
	next();
});

//requiring routes
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
		   console.log("Server is listening");
});