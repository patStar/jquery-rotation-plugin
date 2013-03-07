/**
 * Rotate plugin for jQuery to let dom elements rotate around each other.
 * 
 * 
 * @author Patrick Seeber
 */
(function($) {	

	"use strict";	
	
	/** 
	 *  Method to extract the numeric part of css properties.
	 *
	 *	Special thanks to zakovyrya.
	 * 	http://stackoverflow.com/questions/1100503/how-to-get-just-numeric-part-of-css-property-with-jquery
	 * 
	 *  @param The css parameter like "20px" or "90deg".
	 *  
	 *  @return The numeric value of the css parameter.
	 */
	var extract = function(cssValue) {
		return parseFloat(cssValue.replace(/[^-\d\.]/g, ''));
	}
	
	/** 
	 *  Method to register an rotating element.
	 *  
	 *  This method will be attached to jquery in the init method so "this" refers to the 
	 *  currently selected jquery element. Rotation data and the .rotator class is attached 
	 *  to the selected element.
	 *  
	 *  @param center 
	 *  			The center element to rotate around.
	 *  @param radius 
	 *  			The distance from the center of the center element.
	 *  @param speed 
	 *  			The clockwise rotation speed in degrees/step. May be negative to 
	 *  			rotate anti-clockwise.
	 *  @param [starting_angle]
	 *  			An optional starting angle to begin the rotation from.
	 *  
	 *  @return The currently selected jquery element.
	 */
	var rotate = function(center, radius, speed, starting_angle) {
		starting_angle = starting_angle ? starting_angle : 0;
		this.addClass('rotator')
		this.data('rotate_around',{ 
			main: this, 
			radius: radius, 
			speed: speed, 
			center: center, 
			rotation: starting_angle 
		});		
		return this;
	}
	
	/** 
	 * Method to rotate all assigned objects. 
	 */		 
	var rotateAll = function() {	
		$('.rotator').each(function(){
			var r = $(this).data('rotate_around');
			
			var	newLeft = r.center.width()/2+r.center.offset().left-Math.sin(r.rotation)*r.radius-r.main.width()/2;
			var newTop = r.center.height()/2+r.center.offset().top-Math.cos(r.rotation)*r.radius-r.main.height()/2;		
			
			r.main.css({left:newLeft,top:newTop});
			r.rotation = (r.rotation+r.speed)%(2*Math.PI);
		});
	}			

	/** Constructor equivalent to register the plugin to jquery and setup the rotation interval. */
	var init = function() {
		$.fn.rotate = rotate;
		setInterval(rotateAll,0);
	}			
	
	init();		
	return this;					
	
})(jQuery)