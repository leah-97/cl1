$(function () {
  let lastScroll = 0;

  $(window).scroll(function () {
    let currentScroll = $(this).scrollTop();

    if (currentScroll <= 0) {
      $("header").removeClass("active");
      $("header").css("transform", "translateY(0)");
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      $("header").css("transform", "translateY(-100%)");
      $("header").removeClass("active");
    } else if (currentScroll > 0) {
      $("header").css("transform", "translateY(0)");
      $("header").addClass("active");
    }

    lastScroll = currentScroll;
  });
  $(window).on("load", function () {
    $("video").each(function () {
      this.muted = true;
      this.play().catch((err) => console.log("Video play failed:", err));
    });
  });
  $(".mainMenu > nav > ul").mouseenter(function () {
    $(".subBg").stop().slideDown(300);
    $("header").addClass("active");
  });

  $(".subBg").mouseleave(function () {
    let currentScroll = $(window).scrollTop();
    $(".subBg")
      .stop()
      .slideUp(300, function () {
        if (currentScroll <= 0) {
          $("header").removeClass("active");
        }
      });
  });
  /*플래티넘 온 버튼 */
  $(function () {
    $(".visualHide > div:first-child").css({ bottom: "-800px" });
    $(".visualBtn").on("click", function () {
      $(this)
        .stop()
        .animate({ bottom: "-200px" }, 300, function () {});

      $(".visualHide").show();
      $(".visualHide > div:first-child")
        .stop()
        .animate({ bottom: "150px" }, 300, function () {});
    });

    $(".visualhideTop > img").on("click", function () {
      $(".visualHide > div:first-child")
        .stop()
        .animate({ bottom: "-800px" }, 300, function () {
          $(".visualHide").hide();
        });
      $(".visualBtn").show().stop().animate({ bottom: "-75px" }, 300);
    });
  });
  /*slide메뉴 */
  $(function () {
    $(".headerRight2 img").click(function () {
      if (window.innerWidth <= 768) {
        $(".slideMenu").addClass("active");
      } else {
        $(".slideMenu").stop().animate({ "margin-right": "100%" });
      }
    });

    $(".close2 img").click(function () {
      if (window.innerWidth <= 768) {
        $(".slideMenu").removeClass("active");
      } else {
        $(".slideMenu").stop().animate({ "margin-right": "-100%" });
      }
    });
    $(".sldieMid > ul > li").click(function () {
      $(this).find(".slideSub").stop(true, true).slideToggle(500);
      $(this).find(".slideSub").toggleClass("active");

      if ($(this).find(".slideSub").hasClass("active")) {
        $(this).css("border-bottom", "1px solid #30559a");
      } else {
        $(this).css("border-bottom", "1px solid #ccc");
      }
    });
  });

  /*로그인 */
  $(".bg button").mouseenter(function () {
    $(".bg button span img").css("margin-left", "0px").show();
    $(".bg button span img").stop().animate({ "margin-left": "10px" }, 200);
  });

  $(".bg button").mouseleave(function () {
    $(".bg button span img").hide();
    $(".bg button p").stop().animate({ "margin-left": "0px" }, 200);
  });
  /*비주얼 슬라이드 */
  function mainVisualSlider() {
    var $slides = $(".visualSlides > li");
    var $texts = $(".visualWord > li");
    var $bars = $(".barWrap > li");

    var currentIdx = 0;
    var totalSlides = $slides.length;

    init();

    function init() {
      $(".probar1 > div").stop().css("width", "0%");
      runSlide(0);
    }

    function runSlide(idx) {
      currentIdx = idx;

      var duration = idx === 0 ? 15000 : 7000;

      $slides.removeClass("on");
      $texts.removeClass("on");
      $bars.removeClass("on");

      $("video").each(function () {
        this.pause();
      });

      $slides.eq(idx).addClass("on");
      $texts.eq(idx).addClass("on");
      $bars.eq(idx).addClass("on");

      var $activeVideo = $slides.eq(idx).find("video");
      if ($activeVideo.length > 0) {
        $activeVideo.get(0).currentTime = 0;
        $activeVideo.get(0).play();
      }

      $(".probar1 > div").stop().css("width", "0%");

      $bars
        .eq(idx)
        .find(".probar1 > div")
        .animate({ width: "100%" }, duration, "linear", function () {
          var nextIdx = (currentIdx + 1) % totalSlides;
          runSlide(nextIdx);
        });
    }

    $bars.on("click", function (e) {
      e.preventDefault();
      var clickIdx = $(this).index();
      runSlide(clickIdx);
    });
  }

  mainVisualSlider();
  /*section1 */
  let stop;
  let isAnimating = false;
  let currentIndex = 4;
  const totalSlides = 7;

  init();
  start();

  function init() {
    $(".swiperWrap ul li").removeClass("active");
    $(".swiperWrap ul li").eq(3).addClass("active");
    updateProgress();
  }

  function updateProgress() {
    const percentage = (currentIndex / totalSlides) * 100;
    $(".bar2 div").css("width", percentage + "%");
    $(".bot2 ul li:nth-child(2) > span:first-child").text(currentIndex);
  }

  function start() {
    stop = setInterval(slideNext, 3000);
  }

  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;

    const $ul = $(".swiperWrap ul");
    const $first = $ul.children().first();
    const w = $first.outerWidth(true);

    $ul.children().removeClass("active").eq(4).addClass("active");

    currentIndex = currentIndex >= totalSlides ? 1 : currentIndex + 1;
    updateProgress();

    $ul.animate({ marginLeft: -w }, 600, function () {
      $first.appendTo($ul);
      $ul.css({ marginLeft: 0 });
      $ul.children().removeClass("active").eq(3).addClass("active");
      isAnimating = false;
    });
  }

  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;

    const $ul = $(".swiperWrap ul");
    const $last = $ul.children().last();
    const w = $last.outerWidth(true);

    $ul.css({ marginLeft: -w });
    $last.prependTo($ul);

    $ul.children().removeClass("active").eq(3).addClass("active");

    currentIndex = currentIndex <= 1 ? totalSlides : currentIndex - 1;
    updateProgress();

    $ul.animate({ marginLeft: 0 }, 600, function () {
      isAnimating = false;
    });
  }

  $(".swiperWrap").hover(
    () => clearInterval(stop),
    () => start(),
  );

  $(".bot2 ul li:first-child .cir").click(function () {
    slidePrev();
    clearInterval(stop);
    start();
  });

  $(".bot2 ul li:last-child .cir").click(function () {
    slideNext();
    clearInterval(stop);
    start();
  });

  /*section2버튼 */
  $(".section2 button").mouseenter(function () {
    $(".section2 button span img").css("margin-left", "0px").show();
    $(".section2 button span img")
      .stop()
      .animate({ "margin-left": "10px" }, 200);
  });

  $(".section2 button").mouseleave(function () {
    $(".section2 button span img").hide();
    $(".section2 button span").stop().animate({ "margin-left": "0px" }, 200);
  });

  /*section3버튼 */
  $(".section3 li:first-child button").mouseenter(function () {
    $(".section3 li:first-child button span img")
      .css("margin-left", "0px")
      .show();
    $(".section3 li:first-child button span img")
      .stop()
      .animate({ "margin-left": "10px" }, 200);
  });

  $(".section3 li:first-child button").mouseleave(function () {
    $(".section3 li:first-child button img").hide();
    $(".section3 li:first-child button")
      .stop()
      .animate({ "margin-left": "0px" }, 200);
  });
  $(".section3 li:nth-child(2) button").mouseenter(function () {
    $(".section3 li:nth-child(2) button span img")
      .css("margin-left", "0px")
      .show();
    $(".section3 li:nth-child(2) button span img")
      .stop()
      .animate({ "margin-left": "10px" }, 200);
  });

  $(".section3 li:nth-child(2) button").mouseleave(function () {
    $(".section3 li:nth-child(2) button span img").hide();
    $(".section3 li:nth-child(2) button span")
      .stop()
      .animate({ "margin-left": "0px" }, 200);
  });
  /*section4 버튼 */
  $(".sec4Top button").mouseenter(function () {
    $(".sec4Top button span img").css("margin-left", "0px").show();
    $(".sec4Top button span img")
      .stop()
      .animate({ "margin-left": "10px" }, 200);
  });

  $(".sec4Top button").mouseleave(function () {
    $(".sec4Top button span img").hide();
    $(".sec4Top button span").stop().animate({ "margin-left": "0px" }, 200);
  });
  /*section5 버튼 */
  $(".sec5Top button").mouseenter(function () {
    $(".sec5Top button span img").css("margin-left", "0px").show();
    $(".sec5Top button span img")
      .stop()
      .animate({ "margin-left": "10px" }, 200);
  });

  $(".sec5Top button").mouseleave(function () {
    $(".sec5Top button span img").hide();
    $(".sec5Top button span").stop().animate({ "margin-left": "0px" }, 200);
  });
});
