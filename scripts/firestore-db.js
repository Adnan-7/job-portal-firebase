const userInfoDetails = document.querySelector('.userDetails')


function createUsersCollection(user){
    firebase.firestore().collection('users').doc(user.uid)
    .set({

      uid:user.uid,
      name:user.displayName,
      email:user.email,
      phone:'',
      specilaty:'',
      portfolioUrl:''

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
          `
        }
      }
    })

  }else{
    userInfoDetails.innerHTML=`
   <h3>Please Login</h3>`

  }
}