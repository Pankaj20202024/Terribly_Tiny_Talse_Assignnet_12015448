********** LIBRARIES AND PLUGINS USED  ************
1. React
2. useState
3. react-apexcharts
4. saveAs is imported from the file-saver
5. style is imported from a local CSS module file for styling the component.


********** EXPLANATION OF THE CODE  ************

1. At first I have created the component folder inside the src folder . Inside the compoennt folder I have created two files ( i.e HistogramChart.js ,       
   Histogram.module.css ).
2. Here inside the HistogramChart.js I have written the code for creating the histogram by fetching the content form the link provided to me then I have plot the 20 most  
   occuring word over the histogram .
   and inside the Histogram.module.css I have written the css for HistogramChart.js file .

********** EXPLANATION OF THE FILE HistogramChart.js ************

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { saveAs } from "file-saver";
import style from "./OnLoad.module.css";

This above block of code imports the necessary modules and stylesheets. React is imported for creating the component, useState is imported for managing component state, Chart is imported from the react-apexcharts library for rendering the histogram chart, and saveAs is imported from the file-saver library for exporting data to a CSV file. style is imported from a local CSS module file for styling the component.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function HistogramChart() {
       return (
          <div>  </div>
       );
}

This line defines the component HistogramChart as a functional component that can be imported and used by other components.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const [showSubmitButton, setShowSubmitButton] = useState(true);

This line declares a state variable showSubmitButton and a function setShowSubmitButton that can update the value of the state variable. It uses the useState hook from the React library to do this. The initial value of showSubmitButton is true, which means the "Submit" button will be shown when the component is first rendered. The setShowSubmitButton function is used to update the value of showSubmitButton later on.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const [chartData, setChartData] = useState(
{
      options: {

             chart: {
                  id: "basic-bar",
             },

             xaxis: {
                  categories: [],                     
             },

             plotOptions: {
                  bar: {
                       columnWidth:"100%",
                       distributed:false,
                  },
              },

             dataLabels: {
                  enabled: false,
             },

             colors: ["#00122e"],

             fill: {
                  type: "gradient",
                  gradient: {
                          shade: "light",
                          type: "vertical",
                          shadeIntensity: 0.5,
                          gradientToColors: ["#ADD8E6"],
                          inverseColors: false,
                          opacityFrom: 1,
                          opacityTo: 1,
                          stops: [0, 100],
                  },
             },
      },
      series: [
             {
                 name: "Word Count",
                 data: [],
             },
      ],
}
);

This code declares another state variable chartData and a function setChartData that can update the value of the state variable. The initial value of chartData is an object that contains options for a bar chart that will be rendered later in the component. This object has two properties: options and series.

options is an object that contains various configuration options for a chart, such as its type, axis labels, colors, and data labels.
      
The chart property in the options object specifies the chart ID, which is used to identify the chart when multiple charts are present on the same page.

The xaxis property in the options object defines the X-axis of the chart and sets its categories to an empty array.

The plotOptions property in the options object defines the options for the plot of the chart, which in this case is a bar chart. The bar property sets the width of the bars to 100% and distributes them evenly.

The dataLabels property in the options object is used to enable or disable data labels in the chart, in this case they are disabled.

The colors property in the options object sets the color of the bars to #00122e.

The fill property in the options object sets the type of fill for the bars, which in this case is a gradient. The gradient starts with a light shade and goes to #ADD8E6

The series property is an array of objects representing the data series in the chart. In this case, it contains a single object with a name property set to "Word Count" and a data property set to an empty array.


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const fetchData = async () => {
       const response = await
fetch("https://www.terriblytinytales.com/test.txt");



    const text = await
response.text();



    const wordCount = {};



    text



      .toLowerCase()



      .replace(/[\W_]+/g, "
")



      .split(/\s+/)



      .forEach((word) => {



        wordCount[word] = (wordCount[word] || 0)
+ 1;



      });



    const sortedWords =
Object.entries(wordCount).sort(([, a], [, b]) => b - a);



    const categories =
sortedWords.slice(0, 20).map(([word]) => word);



    const data =
sortedWords.slice(0, 20).map(([, count]) => count);



    setChartData({



      options: {



        ...chartData.options,



        xaxis: {



          categories,



        },



      },



      series: [



     {



         name: "Word
Count",



         data,



       },



      ],



    });



   
setShowSubmitButton(false);



  };







