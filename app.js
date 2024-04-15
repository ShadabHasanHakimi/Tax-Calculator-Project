// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('taxForm');

//     // Function to validate input fields and calculate tax
//     function validateAndCalculateTax(event) {
//         // Prevent default form submission
//         event.preventDefault();
        
//         // Check form validity
//         if (!form.checkValidity()) {
//             // If the form is invalid, stop further execution
//             form.classList.add('was-validated');
//             return;
//         }
        
//         // Form is valid, proceed with the calculation
//         form.classList.remove('was-validated');

//         // Get form elements
//         const grossIncomeInput = document.getElementById('grossIncome');
//         const extraIncomeInput = document.getElementById('extraIncome');
//         const deductionsInput = document.getElementById('deductions');
//         const ageInput = document.getElementById('age');

//         // Get input values
//         const grossIncome = parseFloat(grossIncomeInput.value);
//         const extraIncome = parseFloat(extraIncomeInput.value);
//         const deductions = parseFloat(deductionsInput.value);
//         const ageGroup = ageInput.value;

//         // Validate input values
//         if (!isValidNumber(grossIncome) || !isValidNumber(extraIncome) || !isValidNumber(deductions)) {
//             alert('Please enter valid numbers in all fields.');
//             return;
//         }

//         // Calculate total income
//         const totalIncome = grossIncome + extraIncome - deductions;

//         // Determine tax rate based on age group
//         let taxRate = 0;
//         if (ageGroup === '<40') {
//             taxRate = 0.3; // 30% for age < 40
//         } else if (ageGroup === '40-60') {
//             taxRate = 0.4; // 40% for age ≥ 40 & < 60
//         } else if (ageGroup === '≥60') {
//             taxRate = 0.1; // 10% for age ≥ 60
//         }

//         // Calculate taxable income
//         const taxableIncome = totalIncome - 800000; // Income over 8 Lakhs

//         // Calculate tax amount
//         let taxAmount = 0;
//         if (taxableIncome > 0) {
//             taxAmount = taxableIncome * taxRate;
//         }

//         // Display results in the modal
//         const resultContent = `
//             <p><h4 style="display: flex; justify-content: center;">Your overall income will be</h4><span style="display: flex; justify-content: center;">${totalIncome.toFixed(2)-taxAmount.toFixed(2)} Lakhs</span>
//             <h6 style="display: flex; justify-content: center;">after tax deductions</h6></p>
//             <p style="display: flex; justify-content: center;"><strong>Tax Amount: </strong> ${taxAmount.toFixed(2)} Lakhs</p>
//         `;
//         document.getElementById('resultContent').innerHTML = resultContent;

//         // Show the modal
//         const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
//         resultModal.show();

//         document.addEventListener('DOMContentLoaded', function () {
//             // Initialize all tooltips
//             const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
//             const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//                 return new bootstrap.Tooltip(tooltipTriggerEl);
//             });
//         });
        
//     }

//     // Attach event listener to submit button
//     document.getElementById('submitButton').addEventListener('click', validateAndCalculateTax);
// });



document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const submitButton = document.getElementById('submitButton');

    // Function to check if a value is a valid number
    function isValidNumber(value) {
        return !isNaN(value) && value !== null && value.trim() !== '';
    }

    // Function to validate input fields and calculate tax
    function validateAndCalculateTax(event) {
        // Prevent default form submission
        event.preventDefault();

        // Initialize form validity status
        let formIsValid = true;

        // Get form elements
        const grossIncomeInput = document.getElementById('grossIncome');
        const extraIncomeInput = document.getElementById('extraIncome');
        const deductionsInput = document.getElementById('deductions');
        const ageInput = document.getElementById('age');

        // Validate each input field
        [grossIncomeInput, extraIncomeInput, deductionsInput].forEach((input) => {
            const value = input.value;

            if (!isValidNumber(value)) {
                // If the input is not a valid number
                input.classList.add('is-invalid');
                formIsValid = false;
            } else {
                // If the input is valid
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });

        // Validate age selection
        if (ageInput.value === '') {
            ageInput.classList.add('is-invalid');
            formIsValid = false;
        } else {
            ageInput.classList.remove('is-invalid');
            ageInput.classList.add('is-valid');
        }

        // Stop further execution if form is invalid
        if (!formIsValid) {
            form.classList.add('was-validated');
            return;
        }

        // Convert input values to floats
        const grossIncome = parseFloat(grossIncomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);
        const ageGroup = ageInput.value;

        // Calculate total income
        const totalIncome = grossIncome + extraIncome - deductions;

        // Determine tax rate based on age group
        let taxRate = 0;
        if (ageGroup === '<40') {
            taxRate = 0.3; // 30% for age < 40
        } else if (ageGroup === '40-60') {
            taxRate = 0.4; // 40% for age ≥ 40 & <60
        } else if (ageGroup === '≥60') {
            taxRate = 0.1; // 10% for age ≥60
        }

        // Calculate taxable income and tax amount
        const taxableIncome = totalIncome - 800000; // Income over 8 Lakhs

        let taxAmount = 0;
        if (taxableIncome > 0) {
            taxAmount = taxableIncome * taxRate;
        }

        // Calculate overall income after tax deductions
        const overallIncome = totalIncome - taxAmount;

        // Display results in the modal
        const resultContent = `
            <p><h4 style="display: flex; justify-content: center;">Your overall income will be</h4>
            <span style="display: flex; justify-content: center;">${overallIncome.toFixed(2)}</span>
            <h6 style="display: flex; justify-content: center;">after tax deductions</h6></p>
            <p style="display: flex; justify-content: center;"><strong>Tax Amount: </strong>${taxAmount.toFixed(2)} Lakhs</p>
        `;
        document.getElementById('resultContent').innerHTML = resultContent;

        // Show the modal
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
    }

    // Attach event listener to the form submission
    submitButton.addEventListener('click', validateAndCalculateTax);
});



