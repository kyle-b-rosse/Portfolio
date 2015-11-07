"use strict";

// google map code starts here

function initialize()
{
  var myLatlng = new google.maps.LatLng(30.272,-97.745);
  var mapProp = {

    center:myLatlng,
    zoom:15,
    scrollwheel: false,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]


  };
  var map=new google.maps.Map(document.getElementById("googleMap")
    ,mapProp);
  var image = {
    url: 'assets/images/markerGreen2.png',
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(-220, 60)
  };
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: image,
    title: 'i am here!'
  });

}

google.maps.event.addDomListener(window, 'load', initialize);


// google map code ends here



$(window).load(function() {

 // Preloader
// Change delay and fadeOut speed (in miliseconds)

$(".bg-preloader").delay(100).fadeOut(500);

// flex slider intiation starts here

$('.flexslider').flexslider({
 animation: "fade",
 slideDirection: "",
 slideshowSpeed: 3500,
 animationDuration: 500,
 pauseOnHover: true,
 smoothHeight: false
});
  // flex slider intiation ends here


  function progressBarsAnimate(){

    setTimeout(function(){
      $('.progress-bar').each(function(index) {
        var slidewidth = $(this).attr('data-width');
        $(this).delay(index*100).animate({width:slidewidth}, 500 , 'linear');
      });
    }, 100);

  } 
  $('.progress-bars').appear(function() {progressBarsAnimate(); });


});

$(function() {  

  $('#gallery-items img').each(function() {  
    $(this).wrap('<div class="tint"></div>');  
  });  
}); 

jQuery(document).ready(function($) {

  $('#bxslider1').bxSlider({
    mode: 'fade',
    adaptiveHeight: true,
    auto: false,
    autoControls: true,
  });
  $('.team-slider').bxSlider({
    slideWidth: 250,
    minSlides: 1,
    maxSlides: 3,
    moveSlides: 1,
    slideMargin: 50
  });


  jQuery('#gallery-items a[href^="#"]').on('click',function (e) {
   e.preventDefault();


 });

// isotop on gallery

// cache container
var $container = $('#gallery-items');
// initialize isotope
$container.isotope({
  filter: '*',
  animationOptions: {
    duration: 750,
    easing: 'linear',
    queue: false
  }
});

// filter items when filter link is clicked
jQuery('#filters a').on('click',function (e) {
  $('.gallery-filter .current').removeClass('current');
  $(this).addClass('current');
  var selector = $(this).attr('data-filter');
  $container.isotope({ filter: selector });
  return false;


});




var $head = jQuery( '.navigation' );
jQuery( '.ha-waypoint' ).each( function(i) {
  var $el = jQuery( this ),
  animClassDown = $el.data( 'animateDown' ),
  animClassUp = $el.data( 'animateUp' );



  $el.waypoint( function( direction ) {
    if( direction === 'down' && animClassDown ) {
      $head.attr('class', 'navigation ha-header ' + animClassDown),
      $('.slider').css('margin-bottom', '90px');
      $('.bbtop').css('margin-top', '96px');


    }
    else if( direction === 'up' && animClassUp ){
      $head.attr('class', 'navigation ha-header ' + animClassUp);
      $('.slider').css('margin-bottom', '0');
      $('.bbtop').css('margin-top', '0');
    }
  }, { offset: '-1' } );
} );


	//Elements animation
  jQuery('.animated').appear(function(){
    var element = jQuery(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    
    if (animationDelay) {
      setTimeout(function(){
        element.addClass( animation + " show" );
        element.removeClass('hiden');
        if (element.hasClass('counter')) {
          element.children('.value').countTo();
        }
      }, animationDelay);
    }else {
      element.addClass( animation + " show" );
      element.removeClass('hiden');
      if (element.hasClass('counter')) {
        element.children('.value').countTo();
      }
    }    
  },{accY: -150});




  (function($){
      // Cache selectors
      var lastId;
      var sections = [];
      var topMenu = $(".gf-menu"),
      topMenuHeight = topMenu.outerHeight(),
      //     // All list items
      menuItems = topMenu.find("a"),
          // Anchors corresponding to menu items

          scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
          });
      // // Bind click handler to menu items


      // so we can get a fancy scroll animation
      menuItems.click(function(e){
        var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+10;
        $('html, body').stop().animate({ 
          scrollTop: offsetTop
        }, 700);
        e.preventDefault();
      });


      // // // Bind to scroll
      $(window).on('scroll',function (e) {

         // Get container scroll position
         var fromTop = $(this).scrollTop()+topMenuHeight;
         
         // Get id of current scroll item
         var cur = scrollItems.map(function(){
           if ($(this).offset().top < fromTop)
             return this;
         });
         // Get the id of the current element
         cur = cur[cur.length-1];
         var id = cur && cur.length ? cur[0].id : "";
         
         if (lastId !== id) {
           lastId = id;
             // Set/remove active class
             menuItems
             .parent().removeClass("active")
             .end().filter("[href=#"+id+"]").parent().addClass("active");
           }                   
         });

    })(jQuery);


// Contact form validation



  $("#submit_btn").on('click',function (e) { 
        //get input field values
        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        var user_subject      = $('input[name=subject]').val();
        var user_message    = $('textarea[name=message]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name==""){ 
          $('input[name=name]').css({"border-left":"4px solid #f26c63",  "background": 'url("assets/images/slider/sprite.png") no-repeat scroll -62px -420px #fff'}); 
          proceed = false;
        }
        if(user_email==""){ 
          $('input[name=email]').css({"border-left":"4px solid #f26c63",  "background": 'url("assets/images/slider/sprite.png") no-repeat scroll -62px -279px #fff'}); 
          proceed = false;
        }
        if(user_subject=="") {    
          $('input[name=subject]').css({"border-left":"4px solid #f26c63",  "background": 'url("assets/images/slider/sprite.png") no-repeat scroll -62px -702px #fff'}); 
          proceed = false;
        }
        if(user_message=="") {  
          $('textarea[name=message]').css({"border-left":"4px solid #f26c63",  "background": 'url("assets/images/slider/sprite.png") no-repeat scroll -62px -558px #fff'}); 
          proceed = false;
        }

        //everything looks good! proceed...
        if(proceed) 
        {
            //data to be sent to server
           post_data = {'userName':user_name, 'userEmail':user_email, 'usersubject':user_subject, 'userMessage':user_message};
            
            //Ajax post data to server
            $.post('contact_me.php', post_data, function(response){  

                //load json data from server and output message     
                if(response.type == 'error')
                {
                  output = '<div class="error">'+response.text+'</div>';
                }else{
                  output = '<div class="success">'+response.text+'</div>';
                  
          //reset values in all input fields
          $('#contact_form input').val(''); 
          $('#contact_form textarea').val(''); 
        }
        
        $("#result").hide().html(output).slideDown();
      }, 'json');
            
          }
        });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").on('keyup',function (e) {
      $("#contact_form input, #contact_form textarea").css('border-left','');
      $("#email").css('background','url("assets/images/slider/sprite.png") no-repeat scroll -62px -844px #fff');  
      $("#result").slideUp();
    });
    

// Contact form validation end
});
$(function() {
  $("#toTop").on('click',function (e) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
