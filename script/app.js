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
    alert("PLEASE ENTER A VALID SUBREDDIT");
  }
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
      let img = new Image();
      img.src = posts[i].data["url_overridden_by_dest"];

      img.onload = () => {
        let newDiv = document.createElement("div");
        newDiv.className = "results-wrap";
        item.appendChild(newDiv);

        let newImg = document.createElement("div");
        newImg.className = "thumbnail";
        newDiv.appendChild(img);
      };
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
