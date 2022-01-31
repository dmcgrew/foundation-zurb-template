import $ from 'jquery';
import 'what-input';
import { gsap } from "gsap";
import Swiper from 'swiper';


// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
//require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

//prevent right click
document.addEventListener('contextmenu', event => event.preventDefault());

$(document).foundation();


$(document).ready(function(){
    
    $(".screen").show();
    
    var numberOfPresidentImages = 117;
    var randomDelayMaximum = 6; //max number of seconds image switching can be delayed
    
    function getRandomNumber(min, max) {
       return Math.floor(Math.random() * (max - min + 1) + min);
    }
    

    
    
    function randomImage(){
        $(".presidents_grid .photo:nth-child("+getRandomNumber(4)+")").addClass("on");
        $(".presidents_grid .photo:nth-child("+getRandomNumber(4)+")").removeClass("on");
        console.log("image swap");
        
    }
    
    function cycleImages(){
        var swiperArray = [];
        $(".presidents_grid .swiper-container").each(function(){
            
            var randomInterval = getRandomNumber(1,10)*1000;
            var theImage = $(this);
            var zindexCounter = 100;
            var slideShow;
            var swapImage;
    

            var prezGridFlipper;
            
            
            prezGridFlipper = new Swiper(theImage, {
              effect: 'fade',
              grabCursor: false,
              loop: true,
              speed: 1000
            });
            
            swiperArray.push(prezGridFlipper);

        });
        
        
        //console.log(swiperArray);
        
        setInterval(function(){
            swiperArray[gsap.utils.random(0, 36, 1)].slideNext();
        }, 500);
        
        setInterval(function(){
            swiperArray[gsap.utils.random(0, 36, 1)].slideNext();
        }, 1250);
        
        setInterval(function(){
            swiperArray[gsap.utils.random(0, 36, 1)].slideNext();
        }, 1610);
        
    }
    cycleImages();
    

    
    var screensaver;
    
    function screensaverSetup(){
        $(".screensaver").show();
        $("#home, #view_president").hide();
        
        var touch = gsap.to(".touch span", {x:-15, duration:1, ease:"power1.in",yoyoEase:false, yoyo:true, repeat:-1});
        
        screensaver = gsap.timeline({paused:true, repeat: -1});
        
        screensaver.set(".screensaver", {opacity:1});
        //start the touch animation
        screensaver.call(function(){
            touch.play();
        });
        
        screensaver.fromTo(".logo, .touch", {opacity:0}, {opacity:1, duration: 1, delay:0}, 0);
        screensaver.from("#screensaver1 .quote", {xPercent:-30, opacity:0, duration:1, ease:"power2.inOut"}, 1);
        screensaver.from(".current_president", {xPercent:30, opacity:0, duration:1, ease:"power2.inOut"}, 1);
        screensaver.from(".current_president_name", {opacity:0, duration:2, ease:"power2.inOut"}, 1.4);
        
        screensaver.to("#screensaver1 .quote", {xPercent:-60, opacity:0, duration:1, ease:"power2.inOut"}, 15);
        
        screensaver.from(".blue_bar", {opacity:0, xPercent: -100, duration:1, ease:"power2.inOut"}, 15.3);
        screensaver.from(".blue_bar span", {opacity:0, duration:0.5, ease:"power2.inOut"}, 16);
        screensaver.from("#screensaver2 h1", {opacity:0, duration:1, ease:"power2.inOut"}, 16.2);
        
        //screensaver.call(cycleImages, {}, 7);
        
        screensaver.to(".logo, .touch, .current_president_name", {opacity:0}, 20);
        screensaver.to(".current_president", {xPercent:60, opacity:0, duration:1, ease:"power2.inOut"}, 20);
        
        //pause the touch animation so that the timeline can repeat
        screensaver.call(function(){
            touch.pause();
        }, {}, 20);
        
        
        screensaver.to(".presidents_grid .image:not(.invisible)", {opacity:1, stagger:0.05, duration: 0.7}, 20.7);
        
        screensaver.to("#screensaver3", {opacity:1, duration: 1}, 20.7);
        
        screensaver.to("#screensaver3, .presidents_grid .image:not(.invisible), .blue_bar, #screensaver2 h1", {opacity:0, duration: 1}, 40);
        
        
        
        
    }
    screensaverSetup();
    
    screensaver.play();
    
    function resetScreensaver(){
        screensaver.pause(0);
        
        gsap.set(".current_president", {xPercent:0, opacity:0});
        gsap.set(".current_president_name", {opacity:0});
        gsap.set("#screensaver1 .quote", {opacity:0, xPercent:-30});
        gsap.set(".blue_bar", {opacity:0, xPercent: 0});
        gsap.set(".blue_bar span", {opacity:0});
        gsap.set("#screensaver2 h1", {opacity:0});
        gsap.set(".presidents_grid .image:not(.invisible)", {opacity:0});
        gsap.set("#screensaver3", {opacity:0});
        
    }
    
    var screensaverTimer;
    
    function playScreensaver(){
        
        $(".president_content.active").removeClass("active");
        
        $("#home, #view_president").hide();
        $(".screensaver").show();
        screensaver.play();
        console.log("times up, start the screensaver");
    }
    
    
    var screensaverTimer;
    
    function screensaverTimer2(){
        console.log("screensaverTimer2()");  
        screensaverTimer = setTimeout(function(){
            
            playScreensaver();
            
        },180000);
        console.log("end screensaverTimer2()");
    }
    
    
    
    
    function showHome(){
        var homeIntro = gsap.timeline({});
        homeIntro.set("#home", {display: "block"});
        homeIntro.set("#home", {opacity:1});
        homeIntro.to(".screensaver", {opacity:0, duration:0.5});
        homeIntro.to(".logo", {opacity:1, duration:1});
        homeIntro.to(".decade", {opacity:1, duration:1, stagger: 0.05}, 0);
        //$(".screensaver").hide();
        
        screensaverTimer2();
        console.log("showHome()");
    }
    
    
    
    $(".screensaver").click(function(){
        console.log("clear screensaver timer");
        
        showHome();
        resetScreensaver();
        
        
    }); 
    

    
    var prezNav = new Swiper('.nav_area .swiper-container', {
        slidesPerView: 13,
        spaceBetween: 30,
        freeMode: true,
        centeredSlides: true,
        freeModeSticky: true,
        slideToClickedSlide: true,
        freeModeMomentumRatio: 0.5,

        init: false,
        navigation: {
            nextEl: '.button-next',
            prevEl: '.button-prev',
        },
        //freeModeMomentum: false
        //freeModeMomentumVelocityRatio: 0.5
    }); 
    
    
    prezNav.on("sliderMove", function(){
        $(".swiper-container").addClass("touchStart");
    });
    
    prezNav.on("transitionEnd", function(){
        $(".swiper-container").removeClass("touchStart");
    });
    
    
    
    
    
    
    
    function navigating(){
        
        console.log("navigating()");
        //console.log("slide index: "+prezNav.activeIndex);
        var htmlFile = $(".nav_area .swiper-slide-active").data("html");
        getHTML(htmlFile);
        
        var activeSlide = prezNav.activeIndex;
        

        //if slide is less than or equal to 1980 and not 1955
        if(activeSlide <= 74 && activeSlide != 48 && activeSlide != 69  && activeSlide != 70){
            $(".logos img").not(".logo1905").fadeOut();
            $(".logo1905").fadeIn();
        }
        
        //if slide is 1955
        if(activeSlide == 48){
            $(".logos img").not(".logo1955").fadeOut();
            $(".logo1955").fadeIn();
        }
        
        //if slide is 1976
        if(activeSlide == 69 || activeSlide == 70){
            $(".logos img").not(".logo1976").fadeOut();
            $(".logo1976").fadeIn();
        }
        
        //if slide is 1980
        if(activeSlide == 74){
            $(".logos img").not(".logo1980").fadeOut();
            $(".logo1980").fadeIn();
        }
        
        //if slide is 1981-1986
        if(activeSlide >= 75 && activeSlide <= 80){
            $(".logos img").not(".logo81-86").fadeOut();
            $(".logo81-86").fadeIn();
        }
        
        //if slide is 1987-1991
        if(activeSlide >= 81 && activeSlide <= 85){
            $(".logos img").not(".logo87-91").fadeOut();
            $(".logo87-91").fadeIn();
        }
        
        //if slide is 1992-2002
        if(activeSlide >= 86 && activeSlide <= 96){
            $(".logos img").not(".logo92-02").fadeOut();
            $(".logo92-02").fadeIn();
        }
        
        //if slide is 2003-2012
        if(activeSlide >= 97 && activeSlide <= 106 && activeSlide != 99){
            $(".logos img").not(".logo03-13").fadeOut();
            $(".logo03-13").fadeIn();
        }
        
        
        //if slide is 2005
        if(activeSlide == 99){
            $(".logos img").not(".logo2005").fadeOut();
            $(".logo2005").fadeIn();
        }
        
        
        //if slide is greater than 2012
        if(activeSlide > 106){
            $(".logos img").not(".logo_current").fadeOut();
            $(".logo_current").fadeIn();
        }
    }
    
    
    
    function getHTML(htmlFile){
        
        console.log(htmlFile);
        
        $(".president_content.active").removeClass("active");
        $('[data-president="'+htmlFile+'"]').addClass("active");
        
    }
      

    var prezNavStarted = false;
    $(".decade").on("click", function(){
        var navNumber = $(this).data("nav");
        
        gsap.to("#home, .decade", {opacity:0, duration:0.5});
        
        $("#view_president").fadeIn(function(){
            
            console.log(prezNavStarted);
            if(prezNavStarted === false) {
                prezNav.on("init", function(){
                    console.log("init");
                    
                    gsap.to(".nav_area", {opacity:1, duration:1});
                    
                    prezNavStarted = true;
                    
                });
                prezNav.init();
            }
            
            
            prezNav.slideTo(navNumber, false, false);
            
            //$(".president_content").show();
            
            navigating();
            
        });
        
        prezNav.on("slideChangeTransitionEnd", function(){
            navigating();
            console.log("slideChangeTransitionEnd");
        });
        
        prezNav.once("click", function(){
            navigating();
        });
        
    });

    
    $("#home, #view_president").on("click touchstart", function(){
        //console.log("click");
        
        clearTimeout(screensaverTimer);
        screensaverTimer = setTimeout(function(){
            prezNav.off("slideChangeTransitionEnd");
            prezNav.off("click");
            playScreensaver();
            
        },180000);
    });
    
    prezNav.on("slideChangeTransitionStart", function(){
        console.log("slider click");
        
        clearTimeout(screensaverTimer);
        screensaverTimer = setTimeout(function(){
            prezNav.off("slideChangeTransitionEnd");
            prezNav.off("click");
            playScreensaver();
            
        },180000);
    });
    
    
    
    $(".back_decade, .logo").on("click", function(){
        prezNav.off("slideChangeTransitionEnd");
        prezNav.off("click");
        $("#view_president").fadeOut(function(){
            showHome();
            $(".president_content.active").removeClass("active");
        });
        
    });

}); 


