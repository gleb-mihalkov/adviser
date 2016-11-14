/// -------------------------
/// Состояние ввода предмета.
/// -------------------------
!(function() {

	/**
	 * Создает экземпляр класса.
	 */
	function AppStateObjects(data) {
		AppState.call(this, data);

		this.state = 'objects';
		this.alias = 'o';
		this.template = '#tpObjects';

		this.title += ' - Ввод объектов';
	}

	// Наследование.
	AppState.inherit(AppStateObjects);

	/**
	 * Обновляет состояние значением.
	 * @param {String} value Список объектов.
	 */
	AppStateObjects.prototype.update = function(list) {
		var isChanges = this.data.objects && this.data.objects.length != list.length;
		if (isChanges) this.data.cmpObjects = null;

		this.data.objects = list;
		return this;
	};

	/**
	 * Возвращает следующее состояние.
	 * @return {AppStateObjects} Состояние.
	 */
	AppStateObjects.prototype.next = function() {
		return new AppStateCrits(this.data);
	};

	/**
	 * Возвращает предыдущее состояние.
	 * @return {AppStateSubject} Состояние.
	 */
	AppStateObjects.prototype.prev = function() {
		return new AppStateSubject(this.data);
	};

	// Экспорт класса.
	window.AppStateObjects = AppStateObjects;

})();