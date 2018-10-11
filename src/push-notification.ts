import firebase from 'firebase';
import {presentToast} from './app-functions';
export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyByeLQjds_lkRg1q347VvmxIWUNxutFvkE",
    authDomain: "erp-coin-2680b.firebaseapp.com",
    databaseURL: "https://erp-coin-2680b.firebaseio.com",
    projectId: "erp-coin-2680b",
    storageBucket: "erp-coin-2680b.appspot.com",
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
    return askForPermissionToReceiveNotifications();
}

export const enableMessages = (toastCtrl) =>
{
  const messaging = firebase.messaging();
  messaging.onMessage((payload) => {
    console.log("Message received");
    presentToast(toastCtrl, "A new alert has been added");
  });
}

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('Token:', token);
    return token;
  } catch (error) {
    console.error(error);
  }
}
