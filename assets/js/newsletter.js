const subscribeNewsletter = () => {
  console.log('Usao')
  const form = document.querySelector('.php-email-form');
  const email = form.querySelector('[name="email"]').value;
  const loading = document.querySelector('.loading');
  const errorMessage = document.querySelector('.error-message');
  const sentMessage = document.querySelector('.sent-message');

  // Show loading
  loading.style.display = 'block';
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';

  // Send form data to the server
  fetch('http://localhost:3000/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
    .then(response => response.json())
    .then(data => {
      loading.style.display = 'none';
      if (data.error) {
        errorMessage.textContent = data.error;
        errorMessage.style.display = 'block';
      } else if (data.message) {
        sentMessage.textContent = data.message;
        sentMessage.style.display = 'block';
      }
    })
    .catch(err => {
      loading.style.display = 'none';
      errorMessage.textContent = 'Something went wrong. Please try again.';
      errorMessage.style.display = 'block';
    });
};
