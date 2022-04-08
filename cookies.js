const createCookie = (prefs, cookieExpireDays) => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (cookieExpireDays*24*60*60*1000));
  const expires = 'Expires=' + currentDate.toUTCString();
  const consent = `consent=${JSON.stringify(prefs)}; Path=/; SameSite=Lax; Secure;`;
  document.cookie = consent + expires;
 }

const getCookie = (cookieName) => {
  let cookie = {};
  document.cookie.split(';').forEach((co) => {
    let [key,value] = co.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

 const checkCookie = () => {
  const cookie = getCookie('consent');
  let decodedCookie;
  let acceptedCookie = false;
  if (cookie) decodedCookie = JSON.parse(cookie);
  if (decodedCookie.some(dc => dc.consent === true)) acceptedCookie = true;

  const heading = document.querySelector('h2.monster');
  const status = document.querySelector('p.monster');
  const banner = document.querySelector('.cookieBanner');

  if (acceptedCookie) {
    document.querySelector('body').classList.add('yay');
    if (heading) heading.innerHTML = 'Mmmmm Cookies';
    if (heading) heading.setAttribute('data-text', 'Mmmmm Cookies');
    if (status) status.innerHTML = 'Cookies in the Cookie Jar :)';
    banner.classList.add('hide');
  };
  if (!cookie || !acceptedCookie) status.innerHTML = 'Cookie jar is empty :(';
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
  const banner = document.querySelector('.cookieBanner');

  reviewCookies.addEventListener('click', () => {
    consent.classList.add('show');
    consent.classList.remove('hide');
    backdrop.classList.add('show');
    backdrop.classList.remove('hide');
    banner.classList.add('hide');
  });
}

const cookieConsent = (prefs) => {
  const confirm = document.querySelector('button.confirm');

  confirm.addEventListener('click', () => {
    createCookie(prefs);
  });
}

const cookiePreferences = (accepted) => {
  const prefs = [
    { 'purpose': 'advertising', 'consent': false },
    { 'purpose': 'analytics', 'consent': false },
    { 'purpose': 'functional', 'consent': false },
    { 'purpose': 'personalisation', 'consent': false },
    { 'purpose': 'security', 'consent': false }
  ];

  accepted.forEach(a => {
    const i = prefs.findIndex(p => p.purpose === a);
    prefs[i].consent = true;
  })
  if (!accepted.length) {
    prefs.forEach(p => p.consent = false);
  }
  cookieConsent(prefs);
}

const cookieOptions = () => {
  const control = document.querySelectorAll('.control');
  const acceptAll = document.querySelector('.accept');
  const rejectAll = document.querySelector('.reject');
  let accepted = [];

  control.forEach(c =>
    c.addEventListener('click', e => {
      e.currentTarget.classList.toggle('active');
      e.currentTarget.classList.toggle('inactive');
      const input = e.currentTarget.querySelector('input');
      input.toggleAttribute('checked');

      if (input.checked) {
        accepted.push(input.getAttribute('name'));
      }
      if (!input.checked) {
        accepted.pop(input.getAttribute('name'));
      }
      cookiePreferences(accepted);
  }));

  acceptAll.addEventListener('click', () => {
    control.forEach(c => {
      accepted.push( c.querySelector('input').getAttribute('name') );
      c.querySelector('input').setAttribute('checked', true);
      c.classList.add('active');
      c.classList.remove('inactive');
    });
    cookiePreferences(accepted);
  })

  rejectAll.addEventListener('click', () => {
    accepted = [];
    control.forEach(c => {
      c.querySelector('input').setAttribute('checked', false);
      c.classList.add('inactive');
      c.classList.remove('active');
    });
    cookiePreferences(accepted);
  })

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