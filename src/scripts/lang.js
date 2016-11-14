/// --------------------------------------------------------
/// Набор утилит для человекопонятного представления текста.
/// --------------------------------------------------------
!(function() {

	/**
	 * Возвращает слово в падеже, зависящем от указаного числа.
	 * @param  {Integer} number Число.
	 * @param  {String}  one    Один 'слон'.
	 * @param  {String}  two    Два 'слона'.
	 * @oarma  {String}  five   Пять 'слонов'.
	 * @return {String}         Нужная форма слова.
	 */
	function numberWord(number, one, two, five) {
		if (number >= 11 && number <= 14) {
			return five;
		}

		var mod = number % 10;

		if (mod === 1) {
			return one;
		}

		if (mod >= 2 && mod <= 4) {
			return two;
		}

		return five;
	}

	// Экспорт методов.
	window.lang = {};
	window.lang.numberWord = numberWord;

})();