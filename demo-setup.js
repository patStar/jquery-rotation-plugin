/**
 * Initial method to setup the solar system demo.
 * 
 * @author Patrick Seeber
 */
function init() {	

	/**
	 * Method to generates spheres.
	 */
	var generateSphere = function(size,color,corona_size,corona_color){
		return $('<div>').css({
			'position':'absolute',
			'width' : size+'px',
			'height' : size+'px',
			'border-radius':size+'px',
			'background-color':color,
			'box-shadow':'0px 0px '+corona_size+'px '+corona_color,
			'z-index':1000
		});
	}

	var body = $('body');
	
	/**
	 * Method to generates the background stars.
	 */
	var generateStars = function(){
		for(var i=0; i<150; i++){
			var size = 1+Math.round(Math.random()*3);
			var star = generateSphere(size,'white',size,'white').css({
				'top':10+Math.floor(Math.random()*(window.innerHeight-20))+'px',
				'left':10+Math.floor(Math.random()*(window.innerWidth-20))+'px',
				'z-index':0
			});	
			star.addClass('star')
			body.append(star);
		}
	}
	
	generateStars();

	// create the solar system.
	var div = generateSphere(100,'white',100,'yellow').css('cursor','none');
	var redGiant = generateSphere(30,'black',10,'red');
	body.append(div);
	body.append(redGiant.rotate(div,275,0.001,1.3));
	body.append(generateSphere(15,'lightgreen',15,'lime').rotate(div,100,-0.01,0));
	body.append(generateSphere(10,'lightblue',10,'lime').rotate(div,175,-0.005,0));
	body.append(generateSphere(5,'darkred',5,'orange').rotate(redGiant,45,-0.01,2));	
	body.append(generateSphere(3,'#330000',3,'red').rotate(redGiant,30,0.02,0.5));

	// let the solar system follow the users mouse pointer.
	$(document).mousemove(function(e){
      div.css({'top':(e.pageY-50)+'px','left':(e.pageX-50)+'px'});
	}); 
	
	// revert the rotation on click.
	div.on('click',function(){
		$('.rotator').each(function(){
			$(this).data('rotate_around').speed *= -1;
		});
	})
	
	// handle window resizes.
	$(window).resize(function () { 
		$('.star').remove();
		generateStars()
	});
	
	// prevent the browser from showing scroll bars if the solar system crosses border.
	$('body').css('overflow','hidden');
}

$(init);