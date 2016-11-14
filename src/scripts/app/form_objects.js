/// ---------------------
/// Форма ввода объектов.
/// ---------------------
!(function($) {

	/**
	 * Обрабатывает отправку формы.
	 * @param {Event} e Событие.
	 */
	function onSubmit(e) {
		e.preventDefault();

		if (e.list.length === 0) {
			$('#ppErrorObjectsLength').popup();
			e.stopImmediatePropagation();
			return false;
		}

		if (e.list.length === 1) {
			$('#ppErrorObjectsOne').popup();
			e.stopImmediatePropagation();
			return false;
		}
	}

	// Привязка событий.
	$(document).on('submit', '.js-frm-obj', onSubmit);

})(window.jQuery);