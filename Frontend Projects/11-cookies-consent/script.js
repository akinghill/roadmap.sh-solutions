// Check if consent is already given
document.addEventListener('DOMContentLoaded', function () {
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieConsent').style.display = 'block';
  }
});

// Accept cookies and hide the popup
document.getElementById('acceptCookies').addEventListener('click', function () {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieConsent').style.display = 'none';
});

// Close the popup without accepting
document.getElementById('closeCookie').addEventListener('click', function () {
  document.getElementById('cookieConsent').style.display = 'none';
});