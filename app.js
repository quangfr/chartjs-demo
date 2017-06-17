/*
* @Author: Quang
* @Date:   2017-06-11 18:57:10
* @Last Modified by:   Quang
* @Last Modified time: 2017-06-13 01:18:52
*/
var app= angular.module("myApp", ["chart.js"]);


  // Optional configuration
  app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: true // changed to true. doesn't work with none interger.
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }]);

  app.controller("LineCtrl", ['$scope', '$timeout', function ($scope) {
    // Default data
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  
  $scope.clickme = function () {
    var b = CSVToArray($scope.csv);
    $scope.labels=formatArrayColumn(b,0);

    $scope.series=formatArrayRow(b,0);
    $scope.data=formatArray(b);
}
  
 }]);

// Functions


// Generate ChartJS data except header row and column
function formatArray(table){
  var i;
  var z="[[";
  for (i=1;i<table[i].length-1;i++){
    z+=formatArrayColumn(table,i);
    z+="],["
   
  }
  z = z.slice(0, -1);
  z = z.slice(0, -1);
  z+="]";
  z=JSON.parse(z);
  return z;
}

// Generate ChartJS array with items on nth column except 1st item


  function formatArrayColumn(table,n){
     var i;
     var y="[";
    for (i=1;i<table.length;i++){
      y +='"'+table[i][n]+'",';

    }  
    y = y.slice(0, -1);
    y+=']';
    // y=y.replace(', "undefined"','');
    y=JSON.parse(y);
    return y;
  
  }

// Generate ChartJS array with items on nth row except 1st item


 function formatArrayRow(table,n){
     var i;
     var x="[";
    for (i=1;i<table[i].length-1;i++){
    
      x +='"'+table[n][i]+'",';

    }  
    x = x.slice(0, -1);
    x+=']';
    return JSON.parse(x);
  
  }

// Build Array from CSV. Source : http://stackoverflow.com/a/1293163/2343

  function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ";");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}



