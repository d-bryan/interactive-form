/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
/******************************************
Global Variables
******************************************/
// progessive enhancement added
$(document).ready(function () {
    // SELECT CONSTANTS 
    const targetName = $('.activities [name]');
    const activitiesInput = $('.activities input');
    const activitiesField = $('.activities');
    const creditCard = $('#payment option[value="credit card"]');
    const paypal = $('#payment option[value="paypal"]');
    const bitcoin = $('#payment option[value="bitcoin"]');

    // FORM VALIDATION CONSTANTS
    const NAME_ERROR = $('<span class="name-error">Please enter your name</span>');
    const EMAIL_ERROR = $('<span class="email-error">Please enter a valid email address</span>');
    const EMAIL_SUCCESS = $('<span class="email-success">That looks like a valid email to us</span>');
    const ACTIVITY_ERROR = $('<span class="activity-error">Please select at least one activity</span>');
    const CREDIT_NUMBER_ERROR = $('<span class="credit-error">Please ensure that the card number is between 13 and 16 digits</span>');
    const CREDIT_ZIP_ERROR = $('<span class="zip-error">5 digit zip</span>');
    const CREDIT_CVV_ERROR = $('<span class="cvv-error">3 digit CVV</span>');
    const NAME_LABEL = $('div.container label[for="name"]');
    const EMAIL_LABEL = $('div.container label[for="mail"]');
    const ACTIVITY_LABEL = $('div.container fieldset.activities');
    const CREDIT_LABEL = $('div.container label[for="cc-num"]');
    const ZIP_LABEL = $('div.container label[for="zip"]');
    const CVV_LABEL = $('div.container label[for="cvv"]');

    // REGEX CONSTANTS
    const regexEmail = /^.+@\w+\.com$/;
    const regexCreditCard = /\d{13,16}/;
    const regexZipCode = /\d{5}/;
    const regexCVV = /\d{3}/;

    let activitiesCost = 0;
    let activitiesLegend = $('<span id = "activities-subtotal">Your total cost is: $' + activitiesCost + '</span>').appendTo('.activities');
    activitiesLegend;

    // add required attributes to input fields for form validation
    const makeRequired = () => {
        let $name = $('#name');
        let $email = $('#mail');
        let $title = $('#title');
        let $shirtSize = $('#size');
        let $shirtTheme = $('#design');
        let $shirtColor = $('#color');
        let $payment = $('#payment');
        let $cc_num = $('#cc-num');
        let $zip = $('#zip');
        let $cvv = $('#cvv');

        $name.attr('required', true);
        $email.attr('required', true);
        $title.attr('required', true);
        $shirtSize.attr('required', true);
        $shirtTheme.attr('required', true);
        $shirtColor.attr('required', true);
        $payment.attr('required', true);
        $cc_num.attr({'minlength': 13,'maxlength': 16});
        $zip.attr({'minlength': 5,'maxlength': 5});
        $cvv.attr({'minlength': 3,'maxlength': 3});
    };
    makeRequired();

    // function to select credit card options
    const getCardInput = (attr, val) => {
        // set card attributes to what is passed into the function
        $('#cc-num').attr(attr, val);
        $('#zip').attr(attr, val);
        $('#cvv').attr(attr, val);
    };

    // function to add validation messages to the page for the user
    const validationMessages = () => {

        NAME_LABEL.append(NAME_ERROR);
        $('.name-error').hide();
        EMAIL_LABEL.append(EMAIL_ERROR);
        $('.email-error').hide();
        EMAIL_LABEL.append(EMAIL_SUCCESS);
        $('.email-success').hide();
        ACTIVITY_LABEL.append(ACTIVITY_ERROR);
        $('.activity-error').hide();
        CREDIT_LABEL.append(CREDIT_NUMBER_ERROR);
        $('.credit-error').hide();
        ZIP_LABEL.append(CREDIT_ZIP_ERROR);
        $('.zip-error').hide();
        CVV_LABEL.append(CREDIT_CVV_ERROR);
        $('.cvv-error').hide();

    };

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
        // function to check hide and show color options for T-Shirts
        const checkShirtVal = () => {
            // hide all options right away
            $('#color option').attr('hidden',true);
            // if target is equal to js puns, set all display attributes to hidden then show them and select the first one
            if (jsPUNS === true) {
                $('#color option:contains(JS Puns shirt only)').each(function(){
                    $(this).attr('selected',false);
                });
                $(':contains(JS Puns shirt only)').attr('hidden',false);
                $('#color option').eq(0).attr('selected',true);
            // if target is equal to heart js, set all display attributes to hidden then show them and select the first one
            } else if (heartJS === true) {
                $('#color option:contains(JS shirt only)').each(function(){
                    $(this).attr('selected',false);
                });
                $(':contains(JS shirt only)').attr('hidden',false);
                $('#color option').eq(3).attr('selected', true);
            // else set all the display attribute back to hidden
            } else {
                $('#color option').attr('hidden',true);
            }
        };
        // run the function on each of the color options
        $('#color').each(function (){
            checkShirtVal();
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
    // hide the select payment method initially
    $('#payment option[value="select method"]').attr('disabled',true).attr('hidden', true);
    // Set the credit card payment method to selcted intially 
    creditCard.attr('selected', true);
    // Hide the Paypal and Bitcoin divs intially
    $('#paypal').addClass('is-hidden');
    $('#bitcoin').addClass('is-hidden');

    // click event listener for the payment method options
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

    /******************************************
    Form Validation
    ******************************************/

    // Place all the helper elements on the page and then hide them right away
    validationMessages();

    // Function to check if NAME field is blank and to add/remove helper class that shows the user their error
    const nameVal = () => {
        const name = $('#name');
        const nameValue = name.val();
        
        // if empty add class
        if(nameValue === '') {
            name.addClass('submit-error');
            $('.name-error').show(500);

            return false;
        // if not remove class    
        } else if(nameValue !== '') {
            name.removeClass('submit-error');
            $('.name-error').hide(500);

            return true;
        }
    };

    // Function to check if EMAIL field is blank and to add/remove helper class that shows the user their error
    const emailVal = () => {
        const email = $('#mail');
        let emailValue = email.val();
        // if empty add class
        if (emailValue === '') {
            email.addClass('submit-error');
            $('.email-error').show(500);
            $('.email-success').hide();

            return false;
        // if not remove class
        } else if(emailValue !== '' && emailValue.match(regexEmail)) {
            email.removeClass('submit-error');
            $('.email-error').hide(500);
            $('.email-success').show(500);

            return true;
        }
    };

    // Function to check if ACTIVITIES field has any items checked, and to add/remove helper class that shows the user their error
    const activityVal = () => {
        const fieldsetLegend = $('fieldset.activities legend');
        const checkboxIsChecked = $('.activities input:checkbox:checked');
        
            
            // if checkbox length is greater than 0 remove helper class
            if (checkboxIsChecked.length > 0) {
                fieldsetLegend.removeClass('submit-error');
                $('.activity-error').hide(500);
    
                return true;
            // else add helper class
            } else {
                fieldsetLegend.addClass('submit-error');
                $('.activity-error').show(500);
    
                return false;
            }
    };

    // Function to check if CREDIT CARD IS SELECTED, the card number field has any items needed, and to add/remove helper class that shows the user their error 
    const creditCardNumberVal = () => {
        let cardNumber = $('#cc-num').val();
        let numberParse = parseInt(cardNumber);
        // check if the credit card option is selected
        if (creditCard.is(':selected')) {
            // set the credit card attribute to be required
            getCardInput('required', true);
            $('#bitcoin').attr('required', false);
            $('#paypal').attr('required', false);
            // if card number field empty add class
            if (cardNumber === '') {
                $('#cc-num').addClass('submit-error');
                $('.credit-error').show(500);
    
                return false;
            // else remove the helper class
            } else if (cardNumber !== '' && numberParse.match(regexCreditCard)) {
                $('#cc-num').removeClass('submit-error');
                $('.credit-error').hide(500);
    
                return true;
            }
        } else if (bitcoin.is(':seleted')) {
            $('#bitcoin').attr('required', true);
            getCardInput('required', false);
            $('#paypal').attr('required', false);

            return true;
        } else if (paypal.is(':selected')) {
            $('#paypal').attr('required', true);
            getCardInput('required', false);
            $('#bitcoin').attr('required', false);

            return true;
        }
    };

    // Function to check if CREDIT CARD IS SELECTED, the ZIP CODE field has any items needed, and to add/remove helper class that shows the user their error 
    const cardZipVal = () => {
        let cardZip = $('#zip').val();
        let zipParse = parseInt(cardZip);
        // check if the credit card option is selected
        if (creditCard.is(':selected')) {
            getCardInput('required', true);
            $('#bitcoin').attr('required', false);
            $('#paypal').attr('required', false);

            // if zip code is empty add class
            if (cardZip === '') {
                $('#zip').addClass('submit-error');
                $('.zip-error').show(500);
    
                return false;
                
                // else remove the helper class
            } else if (cardZip !== '' && zipParse.match(regexZipCode)) {
                $('#zip').removeClass('submit-error');
                $('.zip-error').hide(500);
    
                return true;
            }
        } else if (bitcoin.is(':seleted')) {
            $('#bitcoin').attr('required', true);
            getCardInput('required', false);
            $('#paypal').attr('required', false);

            return true;
        } else if (paypal.is(':selected')) {
            $('#paypal').attr('required', true);
            getCardInput('required', false);
            $('#bitcoin').attr('required', false);

            return true;
        }
    };
    // Function to check if CREDIT CARD IS SELECTED, the CVV field has any items needed, and to add/remove helper class that shows the user their error
    const card_CVV_Val = () => {
        let cardCVV = $('#cvv').val();
        let cvvParse = parseInt(cardCVV);
        // check if the credit card option is selected
        if (creditCard.is(':selected')) {

            // if cvv field empty add class
            if (cardCVV === '') {
                $('#cvv').addClass('submit-error');
                $('.cvv-error').show(500);
    
                return false;
                // else remove the helper class
            } else if (cardCVV !== '' && cvvParse.match(regexCVV)) {
                $('#cvv').removeClass('submit-error');
                $('.cvv-error').hide(500);
    
                return true;
            }
        } else if (bitcoin.is(':seleted')) {

            return true;
        } else if (paypal.is(':selected')) {
            $('#paypal').attr('required', true);
            getCardInput('required', false);
            $('#bitcoin').attr('required', false);

            return true;
        }
    };

    /******************************************
    Event Listeners
    ******************************************/

    // NAME FIELD KEYUP LISTENER
    $('#name').keyup(function(event){
        nameVal();
        event.preventDefault();
    });

    // EMAIL FIELD KEYUP LISTENER
    $('#mail').keyup(function(event){
        emailVal();
        event.preventDefault();
    });

    // BUTTON SUBMIT EVENT LISTENER
    $('form').on('submit',function(event){
        
        nameVal();
        emailVal();
        activityVal();
        creditCardNumberVal();
        cardZipVal();
        card_CVV_Val();
        
        if (nameVal() &&
            emailVal() &&
            activityVal() &&
            creditCardNumberVal() &&
            cardZipVal() &&
            card_CVV_Val()) {
                window.location.reload();
    
                return true;
        } else {
            event.preventDefault()

            return false;
        } 
    });
});