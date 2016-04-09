const fs = require('fs')
const t = require('assert')

const html = fs.readFileSync('test/test.html').toString()

global.document  = require('jsdom').jsdom(html)
global.window    = document.defaultView

const qs = s => document.querySelector(s)
const qsa = s => [].slice.call(document.querySelectorAll(s), 0)

const $ = require('../')

test('query by ID', () => {
    var selector = '#test1'
    var found = $(selector)
    t.equal(found[0], qs(selector))
})

test('query by class', () => {
    var selector = '.test1'
    var found = $(selector)
    t.equal(found[0], qs(selector))
})

test('query children', () => {
    var found = $('#test2 > li')
    t.equal(found.length, 4)
    t.equal(found[0], qs('#test2 > li'))
})

test('.text()', () => {
    var el = $('#test2 > li:nth-child(2)')
    t.equal(typeof el.text, 'function')
    t.equal(el.text(), '2')
})

test('.html()', () => {
    var selector = '#test2'
    var el = $(selector)
    var el2 = qs(selector)
    t.equal(typeof el.html, 'function')
    t.equal(el.html(), el2.innerHTML)
})

test('chaining', () => {
    var selector = '#test2'
    t.equal($(selector).eq(0).html(), qs(selector).innerHTML)
})

test('receive element', () => {
    var element = qs('#test2')
    var o = $(element)
    t.equal(o.length, 1)
    t.equal(o.get(0), element)
})

test('receive array of elements', () => {
    var collection = qsa('#test2 > li')
    var o = $(collection)
    t.equal(o.length, 4)
    t.deepEqual(o.get(), collection)
})

test('receive self', () => {
    var el = $('#test2')
    var el2 = $(el)
    t.equal(el[0], el2[0])
})

test('filter', () => {
    var collection = qsa('#test2 > li')
    var children = qsa('.container > .child')
    var o = $(collection).filter('.third')
    var o1 = $(children).filter('div')
    var o2 = $(collection).filter('li[data-index]')
    var o3 = $(collection).filter(':not(.third)')
    var o4 = $(collection).filter((el, i) => {
        return el.classList.contains('is-last')
    })

    t.equal(o.get(0), collection[2])
    t.equal(o1.text(), children[0].textContent)
    t.equal(o2.get(0), collection[1])
    t.equal(o3.length, 3)
    t.equal(o4.eq(0).html(), collection[3].innerHTML)
});

test('find', () => {
    var collection = qsa('.findme')
    var o = $('.container').find('.findme')

    t.equal(o.length, 2)
    t.deepEqual(o.get(), collection)
});