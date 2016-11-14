/// --------------------------------
/// Абстрактное состояние сравнения.
/// --------------------------------
!(function() {

	/**
	 * Создает экземпляр класса.
	 */
	function AppStateCmp(data, index) {
		AppState.call(this, data);

		/**
		 * Имя дополнительного шаблона.
		 * @type {String}
		 */
		this.subTemplate = null;

		/**
		 * Максимальный индекс итерации.
		 * @type {Number}
		 */
		this.maxIndex = null;

		/**
		 * Текущая итерация.
		 * @type {Number}
		 */
		this.index = index != null ? index : 0;

		/**
		 * Первый объект для сравнения.
		 * @type {String}
		 */
		this.valueA = null;

		/**
		 * Второй объект для сравнения.
		 * @type {String}
		 */
		this.valueB = null;

		/**
		 * Значение для итерации сравнения.
		 * @type {Boolean}
		 */
		this.value = null;

		/**
		 * Имя массива среди данных приложения,
		 * в который записываются результаты сравнения.
		 * @type {String}
		 */
		this.cmpName = null;
	}

	// Наследование.
	AppState.inherit(AppStateCmp);

	/**
	 * Восстанавливает модель из коллекции параметров.
	 * @param  {Object}  params Параметры.
	 * @return {Boolean}        Произошла ли ошибка валидации.
	 */
	AppStateCmp.prototype._fromParams = function(params) {
		AppState.prototype._fromParams.call(this, params);

		var index = params['i'] * 1;
		var isIndex = !isNaN(index);
		if (isIndex) this.index = index;

		var cmp = this.data[this.cmpName];
		if (cmp) this.value = cmp[this.index];

		return false;
	};

	/**
	 * Обновляет значения состояния.
	 * @param {Boolean} value Результат выбора.
	 */
	AppStateCmp.prototype.update = function(value) {
		value = value === '1';

		if (this.data[this.cmpName] == null) this.data[this.cmpName] = [];
		var cmp = this.data[this.cmpName];

		if (cmp[this.index] != null) cmp[this.index] = value;
		else cmp.push(value);

		return this;
	};

	/**
	 * Возвращает строковое представление объекта.
	 * @return {String} Строка.
	 */
	AppStateCmp.prototype.toString = function() {
		var result = AppState.prototype.toString.call(this);
		if (this.index > 0) result += '&i=' + this.index;
		return result;
	};

	// Экспорт класса.
	window.AppStateCmp = AppStateCmp;

})();