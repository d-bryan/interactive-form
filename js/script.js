/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
// Global Variables
const colorOption = $('#color');
const getActivitiesData = $('input[data-day-and-time]');
const getDataInput = $('input[type="checkbox"]');
const targetName = $('.activities [name]');

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

console.log(getDataInput);
console.log(getActivitiesData);
console.log(targetName);



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
    // Loop over each color option field element
    $(colorOption).each(function () {
        // If the target value equals js puns hide the colors unavailable to this theme
        if ($(e.target).val() === 'js puns') {
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
        if ($(e.target).val() === 'heart js') {
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

// Create an element to display the activitie cost total


// Listen for changes in the activities section
// Create helpful variables to store important values
// Update and display the total activities cost
// Disable conflicting activities

$(getDataInput).on('click', function(e){
    let checked = $(this).is(':checked');
    let currentBox = e.target;
    let currentDataCost = $(currentBox).data('cost');
    let removePriceSign = currentDataCost.slice(1);
    let convertINT = parseInt(removePriceSign);
    
    if (checked) {
        activitiesCost += convertINT;
    } else {
        activitiesCost -= convertINT
    }
    $('#activities-subtotal').text('Your total cost is: $').append(activitiesCost);

    
    $(getActivitiesData).each(function (index, element) {
        let getDateTime = $(this).attr('data-day-and-time');
        let indexTime = $(getDataInput[index]).attr('data-day-and-time');
        let targetTime = $(e.target).data('dayAndTime');
        // let targetName = $('.activities name');
        
        // console.log($(this).data('dayAndTime'));
        // console.log('1   ' + getDateTime);
        console.log('2   ' + indexTime);
        // console.log(e.target);
        console.log($(e.target).data('dayAndTime'));
        
        if (targetTime === indexTime && e.target.name === targetName[index]) {
            if (checked) {
                console.log(this);
                console.log(e.target.name);
                $(element).attr('disabled', true);
            } else {
                console.log(this);
                console.log(e.target.name);
                $(element).attr('disabled', false);
            }
        }

    });
    
});




