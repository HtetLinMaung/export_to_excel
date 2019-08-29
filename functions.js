// Export excel with table dom
function exportTableToExcel(tableID, filename = '') {
  let downloadLink;
  let dataType = 'application/vnd.ms-excel';
  let tableSelect = document.getElementById(tableID);
  let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  // Specify file name
  filename = filename ? filename + '.xls' : 'excel_data.xls';

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
}

// from json to excel
let test_jsons = [{
  "Vehicle": "BMW",
  "Date": "30, Jul 2013 09:24 AM",
  "Location": "Hauz Khas, Enclave, New Delhi, Delhi, India",
  "Speed": 42
}, {
  "Vehicle": "Honda CBR",
  "Date": "30, Jul 2013 12:00 AM",
  "Location": "Military Road,  West Bengal 734013,  India",
  "Speed": 0
}, {
  "Vehicle": "Supra",
  "Date": "30, Jul 2013 07:53 AM",
  "Location": "Sec-45, St. Angel's School, Gurgaon, Haryana, India",
  "Speed": 58
}, {
  "Vehicle": "Land Cruiser",
  "Date": "30, Jul 2013 09:35 AM",
  "Location": "DLF Phase I, Marble Market, Gurgaon, Haryana, India",
  "Speed": 83
}, {
  "Vehicle": "Suzuki Swift",
  "Date": "30, Jul 2013 12:02 AM",
  "Location": "Behind Central Bank RO, Ram Krishna Rd by-lane, Siliguri, West Bengal, India",
  "Speed": 0
}, {
  "Vehicle": "Honda Civic",
  "Date": "30, Jul 2013 12:00 AM",
  "Location": "Behind Central Bank RO, Ram Krishna Rd by-lane, Siliguri, West Bengal, India",
  "Speed": 0
}, {
  "Vehicle": "Honda Accord",
  "Date": "30, Jul 2013 11:05 AM",
  "Location": "DLF Phase IV, Super Mart 1, Gurgaon, Haryana, India",
  "Speed": 71
}]

JSONToCSVConvertor(test_jsons, "Vehicle Report", true);

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

  let CSV = '';
  //Set Report title in first row or line

  CSV += ReportTitle + '\r\n\n';

  //This condition will generate the Label/Header
  if (ShowLabel) {
    let row = "";

    //This loop will extract the label from 1st index of on array
    for (const index in arrData[0]) {

      //Now convert each value to string and comma-seprated
      row += index + ',';
    }

    row = row.slice(0, -1);

    //append Label row with line break
    CSV += row + '\r\n';
  }

  //1st loop is to extract each row
  for (let i = 0; i < arrData.length; i++) {
    var row = "";

    //2nd loop will extract each column and convert it in string comma-seprated
    for (const index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }

    row.slice(0, row.length - 1);

    //add a line break after each row
    CSV += row + '\r\n';
  }

  if (CSV == '') {
    alert("Invalid data");
    return;
  }

  //Generate a file name
  let fileName = "MyReport_";
  //this will remove the blank-spaces from the title and replace it with an underscore
  fileName += ReportTitle.replace(/ /g, "_");

  //Initialize file format you want csv or xls
  let uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

  // Now the little tricky part.
  // you can use either>> window.open(uri);
  // but this will not work in some browsers
  // or you will not get the correct file extension

  //this trick will generate a temp <a /> tag
  let link = document.createElement("a");
  link.href = uri;

  //set the visibility hidden so it will not effect on your web-layout
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";

  //this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
