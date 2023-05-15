## **LIBRARIES AND PLUGINS USED**
1. React
2. useState
3. react-apexcharts
4. saveAs is imported from the file-saver
5. style is imported from a local CSS module file for styling the component.


## **EXPLANATION OF THE CODE**

1. At first I have created the component folder inside the src folder . Inside the compoennt folder I have created two files ( i.e HistogramChart.js ,Histogram.module.css      ).
2. Here inside the HistogramChart.js I have written the code for creating the histogram by fetching the content form the link provided to me then I have plot the 20 most      occuring word over the histogram , and inside the Histogram.module.css I have written the css for HistogramChart.js file .

## HistogramChart.js 

***
```react
  import React, { useState } from "react";
  import Chart from "react-apexcharts";
  import { saveAs } from "file-saver";
  import style from "./Histogram.module.css";
  ```
  This above block of code imports the necessary modules and stylesheets. React is imported for creating the component, useState is imported for managing component state,     Chart is imported from the react-apexcharts library for rendering the histogram chart, and saveAs is imported from the file-saver library for exporting data to a CSV       file. style is imported from a local CSS module file for styling the component.

***

```react
export default function HistogramChart() {
    return (
        <div>  </div>
    );
}
```
This line defines the component HistogramChart as a functional component that can be imported and used by other components.

***

```react
const [showSubmitButton, setShowSubmitButton] = useState(true);
```
This line declares a state variable showSubmitButton and a function setShowSubmitButton that can update the value of the state variable. It uses the useState hook from the React library to do this. The initial value of showSubmitButton is true, which means the "Submit" button will be shown when the component is first rendered. The setShowSubmitButton function is used to update the value of showSubmitButton later on.

***

 ```react 
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      plotOptions: {
        bar: {
          columnWidth: "100%",
          distributed: false,
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
  });
```

This code declares another state variable chartData and a function setChartData that can update the value of the state variable. The initial value of chartData is an object that contains options for a bar chart that will be rendered later in the component. This object has two properties: options and series.

* options is an object that contains various configuration options for a chart, such as its type, axis labels, colors, and data labels.
      * The chart property in the options object specifies the chart ID, which is used to identify the chart when multiple charts are present on the same page.
      * The xaxis property in the options object defines the X-axis of the chart and sets its categories to an empty array.
      * The plotOptions property in the options object defines the options for the plot of the chart, which in this case is a bar chart. The bar property sets the width of          the bars to 100% and distributes them evenly.
      * The dataLabels property in the options object is used to enable or disable data labels in the chart, in this case they are disabled.
      * The colors property in the options object sets the color of the bars to #00122e.
      * The fill property in the options object sets the type of fill for the bars, which in this case is a gradient. The gradient starts with a light shade and goes to             #ADD8E6.
* The series property is an array of objects representing the data series in the chart. In this case, it contains a single object with a name property set to "Word Count"     and a data property set to an empty array.

***

```react
  const fetchData = async () => {
    const response = await fetch("https://www.terriblytinytales.com/test.txt");
    const text = await response.text();
    const wordCount = {};
    text
      .toLowerCase()
      .replace(/[\W_]+/g, " ")
      .split(/\s+/)
      .forEach((word) => {
        if (wordCount[word]) {
          wordCount[word] = wordCount[word] + 1;
        } else {
          wordCount[word] = 1;
        }
      });

    const sortedWords = Object.entries(wordCount).sort(([, a], [, b]) => b - a);
    const categories = sortedWords.slice(0, 20).map(([word]) => word);
    const data = sortedWords.slice(0, 20).map(([, count]) => count);

    setChartData({
      options: {
        ...chartData.options,
        xaxis: {
          categories,
        },
      },
      series: [
        {
          name: "Word Count",
          data,
        },
      ],
    });
    setShowSubmitButton(false);
  };
```
Line By Line Explanation of above written code :

1. ```react 
     const fetchData = async () => {  } 
   ```
     This lines defines an asynchronous function called fetchData. 

2. ```react 
     const response = await fetch("https://www.terriblytinytales.com/test.txt"
   ```
   This makes an HTTP request to the URL https://www.terriblytinytales.com/test.txt using the fetch API and waits for the response.

3. ```react 
   const text = await response.text();
   ```
   This retrieves the response body as plain text.

4. ```react
   const wordCount = {};
   ```
   This creates an empty object called wordCount which will store the count of each word.
5. ```react 
   text
      .toLowerCase()
      .replace(/[\W_]+/g, " ")
      .split(/\s+/)
      .forEach((word) => {
              wordCount[word] = (wordCount[word] || 0) + 1;
      });
   ```
      This normalizes the text by converting it to lowercase, replacing all non-alphanumeric characters with a space, splitting the resulting text into an array of words,         and then counts the frequency of each word in the text by updating the wordCount object.

6. ```react 
   const sortedWords = Object.entries(wordCount).sort(([,a], [, b]) => b - a);
   ```
   This converts the wordCount object into an array of [word, count] pairs using Object.entries(), sorts the array in descending order of the count, and stores the result      in sortedWords.

7. ```react 
   const categories = sortedWords.slice(0,20).map(([word]) => word);
   ```
   This selects the top 20 words with the highest count and extracts the word from each [word, count] pair using Array.slice() and Array.map(), and stores the resulting        array of words in categories.      
8. ```react 
   const data = sortedWords.slice(0, 20).map(([,count]) => count);
   ``` 
   This selects the top 20 words with the highest count and extracts the count from each [word, count] pair using Array.slice() and Array.map(), and stores the resulting      array of counts in data.
9. ```react 
   setChartData({
       options: {
             ...chartData.options,
             xaxis: {
                  categories,
            },
       },
       series: [
           {
               name: "Word Count",
               data,
           },
       ],
   });
   ``` 
   This updates the chartData state by merging the existing options object with a new xaxis object that includes the categories array, and creating a new series array with    a single object that includes the data array and a name property.

10. ```react 
    setShowSubmitButton(false);
    ```
    This updates the showSubmitButton state to false, which will hide the submit button after the data is loaded.

***
```react
  const handleExport = () => {
    const data = [
      ["Word", "Count"],
      ...chartData.series[0].data.map((count, i) => [
        chartData.options.xaxis.categories[i],
        count,
      ]),
    ];
    const csv = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "histogram-data.csv");
  };
```
* This code defines a function called handleExport, which is responsible for exporting the chart data to a CSV file. Let's break down the code line by line:
   * ```react 
     const data = [...]
     ```
     Define a new variable called data and set it to an array of arrays. The first array contains the column headers for the CSV file ("Word" and "Count"). The rest of the      arrays contain the actual data, which is taken from chartData.series[0].data.

   * ```react 
     ...chartData.series[0].data.map((count, i) => [...]
     ```
     Use the spread operator to add the results of a map function to the data array. The map function takes two arguments: count, which represents the count value for a          particular word, and i, which represents the index of the word in chartData.options.xaxis.categories.

   * ```react 
     [chartData.options.xaxis.categories[i], count] 
     ```
     Return a new array containing the word and its corresponding count value.

   * ``` react 
     const csv = data.map((row) => row.join(",")).join("\n"); 
     ```
     Define a new variable called csv and set it to a string that represents the CSV data. The map function takes each array in the data array and turns it into a comma-        separated string using the join method. The outer join method then concatenates all of these strings together, separated by newlines.

   * ```react
     const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
     ```
     Create a new Blob object containing the CSV data, with the MIME type set to "text/csv;charset=utf-8".

   * ```react 
     saveAs(blob, "histogram-data.csv");
     ```
     Use the saveAs function from the file-saver library to save the CSV file with the name "histogram-data.csv".

***

```react
   return (

    <div id={style.MainContainer}>
      {showSubmitButton && (
        <div id={style.FetchDataContainer}>
          <button onClick={fetchData} className={style.Button}>
            Submit
          </button>
        </div>
      )}
      {!showSubmitButton && (
        <div id={style.ChartMainContainer}>
          <div id={style.ChartContainer}>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height="450"
              width="800"
            />
          </div>
          <div id={style.ExportButtonContainer}>
            <button onClick={handleExport} className={style.Button}>
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```
This is a React component that renders a chart and a button to fetch and display data, and another button to export the data as a CSV file.
   * The component is wrapped in a div with an ID of MainContainer.
   * There's a condition to render a container with a submit button if showSubmitButton is true.
       * The container has an ID of FetchDataContainer.
       * The button has an onClick event that triggers the fetchData function.
       * The button has a class of Button.
   * There's a condition to render a chart and an export button if showSubmitButton is false.
      * The container has an ID of ChartMainContainer.
      * There's a sub-container with an ID of ChartContainer that renders the chart using the Chart component from a chart library.
          * The Chart component receives the chart options and data as props from the chartData state.
          * The chart type is set to "bar".
          * The chart height is set to 450 pixels and width to 800 pixels.
      * There's another sub-container with an ID of ExportButtonContainer that renders an export button.
          * The button has an onClick event that triggers the handleExport function.
          * The button has a class of Button.

   * When the fetchData function is triggered, it fetches text data from a remote URL and calculates the word count using JavaScript.
      * The text data is processed and stored in state using the setChartData function.
      * The showSubmitButton state is set to false to show the chart and export button.
   * When the handleExport function is triggered, the data from the chart is converted to a CSV file and downloaded by the user.

***

## Histogram.module.css

Histogram.module.css This the external css file where I have written the css for this HistogramChart,js Component

```css
#MainContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#FetchDataContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.Button {
    background-color: #000e24;
    font-size: 1.4rem;
    padding: 5px;
    margin: 2px;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
    border: none;
    outline: none;
}

.Button:hover {
    color: white;
    transform: scale(1.04);
}

#ChartMainContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#ChartContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}


#ExportButtonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

```
