import firebase from 'firebase';
export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyByeLQjds_lkRg1q347VvmxIWUNxutFvkE",
    authDomain: "erp-coin-2680b.firebaseapp.com",
    databaseURL: "https://erp-coin-2680b.firebaseio.com",
    projectId: "erp-coin-2680b",
    storageBucket: "",
    messagingSenderId: "912610128669"
  });

  if('serviceWorker' in navigator)
  {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        firebase.messaging().useServiceWorker(registration);
      }).catch((err)=>{console.log(err)});
  }

  const messaging = firebase.messaging();
  messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
  });
    askForPermissioToReceiveNotifications();
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('Token:', token);
    alert(token);
    return token;
  } catch (error) {
    console.error(error);
  }
}
