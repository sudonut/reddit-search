document.getElementById("submit-search").addEventListener("click", fetchPosts);
const postsContainer = document.getElementById("posts-container");
const loader = document.querySelector(".load-container");
const inputField = document.getElementById("sub-input");


inputField.addEventListener("change", () => {
  nextPageId = undefined;
  let columnsWrap = document.querySelectorAll(".vertical-wrapper");
  columnsArr = Array.from(columnsWrap);
  columnsArr.forEach((item) => {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    };
  });
});

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

  if (posts && posts.length > 0) {
    lastId = posts[posts.length - 1].data.id;
  } else {
    lastId = undefined;
  }
  createPost(posts)
  isFetching = false;
  loader.classList.remove("active");
};

function createPost(posts) {
  const column1 = document.getElementById("vertical-container1"),
  column2 = document.getElementById("vertical-container2"),
  column3 = document.getElementById("vertical-container3");

  let columnsArray = [column1, column2, column3];
  columnsArray.forEach((item) => {
    for (let i = 0; i < 7; i++) {
      loader.classList.add("active");

      let img = new Image();
      img.src = posts[i].data["url_overridden_by_dest"];

      let newDiv = document.createElement("div");
      newDiv.className = "results-wrap";
      item.appendChild(newDiv);

      let newImg = document.createElement("div");
      newImg.className = "thumbnail";
      newDiv.appendChild(img);
    };
    setTimeout(() => {
      loader.classList.remove("active");
    }, 500)
    posts.splice(0, 7);
  });
};

window.addEventListener("scroll", async (e) => {
  // Do not run if currently fetching data
  if (isFetching) return;

  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 500) {
    await fetchPosts(e)
  };
});