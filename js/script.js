/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
// Global Variables
const colorOption = $('#color');
const targetName = $('.activities [name]');
const activitiesInput = $('.activities input');
const activitiesField = $('.activities');
const jsPunsAvailable = [
    $('#color option[value="cornflowerblue"]'),
    $('#color option[value="darkslategrey"]'),
    $('#color option[value="gold"]')
];
const heartJSAvailable = [
    $('#color option[value="tomato"]'),
    $('#color option[value="steelblue"]'),
    $('#color option[value="dimgrey"]')
];
let activitiesCost = 0;
let activitiesLegend = $('<span id = "activities-subtotal">Your total cost is: $</span>').appendTo('.activities');
activitiesLegend;

// focus the form on the name field
$('#name').focus();

// add text field and hide initially. If other job option is selected then it will appear 
$('#other-title').hide();
$('#title').change(function(){
    const currentValue = $('#title').val();
    // If job title equals other then display the text area
    if (currentValue === "other"){
        $('#other-title').show();
    } else {
    // Otherwise keep the text area hidden
        $('#other-title').hide();
    }
});

// hide select theme initially
$('#design option[value="select-theme"]').attr('disabled',true).attr('hidden', true);

// change the colors of the t-shirt based on the theme
$('#design').change(function (e) {
    // target theme variable
    let theme = e.target;
    // Loop over each color option field element
    $(colorOption).each(function () {
        // If the target value equals js puns hide the colors unavailable to this theme
        if ($(theme).val() === 'js puns') {
            $(heartJSAvailable).each(function(){
                $(this).addClass('is-hidden');
            });
        } else {
            // Otherwise remove the class the hides these colors
            $(heartJSAvailable).each(function(){
                $(this).removeClass('is-hidden');
            });
        }
        // If the target value equals heart js hide the colors unavailable to this theme
        if ($(theme).val() === 'heart js') {
            $(jsPunsAvailable).each(function(){
                $(this).addClass('is-hidden');
            });
        } else {
            // Otherwise remove the class the hides these colors
            $(jsPunsAvailable).each(function(){
                $(this).removeClass('is-hidden');
            });
        }
    });
});

// click event handler for checkboxes to add up price and disable similar time slots for workshops

$(activitiesField).on('click', function(e){
    // helper variable to check if target box is checked
    let checked = $(e.target).prop('checked');
    // set of sequential variables to systematically take the $ off the data type and convert to an integer for use in addittion and subtraction
    let currentBox = e.target;
    let currentDataCost = $(currentBox).data('cost');
    let removePriceSign = currentDataCost.slice(1);
    let convertINT = parseInt(removePriceSign);
    
    // if target box is checked
    if (checked) {
        // add current price to total
        activitiesCost += convertINT;
    } else {
        // subtract current price from total
        activitiesCost -= convertINT
    }
    // append the total price after each click event to the span element for display
    $('#activities-subtotal').text('Your total cost is: $').append(activitiesCost);

    // Loop over the activities input fieldset to disable conflicting timeslots for workshops
    $(activitiesInput).each(function (index, element) {
        
        // helper variables for if/else statement
        let indexTime = $(activitiesInput[index]).attr('data-day-and-time');
        let targetTime = $(e.target).data('dayAndTime');
         
        // If the target time === Looped time && the target workshop name !== looped workshop name
        if (targetTime === indexTime && e.target !== targetName[index]) {
            // If the target property is checked
            if (checked) {
                // add disabled attribute
                $(element).attr('disabled', true);
            } else {
                // remove disabled attribute
                $(element).attr('disabled', false);
            }
        }
    });
});




