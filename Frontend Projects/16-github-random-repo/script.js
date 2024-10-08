const languageSelect = document.getElementById('language-select');
const repoDetails = document.getElementById('repo-details');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const empty = document.getElementById('empty');
const refreshButton = document.getElementById('refresh');

const languagesUrl = 'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';

async function loadLanguages() {
  try {
    const response = await fetch(languagesUrl);
    const languages = await response.json();
    populateLanguageDropdown(languages);
  } catch (error) {
    showError('Failed to load languages.');
  }
}

function populateLanguageDropdown(languages) {
  languages.forEach(language => {
    const option = document.createElement('option');
    option.value = language.value;
    option.textContent = language.title;
    languageSelect.appendChild(option);
  });
}

async function fetchRandomRepo() {
  const selectedLanguage = languageSelect.value;
  if (!selectedLanguage) {
    alert('Please select a language first.');
    return;
  }

  showLoading();
  clearMessages();

  const apiUrl = `https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
      displayRepo(randomRepo);
    } else {
      showEmpty();
    }
  } catch (error) {
    hideRepoDetails();
    showError('Failed to fetch repository.');
  } finally {
    hideLoading();
  }
}

function displayRepo(repo) {
  repoDetails.style.display = 'flex';
  repoDetails.innerHTML = `
        <h2>${repo.name}</h2>
        <p>${repo.description || 'No description available'}</p>
        <div class="repo-info">
        <p>
          <i class="fas fa-star"></i> ${repo.stargazers_count}
        </p>
        <p>
          <i class="fas fa-code-branch"></i> ${repo.forks_count}
        </p>
        <p>
          <i class="fas fa-exclamation-circle"></i> ${repo.open_issues_count}
        </p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        </div>
      `;
  refreshButton.style.display = 'block';
}

function showLoading() {
  hideRepoDetails();
  loading.style.display = 'flex';
}

function hideLoading() {
  loading.style.display = 'none';
}

function hideRepoDetails() {
  repoDetails.style.display = 'none';
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'flex';
}

function showEmpty() {
  hideRepoDetails();
  empty.style.display = 'flex';
}

function clearMessages() {
  errorDiv.style.display = 'none';
  empty.style.display = 'none';
  repoDetails.innerHTML = '';
}

languageSelect.addEventListener('change', fetchRandomRepo);
refreshButton.addEventListener('click', fetchRandomRepo);

loadLanguages();