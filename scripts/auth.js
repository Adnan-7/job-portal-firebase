const myModal = document.querySelectorAll('.modal');

//signup
const signup = async (e) => {
  e.preventDefault();
  const email = document.querySelector('#signupEmail');
  const password = document.querySelector('#signupPassword');
  console.log(email.value, password.value);

  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
    M.toast({ html: `Welcom ${result.user.email}`, classes: 'green' });
    console.log(result);
  } catch (err) {
    M.toast({ html: err.message, classes: 'red' });
  }

  email.value = '';
  password.value = '';
  M.Modal.getInstance(myModal[0]).close();
};

//login
const login = async (e) => {
  e.preventDefault();
  const email = document.querySelector('#loginEmail');
  const password = document.querySelector('#loginPassword');

  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value);
    M.toast({ html: `Welcom ${result.user.email}`, classes: 'green' });
    console.log(result);
  } catch (err) {
    M.toast({ html: err.message, classes: 'red' });
  }
  email.value = '';
  password.value = '';
  M.Modal.getInstance(myModal[1]).close();
};
