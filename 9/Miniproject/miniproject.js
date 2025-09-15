window.onload = function() {
    const buttons = document.querySelectorAll('.btn-primary');
    const totalDisplay = document.getElementById('total');
    const billItemsContainer = document.getElementById('bill-items');
    const resetBtn = document.getElementById('reset-total-btn');

    const resetModal = document.getElementById('reset-confirm');
    const confirmReset = document.getElementById('confirm-reset');
    const cancelReset = document.getElementById('cancel-reset');
    const resetMessage = document.getElementById('reset-message');

    let total = 0;

    billItemsContainer.innerHTML = '';
    totalDisplay.textContent = total;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const name = card.querySelector('.card-text').innerText.split('\n')[0];
            const priceText = card.querySelector('.card-body p:nth-of-type(2)').innerText;
            const price = Number(priceText.replace('₹',''));

            total += price;
            totalDisplay.textContent = total;

            const item = document.createElement('p');
            item.textContent = `${name} - ₹${price}`;
            billItemsContainer.appendChild(item);
        });
    });

    resetBtn.addEventListener('click', () => {
        resetMessage.textContent = "Do you really want to clear your current bill?";
        resetModal.style.display = 'flex';
    });

    cancelReset.addEventListener('click', () => {
        resetModal.style.display = 'none';
    });

    confirmReset.addEventListener('click', () => {
        total = 0;
        totalDisplay.textContent = total;
        billItemsContainer.innerHTML = '';
        resetModal.style.display = 'none';
    });
};


