/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
// Global Variables
const colorOption = $('#color');
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



