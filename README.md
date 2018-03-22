# EPMJSLAB

## Homework#2. REST API.

The initial data were taken from **JSONPlaceholder** service.

All POST requests require Bearer token (you'll get it after login/sigup).

All GET requests are NOT required access_token.

### To run:
```
npm start
```

### Provided REST API:
1. **USERS**
* ```/users``` -- get all users list (GET)
* ```/users/:id``` -- get user with particular ID (GET)
* ```/users?name=some``` -- get user with particular name (GET)
* ```/users/new``` -- create new user (POST)
* ```/users/update``` -- update user with transmitted ID (POST)
* ```/users/remove``` -- delete user with transmitted ID (POST)

2. **POSTS**
* ```/posts``` -- get all posts list (GET)
* ```/posts/:id``` -- get post with particular ID (GET)
* ```/posts?userId=some``` -- get posts by particular user (GET)
* ```/posts/new``` -- create new post (POST)
* ```/posts/update``` -- update post with transmitted ID (POST)
* ```/posts/remove``` -- delete post with transmitted ID (POST)

3. **COMMENTS**
* ```/comments``` -- get all comments list (GET)
* ```/comments/:id``` -- get comment with particular ID (GET)
* ```/comments?postId=some``` -- get comments from particular post (GET)
* ```/comments/new``` -- create new comment (POST)
* ```/comments/update``` -- update comment with transmitted ID (POST)
* ```/comments/remove``` -- delete comment with transmitted ID (POST)
