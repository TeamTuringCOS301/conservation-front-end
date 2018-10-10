export function checkLoggedIn(storage, toastCtrl, navCtrl)
{
  storage.get('loggedIn').then(
    (val) =>
    {
      if(val != true)
      {
        presentToast(toastCtrl, "Please log in");
        navCtrl.push('login');
        return false;
      }
      else
      {
        return true;
      }
    }
  );
  return false;
}

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

export function addCloseListener(viewCtrl, curWin, events)
{
  curWin.addEventListener('popstate', () =>
  {
    events.publish("Reload Balance");
    viewCtrl.dismiss();
  });
}

export function openModal(modalPage, curWin)
{
  modalPage.present();
  curWin.location.href = curWin.location.href +"/#";
}

export function closeModal(viewCtrl, events)
{
  events.publish("Reload Balance");
  viewCtrl.dismiss();
}

export function handleError(navCtrl, error, toastCtrl)
{
  var msg = "";
  if(error.status == 401)
  {
    navCtrl.setRoot('login');
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
