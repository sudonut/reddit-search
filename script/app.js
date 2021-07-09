document.getElementById("submit-search").addEventListener("click", fetchPosts);

const postsContainer = document.getElementById("posts-container");

async function fetchPosts(e) {
  e.preventDefault();
  const subreddit = document.getElementById("sub-input").value;
  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=`);
  let subData = await response.json();
  let afterVal = subData.data.after;
  let posts = subData.data.children
  console.log(posts);
  if (afterVal !== undefined) {
    response = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=25&after=${afterVal}`)
  }
  createPost(posts);
};

// async function fetchMorePosts(subData) {
//   subData = await response.json();
//   posts = subData.data.children;
//   createPost(posts);
// }

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

postsContainer.addEventListener("scroll", async (e) => {
  if (postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight) {
    fetchPosts(e);
    console.log("Est");
  };
});



// https://www.reddit.com/r/redditdev/comments/d7egb/how_to_get_more_json_results_i_get_only_30/