/// -------------------------
/// Состояние ввода предмета.
/// -------------------------
!(function() {

	/**
	 * Создает экземпляр класса.
	 */
	function AppStateSubject(data) {
		AppState.call(this, data);

		this.state = 'subject';
		this.alias = 's';
		this.template = '#tpSubject';
	}

	// Наследование.
	AppState.inherit(AppStateSubject);

	/**
	 * Обновляет состояние значением.
	 * @param {String} value Предмет выбора.
	 */
	AppStateSubject.prototype.update = function(value) {
		this.data.subject = value;
		return this;
	};

	/**
	 * Возвращает следующее состояние.
	 * @return {AppStateObjects} Состояние.
	 */
	AppStateSubject.prototype.next = function() {
		return new AppStateObjects(this.data);
	};

	// Экспорт класса.
	window.AppStateSubject = AppStateSubject;

})();