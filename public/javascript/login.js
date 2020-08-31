async function logIn(email, password) {
  console.log(email, password);
  const loginResponse = await fetch('/api/users/login', {
    method: 'post',
    body: JSON.stringify({
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (loginResponse.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(loginResponse.statusText);
  }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#auth-email').value.trim();
  const password = document.querySelector('#auth-password').value.trim();

  if (email && password) {
    logIn(email, password);
  }
}

async function signupFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector('#auth-username').value.trim();
  const email = document.querySelector('#auth-email').value.trim();
  const password = document.querySelector('#auth-password').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      logIn(email, password);
    }
    else {
      console.log(response);
      alert(response.statusText)
    }
  }
}

function displaySignupForm() {
  event.preventDefault();

  // hide the login form
  document.querySelector('.btn-login').classList.add('hidden');
  document.querySelector('.btn-create-account').classList.add('hidden');

  // show the signup form
  document.querySelector('.btn-login-instead').classList.remove('hidden');
  document.querySelector('.btn-signup').classList.remove('hidden');
  document.querySelector('.auth-username-container').classList.remove('hidden');
  document.querySelector('.auth-card-title').textContent = "Create an Account";
}

function displayLoginForm() {
  event.preventDefault();

  // hide the signup form
  document.querySelector('.btn-login-instead').classList.add('hidden');
  document.querySelector('.btn-signup').classList.add('hidden');
  document.querySelector('.auth-username-container').classList.add('hidden');

  // show the login form
  document.querySelector('.btn-login').classList.remove('hidden');
  document.querySelector('.btn-create-account').classList.remove('hidden');
  document.querySelector('.auth-card-title').textContent = "Log In";

}


document.querySelector('.btn-login-instead').addEventListener('click', displayLoginForm);
document.querySelector('.btn-create-account').addEventListener('click', displaySignupForm);
document.querySelector('.btn-login').addEventListener('click', loginFormHandler);
document.querySelector('.btn-signup').addEventListener('click', signupFormHandler);
