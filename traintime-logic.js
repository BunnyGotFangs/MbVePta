// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD0yvYEfgwdYNCngkx0cIf-2PaTiPD3d6E",
  authDomain: "hilttool-9c200.firebaseapp.com",
  databaseURL: "https://hilttool-9c200.firebaseio.com",
  projectId: "hilttool-9c200",
  storageBucket: "hilttool-9c200.appspot.com",
  messagingSenderId: "468011554717"

};


firebase.initializeApp(config);

var deliveryData = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
// 3. Button for adding trains
$("#add-delivery-btn").on("click", function() {

  // Grabs user input
                  var Carrier = $("#carrier-name-input").val().trim();
                  var PO = $("#po-input").val().trim();
                  var BOL = $("#bol-input").val().trim();
                  var Item = $("#item-input").val().trim();
                  var Count = $("#count-input").val().trim();
                  var Date1 = $("#start-input").val().trim();
                  var Time = $("#time-input").val().trim();
                  var Location1 = $("#location-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newDelivery = {

    carrier : Carrier,
    po : PO,
    bol : BOL,
    item : Item,
    count : Count,
    date : Date1,
    time : Time,
    location : Location1
  };

  // Uploads train data to the database
  deliveryData.ref().push(newDelivery);

  // Logs everything to console
  console.log(newDelivery.carrier);
  console.log(newDelivery.po);
  console.log(newDelivery.bol);
  console.log(newDelivery.item);
  console.log(newDelivery.count);
  console.log(newDelivery.date);
  console.log(newDelivery.time);
  console.log(newDelivery.location);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#carrier-name-input").val("");
  $("#po-input").val("");
  $("#bol-input").val("");
  $("#item-input").val("");
  $("#count-input").val("");
  $("#start-input").val("");
  $("#time-input").val("");
  $("#location-input").val("");

  // Determine when the next train arrives.
  return false;
});

// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
deliveryData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tCarrier = childSnapshot.val().carrier;
  var tPO = childSnapshot.val().po;
  var tBOL = childSnapshot.val().fbol;
  var tItem = childSnapshot.val().item;
  var tCount = childSnapshot.val().count;
  var tDate = childSnapshot.val().date;
  var tTime = childSnapshot.val().time;
  var tLocation = childSnapshot.val().location;

}
  // If the first train is later than the current time, sent arrival to the first train time
  //if (maxMoment === trainTime) {
    //tArrival = trainTime.format("hh:mm A");
    //tMinutes = trainTime.diff(moment(), "minutes");
  //} else {

    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    //var differenceTimes = moment().diff(trainTime, "minutes");
    //var tRemainder = differenceTimes % tFrequency;
    //tMinutes = tFrequency - tRemainder;
    // To calculate the arrival time, add the tMinutes to the current time
    //tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  //}
  //console.log("tMinutes:", tMinutes);
  //console.log("tArrival:", tArrival);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tCarrier + "</td><td>" + tPO + "</td><td>" +
          tBOL + "</td><td>" + tItem + "</td><td>" + tCount + "</td></tr>" + tDate + 
          "</td><td>" + tTime + "</td><td>" + tLocation + "</td><td>");
});

// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? ( Let's use our brains first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Let's use our brains first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21
