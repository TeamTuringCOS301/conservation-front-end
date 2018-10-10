export function presentToast(toastCtrl, text)
{
  let toast = toastCtrl.create(
  {
    message: text,
    duration: 1500,
    position: 'bottom',
    dismissOnPageChange: false
  });
  toast.present();
}

export function presentLongToast(toastCtrl, text)
{
  let toast = toastCtrl.create(
  {
    message: text,
    showCloseButton: true,
    position: 'bottom',
    dismissOnPageChange: false
  });
  toast.present();
}

export function handleError(navCtrl, error, toastCtrl)
{
  var msg = "";
  if(error.status == 401)
  {
    navCtrl.setRoot('LoginPage');
    msg = "Please log in";
  }
  else if(error.status == 500)
  {
    msg = "Internal Server Error. Please try again later.";
  }
  else if(error.status == 400)
  {
    msg = "Something went wrong. Please try again.";
  }
  else
  {
    msg = "No Internet Connection.";
  }
  if(msg != "")
  {
    presentLongToast(toastCtrl, msg);
  }
}
