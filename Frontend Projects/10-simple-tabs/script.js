function openTab(evt, tabName) {
  // Get all elements with class="tab-content" and hide them
  var tabContent = document.querySelectorAll('.tab-content');
  tabContent.forEach(content => content.style.display = 'none');

  // Get all elements with class="tab-link" and remove the class "active"
  var tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Show the current tab, and add an "active" class to the clicked tab
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.classList.add('active');
}

// Show the first tab by default
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.tab-content').style.display = 'block';
});