'use strict';
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// JavaScript Document
var heroHeight;
var heroImgHeight;
$(document).ready(function () {
    $('body').imagesLoaded().done(function (instance) {
        console.log('image loaded!!')
        init();
        headerScroll();
        commonTween()
    });
});
function init() {
    setTimeout(function(){
        $('#header').addClass('load')
    },500)
    $('.navTrigger').on('click',function(){
        $(this).toggleClass('active');
        $('.m-menu').toggleClass('active')
        //$('body').toggleClass('fixed')
        return false;
    })
    $('.m-menu li a').on('click',function(){
        $('.navTrigger').removeClass('active');
        $('.m-menu').removeClass('active')
    })
    $('.tab-ui li button').on('click',function(){
        var indexNum = $('.tab-ui li button').index(this)
        $('.tab-ui li').removeClass('active')
        $('.tab-ui li').eq(indexNum).addClass('active')
        $('.tab-ui-con > *').removeClass('active')
        $('.tab-ui-con > *').eq(indexNum).addClass('active')
        console.log(indexNum)
    })
}
function headerScroll() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();
    console.log(navbarHeight)
    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
            
        }
    }, 0);

    function hasScrolled() {
        var st = $(window).scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
        if (st <= 10) {
            $('header').addClass('nav-default')
        } else {
            $('header').removeClass('nav-default')
        }
    }
}
function commonTween() {
    var tl = gsap.timeline();
    gsap.to($(".section-story-01 .dao-copy"), 2, {
        // scrollTrigger: {
        //     trigger: $('.section-story-01'),
        //     start: "100% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
        //     end: "100% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
        //     markers: true,
        //     toggleActions: "play pause reverse pause",
        //     // scrub: 1,
        //     //                    pin:true,
        // },
        opacity:1,
        delay:0.5
    })
    gsap.from(".section-story-01 .dao-copy img", 1, {
        x:'100',
        delay:0.5
    })
    gsap.to(".section-story-01 .dao-world img.earth-story", 1, {
        opacity:1,
        y:0,
    })
    
    gsap.from($(".cha-img .img-b"), {
        scrollTrigger: {
            trigger: $(this),
            start: "100% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "100% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
            //markers: true,
            toggleActions: "play pause reverse pause",
            scrub: 1,
            //                    pin:true,
        },
        x:-200,
    })
    gsap.from($(".cha-img .img-f"), {
        scrollTrigger: {
            trigger: $(this),
            start: "100% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "100% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
            //markers: true,
            toggleActions: "play pause reverse pause",
            scrub: 1,
            //                    pin:true,
        },
        x:200,
    })

    $('.fade, .sub-title').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.to(text, 1, {
            opacity: 1,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-down').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.from(text, 1, {
            y: -50,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-up, h2.title ,.text').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "restart none none none",
            },
        });
        upmotion.from(text, 1, {
            y: 80,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.left-slide').each(function (e) {
        gsap.from($(this), 2.5, {
            x: '100px',
            opacity: 0,
            scrollTrigger: {
                trigger: $(this),
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 20%", // 앞 : 객체 , 뒤 : 페이지 전체
                stagger: 0.3,
                //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                toggleActions: "play none reverse none",
            },
            ease: 'Expo.easeOut'
        })
    })
    $('.over-text-wrap').each(function (e) {
        $(this).find(' > *').addClass('over-text').wrapInner('<span class="over-text-con"></span>')
        let text = $(this).find('.over-text-con')
        const textmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        textmotion.to(text, 0.5, {
            y: 0,
            stagger: 0.3,
            opacity: 1,
            //            ease: "power2.inOut",
            onComplete: function () {

            }
        })
    })
    $('.up-slide-stagger').each(function (e) {
        var stagger = $('.up-slide-stagger').find('> *')
        gsap.from(stagger, 0.5, {
            y: 80,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: $(this),
                toggleActions: "restart none none none",
            },
            ease: 'power1.out'
        })
    })

}

function mobileProxy() {
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            //pc
        },
        "(max-width:768px)": function () {
            ScrollTrigger.defaults({
                scroller: "#wrapper",
            });
//            ScrollTrigger.config({
//                autoRefreshEvents: "visibilitychange, DOMContentLoaded, load",
//            });

        },

    })
}





function navTrigger() {
    $('.navTrigger, .m-gnb .page-scroll a').on('click', function () {
        $('body').toggleClass('fixed');
        $(this).toggleClass('active');
        $('.m-gnb').toggleClass('active')
        if ($('.m-gnb').hasClass('active')) {
            $('header').addClass('mob-head-fixed')
            gsap.to($('.m-gnb'), 0.2, {
                x: 0,
            })
            gsap.to($('.m-gnb dl > *'), 0.4, {
                stagger: 0.1,
                delay: 0.2,
                y: 0,
                opacity: 1,
            })
        } else {
            $('header').removeClass('mob-head-fixed')
			$('.navTrigger, .m-gnb').removeClass('active')
            gsap.to($('.m-gnb'), 0.2, {
                x: "-100%",
                onComplete: function () {
                    gsap.to($('.m-gnb dl > *'), 0.2, {
                        y: 20,
                        opacity: 0,
                    })
                }
            })
        }
    });
}



function openLayer(selector, href) {
    var flag = selector,
        target = href;
    flag = $(flag);
    flag.load(href, function () {
        $(this).show();
        $(this).find('.modal').show().addClass('scroll')
        $('.overlay').show();
        //        $('body').css('overflow','hidden');
    });
    //    $('body').addClass('scroll')
    return false;
}

function closeLayer(no) {
    var no = no;
    if (no) {
        $('#popup' + no).removeClass('show').hide().removeAttr('style');
    } else {
        $('.popup-wrap').empty()
        $('.popup-wrap').removeAttr('style').hide();
        $('.overlay').hide().removeAttr('style');
        //        $('body').css('overflow','').removeAttr('style');
    }
    //    $('body').removeClass('fixed')
}

function openModal(number) {
    $('.overlay').show();
    $('.modal-inside' + '.' + number).show();
    return false;
}

function closeModal(no) {
    $('.overlay').hide();
    $('.modal-inside').hide();
}






function batteryInfo() {
    gsap.to(".section-02 #battery-animation", 1.5, {
        y: -200,
        scrollTrigger: {
            trigger: ".section-02 .battery-detial ul",
            start: "80px 80%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "80px 80%", // 앞 : 객체 , 뒤 : 페이지 전체
            //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
            //                        markers: true,
            toggleActions: "play none reverse none",

        },
        ease: 'power4.out'
    })
    $('.up-slide').each(function (e) {
        gsap.from($(this), 1, {
            y: 80,
            opacity: 0,
            scrollTrigger: {
                trigger: $(this),
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                toggleActions: "play none reverse none",
            },
            ease: 'power1.out'
        })
    })
    
    //    $('.section-04 ul li').each(function (e) {
    const batteryInfoani = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-03 .battery-info",
            start: "0% 40%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "0% 40%", // 앞 : 객체 , 뒤 : 페이지 전체
            //                scrub:1, //스크롤에 반응 (없으면 자동재생)
            //                    markers: true,
            //                    pin:".section-01",
            //                    pinSpacing:false,
            toggleActions: "play none reverse none",
        },
    });
    batteryInfoani.from('.section-03 ul li .line', 0.5, {
            transform: 'scaleX(0)',
            stagger: 0.2,
            ease: 'power4.out'
        }, 'info')
        .from('.section-03 ul li dl', 0.5, {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power4.out'
        }, 'info+=0.2')
    //    })

    $('.battery-charge').hover(function () {
        gsap.to(".battery-charge .charge span", 0.1, {
            opacity: 1,
            stagger: 0.02,
            ease: 'power2.out'
        })
    }, function () {
        var tl = gsap.timeline();
        tl.to(".battery-charge .charge span", 0, {
                opacity: 1,
                ease: 'power2.out'
            })
            .to(".battery-charge .charge span", 0.2, {
                delay: 0.2,
                opacity: 0,
                ease: 'power2.out'
            })
    })
    

    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            //pc
            const benefit = gsap.timeline({
                scrollTrigger: {
                    trigger: '.side-image',
                    start: "50% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: "50% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                    //                    markers: true,
                    toggleActions: "play none reverse none",
                },
            });
            benefit.from($('.side-image .right img'), 0.5, {
                    x: '100%',
                    ease: 'power1.out',
                }, 'battery')
                .from($('.side-image .left img'), 0.5, {
                    x: '-100%',
                    ease: 'power1.out',
                }, 'battery')
                .to($('.ess-benefit').find('> *'), 0.5, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power1.out'
                })
        },
        "(max-width:768px)": function () {
            //mobile
            const benefit = gsap.timeline({
                scrollTrigger: {
                    trigger: '.side-image',
                    start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                    //                    markers: true,
                    toggleActions: "play none reverse none",
                },
            });
            benefit.from($('.side-image .right img'), 0.5, {
                    x: '100%',
                    ease: 'power1.out',
                }, 'battery')
                .from($('.side-image .left img'), 0.5, {
                    x: '-100%',
                    ease: 'power1.out',
                }, 'battery')
                .to($('.ess-benefit').find('> *'), 0.5, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power1.out'
                })
        },

    })


    gsap.to(".section-05 .number", 1, {
        scrollTrigger: {
            trigger: ".section-05 .number",
            start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "100% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
            //          scrub: 1, //스크롤에 반응 (없으면 자동재생)
            //          markers: true,
            toggleActions: "play none reverse none",

        },
        onStart: function () {
            counter()
        },
        scale: 1,
        opacity: 1,
    })

}

function counter() {
    var counter = {
        var: 0
    };
    var tal = document.getElementById("cx1");

    TweenMax.to(counter, 3, {
        var: 1000000,
        onUpdate: function () {
            tal.innerHTML = numberWithCommas(Math.ceil(counter.var));
        },
        ease: 'Power4.easeOut'
    });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}