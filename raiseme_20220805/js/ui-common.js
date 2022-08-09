"use strict";
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
ScrollTrigger.saveStyles(".mobile, .desktop");
// JavaScript Document
var heroHeight;
var heroImgHeight;
$(document).ready(function () {
	
	$(window).on('resize',function(){
		ScrollTrigger.refresh();
		// ScrollTrigger.update();
	})
	$("body")
	$("body")
		.imagesLoaded()
		.done(function (instance) {
			console.log("image loaded!!");
			commonTween();
			init();
			headerScroll();
			navTrigger();
			
		});
	openshowcase("#showcase", "popup.html");
});
function init() {
	setTimeout(function () {
		$("#header").addClass("load");
	}, 500);
	$(".navTrigger").on("click", function () {
		// $(this).toggleClass('active');
		// $('.m-menu').toggleClass('active')
		// $('html').toggleClass('fixed')
		// $('#header').removeClass('nav-down')
		
		return false;
	});
	$(".m-menu li a").on("click", function () {
		// $(".navTrigger").removeClass("active");
		// $(".m-menu").removeClass("active");
		// $("html").removeClass("fixed");
		//return false;
	});
	// $('.tab-ui-con > *').eq(0).addClass('active')
	$(".tab-ui li button").on("click", function () {
		var indexNum = $(".tab-ui li button").index(this);
		$(".tab-ui li").removeClass("active");
		$(".tab-ui li").eq(indexNum).addClass("active");
		$(".tab-ui-con > *").removeClass("active");
		$(".tab-ui-con > *").eq(indexNum).addClass("active");
		ScrollTrigger.refresh();
		// swiper.update();
		gsap.to(window, {duration: 0.4, scrollTo: {y: ".tab-ui-con", offsetY: 150}});
		
	});
	if($('.news-tab').length >= 1){
		var topPos = $('.news-tab').offset().top
		$(window).scroll(function(){
			if ($(window).scrollTop() >= topPos - 105) {
				$('.news-tab').parent().addClass('sticky');
			}
			else {
				$('.news-tab').parent().removeClass('sticky');
			}
		});
	}
	

	ScrollTrigger.matchMedia({
		"(min-width:851px)": function () {
			var ran = gsap.timeline().to(".obj-move", {
				x: "random(-30, 30)",
				y: "random(-30, 30)",
				scale: "random(0.9, 1)",
				duration: 3,
				ease: "none",
				repeat: -1,
				repeatRefresh: true,
			});
		},
		"(max-width:850px)": function () {
			var ran = gsap.timeline().to(".obj-move", {
				x: "random(-10, 10)",
				y: "random(-10, 10)",
				scale: "random(0.9, 1)",
				duration: 3,
				ease: "none",
				repeat: -1,
				repeatRefresh: true,
			});
		},
	});

	const videos = gsap.utils.toArray(".video-block video");
	videos.forEach(function (video, i) {
		ScrollTrigger.create({
			trigger: video,
			scroller: "body",
			start: "30% center",
			end: "120% 0%",
			// markers: true,
			onEnter: () => video.play(),
			onEnterBack: () => video.play(),
			onLeave: () => video.pause(),
			onLeaveBack: () => video.pause(),
		});
	});
}
function headerScroll() {
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $("#header").outerHeight();
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
		if (Math.abs(lastScrollTop - st) <= delta) return;

		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down

			$("header").removeClass("nav-down").addClass("nav-up");
		} else {
			// Scroll Up
			if (st + $(window).height() < $(document).height()) {
				$("header").removeClass("nav-up").addClass("nav-down");
			}
		}
		lastScrollTop = st;
		if (st <= 10) {
			$("header").addClass("nav-default");
		} else {
			$("header").removeClass("nav-default");
		}
	}
}
function tab() {
	$(window).scroll(function(){
		if ($(window).scrollTop() >= 300) {
			$('news-tab').addClass('sticky');
		}
		else {
			$('news-tab').removeClass('sticky');
		}
	});
}
function commonTween() {
	$(".fade").each(function (e) {
		let text = $(this);
		const upmotion = gsap.timeline({
			scrollTrigger: {
				trigger: $(this),
				start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
				end: "0% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
				// scrub: true, //스크롤에 반응 (없으면 자동재생)
				// markers: true,
				toggleActions: "play complete none none",
			},
		});
		upmotion.to(text, 2, {
			opacity: 1,
			//            ease: "power3.out",
			onComplete: function () {},
		});
	});
	$(".slide-down").each(function (e) {
		let text = $(this);
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
			onComplete: function () {},
		});
	});
	$(".slide-up, .sub-title").each(function (e) {
		let text = $(this).wrapInner('<div class="over-text-con"></div>');
		let target = text.find(".over-text-con");
		gsap.set(target, {
			y: 100,
			opacity: 0,
		});
		const upmotion = gsap.timeline({
			scrollTrigger: {
				trigger: $(this),
				start: "top 85%", // 앞 : 객체 , 뒤 : 페이지 전체
				end: "top 0%", // 앞 : 객체 , 뒤 : 페이지 전체
				//scrub: true, //스크롤에 반응 (없으면 자동재생)
				//markers: true,
				toggleActions: "play none none reverse",
			},
		});
		upmotion.to($(this), 0, {
			opacity: 1,
		});
		upmotion.to(target, 1, {
			y: 0,
			opacity: 1,
			ease: "power3.out",
		});
	});
	ScrollTrigger.matchMedia({
		"(min-width:851px)": function () {
			$(".left-slide").each(function (e) {
				let text = $(this);
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
					x: "-200px",
					opacity: 0,
					onComplete: function () {},
				});
				leftMotion.to(text, 1, {
					x: "0",
					opacity: 1,
					ease: "power3.out",
				});
			});
		},
		"(max-width:850px)": function () {
			$(".left-slide").each(function (e) {
				let text = $(this);
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
					x: "-200px",
					opacity: 0,
					onComplete: function () {},
				});
				leftMotion.to(text, 1, {
					x: "0",
					opacity: 1,
					ease: "power3.out",
				});
			});
		},
	});
	ScrollTrigger.matchMedia({
		"(min-width:851px)": function () {
			$(".right-slide").each(function (e) {
				let text = $(this);
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
					x: "200px",
					opacity: 0,
					onComplete: function () {},
				});
				leftMotion.to(text, 1, {
					x: "0",
					opacity: 1,
					ease: "power3.out",
				});
			});
		},
		"(max-width:850px)": function () {
			$(".right-slide").each(function (e) {
				let text = $(this);
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
					x: "200px",
					opacity: 0,
					onComplete: function () {},
				});
				leftMotion.to(text, 1, {
					x: "0",
					opacity: 1,
					ease: "power3.out",
				});
			});
		},
	});

	$(".over-text-wrap").each(function (e) {
		$(this).find(" > *").addClass("over-text").wrapInner('<span class="over-text-con"></span>');
		let text = $(this).find(".over-text-con");
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
			onComplete: function () {},
		});
	});
	$(".up-slide-stagger > *").each(function (e) {
		var stagger = $(this);
		gsap.from(stagger, 0.5, {
			scrollTrigger: {
				trigger: $(this),
				start: "-=85 85%", // 앞 : 객체 , 뒤 : 페이지 전체
				end: "top 0%", // 앞 : 객체 , 뒤 : 페이지 전체
				// scrub: true, //스크롤에 반응 (없으면 자동재생)
				// markers: true,
				toggleActions: "play none none reverse",
			},
			y: 80,
			opacity: 0,
			stagger: 0.1,
			ease: "power1.out",
		});
	});
}

function mobileProxy() {
	ScrollTrigger.matchMedia({
		"(min-width:769px)": function () {
			//pc
		},
		"(max-width:768px)": function () {},
	});
}

function navTrigger() {
	$(".navTrigger").on("click", function () {
		// $(this).toggleClass('active');
		// $('.m-menu').toggleClass('active')
		// $('html').toggleClass('fixed')
		// $('#header').removeClass('nav-down')
		$("html").toggleClass("fixed");
		$(this).toggleClass("active");
		$(".m-menu").toggleClass("active");
		$("#header").removeClass("nav-down");
		if ($(".m-menu").hasClass("active")) {
			gsap.set($(".m-menu li"), {
				x: "-50%",
				opacity: 0,
			});
			gsap.to($(".m-menu li"), 0.4, {
				stagger: 0.1,
				delay: 0.2,
				x: 0,
				opacity: 1,
				ease: "Power1.easeOut",
			});
		}
	});
}

function openLayer(selector, href) {
	var flag = selector,
		target = href;
	flag = $(flag);
	flag.load(href, function () {
		$(this).show();
		$(this).find(".modal").show().addClass("scroll");
		$(".overlay").show();
		//        $('body').css('overflow','hidden');
	});
	//    $('body').addClass('scroll')
	return false;
}
function openshowcase(selector, href) {
	var flag = selector,
		flag = $(flag);
	flag.load(href, function () {});
	return false;
}

function closeLayer(no) {
	var no = no;
	if (no) {
		$("#popup" + no)
			.removeClass("show")
			.hide()
			.removeAttr("style");
	} else {
		$(".popup-wrap").empty();
		$(".popup-wrap").removeAttr("style").hide();
		$(".overlay").hide().removeAttr("style");
		//        $('body').css('overflow','').removeAttr('style');
	}
	//    $('body').removeClass('fixed')
}

function openModal(number) {
	$(".overlay").show();
	$(".modal-inside" + "." + number).show();
	return false;
}

function closeModal(no) {
	$(".overlay").hide();
	$(".modal-inside").hide();
}


