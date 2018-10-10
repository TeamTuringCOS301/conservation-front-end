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

export function logOut(navCtrl, http, toastCtrl)
  {
      http.get("/admin/logout").subscribe
      (
        (data) =>
        {
          let elements = document.querySelectorAll(".tabbar");

          if (elements != null) {
              Object.keys(elements).map((key) => {
                  elements[key].style.display = 'none';
              });
          }
          navCtrl.push('LoginPage');
          presentToast(toastCtrl,"Logged Out");
        },
        (error) =>
        {
          handleError(navCtrl, error, toastCtrl);
        }            
    );        
  }
