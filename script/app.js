document.getElementById("submit-search").addEventListener("click", fetchPosts);
const postsContainer = document.getElementById("posts-container");
let loader = document.querySelector(".load-container");
let inputField = document.getElementById("sub-input");

inputField.addEventListener("change", () => {
  nextPageId = undefined;
  clearPosts(postsContainer);
});

function clearPosts(postsContainer) {
  while (postsContainer.firstChild) {
    postsContainer.removeChild(postsContainer.firstChild);
  }
};

let isFetching = false;
let nextPageId;

async function fetchPosts(e) {
  e.preventDefault();

  isFetching = true;
  loader.classList.add("active");

  let subreddit = inputField.value;
  if (nextPageId === undefined) {
    nextPageId = ""
  }

  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${nextPageId}`, {mode: "cors"});
  let data = await response.json();
  let posts = data.data.children;
  nextPageId = data.data.after;

  // Prevents duplicate posts
  if (posts && posts.length > 0) {
    lastId = posts[posts.length - 1].data.id;
  } else {
    lastId = undefined;
  }

  createPost(posts);
  isFetching = false;
  loader.classList.remove("active");
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

postsContainer.addEventListener("scroll", async (e) => {
  // Do not run if currently fetching data
  if (isFetching) return;
  
  if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
    isFetching = true;
    await fetchPosts(e)
    isFetching = false;
  };
});