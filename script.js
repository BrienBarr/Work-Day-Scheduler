$(document).ready(function() {
    // Display the current day, month, and year in the #currentDay element
    $("#currentDay").text(moment().format('dddd') + ", " + moment().format("MMM Do"));

    // Get the current hour and convert to integer
    var currTime = moment().format('h');
    currTime = parseInt(currTime);

    // Get AM or PM and set the current hour to 0 for 12AM
    var currTimeA = moment().format('a');
    if(currTime === 12 && currTimeA === "am"){
        currTime = 0;
    }
    
    // Function to check the current hour, AM or PM designation, and convert 
    // the hour to a 24 hour clock every second 
    function checkTime (){
        // setInterval to check the hour and AM/PM every second
        var timer = setInterval(function(){
            currTime = moment().format('h');
            currTime = parseInt(currTime);
            currTimeA = moment().format('a');
            // if statement to change hours after 12PM to 24 hour clock
            if(currTimeA === "pm" && currTime !== 12){
                currTime += 12;
            }
            // else if statement to change 12AM to zero hour on 24 hour clock
            else if(currTime === 12 && currTimeA === "am"){
                currTime = 0;
            }
            // Call the function to update the class of the time-block textarea based on current hour
            hourNoteClass();
            return(currTime, currTimeA);
        }, 1000);
    }

    // for loop to dynamically create each time-block row and elements within the row and set the hour and  
    // AM/PM designation for each time-block row for the hours 9AM - 5PM with 24 hour clock values
    for(i = 9; i < 18; i++){

        // Create the new time-block row and add the appropriate classes
        var newTimeBlock = $("<div>").addClass("row time-block");
        
        // Set the time hour 
        var timeHour = i;

        // if statement to change the time hour to a 12 hour clock
        if (i > 12){
            tiimeHour = i - 12;
        }

        var timeText;
        var timeNoteID;

        // if statement to set the time text and time note ID  for the time-block rows for 1-5 PM
        if (i > 12) {
            timeText = "" + timeHour-12 + " PM";
            timeNoteID = "" + timeHour-12 + "_PM";
        }
        // else if statement to set the time text and time note ID  for the 12 PM time-block row
        else if (i === 12) {
            timeText = "" + timeHour + " PM";
            timeNoteID = "" + timeHour + "_PM";
        }
        // else statement to set the time text and time note ID for the 9-11 AM time-block rows
        else{
            timeText = "" + timeHour + " AM";
            timeNoteID = "" + timeHour + "_AM";
        }

         // Set the time-block row value to the time note ID
         newTimeBlock.attr("value", timeNoteID);

        // Display the time text in the timeTextSpan span element
        var timeTextSpan = $("<span  class='hourDisplay'>").text(timeText);

        // Create the hour block and add the timeTextSpan to the hour block
        var newHour = $("<div class='col-1 hour'>").html(timeTextSpan);

        // Create the textarea for the user to add notes for each hour block
        // and give it an ID based on the time Note ID and a value based on the time hour
        var newHrTxt = $("<textarea class='col-10 hourNote'>").attr("id", timeNoteID + "_Note"); 
        newHrTxt.attr("value", timeHour);

        // Get the notes for the textarea that are stored in the local storage
        var timeNoteTxt = localStorage.getItem($(newHrTxt).attr("id"));

        // if statement to check if the time note in local storage is null
        if (!timeNoteTxt){

        }
        // else statement to set the text in the textarea with the time note stored in local storage
        else{
            newHrTxt.text(timeNoteTxt);
        }

        // Call the function to check the current hour to set the class for the textarea 
        // for each time-block row
        checkTime();

        // Create the new save button with the font-awesome save icon and give it a value 
        // for the hour of the time-block row
        var newHrSave = $("<button class='col-1 saveBtn'> <i class='fas fa-save'></i>").attr("value", timeHour);
        
        // Append the time-block row with the hour block, the textarea for notes, and the save button
        newTimeBlock.append(newHour, newHrTxt, newHrSave);
        
        // Append the new time-block row to the container
        $(".container").append(newTimeBlock);

    }

    // On click event callback function to save the time-block text notes from the textarea in the row
    // to local storage when the save button or font-awesome save icon is clicked
    $(".saveBtn, .fa-save").click(function(event){
        event.preventDefault();
        event.stopPropagation();
        var txtNoteVal = $(this).parent().attr("value");
        localStorage.setItem($(this).parent().attr("value") + "_Note", $("#" + txtNoteVal + "_Note").val());
    })

    // Function to change the class of the time-block text area based on the current hour
    function hourNoteClass(){
        $(".hourNote").each(function(){
            $(this).toggleClass("past", parseInt($(this).attr("value")) < currTime);
            $(this).toggleClass("present", parseInt($(this).attr("value")) === currTime);
            $(this).toggleClass("future", parseInt($(this).attr("value")) > currTime);
        })
    }

})