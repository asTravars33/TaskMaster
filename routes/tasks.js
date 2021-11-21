// -------------- load packages -------------- //
var express = require('express');
var app = express();
const router = express.Router();

var https = require('https');
var hbs = require('hbs');
app.set('view engine','hbs');

var mysql = require('mysql');

// -------------- define endpoints -------------- //
router.get('/taskspage', function(req, res){
	var sql="SELECT * FROM tasks ORDER BY id ASC;";
	res.app.locals.pool.query(sql, function(error, results, fields){
		var params={
			'info': results,
			'user': req.session.profile.first_name,
			'pic_options': ["pencil", "paper", "books", "email", "phone", "run"]
		};
		res.render("tasks", params);
	});	
});
router.get('/updatetasks', function(req, res){
	var title=req.query.t_title;
	var length=req.query.t_length;
	if('t_desc' in req.query){
		var desc=req.query.t_desc;
	}
	if('t_pic' in req.query){
		var pic=req.query.t_pic;
	}
	var sql="CALL add_task(?,?,?,?);";
	res.app.locals.pool.query(sql, [title, desc, pic, length], function(error, results, fields){
		res.redirect('./taskspage');
	});
});
router.get('/upvote', function(req, res){
	var sql="CALL move_up(?);";
	res.app.locals.pool.query(sql, [req.query.choice], function(error, results, fields){
		res.redirect('./taskspage');
	});
});
router.get('/downvote', function(req, res){
	var sql="CALL move_down(?);";
	res.app.locals.pool.query(sql, [req.query.choice], function(error, results, fields){
		res.redirect('./taskspage');
	});
});
router.get('/start_session', function(req, res){
	console.log(req.query);
	var sessions=req.query.session_info.split(",");
	var first_session=sessions[0].split("; ");
	var sql="SELECT * FROM scene_options;";
	res.app.locals.pool.query(sql, function(error, results, fields){
		
		var imglist="";
		var timelist="";
		var titlelist="";
		for(var i=0; i<results.length; i++){
			imglist+=results[i].img+":"+results[i].message+"; ";
		}
		for(var k=1; k<sessions.length; k++){
			var cur_session=sessions[k].split("; ");
			timelist+=cur_session[2]+"; ";
			titlelist+=cur_session[0]+"; ";
		}
		var first_session=sessions[0].split("; ");
		var params={
			"imglist": imglist;
			"timelist": timelist,
			"titlelist": titlelist,
			"start-message": "The wind is fair and it’s plain sailing out of port! Take a break to enjoy the sea air and then "+first_session[0]+ " for "+first_session[2]+"minutes.",
			"start-time": first_session[2]*60
		};
		console.log(results);
		res.render('session_part', params);
	});
});
module.exports = router;
