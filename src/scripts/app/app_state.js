/// ------------------------------
/// Механизм состояний приложения.
/// ------------------------------
!(function($) {

	/**
	 * Создает экземпляр класса.
	 * @param {Object} data Параметры приложения.
	 */
	function AppState(data) {

		/**
		 * Заголовок страницы.
		 * @type {String}
		 */
		this.title = null;

		/**
		 * Данные приложения.
		 * @type {AppData}
		 */
		this.data = data;

		/**
		 * Имя состояния.
		 * @type {String}
		 */
		this.state = null;

		/**
		 * Короткий псевдоним состояния.
		 * @type {String}
		 */
		this.alias = null;

		/**
		 * Имя шаблона для состояния.
		 * @type {String}
		 */
		this.template = null;

		/**
		 * Имя дополнительного шаблона для состояния.
		 * @type {String}
		 */
		this.subTemplate = null;

		// Задаем title.
		if (this.data.subject) this.title = 'Выбор ' + this.data.subject;
		else this.title = 'Помощник в принятии решений 1.0';
	}

	/**
	 * Наследует указанный класс от AppState.
	 * @param {Function} type Класс.
	 */
	AppState.inherit = function(type) {
		type.prototype = Object.create(this.prototype);
		type.prototype.contructor = type;
		type.inherit = this.inherit;
	};

	/**
	 * Создает экземпляр состояния на основе строки.
	 * @return {AppState} Модель состояния или null, если произошла
	 *                    ошибка валидации.
	 */
	AppState.create = function(string) {
		if (!string) string = 'p=s';

		var items = string.split('&');
		var params = {};

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (!item) continue;

			item = item.split('=');

			var name = item[0];
			var value = item[1];
			if (value == null) continue;

			params[name] = value;
		}

		var state = params['p'] || 's';
		var model = null;
		var data = new AppData(params);

		if (state === 's') model = new AppStateSubject(data);
		if (state === 'o') model = new AppStateObjects(data);
		if (state === 'c') model = new AppStateCrits(data);
		if (state === 'cc') model = new AppStateCmpCrits(data);
		if (state === 'co') model = new AppStateCmpObjects(data);
		if (state === 'r') model = new AppStateResult(data);

		var isError = model._fromParams(params);
		return isError ? null : model;
	};

	/**
	 * Восстанавливает модель из параметров.
	 * @param {Object} params Параметры.
	 */
	AppState.prototype._fromParams = function(params) {};

	/**
	 * Обновляет состояние указанным значением.
	 * @param  {Mixed} value Значение.
	 * @return {State}       Текущее состояние.
	 */
	AppState.prototype.update = function(value) {
		return this;
	};

	/**
	 * Получает модель следующего состояния.
	 * @return {State} Модель состояния.
	 */
	AppState.prototype.next = function() {
		return null;
	};

	/**
	 * Получает модель предыдущего состояния.
	 * @return {State} Модель состояния.
	 */
	AppState.prototype.prev = function() {
		return null;
	};

	/**
	 * Запаковывает модель в строку.
	 * @return {String} Строка.
	 */
	AppState.prototype.toString = function() {
		var data = this.data.toString();
		var result = 'p=' + this.alias;

		if (data) result += '&' + data;
		return result;
	};

	// Экспорт класса.
	window.AppState = AppState;

})(window.jQuery);