// ECT based diet plugin for rendering Dynamic HTML files

// Dependencies
var fs = require('fs')
var ect = require('ect')
var merge = require('merge')
var clone = require('clone')

module.exports = function(options){
	
	var options = options || {}
	var renderer = ect(merge({ 
		root : options.path, 
		ext: '.html', 
		open: '{{', close: '}}',
		cache: true,
		watch: true,
		gzip: true,
	}, options))
	
	return function($){
		$.htmlModule = function(pathname){
			var path = pathname || 'index.html' 
			var context = merge(clone($, false, 1), $.data)
			var html = renderer.render(path, context)
			$.end(html)
		}
		$.return()
	}
}
