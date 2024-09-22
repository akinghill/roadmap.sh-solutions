const textarea = document.getElementById('userInput');
const charCountDisplay = document.getElementById('charCount');
const maxChars = 250;

textarea.addEventListener('input', function () {
  const currentLength = textarea.value.length;

  charCountDisplay.textContent = `${currentLength} / ${maxChars}`;

  if (currentLength >= maxChars) {
    textarea.classList.add('limit-reached');
    charCountDisplay.classList.add('limit-reached');
  } else {
    textarea.classList.remove('limit-reached');
    charCountDisplay.classList.remove('limit-reached');
  }
});