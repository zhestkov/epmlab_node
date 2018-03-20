const fetch = require('node-fetch');

const fetchPart = (base_url, type_url, destArray) => {
  return fetch(`${base_url}${type_url}`)
    .then(resp => resp.json())
    .then(data => data.forEach(row => destArray.push(row)))
    .catch(err => console.log(err));
}

const fetchAll = (base_url, users, posts, comments) => {
  const fetchUsers = fetchPart(base_url, '/users', users);
  const fetchPosts = fetchPart(base_url, '/posts', posts);
  const fetchComments = fetchPart(base_url, '/comments', comments);
  return Promise.all([fetchUsers, fetchPosts, fetchComments])
    .then(() => {
      console.log('Fetching is done');
    });
}


module.exports = fetchAll;
