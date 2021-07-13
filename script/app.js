document.getElementById("submit-search").addEventListener("click", fetchPosts);
const postsContainer = document.getElementById("posts-container");
let loader = document.querySelector(".load-container");

let isFetching = false;
// let postIds = [];
let nextPageId;
async function fetchPosts(e) {
  let subreddit = document.getElementById("sub-input").value;
  // Find a way to check if the input value changed since last intialization so that 
  //nextPage ID becomes undefined when fetching for a new subreddit
  e.preventDefault();
  loader.classList.add("active");
  isFetching = true;

  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${nextPageId}`, {mode: "cors"});
  let subData = await response.json();
  // If response contains an After value, fetch again with the after value
  // Can we sstore the after value that's fetched and throw it into an array for later use?
  // Push the nextPageId value into the array, on next fetch request use that id and pop it off the array
  // When the user searches for something new, clear/pop the current id off the array 
  let posts = subData.data.children;
  nextPageId = subData.data.after;

  // Prevents duplicate posts
  if (posts && posts.length > 0) {
    lastId = posts[posts.length - 1].data.id;
  } else {
    lastId = undefined;
  }

  loader.classList.remove("active");

  loadNewPosts(nextPageId);
  clearPosts(postsContainer);
  createPost(posts);

  isFetching = false;
};

// Create a new div for each image
function createPost(posts) {
  for (let i = 0; i < posts.length; i++) {
    loader.classList.add("active");

    let img = new Image();
    img.src = posts[i].data["url_overridden_by_dest"];

    let newDiv = document.createElement("div");
    newDiv.className = "results-wrap";
    postsContainer.appendChild(newDiv);

    let newImg = document.createElement("div");
    newImg.className = "thumbnail";
    newDiv.appendChild(img);
    
    setTimeout(() => {
      loader.classList.remove("active");
    }, 500)
  };
};

function clearPosts(postsContainer) {
  while (postsContainer.firstChild) {
    postsContainer.removeChild(postsContainer.firstChild);
  }
};

function loadNewPosts(nextPageId) {
  postsContainer.addEventListener("scroll", async () => {
    // Do not run if currently fetching data
    if (isFetching) return;

    let subreddit = document.getElementById("sub-input").value;
    if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
      isFetching = true;
      let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${nextPageId}`);
      let subData = await response.json();
      let posts = subData.data.children;
      nextPageId = subData.data.after;
      createPost(posts);
      isFetching = false;
    };
  });
};

setTimeout(() => {
  console.log(nextPageId);
},4000)

// The solution is to declare an empty variable nextPageId and give it the value of 
// the after id from the api. With that, during the next function call the variable will
// be used as the value passed into the end of the fetch request
// 
// On intial load, assign it a random reddit page
// 
// 
// 