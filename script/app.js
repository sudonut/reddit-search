document.getElementById("submit-search").addEventListener("click", fetchPosts);
const loader = document.querySelector(".load-container");
const inputField = document.getElementById("sub-input");

inputField.addEventListener("change", () => {
  nextPageId = undefined;
  let columnsWrap = document.querySelectorAll(".vertical-wrapper");
  columnsArr = Array.from(columnsWrap);
  columnsArr.forEach((column) => {
    while (column.firstChild) {
      column.removeChild(column.firstChild);
    }
  });
});

let isFetching = false;
let nextPageId;

async function fetchPosts(e) {
  try {
    e.preventDefault();
    if (isFetching) return;
    isFetching = true;
    loader.classList.add("active");

    let subreddit = inputField.value;
    if (nextPageId === undefined) {
      nextPageId = "";
    }

    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}.json?count=25&after=${nextPageId}`,
      { mode: "cors" }
    );
    const data = await response.json();
    const posts = data.data.children;
    nextPageId = data.data.after;

    console.log(posts);
    createPost(posts);
  } catch (e) {
    console.log(e);
  }
  isFetching = false;
  loader.classList.remove("active");
};

class Post {
  constructor(title, subreddit, img) {
    this.title = title;
    this.subreddit = subreddit;
    this.image = img;
  }
}

function createPost(posts) {
  const column1 = document.getElementById("vertical-container1"),
    column2 = document.getElementById("vertical-container2"),
    column3 = document.getElementById("vertical-container3");

  let columnsArray = [column1, column2, column3];
  columnsArray.forEach((item) => {
    for (let i = 0; i < 7; i++) {
      let title = posts[i].data.title;
      let subreddit = posts[i].data.subreddit;
      let img = new Image();
      img.src = posts[i].data["url_overridden_by_dest"];
      
      let post = new Post(title, subreddit, img);
      img.onload = () => {
        let newDiv = document.createElement("div");
        let newOverlay = document.createElement("div");
        let overlayLeft = document.createElement("div");
        let overlayRight = document.createElement("div");
        let subredditName = document.createElement("h1");
        let postTitle = document.createElement("p");
        let newImg = document.createElement("div");

        newDiv.className = "results-wrap";
        newOverlay.className = "overlay";
        newImg.className = "thumbnail";
        overlayLeft.className = "overlay-info-left";
        overlayRight.className = "overlay-info-right";
        subredditName.className = "subreddit-name";
        postTitle.className = "post-title";

        subredditName.innerHTML = post.subreddit;
        postTitle.innerHTML = post.title;

        item.appendChild(newDiv);
        newDiv.appendChild(newOverlay);
        newOverlay.appendChild(overlayLeft);
        newOverlay.appendChild(overlayRight);
        overlayLeft.appendChild(subredditName);
        overlayLeft.appendChild(postTitle);
        newDiv.appendChild(img);
      }
    }
    posts.splice(0, 7);
  });
};

window.addEventListener("scroll", async (e) => {
  // Do not run if currently fetching data
  if (isFetching) return;

  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight - 1000
  ) {
    await fetchPosts(e);
  }
});

