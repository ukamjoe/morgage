document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculate');
    const clearButton = document.getElementById('link');
    const mortgageAmountInput = document.getElementById('mortgage');
    const termInput = document.getElementById('term');
    const interestRateInput = document.getElementById('interest');
    const repaymentTypeInputs = document.getElementsByName('RepaymentType');
    const creditOutput = document.getElementById('credit');
    const totalOutput = document.getElementById('total');
    const repayRadio = document.getElementById('repay');
    const interestOnlyRadio = document.getElementById('interest-only');
    const repayDiv = repayRadio.parentElement;
    const interestOnlyDiv = interestOnlyRadio.parentElement;

    const calculateRepayments = () => {
        const mortgageAmount = parseFloat(mortgageAmountInput.value);
        const term = parseInt(termInput.value);
        const interestRate = parseFloat(interestRateInput.value) / 100;
        let monthlyRepayment;

        const selectedRepaymentType = Array.from(repaymentTypeInputs).find(input => input.checked);

        if (selectedRepaymentType && selectedRepaymentType.id === 'repay') {
            const monthlyInterestRate = interestRate / 12;
            const numberOfPayments = term * 12;
            monthlyRepayment = (mortgageAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        } else if (selectedRepaymentType && selectedRepaymentType.id === 'interest-only') {
            monthlyRepayment = (mortgageAmount * interestRate) / 12;
        } else {
            alert('Please select a mortgage type.');
            return;
        }

        const totalRepayment = monthlyRepayment * term * 12;

        creditOutput.textContent = `₤${monthlyRepayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalOutput.textContent = `₤${totalRepayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const clearAll = () => {
        mortgageAmountInput.value = '';
        termInput.value = '';
        interestRateInput.value = '';
        repaymentTypeInputs.forEach(input => input.checked = false);
        creditOutput.textContent = '';
        totalOutput.textContent = '';
        repayDiv.classList.remove('active');
        interestOnlyDiv.classList.remove('active');
    };

    const changeColor = (event) => {
        repayDiv.classList.remove('active');
        interestOnlyDiv.classList.remove('active');

        if (event.target.id === 'repay') {
            repayDiv.classList.add('active');
        } else if (event.target.id === 'interest-only') {
            interestOnlyDiv.classList.add('active');
        }
    };

    calculateButton.addEventListener('click', calculateRepayments);
    clearButton.addEventListener('click', clearAll);
    repayRadio.addEventListener('change', changeColor);
    interestOnlyRadio.addEventListener('change', changeColor);
});
