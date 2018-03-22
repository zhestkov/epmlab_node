const loginForm = `<form action="/login" method="post">
<div>
  <label>Username:</label>
  <input type="text" name="username"/>
</div>
<div>
  <label>Password:</label>
  <input type="password" name="password"/>
</div>
<div>
  <input type="submit" value="Log In"/>
</div>
</form>`;

const signupForm = `<form action="/signup" method="post">
<div>
  <label>Username:</label>
  <input type="text" name="username"/>
</div>
<div>
  <label>Password:</label>
  <input type="password" name="password"/>
</div>
<div>
  <input type="submit" value="Sign up"/>
</div>
</form>`;

const mainBeforeAuth = `Greetings! Go to <a href='/login'>Login</a> or <a href='/signup'>Sign up</a>`;
const mainAfterAuth = 'You are authorized!';
module.exports = {
  loginForm,
  signupForm,
  mainBeforeAuth,
  mainAfterAuth
};
