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

     await result.user.updateProfile({
        displayName: "user", 
      })

      createUsersCollection(result.user)

    //  await firebase.auth().currentUser.sendEmailVerification()

    M.toast({ html: `Welcom ${result.user.email}`, classes: 'green' });
    console.log(result)
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

//logout

const logout = () => {
  firebase.auth().signOut();
};

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    // getUserInfo(user.uid)
    getUserInfoRealTime(user.uid)
  } else {
    // getUserInfo(null)
    getUserInfoRealTime(null)
    console.log('Signout success');
    M.toast({ html: 'SignOut Success', classes: 'green' });
  }
});

const loginWithGoogle = async () => {
  try {
    let provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
