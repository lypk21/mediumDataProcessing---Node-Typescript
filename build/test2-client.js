"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var fs = require('fs');
var es = require('event-stream');
var lineNum = 0;
var startTime = Date.now();
//maps structure, designed to match the desired data
var years = new typescript_map_1.TSMap();
var s = fs.createReadStream('node-data-processing-medium-data.csv')
    .pipe(es.split(''))
    .pipe(es.mapSync(function (line) {
    s.pause();
    lineNum += 1;
    if (lineNum != 1 && line) {
        var lineArray = line.split(',');
        var date = lineArray[5].split('/');
        var year = date[2];
        var month = date[0];
        var priorityType = lineArray[4];
        //with specific year, create it
        if (!years.has(year)) {
            years.set(year, new typescript_map_1.TSMap());
        }
        var months = years.get(year);
        //without month, create it
        if (!months.has(month)) {
            months.set(month, new typescript_map_1.TSMap());
        }
        var priority = months.get(month);
        //with priority, create it
        if (!priority.has(priorityType)) {
            //initial priority count 1
            priority.set(priorityType, 1);
        }
        else {
            //if exist, count + 1
            priority.set(priorityType, priority.get(priorityType) + 1);
            months.set(month, priority);
            years.set(year, months);
        }
    }
    s.resume();
})
    .on('error', function (err) {
    console.log('Error while reading file.', err);
})
    .on('end', function () {
    console.log('begin to write, time: ', Date.now() - startTime);
    fs.writeFile('test2_output.json', JSON.stringify(years), function (err) {
        if (err)
            throw err;
        console.log('Data written to file, time: ', Date.now() - startTime);
    });
}));
//# sourceMappingURL=test2-client.js.map