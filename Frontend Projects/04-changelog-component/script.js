// Create theme toggle button
const themeToggleBtn = document.createElement('button');
themeToggleBtn.style.position = 'fixed';
themeToggleBtn.style.bottom = '10px';
themeToggleBtn.style.right = '10px';
document.body.appendChild(themeToggleBtn);

// Create sun and moon icons
const sunIcon = createIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
  stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>`);

const moonIcon = createIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
  stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon">
    <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z"></path>
  </svg>`);

themeToggleBtn.appendChild(sunIcon);
themeToggleBtn.appendChild(moonIcon);

// Set initial theme based on localStorage or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

// Toggle theme on button click
themeToggleBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
  const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

function createIcon(svgContent) {
  const icon = document.createElement('div');
  icon.innerHTML = svgContent;
  icon.style.width = '24px';
  icon.style.height = '24px';
  return icon;
}
