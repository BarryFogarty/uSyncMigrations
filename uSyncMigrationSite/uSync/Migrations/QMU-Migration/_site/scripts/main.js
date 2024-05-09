$(document).ready(function () {

	if (/Edge\/\d./i.test(navigator.userAgent)) {
		// Microsoft Edge fallback
		$('body').addClass('IE');
	}
	var ms_ie = false;
	var ua = window.navigator.userAgent;
	var old_ie = ua.indexOf('MSIE ');
	var new_ie = ua.indexOf('Trident/');

	if ((old_ie > -1) || (new_ie > -1)) {
		ms_ie = true;
	}

	if (ms_ie) {
		$('body').addClass('IE');
	}

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();

		if (scroll >= 250) {
			$(".back-to-top").addClass("active");
			$(".back-to-top").attr("tabindex", "0");
		} else {
			$(".back-to-top").removeClass("active");
			$(".back-to-top").attr("tabindex", "-1");
		}
	});

	$(".back-to-top").click(function () {
		$("html, body").animate({ scrollTop: 0 }, 600);
	});

	$('.single-carousel').on('init', function (event, slick) {
		singleCarouselVideo();
	});

	$('.single-carousel').on('setPosition', function (event, slick) {
		setTimeout(function () {
			singleCarouselVideo();
		}, 100);
	});

	function socialFilterClick($this) {
		var tabID = $this.attr('id');

		$('.social-filter li').removeClass('active');
		$this.parent().addClass('active');
		$('.social-col-wrap').removeClass('active');
		$('.social-col-wrap[data-id=' + tabID + ']').addClass('active');

		if ($('.overlay-filter').hasClass('open')) {
			$('.active-filter').removeAttr('id');
			$('.active-filter').html(tabID).attr('id', tabID + '-colour');
			$('.show-filter').removeClass('open');
			$('.overlay-filter').stop().fadeOut(300);
		}
    }

	$('.social-filter li div').on('click', function () {
		socialFilterClick($(this));
	});

	$('.social-filter li div').keypress(function (event) {
		if (event.key == "Enter") {
			socialFilterClick($(this));
			event.preventDefault();
		}
	});

	$('.show-filter').on('click', function () {
		var $this = $(this);

		$("html, body").animate({ scrollTop: 0 }, 0);

		if (!$this.hasClass('open')) {
			$this.addClass('open');
			$('.overlay-filter').addClass('open');
			$('.overlay-filter').stop().fadeIn(300);
		}
	});

	$('.overlay-filter .close-filter').on('click', function () {
		$('.show-filter').removeClass('open');
		$('.overlay-filter').stop().fadeOut(300);
    });

    // TAG FILTER COUNTER ADDED 27062018

    $('.search-tags-result :checkbox').change(function () {
        var tagCount = $(":checkbox:checked").length;
        if ($('#search-tags') != null) {
            $('#search-tags').html("Search Tag (" + tagCount + ")");
        }
    });

    $('.search-tags-result :checkbox').ready(function () {
        var tagCount = $(":checkbox:checked").length;
        if ($('#search-tags') != null) {
            $('#search-tags').html("Search Tag (" + tagCount + ")");
        }
    });

	function slickTabIndexFix(slickSection) {

		slickSection.find(".slick-slide").each(function () {

			if ($(this).attr("aria-hidden") == "true") {
				$(this).attr("tabindex", "-1");
				$(this).find("a").attr("tabindex", "-1");
			}
			else {
				if ($(this).find("a").length) {
					$(this).attr("tabindex", "-1");
					$(this).find("a").attr("tabindex", "0");
				}
				else {
					$(this).attr("tabindex", "0");
                }
			}
		});

		// Remove disabled button from tab order
		$("button.slick-arrow").removeAttr("tabindex");
		slickSection.find("button.slick-arrow.slick-disabled").each(function () {
			$(this).attr("tabindex", "-1");
		});
    }

	$(".slick-fix").on("init", function (slick) {

		// Accessibility fixes for slick
		// https://www.beacontechnologies.com/blog/2017/11/how-to-remove-aria-described-by-if-dots-are-disabled-in-slick-slider.aspx
		$(this).find(".slick-slide").each(function () {

			// Ensure aria-describedby element exists
			if ($(this).attr('aria-describedby') != undefined) {
				var descriptionDiv = $("#" + $(this).attr('aria-describedby'));
				if (!descriptionDiv.length) {
					var titleDiv = $(this).find(".title-overlay > .name").first();
					if (titleDiv) {
						titleDiv.attr("id", $(this).attr('aria-describedby'));
					}
				}
			}

			// If slide is visible then ensure it is not aria-hidden
			var tabIndex = $(this).attr("tabindex");
			if (tabIndex == "0") {
				$(this).attr("aria-hidden", "false");
			}
		});

		var section = $(this);
		setTimeout(function () {
			slickTabIndexFix(section);
		}, 100);

		// Remove a single dot when no scrolling is required (visual change only)
		$(".slick-dotted ul.slick-dots").each(function () {

			if ($(this).children().length == 0) {
				$(this).remove();
			}
		});
	});

	$(".slick-fix").on("afterChange", function (slick, currentSlide) {

		var section = $(this);
		setTimeout(function () {
			slickTabIndexFix(section);
		}, 100);
	});

	$('.single-carousel').slick({
		arrows: true,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		draggable: false
	});

	$('.main-carousel').slick({
		arrows: false,
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
        autoplaySpeed: 4500,
		pauseOnHover: false,
		accessibility: false,
		draggable: false,
		focusOnChange: false
    });

    // Pause slick on carousel banners when modal video activated

    $('.trans-btn').click(function () {
        $('.main-carousel,.banner-carousel').slick('slickPause');
    });

	$('.banner-carousel').slick({
		arrows: false,
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
        autoplaySpeed: 4500,
		pauseOnHover: false,
		accessibility: false,
		draggable: false,
		focusOnChange: false
	});

	$('.social-updates .slider').slick({
		arrows: true,
		dots: true,
		infinite: true,
		fade: true,
		speed: 250,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		draggable: false
	});

	$('.research-carousel').slick({
		arrows: true,
		dots: true,
		infinite: true,
		fade: true,
		speed: 250,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		accessibility: true,
		draggable: false
	});

	$('.student-stories').slick({
		arrows: true,
		dots: true,
		infinite: false,
		speed: 250,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1
				}
			}
		],
		accessibility: false,
		draggable: false
	});

	$('.inner-carousel').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		arrows: true,
		dots: true,
		infinite: true,
		fade: true,
		speed: 500,
		asNavFor: '.inner-carousel-thumbs',
		responsive: [
			{
				breakpoint: 900,
				settings: {
					centerMode: true,
					fade: false,
					focusOnSelect: true
				}
			}
		],
		accessibility: false,
		draggable: false
	});

	$('.news-carousel').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		variableWidth: true,
		accessibility: true,
		draggable: false
	});

	$('.download-carousel').slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		slidesToShow: 6,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		],
		accessibility: true,
		draggable: false
	});

	$('.inner-carousel-thumbs').on('init', function (event, slick) {
		videoSlide();
	});

	$('.inner-carousel-thumbs').on('setPosition', function (event, slick) {
		setTimeout(function () {
			videoSlide();
		}, 100);
	});

	$('.inner-carousel-thumbs').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.inner-carousel',
		dots: false,
		arrows: false,
		centerMode: true,
		focusOnSelect: true,
		accessibility: true,
		draggable: false
	});

	$('.accordion-list .accordion-item h2').click(function () {
		var $this = $(this);
		OpenCloseAccordion($this);
	});

	$('.accordion-list .accordion-item h2').keypress(function (event) {
		if (event.key == "Enter") {
			OpenCloseAccordion($(this));
			event.preventDefault();
		}
	});

	function OpenCloseAccordion($this) {

		if (!$this.hasClass('open')) {
			$this.addClass('open');
			$this.siblings('.drop').stop().slideDown(300);
		}
		else {
			$this.removeClass('open');
			$this.siblings('.drop').stop().slideUp(300);
		}
    }

	$('.accordion-drop h2').click(function () {
		var $this = $(this);
		OpenCloseAccordionDrop($this);
	});

	$('.accordion-drop h2').keypress(function (event) {
		if (event.key == "Enter") {
			OpenCloseAccordionDrop($(this));
			event.preventDefault();
		}
	});

	function OpenCloseAccordionDrop($this) {

		if (!$this.hasClass('open')) {
			$this.addClass('open');
			$this.siblings('.content-drop').stop().slideDown(300);
		}
		else {
			$this.removeClass('open');
			$this.siblings('.content-drop').stop().slideUp(300);
		}
    }

	$('.menu-btn').keypress(function (event) {
		if (event.key == "Enter") {
			OpenCloseMenu($(this));
			event.preventDefault();
        }				
	});

	$('.menu-btn').click(function () {
		OpenCloseMenu($(this));
	});

	$('.nav-menu-first').on('keydown', function (event) {
		if (event.shiftKey && event.key == "Tab") {
			var btn = $('.menu-btn');
			if (btn.length) {
				if (btn.hasClass("active")) {
					OpenCloseMenu(btn);
					event.preventDefault();
					btn.focus();
				}
			}
		}
	});

	$(".nav-menu-last").on('keydown', function (event) {
		if (!event.shiftKey && event.key == "Tab") {
			var btn = $('.menu-btn');
			if (btn.length) {
				if (btn.hasClass("active")) {
					OpenCloseMenu(btn);
					event.preventDefault();
					btn.focus();
				}
			}
		}
	});

	$('.nav-two-first').on('keydown', function (event) {
		if (event.shiftKey && event.key == "Tab") {
			var navPanel = $(this).closest(".nav-panel");
			if (navPanel.length) {
				var levelOneLink = navPanel.siblings("a.nav-level-one");
				if (levelOneLink.length) {
					CloseLevel2Nav(levelOneLink);
                }
            }
		}
	});

	$('.nav-two-last').on('keydown', function (event) {
		if (!event.shiftKey && event.key == "Tab") {
			var navPanel = $(this).closest(".nav-panel");
			if (navPanel.length) {
				var levelOneLink = navPanel.siblings("a.nav-level-one");
				if (levelOneLink.length) {
					CloseLevel2Nav(levelOneLink);
				}
			}
		}
	});

	$(document).on('keyup', function (event) {
		

		if (event.key == "Escape") {

			var openLevel2 = $(".main-nav-wrapper li a.open");
			if (openLevel2.length) {
				CloseLevel2Nav(openLevel2);
				openLevel2.focus();
			}
			else {
			
				var btn = $('.menu-btn');
				if (btn.length) {
					if (btn.hasClass("active")) {
						OpenCloseMenu(btn);
						event.preventDefault();
						btn.focus();
					}
				}
			}

			var courseSearchOverlay = $(".box-overlay.open");
			if (courseSearchOverlay.length && courseSearchOverlay.length) {
				CloseCourseSearch();
			}

			var shareOverlay = $(".share-page .share-wrap");
			if (shareOverlay.length && shareOverlay.hasClass('open')) {
				OpenCloseShareMenu(shareOverlay);
				shareOverlay.children(".share-btn").focus();
			}


			var enquiryOverlay = $('.enquiries-overlay');
			if (enquiryOverlay.length && enquiryOverlay.hasClass('active')) {
				CloseEnquiriesBox();
			}

			var accordionItem = $(".accordion-list .accordion-item h2.open");
			if (accordionItem.length) {
				OpenCloseAccordion(accordionItem);
				accordionItem.focus();
			}

			var accordionDrop = $(".accordion-drop h2.open");
			if (accordionDrop.length) {
				OpenCloseAccordionDrop(accordionDrop);
				accordionDrop.focus();
            }
		}
	});

	$(".nav-level-one").on("keydown", function (event) {
		if (event.key == "Enter") {
			if (OpenLevel2Nav($(this))) {
				event.preventDefault();
            }
		}
		else if (event.shiftKey && event.key == "Tab") {
			CloseLevel2Nav($(this));
		}
	});

	function OpenCloseMenu($this) {
		var $nav = $('.main-nav-wrapper'),
			$overlay = $('.site-overlay');

		//$('.main-nav-wrapper').addClass('animated');
		$('.search-area').removeClass('open');

		$('.quick-links .toggle-btn').removeClass('open');
		$('.quick-links .drop').slideUp();

		$nav.find('.main-nav .open').removeClass('open');
		$nav.find('.nav-panel').hide();
		$nav.removeClass('open level-two');
		$nav.removeAttr('style');
		$('.scroll-nav').css("height", $(window).height() - $('header').height());

		if (!$this.hasClass('active')) {
			$this.addClass('active');
			$this.attr("aria-label", "Close menu");
			$nav.addClass('open');
			$('.scroll-nav').addClass('active');
			$('.scroll-nav-qmu').addClass('active');
			$nav.css("opacity", 1);
			$overlay.fadeIn(400);
			$(".nav-menu-first").focus();
			$(".main-nav-wrapper a").attr("tabindex", "0");
			$("html").addClass('nav-menu-open');
		}
		else {
			$this.removeClass('active');
			$this.attr("aria-label", "Open menu");
			$('.scroll-nav').removeClass('active');
			$('.scroll-nav-qmu').removeClass('active');
			$nav.removeClass('open');
			setTimeout(function () {
				$nav.animate({ "opacity": 0 }, 200);
				$('.scroll-nav').removeClass('active');
			}, 400);
			$overlay.fadeOut(400);
			$(".main-nav-wrapper a").attr("tabindex", "-1");
			$("html").removeClass('nav-menu-open');
		}
	}

	$('nav a.logo').click(function (e) {
		if (!$(this).hasClass("study-here-logo")) {
			$(this).children("img").attr("src", "/images/logo.png");
		}
	});

	$("nav a.logo").focus(function () {
		if (!$(this).hasClass("study-here-logo")) {
			$(this).children("img").attr("src", "/images/logo-inverted.png");
		}
	});

	$("nav a.logo").focusout(function () {
		if (!$(this).hasClass("study-here-logo")) {
			$(this).children("img").attr("src", "/images/logo.png");
        }
	});

	function OpenLevel2Nav($this) {

		var preventDefault = false;
		if (!$this.hasClass("open")) {

			var $panel = $this.siblings('.nav-panel'),
				pointerPos = $this.position().top,
				scrollHeight = $(window).outerHeight() - $('header').outerHeight();

			clearTimeout($this.data('timeoutId'));

			var expandWidth = $(window).outerWidth() - $('.main-nav-wrapper').outerWidth();
			$('nav .nav-panel').css("width", expandWidth);

			$this.addClass('open');
			$panel.fadeIn(200);
			$('.nav-panel .pointer').css("top", pointerPos);

			$('.scroll-nav').css({
				'height': scrollHeight,
				'overflow-y': "auto"
			});
			$('.main-nav-wrapper').css('height', $('.page-wrapper').outerHeight());
			$('.nav-panel').css('height', 'auto');

			preventDefault = true;
		}

		return preventDefault;
    }

	function CloseLevel2Nav($this) {

		var $panel = $this.siblings('.nav-panel');

		$this.removeClass('open');

		$panel.fadeOut(200);
    }

	$('.search-area .search-open').click(function () {
		$(this).parent().addClass('open');

		$('.menu-btn').removeClass('active');
		$('.main-nav-wrapper').removeClass('open');
		$('.nav-panel').hide();
		$('.site-overlay').hide();
		$('.search-open').attr("tabindex", "-1");
		$('.search-box input').attr("tabindex", "0");

		if (viewport().width <= 900) {
			$('.search-box').slideDown(300);
			$('.search-close').attr("tabindex", "0");
		}

		$('.search-box input[type=search]').focus();
	});

	$('.search-area .search-close').click(function () {
		$(this).parent().removeClass('open');
		$('.search-box input').attr("tabindex", "-1");
		$('.search-open').attr("tabindex", "0");

		if (viewport().width <= 900) {
			$('.search-box').slideUp(300);
			$('.search-close').attr("tabindex", "-1");
		}
	});

	$(document).mouseup(function (e) {
		var $container = $(".search-box"),
			$menuArea = $('.menu-btn'),
			$navArea = $('.main-nav-wrapper');

		if (!$container.is(e.target) // if the target of the click isn't the container...
			&& $container.has(e.target).length === 0) // ... nor a descendant of the container
		{
			$container.parent().removeClass('open');
			if (viewport().width <= 900) {
				$('.search-box').slideUp(300);
				$('.search-area').removeClass('open');
			}
		}

		if (!$menuArea.is(e.target) // if the target of the click isn't the container...
			&& $menuArea.has(e.target).length === 0) // ... nor a descendant of the container
		{
			if (!$navArea.is(e.target) // if the target of the click isn't the container...
				&& $navArea.has(e.target).length === 0) // ... nor a descendant of the container
			{
				if (viewport().width >= 901) {
					$("html").removeClass('nav-menu-open');
					$('.menu-btn').removeClass('active');
					$('.main-nav-wrapper').removeClass('open');
					$('.scroll-nav-qmu').removeClass('active');
					setTimeout(function () {
						$('.main-nav-wrapper').animate({ "opacity": 0 }, 200);
						$('.scroll-nav').removeClass('active');
						$('.scroll-nav').removeAttr('style');
					}, 400);
					$('.site-overlay').fadeOut(400);
				}
			}
		}
	});

	$('.quick-links .toggle-btn').click(function () {
		var $this = $(this);

		$('.search-area').removeClass('open');
		$('.menu-btn').removeClass('active');
		$('.main-nav-wrapper').removeClass('open');
		$('.site-overlay').fadeOut();

		if (!$this.hasClass('open')) {
			$this.addClass('open');
			$this.siblings('.drop').stop().slideDown();
		}
		else {
			$this.removeClass('open');
			$this.siblings('.drop').stop().slideUp();
		}
	});

	$('.image-box .course-search-item').keypress(function (event) {
		if (event.key == "Enter") {
			OpenCourseSearch($(this));
			event.preventDefault();
		}
	});

	$('.image-box .course-search-item').click(function (e) {
		OpenCourseSearch($(this));
		e.preventDefault();
	});

	$('.image-box .cancel, .image-box .close-btn').click(function () {
		CloseCourseSearch();
	});

	$('.image-box .cancel, .image-box .close-btn').keypress(function (event) {
		if (event.key == "Enter") {
			CloseCourseSearch();
			event.preventDefault();
		}
	});

	$('.image-box .close-btn').on('keydown', function (event) {
		if (event.shiftKey && event.key == "Tab") {
			event.preventDefault();
		}
	});

	$(".image-box .cancel").on('keydown', function (event) {
		if (!event.shiftKey && event.key == "Tab") {
			event.preventDefault();
		}
	});

	$("#submit-course-search").click(function (event) {
		CourseSearch($(this).parent());
		event.preventDefault();
	});

	function OpenCourseSearch($this) {
		var title = $this.html(),
			parentId = $this.attr('data-id'),
			$boxOverlay = $('.box-overlay');

		$boxOverlay.find('.title').html(title);
		$boxOverlay.find('.course-parent').val(parentId);

		var selectHtml = $this.parent().find('select').html();
		if (selectHtml) {
			$boxOverlay.find('.instructions').html('<strong>Please select a subject area</strong>. Add a keyword to refine your search...');
			$boxOverlay.find('select').show();
			$boxOverlay.find('select').html(selectHtml);
		}
		else {
			$boxOverlay.find('.instructions').html('Add a keyword to refine your search...');
			$boxOverlay.find('select').hide();
			$boxOverlay.find('select').html(' ');
		}

		$boxOverlay.addClass('open');

		$('.box-overlay .close-btn').attr("tabindex", "0");
		$('.box-overlay select').attr("tabindex", "0");
		$('.box-overlay input').attr("tabindex", "0");
		$('.box-overlay .cancel').attr("tabindex", "0");

		$("#subject").focus();
    }

	function CloseCourseSearch() {
		$('.box-overlay').removeClass('open');
		$(".image-box ul li:first-child a.course-search-item").focus();

		$('.box-overlay .close-btn').attr("tabindex", "-1");
		$('.box-overlay select').attr("tabindex", "-1");
		$('.box-overlay input').attr("tabindex", "-1");
		$('.box-overlay .cancel').attr("tabindex", "-1");
	}

	function CourseSearch(divParent) {
		var url = divParent.attr("data-url");
		var tab = divParent.children("#tab").val();
		var subject = divParent.children("#subject").val();
		var keyword = divParent.children("#keyword").val();

		if (url && url.length > 0) {

			url += "?tab=" + tab;

			if (subject && subject.length > 0) {
				url += "&subject=" + subject;
			}

			if (keyword && keyword.length > 0) {
				url += "&keyword=" + keyword;
			}

			window.location.href = url;
        }
    }

	moveQuickLinks();
	moveFindCourse();
	moveBlueBox();
	moveSearchBox();
	moveFilters();
	headerScroll();
	introText();
	shareBtn();
	enquiryBox();
	fullWidthTabs();
	tabs();

	if (viewport().width <= 600) {
		footerLinks();
	}

	if (viewport().width >= 901) {
		navExpand();
	}
	else {
		mobileNav();

		$('.tag-filter .white-btn').click(function () {
			var $this = $(this);

			if (!$this.hasClass('open')) {
				$this.addClass('open');
				$this.find('.search-tags-result').stop().fadeIn(200);
			}
			else {
				$this.removeClass('open');
				$this.find('.search-tags-result').stop().fadeOut(200);
			}
		});
	}

	// Search
	$('.search-form-single').submit(function () {
		var url = "";
		var searchUrl = $(this).find('.search-url').val();
		var keyword = $(this).find('.search-keyword').val();
		var type = $(this).find('.search-type').val();

		if (searchUrl && keyword) {
			url = searchUrl + '?keyword=' + keyword;

			if (type) {
				url = url + '&type=' + type;
			}

			window.location.href = url;
		}

		return false;
	});

	if (viewport().width <= 900) {
		$('.content-item').removeClass('active');
		$('.tab-list li').removeClass('active');
		$('.tab-list').removeAttr("role");
		$('.tab-list li').removeAttr("aria-selected");
		$('.tab-list li').removeAttr("role");
		$('.tab-list li').attr("aria-expanded", "false");
		$('.content-item').attr("role", "region");
	}

	$(".mceNonEditable.embeditem iframe").each(function () {
		var style = "max-width: " + $(this).attr("width") + "px; max-height: " + $(this).attr("height") + "px;";
		$(this).attr("style", style);
	});


	$(".calculate-num-nights .umbraco-forms-field.numberofnights input").prop("disabled", true);

	$(".calculate-num-nights form").submit(function () {
		$(".calculate-num-nights .umbraco-forms-field.numberofnights input").prop("disabled", false);	// Allow value to be submitted
	});

	function CalculateNumberOfNights(fromDate, toDate) {

		var numNights = 0;
		if (toDate > fromDate) {

			var toDateTime = new Date(toDate);
			var fromDateTime = new Date(fromDate);
			var toDateNoTime = new Date(toDateTime.getFullYear(), toDateTime.getMonth(), toDateTime.getDate());
			var fromDateNoTime = new Date(fromDateTime.getFullYear(), fromDateTime.getMonth(), fromDateTime.getDate());

			numNights = (toDateNoTime - fromDateNoTime) / (1000 * 60 * 60 * 24);
		}

		var description = " Nights";
		if (numNights == 1) {
			description = " Night";
        }

		$(".calculate-num-nights .umbraco-forms-field.numberofnights input").val(numNights + description);
    }

	$(".calculate-num-nights .umbraco-forms-field.checkindate input").change(function () {
		var fromDate = Date.parse($(this).val());
		var toDate = Date.parse($(".umbraco-forms-field.checkoutdate input").val());
		CalculateNumberOfNights(fromDate, toDate);
	});

	$(".calculate-num-nights .umbraco-forms-field.checkoutdate input").change(function () {
		var fromDate = Date.parse($(".umbraco-forms-field.checkindate input").val());
		var toDate = Date.parse($(this).val());
		CalculateNumberOfNights(fromDate, toDate);
	});

	// Calculate on page-load (could be a validation error)
	var fromDate = Date.parse($(".calculate-num-nights .umbraco-forms-field.checkindate input").val());
	var toDate = Date.parse($(".calculate-num-nights .umbraco-forms-field.checkoutdate input").val());
	CalculateNumberOfNights(fromDate, toDate);


	//Checks if webp image fallbacks are needed
	webpImageFallbackCheck()
});

$(window).load(function () {
	smallestItem();
});

// Store the window width
var windowWidth = $(window).width();

$(window).resize(function () {
	if ($(window).width() != windowWidth) {

		windowWidth = $(window).width();
		$('footer h2').unbind();
		$('.main-nav > li').unbind();
		$('.intro-text .show-more').unbind();
		$('.share-page .share-wrap').unbind();
		$('.full-width-tabs .tab-area li').unbind();
		$('.inner-carousel .item .video').removeAttr('style');
		$('.inner-carousel-thumbs .item img').removeAttr('style');
		$('.inner-carousel .item .image img').removeAttr('style');
		$('.staff-item .popup-btn').unbind();
		$('.staff-item .close-popup').unbind();
		$('.staff-item .close-x').unbind();
		$('.tab-list li').unbind();

		if (viewport().width <= 900) {
			mobileNav();
			$('.overlay-filter li').removeClass('active');
			$('.content-item').removeClass('active');
			$('.tab-list li').removeClass('active');
			$('.tab-list').removeAttr("role");
			$('.tab-list li').removeAttr("aria-selected");
			$('.tab-list li').removeAttr("role");
			$('.tab-list li').attr("aria-expanded", "false");
			$('.content-item').attr("role", "region");
		}
		else {
			$('.search-area').removeClass('open');
			navExpand();
			$('.overlay-filter').removeClass('open').hide();
			$('.show-filter').removeClass('open');
			$('.active-filter').attr('id', $('.social-col-wrap.active').data('id') + '-colour').html($('.social-col-wrap.active').data('id'));

			if (!$('.social-filter li').hasClass('active')) {
				$('.social-col-wrap').removeClass('active');
				$('.social-col-wrap:first').addClass('active');
				$('.social-filter li:first').addClass('active');
			}
		}

		if (viewport().width <= 600) {
			footerLinks();
		}
		else {
			$('footer ul').removeAttr('style');
		}

		if (viewport().width >= 481) {
			$('.intro-text').removeAttr('style');
			$('.intro-text').removeClass('open');
		}

		moveQuickLinks();
		moveFindCourse();
		moveBlueBox();
		moveSearchBox();
		moveFilters();
		headerScroll();
		introText();
		shareBtn();
		fullWidthTabs();
		tabs();


		setTimeout(function () {
			smallestItem();
		}, 100);

	}

	if (viewport().width >= 901) {
		if ($('.main-nav-wrapper').hasClass('open')) {
			var scrollHeight = $(window).outerHeight() - $('header').outerHeight();

			$('.scroll-nav').css('height', scrollHeight);
			$('.main-nav-wrapper').css('height', $('.page-wrapper').outerHeight());
		}
	}
	else {
		var navHeight = $('.page-wrapper').outerHeight() - $('header').outerHeight();
		$('header nav').css('height', navHeight);
	}
});

//Viewport function
function viewport() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width: e[a + 'Width'], height: e[a + 'Height'] };
}

function videoSlide() {
	var imageHeight = $('.inner-carousel .item .image').height();

	$('.inner-carousel .item .video').css('height', imageHeight);
}

function singleCarouselVideo() {
	var imageHeight = $('.single-carousel .item img').height();

	$('.single-carousel .item .video').css('height', imageHeight);
}

function OpenTab(tab) {

	var tab_id = tab.attr('data-tab');

	$('.tab-area > ul > li').removeClass('active');
	$('.tab-area > ul > li').attr("aria-selected", "false");
	$('.tab-content div').removeClass('active');
	$('.tab-content div a').attr("tabindex", "-1");

	tab.addClass('active');
	tab.attr("aria-selected", "true");
	$("#" + tab_id).addClass('active');
	$('.tab-content div.active a').attr("tabindex", "0");
}

function OpenAccordion(tab) {

	$('.tab-content div a').attr("tabindex", "-1");

	if (!tab.hasClass('active')) {
		tab.addClass('active');
		tab.next().stop().slideDown(300);
	}
	else {
		tab.removeClass('active');
		tab.next().stop().slideUp(300);
	}

	$('.tab-content div.active a').attr("tabindex", "-1");
}

function fullWidthTabs() {
	if ($('.full-width-tabs').length) {

		$('.tab-content div').each(function () {
			var $tab = $(this),
			id = $tab.attr('id');

			if (viewport().width <= 900) {
				$tab.insertAfter('.tab-area ul li[data-tab=' + id + ']');
			}
		});

		$('.tab-area ul div').each(function () {
			if (viewport().width >= 901) {
				$('.tab-area ul div').appendTo('.tab-content');
			}
		});

		if (viewport().width >= 901) {
			if (!$('.tab-area ul li').hasClass('active')) {
				$('.tab-area ul li:first-child').addClass('active');
				$('.tab-content div:first-child').addClass('active');
				$('.tab-content div').removeAttr('style');
			}

			$('.tab-content div a').attr("tabindex", "-1");
			$('.tab-content div.active a').attr("tabindex", "0");

			$('.tab-area > ul > li').keypress(function (event) {
				if (event.key == "Enter") {
					OpenTab($(this));
					event.preventDefault();
				}
			});

			$('.tab-area > ul > li').click(function () {
				OpenTab($(this));
			});
		}
		else {
			$('.full-width-tabs .tab-area li').removeClass('active');
			$('.tab-area .tab-content div').removeClass('active');
			$('.full-width-tabs .tab-area div').removeAttr('style');
			$('.tab-content div a').attr("tabindex", "-1");

			$('.full-width-tabs .tab-area li').keypress(function (event) {
				if (event.key == "Enter") {
					OpenAccordion($(this));
					event.preventDefault();
				}
			});

			$('.full-width-tabs .tab-area li').click(function () {
				OpenAccordion($(this));
			});
		}
	}
}

function smallestItem() {
	var smallestBox = 1000;

	if (viewport().width >= 901) {
		$('.inner-carousel-thumbs .item').each(function () {
			smallestBox = Math.min(smallestBox, $(this).height());
		});

		$('.inner-carousel-thumbs .item img').css('max-height', smallestBox + 'px');
	}
	else {
		$('.inner-carousel .item .image').each(function () {
			smallestBox = Math.min(smallestBox, $(this).height());
		});

		$('.inner-carousel .item .image img').css('max-height', smallestBox + 'px');
	}
}

function enquiryBox() {

	$('.enquiries-box > a').click(function (e) {
		OpenEnquiriesBox();
		e.preventDefault();
	});

	$('.enquiries-box .close-overlay').click(function () {
		CloseEnquiriesBox();
	});

	$('.enquiries-box > a').keypress(function (event) {
		if (event.key == "Enter") {
			OpenEnquiriesBox();
			event.preventDefault();
		}
	});

	$('.enquiries-box .close-overlay').keypress(function (event) {
		if (event.key == "Enter") {
			CloseEnquiriesBox();
		}
	});

	// Stop tab off backwards from close button
	$('.enquiries-box .close-overlay').on('keydown', function (event) {
		if (event.shiftKey && event.key == "Tab") {
			event.preventDefault();
		}
	});

	// Stop tab-off last link
	$('.enquiries-overlay div.enquiry-profile:last-of-type a:last-of-type').on('keydown', function (event) {
		if (!event.shiftKey && event.key == "Tab") {
			event.preventDefault();
		}
	});
}

function OpenEnquiriesBox() {

	var $enquiryBox = $('.enquiries-box'),
		$overlay = $('.enquiries-box .enquiries-overlay'),
		overlayHeight = $('.enquiries-box .enquiries-overlay').outerHeight();

	if (!$enquiryBox.hasClass('active')) {
		$enquiryBox.animate({ 'height': overlayHeight }, 200);
		$overlay.addClass('active');
		$(".enquiries-overlay .close-overlay").attr("tabindex", "0");
		$(".enquiries-overlay a").attr("tabindex", "0");
		$(".enquiries-overlay a").first().focus();
	}
	else {
		$overlay.removeClass('active');
	}
}

function CloseEnquiriesBox() {

	$('.enquiries-box').removeAttr('style');
	$('.enquiries-box .enquiries-overlay').removeClass('active');

	$(".enquiries-overlay .close-overlay").attr("tabindex", "-1");
	$(".enquiries-overlay a").attr("tabindex", "-1");

	$('.enquiries-box > a').focus();
}

function OpenCloseShareMenu($this) {

	if (!$this.hasClass('open')) {
		$this.addClass('open');
		$this.find('.share-menu').stop().fadeIn(150);
	}
	else {
		$this.removeClass('open');
		$this.find('.share-menu').stop().fadeOut(150);
	}
}

function shareBtn() {
	if (viewport().width <= 900) {
		$('.share-page .share-wrap').click(function () {
			OpenCloseShareMenu($(this));
		});
	}
	else {
		$('.share-page .share-wrap').mouseenter(function () {
			var $this = $(this);

			if (!$this.hasClass('open')) {
				OpenCloseShareMenu($this);
			}
		});

		$('.share-page .share-wrap').mouseleave(function () {
			var $this = $(this);

			if ($this.hasClass('open')) {
				OpenCloseShareMenu($this);
            }
		});
	}

	$('.share-page .share-wrap').keypress(function (event) {
		if (event.key == "Enter") {
			OpenCloseShareMenu($(this));
			event.preventDefault();
		}
	});

	$(".share-page .share-wrap a.icon-item.email").on("keydown", function (event) {
		if (event.shiftKey && event.key == "Tab") {
			var wrapperDiv = $(this).closest(".share-page .share-wrap");
			if (wrapperDiv.length) {
				OpenCloseShareMenu(wrapperDiv);
			}
		}
	});

	$(".share-page .share-wrap a.icon-item.pinterest").on("keydown", function (event) {
		if (!event.shiftKey && event.key == "Tab") {
			var wrapperDiv = $(this).closest(".share-page .share-wrap");
			if (wrapperDiv.length) {
				OpenCloseShareMenu(wrapperDiv);
			}
		}
	});	

	$(document).on('touchstart', function (e) {
		var container = $(".share-page .share-wrap");

		if (!container.is(e.target) // if the target of the click isn't the container...
		&& container.has(e.target).length === 0) // ... nor a descendant of the container
		{
			$('.share-page .share-wrap').removeClass('open');
			$('.share-page .share-wrap .share-menu').stop().fadeOut(150);
		}
	});
}

function mobileNav() {

	$('.main-nav li a .level2-btn').click(function () {
		var $this = $(this),
			$navPanel = $this.parent().siblings('.nav-panel');

		$('.main-nav li').removeClass('open');

		if (!$this.closest('li').hasClass('open')) {
			$this.closest('li').addClass('open');
			$navPanel.show();
			$navPanel.css("height", $('.page-wrapper').height());
			$('.main-nav-wrapper').addClass('level-two');
		}
	});

	$('.nav-panel .back-btn').click(function () {
		$('.main-nav-wrapper').removeClass('level-two');
		$('.main-nav li').removeClass('open');
		setTimeout(function () {
			$('.nav-panel').removeAttr('style');
		}, 500);
	});

	$('.main-nav > li a').click(function (e) {
		var $this = $(this),
			$levelTwo = $this.siblings('.nav-panel');

		if ($levelTwo.length) {
			if ($this.parent().hasClass('open')) {
				e.preventDefault();
			}
		}
	});
}

function headerScroll() {
	if (viewport().width >= 901) {
		$(window).scroll(function () {
			if ($(document).scrollTop() > 200) {
				$('header').addClass('smaller');
				$('header .quick-links').fadeOut(200);
			}
			else {
				$('header').removeClass('smaller');
				$('header .quick-links').fadeIn(200);
			}
		});
	}
}

function navExpand() {
	$('.main-nav > li').mouseenter(function () {
		var $this = $(this),
			$panel = $this.find('.nav-panel'),
			pointerPos = $this.position().top,
			scrollHeight = $(window).outerHeight() - $('header').outerHeight();

		clearTimeout($this.data('timeoutId'));

		var expandWidth = $(window).outerWidth() - $('.main-nav-wrapper').outerWidth();
		$('nav .nav-panel').css("width", expandWidth);

		$this.addClass('open');
		$panel.fadeIn(200);
		$('.nav-panel .pointer').css("top", pointerPos);

		$('.scroll-nav').css({
			'height': scrollHeight,
			'overflow-y': "auto"
		});
		$('.main-nav-wrapper').css('height', $('.page-wrapper').outerHeight());
		$('.nav-panel').css('height', 'auto');

	}).mouseleave(function () {
		var $this = $(this),
			$panel = $this.find('.nav-panel');

		$this.removeClass('open');
		timeoutId = setTimeout(function () {
			$panel.fadeOut('fast');
		}, 200);

		$this.data('timeoutId', timeoutId);
	});
}

function introText() {
	if (viewport().width <= 480) {
		$('.intro-text .show-more').click(function () {
			var $this = $(this),
				$intro = $this.parent(),
				pHeight = $intro.find('p').height();

			if (!$intro.hasClass('open')) {
				$intro.addClass('open');
				$intro.animate({ "height": pHeight + 55 }, 400);
			}
			else {
				$intro.removeClass('open');
				$intro.animate({ "height": 76 }, 400);
			}
		});
	}
}

function moveQuickLinks() {
	if (viewport().width <= 900) {
		$('.quick-links ul').appendTo('nav ul .mob-only .nav-panel');
		$('.application-box').insertBefore('.accordion-list');
		$('.social-updates-box').insertAfter('.breadcrumbs');
	}
	else {
		$('nav ul .mob-only ul').appendTo('.quick-links');
		$('.application-box').prependTo('.column-layout .right');
		$('.social-updates-box').prependTo('.column-layout .right');
	}
}

function moveFindCourse() {
    if (viewport().width <= 900) {
        // Move Course Search above Tile Items in mobile view 30052018
		$('.right .image-box').insertBefore('.left .tile-items');
	}
	else {
		$('.left .image-box').prependTo('.column-layout > .right');
	}
}

function moveBlueBox() {
	if (viewport().width <= 900) {
		$('.right .blue-box').insertBefore('.left .single-carousel');
	}
	else {
		$('.left .blue-box').prependTo('.column-layout:nth-child(2) > .right');
	}
}

function tabSelectWide(element) {

	var tab_id = element.attr('data-tab');

	$('.tab-content .content-item .course-grid .letter-content').removeClass('active');
	$('.tab-content .content-item .letter-row .letter').removeClass('active');
	$('.tab-content .content-item .letter-row .letter:first-child').addClass('active');
	$('.tab-list li').removeClass('active');
	$('.tab-list li').attr("aria-selected", "false");
	$('.tab-content .content-item').removeClass('active');

	element.addClass('active');
	element.attr("aria-selected", "true");
	$("#" + tab_id).addClass('active');

	$('.content-item.active').find('.course-grid .letter-content:first').addClass('active');

	$(".tab-content .content-item .letter-row .letter").attr("tabindex", "-1");
	$(".tab-content .content-item.active .letter-row .letter").attr("tabindex", "0");
}

function tabSelectNarrow(element) {

	element.next('.content-item').find('.course-grid .letter-content').removeClass('active');
	element.next('.content-item').find('.letter-row .letter').removeClass('active');
	element.next('.content-item').find('.letter-row .letter:first-child').addClass('active');
	element.next('.content-item').find('.course-grid .letter-content:first').addClass('active');

	if (!element.hasClass('active')) {
		element.addClass('active');
		element.attr("aria-expanded", "true");
		element.next('.content-item').find('.letter-row .letter').attr("tabindex", "0");
		element.next().stop().slideDown(300);
	}
	else {
		element.next('.content-item').find('.letter-row .letter').attr("tabindex", "-1");
		element.removeClass('active');
		element.attr("aria-expanded", "false");
		element.next().stop().slideUp(300);
	}
}

function selectLetter(element) {

	var letter_id = element.attr('data-letter'),
		$contentItem = element.closest('.content-item');

	$contentItem.find('.letter-row .letter').removeClass('active');
	$contentItem.find('.course-grid .letter-content').removeClass('active');

	element.addClass('active');
	$contentItem.find('.course-grid .letter-content[data-id=' + letter_id + ']').addClass('active');
}

function tabs() {

	$('.tab-content .content-item').each(function () {
		var $tab = $(this),
		id = $tab.attr('id');

		if (viewport().width <= 900) {
			$tab.insertAfter('.tab-list li[data-tab=' + id + ']');
		}
	});

	$('.tab-list .content-item').each(function () {
		if (viewport().width >= 901) {
			$('.tab-list .content-item').appendTo('.tab-content');
		}
	});


	//Letter bar inside tabs
	$('.letter-row .letter').click(function () {
		selectLetter($(this));
	});

	$(".letter-row .letter").on("keydown", function (event) {
		if (event.key == "Enter") {
			selectLetter($(this));
			event.preventDefault();
		}
	});

	//Staff profile popup
	function OpenCloseStaffProfile($this) {

		var $container = $this.parent();

		if (!$container.hasClass('open')) {
			$('.staff-item .image').removeClass('open');
			$container.addClass('open');
			$container.find("a").attr("tabindex", "0");
		}
		else {
			$container.removeClass('open');
			$container.find("a").attr("tabindex", "-1");
		}
    }

	$('.staff-item .popup-btn').keypress(function (event) {
		if (event.key == "Enter") {
			OpenCloseStaffProfile($(this));
			event.preventDefault();
		}
	});

	$('.staff-item .popup-btn').click(function () {
		OpenCloseStaffProfile($(this));
	});

	$('.staff-item .close-popup, .staff-item .close-x').click(function () {
		$('.staff-item .image').removeClass('open');
	});

	$('.contact-details .view-profile').on('keydown', function (event) {
		if (!event.shiftKey && event.key == "Tab") {
			var bluePopup = $(this).closest(".blue-popup");
			OpenCloseStaffProfile(bluePopup);
		}
	});

	$('.contact-details .first-button').on('keydown', function (event) {
		if (event.shiftKey && event.key == "Tab") {
			var bluePopup = $(this).closest(".blue-popup");
			OpenCloseStaffProfile(bluePopup);
		}
	});

	if (viewport().width >= 901) {
		if (!$('.tab-list li').hasClass('active')) {
			$('.tab-list li:first-child').addClass('active');
			$('.tab-content .content-item:first-child').addClass('active');
			$('.tab-content .content-item .letter-row .letter:first-child').addClass('active');
			$('.tab-content .content-item .letter-content:first-child').addClass('active');
			$('.tab-content .content-item').removeAttr('style');
		}

		$(".tab-content .content-item.active .letter-row .letter").attr("tabindex", "0");

		$('.tab-list li').click(function () {
			tabSelectWide($(this));
		});

		$(".tab-list li").on("keydown", function (event) {
			if (event.key == "Enter") {
				tabSelectWide($(this));
				event.preventDefault();
			}
		});
	}
	else {

		$('.tab-list li').click(function () {
			tabSelectNarrow($(this));
		});

		$(".tab-list li").on("keydown", function (event) {
			if (event.key == "Enter") {
				tabSelectNarrow($(this));
				event.preventDefault();
			}
		});
	}
}

function moveSearchBox() {
	if (viewport().width <= 900) {
		$('.search-area .search-box').prependTo('.main-content');
	}
	else {
		$('.search-box').appendTo('.search-area');
	}
}

function moveFilters() {
	if (viewport().width <= 900) {
		$('.social-filter li').appendTo('.overlay-filter ul');
	}
	else {
		$('.overlay-filter ul li').appendTo('.social-filter');
	}
}

function OpenCloseFooterLink($this) {
	if (!$this.hasClass('open')) {
		$this.addClass('open');
		$this.siblings('ul').stop().slideDown(400);
	}
	else {
		$this.removeClass('open');
		$this.siblings('ul').stop().slideUp(400);
	}
}

function footerLinks() {

	$('footer h2').attr("tabindex", "0")

	$('footer h2').click(function () {
		OpenCloseFooterLink($(this));
	});

	$('footer h2').keypress(function (event) {
		if (event.key == "Enter") {
			OpenCloseFooterLink($(this));
			event.preventDefault();
		}
	});
}

// create social networking pop-ups
(function () {
	// link selector and pop-up window size
	var Config = {
		Link: "a.share",
		Width: 500,
		Height: 500
	};

	// add handler links
	var slink = document.querySelectorAll(Config.Link);
	for (var a = 0; a < slink.length; a++) {
		slink[a].onclick = PopupHandler;
	}

	// create popup
	function PopupHandler(e) {

		e = (e ? e : window.event);
		var t = (e.target ? e.target : e.srcElement);

		// popup position
		var
			px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
			py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);

		// open popup
		var popup = window.open(t.href, "social",
			"width=" + Config.Width + ",height=" + Config.Height +
			",left=" + px + ",top=" + py +
			",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
		if (popup) {
			popup.focus();
			if (e.preventDefault) e.preventDefault();
			e.returnValue = false;
		}

		return !!popup;
	}

}());


//START webp image fallback check
//Note: This is set up so that if an element has a background-image (or src if <img>) set to webp, a fallback image can be added for browsers that don't support webp
//1. Set an elements background-image/src to webp image
//2. Give that element an attribute 'data-webp-fallback' with the fallback image url
//3. webpImageFallbackCheck() called on load
function webpImageFallbackCheck() {
	//Creates arry of ele with data attribute

	var aryElementsWithFallback = $('[data-webp-fallback]');

	//If any exist, a check is done with Modernizr to see if webp is supported https://modernizr.com/docs/
	if (aryElementsWithFallback.length > 0) {
		Modernizr.on('webp', function (result) {

			if (!result) {
				//If unsupported images are swapped out to fallback
				aryElementsWithFallback.each(function () {
					initWebpFallback($(this));
				});
			}
		});
	}

	function initWebpFallback(el) {

		var webpFallback = el.attr('data-webp-fallback');


		//If its an img, change the src, else change background-image
		//TODO: More exceptions may need adding here
		if (el.prop('nodeName').toLowerCase() === 'img') {
			el.attr("src", webpFallback)
		} else {
			el.css('background-image', 'url(' + webpFallback + ')');
		}

	}

}

//END webp image fallback check