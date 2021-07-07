document.getElementById("submit-search").addEventListener("click", fetchSubreddit);


let i = 0;

async function fetchSubreddit(e) {
  e.preventDefault();
  let subreddit = document.getElementById("sub-input").value;
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const subData = await response.json();

  let posts = subData.data.children
  console.log(posts);

  function createPost() {
    
    let img = new Image();
    img.src = posts[i].data["url_overridden_by_dest"];
    console.log(posts[i].data["url_overridden_by_dest"]);

    let postsContainer = document.getElementById("posts-container");

    // Creates a new wrapper div that will hold the retrieved information
    let newDiv = document.createElement("div");
    newDiv.className = "results-wrap";
    postsContainer.appendChild(newDiv);

    let newThumbnail = document.createElement("div");
    newThumbnail.className = "thumbnail";
    newDiv.appendChild(img);
    i++;
  }
  createPost();
}
