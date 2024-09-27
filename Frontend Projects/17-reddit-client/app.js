document.addEventListener('DOMContentLoaded', () => {
  const lanesContainer = document.getElementById('lanes');
  const addLaneButton = document.getElementById('add-lane-button');
  const subredditModal = document.getElementById('addSubredditModal');
  const subredditInput = document.getElementById('subreddit-input');
  const addSubredditButton = document.getElementById('addSubredditButton');
  const modalOverlay = document.getElementById('modal-overlay');

  // Open/close modal helper
  function toggleModal(show) {
    subredditModal.style.display = show ? 'block' : 'none';
    if (!show) subredditInput.value = ''; // Clear input when hiding modal
  }

  // Close modal when clicking outside of it
  modalOverlay.addEventListener('click', () => toggleModal(false));

  const modalContent = document.querySelector('.modal-content'); // Adjust selector as needed
  modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Initialize stored subreddits from localStorage
  const savedSubreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
  savedSubreddits.forEach(addLane);

  // Open the modal to add a subreddit
  addLaneButton.addEventListener('click', () => toggleModal(true));

  // Add subreddit from input
  addSubredditButton.addEventListener('click', () => {
    const subreddit = subredditInput.value.trim();
    if (subreddit) {
      addLane(subreddit);
      saveSubreddit(subreddit);
    }
    toggleModal(false);
  });

  // Save added subreddit to localStorage
  function saveSubreddit(subreddit) {
    const subreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
    subreddits.push(subreddit);
    localStorage.setItem('subreddits', JSON.stringify(subreddits));
  }

  // Add a lane for the subreddit
  function addLane(subreddit) {
    const lane = document.createElement('div');
    lane.classList.add('lane');
    lane.innerHTML = `
        <div class="lane-header">
            <h3>/r/${subreddit}</h3>
            <div class="lane-options">
                <button class="options-button">
                    <span></span>
                </button>
                <div class="options-menu hidden">
                    <button class="refresh-lane">Refresh</button>
                    <button class="delete-lane">Delete</button>
                </div>
            </div>
        </div>
        <div class="posts" id="${subreddit}-posts">Loading...</div>
    `;
    lanesContainer.appendChild(lane);

    fetchSubredditPosts(subreddit);
  }

  // Fetch posts from Reddit JSON API
  function fetchSubredditPosts(subreddit) {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Subreddit not found');
        }
        return response.json();
      })
      .then(data => {
        const postsContainer = document.getElementById(`${subreddit}-posts`);
        postsContainer.innerHTML = '';  // Clear loading text
        data.data.children.forEach(postData => {
          const post = createPostElement(postData.data);
          postsContainer.appendChild(post);
        });
      })
      .catch(error => {
        document.getElementById(`${subreddit}-posts`).innerText = 'Error loading subreddit';
        console.error(error);
      });
  }

  // Create post element
  function createPostElement(postData) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.addEventListener('click', () => {
      window.open('https://reddit.com' + postData.permalink, '_blank');
    });

    // Votes container
    const votesDiv = document.createElement('div');
    votesDiv.classList.add('votes');

    const upvoteButton = document.createElement('button');
    upvoteButton.classList.add('upvote');
    upvoteButton.innerHTML = '▲'; // Upvote arrow

    const voteCount = document.createElement('span');
    voteCount.classList.add('vote-count');
    voteCount.textContent = postData.ups;

    votesDiv.appendChild(upvoteButton);
    votesDiv.appendChild(voteCount);

    // Post content container
    const postContentDiv = document.createElement('div');
    postContentDiv.classList.add('post-content');

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title');
    postTitle.textContent = postData.title;

    const postAuthor = document.createElement('p');
    postAuthor.classList.add('post-author');
    postAuthor.textContent = 'By: ' + postData.author;

    postContentDiv.appendChild(postTitle);
    postContentDiv.appendChild(postAuthor);

    postDiv.appendChild(votesDiv);
    postDiv.appendChild(postContentDiv);

    return postDiv;
  }

  // Event delegation for lanes
  lanesContainer.addEventListener('click', (e) => {
    if (e.target.matches('.delete-lane')) {
      const lane = e.target.closest('.lane');
      const subreddit = lane.querySelector('h3').textContent.replace('/r/', '');
      lane.remove();
      removeSubreddit(subreddit);
    }

    if (e.target.matches('.refresh-lane')) {
      const lane = e.target.closest('.lane');
      const subreddit = lane.querySelector('h3').textContent.replace('/r/', '');
      fetchSubredditPosts(subreddit);
    }

    if (e.target.matches('.options-button')) {
      const optionsMenu = e.target.closest('.lane-options').querySelector('.options-menu');
      optionsMenu.classList.toggle('hidden');
    }
  });

  // Remove subreddit from localStorage
  function removeSubreddit(subreddit) {
    let subreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
    subreddits = subreddits.filter(sub => sub !== subreddit);
    localStorage.setItem('subreddits', JSON.stringify(subreddits));
  }
});