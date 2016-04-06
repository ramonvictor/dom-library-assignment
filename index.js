var arr = [];

function rQuery(s) {
	var elements = getSelector(s);

	for (var i = 0; i < elements.length; i++) {
		this[i] = elements[i];
	}

	this.length = elements.length;
}

// Private
// ----------------
function getSelector(s) {
	return [].slice.call(document.querySelectorAll(s));
}

function extend(a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}

	return a;
}

// Public
// ----------------
var api = {
	get: function(index) {
		return this[index];
	},

	html: function() {
		return this.get(0).innerHTML;
	},

	text: function() {
		return this.get(0).textContent;
	}
};

// Extend useful array methods
api.forEach = arr.forEach;
api.reduce = arr.reduce;
api.push = arr.push;
api.sort = arr.sort;
api.splice = arr.splice;
api.indexOf = arr.indexOf;

// Extending rQuery
extend(rQuery.prototype, api);

// Exports
// ----------------
module.exports = function(s) {
	return new rQuery(s);
};
