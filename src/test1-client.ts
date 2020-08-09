import {Summary, Country, Region} from "./test1-model";
const fs = require('fs');
const es = require('event-stream');

let lineNum = 0;
const startTime = Date.now();
let regions = new Region();

var s = fs.createReadStream('node-data-processing-medium-data.csv')
    .pipe(es.split(''))
    .pipe(es.mapSync(function (line) {
            s.pause();
            lineNum += 1;
            //ignore the first line and empty line
            if (lineNum != 1 && line) {
                const lineArray = line.split(',');

                //once try csv-parser or other csv component, signally slow down the running speed to 9s, remove them and speed up to 4s
                const revenue = Number(lineArray[11]);
                const cost = Number(lineArray[12]);
                const profit = Number(lineArray[13]);
                const regionName = lineArray[0];
                const countryName = lineArray[1];
                const productName = lineArray[2];
                const summary = new Summary(revenue, cost, profit);

                // add items type under Regions
                regions.addItemType(productName,summary);

                //add countries to region,using map structure,if not exist, create country instance, return it back.
                let country: Country = regions.addCountryByRegionName(regionName);
                //add total count under Countries
                country.addSummaryToTotal(summary);

                //add ItemTypes under Country and create itemTypes instance if not exist, return the instance back
                let itemType = country.addItemTypeByCountryName(countryName);
                //add total count under product
                itemType.addSummaryByProductName(productName,summary);
                //add total count under country
                itemType.addSummaryToTotal(summary);


            }
            s.resume();
        })
            .on('error', function (err) {
                console.log('Error while reading file.', err);
            })
            .on('end', function () {
                console.log('begin to write, time: ',  Date.now() - startTime);
                fs.writeFile('test1_output.json', JSON.stringify(regions), (err) => {
                    if (err) throw err;
                    console.log('Data written to file, time: ',  Date.now() - startTime);
                });
            })
    );
