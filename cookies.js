const cookiePermissions = {
  advertising: false,
  analytics: false,
  functional: false,
  personalization: false,
  security: false
};


const createCookie = (name, value, cookieExpireDays) => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (cookieExpireDays*24*60*60*1000));
  const expires = 'expires=' + currentDate.toUTCString();
  const consent = `${name}=${JSON.stringify(value)}; Path=/; SameSite=Lax; Secure;`;
  document.cookie = consent + expires;
 }

 const checkCookie = () => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const heading = document.querySelector('h2');
  const status = document.querySelector('p');
  status.innerHTML= decodedCookie;
  if (decodedCookie) {
    document.querySelector('body').classList.add('yay');
    heading.innerHTML = 'Mmmmm Cookies';
    heading.setAttribute('data-text', 'Mmmmm Cookies');
    status.innerHTML = 'Cookies in the Cookie Jar :)'
  };
  if (!decodedCookie) status.innerHTML = 'Cookie jar is empty :(';
}

const removeCookie = () => {
  const removeCookie = document.querySelector('button.reject');
  const heading = document.querySelector('h2');
  const status = document.querySelector('p');
  removeCookie.addEventListener('click', () => {
    document.cookie = "consent=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.querySelector('body').classList.remove('yay');
    heading.innerHTML = 'Cookies not accepted';
    heading.setAttribute('data-text', 'Cookies not accepted');
    status.innerHTML = 'Cookie jar is empty :(';
  });
}

const cookieConsent = () => {
  const acceptCookie = document.querySelector('button.review');
  const consent = document.querySelector('.consentPopUp');
  const backdrop = document.querySelector('.backdrop');
  // const accept = {
  //   advertising: false,
  //   analytics: true,
  //   functional: false,
  //   personalization: false,
  //   security: false
  // };
  acceptCookie.addEventListener('click', () => {
    consent.classList.add('show');
    consent.classList.remove('hide');
    backdrop.classList.add('show');
    backdrop.classList.remove('hide');
    // createCookie('consent', accept, 30);
    // checkCookie();
  });
}

const cookieOptions = () => {
  const control = document.querySelectorAll('.control');
  control.forEach(c => c.addEventListener('click', e => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.classList.toggle('inactive');
  }));
}

const fireWhenReady = () => {
  document.addEventListener('DOMContentLoaded', () => {
    cookieConsent();
    checkCookie();
    removeCookie();
    cookieOptions();
 });
};
fireWhenReady();