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

	/**
	 * Обрабатывает нажатия клавиш на радио-кнопках.
	 * @param {Event} e Событие.
	 */
	function onType(e) {
		var isMod = e.shiftKey || e.ctrlKey;
		var isEnter = e.key === 'Enter';

		if (isEnter) {
			e.preventDefault();
			var $item = $(e.target);
			$item.prop('checked', true);

			if (isMod) {
				var $form = $item.closest('.js-frm-cp');
				$form.submit();
				return;
			}
			return;
		}
	}

	// Привязка обработчиков.
	$(document)
		.on('keydown', '.js-frm-cp__vl', onType)
		.on('submit', '.js-frm-cp', onSubmit);

})(window.jQuery);