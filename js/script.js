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

    /******************************************
    Functions
    ******************************************/

    // function to set attribute value
    const setAttribute = (selector,attr, val) => {
        selector.attr(attr,val);
    };
    
     // Helper function to display css class to user and return true for validation
     const add_class_show = (selector, selector_2, className) => {
        selector.addClass(className);
        selector_2.show(500);
    };
    // Helper function to display css class to user and return false for validation
    const rem_class_hide = (selector, selector_2, className) => {
        selector.removeClass(className);
        selector_2.hide(500);
    };

    // helper function to add/remove classes
    const rem_add_class = (remove, add1, add2, className) => {
        remove.removeClass(className);
        add1.addClass(className);
        add2.addClass(className);
    };

    const checkboxIsChecked = () => {
        const checkbox = $('fieldset.activities input');
        

        for (i = 0; i < checkbox.length; i ++){
            if(checkbox[i].checked === true){
                return true;
            }
        }
        return false;
    };
        
      // check email against regex
      const checkEmail = (email) => {
          if (regexEmail.test(email)){
            return true;
          }
        return false;
      };

      // check credit card agaist regex
      const checkCredit = (cardNumber) => {
          if (regexCreditCard.test(cardNumber)) {
              return true;
          } 
        return false;
      };

      // check zip against regex
      const checkZip = (zip) => {
          if (regexZipCode.test(zip)) {
              return true;
          } 
        return false;
      };

      // check cvv against regex
      const checkCVV = (cvv) => {
          if (regexCVV.test(cvv)) {
              return true;
          }
        return false;
      };
    // function to add validation messages to the page for the user
    const validationMessages = (label, error, targethide) => {
        label.append(error);
        targethide.hide();
    };

    const addHelperContent = () => {
        // Validation Messages
        validationMessages(NAME_LABEL,NAME_ERROR,$('.name-error'));
        validationMessages(EMAIL_LABEL,EMAIL_ERROR,$('.email-error'));
        validationMessages(EMAIL_LABEL,EMAIL_SUCCESS,$('.email-success'));
        validationMessages(ACTIVITY_LABEL,ACTIVITY_ERROR,$('.activity-error'));
        validationMessages(CREDIT_LABEL,CREDIT_NUMBER_ERROR,$('.credit-error'));
        validationMessages(ZIP_LABEL,CREDIT_ZIP_ERROR,$('.zip-error'));
        validationMessages(CVV_LABEL,CREDIT_CVV_ERROR,$('.cvv-error'));

        // hide validation messages
        $('.name-error').hide();
        $('.email-error').hide();
        $('.email-success').hide();
        $('.activity-error').hide();
        $('.credit-error').hide();
        $('.zip-error').hide();
        $('.cvv-error').hide();

        // Required Content
        $('#cc-num').attr({'minlength': 13,'maxlength': 16});
        $('#zip').attr({'minlength': 5,'maxlength': 5});
        $('#cvv').attr({'minlength': 3,'maxlength': 3});
    }; 
    addHelperContent();
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
            setAttribute($('#color option'),'hidden',true);

            // if target is equal to js puns, set all display attributes to hidden then show them and select the first one
            if (jsPUNS === true) {
                $('#color option:contains(JS Puns shirt only)').each(function(){
                    setAttribute($(this),'selected',false);
                });

                setAttribute($(':contains(JS Puns shirt only)'),'hidden',false);
                $('#color option').eq(0).attr('selected',true);

            // if target is equal to heart js, set all display attributes to hidden then show them and select the first one
            } else if (heartJS === true) {
                $('#color option:contains(JS shirt only)').each(function(){
                    setAttribute($(this),'selected',false);
                });

                setAttribute($(':contains(JS shirt only)'),'hidden',false);
                $('#color option').eq(3).attr('selected', true);
            // else set all the display attribute back to hidden
            } else {
                setAttribute($('#color option'),'hidden',true);
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
                    setAttribute($(element),'disabled',true);
                } else {
                    // remove disabled attribute
                    setAttribute($(element),'disabled',false);
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
    setAttribute(creditCard,'selected',true);
    
    // Hide the Paypal and Bitcoin divs intially
    $('#paypal').addClass('is-hidden');
    $('#bitcoin').addClass('is-hidden');

    // set the credit card values to required right away since it is defaulted to selected, options later change this if payment option changes
    setAttribute($('#cc-num'),'required',true);
    setAttribute($('#zip'),'required',true);
    setAttribute($('#cvv'),'required',true);

    // click event listener for the payment method options
    $('#payment').change(function(e){
        let select = e.target;

        // if target value equals credit card
        if ($(select).val() === creditCard.val()) {
            // credit card select method true
            setAttribute(creditCard,'selected',true);

            // other payment methods false
            setAttribute(paypal,'selected',false);
            setAttribute(bitcoin,'selected',false);
            
        } else if ($(select).val() === paypal.val()) {
            // paypal select method true
            setAttribute(paypal,'selected',true);
            // other payment methods false
            setAttribute(creditCard,'selected',false);
            setAttribute(bitcoin,'selected',false);

        } else if ($(select).val() === bitcoin.val()) {
            // bitcoin select method true
            setAttribute(bitcoin,'selected',true);
            // other payment methods false
            setAttribute(creditCard,'selected',false);
            setAttribute(paypal,'selected',false);
        }

        // if/else statement to hide payment sections based on which is selected
        if (creditCard.is(':selected')) {
            // show payment method
            rem_add_class($('#credit-card'),$('#paypal'),$('#bitcoin'),'is-hidden');
            // set credit card required to true
            setAttribute($('#cc-num'),'required',true);
            setAttribute($('#zip'),'required',true);
            setAttribute($('#cvv'),'required',true);
        } else if(paypal.is(':selected')) {
            // show payment method
            rem_add_class($('#paypal'),$('#credit-card'),$('#bitcoin'),'is-hidden');
            // set credit card required to false
            setAttribute($('#cc-num'),'required',false);
            setAttribute($('#zip'),'required',false);
            setAttribute($('#cvv'),'required',false);
        } else if (bitcoin.is(':selected')) {
            // show payment method
            rem_add_class($('#bitcoin'),$('#paypal'),$('#credit-card'),'is-hidden');
            // set credit card required to false
            setAttribute($('#cc-num'),'required',false);
            setAttribute($('#zip'),'required',false);
            setAttribute($('#cvv'),'required',false);
        }
    });

    /******************************************
    Form Validation
    ******************************************/

    // Function to check if NAME field is blank and to add/remove helper class that shows the user their error
    const name_helper = () => {
        const nameValue = $('#name').val();
        
        if (nameValue !== '') {
            rem_class_hide($('#name'),$('.name-error'),'submit-error');
        } else {
            add_class_show($('#name'),$('.name-error'),'submit-error');
        }
    };

    // Function to check if EMAIL field is blank and to add/remove helper class that shows the user their error
    const email_helper = () => {
        const email = $('input#mail');
        let emailValue = email.val();

        if (checkEmail(emailValue) === true) {
            email.removeClass('submit-error');
            $('.email-error').hide(500);
            $('.email-success').show(500);
            
        } else if (checkEmail(emailValue) === false || emailValue === ''){
            email.addClass('submit-error');
            $('.email-error').show(500);
            $('.email-success').hide();
            
        }
    };

    // Function to check if ACTIVITIES field has any items checked, and to add/remove helper class that shows the user their error
    const activity_helper = () => {
        const fieldsetLegend = $('fieldset.activities legend');
        // const checkboxIsChecked = $('fieldset.activities :checkbox:checked');
        $('.activity-error').show(500);

        $('input[type="checkbox"]').change(function(){
            if (checkboxIsChecked() === true) {
                rem_class_hide(fieldsetLegend,$('.activity-error'),'submit-error');
            } else {
                add_class_show(fieldsetLegend,$('.activity-error'),'submit-error');
            }
        });
    };

    /******************************************
    Event Listeners
    ******************************************/

    // NAME FIELD KEYUP LISTENER
    $('#name').keyup(function(){
        name_helper();
    });

    // EMAIL FIELD KEYUP LISTENER
    $('#mail').keyup(function(){
        email_helper();
    });

    //Call functions to check if valid before submitting
    activity_helper();
    
    // BUTTON SUBMIT EVENT LISTENER
    $('button[type="submit"]').on('click',function(e){
        const fieldsetLegend = $('fieldset.activities legend');
        let paymentType = $('#payment option:selected').text();
        let emailValue = $('input#mail').val();
        let cardNumber_val = $('#cc-num').val();
        let numberParse_val = parseInt(cardNumber_val);
        let cardZip_val = $('#zip').val();
        let zipParse_val = parseInt(cardZip_val);
        let cardCVV_val = $('#cvv').val();
        let cvvParse_val = parseInt(cardCVV_val);

        // name validation
        if ($('#name').val() === '' || $('#name').val().length === 0) {
            add_class_show($('#name'),$('.name-error'),'submit-error');
            e.preventDefault();
        } else {
            rem_class_hide($('#name'),$('.name-error'),'submit-error');
        }

        // validate that email address is formatted like others
        if (checkEmail(emailValue) === false || emailValue.length === 0) {
            $('#email').addClass('submit-error');
            $('.email-error').show(500);
            $('.email-success').hide();
            e.preventDefault();
        } else {
            $('#email').removeClass('submit-error');
            $('.email-error').hide(500);
            $('.email-success').show(500);
        }

        //validate that the user has checked at least one checkbox
        if (checkboxIsChecked() === false) {
            add_class_show(fieldsetLegend,$('.activity-error'),'submit-error');
            e.preventDefault();
        } else {
            rem_class_hide(fieldsetLegend,$('.activity-error'),'submit-error');
        }

        // credit card option validation
        if (paymentType === 'Credit Card') {
            
            // set required attribute to credit card info
            setAttribute($('#cc-num'),'required',true);
            setAttribute($('#zip'),'required',true);
            setAttribute($('#cvv'),'required',true);

            //helper functions to display css classes

            // check credit card
            if (checkCredit(numberParse_val) === false) {
                add_class_show($('#cc-num'),$('.credit-error'),'submit-error');
                e.preventDefault();
            } else {
                rem_class_hide($('#cc-num'),$('.credit-error'),'submit-error');
            }

            // check zip code
            if (checkZip(zipParse_val) === false) {
                add_class_show($('#zip'),$('.zip-error'),'submit-error');
                e.preventDefault();
            } else {
                rem_class_hide($('#zip'),$('.zip-error'),'submit-error');
            }

            // check cvv number
            if (checkCVV(cvvParse_val) === false) {
                add_class_show($('#cvv'),$('.cvv-error'),'submit-error');
                e.preventDefault();
            } else {
                rem_class_hide($('#cvv'),$('.cvv-error'),'submit-error');
            }

        } else if (paymentType === 'PayPal'){
            // remove required attribute
            setAttribute($('#cc-num'),'required',false);
            setAttribute($('#zip'),'required',false);
            setAttribute($('#cvv'),'required',false);
        } else if (paymentType === 'Bitcoin') {
            // remove required attribute
            setAttribute($('#cc-num'),'required',false);
            setAttribute($('#zip'),'required',false);
            setAttribute($('#cvv'),'required',false);
        }
        
    });
});