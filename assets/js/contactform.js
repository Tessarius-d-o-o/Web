const handleFormSubmit = async (event) => {
  
  const form = event.target;
  const formData = new FormData(form);
  const loading = document.querySelector('.loading');
  const errorMessage = document.querySelector('.error-message');
  const sentMessage = document.querySelector('.sent-message');

  // Show loading indicator
  loading.style.display = "block";
  errorMessage.style.display = "none";
  sentMessage.style.display = "none";

  // Convert FormData to JSON
  const formJSON = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formJSON),
    });

    const data = await response.json();
    loading.style.display = "none";

    if (response.ok) {
      sentMessage.textContent = data.message;
      sentMessage.style.display = "block";
      form.reset();
    } else {
      errorMessage.textContent = data.error;
      errorMessage.style.display = "block";
    }
  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Something went wrong. Please try again.";
    errorMessage.style.display = "block";
  }
};

// Attach event listener to form
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#contact-form").addEventListener("submit", handleFormSubmit);
});