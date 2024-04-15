document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');

    // Function to validate input fields and calculate tax
    function validateAndCalculateTax(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Check form validity
        if (!form.checkValidity()) {
            // If the form is invalid, stop further execution
            form.classList.add('was-validated');
            return;
        }
        
        // Form is valid, proceed with the calculation
        form.classList.remove('was-validated');

        // Get form elements
        const grossIncomeInput = document.getElementById('grossIncome');
        const extraIncomeInput = document.getElementById('extraIncome');
        const deductionsInput = document.getElementById('deductions');
        const ageInput = document.getElementById('age');

        // Get input values
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
            taxRate = 0.4; // 40% for age ≥ 40 & < 60
        } else if (ageGroup === '≥60') {
            taxRate = 0.1; // 10% for age ≥ 60
        }

        // Calculate taxable income
        const taxableIncome = totalIncome - 800000; // Income over 8 Lakhs

        // Calculate tax amount
        let taxAmount = 0;
        if (taxableIncome > 0) {
            taxAmount = taxableIncome * taxRate;
        }

        // Display results in the modal
        const resultContent = `
            <p><h3 style="display: flex; justify-content: center;">Your overall income will be</h3><span style="display: flex; justify-content: center;">${totalIncome.toFixed(2)-taxAmount.toFixed(2)} Lakhs</span>
            <h6 style="display: flex; justify-content: center;">after tax deductions</h6></p>
            <p style="display: flex; justify-content: center;"><strong>Tax Amount: </strong> ${taxAmount.toFixed(2)} Lakhs</p>
        `;
        document.getElementById('resultContent').innerHTML = resultContent;

        // Show the modal
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();

        document.addEventListener('DOMContentLoaded', function () {
            // Initialize all tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });
        
    }

    // Attach event listener to submit button
    document.getElementById('submitButton').addEventListener('click', validateAndCalculateTax);
});
