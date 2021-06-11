svg4everybody(); //for svg spite in ie
objectFitImages();

let $body,
    wWidth = 0,
    wHeight = 0,
    W_SM = 576,
    W_MD = 768,
    W_LG = 992,
    W_XL = 1200,
    LOADER_HTML =
        '<div class="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';

$(document).ready(function () {
    $body = $("body");
    
    wWidth =  $(window).width();

    $(window).on('resize', function() {
      wWidth =  $(window).width();
    });

    formScript();
    othersScript();
    tabs();
    topNav();
    headerSearch();
    mobileMenu();
    mainPage();
    eventPage();

    carrier();
    hr();


    function formScript () {

        $('[type=tel]').mask('+7 (000) 000-00-00');

        Parsley
            .addValidator('ruPhone', {
                // string | number | integer | date | regexp | boolean
                requirementType: 'string',

                // validateString | validateDate | validateMultiple
                validateString: function (value, requirement) {
                    let regexp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                    
                    return  regexp.test(value) 
                },

                messages: {
                    ru: 'Неверный формат номера',
                    en: 'Invalid number format'
                }
            })
            .addValidator('personName', {
                // string | number | integer | date | regexp | boolean
                requirementType: 'string',

                // validateString | validateDate | validateMultiple
                validateString: function (value, requirement) {
                    let regexp = /^[а-яА-ЯёЁa-zA-Z\ ]+$/;

                    return  regexp.test(value) 
                },

                messages: {
                  ru: 'Используйте только буквы',
                  en: 'Use only letters'
                }
            })
            .addMessages('ru', {
                defaultMessage: "Некорректное значение.",
                type: {
                    email:        "Введите правильный е-mail",
                    url:          "Введите URL адрес",
                    number:       "Введите число",
                    integer:      "Введите целое число",
                    digits:       "Введите только цифры",
                    alphanum:     "Введите буквенно-цифровое значение"
                },
                notblank:       "Это поле должно быть заполнено",
                required:       "Поле обязательно для заполнения",
                pattern:        "Это значение некорректно",
                min:            "Это значение должно быть не менее чем %s",
                max:            "Это значение должно быть не более чем %s",
                range:          "Это значение должно быть от %s до %s",
                minlength:      "Это значение должно содержать не менее %s символов",
                maxlength:      "Это значение должно содержать не более %s символов",
                length:         "Это значение должно содержать от %s до %s символов",
                mincheck:       "Выберите не менее %s значений",
                maxcheck:       "Выберите не более %s значений",
                check:          "Выберите от %s до %s значений",
                equalto:        "Это значение должно совпадать"
            })
            .setLocale('ru');

        $('.js-validate').parsley({

        });

        $body.on('change', '.js-file-simple', function() {
            let input = $(this),
                wrap = input.closest('.file-input'),
                label = wrap.find('.file-input__label'),
                placeholderText = input.attr('placeholder');

            let file = input[0].files[0]; 
                

            if ( input.val() != '') {
                label.text(file.name);
            } 
            else {
                label.text(placeholderText);
            }
        });


        $body.on('focusin', '.input-text input, .input-text textarea', function() {
            let input = $(this),
                wrap = input.closest('.input-text');

            wrap.addClass('input-text--dirty');
        });

        $body.on('focusout', '.input-text input, .input-text textarea', function() {
            let input = $(this),
                wrap = input.closest('.input-text');

            wrap.toggleClass('input-text--dirty', input.val() !== '');
        });

        $('.input-text input, .input-text textarea').each(function() {
            let input = $(this),
                wrap = input.closest('.input-text');

            wrap.toggleClass('input-text--dirty', input.val() !== '')
        });

    }

    function othersScript() {
        $body.on('click touch', '[data-go-link]', function (e) {
            e.preventDefault();
            window.open($(this).data('go-link'));
        });

        $('.back-to-top').click(function(event) {
            $('body,html').animate({scrollTop:0},300);
          });
        
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
        
            if ( scrollTop > 300 ) {
              $('.back-to-top').addClass('show');
            } else {
              $('.back-to-top').removeClass('show');
            };
        
        });

        $.fancybox.defaults.hash = false;
        $('.js-popup').fancybox({});

        $body.on('click touch', '.js-video-popup', function(e) {
            e.preventDefault();

            let href = $(this).attr('href');

            $.fancybox.open({
                src  : href,
                // type : 'inline',
                opts : {
                    youtube : {
                        // controls : 0,
                        showinfo : 0
                    },
                    vimeo : {
                        color : 'c7000b'
                    }
                }
            });
        });


        $body.on('click touch', '.js-form-resset', function(e) {
            let form = $(this).closest('form');

            form.removeClass('is-form-sent');
            window.globalOptions.formResset(form);
        });

        $body.on('click touch', '.slick-slide [data-fancybox]', function(e) {
            e.preventDefault();
            window.globalOptions.galleryOpen($(this));           
        });

        $body.on('click touch', '.js-cookies-msg-close', function(e) {
            e.preventDefault();
            $('.cookies-msg').hide();
        });
        
        $body.on('click touch', '.footer-nav__title', function(e) {
            let $this = $(this);
            
            if ( wWidth < window.globalOptions.sizes['md'] ) {
                $this.closest('.footer-nav').find('.footer-nav__list').slideToggle(300);
            }
            
        });


        let toggleSlideOpening = false;
        $body.on('click touch', '.js-toggle-slide', function(e) {
            if ( toggleSlideOpening ) { return false }

            let trigger = $(this),
                target = $(trigger.data('target'));

            if ( target.length > 0 ) {
                e.preventDefault();

                toggleSlideOpening = true;

                target.slideToggle(300, function() {
                    trigger.toggleClass('is-open', target.is(':visible'));
                });
            } else {
                console.log('Target not find')
            }

            setTimeout(function() {
                toggleSlideOpening = false;
                
            }, 200)
            
        });

        toggleTextHeight ();
        function toggleTextHeight () {
            let toggleTextOpening = false,
                toggleResizeTimeout = false;

            $body.on('click touch', '.js-toggle-text', function(e) {
                if ( toggleTextOpening ) { return false }
    
                let trigger = $(this),
                    target = $(trigger.data('target')),
                    isOpen = target.hasClass('is-open')
                    ;
    
                if ( target.length > 0 ) {
                    e.preventDefault();
                    toggleTextOpening = true;
    
                    if ( isOpen ) {
                        trigger
                            .removeClass('is-open')
                            .find('.js-toggle-text-label')
                                .text(trigger.data('label-open'));
    
                        target.removeClass('is-open');
                    } else {
                        trigger
                            .addClass('is-open')
                            .find('.js-toggle-text-label')
                                .text(trigger.data('label-close'));
    
                        target.addClass('is-open');
                    }
                    
                } else {
                    console.log('Target not find')
                }
    
                setTimeout(function() {
                    toggleTextOpening = false;
                    
                }, 200)
                
            });
            
            $('.js-toggle-text').each(function(e) {
                heightCheck($(this));
            });

            
            $(window).on('resize', function() {
                if ( toggleResizeTimeout ) {
                    clearTimeout(toggleResizeTimeout);
                }

                toggleResizeTimeout = setTimeout(function() {
                    $('.js-toggle-text').each(function(e) {
                        heightCheck($(this));
                    });
                }, 200);
            });

            $body.on('click touch', '.who-us-tabs__tab', function(e) {
                let interval = 0;
                
                interval = setInterval(function() {
                    let targetButton = $('.who-us-tabs__content-wrapper.is-active .js-toggle-text');
        
                    if ( targetButton.length > 0 ) {
                        heightCheck(targetButton);
                    }
                }, 50)
    
                setTimeout(function() {
                    if (interval) {
                        clearInterval(interval)
                    }
                }, 500)
         
            });
            

            function heightCheck(triggerButton) {
    
                let trigger = triggerButton,
                    maxHeight = +trigger.data('max-height'),
                    target = $(trigger.data('target'));


                if ( trigger.hasClass('is-open') ) {
                    return
                }

                if ( target.length > 0 ) {
                    console.log(target.get(0).scrollHeight, maxHeight);
                    if ( ( target.get(0).scrollHeight - maxHeight ) > 30) {
                        trigger.closest('.toggle-text-button-wrap').addClass('is-show');
                        target.removeClass('is-open');
                    } else {
                        target.closest('.toggle-text-button-wrap').removeClass('is-show');
                        target.addClass('is-open');
                    }
                } else {
                    console.log('Target not find')
                }
            }
        };


        $('.s-news').each(function() {
            let wrap = $(this),
                slider = wrap.find('.js-section-news-slider'),
                nextBtn = wrap.find('.js-items-slider-next'),
                prevBtn = wrap.find('.js-items-slider-prev');
            
            slider.on('init', function(event, slick, direction){
                wrap.addClass('is-slider-init')
                console.log('edge was hit')
            });

            slider.slick({
                // centerMode: true,
                // variableWidth: true,
                infinite: false,
                adaptiveHeight: false,
                nextArrow: nextBtn,
                prevArrow: prevBtn,
                slidesToShow: 5,
                slidesToScroll: 5,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: window.globalOptions.sizes.lg,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        }
                    },
                    {
                        breakpoint: window.globalOptions.sizes.md,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: window.globalOptions.sizes.sm,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    }
                    ,
                    {
                        breakpoint: window.globalOptions.sizes.xs,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            }); 
        
            
        });


    }

    
    function tabs() {
        $(document).on('click', '[data-tab-target]', function (e) {
            e.preventDefault();

            let $this = $(this);
        
            $this.addClass('is-active').siblings().removeClass('is-active');
        
            var targetTab = $(this).data('tab-target'),
                tab = $(document).find('[data-tab="' + targetTab + '"]'),
                tabGroup = tab.data('tab-group');
        
                
            $(document).find('.is-active[data-tab-group="' + tabGroup + '"]').addClass('is-proccess');

            setTimeout(function() {
                $(document).find('[data-tab-group="' + tabGroup + '"]').hide().removeClass('is-active').removeClass('is-proccess');
                // tab.addClass('is-active');
                
                tab.show(0, function () {
                  $(this).addClass('is-active');
                });
            }, 300)

        
        });
    }

    
    function topNav() {
        let opening = false,
            transitionTime = 300,
            linksOpenClass = 'is-open-top-links',
            languagesOpenClass = 'is-open-choice-language',
            timeoutLinks,
            timeoutLanguage;

        $body.on('click touch', '.js-top-links-trigger', function (e) {
            e.preventDefault();

            if ( opening ) {
                return 
            }
        
            opening = true;

            $('.languages').slideUp(transitionTime, function() {
                $body.removeClass(languagesOpenClass);
            });
           
            if ($body.hasClass(linksOpenClass)) {
                $body.removeClass(linksOpenClass);

                if ( wWidth >= window.globalOptions.sizes['lg'] ) {
                    $('.top-links').slideUp(transitionTime);
                }
            } else {
                $body.addClass(linksOpenClass);

                if ( wWidth >= window.globalOptions.sizes['lg'] ) {
                    $('.top-links').slideDown(transitionTime);
                }
            }
         
            if ( timeoutLinks ) {
                clearTimeout(timeoutLinks)
            }

            timeoutLinks = setTimeout(function() {
                opening = false;
            }, transitionTime)

        });

        $body.on('click touch', '.js-top-language-trigger', function (e) {
            e.preventDefault();

            console.log(opening);
            if ( opening ) {
                return 
            }
        
            opening = true;

            $('.top-links').slideUp(transitionTime, function() {
                $body.removeClass(linksOpenClass);
            });
           
            if ($body.hasClass(languagesOpenClass)) {
                $body.removeClass(languagesOpenClass);
               
                if ( wWidth > window.globalOptions.sizes['lg'] ) {
                    $('.languages').slideUp(transitionTime);
                }
            } else {
                $body.addClass(languagesOpenClass);

                if ( wWidth > window.globalOptions.sizes['lg'] ) {
                    $('.languages').slideDown(transitionTime);
                }
            }
         
            if ( timeoutLanguage ) {
                clearTimeout(timeoutLanguage)
            }

            timeoutLanguage = setTimeout(function() {
                opening = false;
            }, transitionTime)

        });
    }

    function headerSearch() {
        let opening = false,
            transitionTime = 300,
            openClass = 'is-open-header-search',
            timeout;

        $body.on('click touch', '.js-header-search-trigger', function (e) {
            e.preventDefault();

            if ( opening ) {
                return 
            }
        
            opening = true;

            $body.toggleClass(openClass);
        
            if ( timeout ) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(function() {
                opening = false;
            }, transitionTime)

        });

        $body.on('click touch', function (event) {
            var obj = $(event.target);
        
            if ( $body.hasClass(openClass) 
                && !obj.closest('.header-search-form').length 
                && !obj.closest('.js-header-search-trigger').length 
                && !obj.hasClass('js-header-search-trigger')
                ) {
                $body.removeClass(openClass);
            }
        });
    }

    function mobileMenu () {
        let mobileNav = $('.mobile-menu'),
            mobileNavIsOpen = mobileNav.hasClass('is-open'),
            openClass = 'is-mobile-menu-open',
            opening = false,
            transitionTime = 300,
            timeout;

        $body.on('click touch', '.js-mobile-menu-trigger', function (e) {
            e.preventDefault();
            console.log(opening);

            navToggle();
        });


        function navToggle() {
            console.log(opening);
            if ( opening ) {
                return 
            }
        
            opening = true;

            mobileNavIsOpen = mobileNav.hasClass('is-open');

            mobileNav.toggleClass('is-open', !mobileNavIsOpen);

            $body
                .removeClass('is-open-choice-language')
                .removeClass('is-open-top-links');



            if (!mobileNavIsOpen) {
                window.globalOptions.freeze(true); //true is scroll to top page
                $body.toggleClass(openClass, true);
            }
        
            if ( timeout ) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(function() {
                mobileNavIsOpen = mobileNav.hasClass('is-open');

                if (!mobileNavIsOpen) {
                    $body.toggleClass(openClass, false);
                    window.globalOptions.unfreeze();


                }
                opening = false;
            }, transitionTime)
        };       
    }

    function mainPage() {
        (function() {
            var $block = document.querySelector('.slider-test');
    
            if ($block) {
                var $sliderEl = $block.querySelector('.swiper-container'),
                    $pagination = $block.querySelector('.swiper-pagination'),
                    $buttonNext = $block.querySelector('.swiper-button-next'),
                    $buttonPrev = $block.querySelector('.swiper-button-prev');
                new Swiper($sliderEl, {
                    speed: 2000,
                    loop: true,
                    pagination: {
                        el: $pagination,
                        clickable: true
                    },
                    navigation: {
                        nextEl: $buttonNext,
                        prevEl: $buttonPrev
                    }
                });
            }
        }());
    
        (function() {
    
            var $block = document.querySelector('.news-activity__news-lists');
    
            if ($block) {
                var $sliderEl = $block.querySelector('.swiper-container'),
                    $pagination = $block.querySelector('.swiper-pagination'),
                    $buttonNext = $block.querySelector('.swiper-button-next'),
                    $buttonPrev = $block.querySelector('.swiper-button-prev');
                new Swiper($sliderEl, {
                    speed: 500,
                    loop: true,
                    spaceBetween: 50,
                    pagination: {
                        el: $pagination,
                        clickable: true
                    },
                    navigation: {
                        nextEl: $buttonNext,
                        prevEl: $buttonPrev
                    }
                });
            }
        }());
    
        (function() {
    
            $block = document.querySelector('.news-activity__facebook-list');
    
            if ($block) {
                var _$sliderEl = $block.querySelector('.swiper-container'),
                    _$pagination = $block.querySelector('.swiper-pagination'),
                    _$buttonNext = $block.querySelector('.swiper-button-next'),
                    _$buttonPrev = $block.querySelector('.swiper-button-prev');
    
                new Swiper(_$sliderEl, {
                    speed: 500,
                    loop: true,
                    pagination: {
                        el: _$pagination,
                        clickable: true
                    },
                    navigation: {
                        nextEl: _$buttonNext,
                        prevEl: _$buttonPrev
                    }
                });
            }
        }());
    
    
        (function() {
    
            var $block = document.querySelector('.section-about__blocks-slider');
    
            if ($block) {
                var $sliderEl = $block.querySelector('.swiper-container'),
                    $pagination = $block.querySelector('.swiper-pagination'),
                    $buttonNext = $block.querySelector('.swiper-button-next'),
                    $buttonPrev = $block.querySelector('.swiper-button-prev');
                new Swiper($sliderEl, {
                    speed: 500,
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: $pagination,
                        clickable: true
                    },
                    navigation: {
                        nextEl: $buttonNext,
                        prevEl: $buttonPrev
                    }
                });
            }
        }());
    
        (function() {
            var $block = document.querySelector('.slider-banner-header-banners');
    
            if ($block) {
                var $sliderEl = $block.querySelector('.swiper-container'),
                    $pagination = $block.querySelector('.swiper-pagination'),
                    $buttonNext = $block.querySelector('.swiper-button-next'),
                    $buttonPrev = $block.querySelector('.swiper-button-prev');
                new Swiper($sliderEl, {
                    speed: 500,
                    loop: true,
                    autoplay: {
                        delay: 8500,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: $pagination,
                        type: 'fraction',
                        formatFractionCurrent: function formatFractionCurrent(num) {
                            return num < 10 ? "0" + num : num;
                        },
                        formatFractionTotal: function formatFractionTotal(num) {
                            return num < 10 ? "0" + num : num;
                        },
                        renderFraction: function renderFraction(currentClass, totalClass) {
                            return "<span class=\"" + currentClass + "\"></span>" + "&nbsp;\u2014&nbsp;" + ("<span class=\"" + totalClass + "\"></span>");
                        }
                    },
                    navigation: {
                        nextEl: $buttonNext,
                        prevEl: $buttonPrev
                    }
                });
            }
        }());
    
        (function() {
    
            $block = document.querySelector('.slider-banner-section-banners');
    
            if ($block) {
                var _$sliderEl = $block.querySelector('.swiper-container'),
                    _$pagination = $block.querySelector('.swiper-pagination'),
                    _$buttonNext = $block.querySelector('.swiper-button-next'),
                    _$buttonPrev = $block.querySelector('.swiper-button-prev');
    
                new Swiper(_$sliderEl, {
                    speed: 500,
                    loop: true,
                    pagination: {
                        el: _$pagination,
                        type: 'fraction',
                        formatFractionCurrent: function formatFractionCurrent(num) {
                            return num < 10 ? "0" + num : num;
                        },
                        formatFractionTotal: function formatFractionTotal(num) {
                            return num < 10 ? "0" + num : num;
                        },
                        renderFraction: function renderFraction(currentClass, totalClass) {
                            return "<span class=\"" + currentClass + "\"></span>" + "&nbsp;\u2014&nbsp;" + ("<span class=\"" + totalClass + "\"></span>");
                        }
                    },
                    navigation: {
                        nextEl: _$buttonNext,
                        prevEl: _$buttonPrev
                    }
                });
            }
        }());

        
        $('.s-main-banners').each(function() {
            let wrap = $(this),
                slider = wrap.find('.js-main-banners-slider'),
                nextBtn = wrap.find('.js-items-slider-next'),
                prevBtn = wrap.find('.js-items-slider-prev');
            
            slider.on('init', function(event, slick, direction){
                wrap.addClass('is-slider-init')
            });


            slider.slick({
                adaptiveHeight: false,
                nextArrow: nextBtn,
                prevArrow: prevBtn,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                autoplay: true,
                autoplaySpeed: 4000,
                infinite: true,
                touchThreshold: 5,
            }); 
        
            
        });

        if ( $('.s-main-consumer').length > 0 ) {
            consumerBlock();
        }
        function consumerBlock() {

            let rellax = new Rellax('.s-main-consumer .js-rellax', {
                center: true,
            });

            setTimeout(function() {
                rellaxRefresh();
            }, 2000)


            $('.js-main-consumer-slider').each(function() {
                let slider = $(this);

                if ( slider.find('.s-main-consumer__slider-item').length < 2 ) {
                    return
                }

                slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    rellaxRefresh();
                });

                slider.slick({
                    adaptiveHeight: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                    prevArrow: '<button class="btn-arrow-2 btn-arrow-2--left" href="#"><svg class="svg-icon svg-icon-arrow-left-slider"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 36"><path d="M19 1L2 18l17 17"/></svg></button>',
                    nextArrow: '<button class="btn-arrow-2 btn-arrow-2--right" href="#"><svg class="svg-icon svg-icon-arrow-right-slider" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 36"><path d="M1 1l17 17L1 35"/></svg></button>',
                    // autoplay: true,
                    // autoplaySpeed: 4000,
                    infinite: true,
                    fade: true,
                    touchThreshold: 5,


                    responsive: [
                        {
                            breakpoint: window.globalOptions.sizes.md,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: false,
                            }
                        },
                    ]
                }); 
          
                
            });

            function rellaxRefresh() {
                try {
                    rellax.refresh();
                } catch(e) {
                    console.error(e)
                }
            }
        
        }


        if ( $('.s-main-hddc').length > 0 ) {
            hddcBlock();
        }
        function hddcBlock() {

            if ( window.globalOptions.sizes.xs < wWidth ) {
                var ns2 = $(".s-main-hddc__group-scroll").niceScroll({
                    cursorwidth: '5px',
                    cursorborderradius: '10px',
                    cursorborder: 'none',
                    cursorcolor: '#DCDDDD',
                    autohidemode: false,
                    background: '#F5F5F5',
                    railoffset: true,
                    railpadding: { top: 0, right: -3, left: 0, bottom: 0 },
                    horizrailenabled: false,
                    nativeparentscrolling: true,
                });
            } 
            // else  {
            //     var ns1 = $(".s-main-hddc__group").niceScroll({
            //         cursorwidth: '5px',
            //         cursorborderradius: '10px',
            //         cursorborder: 'none',
            //         cursorcolor: '#DCDDDD',
            //         autohidemode: false,
            //         background: '#F5F5F5',
            //         railoffset: true,
            //         railpadding: { top: 0, right: 5, left: 0, bottom: 0 },
            //         horizrailenabled: true,
            //         grabcursorenabled:false
            //     });
            // }
           
           

            
        }
    }


    function carrier() {
        (function() {
            var $block = document.querySelector('.carrier-banners');
    
            if ($block) {
                var $sliderEl = $block.querySelector('.swiper-container'),
                    $pagination = $block.querySelector('.swiper-pagination'),
                    $buttonNext = $block.querySelector('.swiper-button-next'),
                    $buttonPrev = $block.querySelector('.swiper-button-prev');
                new Swiper($sliderEl, {
                    speed: 500,
                    loop: true,
                    autoplay: {
                        delay: 8500,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: $pagination,
                        type: 'fraction',
                        formatFractionCurrent: function formatFractionCurrent(num) {
                            return num < 10 ? "0" + num : num;
                        },
                        formatFractionTotal: function formatFractionTotal(num) {
                            return num < 10 ? "0" + num : num;
                        },
                        renderFraction: function renderFraction(currentClass, totalClass) {
                            return "<span class=\"" + currentClass + "\"></span>" + "&nbsp;\u2014&nbsp;" + ("<span class=\"" + totalClass + "\"></span>");
                        }
                    },
                    navigation: {
                        nextEl: $buttonNext,
                        prevEl: $buttonPrev
                    }
                });
            }
        }());


        $('.cr-global-news').each(function() {
            let wrap = $(this),
                slider = wrap.find('.js-cr-global-news-slider'),
                nextBtn = wrap.find('.js-items-slider-next'),
                prevBtn = wrap.find('.js-items-slider-prev'),
                resizeTimeout = false;

            sliderInit()
            


            $(window).on('resize', function() {
                if ( resizeTimeout ) {
                    clearTimeout(resizeTimeout);
                }

                resizeTimeout = setTimeout(function() {
                    sliderInit()
                }, 200);
            });

            if ( wrap.find('.cr-global-news__slider-item').length > 4 ) {
                wrap.addClass('is-items-hide')
            }

            wrap.find('.js-cr-global-news-more-btn').on('click', function(e) {
                e.preventDefault();

                // wrap.find('.cr-global-news__slider-item:not(:visible)').slideDown(500);
                wrap.removeClass('is-items-hide')
            });
            
            function sliderInit() {
                if ( slider.hasClass('slick-initialized') ) return

                slider.slick({
                    // centerMode: true,
                    // variableWidth: true,
                    infinite: false,
                    adaptiveHeight: false,
                    nextArrow: nextBtn,
                    prevArrow: prevBtn,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: window.globalOptions.sizes.lg,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                            }
                        },
                        {
                            breakpoint: window.globalOptions.sizes.md,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: window.globalOptions.sizes.sm,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        }
                        ,
                        {
                            breakpoint: window.globalOptions.sizes.xs,
                            settings: 'unslick'
                        }
                    ]
                }); 
            }
            
        });



        $('.s-fn5g-news-items').each(function() {
            let wrap = $(this),
                slider = wrap.find('.js-s-fn5g-news-slider'),
                nextBtn = wrap.find('.js-slider-next'),
                prevBtn = wrap.find('.js-slider-prev'),
                resizeTimeout = false;

            sliderInit()
            


            $(window).on('resize', function() {
                if ( resizeTimeout ) {
                    clearTimeout(resizeTimeout);
                }

                resizeTimeout = setTimeout(function() {
                    sliderInit()
                }, 200);
            });

            if ( wrap.find('.s-fn5g-news-items__slider-item').length > 3 ) {
                wrap.addClass('is-items-hide')
            }

            wrap.find('.js-s-fn5g-news-more-btn').on('click', function(e) {
                e.preventDefault();

                // wrap.find('.cr-global-news__slider-item:not(:visible)').slideDown(500);
                wrap.removeClass('is-items-hide')
            });
            
            function sliderInit() {
                if ( slider.hasClass('slick-initialized') ) return
                

                slider.slick({
                // centerMode: true,
                // variableWidth: true,
                infinite: false,
                adaptiveHeight: false,
                nextArrow: nextBtn,
                prevArrow: prevBtn,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: window.globalOptions.sizes.lg,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: window.globalOptions.sizes.md,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    },
                    {
                        breakpoint: window.globalOptions.sizes.sm,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    }
                    ,
                    {
                        breakpoint: window.globalOptions.sizes.xs,
                        settings: 'unslick'
                    }
                ]
            }); 
            }   
        });

        $body.on('click touch', '.s-fn5g-news__tab', function(e) {
            if ( wWidth < window.globalOptions.sizes.xs ) return

            let interval = 0;
            
            interval = setInterval(function() {
                let targetSlider = $('.s-fn5g-news__content-wrapper.is-active .js-s-fn5g-news-slider');
    
                if ( targetSlider.hasClass('slick-initialized') ) {
                    targetSlider[0].slick.refresh()
                }
            }, 50)

            setTimeout(function() {
                if (interval) {
                    clearInterval(interval)
                }
            }, 500)
        });


        $('.s-fn5g-first').each(function() {
            let wrap = $(this),
                slider = wrap.find('.js-s-fn5g-first-slider'),
                nextBtn = wrap.find('.js-slider-next'),
                prevBtn = wrap.find('.js-slider-prev'),
                resizeTimeout = 0
                ;
            
            slider.on('init', function(){
                wrap.addClass('is-slider-init')                
            });

            wrap.find('.s-fn5g-first__nav-item').on('click touch', function(e) {
                e.preventDefault();

                let slideIndex = $(this).index();

                slider.slick('slickGoTo', slideIndex);
            })
            
            slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                wrap.find('.s-fn5g-first__nav-item').removeClass('is-current')
                    .eq(nextSlide).addClass('is-current')
            });
            
            sliderInit ();

            $(window).on('resize', function() {
                if ( resizeTimeout ) {
                    clearTimeout(resizeTimeout);
                }

                resizeTimeout = setTimeout(function() {
                    sliderInit();
                }, 100);
            });

            function sliderInit () {

                if ( window.globalOptions.sizes.xs < wWidth ) {
                    if (slider.hasClass('slick-initialized')) {
                        slider.slick('unslick');
                    }
                } else if (!slider.hasClass('slick-initialized')) {

                    slider.slick({
                        // centerMode: true,
                        // variableWidth: true,
                        dots: false,
                        arrows: false,
                        infinite: false,
                        adaptiveHeight: false,
                        nextArrow: nextBtn,
                        prevArrow: prevBtn,

                        // slidesToShow: 1,
                        // slidesToScroll: 1,
                        centerMode: true,
                        variableWidth: true,
                        
                        // autoplay: true,
                        autoplaySpeed: 5000,
                    }); 
                }
                
            }
                
        });

    }

    function hr() {

        $('.s-hr-values').each(function() {
            let wrap = $(this),
                slider = wrap.find('.js-s-hr-values-slider'),
                nextBtn = wrap.find('.js-slider-next'),
                prevBtn = wrap.find('.js-slider-prev'),
                resizeTimeout = 0
                ;
            
            slider.on('init', function(){
                wrap.addClass('is-slider-init')                
            });
            
            sliderInit ();

            $(window).on('resize', function() {
                if ( resizeTimeout ) {
                    clearTimeout(resizeTimeout);
                }

                resizeTimeout = setTimeout(function() {
                    sliderInit();
                }, 100);
            });

            function sliderInit () {

                if ( window.globalOptions.sizes.xs < wWidth ) {
                    if (slider.hasClass('slick-initialized')) {
                        slider.slick('unslick');
                    }
                } else if (!slider.hasClass('slick-initialized')) {

                    slider.slick({
                        dots: false,
                        arrows: true,
                        infinite: false,
                        adaptiveHeight: false,
                        nextArrow: nextBtn,
                        prevArrow: prevBtn,

                        slidesToShow: 1,
                        slidesToScroll: 1,
                        
                    }); 
                }
                
            }
                
        });

        $('.js-hr-review-popup').fancybox({
            type: 'ajax'
        });
        
        $('.s-hr-reviews').each(function() {
            let wrap = $(this),
                slider = wrap.find('.js-s-hr-reviews-slider'),
                nextBtn = wrap.find('.js-slider-next'),
                prevBtn = wrap.find('.js-slider-prev'),
                resizeTimeout = 0
                ;
            
            slider.on('init', function(){
                wrap.addClass('is-slider-init')                
            });
            
            sliderInit ();


            function sliderInit () {
                if (!slider.hasClass('slick-initialized')) {
                    slider.slick({
                        dots: false,
                        arrows: true,
                        infinite: false,
                        adaptiveHeight: false,
                        nextArrow: nextBtn,
                        prevArrow: prevBtn,

                        slidesToShow: 2,
                        slidesToScroll: 1,
                        responsive: [
                            {
                                breakpoint: window.globalOptions.sizes.md,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    vertical: true
                                }
                            },
                            {
                                breakpoint: window.globalOptions.sizes.xs,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    vertical: false
                                }
                            },
                        ]
                        
                    }); 
                }
                
            }
                
        });

    }

    function eventPage() {
        
    }
});

window.globalOptions = {
    animationDuration: 200,
    sizes: {
        xl: 1920,
        lg: 1200,
        md: 992,
        sm: 768,
        xs: 576
    },

    freeze: function(scrollTop) {
        const h = $('html');

        if (h.css('position') !== 'fixed') {
            const top = scrollTop ? 0 : h.scrollTop() ? h.scrollTop() : $body.scrollTop();

            if (window.innerWidth > h.width()) {
                h.css('overflow-y', 'scroll');
            }

            h.css({
                width: '100%',
                position: 'fixed',
                top: -top,
            });
        }
    },

    unfreeze: function() {
        const h = $('html');

        if (h.css('position') === 'fixed') {
            h.css('position', 'static');

            $('html, body').scrollTop(-parseInt(h.css('top'), 10));

            h.css({
                position: '',
                width: '',
                top: '',
                'overflow-y': '',
            });
        }
    },

    scrollToId: function(href, delay) {
        let scrollOnMenuBtn = false,
            scrollOnHeaderHide = false,
            scrollSpeed = 800;


        if ( href == '#interior' 
            || href == '#magazines'
        ) {
            scrollOnMenuBtn = true;
        }


        setTimeout(function() {
            scrollTo();
        }, delay)

        function scrollTo() {

            let targetOffset = $(href).offset().top;

            // if ( wWidth >= W_MD && scrollOnMenuBtn ) {
            //     targetOffset -= $('.side-nav__trigger-icon-line--1').offset().top - $('.header').offset().top;
            // } else if (wWidth < W_MD && !scrollOnHeaderHide) {
            //     targetOffset -= $('.header').outerHeight();
            // }

            try {
                scrollSpeed = Math.abs($window.scrollTop() - targetOffset) / Math.abs($body[0].scrollHeight) * 4000
            } catch(event) {
                console.error(event);
            }

            scrollSpeed = ( scrollSpeed < 500 ) ? 500 : scrollSpeed;
     
            $('html, body').animate({ scrollTop: targetOffset }, scrollSpeed);

            location.replace(href);
            
        }
    },

    headerMenuClose: function() {
        $('.header-menu').removeClass('is-open');
        $body.removeClass('header-menu-open');
        this.unfreeze();
    },

    formResset: function(form) {
        if ( !form.length ) {
            return
        }
    
        $('.input-text', form).each(function() {
            let input = $(this),
                wrap = input.closest('.input-text');
    
            input.val('').trigger('input');
    
            wrap.toggleClass('input-text--dirty', input.val() != '');
        });
    
        form.parsley().reset();
    
    },
    
    galleryOpen: function(item) {
        let clickItem = item,
            selector = '[data-fancybox=' + clickItem.data('fancybox') + ']';
    
        let imagesArr = [];

        $(selector).filter(function(index, item) {
            let currentItem = $(item);

            if (currentItem.is(clickItem)) {
                imagesArr.unshift(currentItem.attr('href'))
            } else if (!currentItem.closest('.slick-slide').hasClass('slick-cloned')) {
                imagesArr.push(currentItem.attr('href'))
            }

        });

        let fancyboxArr = [];
        
        imagesArr.forEach(function(item) {
            let obj = {};

            obj.src = item;

            fancyboxArr.push(obj);
        });

        $.fancybox.open(
            fancyboxArr,
            {
                type : 'image'
            }
        );
    },

    succeedMsg: function(text) {
        $.fancybox.open('<div class="popup-msg text"><p>' + text + '</p></div>');

        setTimeout(function() {
            $.fancybox.close();
        }, 8000)
    }
    
    
};

