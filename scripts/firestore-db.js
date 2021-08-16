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