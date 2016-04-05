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
