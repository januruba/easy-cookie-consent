class Plcb {
  constructor() {
    this.cookieConsentName = 'plcb-consent';
    this.cookiePerformanceName = 'plcb-performance';
    this.cookieFunctionalityName = 'plcb-functionality';
    this.cookieAdvertisingName = 'plcb-advertising';
    this.cookieAnalyticsName = 'plcb-analytics';
    
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
    } else {
      this.runCallbacks();
    }
    this.initListeners();
  }
  
  initDom() {
    this.elBar = document.querySelector('#plcb-slide');
    this.elPop = document.querySelector('#plcb-settings');
    this.elBtnCYes = document.querySelectorAll('*[data-plcb="accept"]');
    this.elBtnCNo = document.querySelectorAll('*[data-plcb="refuse"]');
    this.elBtnSettings = document.querySelectorAll('*[data-plcb="settings"]');
    this.elBtnOpen = document.querySelectorAll('*[data-plcb="bar"]');
    this.elBtnClose = document.querySelectorAll('*[data-plcb="close"]');
    this.elApply = document.querySelectorAll('*[data-plcb="apply"]');
    
    this.elInputPerformance = document.querySelector('input[name="' + this.cookiePerformanceName + '"]');
    this.elInputFunctionality = document.querySelector('input[name="' + this.cookieFunctionalityName + '"]');
    this.elInputAdvertising = document.querySelector('input[name="' + this.cookieAdvertisingName + '"]');
    this.elInputAnalytic = document.querySelector('input[name="' + this.cookieAnalyticsName + '"]');
  }
  
  initListeners() {
    let plcb = this;
    
    this.elBtnCYes.forEach(item => {
      item.addEventListener('click', event => {
        plcb.setAcceptAll(); 
        plcb.proccessUserInput();
      });  
    });
    
    this.elBtnCNo.forEach(item => {
      item.addEventListener('click', event => {
        plcb.setRefuseAll(); 
        plcb.proccessUserInput();
      });  
    });
    
    this.elBtnSettings.forEach(item => {
      item.addEventListener('click', event => {
        plcb.hideBar();
        plcb.showPopup(); 
      });  
    });
    
    this.elBtnOpen.forEach(item => {
      item.addEventListener('click', event => {
        plcb.hidePopup();
        plcb.showBar(); 
      });  
    });
    
    this.elBtnClose.forEach(item => {
      item.addEventListener('click', event => {
        plcb.hidePopup(); 
        if(typeof(this.cookieConsent) === 'undefined') {
          plcb.showBar();
        }
      });  
    });
    
    this.elApply.forEach(item => {
      item.addEventListener('click', event => {
        plcb.hidePopup(); 
        plcb.saveSettings();
        plcb.proccessUserInput();
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
  
  proccessUserInput() {
    this.cookieConsent = this.renderConsentHash();
    this.setCookies();
    this.logConsent(this);
    this.hideBar();
    this.hidePopup();
    this.runCallbacks();
  } 
  
  showBar() {
    this.elBar.classList.add('shown');
  }
  
  showPopup() {
    this.loadSettings();
    this.elPop.classList.add('shown');
  }
  
  hideBar() {
    this.elBar.classList.remove('shown');
  }
  
  hidePopup() {
    this.elPop.classList.remove('shown');
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
    date.setTime(date.getTime()+(365*24*60*60*1000));
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
    if(this.cookiePerformance === 'true' || this.cookiePerformance === true) this.performanceCallback();
    if(this.cookieFunctionality === 'true' || this.cookieFunctionality === true) this.functionalityCallback();
    if(this.cookieAdvertising === 'true' || this.cookieAdvertising === true) this.advertisingCallback();
    if(this.cookieAnalytics === 'true' || this.cookieAnalytics === true) this.analyticsCallback();
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