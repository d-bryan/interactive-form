# Techdegree Unit-03 Interactive Form Project

## Assignment:

In this project, you'll use JavaScript to enhance an interactive registration form for a fictional conference called "FullStack Conf."

Using the supplied HTML and CSS files, you'll add your own JavaScript to make the form more user-friendly by:

- adding customized and conditional behavior and interactivity
- validating user input and providing helpful error messages when the user enters invalid information into the form fields.

Instead of plain "vanilla" JavaScript, you'll use the popular jQuery library to complete this project. While it's important for a developer to have a solid understanding and familiarity of plain vanilla JavaScript, it's also important to be able to understand and work with jQuery since it is so common and prevalent on the web.

## Grading Requirements:

My goal is to land an exceeds expectations grade for this project, to which the requirements are listed by each grading ruberic below.

## jQuery:

### Meets Expectations (Exceeds Expectations N/A):

Project includes jQuery and utilizes it in at least some aspect of the form.

## Focus on the first field:

### Meets Expectations (Exceeds Expectations N/A):

On page load, the cursor appears in the "Name" field, ready for a user to type.

## Job Role Selection:

### Meets Expectations (Exceeds Expectations N/A):

"Your job role" text field appears when user selects "Other" from the Job Role menu.

## T-Shirt Selection:

### Meets Expectations:

Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.

When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.

### Exceeds Expectations:

“Color” drop down menu is hidden until a T-Shirt design is selected.

## Activity Registration:

### Meets Expectations (Exceeds Expectations N/A):

User cannot select two activities that are at the same time.

Total cost of selected activities is calculated and displayed below the list of activities.

## Displaying Payment Sections:

### Meets Expectations (Exceeds Expectations N/A):

The "Credit Card" payment option is selected by default.

Payment option in the select menu matches the payment option displayed on the page.

When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden.

## Form Validation:

### Meets Expectations (Exceeds Expectations N/A):

Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met:
- Name field isn’t blank.
- Email field contains validly formatted e-mail address: (doesn’t have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com, for example).
- At least one checkbox under "Register for Activities" section must be selected.
- If "Credit Card" is the selected payment option, the three fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-number CVV value.

## Form Validation Messages:

### Meets Expectations:

On submission, the form provides an error indication or message for each field that requires validation:
- Name field
- Email field
- “Register for Activities” checkboxes
- Credit Card number, Zip code, and CVV, only if the credit card payment method is selected.

### Exceeds Expectations:

Form provides at least one error message in real time, before the form is submitted. For example, the error message appears near the email field when the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address.

Form provides at least one error message that changes depending on the error. For example, the email field displays a different error message when the email field is empty than it does when the email address is formatted incorrectly. *This is accomplished without the use of HTML5's built-in field validation.

## Form Works without JavaScript:

### Meets Expectations (Exceeds Expectations N/A):

When JavaScript is disabled, all form fields and payment information is displayed, including the "Other" field under the "Job Role" section.

## Extra Credit Options:

### T-Shirt Selections:

Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

### Conditional Error Message:

Program at least one of your error messages so that more information is provided depending on the error. For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is between 13 and 16 digits long.”

### Real-Time Error Messages:

Program your form so that it provides a real-time validation error message for at least one text input field. Rather than providing an error message on submit, your form should check for errors and display messages as the user begins typing inside a text field. For example, if the user enters an invalid email address, the error appears as the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address. You must accomplish this will your own JavaScript code. Do not rely on HTML5's built-in email validation.
