document.getElementById("submit-search").addEventListener("click", fetchPosts);
const postsContainer = document.getElementById("posts-container");

async function fetchPosts(e) {
  e.preventDefault();
  const subreddit = document.getElementById("sub-input").value;
  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=`);
  let subData = await response.json();
  let posts = subData.data.children;
  function fetchScroll() {
    postsContainer.addEventListener("scroll", async () => {
      if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
        afterVal = subData.data.after;
        response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${afterVal}`)
        subData = await response.json();
        posts = subData.data.children;
        createPost(posts);
      };
    });
  }
  fetchScroll();
  createPost(posts);
};

function createPost(posts) {
  // Create a new div for each image
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
