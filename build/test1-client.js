"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test1_model_1 = require("./test1-model");
var fs = require('fs');
var es = require('event-stream');
var lineNum = 0;
var startTime = Date.now();
var regions = new test1_model_1.Region();
var s = fs.createReadStream('node-data-processing-medium-data.csv')
    .pipe(es.split(''))
    .pipe(es.mapSync(function (line) {
    s.pause();
    lineNum += 1;
    //ignore the first line and empty line
    if (lineNum != 1 && line) {
        var lineArray = line.split(',');
        //once try csv-parser or other csv component, signally slow down the running speed to 9s, remove them and speed up to 4s
        var revenue = Number(lineArray[11]);
        var cost = Number(lineArray[12]);
        var profit = Number(lineArray[13]);
        var regionName = lineArray[0];
        var countryName = lineArray[1];
        var productName = lineArray[2];
        var summary = new test1_model_1.Summary(revenue, cost, profit);
        // add items type under Regions
        regions.addItemType(productName, summary);
        //add countries to region,using map structure,if not exist, create country instance, return it back.
        var country = regions.addCountryByRegionName(regionName);
        //add total count under Countries
        country.addSummaryToTotal(summary);
        //add ItemTypes under Country and create itemTypes instance if not exist, return the instance back
        var itemType = country.addItemTypeByCountryName(countryName);
        //add total count under product
        itemType.addSummaryByProductName(productName, summary);
        //add total count under country
        itemType.addSummaryToTotal(summary);
    }
    s.resume();
})
    .on('error', function (err) {
    console.log('Error while reading file.', err);
})
    .on('end', function () {
    console.log('begin to write, time: ', Date.now() - startTime);
    fs.writeFile('test1_output.json', JSON.stringify(regions), function (err) {
        if (err)
            throw err;
        console.log('Data written to file, time: ', Date.now() - startTime);
    });
}));
//# sourceMappingURL=test1-client.js.map