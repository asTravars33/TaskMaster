var sessions={};
var cur_color="green";
var shown=false;

function show_hidden(){
	if(!shown){
		document.getElementById("hidden").style.display="inline-block";
		shown=true;
	}
	else{
		document.getElementById("hidden").style.display="none";
		shown=false;
	}
}
function make_new_session(){
    var colors=["green", "red", "purple", "orange", "blue"];
    while(cur_color in sessions){
        cur_color=colors[parseInt(Math.random()*5)];
    }
    var select=document.getElementById("dropdown");
    var option=document.createElement("option");
    option.text = option.value = cur_color;
    select.add(option);
}

function add_to_session(div_id){
    if(!(cur_color in sessions)){
        var list=[div_id];
        sessions[cur_color]=list;
    }
    else{
        sessions[cur_color].push(div_id);
    }
    document.getElementById(div_id).style.border = "solid 1px "+cur_color;
}

function update_session(){
	var sessionid=document.getElementById("dropdown").value;
	document.getElementById("session_info").value=sessions[sessionid];
}

function start_session(){
	var sessionid=document.getElementById("dropdown").value;
	console.log(sessions[sessionid]);
}
function make_time_bar(time){
    var curX=50;
    for(var i=0; i<time*60; i++){
        increment_time("10px", ""+curX+"px");
        curX++;
    }
    do_cool_things(time);
}
function do_cool_things(time){
    var curX=50;
    for(var i=0; i<time*60; i++){
        setTimeout(function(){
            document.getElementById(""+curX+"px").style.backgroundColor="orange";
            console.log("Hello");
            curX++;
        }, 1000);
    }
}

function increment_time(x, y){
    var div=document.createElement("div");
    div.id=y;
    div.style.width="1px";
    div.style.backgroundColor="white";
    div.style.display="inline";
    div.style.top = x;
    div.style.left=y;
    div.style.zIndex=10;
    document.body.appendChild(div);
}