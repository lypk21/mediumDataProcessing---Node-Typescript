import {TSMap} from "typescript-map";
const fs = require('fs');
const es = require('event-stream');

let lineNum = 0;
const startTime = Date.now();
//maps structure, designed to match the desired data
let years = new TSMap<string, TSMap<string, TSMap<string, number>>>();

const s = fs.createReadStream('node-data-processing-medium-data.csv')
    .pipe(es.split(''))
    .pipe(es.mapSync(function (line) {
            s.pause();
            lineNum += 1;
            if (lineNum != 1 && line) {
                const lineArray = line.split(',');

                const date = lineArray[5].split('/');
                const year = date[2];
                const month = date[0];
                const priorityType = lineArray[4];
                //with specific year, create it
                if (!years.has(year)) {
                    years.set(year, new TSMap<string, TSMap<string, number>>());
                }
                let months = years.get(year);
                //without month, create it
                if (!months.has(month)) {
                    months.set(month, new TSMap<string, number>());
                }
                let priority = months.get(month);
                //with priority, create it
                if (!priority.has(priorityType)) {
                    //initial priority count 1
                    priority.set(priorityType, 1);
                } else {
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
                fs.writeFile('test2_output.json', JSON.stringify(years), (err) => {
                    if (err) throw err;
                    console.log('Data written to file, time: ', Date.now() - startTime);
                });
            })
    );
