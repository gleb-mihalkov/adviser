/// -------------------------
/// Модель данных приложения.
/// -------------------------
!(function($) {

	/**
	 * Создает экземпляр класса.
	 * @param {Object} params Параметры состояния.
	 */
	function AppData(params) {
		this.subject = null;
		this.objects = null;
		this.crits = null;
		this.cmpObjects = null;
		this.cmpCrits = null;

		this._fromParams(params);
	}

	/**
	 * Кодирует значение для вставки в строку.
	 * @param  {String} value Значение.
	 * @return {String}       Результат.
	 */
	function encodeValue(value) {
		if (value == null) return null;
		return value;
	}

	/**
	 * Декодирует значение из строки.
	 * @param  {String} value Значение.
	 * @return {String}       Результат.
	 */
	function decodeValue(value) {
		if (value == null) return null;
		return value;
	}

	/**
	 * Кодирует массив значений в строку.
	 * @param  {Array}  array Массив.
	 * @return {String}       Экранированная строка.
	 */
	function encodeArray(array) {
		if (array == null) array = [];
		var result = '';

		for (var i = 0; i < array.length; i++) {
			var item = encodeValue(array[i]);
			result += ',' + item;
		}

		return result.substr(1);
	}

	/**
	 * Декодирует массив значений из строки.
	 * @param  {String} string Строка.
	 * @return {Array}         Массив экранированных строк.
	 */
	function decodeArray(string) {
		if (string == null) return null;
		
		var items = string.split(',');
		var result = [];

		for (var i = 0; i < items.length; i++) {
			var item = decodeValue(items[i]);
			if (!item) continue;

			result.push(item);
		}

		return result;
	}

	/**
	 * Кодирует массив логических значений в строку.
	 * @param  {Array}  array Массив логических значений.
	 * @return {String}       Строка.
	 */
	function encodeBooleans(array) {
		if (array == null) array = [];
		var result = '';

		for (var i = 0; i < array.length; i++) {
			var item = array[i] ? '1' : '0';
			result += item;
		}

		return result;
	}

	/**
	 * Декодирует строковое представление массива логических значений.
	 * @param  {String} string Строка.
	 * @return {Array}         Массив логических значений.
	 */
	function decodeBooleans(string) {
		if (string == null) return null;
		var result = [];

		for (var i = 0; i < string.length; i++) {
			var item = string.charAt(i);
			if (item !== '1' && item !== '0') continue;

			var char = item === '1' ? true : false;
			result.push(char);
		}

		return result;
	}

	/**
	 * Восстанавливает модель из коллекции параметров.
	 * @param {Object} params Параметры.
	 */
	AppData.prototype._fromParams = function(params) {
		this.subject = decodeValue(params['s']);
		this.objects = decodeArray(params['o']);
		this.crits = decodeArray(params['c']);
		this.cmpObjects = decodeBooleans(params['co']);
		this.cmpCrits = decodeBooleans(params['cc']);

		this.isCrits = this.crits == null || this.crits.length > 0;
	};

	/**
	 * Возвращает строковое представление модели.
	 * @return {String} Строковое представление модели.
	 */
	AppData.prototype.toString = function() {
		var result = '';

		if (this.subject !== null) {
			result += '&s=' + encodeValue(this.subject);
		}
		if (this.objects !== null) {
			result += '&o=' + encodeArray(this.objects);
		}
		if (this.crits !== null) {
			result += '&c=' + encodeArray(this.crits);
		}
		if (this.cmpObjects !== null) {
			result += '&co=' + encodeBooleans(this.cmpObjects);
		}
		if (this.cmpCrits !== null) {
			result += '&cc=' + encodeBooleans(this.cmpCrits);
		}

		return result.substr(1);
	};

	// Экспорт класса.
	window.AppData = AppData;

})(window.jQuery);