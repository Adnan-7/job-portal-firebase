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
};
