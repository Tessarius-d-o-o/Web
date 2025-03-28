document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".php-email-form").addEventListener("submit", function (event) {
        event.preventDefault();
        
        var form = this;
        var formData = new FormData(form);
        var loading = document.querySelector(".loading");
        var errorMessage = document.querySelector(".error-message");
        var sentMessage = document.querySelector(".sent-message");
        
        loading.style.display = "block";
        errorMessage.style.display = "none";
        sentMessage.style.display = "none";
        
        fetch(form.action, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            loading.style.display = "none";
            if (data.status === "success") {
                sentMessage.style.display = "block";
                form.reset();
            } else {
                errorMessage.textContent = data.message;
                errorMessage.style.display = "block";
            }
        })
        .catch(error => {
            loading.style.display = "none";
            errorMessage.textContent = "Something went wrong. Please try again.";
            errorMessage.style.display = "block";
        });
    });
});
