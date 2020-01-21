var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comments=require("./models/comment");

var data=[{
	name:"Magpie Camp, Chopta",
	image:"https://www.holidify.com/images/cmsuploads/compressed/adventure-camp-camping-699558_20190212181323.jpg",
			description:"Chopta is one destination which has recently made it to the list of the best offbeat destination in the country. It is a little place tucked away in the Garhwal Mountains and is the best retreat to beat the summer heat. The Magpie Camp in Chopta lets you experience this place in its true form. The view of the surrounding valley and mountains is enough to take your breath away. There are several tourist sites here like the Chandrashila Peak, Deoria Tal, and Tungnath Temple. This is one place which deserves your time."
},
		 {
		name:"Rishikesh Valley camp, Rishikesh",
			 image:"https://www.holidify.com/images/cmsuploads/compressed/3418318319_6caa7d0cfe_z_20190212173233.jpg",
			 description:"When it comes to camping, Rishikesh Camping experience has to be on the list! This amazing Rishikesh Valley camp is not only close to nature but also has a more spiritual connection. The tents here are styled in a hermit fashion and are designed to give you total aloof time. This camp is your go-to place if you are looking for a chance to introspect your inner self. The food served here is entirely organic. Apart from detoxifying, you can undertake rafting, trekking, ayurvedic spas and the grand elephant rides. Camping in Rishikesh is one of the best in India!"
		 },
		 {
			 name:"West Ladakh Camp, Ladakh",
			 image:"https://www.holidify.com/images/cmsuploads/compressed/24366507140_38f32204a4_z_20190212174301.jpg",
			 description:"If you are planning to go on a trekking trip to Ladakh, you can make it even more adventurous by camping at the West Ladakh Camp. This beautiful campsite is sprawled across 20 acres of ranch and is ideally situated close to the Indus River. The tents are so placed that these are surrounded by apricot and willow trees which nest the migratory birds. You can set your base here and go trekking in the nearby region and visit the Buddhist Monasteries. The food served here is authentic Tibetan and Ladakhi food making it a unique culinary experience."
		 },
		 {
			 name:"Camp Exotica, Kullu",
			 image:"https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
			 description:"The Camp Exotica is a perfect weekend getaway option located in Kullu in the Manali district of Himachal Pradesh. The accommodation provided is world class and the tents simply leave you connecting with nature like never before. The location of these tents is such that it gives a panoramic view of the surrounding mountains. The food provided is of fine quality and the incredible view will simply leave you in awe of this adventure. Make sure to take out time for this pleasure full camping trip."
		 }];

function seedDB()
{
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("campgrounds removed!");
			
	data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			if(err){
				console.log(err);
			}
			else{
				console.log(campground);
				Comments.create({
			text:"This place is awesome!",
			author:"Manali Biswas"
		},function(err,comment){
			if(err){
				console.log(err);
			}
			else{
				campground.comments.push(comment);
				campground.save();
				console.log("Added a new comment");
			}
		});
			}
		});
		
		
	});
		}
	});
	
}

module.exports=seedDB;