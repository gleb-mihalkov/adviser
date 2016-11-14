/// ----------------------------------------
/// Обработка формы - ввода одного значения.
/// ----------------------------------------
!(function($) {
	if ($ == null) return console.warn('jQuery is required.');

	/**
	 * Обрабатывает нажатия клавиш в поле ввода.
	 * @param {Event} e Событие.
	 */
	function onType(e) {
		var isDel = e.key === 'Delete' || e.key === 'Backspace';
		var isMod = e.shiftKey || e.ctrlKey;
		var isClear = isMod && isDel;
		
		if (isClear) {
			e.preventDefault();
			onRemove(null, $(e.target));
			return;
		}

		var isEnter = e.key === 'Enter';

		if (isEnter) {
			e.preventDefault();
			var $form = $(e.target).closest('.js-frm-vl');
			$form.submit();
			return;
		}
	}

	/**
	 * Обрабатывает отправку формы.
	 * @param {Event} e Событие.
	 */
	function onSubmit(e) {
		e.preventDefault();

		var $form = $(e.target);
		var $value = $form.find('.js-frm-vl__vl');
		var value = $value.val();

		e.value = value;
	}

	/**
	 * Обрабатывает нажатие кнопки "Удалить".
	 * @param {Event}  e      Событие.
	 * @param {jQuery} $value Поле, на котором произошло событие.
	 *                        Используется при вызове метода вручную.
	 */
	function onRemove(e, $value) {
		if ($value == null) {
			e.preventDefault();
			$value = $(e.target).closest('.js-frm-vl').find('.js-frm-vl__vl');
		}

		$value.val('');
	}

	// Привязка обработчиков.
	$(document)
		.on('keydown', '.js-frm-vl__vl', onType)
		.on('click', '.js-frm-vl__rm', onRemove)
		.on('submit', '.js-frm-vl', onSubmit);

})(window.jQuery);