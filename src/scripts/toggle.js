/// -------------------------------------
/// Кнопка скрытия / раскрытия чего-либо.
/// -------------------------------------
!(function($) {
	if ($ == null) return console.warn('jQuery is required.');

	/**
	 * Обрабатывает нажатие на кнопку.
	 * @param {Event} e Событие.
	 */
	function onToggle(e) {
		e.preventDefault();

		var $btn = $(e.target);
		var item = $btn.attr('data-toggle');
		var $item = $(item);

		$item.toggleClass('active');
		$btn.toggleClass('active');
	}

	// Привязка событий.
	$(document).on('click', '[data-toggle]', onToggle);
	
})(window.jQuery);
