var arr = [];
var filter = arr.filter;

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
rQuery.prototype.get = function(index) {
	if (typeof index === 'undefined') {
		return [].slice.call(this);
	}

	return this[index];
};

rQuery.prototype.eq = function(index) {
	return new rQuery(this.get(index));
};

rQuery.prototype.html = function() {
	return this.get(0).innerHTML;
};

rQuery.prototype.text = function() {
	return this.get(0).textContent;
};

rQuery.prototype.filter = function(arg) {
	var result = filter.call(this, function(el, i) {
		var matches = false;

		if (typeof arg === 'string') {
			matches = selectorMatches(el, arg);
		} else if (typeof arg === 'function') {
			matches = arg.call(this, el, i);
		}

		return matches;
	});

	return new rQuery(result);
};

rQuery.prototype.find = function(s) {
	var elements = [];
	var children;

	this.forEach(function(el) {
		children = [].slice.call(el.querySelectorAll(s));
		if (children.length > 0) {
			elements = elements.concat(children);
		}
	});

	return new rQuery(elements);
};


// Extend useful array methods
rQuery.prototype.forEach = arr.forEach;
rQuery.prototype.reduce = arr.reduce;
rQuery.prototype.push = arr.push;
rQuery.prototype.sort = arr.sort;
rQuery.prototype.splice = arr.splice;
rQuery.prototype.indexOf = arr.indexOf;

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

// Source: https://davidwalsh.name/element-matches-selector
function selectorMatches(el, selector) {
	var ep = typeof Element === 'object' ? Element.prototype : 0;
	var fn = function(s) {
		return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
	};

	if (ep) {
		fn = p.matches || p.webkitMatchesSelector ||
			p.mozMatchesSelector || p.msMatchesSelector || fn;
	}

	return fn.call(el, selector);
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

// Exports
// ----------------
module.exports = function(s) {
	return new rQuery(s);
};
