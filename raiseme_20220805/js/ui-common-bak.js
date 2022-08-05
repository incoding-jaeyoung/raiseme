'use strict';
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(".mobile, .desktop");
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
    ScrollTrigger.matchMedia({
        "(min-width:851px)": function () {
            var ran = gsap.timeline ()
            .to('.obj-move',{
                x: "random(-30, 30)", 
                y: "random(-30, 30)",
                scale: "random(0.9, 1)",
                duration:3,
                ease:"none",
                repeat:-1,
                repeatRefresh:true 
            })
        },
        "(max-width:850px)": function () {
            var ran = gsap.timeline ()
            .to('.obj-move',{
                x: "random(-10, 10)", 
                y: "random(-10, 10)",
                scale: "random(0.9, 1)",
                duration:3,
                ease:"none",
                repeat:-1,
                repeatRefresh:true 
            })
        },
    })
    
    const videos = gsap.utils.toArray('.video-block video')
    videos.forEach(function(video, i) {
        ScrollTrigger.create({
            trigger: video,
            scroller: 'body',
            start: '20% center',
            end: 'bottom center',
            //markers: true,
            onEnter: () => video.play(),
            onEnterBack: () => video.play(),
            onLeave: () => video.pause(),
            onLeaveBack: () => video.pause(),
        });
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
    $('.fade').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                markers: true,
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
    $('.slide-up, .sub-title').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0px 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                markers: true,
                toggleActions: "play pause pause reverse",
            },
        });
        gsap.set(text, {
            y: 80,
            opacity: 0,
            onComplete: function () {

            }
        })
        upmotion.to(text, 1, {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    ScrollTrigger.matchMedia({
        "(min-width:851px)": function () {
            $('.left-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '-200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
        "(max-width:850px)": function () {
            $('.left-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '-200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
    })
    ScrollTrigger.matchMedia({
        "(min-width:851px)": function () {
            $('.right-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
        "(max-width:850px)": function () {
            $('.right-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
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