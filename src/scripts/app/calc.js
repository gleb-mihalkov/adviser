/// -------------------------------------------
/// Набор математических утилит для приложения.
/// -------------------------------------------
!(function() {

	/**
	 * Получает количество сравнений между элементами.
	 * @param  {Integer} count Количество элементов
	 * @param  {Integer} base  Количество сравнений основных элементов.
	 * @return {Integer}       Количество попарных сравнений.
	 */
	function cmpCount(count, base) {
		var cmp = (count * count - count) / 2;
		if (!base) return cmp;
		if (!count) count = 1;
		return cmp + count * base;
	}

	/**
	 * Получает массив пар элементов для сравнения.
	 * @param  {Number} count  Количество элементов.
	 * @param  {Number} factor Количество повторений пар элементов.
	 * @return {Array}         Массив пар элементов.
	 */
	function getPairs(count, factor) {
		var isFactor = factor && factor > 0;
		if (!isFactor) factor = 1;

		var result = [];

		for (var k = 0; k < factor; k++) {
			for (var i = 0; i < count; i++) {
				for (var j = i + 1; j < count; j++) {
					result.push([i, j, k]);
				}
			}
		}

		return result;
	}

	/**
	 * Получает номера элементов сравнения.
	 * @param  {Number} index  Номер итерации сравнения.
	 * @param  {Number} count  Количество элементов для сравнения.
	 * @param  {Number} factor Количество повторений пар элементов.
	 * @return {Array}         Пара номеров для сравнения.
	 */
	function getPair(index, count, factor) {
		var pairs = getPairs(count, factor);
		return pairs[index];
	}

	/**
	 * Возвращает массив весов каждого из объектов.
	 * @param  {Array} obj Массив объектов.
	 * @param  {Array} cmp Массив результатов сравнений.
	 * @return {Array}     Массив весов объекта.
	 */
	function getWeights(obj, cmp) {
		var result = new Array(obj.length);
		var pairs = getPairs(obj.length);

		for (var i = 0; i < pairs.length; i++) {
			var a = pairs[i][0];
			var b = pairs[i][1];
			var x = cmp[i] ? a : b;
			if (result[a] == null) result[a] = 0;
			if (result[b] == null) result[b] = 0;
			result[x]++;
		}

		for (var i = 0; i < result.length; i++) {
			result[i] = result[i] / obj.length + 1;
		}

		return result;
	}

	/**
	 * Сортирует объекты по популярности.
	 * @param  {Array} obj    Массив объектов.
	 * @param  {Array} crt    Массив критериев.
	 * @param  {Array} cmpObj Массив результатов сравнений объектов по каждому критерию.
	 * @param  {Array} cmpCrt Массив результатов сравнений критериев.
	 * @return {Array}        Массив номеров вариантов, отсортированных по популярности.
	 */
	function sort(obj, crt, cmpObj, cmpCrt) {
		var objWeights = null;
		var crtWeights = null;

		if (crt.length === 0) {
			objWeights = getWeights(obj, cmpObj);
		}
		else {
			var pairs = getPairs(obj.length, crt.length);

			var crtWeights = getWeights(crt, cmpCrt);
			var objWeights = new Array(obj.length);

			for (var i = 0; i < pairs.length; i++) {
				var a = pairs[i][0];
				var b = pairs[i][1];
				var x = cmpObj[i] ? a : b;
				var w = crtWeights[pairs[i][2]];

				if (objWeights[a] == null) objWeights[a] = 0;
				if (objWeights[b] == null) objWeights[b] = 0;
				objWeights[x] += w;
			}
		}

		var result = [];
		for (var i = 0; i < objWeights.length; i++) {
			result.push(i);
		}

		return result.sort(function(a, b) {
			return objWeights[b] - objWeights[a];
		});
	}

	// Экспорт методов.
	window.calc = {};
	window.calc.cmpCount = cmpCount;
	window.calc.getPair = getPair;
	window.calc.sort = sort;

})();