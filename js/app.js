// some globals
var w, width, h, height;
var canvas;
var canvas_w = 300;
var shadow_size = 280;
var light_size = 240;
var temp_percentage = 0;
var air_percentage = 0;
var time_percentage = 0;
var bio_percentage = 0;
var city = "";
var gradient = 1;
var temp = 0;
var air = 0;
var conditions = "";
var ctx1, ctx1b, ctx2, ctx2b, ctx3, ctx3b, ctx4, ctx4b;

//localStorage.setItem('air', 120);
var city_input = document.getElementById('city_input');
var city_button = document.getElementById('city_button');

var gradient_boxes = document.querySelectorAll('.gradient_box');
var option_select_cards = document.querySelectorAll('.option_select_card');
var city_names = document.querySelectorAll('.city_name');

var temp_value = document.getElementById('temp_value');
var temp_descrip = document.getElementById('temp_descrip');

var city_cancel = document.getElementById('city_cancel');
var colour_select_card = document.getElementById('colour_select_card');

function checkLocalStorage(){

	if (localStorage.city && localStorage.city != undefined) {
		city = localStorage.city;
		city_input.value = city;
		addCityName(city);
		//console.log("localStorage.city: " + city);
	}

	if (localStorage.selected && localStorage.selected != undefined) {
		selectCard(localStorage.selected);
		//console.log("localStorage.selected: " + localStorage.selected);
	}

	if (localStorage.temp && localStorage.temp != undefined) {
		temp = localStorage.temp;
		conditions = localStorage.conditions;
		console.log("localStorage.temp: " + localStorage.temp);
		setTemp(temp, conditions)
	}

	if (localStorage.air && localStorage.air != undefined) {
		air = localStorage.air;
		conditions = localStorage.conditions;
		console.log("localStorage.air: " + localStorage.air);
		setAir(air, conditions);
	}

	if (localStorage.gradient && localStorage.gradient != undefined) {
		gradient = localStorage.gradient;
		console.log("localStorage gradient: " + gradient);
		selectGradient("gradient"+gradient);
		} else {
		selectGradient("gradient1");
	}

	if (localStorage.birthdate && localStorage.birthdate != undefined) {
		birthdate = localStorage.birthdate;
		document.getElementById('date_input').value = birthdate;
		document.getElementById('biorythms_input_card').style.display = 'none';
		}

}

function setListeners(){

	city_button.addEventListener('click', saveCity, false);
	city_cancel.addEventListener("click", hideCityInput, false);
	city_input.addEventListener('click', showCityInput, false);
	city_input.onblur = hideCityInput;
	colour_select_card.onclick = selectCard('colour_select');
	colour_select_card.onblur =  function(){ colour_select_card.classList.remove("active")};
	for (var i = 0; i < option_select_cards.length; i++) {
	    option_select_cards[i].addEventListener('click', function(event) {
				var id = event.srcElement.id;
				var id = id.slice(0, id.length-7 );
				//console.log(id);
	      selectCard(id)
	    });
	}

	for (var i = 0; i < city_names.length; i++) {
	    city_names[i].addEventListener('click', showCityInput);
	}

	for (var i = 0; i < gradient_boxes.length; i++) {
	    gradient_boxes[i].addEventListener('click',
			function(event) {
				var id = event.srcElement.id;
				//var id = id.slice(8, id.length );
				console.log(id);
				selectGradient(id);
	    }
		);
	}

}


function setup(){

	setupCanvas();
	setListeners();
	checkLocalStorage();
	drawGradient(1);
	drawGradient(2);
	drawGradient(3);
	drawGradient(4);

	window.setTimeout(hidemodal, 1000);
	// choose light icons
	// ctx5.fillStyle = rgb(0);
	// ctx5.HfillEllipse(w/2, h/2 - 50, 200,200);
	// ctx5.HfillEllipse(w/2 - 60, h -50, 30,30);
	// ctx5.fillRect(w/2 - 15, h - 65, 30,30);
	// ctx5.eqFillTriangle(w/2 + 60, h - 45, 20);

	if (city && city !=undefined) {
		//console.log(city);
		getTemp();
		getAir();
	} else {
		selectCard("city_input");
	}

}

function selectCard(name){

	//console.log("selectCard: " + name);
	var option_name = document.querySelectorAll('.option_select');
	for (var i = 0; i < option_name.length; i++) {
    option_name[i].classList.remove("on");
	}

	var card_name = document.querySelectorAll('.card');
	for (var i = 0; i < card_name.length; i++) {
		card_name[i].classList.add("card_narrow");
	}

	var selecta = name + "_select";
	var card = name + "_card";

	if (name != 'city_input' && name != 'colour_select_card_card') {
		localStorage.setItem('selected', name);
		moveMarker();
	} else if (name != 'colour_select_card_card') {
		//showCityInput();
		//city_button.style.display = 'block';
		city_input.focus();
	}
	//console.log("------" + selecta);
	console.log("------ " +card);
	document.getElementById(selecta).classList.add("on");
	document.getElementById(card).classList.remove("card_narrow");

}

function selectGradient(id){

	hideMarkers();

	for (var j = 0; j < gradient_boxes.length; j++) {
			gradient_boxes[j].classList.remove("active");
	}
	var id_no = id.slice(8, id.length );

	changeGradient(id_no);
	var marker = id +"_marker";

	document.getElementById(marker).style.display = "block";
	document.getElementById(id).classList.add("active");
	localStorage.setItem("gradient", id_no);

}

function setColour() {

	//console.log('air_percentage' + air_percentage);
	var color1 = getColour(temp_percentage);
	var color2 = getColour(air_percentage);
	var color3 = getColour(90);
	// var c1 = hexToRgb(color1);
	// var c2 = hexToRgb(color2);
	//console.log("setColour: " + color1.r);
	// drawLight(ctx1, ctx1b, ctx1c, color1);
	// drawLight(ctx2, ctx2b, ctx2c, color2)
	// drawLight(ctx3, ctx3b, ctx3c, color3);
	drawLight(ctx1, ctx1b, color1);
	drawLight(ctx2, ctx2b, color2)
	drawLight(ctx3, ctx3b, color3);

	moveMarker();

}

function getColour(percentage){
	gradient = localStorage.gradient;
	//console.log("getColour for gradient"+ gradient);
	//console.log("percentage: "+ percentage);
	if (gradient == 1) {
		color1 = document.getElementById('color1a').value;
		color2 = document.getElementById('color1b').value;
	} else if (gradient == 2) {
		color1 = document.getElementById('color2a').value;
		color2 = document.getElementById('color2b').value;
	} else if (gradient == 3) {
		color1 = document.getElementById('color3a').value;
		color2 = document.getElementById('color3b').value;
	} else if (gradient == 4) {
		color1 = document.getElementById('color4a').value;
		color2 = document.getElementById('color4b').value;
	}

	var c1 = hexToRgb(color1);
	var c2 = hexToRgb(color2);
	var c3 = calculateColour(c1, c2, percentage)
	//console.log(c3);
	return c3;

}

function changeGradient(num) {

	gradient = num;
	localStorage.setItem("gradient", gradient);
	//console.log("set gradient: " + gradient);
	setColour();

}

function saveCity(){

	city = toTitleCase(document.getElementById('city_input').value);
	console.log("saveCity: " + city);
	localStorage.setItem("city", city);
	addCityName(city);
	city_button.value = "Updating...";
	getTemp();
	getAir();

}

function addCityName(city){
	var city_name = document.querySelectorAll('.city_name');
	for (var i = 0; i < city_name.length; i++) {
    city_name[i].innerHTML = city;
  };
}

function weather_response(response){

	var output = JSON.parse(response);
	var temp = output.main.temp;
	var conditions = "";
	if (output.weather.length > 1) {
		for (var i = 0; i < output.weather.length; i++) {
			conditions += output.weather[i].description + ' ';
		}
	} else {
		var conditions = output.weather[0].description;
	}
	 setTemp(temp,conditions);
}

function air_response(response){

	var output = JSON.parse(response);
  // console.log(output);
  // console.log(output.results[0].measurements[0].value);
	if(output.results != undefined) {
  var air = output.results[0].measurements[0].value;
	//console.log("air api: " + air);
	setAir(air);
	} else {
		console.log("no air value received");
	}
 }

 function send_response(response){
	 	console.log("sent colour to lights");
  }

function setTemp(temp, conditions){

	temp_percentage = Math.round(temp/34*100);
	//temp_percentage = 96;
	console.log("temp: " + temp + " -  " + temp_percentage + "%");

	temp_value.innerHTML = Math.floor(temp)+ '&deg;C';
	temp_descrip.innerHTML = conditions;
	localStorage.setItem("temp", temp);
	localStorage.setItem("conditions", conditions);
	setColour();
}

function getTemp(){

	var weather_api = '6fb8c037edc949db233cbebd83e9641d';
	var weather_api_url = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var weather_url = weather_api_url + city + '&units=metric&appid=' + weather_api;
	//console.log("loading weather...");
	loadJSON(weather_url, weather_response, weather_error);

}

function getAir(){

	var air_api = 'ZBvYXlkHc4IC1vGoTkRfPIyzYl0utxYN';
	var air_api_url = 'https://api.openaq.org/v1/latest?city=';
	var air_url = air_api_url + city + '&appid=' + air_api;
	//console.log("loading air...");
	loadJSON(air_url, air_response, air_error);

}

function setAir(air){

	air_percentage = calcAirPercent(air)
	//air_percentage = 30;
	console.log("air: " + air + " -  " + air_percentage + "%");
	localStorage.setItem("air", air);

	var rating = getRating(air);
	document.getElementById('air_value').innerHTML = Math.floor(air);
	document.getElementById('air_description').innerHTML = rating;
	setColour();
}

function calcTempPercent(temp){
	return Math.round(temp/34*100);
}

function calcAirPercent(air){
	return Math.round(air/200*100);
}

function moveMarker(){
		var ss = "";
	 if (localStorage.selected == "temp") {
		 var pos = calcTempPercent(temp);
		 ss = "temp";
	 } else if (localStorage.selected == "air") {
		 var pos = calcAirPercent(air);
		 ss = "air";
	 } else {
		 var pos = 50;
		 ss = "time";
	 }

	 console.log("moveMarker: " + ss + " - " + pos);
	 var color1 = getColour(pos);
	 //console.log(color1);
		var markers = document.querySelectorAll('.marker');
	for (var i = 0; i < markers.length; i++) {
		var target_marker = markers[i];
		if (pos > 50) {
			target_marker.style.left = 'calc(' + pos + '% - 30px)';
		} else {
			target_marker.style.left = 'calc(' + pos + '% + 5px)';
		}
		target_marker.style.background = rgb(color1.r, color1.g, color1.b);
	}


}


//// UTILS

function hexToRgb(hex) {
    // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function toTitleCase(str) {
     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
 }

function drawLight(_ctx1, _ctx1b, _c){
	_ctx1.clearRect(0,0, w, h);
	//console.log(_c);
	// create radial gradient
	var c = c2 = rgbToHsl(_c.r, _c.g, _c.b);
	c2[2] + 0.4;
	//console.log(c);
		_ctx1.beginPath();
		_ctx1.arc(w/2, h/2, shadow_size/2, 0, Math.PI*2, true);
      var grd = _ctx1.createRadialGradient(238, 50, 10, 238, 50, 300);
      // light blue
      grd.addColorStop(0, hsl(c[0], c[1]*100, c[2]*100));
      // dark blue
      grd.addColorStop(1, hsl(c2[0], c2[1]*100, c2[2]*100));

      _ctx1.fillStyle = grd;
      _ctx1.fill();


 // 	_ctx1.fillStyle = rgb(_c.r, _c.g, _c.b);
 // 	_ctx1.HfillEllipse(w/2, h/2, shadow_size, shadow_size);
 // 	_ctx1b.fillStyle = rgb(0);
	 _ctx1b.strokeStyle = rgb(0);
	// _ctx1b.lineWidth = 10;
 	//_ctx1b.HfillEllipse(w/2, h/2, light_size, light_size);
	//_ctx1b.HstrokeEllipse(w/2, h/2, light_size, light_size);
 	_ctx1b.HfillEllipse(w/2, h/2, light_size, light_size);

 }

function showCityInput(){
	console.log("showCityInput");
	selectCard('city_input');
	city_input.style.background = '#f7f7f7';
	document.getElementById("city_input").focus();
	city_button.style.display = 'block';
	city_cancel.style.display = 'block';
}

function hidemodal(){
	alert("hidemodal");
	var modal = document.getElementById('modal')
	modal.classList.add("modal_hide");
	window.setTimeout(function(){modal.style.display = 'none'}, 2000);
}

function hideCityInput(){
	city_input.style.background = 'none';
	city_button.style.display = 'none';
	//console.log("selected: " + localStorage.selected);
	selectCard(localStorage.selected);
	city_cancel.style.display = 'none';
	//console.log('blur');
}

function hideMarkers(){
	var marker = document.querySelectorAll('.marker');
	for (var i = 0; i < marker.length; i++) {
			marker[i].style.display = "none";
	}
}

function calculateColour(c1, c2, percentage) {

	// console.log(c1);
	// console.log(c2);
	// console.log(percentage);

	//percentage = 100- percentage;
  if (c2.r > c1.r ) {
		var r = c1.r + Math.abs(c2.r - c1.r) * (percentage/100);
  } else {
  	var r = c2.r + Math.abs(c1.r - c2.r) * (percentage/100);
  }

  if (c2.g > c1.g ) {
	 var g = c1.g + Math.abs(c2.g - c1.g) * percentage/100;
  } else {
   var g = c2.g + Math.abs(c1.g - c2.g) * percentage/100;
  }

  if (c2.b > c1.b ) {
	 var b = c1.b + Math.abs(c2.b - c1.b) * percentage/100;
  } else {
   var b = c2.b + Math.abs(c1.b - c2.b) * percentage/100;
  }

	//console.log(r);
	 return {r:Math.round(r), g:Math.round(g), b:Math.round(b)};

}

function drawGradient(num) {

 	color1 = document.getElementById('color'+ num +'a').value;
 	color2 = document.getElementById('color'+ num +'b').value;
	//console.log(color2);
 	document.getElementById('gradient' + num).style.background = 'linear-gradient(to right, ' + color1 + ', ' + color2 + ')';

 }

function weather_error(response){
    console.log("weather_error");
    document.getElementById('city_response').innerHTML = 'Please enter your city.';
 	 //showCityInput();
 }

function air_error(response){
 	console.log("air_error");
 	document.getElementById('city_response').innerHTML = 'Please enter your city.';
  	//showCityInput();
 }

function loadJSON(file, callback, error_callback) {

    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', file, true); // Replace 'my_data' with the path to your file
    req.onreadystatechange = function () {

  		if (req.status != 200 && req.status != 304) {
  			console.log(file + " returned an error...");
  			error_callback(req);
  			if (req.status == 502) {
  				console.log("Unknown city");
  			}

  		} else if (req.readyState == 4 && req.status == "200") {
  	      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
  	      callback(req.responseText);

  	  } else {
  			//console.log(".");
  		}

  	};
      req.send(null);
  }

function getRating(air){
		if (air < 50) {
			var rating = "Good";
		} else if (air >= 50 && air < 75) {
			var rating = "Slightly Polluted";
		} else if (air >= 75 && air < 100) {
			var rating = "Polluted";
		} else if (air >= 100 && air < 150) {
			var rating = "Very Polluted";
		} else if (air >= 150 && air < 200) {
			var rating = "Heavily Polluted";
		} else if (air >= 200) {
			var rating = "Dangerous";
		}
		return rating;
	}

function setupCanvas(){

		ctx1 = addCanvas('light1', canvas_w, canvas_w);
		ctx1b = addCanvas('light1b', canvas_w, canvas_w);
	//var ctx1c = addCanvas('light1c', canvas_w, canvas_w);
		ctx2 = addCanvas('light2', canvas_w, canvas_w);
		ctx2b = addCanvas('light2b', canvas_w, canvas_w);
	//var ctx2c = addCanvas('light2c', canvas_w, canvas_w);
		ctx3 = addCanvas('light3', canvas_w, canvas_w);
		ctx3b = addCanvas('light3b', canvas_w, canvas_w);
	//var ctx3c = addCanvas('light3c', canvas_w, canvas_w);

	// var ctx4 = addCanvas('light4', canvas_w, canvas_w);
	// var ctx4b = addCanvas('light4b', canvas_w, canvas_w);
	// var ctx5 = addCanvas('light5', canvas_w, canvas_w);
	document.getElementById('light1').style.webkitFilter = "blur(12px)";
	document.getElementById('light2').style.webkitFilter = "blur(12px)";
	document.getElementById('light3').style.webkitFilter = "blur(12px)";
	//document.getElementById('light4').style.webkitFilter = "blur(12px)";

	}

//setup();
