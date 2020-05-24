'use strict';

$( document ).ready(function() 
{
    var gameFormButton = $( "#gameFormButton" );

    gameFormButton.click(function() 
    {
        var gamesTotalText = $("#gameForm :input[id=gamesTotalText]")

        var switchTrueValue = $("#gameForm :input[id=switchTrue]:checked").val();
        let isSwitch = false;
        if(switchTrueValue)
        {
            isSwitch = true;
        }
        PlayGame(gamesTotalText.val(), isSwitch);
        event.preventDefault();
    });
   
});  

function PlayGame(gamesTotal, isSwitch)
{
    //create results
    let doorData = [];
    let totalWins = 0 ;
    for (let i = 1; i <= gamesTotal; i++)
    {
        let nextDoorData = [];
        let spot = Math.floor(Math.random() * 3);
        let chosenA = Math.floor(Math.random() * 3);
        let chosenB;

        if (isSwitch)
        {
            chosenB = Math.floor(Math.random() * 3);
        }
        else
        {
            chosenB = chosenA
        }

        if (spot === 0)
        {
            nextDoorData = ["C","G","G", chosenA, chosenB];
        }
        else if (spot === 1)
        {
            nextDoorData = ["G","C","G", chosenA, chosenB];
        }
        else if (spot ===2 )
        {
            nextDoorData = ["G","G","C", chosenA, chosenB];
        }
        else
        {
            console.log ("PROBLEM");
        }

        let isWin = nextDoorData[chosenB] === "C";
        if (isWin)
        {
            totalWins++;
        }
        nextDoorData[5] = isWin
        doorData.push (nextDoorData, isSwitch);
    }
    
    let winPercent = totalWins / (doorData.length + 1)
    displayResults(doorData, isSwitch, winPercent);
}

function displayResults(doordata, isSwitch, winPercent)
{
    let resultsSummary = $("#summary");
    let resultsDetails = $("#details");

    //clear results
    resultsSummary.empty();
    resultsDetails.empty();

    //Display results
    for (var i = 0; i < doordata.length; i++)
    {
        let thisDoorData = doordata[i];
        let gameIndex = displayIndex(i, 0, 2);
        let door1 = thisDoorData[0];
        let door2 = thisDoorData[1];
        let door3 = thisDoorData[2];
        let chosenA = displayIndex(thisDoorData[3], 1, 1);
        let chosenB = displayIndex(thisDoorData[4], 1, 1);
        let isWin = thisDoorData[5];
        
        var $newDiv = document.createTextNode(gameIndex + " = ["+door1+"]["+door2+"]["+door3+"], ChosenA="+chosenA+", ChosenB="+chosenB+", Switch="+isSwitch+", Win=" + isWin)
        resultsDetails.append ( $newDiv, $("</BR>") );
    }
    
    var $summary = document.createTextNode("Switch="+isSwitch+", Win%=" + winPercent)
    resultsSummary.append ( $summary, $("</BR>") );
}

function displayIndex (input, increment, totalDigits)
{
    input = input + increment;
    return pad (input, totalDigits);
}
function pad(input, totalDigits) {

    if (input)
    {
        input = input.toString();
        if(input.length < totalDigits) {
          input = '0' + input;
        }
        return input;
    }

    return 0;
  }

