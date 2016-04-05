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

// Public
// ----------------
rQuery.prototype = {
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
rQuery.prototype.forEach = arr.forEach;
rQuery.prototype.reduce = arr.reduce;
rQuery.prototype.push = arr.push;
rQuery.prototype.sort = arr.sort;
rQuery.prototype.splice = arr.splice;
rQuery.prototype.indexOf = arr.indexOf;


// Exports
// ----------------
module.exports = function(s) {
	return new rQuery(s);
};
