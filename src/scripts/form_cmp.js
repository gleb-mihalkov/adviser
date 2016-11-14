/// ----------------------------------------
/// Обработка формы сравнения.
/// ----------------------------------------
!(function($) {
	if ($ == null) return console.warn('jQuery is required.');

	/**
	 * Обрабатывает отправку формы.
	 * @param {Event} e Событие.
	 */
	function onSubmit(e) {
		e.preventDefault();

		var $form = $(e.target);
		var $value = $form.find('.js-frm-cp__vl:checked');
		var value = $value.val();

		e.value = value;
	}

	// Привязка обработчиков.
	$(document)
		.on('submit', '.js-frm-cp', onSubmit);

})(window.jQuery);