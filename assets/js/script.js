(function($) {

	"use strict";


    /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".mobail-menu .open-btn");
        var xbutton = $(".mobail-menu .navbar-toggler");

        openBtn.on("click", function(e) {
            e.stopImmediatePropagation();
            navbar.toggleClass("slideInn");
            xbutton.toggleClass("x-close");
            return false;
        })
    }

    toggleMobileNavigation();


    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
                $this.toggleClass("rotate");
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();

    $("body").on("click", function() {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function() {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function() {
        $('.open-btn').removeClass('x-close');
    });


    $('.wpo-payment-select .addToggle').on('click', function(){
        $('.payment-name').addClass('active')
        $('.wpo-payment-option').removeClass('active')
    })
    
    $('.wpo-payment-select .removeToggle').on('click', function(){
        $('.wpo-payment-option').addClass('active')
        $('.payment-name').removeClass('active')
    });



    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    // HERO SLIDER
    var menu = [];
    jQuery('.swiper-slide').each( function(index){
        menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },

            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },

            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });





    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();



            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        =  VIDEO
    -------------------------------------------*/
  if ($(".video-btn").length) {
  $(".video-btn").on("click", function (e) {
    e.preventDefault();

    var $btn = $(this);
    var $overlay = $btn.closest(".video-overlay");
    var $holder = $overlay.closest(".video-holder");
    var $video = $holder.find("video");
    var videoEl = $video.get(0);
    var src = $btn.data("video");

    if (src && $video.find("source").attr("src") !== src) {
      $video.find("source").attr("src", src);
      videoEl.load();
    }

    $overlay.hide(); // hide overlay with poster and play button
    videoEl.play();  // play inline

    // No resizing or DOM layout shift occurs because container is stable
  });
}

    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    // masonryGridSetting();


      /*------------------------------------------
        = FUNFACT
    -------------------------------------------*/
    if ($(".odometer").length) {
        $('.odometer').appear();
        $(document.body).on('appear', '.odometer', function(e) {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }



    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.wpo-site-header .navigation').length) {
        cloneNavForSticyMenu($('.wpo-site-header .navigation'), "sticky-header");
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.wpo-site-header .navigation');

        if ($(window).scrollTop() > 1000) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.removeClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;


    }



/*------------------------------------------
        = Header search toggle
    -------------------------------------------*/
    if($(".header-search-form-wrapper").length) {
        var searchToggleBtn = $(".search-toggle-btn");
        var searchToggleBtnIcon = $(".search-toggle-btn i");
        var searchContent = $(".header-search-form");
        var body = $("body");

        searchToggleBtn.on("click", function(e) {
            searchContent.toggleClass("header-search-content-toggle");
            searchToggleBtnIcon.toggleClass("fi flaticon-search fi ti-close");
            e.stopPropagation();
        });

        body.on("click", function() {
            searchContent.removeClass("header-search-content-toggle");
        }).find(searchContent).on("click", function(e) {
            e.stopPropagation();
        });
    }


    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".wpo-happy-client-slide").length) {
        $(".wpo-happy-client-slide").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 0,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav: false,
            items:5,
            responsive: {
                0 : {
                    items: 3
                },

                500 : {
                    items: 3
                },

                768 : {
                    items: 3,
                },

                1200 : {
                    items: 4
                },

                1400 : {
                    items: 5
                },

            }
        });
    }



    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".team-slider").length) {
        $(".team-slider").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 20,
            loop:true,
            center:true,
            autoplayHoverPause:true,
            dots: false,
            nav: false,
            responsive: {
                0 : {
                    items: 1
                },

                500 : {
                    items: 1
                },

                768 : {
                    items: 2,
                },

                1200 : {
                    items: 3
                },

                1400 : {
                    items: 4
                },

            }
        });
    }
    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".testimonial-slider").length) {
        $(".testimonial-slider").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 100,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav: true,
            navText: ['<i class="fi flaticon-left-arrow"></i>','<i class="fi flaticon-right-arrow"></i>'],
            items:2,
            responsive: {
                0 : {
                    items: 1,
                },

                767 : {
                    items: 2
                },
                1200 : {
                    items: 2
                },
                1300 : {
                    items: 2
                },

                1400 : {
                    items: 2,
                },
                1500 : {
                    items: 2
                },

            }
        });
    }

    /*------------------------------------------
        = Testimonial SLIDER S2
    -------------------------------------------*/
    if ($(".testimonial-slider-s2").length) {
        $(".testimonial-slider-s2").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav: true,
            navText: ['<i class="fi flaticon-left-arrow"></i>','<i class="fi flaticon-right-arrow"></i>'],
            items:2,
            responsive: {
                0 : {
                    items: 1,
                },

                767 : {
                    items: 2
                },
                1200 : {
                    items: 2
                },
                1300 : {
                    items: 2
                },

                1400 : {
                    items: 2,
                },
                1500 : {
                    items: 3
                },

            }
        });
    }

    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".partners-slider").length) {
        $(".partners-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav:false,
            responsive: {
                0 : {
                    items: 2
                },

                550 : {
                    items: 3
                },

                992 : {
                    items: 4
                },

                1200 : {
                    items: 6
                }
            }
        });
    }
    /*------------------------------------------
        = Gallery SLIDER
    -------------------------------------------*/
    if ($(".gallery-active").length) {
        $(".gallery-active").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 0,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav:false,
            responsive: {
                0 : {
                    items: 1
                },

                550 : {
                    items: 2
                },

                992 : {
                    items: 2
                },

                1200 : {
                    items: 3
                },
                1400 : {
                    items: 4
                }
            }
        });
    }





    /*------------------------------------------
        = POST SLIDER
    -------------------------------------------*/
    if($(".post-slider".length)) {
        $(".post-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed: 500,
            margin: 30,
            loop:true,
            nav: true,
            navText: ['<i class="fi ti-arrow-left"></i>','<i class="fi ti-arrow-right"></i>'],
            dots: false,
            items: 1
        });
    }



     /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form-main").length) {
        $("#contact-form-main").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",
                
                subject: {
                    required: true
                }


            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                subject: "Please select your contact subject"
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail-contact.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }



    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();
            
            sortingGallery();

            toggleMobileNavigation();

            smallNavFunctionality();
        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

		if ($(".wpo-site-header").length) {
           stickyMenu( $('.wpo-site-header .navigation'), "sticky-on" );
        }

        toggleBackToTopBtn();

    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        toggleClassForSmallNav();
        //smallNavFunctionality();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));
    });




    // login

    $(".reveal6").on('click', function() {
        var $pwd = $(".pwd6");
        if ($pwd.attr('type') === 'text') {
            $pwd.attr('type', 'password');
        } else {
            $pwd.attr('type', 'text');
        }
    });


    $(".reveal3").on('click', function() {
        var $pwd = $(".pwd2");
        if ($pwd.attr('type') === 'text') {
            $pwd.attr('type', 'password');
        } else {
            $pwd.attr('type', 'text');
        }
    });

    $(".reveal2").on('click', function() {
        var $pwd = $(".pwd3");
        if ($pwd.attr('type') === 'text') {
            $pwd.attr('type', 'password');
        } else {
            $pwd.attr('type', 'text');
        }
    });



})(window.jQuery);
