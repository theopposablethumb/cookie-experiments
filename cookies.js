const createCookie = (name, value, cookieExpireDays) => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (cookieExpireDays*24*60*60*1000));
  const expires = 'expires=' + currentDate.toUTCString();
  const consent = `${name}=${JSON.stringify(value)}; Path=/; SameSite=Lax; Secure;`;
  console.log(consent);
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

const cookiePopUp = () => {
  const reviewCookies = document.querySelector('button.review');
  const consent = document.querySelector('.consentPopUp');
  const backdrop = document.querySelector('.backdrop');

  reviewCookies.addEventListener('click', () => {
    consent.classList.add('show');
    consent.classList.remove('hide');
    backdrop.classList.add('show');
    backdrop.classList.remove('hide');
  });
}

const cookieConsent = (prefs) => {
  console.log(prefs);
  const confirm = document.querySelectorAll('button.confirm');

  confirm.addEventListener('click', () => {
    createCookie(prefs);
  });
}

const reducePrefs = (prefs, name, checked) => {
  // this should just take an array of true values to rebuild the prefs object, values not in the array will be false
  // don't need the checked parameter
  return prefs.reduce((prev, current, i) => {
    if (current.purpose === name && current.consent !== checked) {
      prefs[i].consent = checked;
    }
  })
}

const cookiePreferences = (checked, name) => {
  const prefs = [
    { 'purpose': 'advertising', 'consent': false },
    { 'purpose': 'analytics', 'consent': false },
    { 'purpose': 'functional', 'consent': false },
    { 'purpose': 'personalisation', 'consent': false },
    { 'purpose': 'security', 'consent': false }
  ];
  // remove the checked parameter
  cookieConsent(reducePrefs(prefs, checked, name));
}


const cookieOptions = () => {
  const control = document.querySelectorAll('.control');
  // const accepted = [];

  control.forEach(c =>
    c.addEventListener('click', e => {
      e.currentTarget.classList.toggle('active');
      e.currentTarget.classList.toggle('inactive');
      const input = e.currentTarget.querySelector('input');
      input.toggleAttribute('checked');
      // check attribute checked is true?
      // build a new arra of true values
      cookiePreferences(input.checked, input.name); // just use an array here
  }));

  // Need to add functionality for accept and reject all. May need refactoring of cookiePreferences and reduce function to accomodate
};

const fireWhenReady = () => {
  document.addEventListener('DOMContentLoaded', () => {
    cookiePopUp();
    checkCookie();
    removeCookie();
    cookieOptions();
 });
};
fireWhenReady();