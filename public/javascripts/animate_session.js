function do_session(img, time, titles){
	console.log(img);
	console.log(time);
	var imglist=img.split("; ");
	var done=[];
	var done_title=[];
	var timelist=time.split("; ");
	var titlelist=titles.split("; ");
	console.log(imglist);
	console.log(timelist);
	var pref=[];
	pref.push(parseFloat(timelist[0]));
	for(var i=1; i<timelist.length; i++){
		pref.push(pref[i-1]+parseFloat(timelist[i]));
	}
	for(var k=0; k<imglist.length; k++){
		setTimeout(function(){
			var rand = parseInt(Math.random()*imglist.length);
			while(imglist[rand] in done){
				rand=parseInt(Math.random()*imglist.length);
			}
			done.push(imglist[rand]);
			
			var rand2=parseInt(Math.random()*titlelist.length);
			while(titlelist[rand2] in done_title){
				rand2=parseInt(Math.random()*titlelist.length);
			}
			done_title.push(titlelist[rand2]);
			
			console.log("Image :"+rand+" "+imglist[rand]);
			console.log("Title :"+rand2+" "+titlelist[rand2]);
			
			var ind=imglist[rand].indexOf(":");
			var c_tagline1=imglist[rand].substring(ind+1).replace("TASK", titlelist[rand2]);
			var c_tagline=c_tagline1.replace("LENGTH", timelist[rand2+1]);
			document.getElementById("center-img").src="./images/"+imglist[rand].substring(0, ind)+".png";
			document.getElementById("description").innerHTML=imglist[rand].substring(ind+1);
		}, pref[k]*60000);
	}
}

function change(img){
	console.log("Changing "+img);
	document.getElementById("center-img").src="./images/"+img+".png";
}
