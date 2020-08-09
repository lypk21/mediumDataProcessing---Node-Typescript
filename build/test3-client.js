"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var fs = require('fs');
var es = require('event-stream');
var test3_model_1 = require("./test3-model");
//maps structure, designed to match the desired data
var years = new typescript_map_1.TSMap();
var lineNum = 0;
var startTime = Date.now();
var s = fs.createReadStream('node-data-processing-medium-data.csv')
    .pipe(es.split(''))
    .pipe(es.mapSync(function (line) {
    s.pause();
    lineNum += 1;
    if (lineNum != 1 && line) {
        var lineArray = line.split(',');
        var orderDate = new Date(lineArray[5]);
        var shipDate = new Date(lineArray[7]);
        //once try moment.js, signal slow down to 25s, remove it and now run on 5s
        var diffDays = Math.floor((shipDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
        var year = orderDate.getFullYear().toString();
        var month = (orderDate.getMonth() + 1).toString();
        var regionName = lineArray[0];
        var countryName = lineArray[1];
        //with specific year, create it
        if (!years.has(year)) {
            years.set(year, new typescript_map_1.TSMap());
        }
        var months = years.get(year);
        //without monthCount instance, create it
        if (!months.has(month)) {
            months.set(month, new test3_model_1.MonthCount());
        }
        var monthCount = months.get(month);
        //plus ship days and calculating avg days and num of orders under month
        monthCount.addDiffDaysAndNumOfOrders(diffDays);
        //create or return exist country under region
        var country = monthCount.addRegionCountByRegionName(regionName);
        //create country if not exist, calculate count under country
        country.addCountByCountryName(countryName, diffDays);
        //calculate count under region
        country.addDiffDaysAndNumOfOrders(diffDays);
    }
    s.resume();
})
    .on('error', function (err) {
    console.log('Error while reading file.', err);
})
    .on('end', function () {
    console.log('begin to write, time: ', Date.now() - startTime);
    fs.writeFile('test3_output.json', JSON.stringify(years), function (err) {
        if (err)
            throw err;
        console.log('Data written to file, time: ', Date.now() - startTime);
    });
}));
//# sourceMappingURL=test3-client.js.map