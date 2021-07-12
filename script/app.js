document.getElementById("submit-search").addEventListener("click", fetchPosts);
const postsContainer = document.getElementById("posts-container");

async function fetchPosts(e) {
  e.preventDefault();
  const subreddit = document.getElementById("sub-input").value;
  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25`);
  let subData = await response.json();
  let posts = subData.data.children;
  afterVal = subData.data.after;
  // Prevents duplicate posts
  if (posts && posts.length > 0) {
    lastId = posts[posts.length - 1].data.id;
  } else {
    lastId = undefined;
  }
  clearPosts(postsContainer);
  createPost(posts);
  fetchScroll(afterVal);
};

// Create a new div for each image
function createPost(posts) {
  for (let i = 0; i < posts.length; i++) {
    let img = new Image();
    img.src = posts[i].data["url_overridden_by_dest"];

    let newDiv = document.createElement("div");
    newDiv.className = "results-wrap";
    postsContainer.appendChild(newDiv);

    let newImg = document.createElement("div");
    newImg.className = "thumbnail";
    newDiv.appendChild(img)
  };
};

function clearPosts(postsContainer) {
  while (postsContainer.firstChild) {
    postsContainer.removeChild(postsContainer.firstChild);
  }
}

function fetchScroll(afterVal) {
  postsContainer.addEventListener("scroll", async () => {
    const subreddit = document.getElementById("sub-input").value;
    if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
      let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${afterVal}`)
      let subData = await response.json();
      afterVal = subData.data.after;
      let posts = subData.data.children;
      createPost(posts);
    };
  });
}