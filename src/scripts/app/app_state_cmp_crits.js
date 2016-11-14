/// -------------------------
/// Состояние ввода предмета.
/// -------------------------
!(function() {

	/**
	 * Создает экземпляр класса.
	 */
	function AppStateCmpCrits(data, index) {
		AppStateCmp.call(this, data, index);

		this.template = '#tpCmpCrits';
		this.subTemplate = '#tpCmpCritsItem';
		this.state = 'cmpCrits';
		this.alias = 'cc';
		this.cmpName = 'cmpCrits';

		this.title += ' - Сравнение критериев';
	}

	// Наследование.
	AppStateCmp.inherit(AppStateCmpCrits);

	/**
	 * Восстанавливает модель из коллекции параметров.
	 * @param  {Object}  params Параметры.
	 * @return {Boolean}        Возникла ли ошибка валидации.
	 */
	AppStateCmpCrits.prototype._fromParams = function(params) {
		AppStateCmp.prototype._fromParams.call(this, params);

		var count = this.data.crits.length;
		var length = calc.cmpCount(count);
		var values = calc.getPair(this.index, count);
		
		this.valueA = this.data.crits[values[0]];
		this.valueB = this.data.crits[values[1]];

		this.maxIndex = length - 1;
		
		return false;
	};

	/**
	 * Возвращает следующее состояние.
	 * @return {AppStateCmpCrits} Состояние.
	 */
	AppStateCmpCrits.prototype.next = function() {
		return this.index < this.maxIndex
			? new AppStateCmpCrits(this.data, this.index + 1)
			: new AppStateCmpObjects(this.data, 0);
	};

	/**
	 * Возвращает предыдущее состояние.
	 * @return {AppStateSubject} Состояние.
	 */
	AppStateCmpCrits.prototype.prev = function() {
		return this.index > 0
			? new AppStateCmpCrits(this.data, this.index - 1)
			: new AppStateCrits(this.data);
	};

	// Экспорт класса.
	window.AppStateCmpCrits = AppStateCmpCrits;

})();