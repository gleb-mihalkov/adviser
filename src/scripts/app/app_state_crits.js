/// -------------------------
/// Состояние ввода предмета.
/// -------------------------
!(function() {

	/**
	 * Создает экземпляр класса.
	 */
	function AppStateCrits(data) {
		AppState.call(this, data);

		this.state = 'crits';
		this.alias = 'c';
		this.template = '#tpCrits';

		this.title += ' - Ввод критериев';
	}

	// Наследование.
	AppState.inherit(AppStateCrits);

	/**
	 * Обновляет состояние значением.
	 * @param {String} value Список объектов.
	 */
	AppStateCrits.prototype.update = function(list) {
		var isChanges = this.data.crits && this.data.crits.length != list.length;
		if (isChanges) {
			this.data.cmpObjects = null;
			this.data.cmpCrits = null;
		}
		
		this.data.crits = list;
		return this;
	};

	/**
	 * Возвращает следующее состояние.
	 * @return {AppStateCrits} Состояние.
	 */
	AppStateCrits.prototype.next = function() {
		return this.data.crits && this.data.crits.length > 0
			? new AppStateCmpCrits(this.data)
			: new AppStateCmpObjects(this.data);
	};

	/**
	 * Возвращает предыдущее состояние.
	 * @return {AppStateSubject} Состояние.
	 */
	AppStateCrits.prototype.prev = function() {
		return new AppStateObjects(this.data);
	};

	// Экспорт класса.
	window.AppStateCrits = AppStateCrits;

})();