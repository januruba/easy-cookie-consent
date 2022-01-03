# Demo
https://januruba.github.io/PL-Cookie-Bar/demo.html

# Build
npm run build

# Usage

## Initialization
```
const options = {};
const plcb = new Plcb(options); 
plcb.init();
```

## Options

| option                | description                                                                                         | default |
|-----------------------|-----------------------------------------------------------------------------------------------------|---------|
| dayExpires            | [number] Number of days after which the consent cookie expires                                      | 365     |
| withCloseOnSlide      | [boolean] If true appear 'X' button on right edge of the slide for Refuse all non tecnical cookies  | true    |
| urlCookiePolicy       | [string] Url of the complete cookie policies                                                        | #       |
| infoCookiePerformance | [string] Text for explain actual use in site for cookie performance (see in Popup Preference)       | empty   |
| infoCookieAdvertising | [string] Text for explain actual use in site for cookie advertising (see in Popup Preference)       | empty   |
| infoCookieFunctional  | [string] Text for explain actual use in site for cookie functional (see in Popup Preference)        | empty   |
| infoCookieAnalytics   | [string] Text for explain actual use in site for cookie analytics (see in Popup Preference)         | empty   |


## Callbacks
```
plcb.essentialCallback = function() {
  // the code that will be run AFTER the cookie list is closed
  console.log('ESSENTIAL');
};
plcb.performanceCallback = function() {
  // the code that will be run AFTER performance cookies has checked in setting-popup and Apply or Accept are clicked
  console.log('PERFORMANCE');
};
plcb.functionalityCallback = function() {
  // the code that will be run AFTER functional cookies has checked in setting-popup and Apply or Accept are clicked
  console.log('FUNCTIONAL');
};
plcb.advertisingCallback = function() {
  // the code that will be run AFTER advertising cookies has checked in setting-popup and Apply or Accept are clicked
  console.log('ADVERT');
};
plcb.analyticsCallback = function() {
  // the code that will be run AFTER analytics cookies has checked in setting-popup and Apply or Accept are clicked
  console.log('ANALYTICS');
};
```

## Consent logging
```
plcb.logConsent = function(obj) {
  // custom function for saving consents
  (async () => {
    const rawResponse = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          cookieConsent: obj.cookieConsent, 
          timestamp: Date.now(),
          values: { 
            cookieEssential: obj.cookieEssential,
            cookiePerformance: obj.cookiePerformance,
            cookieFunctionality: obj.cookieFunctionality,
            cookieAdvertising: obj.cookieAdvertising,
            cookieAnalytics: obj.cookieAnalytics
          }
        }
      )
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
};
```
