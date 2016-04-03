// $(selector)
// $(selector).text()
// $(selector).html()


function init(s) {
	return new rQuery(s);
}

function rQuery(s) {
	this.elements = this.query(s);

	return this.elements;
}

rQuery.prototype.query = function(s) {
	return [].slice.call(document.querySelectorAll(s));
}

rQuery.prototype.html = function() {
	return this.elements[0].innerHtml;
};

module.exports = init;


