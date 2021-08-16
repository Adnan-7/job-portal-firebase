const userInfoDetails = document.querySelector('.userDetails')
const editProfile= document.querySelector('#editProfile')


function createUsersCollection(user){
    firebase.firestore().collection('users').doc(user.uid)
    .set({

      uid:user.uid,
      name:user.displayName,
      email:user.email,
      phone:'',
      specilaty:'',
      portfolioUrl:'',
      experience:''
    })
}


// async function getUserInfo(userID){
//   if(userID){
//   const userInfoSnap = await firebase.firestore().collection('users').doc(userID)
//   .get()

//   const userInfo= userInfoSnap.data()
// if(userInfo){
//    userInfoDetails.innerHTML=`
//    <h3>${userInfo.name}</h3>
//    <h3>${userInfo.email}</h3>
//    <h3>${userInfo.phone}</h3>
//    `
//   }}else{
//     userInfoDetails.innerHTML=`
//    <h3>Please Login</h3>`
//   }

// }


async function getUserInfoRealTime(userID){
  if(userID){
    const userDocRef = await firebase.firestore().collection('users').doc(userID)

    userDocRef.onSnapshot((doc)=>{
      if(doc.exists){
        const userInfo = doc.data()
        if(userInfo){
          userInfoDetails.innerHTML=`
          <h3>${userInfo.name}</h3>
          <h3>${userInfo.email}</h3>
          <h3>${userInfo.phone}</h3>
          <h3>${userInfo.specilaty}</h3>
          <h3>${userInfo.portfolioUrl}</h3>
          <h3>${userInfo.experience}</h3>
          <button class="btn waves-effect #fbc02d yellow darken-2 modal-trigger" href="#modal3">Update</button>
          `
           editProfile['name'].value=userInfo.name
           editProfile['profileEmail'].value=userInfo.email
           editProfile['phoneno'].value=userInfo.phone
          editProfile['specialty'].value=userInfo.specilaty
          editProfile['prorfolioUrl'].value=userInfo.portfolioUrl
           editProfile['experience'].value=userInfo.experience

           if( firebase.auth().currentUser.photoURL){
             document.querySelector('#proimg').src= firebase.auth().currentUser.photoURL
           }
      
        }
      }
    })

  }else{
    userInfoDetails.innerHTML=`
   <h3>Please Login</h3>`

  }
}


function updateUserProfile(e){
  e.preventDefault()
  const userDocRef= firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)

  userDocRef.update({
    name:editProfile['name'].value,
    email:editProfile['profileEmail'].value,
    phone:editProfile['phoneno'].value,
    specilaty:editProfile['specialty'].value,
    portfolioUrl:editProfile['prorfolioUrl'].value,
    experience:editProfile['experience'].value,

  })
  M.Modal.getInstance(myModal[2]).close();

}


function uploadImage(e){

  const uid= firebase.auth().currentUser.uid
  const fileRef= firebase.storage().ref().child(`/users/${uid}/profile`)
  var uploadTask =  fileRef.put(e.target.files[0])

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if(progress =='100'){
       alert('Uploaded')
    }
  }, 
  (error) => {
    // Handle unsuccessful upload
    console.log(error);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);

      firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL 
      })
    });
  }
);
}