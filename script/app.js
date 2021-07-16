document.getElementById("submit-search").addEventListener("click", fetchPosts);
const postsContainer = document.getElementById("posts-container");
const loader = document.querySelector(".load-container");
const inputField = document.getElementById("sub-input");

let column1 = document.getElementById("vertical-container1"),
    column2 = document.getElementById("vertical-container2"),
    column3 = document.getElementById("vertical-container3");

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
  
  if (isFetching) return;
  
  isFetching = true;
  loader.classList.add("active");

  let subreddit = inputField.value;
  if (nextPageId === undefined) {
    nextPageId = ""
  }

  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${nextPageId}`, {mode: "cors"});
  const data = await response.json();
  const posts = data.data.children;
  nextPageId = data.data.after;

  console.log(posts)
  // Prevents duplicate posts
  if (posts && posts.length > 0) {
    lastId = posts[posts.length - 1].data.id;
  } else {
    lastId = undefined;
  }

  sendToContainers(posts)
  // createPost(posts);
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
    column1.appendChild(newDiv);

    let newImg = document.createElement("div");
    newImg.className = "thumbnail";
    newDiv.appendChild(img);
    
    setTimeout(() => {
      loader.classList.remove("active");
    }, 500)
  };
};

function createPost1(posts) {
  for (let i = 0; i < posts.length; i++) {
    loader.classList.add("active");

    let img = new Image();
    img.src = posts[i].data["url_overridden_by_dest"];

    let newDiv = document.createElement("div");
    newDiv.className = "results-wrap";
    column2.appendChild(newDiv);

    let newImg = document.createElement("div");
    newImg.className = "thumbnail";
    newDiv.appendChild(img);
    
    setTimeout(() => {
      loader.classList.remove("active");
    }, 500)
  };
};

function createPost2(posts) {
  for (let i = 0; i < posts.length; i++) {
    loader.classList.add("active");

    let img = new Image();
    img.src = posts[i].data["url_overridden_by_dest"];

    let newDiv = document.createElement("div");
    newDiv.className = "results-wrap";
    column3.appendChild(newDiv);

    let newImg = document.createElement("div");
    newImg.className = "thumbnail";
    newDiv.appendChild(img);
    
    setTimeout(() => {
      loader.classList.remove("active");
    }, 500)
  };
};
// constructor function? Class? loop through the element classes selector??
function sendToContainers(posts) {
  col1 = posts.slice(0, 9);
  createPost(col1)
  col2 = posts.slice(9, 18);
  createPost1(col2)
  col3 = posts.slice(18, 27);
  createPost2(col3)
}

postsContainer.addEventListener("scroll", async (e) => {
  // Do not run if currently fetching data
  if (isFetching) return;
  
  if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
    await fetchPosts(e)
  };
});