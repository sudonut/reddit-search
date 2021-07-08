document.getElementById("submit-search").addEventListener("click", fetchSubreddit);

async function fetchSubreddit(e) {
  e.preventDefault();
  const subreddit = document.getElementById("sub-input").value;
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const subData = await response.json();
  const posts = subData.data.children
  console.log(posts);

  function createPost() {
    const postsContainer = document.getElementById("posts-container");
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

//Would this make sense to someone else?

