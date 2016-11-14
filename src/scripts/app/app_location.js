/// ----------------------------
/// Механизм истории приложения.
/// ----------------------------
!(function($) {

	/**
	 * Создает экземлпяр класса.
	 */
	function AppLocation() {
		this.isForce = false;
		this._bind();
	}

	/**
	 * Обравляет обработку событий.
	 */
	AppLocation.prototype._bind = function() {
		var self = this;

		function onChange(e) {
			var isForce = self.isForce;
			self.isForce = false;

			if (isForce) {
				e.stopImmediatePropagation();
				e.stopPropagation();
				return;
			}
		}

		$(window).on('hashchange', onChange);
	};

	/**
	 * Показывает, является ли указанный адрес возвратом назад.
	 * @param  {String}  uri Адрес.
	 * @return {Boolean}     True или false.
	 */
	AppLocation.prototype.isBack = function(uri) {
		// body...
	};

	/**
	 * Помещает указанный адрес в историю.
	 * @param {String} uri Адрес.
	 */
	AppLocation.prototype.history = function(uri) {
		// body...
	};

	/**
	 * Заменяет текущий адрес указанным.
	 * @param  {String} uri Адрес.
	 */
	AppLocation.prototype.replace = function(uri) {
		var current = window.location.hash.substr(1);
		if (uri.toString() === current) return;

		this.isForce = true;
		window.location.replace('#' + uri);
	};

	/**
	 * Переходит на указанный адрес.
	 * @param {String} uri Адрес.
	 */
	AppLocation.prototype.to = function(uri) {
		window.location.assign('#' + uri);
	};

	/**
	 * Показывает, может ли приложение перейти назад по истории.
	 * @return {Boolean} True или false.
	 */
	AppLocation.prototype.isCanBack = function() {
		return false;
	};

	/**
	 * Переходит назад по истории.
	 */
	AppLocation.prototype.back = function() {
		window.history.go(-1);
	};

	/**
	 * Задает данный адрес в качестве предыдущего в истории и переходит на него.
	 * @param {String} uri Адрес.
	 */
	AppLocation.prototype.forceBack = function(uri) {
		window.location.replace('#' + uri);
	};

	// Экспорт класса.
	window.AppLocation = AppLocation;

})(window.jQuery);