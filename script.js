$(document).ready(function() {
    $("#currentDay").text(moment().format('dddd') + ", " + moment().format("MMM Do"));

    var currTime = moment().format('h');
    currTime = parseInt(currTime);
    var currTimeA = moment().format('a');
    if(currTime === 12 && currTimeA === "am"){
        currTime = 0;
    }
    
    function checkTime (){
        var timer = setInterval(function(){
        currTime = moment().format('h');
        currTime = parseInt(currTime);
        currTimeA = moment().format('a');
        if(currTimeA === "pm"){
            currTime += 12;
        }
        else if(currTime === 12 && currTimeA === "am"){
            currTime = 0;
        }
        console.log(currTime);
        hourNoteClass();
        return(currTime, currTimeA);
        }, 1000);
    }

    for(i = 9; i < 18; i++){
        var newTimeBlock = $("<div>").addClass("row time-block");
        
        var timeHour = i;
        if (i > 12){
            tiimeHour = i - 12;
        }
        newTimeBlock.attr("value", timeHour);

        var timeText;
        if (i > 12) {
            timeText = "" + timeHour-12 + " PM";
        }
        else if (i === 12) {
            timeText = "" + timeHour + " PM";
        }
        else{
            timeText = "" + timeHour + "AM";
        }
        var timeTextSpan = $("<span  class='hourDisplay'>").text(timeText);

        var newHour = $("<div class='col-1 hour'>").html(timeTextSpan);

        var newHrTxt = $("<textarea class='col-10 hourNote'>").attr("id", timeHour + "_Note"); 
        newHrTxt.attr("value", timeHour);
        var timeNote = localStorage.getItem($(newHrTxt).attr("value") + "_Note");

        if (timeNote === ""){ //null???

        }
        else{
            newHrTxt.text(timeNote);
        }

        checkTime();

        var newHrSave = $("<button class='col-1 saveBtn'> <i class='fas fa-save'></i>").attr("value", timeHour);
        newTimeBlock.append(newHour, newHrTxt, newHrSave);
        
        $(".container").append(newTimeBlock);

    }

    $(".fa-save").click(function(event){
        event.preventDefault();
        event.stopPropagation();
        var txtNoteVal = $(this).parent().attr("value");
        localStorage.setItem($(this).parent().attr("value") + "_Note", $("#" + txtNoteVal + "_Note").val());
    })

    function hourNoteClass(){
        $(".hourNote").each(function(){
            $(this).toggleClass("past", parseInt($(this).attr("value")) < currTime);
            $(this).toggleClass("present", parseInt($(this).attr("value")) === currTime);
            $(this).toggleClass("future", parseInt($(this).attr("value")) > currTime);
        })
    }

})