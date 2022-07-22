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

	$(".popup__loading").css("height", windoH2 - (popH3 + popH4 + popF2));
}

function popupOpen() {
	$(".popup__btn-open").on("click", function () {
		$("#popup0").removeClass("off");
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
			$("#popup2 .popup__cont section").css("min-height", "54rem");
		} else if (trNum == "1") {
			$(".popup__cont section").addClass("off");
			$("." + POPIX).removeClass("off");
			$(".popup__btn-next").addClass("off");
			$(this).next().removeClass("off");
			$(".popup__foot-btn").hide();
			$(".popup__foot-graph").show();
			$(".popup__quick").hide();
			$(".popup__head-txt").show();
			$("#popup2 .popup__cont section").css("min-height", "54rem");
		} else if (trNum == "2") {
			$(".popup__cont section").addClass("off");
			$("." + POPIX).removeClass("off");
			$(".popup__btn-next").addClass("off");
			$(this).next().removeClass("off");
			$(".popup__foot-btn").show();
			$(".popup__foot-graph").hide();
			$(".popup__quick").hide();
			$(".popup__head-txt").hide();
			$("#popup2 .popup__cont section").css("min-height", "51.4rem");
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
			$("#popup2 .popup__cont section").css("min-height", "54rem");
		}
	});
}
function popupClose() {
	$(".popup__btn-close,.popup__dim").on("click", function () {
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
		$("#popup2 .popup__cont section").css("min-height", "54rem");
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
		var selectTxt = $(this).text();
		var selectNum = $(this).prevAll().length;
		$(".popup__select ul").slideUp();
		$(".popup__select > p").text(selectTxt);
		$(".popup__wrap").addClass("off");
		$(".popup__wrap#popup" + selectNum).removeClass("off");
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
		$("#popup2 .popup__cont section").css("min-height", "54rem");
	});
}
