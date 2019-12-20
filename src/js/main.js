/* -------------------------------------
 * Utility Functions
 *
 * util.getCookie();
 * util.setCookie();
 * util.checkCookie();
 * util.getQueryParam();
 * ------------------------------------- */

// Useful Global $Vars
var $document = jQuery(document),
	$body = jQuery('body'),
	$window = jQuery(window);

var util = {

	// Gets a cookie and returns the cookies value, if no cookie exists it returns blank "".
	getCookie: function (c_name) {
		if (document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(c_name + '=');
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				var c_end = document.cookie.indexOf(';', c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return '';
	},

	// Sets a cookie with your given ("cookie name", "cookie value", "good for x days").
	setCookie: function (c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : '; expires=' + exdate.toUTCString()) + '; path=/';
	},

	// Checks to see if a cookie exists, then returns boolean (true/false).
	checkCookie: function (c_name) {
		c_name = util.getCookie(c_name);
		return ((c_name != null && c_name != '') ? true : false);
	},

	// Gets a query string parameter value by name.
	// Defaults to location.href but can accept any URL to parse.
	getQueryParam: function (name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

};


jQuery(document).ready(function ($) {
	
	var showLoader = setInterval(() => {
		if ($('.ww-page-wrapper').length) {
			
			clearInterval(showLoader);
			
			$('.loader').addClass('d-none');
			$('body').removeClass('overlay');
			// let para_hint = "<div class='bottom-text'>Please Complete the information inorder to submit your request.</div>"
			// $(document).find('.text-holder').append(para_hint);
			// $(document).find('.ww-dsar__fields-grid:eq(1)').find('label').text('First Name *');
			// let lastname_html = '<div data-v-3c301269="" class="ww-dsar__fields-grid"><div data-v-3c301269=""><div data-v-ed3a1202="" data-v-3c301269="" class="p-input" items=""><label data-v-ed3a1202="">Last Name *</label> <input data-v-ed3a1202="" data-cy="dsar-Name" name="5de6c7cdde8436002fdb1c87" items="" style="border-color: rgb(242, 114, 97); box-shadow: rgb(242, 114, 97) 0px 0px 0px 1px inset;"> <div data-v-ed3a1202="" class="input-details"></div></div></div></div>'
			// $(document).find('.ww-dsar__fields-grid:eq(1)').after(lastname_html);



			// let radio_html = `
			// <div class='form__text marginbot-20'>I am submitting this privacy request on behalf of:*</div>
			// <div class="input-field lr-ui-radio-button-group marginbot-20">                 
			// 		<label class="t-mobile-select">
			// 			<input type="radio" name="t-mobile" id="t-mobile_yes"> 
			// 			<span class="form__text">Myself, as the data subject.</span>
			// 		</label>
			// 		<label class="t-mobile-select">
			// 			<input type="radio" type="radio" name="t-mobile" id="t-mobile_no"> 
			// 			<span class="form__text">the data subject, I am the authorized agent</span>
			// 		</label>
			// 	</div>`
			// 	$(document).find('.ww-dsar__fields-grid:eq(2)').after(radio_html);

			
		} else {
			$('.loader').removeClass('d-none');
			//$('body').addClass('overlay');
		}
	}, 100);
	setTimeout(() => {
		if (!$('.ww-page-wrapper').length) {
			clearInterval(showLoader);
			$('.loader').addClass('d-none');
			$('body').removeClass('overlay');
		}
	}, 5000);
	$('#req-specific').on('click', function () {
		let ele = $('#req-option')
		let anchorEle = $('#req-specific')
		ele.hasClass('d-none') ? ele.removeClass('d-none') : ele.addClass('d-none');
		anchorEle.hasClass('open') ? anchorEle.removeClass('open') : anchorEle.addClass('open');
		
	});

	// dropdown toggle on hover
	$('ul.navbar-nav li.dropdown').hover(function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).slideDown(400);
		}, function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).slideUp(400);
	});	


	   // scroll to top button 
		let scroll_top = `<div class="scroll-to-top" style="display:none">
			<span class="glyphicon glyphicon-chevron-up"></span>
		</div>`
		$(document).find('body').append(scroll_top);
		$(document).scroll(function() {
			let y = $(this).scrollTop();
			if (y > 120) {
			$('.scroll-to-top').fadeIn();
			} else {
				$('.scroll-to-top').fadeOut();
			}
		});

		// on click scrolling to page top
		$(document).on('click','.scroll-to-top', function(){
			$("html, body").animate({ scrollTop: 0 }, "slow");
  			return false;
		})
	

		// finding the script is loaded or not
		let page_script = $(document).find('#wirewheel-ppp').attr('src');
		$.getScript( page_script )
			.done(function( script, textStatus ) {
				console.log( textStatus );
				// removing tooltip from the ww-self-service dom element
				$(document).find('.ww-self-service').removeAttr('title');
			})
			.fail(function( jqxhr, settings, exception ) {
				console.log( exception );
		});
});



// let page_script = $(document).find('#wirewheel-ppp').attr('src');
// if ($('.ww-page-wrapper').length) {
// 			$('.loader').addClass('d-none');
// 			$('body').removeClass('overlay');
// 		}
// 		$.getScript( page_script )
// 	.done(function( script, textStatus ) {
// 		console.log( textStatus );
// 		$(document).find('.ww-self-service').attr({'title':'dddd'});
// 			$('.loader').addClass('d-none');
// 			$('body').removeClass('overlay');
// 	})
// 	.fail(function( jqxhr, settings, exception ) {
// 		console.log( exception );
// 	});

