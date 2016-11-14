/// ----------------------------
/// Состояние показа результата.
/// ----------------------------
!(function() {

	/**
	 * Создает экземпляр класса.
	 */
	function AppStateResult(data) {
		AppState.call(this, data);

		this.state = 'result';
		this.alias = 'r';
		this.template = '#tpResult';

		this.order = [];

		this.title += ' - Результаты'
	}

	// Наследование.
	AppState.inherit(AppStateResult);

	/**
	 * Восстанавливает состояние из параметров.
	 * @param {Object} params Параметры.
	 */
	AppStateResult.prototype._fromParams = function(params) {
		AppState.prototype._fromParams.call(this, params);
		this.order = calc.sort(this.data.objects, this.data.crits, this.data.cmpObjects, this.data.cmpCrits);
		return false;
	};

	/**
	 * Возвращает следующее состояние.
	 * @return {AppStateObjects} Состояние.
	 */
	AppStateResult.prototype.prev = function() {
		var index = this.data.cmpObjects.length - 1;
		return new AppStateCmpObjects(this.data, index);
	};

	// Экспорт класса.
	window.AppStateResult = AppStateResult;

})();