/// -------------------------------------
/// Форма с показом количества сравнений.
/// -------------------------------------
!(function($) {

	/**
	 * Обрабатывает обновление содержимого формы.
	 * @param {Event} e Событие.
	 */
	function change(e) {
		var $form = $(e.target).closest('.js-frm-cc');
		if ($form.length === 0) return;

		var $inputs = $form.find('input[name]');
		var count = 0;

		var base = $form.attr('data-cc') || 0;

		for (var i = 0; i < $inputs.length; i++) {
			var item = $inputs.eq(i).val().replace(/^\s+|\s+$/g, '');
			if (item) count++;
		}

		var cmpCount = window.calc.cmpCount(count, base);
		var cmpText = window.lang.numberWord(cmpCount, 'шаг', 'шага', 'шагов');
	
		$form.find('.js-frm-cc__cc').text(cmpCount);
		$form.find('.js-frm-cc__tt').text(cmpText);
	}

	// Привязка событий.
	$(document).on('change', '.js-frm-cc', change);

})(window.jQuery);