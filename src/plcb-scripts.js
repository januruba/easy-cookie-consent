class Plcb {
  constructor() {
    this.cookieConsentName = 'plcb-consent';
    this.cookieEssentialName = 'plcb-essential';
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
    this.elBtnCYes = document.querySelector('button.plcb-a');
    this.elBtnCNo = document.querySelector('button.plcb-r');
    this.elBtnSettings = document.querySelector('button.plcb-s');
    this.elBtnOpen = document.querySelector('*[data-plcb="bar"]');
    this.elBtnOpenSettings = document.querySelector('*[data-plcb="settings"]');
    this.elBtnClose = document.querySelector('*[data-plcb="close"]');
  }
  
  initListeners() {
    let that = this;
    this.elBtnCYes.addEventListener("click",() => {    
      that.setAcceptAll(); 
      that.proccessUserInput();
    });
    this.elBtnCNo.addEventListener("click",() => {    
      that.setRefuseAll(); 
      that.proccessUserInput();
    });
    this.elBtnSettings.addEventListener("click",() => {    
      that.hideBar();
      that.showPopup(); 
    });
    this.elBtnOpenSettings.addEventListener("click",() => {    
      that.hidePopup();
      that.showBar(); 
    });
    this.elBtnOpenSettings.addEventListener("click",() => {    
      that.hideBar();
      that.showPopup(); 
    });
    this.elBtnClose.addEventListener("click",() => {    
      that.hidePopup(); 
      if(typeof(this.cookieConsent) === 'undefined') {
        this.showBar();
      }
    });
  }
  
  setAcceptAll() {
    this.cookieEssential = true;
    this.cookiePerformance = true;
    this.cookieFunctionality = true;
    this.cookieAdvertising = true;
    this.cookieAnalytics = true;
  }
  
  setRefuseAll() {
    this.cookieEssential = true;
    this.cookiePerformance = false;
    this.cookieFunctionality = false;
    this.cookieAdvertising = false;
    this.cookieAnalytics = false;
  }
  
  setCustom(cookieEssential,cookiePerformance,cookieFunctionality,cookieAdvertising,cookieAnalytics) {
    this.cookieEssential = cookieEssential;
    this.cookiePerformance = cookiePerformance;
    this.cookieFunctionality = cookieFunctionality;
    this.cookieAdvertising = cookieAdvertising;
    this.cookieAnalytics = cookieAnalytics;
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
    this.cookieEssential = this.getCookie(this.cookieEssentialName);
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
    this.setCookie(this.cookieEssentialName,this.cookieEssential,expires);
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
  
  leaveSettings() {
    
  }
  
  saveSettings() {
    
  }
}