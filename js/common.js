//nav_11 選單 ===========================
$(function () {
	let bNav11Active = false;
	let $btnNavSwitch = $(".btn_nav_11_switch");
	let $nav = $(".nav_11");
	
	//選單開關
	$btnNavSwitch.on("click", function () {
		if (bNav11Active === false) {
			$btnNavSwitch.addClass("active");
			$("body").css({ overflow: "hidden" });
			$nav.fadeIn(500, function () {
				bNav11Active = true;
			});
		} else {
			$btnNavSwitch.removeClass("active");
			$("body").css({ overflow: "auto" });
			$nav.fadeOut(300, function () {
				bNav11Active = false;
			});
		}
	});
});


//goToTop 模組
$(function(){
	let $win = $(window);
	let $body = $("html, body");
	let $goToTop = $(".goToTop");
	let iPointA = 600; //600出現

	$win.on("scroll", function(){
		requestAnimationFrame(()=>{
			($win.scrollTop() > iPointA) ? $goToTop.addClass("active") : $goToTop.removeClass("active");
		});
	});

	$goToTop.on("click", function(){
		$body.animate({scrollTop:0}, 1000);
	});
});

// scrollTrack 進度條 模組
$(function () {
	$(window).on("scroll resize", function () {
		requestAnimationFrame(function () {
			var totalScroll = $("body").innerHeight() - $(window).innerHeight(); //全部滾動的距離
			var progressScroll = $(window).scrollTop(); //已滾
			var percent = progressScroll / totalScroll; //滾動比例
			$(".scrollTrack .inner").css({ width: `${percent * 100}%` });
		});
	}).trigger("scroll");
});

//scroll_fly 飛機
$(function () {
	//片段 對應兩個 range值。 
	// fnRangeScale(輸入val, 輸入[min, max],  輸出[min, max]); 
	// 例如 0~100 對應 0~360deg 色相  fnRangeScale(53, [0,100],  [0,360]);
	function fnRangeScale(inVal, inRange, outRange) {
		// 值超出範圍
		if (inVal < inRange[0] || inVal > inRange[1])  return NaN; 
		var inSize = inRange[1] - inRange[0],
			outSize = outRange[1] - outRange[0],
			adjSize = inVal - inRange[0];
		return (adjSize * outSize / inSize) + outRange[0];
	}

	//沒有就不作
	if(($(".fly").length)<1) return;

	let $win = $(window);
	let iWinH;
	let iWinMarginT = 100; //視窗的上觸發點
	let iWinMarginB = 100; //視窗的下觸發點
	let iScrollT; //已滾距離

	$win.on("scroll", function(){
		iWinH = $win.height();
		iScrollT = $win.scrollTop();
		$(".fly").each(function(){
			let $fly = $(this);
			let iTaOffsetT; //目標物距離視窗上
			let iTaMove; //目標物已移動
			let iPercent; //目標物已移動百分比
			let iDistance; //移動總長
			iTaOffsetT  = $fly.offset().top;
			iDistance = iWinH - iWinMarginT - iWinMarginB;
			iTaMove = iTaOffsetT - iScrollT - iWinMarginT;
			iPercent = (iDistance - iTaMove) / iDistance * 100 | 0;
			iPercent = Math.min(Math.max(iPercent, 0), 100);
			$fly.find(".inner").css({left:`${ fnRangeScale(iPercent, [0,100], [85,5])}%`}); //對應值
		});
	}).trigger("scroll");
	
});

//滾動 裝飾圖
$(function(){
	//寫入裝飾圖
	let $iDecoBg = $("i.decoBg");
	$iDecoBg.each(function(){
		$("body").append(`<img class="decoBg" style="display:block; width:100%; height:auto; 
		position:absolute; left:0; z-index:-1;">`)
	});
	let $imgDecoBg = $("img.decoBg");
	//改尺寸
	$(window).on("resize", function(){
		let winW = $(this).width();
		let winH = $(this).height();
		
		$iDecoBg.each(function(idx){
			let tmpSrc = (winW > winH) ? $(this).data
 			("deco-img") : $(this).data("deco-img-m"); //直橫圖
			let tmpTop = $(this).offset().top; //定位
			let tmpOffset = +$(this).data("deco-offset"); //偏移 正值往下
			$imgDecoBg.eq(idx).attr({src:tmpSrc}).css({top:tmpTop + tmpOffset});
		});
	}).trigger("resize");
	
});


