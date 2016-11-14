/// -----------------------
/// Обработка форм-списков.
/// -----------------------
!(function($) {
	if ($ == null) return console.warn('jQuery is required.');

	/**
	 * Обрабатывает отправку формы.
	 * @param {Event} e Событие.
	 */
	function onSubmit(e) {
		var $form = $(e.target);
		var $items = $form.find('input[name]');
		var list = [];

		for (var i = 0; i < $items.length; i++) {
			var item = $items.eq(i).val().replace(/^\s+|\s+$/g, '');
			if (item) list.push(item);
		}

		e.list = list;
	}

	/**
	 * Обрабатывает нажатие клавиши.
	 * @param {Event} e Событие.
	 */
	function onType(e) {
		var isDel = e.key === 'Delete' || e.key === 'Backspace';
		var isMod = e.ctrlKey || e.shiftKey;

		if (isDel) {
			var $value = $(e.target);
			var isRemove = isMod || !$value.val();

			if (isRemove) {
				e.preventDefault();
				onRemove(null, $value, true);
				return;
			}
		}

		var isEnter = e.key === 'Enter';

		if (isEnter) {
			if (submit(e)) return;

			e.preventDefault();
			onAdd(null, $(e.target));
			return;
		}

		var isDown = e.key === 'ArrowDown';
		var isUp = e.key === 'ArrowUp';
		var isMove = isUp || isDown;

		if (isMove) {
			e.preventDefault();
			var $value = $(e.target);
			focusMove($value, isDown);
			return;
		}
	}

	/**
	 * Принудительно отправляет форму при Shift|Ctrl+Enter.
	 * @param  {Event}   e Событие.
	 * @return {Boolean}   True, если форма отправлена, иначе false.
	 */
	function submit(e) {
		var isSubmit = e.key === 'Enter' && (e.shiftKey || e.ctrlKey);

		if (isSubmit) {
			e.preventDefault();
			var $form = $(e.target).closest('.js-frm-lst');
			$form.submit();
		}

		return isSubmit;
	}

	/**
	 * Обрабатывает события Tab элементов ввода.
	 * @param {jQuery}  $value  Элемент ввода, на котором сработало событие.
	 * @param {String}  isDown  Показывает, является ли обход обходом сверху вниз.
	 * @param {Boolean} isLoop  Показывает, является ли обход цикличным.
	 */
	function focusMove($value, isDown, isLoop) {
		var $item = $value.closest('.js-frm-lst__it');
		var $next = isDown ? $item.next() : $item.prev();
		var isEnd = !$next.hasClass('js-frm-lst__it');
		if (isEnd) return;

		var $value = $next.find('.js-frm-lst__vl'); 
		$value.focus();
	}

	/**
	 * Обрабатывает удаление элемента.
	 * @param {Event}   e       Событие.
	 * @param {jQuery}  $value  Элемент ввода, на котором сработало удаление.
	 *                          Используется при вызове метода вручную.
	 * @param {Boolean} isForce Отключает проверку на заполненное поле
	 *                          и сразу же удаляет его.
	 */
	function onRemove(e, $value, isForce) {
		var $item = null;

		if ($value == null) {
			$item = $(e.target).closest('.js-frm-lst__it');
			$value = $item.find('.js-frm-lst__vl');
			e.preventDefault();
		}
		else {
			$item = $value.closest('.js-frm-lst__it');
		}

		if (!isForce && $value.val()) {
			$value.val('');
			return;
		}

		var $form = $item.closest('.js-frm-lst');
		var isLast = $form.find('.js-frm-lst__it').length === 1;

		if (isLast) {
			$value.val('');
			return;
		}

		var $next = $item.prev();
		if (!$next.hasClass('js-frm-lst__it')) $next = $item.next();
		$next.find('.js-frm-lst__vl').focus();

		$item.remove();
	}

	/**
	 * Обрабатывает добавление элемента.
	 * @param {Event}  e      Событие.
	 * @param {jQuery} $value Элемент, на котором сработало добавление.
	 *                        Используется при вызове метода вручную.
	 */
	function onAdd(e, $value) {
		var $item = null;

		if ($value == null) {
			$item = $(e.target).closest('.js-frm-lst__it');			
			e.preventDefault();
		}
		else {
			$item = $value.closest('.js-frm-lst__it');
		}

		var $form = $item.closest('.js-frm-lst');

		var template = $form.attr('data-item');
		var title = $form.attr('data-item-title');
		var node = $.template(template, '', title);
		var $node = $(node);

		$node.insertAfter($item);
		$node.find('.js-frm-lst__vl').focus();
	}

	// Добавление обработчиков.
	$(document)
		.on('keydown', '.js-frm-lst__vl', onType)
		.on('click', '.js-frm-lst__rm', onRemove)
		.on('click', '.js-frm-lst__mk', onAdd)
		.on('submit', '.js-frm-lst', onSubmit);

})(window.jQuery);