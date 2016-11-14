/// --------------------------
/// Форма сравнения вариантов.
/// --------------------------
!(function($) {

	/**
	 * Обрабатывает отправку формы.
	 * @param {Event} e Событие.
	 */
	function onSubmit(e) {
		e.preventDefault();

		if (!e.value) {
			$('#ppErrorCmp').popup();
			e.stopImmediatePropagation();
			return false;
		}
	}

	// Привязка событий.
	$(document).on('submit', '.js-frm-cp', onSubmit);

})(window.jQuery);