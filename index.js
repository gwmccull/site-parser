var $ = require('cheerio');
var request = require('request');
var knwl = require('knwl.js');

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

    console.log(html);
}

var domain = 'http://en.wikipedia.org/wiki/Biggs,_California';
request(domain, gotHTML);