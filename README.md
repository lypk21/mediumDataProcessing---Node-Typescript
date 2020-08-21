Question:

You will be provided with a medium sized CSV file (1.5 million lines,187M), containing Details about orders.
You can assume the CSV contains clean data that makes sense.
Requirements

1) Written as a Node CLI application
2) File name can be hard-coded no need for CLI Input
3) Generate 1 JSON file per task
4) Speed is Important

The CSV File: https://drive.google.com/file/d/1NSaNfpVFXzfl-VESjpkBeyH2FfM7OMRv/view?usp=sharing
The code needs to be delivered as a GitHub Repository
We need the following data outputted, All the data needs to be in a JSON format. You are allowed to add
more data to the output, If it is helpful to processing and getting the desired data.
Tasks

Each task has a basic description and an example.

1. The Total Revenue, Cost and Profit for each region and item type, (see example below)

    {
      "Regions": {
        "Sub-Saharan Africa": {
          "Total": {
            "Revenue": 25291.34,
            "Cost": 17797.74,
            "Profit": 7493.6
          },
          "countries": {
            "South Africa": {
              "Total": {
                "Revenue": 592678.59,
                "Cost": 195756.15,
                "Profit": 396922.44
              },
              "ItemTypes": {
                "Fruits": {
                  "Revenue": 71874.04,
                  "Cost": 53308.51,
                  "Profit": 18565.53
                },
                "Meat": {
                  "Revenue": 3104860.06,
                  "Cost": 2683902,
                  "Profit": 420958.05
                }
              },
            },
          },
         },
      },
      "ItemTypes": {
             "Fruits": {
               "Revenue": 23612.63,
               "Cost": 17513.33,
               "Profit": 6099.29
             },
             "Clothes": {
               "Revenue": 233215.42,
               "Cost": 76486.46,
               "Profit": 156728.95
          }
      }
    }
             
2. Number of each Priority Orders for

    {
      "2010": {
        "1": {
          "C": 4271,
          "H": 4183,
          "L": 4065,
          "M": 4157
        },
        "2": {
          "H": 3874,
          "C": 3732,
          "M": 3823,
          "L": 3804
        },
        "3": {
          "C": 4161,
          "H": 4199,
          "M": 4195,
          "L": 4162
        }
      }
    }    
3. Average Time to ship (in days), and Number of Orders For Each Month (grouped by year, like
#2), and by each Country (grouped by region), with totals for each level, like #1

    {
      "2010": {
        "1": {
          "TotalDaysToShip": 415966,
          "AvgDaysToShip": 25,
          "NumberOfOrders": 16676,
          "Regions": {
            "Sub-Saharan Africa": {
              "TotalDaysToShip": 105874,
              "AvgDaysToShip": 25,
              "NumberOfOrders": 4247,
              "Countries": {
                "Madagascar": {
                  "TotalDaysToShip": 2511,
                  "AvgDaysToShip": 28,
                  "NumberOfOrders": 91
                },
                "Zimbabwe": {
                  "TotalDaysToShip": 1813,
                  "AvgDaysToShip": 20,
                  "NumberOfOrders": 91
                }
              }  
            }
          }
        }
      }
    } 
   
    
solutions:

1. I mainly use typescript and nodejs to solve the these 3 questions.

2. To improve the running speed:
    1) I mainly apply Map data structure rather than looping. 
    2) Avoid to use some library like moment.js or any kind of csv library(ex: csv-parser). carefully choose fs,event-stream and typescript-map,event-stream is able to handle large-size file, over 1G. 
    3) running test on my Mac book with the speeding:  question1: 4s, question2: 3s, question3: 5s 

3. how to run it:
   1) npm install -> node  build/test1-client.js      node  build/test2-client.js    node  build/test3-client.js
   2) input file: node-data-processing-medium-data.csv, output files: test1_output.json  test2_output.json  test2_output.json, all files are under root dir.
   3) node-data-processing-medium-data.csv is too large, cannot upload, please download from https://drive.google.com/file/d/1NSaNfpVFXzfl-VESjpkBeyH2FfM7OMRv/view?usp=sharing and place it under the root dir. 
