const createCookie = (name, cookieExpireDays) => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (cookieExpireDays*24*60*60*1000));
  const expires = 'expires=' + currentDate.toUTCString();
  const consent = name + '; SameSite=Lax; Secure;';
  document.cookie = consent + expires;
 }

 const checkCookie = () => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const status = document.querySelector('p');
  status.innerHTML= decodedCookie;
  if (decodedCookie) {
    document.querySelector('body').classList.add('yay');
    status.innerHTML = 'Cookies in the Cookie Jar :)'
  };
  if (!decodedCookie) status.innerHTML = 'Cookie jar is empty :(';
}

const removeCookie = () => {
  const removeCookie = document.querySelector('button.delete');
  removeCookie.addEventListener('click', () => {
    document.cookie = "name=consent; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.querySelector('body').classList.remove('yay');
  });
}

const cookieConsent = () => {
  const acceptCookie = document.querySelector('button');
  acceptCookie.addEventListener('click', () => {
    createCookie('consent=true', 30);
    checkCookie();
  });
}

const fireWhenReady = () => {
  document.addEventListener('DOMContentLoaded', () => {
    cookieConsent();
    checkCookie();
 });
};
fireWhenReady();