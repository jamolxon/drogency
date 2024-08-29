/*---------------------------------------------
Template name:  Drogency
Version:        1.0
Author:         ThemeLooks
Author url:     http://themelooks.com

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "custom.js" file for writing your custom js.
We may release future updates so it will overwrite this file. it's better and safer to use "custom.js".

[Table of Content]

01: Defaults
02: SVG Image Convert
03: Off Canvas
04: Navbar
05: Accordion
06: Isotope - Filter
07: Google Map
08: Default Owl Carousel Options
09: Preloader
10: Back To Top
11: Ajax Contact Form

----------------------------------------------*/

(function($) {
    "use strict";

    /* 01: Defaults
    ==============================================*/
    /* 1.1: Background Image */
    var $bgImg = $('[data-bg-img]');
    $bgImg.css('background-image', function () {
        return 'url("' + $(this).data('bg-img') + '")';
    }).removeAttr('data-bg-img').addClass('bg-img');

    /* 02: SVG Image Convert
    ==============================================*/
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
    
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
    
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
    
            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
    
            // Replace image with new SVG
            $img.replaceWith($svg);
    
        }, 'xml');
    
    });

    /* 03: Off Canvas
    ==============================================*/
    var $canvas = $('.bizagn--off-canvas');
    var $canol = $('.nav-ol');
    var $canclose = $('.bizagn--off-canvas-toggle');

    $canclose.on('click', function(){
        $canvas.addClass('show');
        $canol.addClass('show');
    });

    $canvas.find('.bizagn--off-canvas-close').on('click', function(){
        $canvas.removeClass('show');
        $canol.removeClass('show');
    });

    $canol.on('click', function(){
        $canvas.removeClass('show');
        $canol.removeClass('show');
    });

    /* 04: Navbar
    ==============================================*/
    var $menu = $('.bizagn--nav-menu');
    var $canvasMenu = $('.bizagn--off-canvas-menu');

    $menu.menumaker({
        title: "<i class='fa fa-bars'></i> MENU",
        breakpoint: 991,
        format: "multitoggle" 
    });
    $('.bizagn--nav-menu ul li.menu-item-has-children .submenu-button').prepend('<i class="fa fa-angle-down"></i>');

    $canvasMenu.menumaker({
        title: "",
        breakpoint: 0,
        format: "multitoggle"
    });
    $('.bizagn--off-canvas-menu ul li.menu-item-has-children .submenu-button').prepend('<i class="fa fa-angle-down"></i>');
    $('.bizagn--off-canvas-menu ul li.menu-item-has-children .sub-menu').hide();
    
    $('.bizagn--off-canvas-menu ul li.menu-item-has-children .submenu-button').on('click', function(){
    $(this).parent().children('.sub-menu').toggleClass('fadeIn animated');        
    })

    var stickyHeader = $('.sticky-header-true');

    $(window).on('scroll', function(){
        if($(window).scrollTop() > 100) {
            stickyHeader.addClass('sticky-nav bg-color fadeInDown animated');
        } else {
            stickyHeader.removeClass('sticky-nav bg-color fadeInDown animated');
        }
    })

    /* 05: Accordion
    ==============================================*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });
    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });
    $(".bizagn--faq-items .bizagn--faq-item .target-area h3").on("click", function(t) {
        $(this).parents(".bizagn--faq-item").children(".collapse").hasClass("show") && (t.stopPropagation(), t.preventDefault());
    });
    

    /* 06: Isotope - Filter
    ==============================================*/
    var $grid = $('.isotope').isotope({
        itemSelector: '.bizagn--filter-item',
    });

    $('.bizagn--project-filter-buttons').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });


    /* 07: Google Map
    ==============================================*/
    var $map = $('[data-trigger="map"]'),
    $mapOps;

    if ($map.length) {
        // Map Options
        $mapOps = $map.data('map-options');

        // Map Initialization
        window.initMap = function () {
            $map.css('min-height', '600px');
            $map.each(function () {
                var $t = $(this), map, lat, lng, zoom;

                $mapOps = $t.data('map-options');
                lat = parseFloat($mapOps.latitude, 10);
                lng = parseFloat($mapOps.longitude, 10);
                zoom = parseFloat($mapOps.zoom, 10);
                
                map = new google.maps.Map($t[0], {
                    center: { lat: lat, lng: lng },
                    zoom: zoom,
                    scrollwheel: false,
                    disableDefaultUI: true,
                    zoomControl: false,
                    styles: [
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e9e9e9"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#dedede"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        }
                    ]
                });

                map = new google.maps.Marker({
                    position: { lat: lat, lng: lng },
                    map: map,
                    animation: google.maps.Animation.DROP,
                    draggable: false
                });

            });
        };
        initMap();
    };

    /* 08: Default Owl Carousel Options 
    ==============================================*/
    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };

    var $owlCarousel = $('.owl-carousel');
    $owlCarousel.each(function () {
        var $t = $(this);
            
        $t.owlCarousel({
            items: checkData( $t.data('owl-items'), 1 ),
            margin: checkData( $t.data('owl-margin'), 0 ),
            loop: checkData( $t.data('owl-loop'), true ),
            smartSpeed: 1000,
            autoplay: checkData( $t.data('owl-autoplay'), false ),
            autoplayTimeout: checkData( $t.data('owl-speed'), 8000 ),
            center: checkData( $t.data('owl-center'), false ),
            animateIn: checkData( $t.data('owl-animate-in'), false ),
            animateOut: checkData( $t.data('owl-animate-out'), false ),
            nav: checkData( $t.data('owl-nav'), false ),
            navText: ['<i class="fa fa-angle-left"></i> Prev', 'Next <i class="fa fa-angle-right"></i>'],
            dots: checkData( $t.data('owl-dots'), false ),
            responsive: checkData( $t.data('owl-responsive'), {} ),
            mouseDrag: checkData($t.data('owl-mouse-drag'), false)
        });
    });

    /* 09: Preloader
    ==============================================*/
    $(window).on('load', function () {
        $('.preloader').fadeOut(2000);
    });

    /* 10: Back to Top
    ==============================================*/
    var $backToTopBtn = $('.back-to-top');

    if ($backToTopBtn.length) {
        var scrollTrigger = 400, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $backToTopBtn.addClass('show');
            } else {
                $backToTopBtn.removeClass('show');
            }
        };

        backToTop();

        $(window).on('scroll', function () {
            backToTop();
        });

        $backToTopBtn.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /* 11: Ajax Contact Form
    ==============================================*/
    $('.bizagn--contact-form').on('submit', 'form', function(e) {
        e.preventDefault();

        var $el = $(this);

        $.post($el.attr('action'), $el.serialize(), function(res){
            res = $.parseJSON( res );
            $el.parent('.bizagn--contact-form').find('.form-response').html('<span>' + res[1] + '</span>');
        });
    });


})(jQuery);