
// Function to initialize and render PayPal button
function initializePayPalButton(amount, containerId, buttonId) {
    // Hide all PayPal button containers and disable all other buttons
    var allContainers = document.querySelectorAll('.paypal-button-container');
    var allButtons = document.querySelectorAll('.buy-btn');
    
    // Hide all PayPal containers and disable all other buttons
    allContainers.forEach(function(container) {
        container.style.display = 'none';
    });
    allButtons.forEach(function(button) {
        button.style.pointerEvents = 'none';  // Disable button (prevents clicking)
        button.style.opacity = '0.5';  // Make it look disabled
    });

    // Show the selected PayPal button container
    var selectedContainer = document.getElementById(containerId);
    if (selectedContainer) {
        selectedContainer.style.display = 'block';

        // Render the PayPal button dynamically
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount  // Use the passed amount for the payment
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Payment successful! Thank you, ' + details.payer.name.given_name);
                    // Optionally, redirect user after payment
                    window.location.href = "success.html";  // Redirect to a "Thank You" page
                });
            },
            onError: function(err) {
                console.error('Payment Error: ', err);
                alert('There was an error processing your payment. Please try again.');
            }
        }).render('#' + containerId); // Renders PayPal button inside the container
    } else {
        console.error('Container not found for ID: ' + containerId);
    }

    // Disable the clicked button
    var selectedButton = document.getElementById(buttonId);
    if (selectedButton) {
        selectedButton.style.pointerEvents = 'none';
        selectedButton.style.opacity = '0.5';
    }
}
