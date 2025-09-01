window.onload = function() {
    // ===== Select elements =====
    const buttons = document.querySelectorAll('.btn-primary');
    const totalDisplay = document.getElementById('total');
    const billItemsContainer = document.getElementById('bill-items');
    const resetBtn = document.getElementById('reset-total-btn');

    // Modal elements
    const resetModal = document.getElementById('reset-confirm');
    const confirmReset = document.getElementById('confirm-reset');
    const cancelReset = document.getElementById('cancel-reset');
    const resetMessage = document.getElementById('reset-message');

    let total = 0;

    // Clear initial placeholder text
    billItemsContainer.innerHTML = '';
    totalDisplay.textContent = total;

    // ===== Add items to bill =====
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const name = card.querySelector('.card-text').innerText.split('\n')[0];
            const priceText = card.querySelector('.card-body p:nth-of-type(2)').innerText;
            const price = Number(priceText.replace('₹',''));

            // Update total
            total += price;
            totalDisplay.textContent = total;

            // Add item to bill list
            const item = document.createElement('p');
            item.textContent = `${name} - ₹${price}`;
            billItemsContainer.appendChild(item);
        });
    });

    // ===== Show reset modal =====
    resetBtn.addEventListener('click', () => {
        resetMessage.textContent = "Do you really want to clear your current bill?";
        resetModal.style.display = 'flex';
    });

    // ===== Cancel reset =====
    cancelReset.addEventListener('click', () => {
        resetModal.style.display = 'none';
    });

    // ===== Confirm reset =====
    confirmReset.addEventListener('click', () => {
        total = 0;
        totalDisplay.textContent = total;
        billItemsContainer.innerHTML = '';
        resetModal.style.display = 'none';
    });
};


