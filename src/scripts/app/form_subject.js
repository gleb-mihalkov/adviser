/// ---------------------
/// Форма ввода критериев.
/// ---------------------
!(function($) {

	/**
	 * Обрабатывает отправку формы.
	 * @param {Event} e Событие.
	 */
	function onSubmit(e) {
		e.preventDefault();

		if (!e.value) {
			$('#ppErrorSubject').popup();
			e.stopImmediatePropagation();
			return false;
		}
	}

	// Привязка событий.
	$(document).on('submit', '.js-frm-sbj', onSubmit);
	
})(window.jQuery);