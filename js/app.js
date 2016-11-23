// some globals
var w, width, h, height;
var canvas;
var canvas_w = 290;
var shadow_size = 280;
var light_size = 240;
var temp_percentage = 0;
var air_percentage = 0;
var time_percentage = 0;
var bio_percentage = 0;
var city = "";
var gradient = 1;
var temp = 50;
var air = 0;
var conditions = "";
var ctx1, ctx1b, ctx2, ctx2b, ctx3, ctx3b, ctx4, ctx4b;

//localStorage.setItem('selected', 'temp');

var card_names = document.querySelectorAll('.card');
var city_input_card = document.getElementById('city_input_card');
//city_input_card.style.position = "fixed";
var city_input = document.getElementById('city_input');
var city_button = document.getElementById('city_button');

var gradient_boxes = document.querySelectorAll('.gradient_box');
var gradient_boxes_small = document.querySelectorAll('.gradient_box_small');

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
		if (localStorage.selected && localStorage.selected != undefined) {
			selectCard(localStorage.selected);
			//console.log("localStorage.selected: " + localStorage.selected);
		}

	} else {
		console.log('no city');
		selectCard('city_input');

	}


	if (localStorage.temp && localStorage.temp != undefined) {
		temp = localStorage.temp;
		conditions = localStorage.conditions;
		//console.log("localStorage.temp: " + localStorage.temp);
		setTemp(temp, conditions)
	}

	if (localStorage.air && localStorage.air != undefined) {
		air = localStorage.air;
		conditions = localStorage.conditions;
		//console.log("localStorage.air: " + localStorage.air);
		setAir(air, conditions);
	}

	if (localStorage.gradient && localStorage.gradient != undefined) {
		gradient = localStorage.gradient;
		console.log("localStorage gradient: " + gradient);
		selectGradient("gradient" + gradient);
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

	for (var i = 0; i < gradient_boxes_small.length; i++) {
	    gradient_boxes_small[i].addEventListener('click', function(event) {
			selectCard('colour_select');
			console.log("gradient click");
			colour_select_card.style.left = "0%";
	    });
	}

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
				selectGradient(id);

	    }
		);
	}

}

var hide = window.setTimeout(hidemodal, 1000);

function setup(){

	setupCanvas();
	setListeners();
	checkLocalStorage();

	drawGradient(1);
	drawGradient(2);
	drawGradient(3);
	drawGradient(4);

	// drawGradient(10);
	// drawGradient(11);
	// drawGradient(12);
	// drawGradient(13);

	//drawLightChoice();

	if (city && city !=undefined) {
		hideCityInput();
		getTemp();
		getAir();

	} else {
		showCityInput();
		document.getElementById('temp_card').style.display = "none";
		document.getElementById('air_card').style.display = "none";
		document.getElementById('time_card').style.display = "none";
		//turnOnCityInput();
	}

}

function selectCard(name){

	console.log("selectCard: " + name);
	//console.log(gradient);
	var option_name = document.querySelectorAll('.option_select');
	for (var i = 0; i < option_name.length; i++) {
    option_name[i].classList.remove("on");
	}


	for (var i = 0; i < card_names.length; i++) {
		card_names[i].classList.add("card_narrow");
	}

	var selecta = name + "_select";
	var card = name + "_card";
	document.getElementById(card).scrollIntoView({'alignToTop': true});

	if (name == 'colour_select') {
		console.log("colour_select_card");
		colour_select_card.style.left = "0%";
		//colour_select_card.style.opacity = 1;
	} else if (name != 'city_input') {
		localStorage.setItem('selected', name);
		moveMarker();
	} else {
		//showCityInput();
		//city_button.style.display = 'block';
		turnOnCityInput();
		//showCityInput();
	}
	//console.log("------" + selecta);
	//console.log("------ " +card);
	document.getElementById(selecta).classList.add("on");
	document.getElementById(card).classList.remove("card_narrow");

}

function showCityInput(){
	console.log("showCityInput");

	selectCard('city_input');
	turnOnCityInput();
}

function turnOnCityInput(){
	city_input_card.style.left = "0%";
	//city_input_card.style.opacity = 1;
	console.log('turnOnCityInput');
	city_input.style.background = '#f7f7f7';
	city_input.focus();
	city_button.style.display = 'block';
	city_cancel.style.display = 'block';
	colour_select_card.style.left = "-100%";

}



function hideCityInput(){

	//console.log('hideCityInput');
	city_input_card.style.left = "-100%";
	//city_input_card.style.opacity = 0;
	city_input.style.background = 'none';
	city_button.style.display = 'none';
	//console.log("selected: " + localStorage.selected);
	//selectCard(localStorage.selected);
	city_cancel.style.display = 'none';

}

function selectGradient(id){
	console.log("selectGradient:" + id);
	hideMarkers();

	for (var j = 0; j < gradient_boxes.length; j++) {
			gradient_boxes[j].classList.remove("active");
	}

	gradient = id.slice(8, id.length );

	var marker = id +"_marker";
	document.getElementById(marker).style.display = "block";
	document.getElementById(id).classList.add("active");
	localStorage.setItem("gradient", gradient);
	//console.log("new gradient: " + gradient);
	colour_select_card.style.left = "-100%";
	drawSmallGradients(gradient);
	moveSmallMarkers();
	resetLight();
}

function drawGradient(num) {
	console.log(num);
 	color1 = document.getElementById('color'+ num +'a').value;
 	color2 = document.getElementById('color'+ num +'b').value;
 	document.getElementById('gradient' + num).style.background = 'linear-gradient(to right, ' + color1 + ', ' + color2 + ')';

 }


function drawSmallGradients(num) {
	console.log(num);
 	color1 = document.getElementById('color'+ num +'a').value;
 	color2 = document.getElementById('color'+ num +'b').value;
	for (var i = 0; i < gradient_boxes_small.length; i++) {
		gradient_boxes_small[i].style.background = 'linear-gradient(to right, ' + color1 + ', ' + color2 + ')';
	}

 }

function resetLight() {

	//console.log("resetLight: " + gradient);
	temp_percentage = calcTempPercent(temp);
	air_percentage = calcAirPercent(air);
	time_percentage = 90;
	//console.log('temp_percentage: ' + temp_percentage);
	var color1 = getColour(temp_percentage, gradient);
	var color2 = getColour(air_percentage, gradient);
	var color3 = getColour(time_percentage, gradient);
	var color4 = getColour(time_percentage, gradient);
	// console.log(color1);
	// console.log(color2);
	drawLight(ctx1, ctx1b, color1);
	drawLight(ctx2, ctx2b, color2)
	drawLight(ctx3, ctx3b, color3);

	 if (localStorage.selected == "temp") {
		 moveMarker(temp_percentage);
	 } else if (localStorage.selected == "air") {
		 moveMarker(air_percentage);
	 } else if (localStorage.selected == "time") {
		 moveMarker(time_percentage);
	 } else {
		 moveMarker(time_percentage);
	 }

}




function getColour(percentage, gradient){

	//console.log("getColour for gradient"+ gradient);
	// console.log("percentage: "+ percentage);
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
	var c3 = calculateColour(c1, c2, percentage);
	// console.log(c1);
	// console.log(c2);
	// console.log(c3);
	return c3;

}

function moveSmallMarkers(){

	var small_markers = document.querySelectorAll('.marker_small');

	//document.getElementById('gradient11_marker_small');
	for (var i = 0; i < small_markers.length; i++) {
		var small_marker = small_markers[i];
		//console.log(small_marker);
		if (i == 0) {
			var percentage = temp_percentage;
			var c = getColour(percentage, gradient);
		} else if (i == 1) {
			var percentage = air_percentage;
			var c = getColour(percentage, gradient);
		} else {
			var percentage = time_percentage;
			var c = getColour(percentage, gradient);
		}

			//var target_marker = document.getElementById('gradient' + i + '_marker');
			if (percentage > 50) {
				small_marker.style.left = 'calc(' + percentage + '% - 30px)';
			} else {
				small_marker.style.left = 'calc(' + percentage + '% + 5px)';
			}

			small_marker.style.background = rgb(c.r, c.g, c.b);
			//console.log("moveMarker: " + i + " - " + percentage);
	}

}


function moveMarker(percentage){

	var markers = document.querySelectorAll('.marker');
	for (var i = 1; i <= markers.length; i++) {
			var target_marker = document.getElementById('gradient' + i + '_marker');
			if (percentage > 50) {
				target_marker.style.left = 'calc(' + percentage + '% - 30px)';
			} else {
				target_marker.style.left = 'calc(' + percentage + '% + 5px)';
			}

			var c = getColour(percentage, i);
			// //console.log(c);
			target_marker.style.background = rgb(c.r, c.g, c.b);
			//console.log("moveMarker: " + i + " - " + percentage);
	}

}

function saveCity(){

	city = toTitleCase(city_input.value);
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
	 city_input.style.left = "-100%";
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

	temp_percentage = calcTempPercent(temp);
	//temp_percentage = 96;
	//console.log("temp: " + temp + " -  " + temp_percentage + "%");

	temp_value.innerHTML = Math.floor(temp)+ '&deg;C';
	temp_descrip.innerHTML = conditions;
	localStorage.setItem("temp", temp);
	localStorage.setItem("conditions", conditions);
	resetLight();
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
	//console.log("air: " + air + " -  " + air_percentage + "%");
	localStorage.setItem("air", air);

	var rating = getRating(air);
	document.getElementById('air_value').innerHTML = Math.floor(air);
	document.getElementById('air_description').innerHTML = rating;
	resetLight();
}

function calcTempPercent(temp){
	return Math.round(clamp(temp, 0, 34)/34*100);
}

function calcAirPercent(air){
	return Math.round(clamp(air, 0, 200)/200*100);
}

//// UTILS

function drawLightChoice(){
		// choose light icons
	ctx5.fillStyle = rgb(0);
	ctx5.HfillEllipse(w/2, h/2 - 50, 200,200);
	ctx5.HfillEllipse(w/2 - 60, h -50, 30,30);
	ctx5.fillRect(w/2 - 15, h - 65, 30,30);
	ctx5.eqFillTriangle(w/2 + 60, h - 45, 20);
}

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
	//console.log(c2);
		_ctx1.beginPath();
		_ctx1.arc(w/2, h/2, shadow_size/2, 0, Math.PI*2, true);
      var grd = _ctx1.createRadialGradient(238, 50, 10, 238, 50, 300);
      // light blue
      grd.addColorStop(0, hsl(255*c[0], c[1]*100, c[2]*100));
      // dark blue
      grd.addColorStop(1, hsl(255*c2[0], c2[1]*100, c2[2]*100));

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

function hidemodal(){
	var modal = document.getElementById('modal')
	modal.classList.add("modal_hide");
	window.setTimeout(function(){ modal.style.display = 'none'}, 5000);
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
	// console.log('-----');

	r = diffCalc(c1.r, c2.r, percentage)
	//console.log("r: " + r);
  g = diffCalc(c1.g, c2.g, percentage)
	//console.log("g: " + g);
	b = diffCalc(c1.b, c2.b, percentage);
	//console.log("b: " + b);

	return {r:Math.round(r), g:Math.round(g), b:Math.round(b)};

}

function diffCalc(c1, c2, percentage){
	//if c1 = 255 and c2 = 0;
	// 100% of the way from c1 to c2
	if (c1 > c2 ) {
		var c = c1 - (c1 - c2) * percentage/100;
  } else {
   	var c = c1 + (c2 - c1) * percentage/100;
  }
	return c;

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
					city_input_card.style.left = "-100%";
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
	document.getElementById('light1').style.webkitFilter = "blur(14px)";
	document.getElementById('light2').style.webkitFilter = "blur(14px)";
	document.getElementById('light3').style.webkitFilter = "blur(14px)";
	//document.getElementById('light4').style.webkitFilter = "blur(12px)";

	}

//setup();
