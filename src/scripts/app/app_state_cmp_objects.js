/// -----------------------------
/// Состояние сравнения объектов.
/// -----------------------------
!(function() {

	/**
	 * Создает экземпляр класса.
	 */
	function AppStateCmpObjects(data, index) {
		AppStateCmp.call(this, data, index);

		this.template = '#tpCmpObjects';
		this.subTemplate = '#tpCmpObjectsItem';
		this.state = 'cmpObjects';
		this.alias = 'co';
		this.cmpName = 'cmpObjects';

		this.title += ' - Сравнение объектов';
	}

	// Наследование.
	AppStateCmp.inherit(AppStateCmpObjects);

	/**
	 * Восстанавливает модель из коллекции параметров.
	 * @param  {Object}  params Параметры.
	 * @return {Boolean}        Возникла ли ошибка валидации.
	 */
	AppStateCmpObjects.prototype._fromParams = function(params) {
		AppStateCmp.prototype._fromParams.call(this, params);

		var crtCount = this.data.isCrits ? this.data.crits.length : null;
		var objCount = this.data.objects.length;
		var length = calc.cmpCount(objCount);
		if (this.data.isCrits) length *= crtCount;

		var values = calc.getPair(this.index, objCount, crtCount);
		
		this.valueA = this.data.objects[values[0]];
		this.valueB = this.data.objects[values[1]];

		this.crit = this.data.isCrits ? this.data.crits[values[2]] : null;
		this.maxIndex = length - 1;
		this.step = this.data.cmpCritsLength + this.index + 1;

		if (this.data.isCrits) this.template += '?' + this.crit;
		return false;
	};

	/**
	 * Возвращает следующее состояние.
	 * @return {AppStateCmpObjects} Состояние.
	 */
	AppStateCmpObjects.prototype.next = function() {
		return this.index < this.maxIndex
			? new AppStateCmpObjects(this.data, this.index + 1)
			: new AppStateResult(this.data);
	};

	/**
	 * Возвращает предыдущее состояние.
	 * @return {AppStateSubject} Состояние.
	 */
	AppStateCmpObjects.prototype.prev = function() {
		if (this.index > 0) return new AppStateCmpObjects(this.data, this.index - 1);
		if (!this.data.isCrits) return new AppStateCrits(this.data);

		var crtCount = this.data.crits.length;
		var count = calc.cmpCount(crtCount);
		var index = count - 1;
		return new AppStateCmpCrits(this.data, index);
	};

	// Экспорт класса.
	window.AppStateCmpObjects = AppStateCmpObjects;

})();