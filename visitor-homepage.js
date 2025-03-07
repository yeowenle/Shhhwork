// Function to redirect to the homepage
function goToHomepage() {
    window.location.href = 'visitor-homepage.html'; // Replace 'index.html' with your homepage URL
}

// Function to show the index section
function showIndex() {
    document.getElementById('indexSection').style.display = 'block';
    document.getElementById('searchResultsSection').style.display = 'none';
    loadTrendingPosts(); // Load trending posts when the index section is shown
}

// Function to show the search results section
function showSearchResults() {
    document.getElementById('indexSection').style.display = 'none';
    document.getElementById('searchResultsSection').style.display = 'block';
}

// Function to perform search from the index page
function performSearch() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        showSearchResults();
        displaySearchResults(query);
    }
}

// Function to perform search from the search results page
function performSearchResults() {
    const query = document.getElementById('searchQueryResults').value;
    if (query) {
        displaySearchResults(query);
    }
}

// Mock data (replace this with your actual data source)
const mockPosts = [
    { company: "AIA Insurance", date: "Aug 19, 2024", content: "My manager married my boss... and before this, my manager always complained about my boss with us...???", likes: 5, comments: [] },
    { company: "Shopee", date: "Dec 25, 2024", content: "Amazing... pantry got thief stealing my maggie meeeeeeee...", likes: 5, comments: [] },
    { company: "AIA Insurance", date: "Sep 1, 2024", content: "AIA has great benefits, but the workload is heavy.", likes: 5, comments: [] },
    { company: "Google", date: "Oct 10, 2024", content: "Google's office is amazing, but the food is expensive.", likes: 5, comments: [] },
    { company: "Microsoft", date: "Nov 15, 2024", content: "Microsoft's work culture is very collaborative and supportive.", likes: 5, comments: [] },
    { company: "Amazon", date: "Jan 5, 2025", content: "Amazon's delivery system is super efficient, but the warehouse work is tough.", likes: 5, comments: [] },
    { company: "Facebook", date: "Feb 20, 2025", content: "Facebook's office has amazing perks, but the work-life balance is challenging.", likes: 5, comments: [] },
    { company: "Netflix", date: "Mar 10, 2025", content: "Netflix has a great culture of freedom and responsibility.", likes: 5, comments: [] },
    { company: "Tesla", date: "Apr 25, 2025", content: "Tesla's innovation is incredible, but the work hours are long.", likes: 5, comments: [] },
    { company: "Apple", date: "May 30, 2025", content: "Apple's products are amazing, but the secrecy can be frustrating.", likes: 5, comments: [] },
    { company: "Samsung", date: "Jun 15, 2025", content: "Samsung's work environment is very fast-paced and dynamic.", likes: 5, comments: [] },
    { company: "Intel", date: "Jul 20, 2025", content: "Intel's technology is cutting-edge, but the bureaucracy can be overwhelming.", likes: 5, comments: [] }
];

// Function to load trending posts
function loadTrendingPosts() {
    const trendingPostsContainer = document.getElementById('trendingPosts');
    trendingPostsContainer.innerHTML = ''; // Clear existing posts

    mockPosts.forEach((post, index) => {
        const postId = index + 1; // Unique ID for each post
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.setAttribute('data-post-id', postId);
        postElement.innerHTML = `
            <div class="post-header">
                <strong>${post.company}</strong>
                <span>${post.date}</span>
            </div>
            <p>${post.content}</p>
            <div class="post-footer">
                <span class="like-btn" onclick="incrementLike(${postId})">❤️</span>
                <span id="like-count-${postId}">${post.likes}</span>
                <span class="comment-btn" onclick="toggleComments(${postId})">💬</span>
                <span id="comment-count-${postId}">${post.comments.length}</span>
            </div>
            <!-- Comment Section -->
            <div id="comment-section-${postId}" class="comment-section" style="display: none;">
                <div class="comments">
                    <!-- Existing comments will be loaded here -->
                </div>
                <div class="add-comment">
                    <textarea id="comment-input-${postId}" placeholder="Add a comment..."></textarea>
                    <button onclick="addComment(${postId})">Post Comment</button>
                </div>
            </div>
        `;
        trendingPostsContainer.appendChild(postElement);
    });
}

// Function to filter posts by a specific word
function filterPostsByWord(posts, word) {
    return posts.filter(post => 
        post.company.toLowerCase().includes(word.toLowerCase()) || 
        post.content.toLowerCase().includes(word.toLowerCase())
    );
}

// Function to display search results
function displaySearchResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    const filteredPosts = filterPostsByWord(mockPosts, query);

    if (filteredPosts.length > 0) {
        resultsContainer.innerHTML = `<p>Showing results for: <strong>${query}</strong></p>`;
        filteredPosts.forEach((post, index) => {
            const postId = index + 1; // Unique ID for each post
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.setAttribute('data-post-id', postId);
            postElement.innerHTML = `
                <div class="post-header">
                    <strong>${post.company}</strong>
                    <span>${post.date}</span>
                </div>
                <p>${post.content}</p>
                <div class="post-footer">
                    <span class="like-btn" onclick="incrementLike(${postId})">❤️</span>
                    <span id="like-count-${postId}">${post.likes}</span>
                    <span class="comment-btn" onclick="toggleComments(${postId})">💬</span>
                    <span id="comment-count-${postId}">${post.comments.length}</span>
                </div>
                <!-- Comment Section -->
                <div id="comment-section-${postId}" class="comment-section" style="display: none;">
                    <div class="comments">
                        <!-- Existing comments will be loaded here -->
                    </div>
                    <div class="add-comment">
                        <textarea id="comment-input-${postId}" placeholder="Add a comment..."></textarea>
                        <button onclick="addComment(${postId})">Post Comment</button>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(postElement);
        });
    } else {
        resultsContainer.innerHTML = `<p>No results found for: <strong>${query}</strong></p>`;
    }
}

// Function to increment like count and save to localStorage
function incrementLike(postId) {
    const likeCountElement = document.getElementById(`like-count-${postId}`);
    let likeCount = parseInt(likeCountElement.innerText);
    likeCount++;
    likeCountElement.innerText = likeCount;

    // Save the updated like count to localStorage
    localStorage.setItem(`like-count-${postId}`, likeCount);
}

// Function to toggle comment section visibility
function toggleComments(postId) {
    const commentSection = document.getElementById(`comment-section-${postId}`);
    if (commentSection.style.display === "none") {
        commentSection.style.display = "block";
        loadComments(postId); // Load comments when the section is shown
    } else {
        commentSection.style.display = "none";
    }
}

// Function to load comments from localStorage
function loadComments(postId) {
    const commentsContainer = document.querySelector(`#comment-section-${postId} .comments`);
    const savedComments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];

    commentsContainer.innerHTML = ""; // Clear existing comments
    savedComments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerText = comment;
        commentsContainer.appendChild(commentElement);
    });

    // Update comment count
    const commentCountElement = document.getElementById(`comment-count-${postId}`);
    commentCountElement.innerText = savedComments.length;
}

// Function to add a new comment
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim();

    if (commentText) {
        const savedComments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
        savedComments.push(commentText);
        localStorage.setItem(`comments-${postId}`, JSON.stringify(savedComments));

        // Clear the input and reload comments
        commentInput.value = "";
        loadComments(postId);
    }
}

// Show index page by default when the page loads
showIndex();

// Function to log out and redirect to first.html
function logout() {
    window.location.href = 'first.html';
}