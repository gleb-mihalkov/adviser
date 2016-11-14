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

		if (e.list.length === 1) {
			$('#ppErrorCritsLength').popup();
			e.stopImmediatePropagation();
			return false;
		}
	}

	// Привязка событий.
	$(document).on('submit', '.js-frm-crt', onSubmit);

})(window.jQuery);