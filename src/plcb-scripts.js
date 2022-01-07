const __slide = (opt) => `
<div class="inner">
    ${!!opt.withCloseOnSlide ? '<button class="plcb-leave" data-plcb="closeslide"><svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg"> <line x1="1" y1="11" x2="11" y2="1" stroke-width="2"/> <line x1="1" y1="1" x2="11" y2="11"  stroke-width="2"/></svg></button>' : ''}
    <div class="plcb-slide-text">
        <p><strong>Questo sito usa i cookies</strong></p>
        <p>Questo sito usa cookies tecnici per offrirti una migliore esperienza di navigazione. Pu&ograve; inoltre utilizzare cookie di "terze parti" (impostati da un sito web diverso da quello attualmente visitato)
            per le finalit&agrave; descritte nella nostra <a href="${opt.urlCookiePolicy}">cookie policy</a>.<br /><br />
            Puoi liberamente prestare, rifiutare o revocare il tuo consenso alle varie tipologie di cookies accedendo al <b>pannello delle preferenze</b> cliccando su <i>'Preferenze'</i>.<br />
            Puoi rifiutare all'uso dei cookies cliccando su <i>'Rifiuta'</i>.<br />
            Puoi acconsentire all'uso dei cookies nella loro interezza cliccando su <i>'Accetta'</i>.<br />
            <small>L'uso dei cookies ha la durata di ${opt.dayExpires} giorni.</small>
        </p>
        <p>
            <i>Cliccando sulla 'X' di chiusura del banner, non acconsenti all'uso dei cookie diversi dai cookies tecnici. In questo modo l'esperienza di navigazione <strong>potrebbe</strong> risultare compromessa.</i><br />
            <strong>E' possibile leggere la nostra <a href="${opt.urlCookiePolicy}">Cookie/Privacy Policy</a> completa</strong>
        </p>
    </div>
    <div class="plcb-slide-buttons">
        <button type="button" class="plcb-btn" data-plcb="settings">Preferenze</button>
        <button type="button" class="plcb-btn plcb-btn-no" data-plcb="refuse">Rifiuta</button>
        <button type="button" class="plcb-btn plcb-btn-yes" data-plcb="accept">Accetta</button>
    </div>
</div>
`;
const __popup = (opt) => `
<div class="popup-window">
      <button class="plcb-leave" data-plcb="close"><svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg"> <line x1="1" y1="11" x2="11" y2="1" stroke-width="2"/> <line x1="1" y1="1" x2="11" y2="11"  stroke-width="2"/></svg></button>
      <p><strong>Cookie settings</strong></p>
      <p>Puoi esprimere le tue preferenze per il settaggio dei cookies: </p>
      <ul>
        <li>Selezionando la o le singole tipologie di cookies cui dare il permesso e cliccare su <i>'Aggiorna'</i></li>
        <li>Cliccando su <i>'Accetta'</i> per l'accettazione di tutti i cookies, anche i non-essenziali (non-tecnici)</li>
        <li>Cliccando su <i>'Rifiuta tutti'</i> non consentirai il processamento dei cookie non-essenziali</li>
      </ul>
      <p data-plcb-if="id"><small>Il tuo ID di consenso: <span data-plcb-fill="id"></span></small></p>
      <div class="plcb-cookie-sec">
        <label>
          <input type="checkbox" name="plcb-essential" checked disabled> Cookies Essenziali
          <small>Questi cookie sono necessari per garantire le funzionalit&agrave; di base del sito web.</small>
        </label>
        <label>
          <input type="checkbox" name="plcb-functionality"> Cookies Funzionali
          <small>Rendono il sito pi&ugrave; facile da usare (eventualmente salvando impostazioni di configurazione dell'utente) e pi&ugrave; interattivo (mappe, grafici, etc...).<br /><b>${!!opt.infoCookieFunctional ? opt.infoCookieFunctional : ''}</b></small>
        </label>
        <label>
          <input type="checkbox" name="plcb-analytics"> Cookies Analytics
          <small>Vengono usati (anche se terzi) per migliorare la funzionalit&agrave; e la struttura del sito web, in base a come il sito viene utilizzato.<br /><b>${!!opt.infoCookieAnalytics ? opt.infoCookieAnalytics : ''}</b></small>
        </label>
        <label>
          <input type="checkbox" name="plcb-advertising"> Cookies Pubblicitari
          <small>Utilizzati per tracciare i visitatori attraverso i siti web consentendo di mostrare pubblicit&agrave; pertinenti e coinvolgenti.<br /><b>${!!opt.infoCookieAdvertising ? opt.infoCookieAdvertising : ''}</b></small>
        </label>
        <label>
          <input type="checkbox" name="plcb-performance"> Cookies Performance
          <small>Utilizzati specificamente per raccogliere dati sul caricamento della pagina o sui messaggi di errore dell'utente nelle pagine web.<br /><b>${!!opt.infoCookiePerformance ? opt.infoCookiePerformance : ''}</b></small>
        </label>
      </div>
      <small>
        <strong>Ti invitiamo, comunque, a leggere <a href="${opt.urlCookiePolicy}">l'informativa estesa</a> nella quale &egrave; spiegato, inoltre, come poter disinstallare i cookies in base ai diversi Browser utilizzati.</strong>
      </small>
      <div class="plcb-submit">
        <button type="button" class="plcb-btn plcb-btn-no" data-plcb="refuse">Rifiuta tutti</button>
        <button type="button" class="plcb-btn" data-plcb="apply">Aggiorna</button>
        <button type="button" class="plcb-btn plcb-btn-yes" data-plcb="accept">Accetta</button>
      </div>
</div>
`;

class Plcb {
  constructor({ dayExpires = 365,
                withCloseOnSlide = true,
                urlCookiePolicy = '#',
                infoCookiePerformance = '',
                infoCookieAdvertising = '',
                infoCookieAnalytics = '',
                infoCookieFunctional = ''
              } = opts) {
    this.cookieConsentName = 'plcb-consent';
    this.cookiePerformanceName = 'plcb-performance';
    this.cookieFunctionalityName = 'plcb-functionality';
    this.cookieAdvertisingName = 'plcb-advertising';
    this.cookieAnalyticsName = 'plcb-analytics';

    this.options = {
      dayExpires,
      withCloseOnSlide,
      urlCookiePolicy,
      infoCookiePerformance,
      infoCookieAdvertising,
      infoCookieAnalytics,
      infoCookieFunctional
    };

    this.templateSlide = !!this.options.templateSlide ? this.options.templateSlide : __slide(this.options);
    this.templatePopup = !!this.options.templatePopup ? this.options.templatePopup : __popup(this.options);

    this.essentialCallback = () => {};
    this.performanceCallback = () => {};
    this.functionalityCallback = () => {};
    this.advertisingCallback = () => {};
    this.analyticsCallback = () => {};
    
    this.logConsent = (obj) => { };
  }
  
  init() {
    this.initDom();
    this.getCookies();
    if(typeof(this.cookieConsent) === 'undefined') {
      this.showBar();
      this.showBackground();
    } else {
      this.runCallbacks();
      this.hideBackground();
    }
    this.initListeners();
  }
  
  initDom() {
    this.elBar = document.querySelector('#plcb-slide');
    this.elPop = document.querySelector('#plcb-settings');
    this.elBackground = document.querySelector('.plcb-container');
    this.startTemplate();
    this.elBtnCYes = document.querySelectorAll('*[data-plcb="accept"]');
    this.elBtnCNo = document.querySelectorAll('*[data-plcb="refuse"]');
    this.elBtnSettings = document.querySelectorAll('*[data-plcb="settings"]');
    this.elBtnOpen = document.querySelectorAll('*[data-plcb="bar"]');
    this.elBtnCloseSlide = document.querySelectorAll('*[data-plcb="closeslide"]');
    this.elBtnClose = document.querySelectorAll('*[data-plcb="close"]');
    this.elApply = document.querySelectorAll('*[data-plcb="apply"]');
    this.elConsentId = document.querySelectorAll('*[data-plcb-fill="id"]');
    this.elIfConsentId = document.querySelectorAll('*[data-plcb-if="id"]');
    
    this.elInputPerformance = document.querySelector('input[name="' + this.cookiePerformanceName + '"]');
    this.elInputFunctionality = document.querySelector('input[name="' + this.cookieFunctionalityName + '"]');
    this.elInputAdvertising = document.querySelector('input[name="' + this.cookieAdvertisingName + '"]');
    this.elInputAnalytic = document.querySelector('input[name="' + this.cookieAnalyticsName + '"]');
  }

  startTemplate() {
    if(!!this.elBar) {
      this.elBar.innerHTML = this.templateSlide;
    }
    if(!!this.elPop) {
      this.elPop.innerHTML = this.templatePopup;
    }
  }
  
  initListeners() {
    let plcb = this;
    
    this.elBtnCYes.forEach(item => {
      item.addEventListener('click', event => {
        plcb.setAcceptAll(); 
        plcb.processUserInput();
      });  
    });
    
    this.elBtnCNo.forEach(item => {
      item.addEventListener('click', event => {
        plcb.setRefuseAll(); 
        plcb.processUserInput();
      });  
    });
    
    this.elBtnSettings.forEach(item => {
      item.addEventListener('click', event => {
        plcb.showBackground();
        plcb.hideBar();
        plcb.showPopup(); 
      });  
    });
    
    this.elBtnOpen.forEach(item => {
      item.addEventListener('click', event => {
        plcb.showBackground();
        plcb.hidePopup();
        plcb.showBar(); 
      });  
    });
    
    this.elBtnClose.forEach(item => {
      item.addEventListener('click', event => {
        plcb.hidePopup(); 
        if(this.consentGiven()) {
          plcb.showBackground();
          plcb.showBar();
        } else {
          plcb.hideBackground();
        }
      });  
    });

    this.elBtnCloseSlide.forEach(item => {
      item.addEventListener('click', event => {
        plcb.setRefuseAll();
        plcb.processUserInput();
        //hide
        plcb.hideBar();
      });
    });
    
    this.elApply.forEach(item => {
      item.addEventListener('click', event => {
        plcb.hidePopup(); 
        plcb.saveSettings();
        plcb.processUserInput();
      });  
    });
  }
  
  setAcceptAll() {
    this.cookiePerformance = true;
    this.cookieFunctionality = true;
    this.cookieAdvertising = true;
    this.cookieAnalytics = true;
  }
  
  setRefuseAll() {
    this.cookiePerformance = false;
    this.cookieFunctionality = false;
    this.cookieAdvertising = false;
    this.cookieAnalytics = false;
  }
  
  processUserInput() {
    this.cookieConsent = this.renderConsentHash();
    this.setCookies();
    this.logConsent(this);
    this.hideBar();
    this.hidePopup();
    this.hideBackground();
    this.runCallbacks();
  } 
  
  showBar() {
    this.elBar.classList.add('shown');
  }
  
  showPopup() {
    this.loadSettings();
    this.fillData();
    this.elPop.classList.add('shown');
  }
  
  hideBar() {
    this.elBar.classList.remove('shown');
  }
  
  hidePopup() {
    this.elPop.classList.remove('shown');
  }

  hideBackground() {
    this.elBackground.classList.add('hide');
  }

  showBackground() {
    this.elBackground.classList.remove('hide');
  }
  
  fillData() {
    this.elConsentId.forEach(item => {
      item.innerHTML = this.cookieConsent;
    });
    this.elIfConsentId.forEach(item =>{
      if(this.consentGiven()) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }
  
  consentGiven() {
    return typeof(this.cookieConsent) === 'undefined';
  }
  
  getCookies() {
    this.cookieConsent = this.getCookie(this.cookieConsentName);
    this.cookiePerformance = this.getCookie(this.cookiePerformanceName);
    this.cookieFunctionality = this.getCookie(this.cookieFunctionalityName);
    this.cookieAdvertising = this.getCookie(this.cookieAdvertisingName);
    this.cookieAnalytics = this.getCookie(this.cookieAnalyticsName);
  }
  
  getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
  }
  
  setCookies() {
    let date = new Date();
    date.setTime(date.getTime()+(this.options.dayExpires * 24*60*60*1000));
    let expires = "; expires="+date.toUTCString();
    this.setCookie(this.cookieConsentName,this.cookieConsent,expires);
    this.setCookie(this.cookiePerformanceName,this.cookiePerformance,expires);
    this.setCookie(this.cookieFunctionalityName,this.cookieFunctionality,expires);
    this.setCookie(this.cookieAdvertisingName,this.cookieAdvertising,expires);
    this.setCookie(this.cookieAnalyticsName,this.cookieAnalytics,expires);
  }
  
  setCookie(name,value,expires) {
    document.cookie = name+"="+value+expires+"; path=/";
  }
  
  renderConsentHash() {
    let str = navigator.userAgent;
    var hash = 2;
    for (var i = 0; i < str.length; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash;
    }
    return (+new Date).toString() + '-' + Math.abs(hash) + '-' + Math.round((Math.random() * 999999999) + 1);
  }
  
  runCallbacks() {
    this.essentialCallback();
    if(this.cookiePerformance === 'true' || this.cookiePerformance === true) {
      this.performanceCallback();
    }
    if(this.cookieFunctionality === 'true' || this.cookieFunctionality === true) {
      this.functionalityCallback();
    }
    if(this.cookieAdvertising === 'true' || this.cookieAdvertising === true) {
      this.advertisingCallback();
    }
    if(this.cookieAnalytics === 'true' || this.cookieAnalytics === true) {
      this.analyticsCallback();
    }
  }
  
  loadSettings() {
    this.elInputPerformance.checked = (this.cookiePerformance == true || this.cookiePerformance == 'true');
    this.elInputFunctionality.checked = (this.cookieFunctionality == true || this.cookieFunctionality == 'true');
    this.elInputAdvertising.checked = (this.cookieAdvertising == true || this.cookieAdvertising == 'true');
    this.elInputAnalytic.checked = (this.cookieAnalytics == true || this.cookieAnalytics == 'true');
  }
  
  saveSettings() {
    this.cookiePerformance = this.elInputPerformance.checked;
    this.cookieFunctionality = this.elInputFunctionality.checked;
    this.cookieAdvertising = this.elInputAdvertising.checked;
    this.cookieAnalytics = this.elInputAnalytic.checked;
  }
}