document.getElementById("submit-search").addEventListener("click", fetchPosts);
const postsContainer = document.getElementById("posts-container");
let loader = document.querySelector(".load-container");


let isFetching = false;

async function fetchPosts(e) {
  let subreddit = document.getElementById("sub-input").value;
  e.preventDefault();
  loader.classList.add("active");
  isFetching = true;

  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25`, {mode: "cors"});
  let subData = await response.json();
  let posts = subData.data.children;
  let afterVal = subData.data.after;

  // Prevents duplicate posts
  if (posts && posts.length > 0) {
    lastId = posts[posts.length - 1].data.id;
  } else {
    lastId = undefined;
  }

  isFetching = false;
  loader.classList.remove("active");

  clearPosts(postsContainer);
  createPost(posts);
  fetchScroll(afterVal);
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

function fetchScroll(afterVal) {
  let subreddit = document.getElementById("sub-input").value;
  postsContainer.addEventListener("scroll", async () => {
    // Do not run if currently fetching data
    if (isFetching) return;

    if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
      let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${afterVal}`);
      let subData = await response.json();
      afterVal = subData.data.after;
      let posts = subData.data.children;
      createPost(posts);
    };
  });
};
