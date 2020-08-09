1. I mainly use typescript and nodejs to solve the these 3 questions.

2. To improve the running speed:
    1) I mainly apply Map data structure rather than looping. 
    2) Avoid to use some library like moment.js or any kind of csv library(ex: csv-parser). carefully choose fs,event-stream and typescript-map,event-stream is able to handle large-size file, over 1G. 
    3) running test on my Mac book with the speeding:  question1: 4s, question2: 3s, question3: 5s 

3. how to run it:
   1) npm install -> node  build/test1-client.js      node  build/test2-client.js    node  build/test3-client.js
   2) input file: node-data-processing-medium-data.csv, output files: test1_output.json  test2_output.json  test2_output.json, all files are under root dir.
