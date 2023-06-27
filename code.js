function doGet() {
  return HtmlService.createTemplateFromFile('index.html').evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle("Registration With Document");
}

function saveData(obj) {
  const ss = SpreadsheetApp.openById('1oS2AgGkNSnk6I43AlaP9J99ofYbevPGjUKHrB1XYSt0').getSheetByName('sheet 1')
  const header = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0]
  const row = []
  Object.keys(obj).forEach(key => {
    row[header.indexOf(key)] = obj[key]
  })
  ss.appendRow(row)
  return true
}


function read_value(request) {
  var ss = SpreadsheetApp.openById('1oS2AgGkNSnk6I43AlaP9J99ofYbevPGjUKHrB1XYSt0');
  var sheet = ss.getSheetByName(SHEET_NAME);
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var json = JSON.stringify(values);
  return json;
}


function receiveSiganture(encodedImage) {

const data = encodedImage.split(",")[1];
const dataDecoded = Utilities.base64Decode(data);
const signatureAsPictureBlob = Utilities.newBlob(dataDecoded).setName(imageName);
console.log(dataDecoded);
DriveApp.getFolderById("1uHbJhtW48eJfzUPXBXq0YLjI_PioVdC6").createFile(signatureAsPictureBlob);

}


function uploadFileToGoogleDrive(first_name, last_name,) {

  try {
    var SHEET_NAME = "sheet 1";
    var ss = SpreadsheetApp.openById("1oS2AgGkNSnk6I43AlaP9J99ofYbevPGjUKHrB1XYSt0");
    var sheet = ss.getSheetByName(SHEET_NAME);
    var folder = DriveApp.getFolderById("1uHbJhtW48eJfzUPXBXq0YLjI_PioVdC6");
    var file = folder.createFolder([first_name, last_name].join(" "))
    for (var index = 0; index < data.length; index++) {
      var contentType = data[index].image.substring(5, data[index].image.indexOf(';')),
        bytes = Utilities.base64Decode(data[index].image.substr(data[index].image.indexOf('base64,') + 7)),
        blob = Utilities.newBlob(bytes, contentType, data[index].name);
      file.createFile(blob)
      filelink.push(file.getUrl());
    }
    var lock = LockService.getPublicLock();
    lock.waitLock(30000);  // wait 30 seconds before conceding defeat.    

    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById("1oS2AgGkNSnk6I43AlaP9J99ofYbevPGjUKHrB1XYSt0");
    var sheet = doc.getSheetByName(SHEET_NAME);
    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1; // get next row

    var row = [];

    var getLastRow = sheet.getRange(sheet.getLastRow(), 3).getValue();

    // loop through the header columns
    for (i in headers) {
      if (headers[i] == "Timestamp") { // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else if (headers[i] == "first_name") {
        row.push(first_name);
      } else if (headers[i] == "last_name") {
        row.push(last_name);
      }

    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
   


    return "OK";

  } catch (f) {
    return f.toString();
  } finally { //release lock
    lock.releaseLock();
  }
}



// function doGet() {
//   return HtmlService.createTemplateFromFile("index").evaluate()
//     .addMetaTag("viewport", "width=device-width, initial-scale=1")
//     .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)

// }
// function saveData(obj) {
//   const ss = SpreadsheetApp.openById("1oS2AgGkNSnk6I43AlaP9J99ofYbevPGjUKHrB1XYSt0").getSheetByName("sheet 1")
//   const header = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0]
//   const row = []
//   Object.keys(obj).forEach(key => {
//     row[header.indexOf(key)] = obj[key]
//   })
//   ss.appendRow(row)

//   return true
// }


// function receiveSiganture(encodedImage) {

//   var SHEET_NAME = "sheet 1";
//   var ss = SpreadsheetApp.openById("1oS2AgGkNSnk6I43AlaP9J99ofYbevPGjUKHrB1XYSt0");
//   var sheet = ss.getSheetByName(SHEET_NAME);


//   var headRow = 1;
//   var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//   var nextRow = sheet.getLastRow() + 1; // get next row

//   var row = [];

//   var rows = sheet.getDataRange();
//   var numRows = rows.getNumRows();
//   var first_name = sheet.getRange(sheet.getLastRow(), 2).getValue();
//   var last_name = sheet.getRange(sheet.getLastRow(), 3).getValue();

//   var setName = JSON.stringify(first_name);
//   var setlast_name = JSON.stringify(last_name);

//   console.log("first_name is " + setfirst_name);
//   console.log("last_name is " + setlast_name);
  

//   //////////

//   var imageName = [setName, setEmail].join(" ");

//   ///////////


//   const data = encodedImage.split(",")[1];
//   const dataDecoded = Utilities.base64Decode(data);
//   const signatureAsPictureBlob = Utilities.newBlob(dataDecoded).setName(imageName);
//   console.log(dataDecoded);
//   DriveApp.getFolderById("1uHbJhtW48eJfzUPXBXq0YLjI_PioVdC6").createFile(signatureAsPictureBlob);

// }





