document.getElementById("submit-search").addEventListener("click", fetchSubreddit);

async function fetchSubreddit(e) {
  e.preventDefault();
  let subreddit = document.getElementById("sub-input").value;
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const subData = await response.json();

  let posts = subData.data.children
  console.log(posts);

  let img = new Image();

  function createPost() {
    for (let i = 0; i < 1; i++) {

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
    }
  }
  createPost();
}

// document.getElementById("thumbnail").append(img);

// console.log(post.data["url_overridden_by_dest"])
// let img = new Image();
// img.src = subData.data.children[4].data["url_overridden_by_dest"]
// document.getElementById("thumbnail").append(img);

// posts.map(post => {
//   // Creates a new wrapper div that will hold the retrieved information
//   let newDiv = document.createElement("div");
//   newDiv.className = "results-wrap";
//   postsContainer.appendChild(newDiv);

//   let newThumbnail = document.createElement("div");
//   newThumbnail.className = "thumbnail";
//   newDiv.appendChild(newThumbnail);
  
//   console.log(post.data["url_overridden_by_dest"])
//   })