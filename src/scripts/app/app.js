/// -----------
/// Приложение.
/// -----------
!(function($) {

	/**
	 * Модель адреса приложения.
	 * @type {AppLocation}
	 */
	var router = new AppRouter();

	/**
	 * Текущее состояние приложения.
	 * @type {AppState}
	 */
	var state = null;

	/**
	 * Отображаемый глобальный шаблон.
	 * @type {String}
	 */
	var lastTemplate = null;

	/**
	 * Задает заголовок страницы.
	 * @param {String} title Заголовок.
	 */
	function setTitle(title) {
		var $title = $(document.head).find('[property="og:title"]');
		document.title = title;
		$title.attr('content', title);
	}

	/**
	 * Обрабатывает адрес страницы.
	 */
	function route(uri, isBack) {
		var effect = isBack ? 'back' : 'next';
		
		var $pgMain = $('#pgMain');
		var $pgSub = $('#pgSub');

		state = AppState.create(uri);
		var isError = state == null;

		if (isError) {
			/** @todo Страница 404. */
			throw new Error('Не доделал страницу 404.');
		}

		setTitle(state.title);

		var template = state.template;
		var subTemplate = state.subTemplate;
		var isNewTemplate = $pgSub.length > 0 && template !== lastTemplate;
		var page = null;

		if (isNewTemplate) $pgSub = null;
		lastTemplate = template;

		if (subTemplate) {
			if ($pgSub == null || $pgSub.length === 0) {
				var main = $.template(template, state, state.data);
				var sub = $.template(subTemplate, state, state.data);
				var $main = $(main);

				$main.find('#pgSub').page(sub);
				$pgMain.page($main, effect);
				$pgSub = $('#pgSub');
			}
			else {
				page = $.template(subTemplate, state, state.data);
				$pgSub.page(page, effect);
			}
		}
		else {
			page = $.template(template, state, state.data);
			$pgMain.page(page, effect);
		}
	}

	/**
	 * Обрабатывает отправку форм.
	 * @param {Event} e Событие.
	 */
	function post(e) {
		e.preventDefault();

		var value = e.list ? e.list : e.value;
		state.update(value);
		router.replace(state);

		var next = state.next();
		router.to(next);
	}

	/**
	 * Обрабатывает переход на предыдущее состояние.
	 * @param {Event} e Событие.
	 */
	function back(e) {
		e.preventDefault();
		var prev = state.prev();
		router.back(prev);
	}

	// Привязка событий.
	router.onroute = route;
	router.start();

	$(document)
		.on('click', '[type=back]', back)
		.on('submit', 'form', post);

})(window.jQuery);