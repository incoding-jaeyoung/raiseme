$(document).ready(function () {
	$(".popup__foot-btn").hide();
	$(".popup__foot-graph").show();

	var windoW = $(window).width();
	resizeUI($(this).width());
	$(window).resize(function () {
		resizeUI($(this).width());
	});
	popupOpen();
	popupNext();
	popupClose();
	selectBOX();
});
var x = 0;
function reset() {
	clearInterval(x);
	time = 59;
	$(".i-time").html("01:00");

	$(".btn-start").removeClass("playing");
	$(".btn-share").removeClass("active");
}
function timer() {
	time = 59; //기준시간 작성
	min = ""; //분
	sec = ""; //초

	//setInterval(함수, 시간) : 주기적인 실행
	x = setInterval(function () {
		//parseInt() : 정수를 반환
		min = parseInt(time / 60); //몫을 계산
		sec = time % 60; //나머지를 계산

		$(".i-time").html(min + ":" + ("00" + sec).slice(-2) + "");
		time--;

		//타임아웃 시
		if (time < 0) {
			clearInterval(x); //setInterval() 실행을 끝냄

			$(".btn-start").removeClass("playing");
			$(".popup__cont section").addClass("off");
			$(".popupCont2").removeClass("off");
			$(".popup__btn-next").addClass("off");
			$(".popup__foot-btn").hide();
			$(".popup__foot-graph").show();
			$(".popup__quick").hide();
			$(".popup__head-txt").show();
			// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
			setTimeout(function () {
				$(".popup__cont section").addClass("off");
				$(".popupCont3").removeClass("off");
				$(".popup__btn-next").addClass("off");
				$(".popup__foot-btn").show();
				$(".popup__foot-graph").hide();
				$(".popup__quick").hide();
				$(".popup__head-txt").hide();
				// $("#popup2 .popup__cont section").css("min-height", "51.4rem");
			}, 1000);
		}
	}, 1000);
}
function resizeUI(width) {
	width = parseInt(width);
	if (width < 900) {
		var windoH = $(".popup__wrap").height();
		var popH1 = $(".popup__select-box").outerHeight();
		var popH2 = $(".popup__head-txt").outerHeight();
		var popF = $(".popup__foot").outerHeight();
		$(".popup__cont section").css("height", windoH - (popH1 + popH2 + popF));
		$(".popup__cont section.popupCont3").css("height", windoH - (popH1 + popF));
	} else {
		$(".popup__cont section").css("height", "auto");
	}
	var windoH2 = $(".popup__wrap-box").height();
	var popH3 = $(".popup__select-box").outerHeight();
	var popH4 = $(".popup__head-txt").outerHeight();
	var popF2 = $(".popup__foot").outerHeight();

	//$(".popup__loading").css("height", windoH2 - (popH3 + popH4 + popF2));
}

function popupOpen() {
	$(".popup__btn-open").on("click", function () {
		$("#popupAgree").removeClass("off");
		$(".popup__dim").removeClass("off");
		$(".popup__control").removeClass("off");
	});
}
function popupNext() {
	$(".popup__quick").find(".popup__quick-foot").hide();
	$(".popup__btn-next").on("click", function () {
		var POPIX = $(this).attr("name");
		var trNum = $(this).prevAll().length;
		if (trNum == "0") {
			$(".video-bg1").hide();
			$(".popup__cont-time").find(".popup__btn-basic").text("종료");
			$(".popup__btn-next").addClass("off");
			$(this).next().removeClass("off");
			$(".popup__quick").show();
			$(".popup__head-txt").show();
			$(".popup__quick").find(".popup__quick-foot").show();
			// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
		} else if (trNum == "1") {
			$(".popup__cont section").addClass("off");
			$("." + POPIX).removeClass("off");
			$(".popup__btn-next").addClass("off");
			$(this).next().removeClass("off");
			$(".popup__foot-btn").hide();
			$(".popup__foot-graph").show();
			$(".popup__quick").hide();
			$(".popup__head-txt").show();
			// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
		} else if (trNum == "2") {
			$(".popup__cont section").addClass("off");
			$("." + POPIX).removeClass("off");
			$(".popup__btn-next").addClass("off");
			$(this).next().removeClass("off");
			$(".popup__foot-btn").show();
			$(".popup__foot-graph").hide();
			$(".popup__quick").hide();
			$(".popup__head-txt").hide();
			// $("#popup2 .popup__cont section").css("min-height", "51.4rem");
		} else if (trNum == "3") {
			$(".video-bg1").show();
			$(".popup__cont section").addClass("off");
			$(".popup__cont-time").find(".popup__btn-basic").text("시작");
			$("." + POPIX).removeClass("off");
			$(".popup__btn-next").addClass("off");
			$(".popup__btn-next").eq(0).removeClass("off");
			$(".popup__foot-btn").hide();
			$(".popup__foot-graph").show();
			$(".popup__quick").show();
			$(".popup__head-txt").show();
			$(".popup__quick").find(".popup__quick-foot").hide();
			// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
		}
	});
}
function popupClose() {
	$(".popup__btn-close,.popup__dim, #popupAgree .popup-footer .back").on("click", function () {
		reset();
		$(".popup__wrap").addClass("off");
		$(".popup__dim").addClass("off");
		$(".popup__control").addClass("off");
		$(".popup__btn-next").addClass("off");
		$(".popup__btn-next").eq(0).removeClass("off");
		$(".popup__cont section").addClass("off");
		$(".popup__cont .popupCont1").removeClass("off");
		$(".popup__cont-time").find(".popup__btn-basic").text("시작");
		$(".video-bg1").show();
		$(".popup__head-txt").show();
		$(".popup__foot-btn").hide();
		$(".popup__foot-graph").show();
		$(".popup__quick").show();
		$(".popup__quick").find(".popup__quick-foot").hide();
		// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
	});
}
function selectBOX() {
	$(".popup__select > p").on("click", function () {
		var selectSub = $(this).next("ul");
		if (selectSub.is(":visible")) {
			selectSub.slideUp();
		} else {
			selectSub.slideDown();
		}
	});
	$(".popup__select > ul > li").on("click", function () {
		reset();
		var selectTxt = $(this).text();
		var selectNum = $(this).prevAll().length;
		$(".popup__select ul").slideUp();
		$(".popup__wrap").addClass("off");
		$(".popup__wrap#popup" + selectNum + "Intro").removeClass("off");
		$(".popup__btn-next").addClass("off");
		$(".popup__btn-next").eq(0).removeClass("off");
		$(".popup__cont section").addClass("off");
		$(".popup__cont .popupCont1").removeClass("off");
		$(".popup__cont-time").find(".popup__btn-basic").text("시작");
		$(".video-bg1").show();
		$(".popup__head-txt").show();
		$(".popup__foot-btn").hide();
		$(".popup__foot-graph").show();
		$(".popup__quick").show();
		$(".popup__quick").find(".popup__quick-foot").hide();
		// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
	});
}

$(document).ready(function () {
	$(document).on("click", ".btn-start", function () {
		if ($(this).hasClass("playing")) {
			// 종료버튼
			reset();
			$(".popup__cont section").addClass("off");
			$(".popupCont2").removeClass("off");
			$(".popup__btn-next").addClass("off");
			$(".popup__foot-btn").hide();
			$(".popup__foot-graph").hide();
			$(".popup__quick").hide();
			$(".popup__head-txt").show();
			// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
			setTimeout(function () {
				$(".popup__cont section").addClass("off");
				$(".popupCont3").removeClass("off");
				$(".popup__btn-next").addClass("off");
				$(".popup__foot-btn").show();
				$(".popup__foot-graph").hide();
				$(".popup__quick").hide();
				$(".popup__head-txt").hide();
				// $("#popup2 .popup__cont section").css("min-height", "51.4rem");
			}, 2000);
		} else {
			// 시작버튼
			$(this).addClass("playing");
			timer();
			$(".video-bg1").hide();
			$(".popup__cont-time").find(".popup__btn-basic").text("종료");
			$(".popup__btn-next").addClass("off");
			$(".popup__quick").show();
			$(".popup__head-txt").show();
			$(".popup__quick").find(".popup__quick-foot").show();
			// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
		}
	});
	$(document).on("click", ".btn-restart", function () {
		reset();
		$(".video-bg1").show();
		$(".popup__cont section").addClass("off");
		$(".popup__cont-time").find(".popup__btn-basic").text("시작");
		$(".popupCont1").removeClass("off");
		$(".popup__btn-next").addClass("off");
		$(".popup__btn-next").eq(0).removeClass("off");
		$(".popup__foot-btn").hide();
		$(".popup__foot-graph").show();
		$(".popup__quick").show();
		$(".popup__head-txt").show();
		$(".popup__quick").find(".popup__quick-foot").hide();
		// $("#popup2 .popup__cont section").css("min-height", "61.2rem");
	});
	var copytooltip = false;
	$(document).on("click", ".btn-share", function () {
		$(this).toggleClass("active");
		// if (copytooltip === false) {
		// 	copytooltip = true;
		// 	$(this).toggleClass("active");
		// 	setTimeout(() => {
		// 		$(this).removeClass("active");
		// 		copytooltip = false;
		// 	}, 2000);
		// }
	});
	$(".policy-wrap input").change(function(){    
			if($("#chk1").prop("checked") === true && $("#chk2").prop("checked") === true && $("#chk3").prop("checked") === true){
				$("#popupAgree .popup-footer .next").removeClass("disabled")
			}else {
				$("#popupAgree .popup-footer .next").addClass("disabled")
			}
	});
		
});
