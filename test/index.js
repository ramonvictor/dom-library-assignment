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

// TODO: write test case
// test('filter')

// $('li').filter('.xxx')
// $('li').filter('input')
// $('li').filter('input[type=date]')
// $('li').filter(':not(input)')
// $('li').not('input')
// $('li').filter(function (el, i) {
//     return el.style.display !== 'block'
// }).eq(1).html()