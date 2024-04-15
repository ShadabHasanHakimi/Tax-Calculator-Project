document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const submitButton = document.getElementById('submitButton');

    // function to check if entered number is valid or not
    function isValidNumber(value) {
        return !isNaN(value) && value !== null && value.trim() !== '';
    }

    function validateAndCalculateTax(event) {
        event.preventDefault();

        // Initialize form validity status
        let formIsValid = true;

        const grossIncomeInput = document.getElementById('grossIncome');
        const extraIncomeInput = document.getElementById('extraIncome');
        const deductionsInput = document.getElementById('deductions');
        const ageInput = document.getElementById('age');

        // validating input fields
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

        // Validating age selection
        if (ageInput.value === '') {
            ageInput.classList.add('is-invalid');
            formIsValid = false;
        } else {
            ageInput.classList.remove('is-invalid');
            ageInput.classList.add('is-valid');
        }

        // stop if form is invalid
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
            taxRate = 0.3;
        } else if (ageGroup === '40-60') {
            taxRate = 0.4; 
        } else if (ageGroup === '≥60') {
            taxRate = 0.1;
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

    // submitting the form
    submitButton.addEventListener('click', validateAndCalculateTax);
});



