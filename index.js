var arr = [];

function rQuery(option) {
	var elements = getElements(option);

	if (typeof elements === 'undefied') {
		throw new Error('[rQuery] invalid argument: ' + option);
	}

	// Mimic array
	for (var i = 0; i < elements.length; i++) {
		this[i] = elements[i];
	}

	this.length = elements.length;
}

// Public
// ----------------
var api = {
	get: function(index) {
		if (typeof index === 'undefined') {
			return [].slice.call(this);
		}

		return this[index];
	},

	eq: function(index) {
		return new rQuery(this[index]);
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

// Private
// ----------------
function getSelector(s) {
	return [].slice.call(document.querySelectorAll(s));
}

function getElements(arg) {
	var list;

	if (typeof arg === 'object') {
		if (arg.nodeType === 1) {
			list = [arg];
		} else if (arg instanceof rQuery){
			list =  arg;
		} else if (isNodeList(arg)) {
			list = [].slice.call(arg);
		}
	} else if(typeof arg === 'string') {
		list = getSelector(arg);
	}

	return list;
}

function isNodeList(object) {
	var result = Object.prototype.toString.call(object);

	// '[object Array]' condition is added here
	// to accept the way jsdom understands NodeList.
	if (result === '[object HTMLCollection]' ||
		result === '[object NodeList]' ||
		result === '[object Array]') {
		return true;
	}

	return false;
}

function extend(a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}

	return a;
}

// Exports
// ----------------
module.exports = function(s) {
	return new rQuery(s);
};
