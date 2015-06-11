var $ = require('cheerio');
var request = require('request');
var Knwl = require("./lib/knwl.js/knwl.js");
//return;
var knwlInstance = new Knwl('english');
knwlInstance.register('places', require('./lib/knwl.js/default_plugins/places'));
//console.log(knwlInstance);
//return;


function gotHTML(err, resp, html) {
    if (err) return console.error(err);
    // var parsedHTML = $.load(html);
    // get all img tags and loop over them
    // var imageURLs = []
    // parsedHTML('a').map(function(i, link) {
    //     var href = $(link).attr('href')
    //     if (!href.match('.png')) return
    //     imageURLs.push(domain + href)
    // })

    //console.log(html);
    html = html.replace(/<[^>]*>/g, ' ');
    knwlInstance.init(html);
    var places = knwlInstance.get('places');
    console.log(places);
}

var domain = 'http://en.wikipedia.org/wiki/Biggs,_California';
request(domain, gotHTML);