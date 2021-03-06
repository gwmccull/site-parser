/* Date Parser */
function Dates(knwl) {
    
    this.languages = {
        'english': true,
    };
    
    this.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    this.monthAbbrs = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
    this.holidays = [
        ['thanksgiving'],
        ['christmas'],
        ['new', 'years'],
        ['july', '4th'],
        ['halloween'],
        ['april', 'fools']
    ];
    this.holidaysD = [
        [28, 11],
        [25, 12],
        [1, 1],
        [4, 7],
        [31, 10],
        [1, 4]
    ];
    this.dateObj = new Date();
    this.constructDateObj = function(year, month, day) {
        return {
            year: year,
            month: month,
            day: day,
            preview: null
        };
    };
    
    this.getDay = function(word) {
    if (typeof word !== 'undefined'){
        if (parseInt(word.replace(/[^0-9\.]+/g, "")) > 0 && parseInt(word.replace(/[^0-9\.]+/g, "")) < 32) {
            return parseInt(word);
            }
        }
    };
    this.getMonth = function(word, type) {
        if (!isNaN(word) && type === 'mdy') {
            return parseInt(word);
        } else {
            for (var i = 0; i < dates.months.length; i++) {
                if (dates.months[i] === word) {
                    return i + 1;
                }
            }
            for (var i = 0; i < dates.monthAbbrs.length; i++) {
                if (dates.monthAbbrs[i] === word) {
                    return i + 1;
                }
            }
        }
    };
    this.calls = function() {
    
    var words = knwl.words.get('words');
    var wordsWithPunc = knwl.words.get('linkWords');
    var results = [];
    
        //for dates like "july 16th 1999" one
        var dateObj = {};
        for (var i = 0; i < words.length; i++) {
    
            var month = dates.getMonth(words[i]);
            if (month !== undefined) {
                var day = dates.getDay(words[i + 1]);
                if (day !== undefined) {
                    if (day > 0 && day < 32) {
                        if (!isNaN(words[i + 2]) && words[i + 2] !== "") {
                            var year = parseInt(words[i + 2]);
                            if (year > 32 && year < 10000) {
                                dateObj = dates.constructDateObj(year, month, day);
                                dateObj.preview = knwl.tasks.preview(i);
                                dateObj.found = i;
                            }
                        } else {
                            dateObj = dates.constructDateObj(dates.dateObj.getFullYear(), month, day);
                            dateObj.preview = knwl.tasks.preview(i);
                            dateObj.found = i;
                        }
                    }
                    results.push(dateObj);
                }
            }
    
        }
    
        //for dates like "7/16/1999" two
        var dateObj = {};
        for (var i = 0; i < words.length; i++) {
            var word = words[i].replace("(", ""); //remove parenth--- if they are present
            var word = word.replace(")", ""); //remove parenth--- if they are present
            var testDate = word.split("/");
            if (testDate.length === 3) {
                var isAllNums = 0;
                for (var z = 0; z < testDate.length; z++) {
                    if (!isNaN(testDate[z]) && testDate[z] !== "") {
                        isAllNums++;
                    }
                }
                if (isAllNums === 3) {
    
                    var month = dates.getMonth(testDate[0], 'mdy');
                    var day = dates.getDay(testDate[1]);
                    var year = parseInt(testDate[2]);
                    dateObj = dates.constructDateObj(year, month, day);
                    dateObj.preview = knwl.tasks.preview(i);
                    dateObj.found = i;
                    results.push(dateObj);
                }
            }
    
        }
    
        //for dates like "24th of december" three
        var dateObj = {};
        for (var i = 0; i < words.length; i++) {
            if (words[i + 1] === "of") {
                if (words[i + 2] !== undefined) {
    
                    var day = dates.getDay(words[i]);
                    var month = dates.getMonth(words[i + 2]);
                    var year = dates.dateObj.getFullYear();
    
                    if (month !== undefined && day !== undefined) { //make sure month and day defined
                        if (words[i + 3] !== undefined) { //words[i + 3] === years
                            if (!isNaN(words[i + 3])) {
                                if (words[i + 3] > 32 && words[i + 3] < 10000) {
                                    year = words[i + 3];
                                }
                            } else if (words[i + 3] === "on" || words[i + 3] === "in") {
                                if (words[i + 4] !== undefined) {
                                    if (!isNaN(words[i + 4])) {
                                        if (words[i + 4] > 32 && words[i + 4] < 10000) {
                                            year = words[i + 4];
                                        }
                                    }
                                }
                            } else {
                                for (var v = i; v > 0; v--) {
    
                                    if (!isNaN(words[v])) {
                                        if (words[v] > 32 && words[v] < 10000) {
                                            year = parseInt(words[v]);
                                            break;
                                        }
                                    } else if (wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "." || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "?" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "!" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === ";") {
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (var v = i; v > 0; v--) {
    
                                if (!isNaN(words[v])) {
                                    if (words[v] > 32 && words[v] < 10000) {
                                        year = parseInt(words[v]);
                                        break;
                                    }
                                } else if (wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "." || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "?" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === "!" || wordsWithPunc[v - 1][wordsWithPunc[v - 1].length - 1] === ";") {
                                    break;
                                }
                            }
                        }
                        dateObj = dates.constructDateObj(year, month, day);
                        dateObj.preview =  knwl.tasks.preview(i);
                        dateObj.found = i;
                        results.push(dateObj);
                    }
                } //finish check if month and day defined
            }
        }
        
        //for dates like "thanksgiving", "christmas", or "new years"
        var dateObj = {};
        for (var i = 0; i < words.length; i++) {
            for (var e = 0; e < dates.holidays.length; e++) {
                var curHol = dates.holidays[e];
                var pos = i;
                if (words[pos] === curHol[0]) {
                    for (var x = 0; x < curHol.length; x++) {
                        if (words[pos] === curHol[x]) {
                            if (x === curHol.length - 1) {
                                if (dates.dateObj.getMonth() <= dates.holidaysD[e][1] + 1) {
                                    dateObj = dates.constructDateObj(dates.dateObj.getFullYear(), dates.holidaysD[e][1], dates.holidaysD[e][0]);
                                    dateObj.preview = knwl.tasks.preview(i);
                                    dateObj.found = i;
                                } else {
                                    dateObj = dates.constructDateObj(dates.dateObj.getFullYear() + 1, dates.holidaysD[e][1], dates.holidaysD[e][0]);
                                    dateObj.preview = knwl.tasks.preview(i);
                                    dateObj.found = i;
                                }
                                results.push(dateObj);
                            }
                        }
                        pos++;
                    }
                }
    
            }
        }
    
        //for dates like "2013-12-15" (YMD)
        var dateObj = {};
        for (var i = 0; i < words.length; i++) {
            var temp = words[i].split(/[-]+/);
            if (temp.length === 3) {
                var numSets = 0;
                for (var x = 0; x < temp.length; x++) {
                    if (isNaN(temp[x]) === false) {
                        numSets++;
    
                    }
                }
                if (numSets === 3) {
                    if (temp[0].length === 4 && (temp[1].length === 2 || temp[1].length === 1) && (temp[2].length === 2 || temp[2].length === 1)) {
                        for (var x = 0; x < temp.length; x++) {
                            temp[x] = parseInt(temp[x]);
                        }
                        if (temp[1] > 0 && temp[1] < 13) {
                            if (temp[2] > 0 && temp[2] < 32) {
                                if (temp[0] > 0) {
                                    dateObj = dates.constructDateObj(temp[0], temp[1], temp[2]);
                                    dateObj.preview = knwl.tasks.preview(i, words);
                                    dateObj.found = i;
                                    results.push(dateObj);
                                }
                            }
                        }
    
                    }
                }
    
            }
        }
        return results;
    };
    var dates = this;
};

module.exports = Dates;