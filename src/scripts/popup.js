/// -------------------------------
/// Механизм всплывающих сообщений.
/// -------------------------------
!(function($) {

	/**
	 * Контейнер всплывающих сообщений.
	 * @type {jQuery}
	 */
	var $body = $('body');

	/**
	 * Показывает всплывающее сообщение.
	 */
	$.fn.popup = function() {
		if (this.length === 0) return this;
		var $self = this;

		var data = $self.data('popup');
		if (data) return this;

		var remove = function() {
			$node.remove();
			$self.data('popup', null);
		};

		var hide = function() {
			$node.removeClass('active');
			var tm = setTimeout(remove, 250);
			$self.data('popup', tm);
		};

		var show = function() {
			$node.addClass('active');
			var tm = setTimeout(hide, 3000);
			$self.data('popup', tm);
		};

		var text = $.template($self);
		var $node = $(text);

		$body.prepend($node);
		setTimeout(show, 2);

		return this;
	};

})(window.jQuery);