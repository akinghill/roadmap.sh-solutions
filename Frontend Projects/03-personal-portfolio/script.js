const theme = localStorage.getItem('theme');
if (theme) {
  document.body.setAttribute('data-theme', theme);
} else {
  localStorage.setItem('theme', 'dark');
}

function toggleTheme() {
  const sunIcon = document.getElementById('sun_icon');
  const moonIcon = document.getElementById('moon_icon');
  const body = document.body;
  const theme = body.getAttribute('data-theme');
  body.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}
