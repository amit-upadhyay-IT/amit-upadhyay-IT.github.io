/*
Theme Name: Nominee
Author: TrendyTheme
Version: 1.0
*/

/* ======= TABLE OF CONTENTS ================================== 

    # Preloader
    # jQuery for page scrolling feature - requires jQuery Easing plugin
    # Sticky Menu
    # superslides
    # Enable bootstrap tooltip
    # Textrotator
    # Counter
    # Social Counter
    # Twitter Feed Carousel
    # Magnific Popup for image
    # Magnific Popup for embeds
    # Social share popup window
    # Latest post carousel
    # Testimonial Carousel
    # Archivement Carousel
    # Team Carousel
    # Client Carousel
    # Countdown
    # Detect IE version
    # Back to Top
    # Google Map
    # Shuffle for reformation filter
    # Masonry Grid
    # Placeholder
    # Ticker
    # Flickr photo
    # Flickr photo
    # Donate amount select

========================================================= */

jQuery(function ($) {

    'use strict';


    /* ======= Preloader ======= */
    $('#status').delay(0).fadeOut();
    $('#preloader').delay(500).fadeOut('slow');


    /* ======= fullHeight Window ======= */
    (function () {
        $(".tt-fullHeight").height($(window).height());

        $(window).resize(function(){
            $(".tt-fullHeight").height($(window).height());
        });

    }());


    /* ======= Sticky Menu ======= */

    (function () {
        $('.header-wrapper').sticky({
            topSpacing: 0
        });

        $('body').scrollspy({
            target: '.navbar-default',
            offset: 70
        })
    }());
    

    /* === jQuery for page scrolling feature - requires jQuery Easing plugin === */
    (function () {

        $('.navbar-nav a[href^="#"], .tt-scroll').on('click', function (e) {
            e.preventDefault();

            var target = this.hash;
            var $target = $(target);
            var headerHeight = $('.navbar, .navbar.sticky').outerHeight();
            
            if (target) {
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top - headerHeight + "px"
                }, 1200, 'easeInOutExpo', function () {
                    window.location.hash = target;
                });
            }
        });

    }());


    /* === Mobile Dropdown Menu === */
    (function(){
        $('.dropdown-menu-trigger').each(function() {
            $(this).on('click', function(e){
                $(this).toggleClass('menu-collapsed');
            });
        });
    }());


    /* === Dropdown menu offest === */
    (function(){
        $(".dropdown-wrapper > ul > li").each(function() {
            var $this = $(this),
                $win = $(window);

            if ($this.offset().left + 100 > $win.width() + $win.scrollLeft() - $this.width()) {
                $this.addClass("dropdown-inverse");
            }
        });
    }());


    /* ======= Enable bootstrap tooltip ======= */
    (function () {
        $('[data-toggle="tooltip"]').tooltip()
    }());


    /* === Counter === */
    $('.fact-wrap').on('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).off('inview');
        }
    });


    /* ======= Magnific Popup for image ======= */
    $(window).load(function(){
        $(".image-link, a[href$='.jpg'], a[href$='.png'], a[href$='.jpeg']").magnificPopup({
            gallery: {
              enabled: true
            },
            removalDelay: 300, // Delay in milliseconds before popup is removed
            mainClass: 'mfp-with-zoom', // this class is for CSS animation below
            type:'image'
        });
    });


    /* ======= Magnific Popup for embeds ======= */
    $('.tt-popup, .popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: true,
        fixedContentPos: false
    });


    /* ======= Social share popup window ======= */
    (function () {
        $('.post-share ul li a').on('click', function () {
            var newwindow = window.open($(this).attr('href'), '', 'height=450,width=700');
            if (window.focus) {
                newwindow.focus()
            }
            return false;
        });
    }());


    /* === Detect IE version === */
    (function () {
        
        function getIEVersion() {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return match ? parseInt(match[1], 10) : false;
        }

        if( getIEVersion() ){
            $('html').addClass('ie'+getIEVersion());
        }

    }());


    /* ======= Back to Top ======= */
    (function(){

        $('body').append('<div id="toTop"><i class="fa fa-angle-up"></i></div>');

        $(window).scroll(function () {
            if ($(this).scrollTop() !== 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        }); 

        $('#toTop').on('click',function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
    }());


    /* === Shuffle for reformation filter  === */
    (function () {
        $(window).on('load', function () {

            $('.reformation-wrap').each(function(i, e){

                var ttGrid = $(this).find('.tt-grid');
                var self = this;
                ttGrid.shuffle({
                    itemSelector: '.portfolio-item' // the selector for the items in the grid
                });

                /* reshuffle when user clicks button filter item */
                $(this).find('#filter li a').on('click',function (e) {
                    e.preventDefault();

                    // set active class
                    $(self).find('#filter li a').removeClass('active');
                    $(this).addClass('active');

                    // get group name from clicked item
                    var ttGroupName = $(this).attr('data-group');

                    // reshuffle grid
                    ttGrid.shuffle('shuffle', ttGroupName);
                });
            });
        });
    }());


    /* === Placeholder  === */
    (function(){
        $('input, textarea, email, number').placeholder();
    }());


    /* === Gallery === */
    $(window).on('load', function () {
        // The slider being synced must be initialized first
        $('.tt-gallery-wrapper').each(function(i, e){

            var ttGalleryNav = $(this).find('.tt-gallery-nav');
            var ttGalleryThumb = $(this).find('.tt-gallery-thumb');
            var ttGallery = $(this).find('.tt-gallery');

            ttGalleryThumb.flexslider({
                animation     : "slide",
                controlNav    : false,
                animationLoop : true,
                slideshow     : false,
                itemWidth     : 150,
                asNavFor      : ttGallery
            });

            ttGallery.flexslider({
                animation     : "slide",
                directionNav  : false,
                controlNav    : false,
                animationLoop : false,
                slideshow     : false,
                sync          : ttGalleryThumb
            });

            // Navigation 
            ttGalleryNav.find('.prev').on('click', function (e) {
                ttGallery.flexslider('prev')
                return false;
            });

            ttGalleryNav.find('.next').on('click', function (e) {
                ttGallery.flexslider('next')
                return false;
            });

        });

    }());


    // -------------------------------------------------------------
    // STELLAR FOR BACKGROUND SCROLLING
    // -------------------------------------------------------------

    $(window).load(function() {

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         
        }else {
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }
    });



    /* ======= Google Map ======= */
    (function () {
        if (document.getElementById('ttmap')) {
            //set your google maps parameters
            var $latitude  = $('#ttmap').attr('data-map-latitude'),
                $longitude = $('#ttmap').attr('data-map-longitude'),
                $map_zoom  = 12;
            /* ZOOM SETTING */

            //google map custom marker icon 
            var $marker_url = $('#ttmap').attr('data-map-marker');

            //we define here the style of the map
            
            var style = [{
                stylers: [{
                    "hue": "#000"
                }, {
                    "saturation": -100
                }, {
                    "gamma": 2.15
                }, {
                    "lightness": 12
                }]
            }];

            
            //set google map options
            var map_options = {
                center            : new google.maps.LatLng($latitude, $longitude),
                zoom              : $map_zoom,
                panControl        : true,
                zoomControl       : true,
                mapTypeControl    : false,
                streetViewControl : true,
                mapTypeId         : google.maps.MapTypeId.ROADMAP,
                scrollwheel       : false,
                styles            : style
            }
            //initialize the map
            var map = new google.maps.Map(document.getElementById('ttmap'), map_options);
            //add a custom marker to the map                
            var marker = new google.maps.Marker({
                position : new google.maps.LatLng($latitude, $longitude),
                map      : map,
                visible  : true,
                icon     : $marker_url
            });
        }
     
    }());

});