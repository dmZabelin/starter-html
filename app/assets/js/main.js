jQuery(function ($) {
	"use strict";

	// SLIDERS
	var $mainSlider = $('.mainSlider');

	if ($mainSlider.length) {
		$mainSlider.slick({
			arrows: false,
			dots: true,
			fade: true,
			autoplay: true,
			autoplaySpeed: 3000,
			speed: 2500
		});
	}

	// Вызоб главного меню + Вызов меню мобильной версии
	$('.hamburger').on('click', function (e) {
		e.preventDefault();
		setTimeout(function () {
			$('.hamburgerWrap').addClass('hamburgerClose');
		}, 750);
		$('.menuMain').addClass('menuMain-show');
		$('body').addClass('hidden');
	});

	$('.close').on('click', function () {
		$('.hamburgerWrap').removeClass('hamburgerClose');
		$('.menuMain').removeClass('menuMain-show');
		$('body').removeClass('hidden');
	});

	// Расписание Богослужений
	var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
	var d = new Date();
	var x = d.getDay();
	var f = $('.scheduleItem__calendar_' + days[x]);

	$('.scheduleItem').find(f).css('display', 'block');

	// Scroll Bar Style
	$.fn.wrapFoBaron = function (options) {
		options = $.extend({
			root: '.scroller_wrap',
			barOnCls: 'baron'
		}, options);

		var make = function () {

			$(document).ready(function () {

				$(options.root).each(function () {
					$(this).wrapInner('<div class="scroller__content"></div>');
					$(this).wrapInner('<div class="scroller"></div>');
					$(this).append('<div class="scroller__bar-wrapper"><div class="scroller__bar"></div></div>');
				});

				var params = {
					root: options.root,
					scroller: '.scroller',
					bar: '.scroller__bar',
					barOnCls: options.barOnCls
				};

				var scroll = baron(params);

				check_size();
				check_size();

				function check_size() {
					$(options.root).each(function () {
						if ($(this).find('.scroller__content').height() <= $(this).height()) {
							$(this).find('.scroller__bar-wrapper').hide();
							$(this).find('.scroller').addClass('.with-scroll');
						} else {
							$(this).find('.scroller').removeClass('.with-scroll');
						}
					});
				}
			})
		};
		return make();
	};
	$(document).wrapFoBaron({
		root: '.uncosAll',
		barOnCls: 'baron'
	});


	// Аккардеон "Ответ - вопрос"
	$('.answersInfo__close').on('click', function (e) {
		e.preventDefault();
		$(this).parent().find('.answersInfo__answer').slideToggle('slow');
		$(this).find('i.fas').toggleClass('active');
	});


	// Скролл эффекты
	$(window).scroll(function () {

		var topOfWindow = $(window).scrollTop();

		$('.schedule').each(function () {
			var aMenu = $(this).offset().top;
			if (aMenu < topOfWindow) {
				$('.menuFixed').addClass('menuFixed-show');
			} else if (aMenu > topOfWindow) {
				$('.menuFixed').removeClass('menuFixed-show');
			}
		});
	});

	// Sub Menu open-close
	$('.subMenu').parent().find('> a').addClass('angle-open');

	var menuLink = $('a.angle-open');

	menuLink.on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('angle-close');
		$(this).parent().find('.subMenu').slideToggle('slow');

	})
});