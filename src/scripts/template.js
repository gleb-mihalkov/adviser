/// ------------------------
/// Механизм смены шаблонов.
/// ------------------------
!(function($) {

	/**
	 * Создает функцию генерации текста для указанного кода шаблона.
	 * @param  {String}   text Код шаблона.
	 * @return {Function}      Функция генерации текста.
	 */
	function create(text) {
		text = ' ' + text;

		var list = text.split(/<\?|\?>/g);
		var code = "var $ = window.jQuery, __result__ = '';\n";

		for (var i = 0; i < list.length; i++) {
			var item = list[i];

			if (i % 2 === 0) {
				item = item.replace(/"/g, '\\"').replace(/\n/g, " ");
				code += "__result__ += \"" + item + "\";\n";
				continue;
			}

			if (item.charAt(0) === '=') {
				item = item.substr(1).replace(/;\s*$/g, '');
				code += "__result__ += $.template._echo(" + item + ");\n";
				continue;
			}

			code += item;
		}

		code += 'return __result__;';

		var fn = new Function('$0, $1, $2, $3, $4, $5', code);
		return fn;
	}

	/**
	 * Возвращает строку, соответствующую значению.
	 * @param  {Mixed}  value Значение.
	 * @return {String}       Строка.
	 */
	function echo(value) {
		return value == null || value === false ? '' : value;
	}

	/**
	 * Возвращает текст, сгенерированный шаблоном.
	 * @param  {String} selector Селектор элемента, содержащего код шаблона.
	 * @return {String}          Результат выполнения шаблона.
	 */
	function template(selector) {
		var $node = $(selector);
		var fn = $node.data('template');

		if (fn == null) {
			var code = $node.html();
			fn = create(code);
			$node.data('template', fn);
		}

		var args = Array.prototype.slice.call(arguments, 1);
		return fn.apply(window, args);
	}

	// Экспорт функции.
	$.template = template;
	$.template._echo = echo;

})(window.jQuery);