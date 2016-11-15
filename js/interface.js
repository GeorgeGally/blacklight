$(document).ready(function() {
	var color1 = $('.color-panel-1').css('backgroundColor');
	var color2 = $('.color-panel-2').css('backgroundColor');
	var gradientLinear = 'linear-gradient';
	var gradientRadial = 'radial-gradient';
	var gradientDirection = '90';

	// $("#color-custom").spectrum({
	// 	color: "#1687ed",
	// 	preferredFormat: "hex",
	// 	flat: "true",
	// 	showInput: "true",
	// 	preferredFormat: "hex",
	// 	move: function (color) {
	// 		$('.color-panel-1').css('background-color', color);
	// 	},
	// 	change: function (color) {
	// 		$('.color-panel-1').css('background-color', color);
	// 	},
	// });

	// $("#color-custom-2").spectrum({
	// 	color: "#14375a",
	// 	preferredFormat: "hex",
	// 	flat: "true",
	// 	showInput: "true",
	// 	preferredFormat: "hex",
	// 	move: function (color) {
	// 		$('.color-panel-2').css('background-color', color);
	// 	},
	// 	change: function (color) {
	// 		$('.color-panel-2').css('background-color', color);
	// 	},
	// });

	$('#main').css(
		'background', gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ')'
	);

	$('.gradient-linear').on('mousemove mouseup mousedown keyup', function() {
		// color1 = $('.color-panel-1').css('backgroundColor');
		// color2 = $('.color-panel-2').css('backgroundColor');

		$('#main').css(
			'background', gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ')'
		);
		$('.blend-gradient').text('background: ' + gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
		$('.blend-webkit-gradient').text('background: ' + '-webkit-' +gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	});


	$('.left .block').click(function(){
		color1 = $(this).data('colour');
		console.log(color1);
	updateColours();
});
$('.right .block').click(function(){
	color2= $(this).data('colour');
	console.log(color2);
updateColours();
});

function updateColours(){
	console.log("update colours");
	console.log(color1);
	$('.color-panel-1').css('background-color', color1);
	$('.color-panel-2').css('background-color', color2);

	$('#main').css(
		'background', gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ')'
	);
	$('.blend-gradient').text('background: ' + gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	$('.blend-webkit-gradient').text('background: ' + '-webkit-' +gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	$('.color-panel').addClass('color-panel-minimize');
	//$(this).addClass('color-blend-minimize');
	//$('.controls').addClass('controls-in');
	//$('.slider-container').addClass('slider-in');
	$('.blend-gradient').text('background: ' + gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	$('.blend-webkit-gradient').text('background: ' + '-webkit-' +gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
}

	updateColours();

	$(document).keyup(function(e){
		if(e.keyCode === 27) {
			$('#gradient-output').removeClass('gradient-output-in');
		}
	});



	// $('.color-linear').on('click', function() {
	// 	setTimeout(function() {
	// 		$('body').removeClass().addClass('gradient-linear');
	// 		$('.slider-container').fadeIn('fast');
	// 		$('.blend-gradient').text('background: ' + gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	// 		$('.blend-webkit-gradient').text('background: ' + '-webkit-' +gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	// 		$('#main').css(
	// 			'background', gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ')'
	// 		);
	// 		$('.gradient-linear').on('mousemove mouseup mousedown keyup', function() {
	// 			color1 = $('.color-panel-1').css('backgroundColor');
	// 			color2 = $('.color-panel-2').css('backgroundColor');
	// 			$('#main').css(
	// 				'background', gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ')'
	// 			);
	// 			$('.blend-gradient').text('background: ' + gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	// 			$('.blend-webkit-gradient').text('background: ' + '-webkit-' +gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ');');
	// 		});
	// 	}, 1);
	// });

	// $('.color-radial').on('click', function() {
	// 	setTimeout(function() {
	// 		$('body').removeClass().addClass('gradient-radial');
	// 		$('.slider-container').fadeOut('fast');
	// 		$('#main').css(
	// 			'background', gradientRadial + '(' + color1 + ', ' + color2 + ')'
	// 		);
	// 		$('.blend-gradient').text('background: ' + gradientRadial + '(' + color1 + ', ' + color2 + ');');
	// 		$('.blend-webkit-gradient').text('background: ' + '-webkit-' + gradientRadial + '(' + color1 + ', ' + color2 + ');');
	// 		$('.gradient-radial').on('mousemove mouseup mousedown keyup', function() {
	// 			color1 = $('.color-panel-1').css('backgroundColor');
	// 			color2 = $('.color-panel-2').css('backgroundColor');
	// 			$('#main').css(
	// 				'background', gradientRadial + '(' + color1 + ', ' + color2 + ')'
	// 			);
	// 			$('.blend-gradient').text('background: ' + gradientRadial + '(' + color1 + ', ' + color2 + ');');
	// 			$('.blend-webkit-gradient').text('background: ' + '-webkit-' + gradientRadial + '(' + color1 + ', ' + color2 + ');');
	// 		});
	// 	}, 1);
	// });

	$('.color-download').on('click', function() {
		$('#gradient-output').toggleClass('gradient-output-in');
	})

	// $("#adjustLinear").slider({
	// 	value: 90,
	// 	min: -135,
	// 	max: 180,
	// 	step: 1,
	// });

	$('#adjustLinear').on('click mousedown', function() {
		setTimeout(function() {
			gradientDirection = $("#adjustLinear").slider("value");
			$('body').removeClass().addClass('gradient-linear-spread');
			$('#main').css(
				'background', gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ')'
			);
			$('.gradient-linear-spread').on('mousemove mouseup mousedown keyup', function() {
				color1 = $('.color-panel-1').css('backgroundColor');
				color2 = $('.color-panel-2').css('backgroundColor');
				gradientDirection = $("#adjustLinear").slider("value");
				$('#main').css(
					'background', gradientLinear + '(' + gradientDirection + 'deg' + ', ' + color1 + ', ' + color2 + ')'
				);
			});
		}, 1);
	});



})
