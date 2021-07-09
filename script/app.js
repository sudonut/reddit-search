document.getElementById("submit-search").addEventListener("click", fetchSubreddit);

const postsContainer = document.getElementById("posts-container");

async function fetchSubreddit(e) {
  e.preventDefault();
  const subreddit = document.getElementById("sub-input").value;
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const subData = await response.json();
  const posts = subData.data.children
  console.log(posts);

  function createPost() {
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
    }
  }
  createPost();
}

postsContainer.addEventListener("scroll", async (e) => {
  if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
    fetchSubreddit(e);
    console.log("Est");
  }
})
//Would this make sense to someone else?

