/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
/******************************************
Global Variables
******************************************/

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
let activitiesLegend = $('<span id = "activities-subtotal">Your total cost is: $' + activitiesCost + '</span>').appendTo('.activities');
activitiesLegend;

/******************************************
Basic Info Section
******************************************/

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

/******************************************
T-Shirt Info 
******************************************/

// hide select theme initially
$('#design option[value="select-theme"]').attr('disabled',true).attr('hidden', true);
// hide the colors to only be shown after the user has selected a theme
$('#color').addClass('is-hidden');
// Change text to say please select a T-shirt theme
$('#color').parent().find('label').text('Please select a T-shirt theme:');

// change the colors of the t-shirt based on the theme
$('#design').change(function (e) {
    // Refactortored selectors to use throughout function
    let theme = e.target;
    let jsPUNS = $(theme).val() === 'js puns';
    let heartJS = $(theme).val() === 'heart js';

    // If the target value is either color then change the display label text and remove the hidden class
    if (jsPUNS || heartJS) {
        $('#color').removeClass('is-hidden');
        $('#color').parent().find('label').text('Color:')
    }

    // Loop over each color option field element
    $(colorOption).each(function () {
        // If the target value equals js puns hide the colors unavailable to this theme
        if (jsPUNS) {
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
        if (heartJS) {
            $(jsPunsAvailable).each(function(){
                $(this).addClass('is-hidden');
                // $(this).toggleClass('is-hidden');
            });
        } else {
            // Otherwise remove the class the hides these colors
            $(jsPunsAvailable).each(function(){
                $(this).removeClass('is-hidden');
                // $(this).toggleClass('is-hidden');
            });
        }
    });
});

/******************************************
Register for Activities
******************************************/

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

/******************************************
Payment Section
******************************************/
const creditCard = $('#payment option[value="credit card"]');
const paypal = $('#payment option[value="paypal"]');
const bitcoin = $('#payment option[value="bitcoin"]');

// hide the select payment method initially
$('#payment option[value="select method"]').attr('disabled',true).attr('hidden', true);
// Set the credit card payment method to selcted intially 
creditCard.attr('selected', true);
// Hide the Paypal and Bitcoin divs intially
$('#paypal').addClass('is-hidden');
$('#bitcoin').addClass('is-hidden');

$('#payment').change(function(e){
    let select = e.target;

    // if target value equals credit card
    if ($(select).val() === creditCard.val()) {
        // credit card select method true
        creditCard.attr('selected', true);
        // other payment methods false
        paypal.attr('selected', false);
        bitcoin.attr('selected', false);
    } else if ($(select).val() === paypal.val()) {
        // paypal select method true
        paypal.attr('selected', true);
        // other payment methods false
        creditCard.attr('selected', false);
        bitcoin.attr('selected', false);
    } else if ($(select).val() === bitcoin.val()) {
        // bitcoin select method true
        bitcoin.attr('selected', true);
        // other payment methods false
        paypal.attr('selected', false);
        creditCard.attr('selected', false);
    }

    // if/else statement to hide payment sections based on which is selected
    if (creditCard.is(':selected')) {
        // show payment method
        $('#credit-card').removeClass('is-hidden');
        // remove payment method
        $('#paypal').addClass('is-hidden');
        $('#bitcoin').addClass('is-hidden');
    } else if(paypal.is(':selected')) {
        // show payment method
        $('#paypal').removeClass('is-hidden');
        // remove payment method
        $('#credit-card').addClass('is-hidden');
        $('#bitcoin').addClass('is-hidden');
    } else if (bitcoin.is(':selected')) {
        // show payment method
        $('#bitcoin').removeClass('is-hidden');
        // remove payment method
        $('#paypal').addClass('is-hidden');
        $('#credit-card').addClass('is-hidden');
    }
});




