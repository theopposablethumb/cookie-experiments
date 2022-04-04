const createCookie = (name, cookieExpireDays) => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (cookieExpireDays*24*60*60*1000));
  const expires = 'expires=' + currentDate.toUTCString();
  const consent = name + '; Path=/; SameSite=Lax; Secure;';
  document.cookie = consent + expires;
 }

 const checkCookie = () => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const heading = document.querySelector('h1');
  const status = document.querySelector('p');
  status.innerHTML= decodedCookie;
  if (decodedCookie) {
    document.querySelector('body').classList.add('yay');
    heading = 'Mmmmm Cookies';
    status.innerHTML = 'Cookies in the Cookie Jar :)'
  };
  if (!decodedCookie) status.innerHTML = 'Cookie jar is empty :(';
}

const removeCookie = () => {
  const removeCookie = document.querySelector('button.delete');
  const heading = document.querySelector('h1');
  const status = document.querySelector('p');
  removeCookie.addEventListener('click', () => {
    document.cookie = "consent=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.querySelector('body').classList.remove('yay');
    heading = 'Mmmmm Cookies';
    status.innerHTML = 'Cookies in the Cookie Jar :)'
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
    removeCookie();
 });
};
fireWhenReady();