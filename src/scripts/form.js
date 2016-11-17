/// -------------------
/// Набор фич для форм.
/// -------------------
!(function($) {

	/**
	 * Обрабатывает нажатия клавиш на кнопку Submit.
	 * @param {Event} e Событие.
	 */
	function onTypeSubmit(e) {
		if (e.isDefaultPrevented()) return;
		if (e.key !== 'Enter') return;

		var $submit = $(e.target);
		var formId = $submit.attr('form');
		var $form = formId ? $('#' + formId) : $submit.closest('form');
		if ($form.length === 0) return;

		e.preventDefault();
		$form.submit();
	}

	/**
	 * Обрабатывает нажания на клавиши у групп элементов.
	 * @param {Event} e Событие.
	 */
	function onTypeTab(e) {
		if (e.isDefaultPrevented()) return;
		if (e.key !== 'Tab') return;
		var isBack = e.shiftKey;

		var $item = $(e.target);
		var group = $item.attr('tabindex');
		if (group == null) return;

		e.preventDefault();

		var $group = $('*[tabindex]');
		var index = 0;

		for (var i = 0; i < $group.length; i++) {
			if (e.target !== $group[i]) continue;
			index = i;
			break;
		}

		var next = index + (isBack ? -1 : 1) * 1;
		if (next < 0) next = $group.length - 1;
		if (next >= $group.length) next = 0;

		var $next = $group.eq(next);
		$next.focus();
	}

	// Привязка событий.
	$(document)
		.on('keydown', '[tabindex]', onTypeTab)
		.on('keydown', '[type=submit]', onTypeSubmit);

})(window.jQuery);