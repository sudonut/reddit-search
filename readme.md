The goal of this web app is to display a list of images via the reddit api to the user.
I created this little web application to become more familar with vanilla JS as well as using API's

At minimum the user should be able to:

- View images from the subreddit they specify
- Scroll down the page to load more images

How to use:
1. Enter the name of the subreddit that you want to view images from inside the input field
2. Images will generate, scroll down to load more images
3. If you enter an invalid subreddit you will recieve an error.

Features to be added in the future:
- ~~Add a loading indicator when fetching new posts~~
- ~~Error handling~~
- A way for the user to see the amount of upvotes a post has
- Allow the user to be taken to the specific post on reddit if they click on an image
- Like posts locally without a reddit account

In this project, I've learned how to:

- Dynamically create more elements on scroll
- Clear all of the current elements on the page without reloading
- Fetch complex data from an API and display that information to the user

Known issues
- ~~Bug where user could submit multiple fetch requests resulting in duplicate posts~~
- ~~Some images display broken links if the url is not available or invalid~~
