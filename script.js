/*---------------------------------------------------------------------
    File Name: script.js
    BuggedOut404 - STEM Education Website
---------------------------------------------------------------------*/

$(function () {
    "use strict";

    /* Preloader */
    $(window).on('load', function() {
        $('.loader_bg').fadeOut('slow');
    });

    /* Smooth Scrolling */
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });

    /* Tooltip */
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* Scroll to Top */
    $(window).on('scroll', function (){
        var scroll = $(window).scrollTop();
        if (scroll >= 100){
            $("#back-to-top").addClass('show');
        } else {
            $("#back-to-top").removeClass('show');
        }
    });
    
    $("#back-to-top").on("click", function(e){
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
    });

    /* Fade in animation on scroll */
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    });

    /* Active navigation */
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
        $('nav ul li a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position() && refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos) {
                $('nav ul li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    });

    /* Counter Animation */
    function animateCounter() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.text().replace(/[^0-9]/g, '');
            var suffix = $this.text().replace(/[0-9]/g, '');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum) + suffix);
                },
                complete: function() {
                    $this.text(this.countNum + suffix);
                }
            });
        });
    }

    /* Trigger counter animation when stats section is visible */
    var statsAnimated = false;
    $(window).on('scroll', function() {
        var statsSection = $('.stats-section');
        if (statsSection.length) {
            var elementTop = statsSection.offset().top;
            var elementBottom = elementTop + statsSection.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom && !statsAnimated) {
                animateCounter();
                statsAnimated = true;
            }
        }
    });

    /* Mobile Menu Toggle */
    $('.navbar-toggler').click(function() {
        $('.navbar-collapse').toggleClass('show');
    });

    /* Card hover effects */
    $('.card').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
        }
    );

    /* Initialize fade-in elements */
    $('.fade-in').each(function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            $(this).addClass('visible');
        }
    });

    /* Form validation (if contact form is added) */
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        var isValid = true;

        // Reset previous error states
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').hide();

        // Validate name
        if (name.trim() === '') {
            $('#name').addClass('is-invalid');
            $('#name').next('.invalid-feedback').show();
            isValid = false;
        }

        // Validate email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '' || !emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            $('#email').next('.invalid-feedback').show();
            isValid = false;
        }

        // Validate message
        if (message.trim() === '') {
            $('#message').addClass('is-invalid');
            $('#message').next('.invalid-feedback').show();
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });

    /* Parallax effect for banner */
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var parallax = $('.fullwidth-banner');
        var speed = 0.5;
        
        parallax.css('background-position', 'center ' + (scrolled * speed) + 'px');
    });

    /* Navbar background change on scroll */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    /* Lazy loading for images */
    $('img').each(function() {
        var $img = $(this);
        var src = $img.attr('src');
        
        $img.on('load', function() {
            $img.addClass('loaded');
        });
        
        if ($img[0].complete) {
            $img.addClass('loaded');
        }
    });
});
