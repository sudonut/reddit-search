The goal of this web app is to display a list of images via the reddit api to the user.
I created this little web application to become more familar with vanilla JS as well as using API's

At minimum the user should be able to:

- View images from the subreddit they specify
- Scroll down the page to load more images

Features to be added in the future:
- ~~Add a loading indicator when fetching new posts~~
- Error handling
- A way for the user to see the amount of upvotes a post has
- Allow the user to be taken to the specific post on reddit if they click on an image
- Like posts locally without a reddit account

In this project, I've learned how to:

- Dynamically create more elements on scroll
- Clear all of the current elements on the page without reloading
- Fetch complex data from an API and display that information to the user

* Known issues
- Sometimes the same fetch url will be called when the user scrolls down too quickly
- Some images are not available or the url is invalid