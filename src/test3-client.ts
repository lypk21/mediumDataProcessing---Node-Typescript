import {TSMap} from "typescript-map";

const fs = require('fs');
const es = require('event-stream');
import {MonthCount} from "./test3-model";

//maps structure, designed to match the desired data
let years = new TSMap<string, TSMap<string,MonthCount>>();
let lineNum = 0;
const startTime = Date.now();


var s = fs.createReadStream('node-data-processing-medium-data.csv')
    .pipe(es.split(''))
    .pipe(es.mapSync(function (line) {
            s.pause();
            lineNum += 1;
            if (lineNum != 1 && line) {
                const lineArray = line.split(',');

                const orderDate = new Date(lineArray[5]);
                const shipDate =  new Date(lineArray[7]);
                //once try moment.js, signal slow down to 25s, remove it and now run on 5s
                const diffDays = Math.floor((shipDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

                const year = orderDate.getFullYear().toString();
                const month = (orderDate.getMonth() + 1).toString();

                const regionName = lineArray[0];
                const  countryName = lineArray[1];

                //with specific year, create it
                if(!years.has(year)) {
                    years.set(year, new TSMap<string,MonthCount>());
                }

                let months = years.get(year);
                //without monthCount instance, create it
                if(!months.has(month)) {
                    months.set(month, new MonthCount());
                }

                let monthCount:MonthCount = months.get(month);
                //plus ship days and calculating avg days and num of orders under month
                monthCount.addDiffDaysAndNumOfOrders(diffDays);
                //create or return exist country under region
                let country = monthCount.addRegionCountByRegionName(regionName);
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
                console.log('begin to write, time: ',  Date.now() - startTime);
                fs.writeFile('test3_output.json', JSON.stringify(years), (err) => {
                    if (err) throw err;
                    console.log('Data written to file, time: ',  Date.now() - startTime);
                });
            })
    );
