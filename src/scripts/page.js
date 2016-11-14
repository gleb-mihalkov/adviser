/// -----------------------
/// Механизм смены страниц.
/// -----------------------
!(function($) {
	if ($ == null) return console.warn('jQuery is required.');

	/**
	 * Время выполнения эффекта смены страниц.
	 * @type {Number}
	 */
	var delay = 750;

	/**
	 * Вызывает смену страницы.
	 * @param {jQuery} $next  Страница.
	 * @param {String} effect Имя класса - эффекта смены страницы.
	 */
	$.fn.page = function($next, effect) {
		if (this.length === 0) return this;

		if (!($next instanceof jQuery)) $next = $($next);
		
		var $page = this;
		var $children = $page.children();
		var $prev = $children.first();

		if (effect == null || $children.length === 0) {
			$page.empty();
			$page.append($next);
			return this;
		}

		var data = $page.data('page');
		if (data) {
			clearTimeout(data.timeout);
			data.finish();
		}

		var finish = function() {
			$page.removeClass(effect);
			$next.removeClass('enter');
			$prev.remove();
			$page.data('page', null);
		};
		
		var timeout = setTimeout(finish, delay);
		$page.data('page', {
			timeout: timeout,
			finish: finish
		});

		$page.addClass(effect);
		$prev.addClass('leave');
		$next.addClass('enter');
		$page.append($next);

		return this;
	};

})(window.jQuery);