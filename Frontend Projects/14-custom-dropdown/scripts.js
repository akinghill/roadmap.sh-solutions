document.addEventListener('DOMContentLoaded', function () {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownList = document.getElementById('dropdownList');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  let selectedItem = null;

  // Toggle dropdown list open/close
  dropdownBtn.addEventListener('click', function () {
    dropdownList.classList.toggle('open');
    dropdownBtn.classList.toggle('selected');
  });

  // Handle item selection
  dropdownItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Set the selected item's text to the button
      dropdownBtn.textContent = this.textContent;

      // Remove 'selected' class from all items
      dropdownItems.forEach(i => i.classList.remove('selected'));

      // Add 'selected' class to the clicked item
      this.classList.add('selected');
      selectedItem = this;

      // Close the dropdown and ensure the arrow points down
      dropdownList.classList.remove('open');
      dropdownBtn.classList.remove('selected');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
      dropdownList.classList.remove('open');
      dropdownBtn.classList.remove('selected');
    }
  });
});