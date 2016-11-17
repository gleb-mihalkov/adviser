/// -----------------------------
/// Механизм роутинга приложения.
/// -----------------------------
!(function($) {
	if ($ == null) return console.warn('jQuery is required.');

	/**
	 * Создает экземпляр класса.
	 */
	function AppRouter() {
		this.onchange = bind(this, this.onchange);
		this._isForce = false;
		this._isBack = false;
		this.history = [];
	}

	/**
	 * Задает контекст выполнения для функции.
	 * @param  {Object}   scope Контекст выполнения.
	 * @param  {Function} fn    Функция.
	 * @return {Function}       Функция с постоянным контекстом выполнения.
	 */
	function bind(scope, fn) {
		return function() {
			return fn.apply(scope, arguments);
		};
	}

	/**
	 * Обрабатывает смену адреса страницы.
	 */
	AppRouter.prototype.onchange = function() {
		var isForce = this._isForce;
		this._isForce = false;
		if (isForce) return;

		var current = this.getCurrent();
		var last = this.history[this.history.length - 1];
		var isBack = current == last;
		console.log(this.history);
		if (!isBack) this.history.push(current); else this.history.pop();

		this._isBack = isBack;
		if (this.onroute) this.onroute(current);
		this._isBack = false;
	};

	/**
	 * Получает текущий адрес.
	 * @return {String} Текущий адрес.
	 */
	AppRouter.prototype.getCurrent = function() {
		return window.location.hash.substr(1);
	};

	/**
	 * Показывает, является ли указанный адрес текущим.
	 * @param  {String}  uri Адрес.
	 * @return {Boolean}     True или false.
	 */
	AppRouter.prototype.isCurrent = function(uri) {
		var current = this.getCurrent();
		return current == uri.toString();
	};

	/**
	 * Изменяет текущий адрес страницы.
	 * @param {String}  uri     Адрес.
	 * @param {Boolean} isRoute	Показывает, следует ли вызывать обработку нового адреса.
	 */
	AppRouter.prototype._replace = function(uri, isRoute) {
		if (this.isCurrent(uri)) return;

		this.history[this.history.length - 1] = uri;
		this._isForce = !isRoute;
		window.location.replace('#' + uri);
	};

	/**
	 * Изменяет текущий адрес страницы.
	 * @param {String} uri Адрес.
	 */
	AppRouter.prototype.replace = function(uri) {
		this._replace(uri, false);
	};

	/**
	 * Вызывает переход на указанную страницу.
	 * @param {String} uri Страница.
	 */
	AppRouter.prototype.to = function(uri) {
		if (this.isCurrent(uri)) return;
		window.location.assign('#' + uri);
	};

	/**
	 * Вызывает переход назад.
	 * @param {String} uri Страница.
	 */
	AppRouter.prototype.back = function(uri) {
		this._replace(uri, true);
	};

	/**
	 * Показывает, является ли текущий адрес адресом из истории.
	 * @return {Boolean} True или false.
	 */
	AppRouter.prototype.isBack = function(uri) {
		return this._isBack;
	};

	/**
	 * Запускает роутер.
	 */
	AppRouter.prototype.start = function() {
		$(window).on('hashchange', this.onchange);
		var uri = this.getCurrent();
		if (this.onroute) this.onroute(uri);
	};

	// Экспорт класса.
	window.AppRouter = AppRouter;

})(window.jQuery);