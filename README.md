# Demo
https://januruba.github.io/PL-Cookie-Bar/demo.html

# Build
npm run build

# Usage

## Initialization
```
const plcb = new Plcb(); 
plcb.init();
```

## Callbacks
```
plcb.essentialCallback = function() {
  // kod, co se pusti POKAZDE po zavreni cookie listy  
  console.log('ESSENTIAL');
};
plcb.performanceCallback = function() {
  // performance cookies
  console.log('PERFORMANCE');
};
plcb.functionalityCallback = function() {
  // funkcni cookie
  console.log('FUNCTIONAL');
};
plcb.advertisingCallback = function() {
  // reklamni cookies
  console.log('ADVERT');
};
plcb.analyticsCallback = function() {
  // analyticky kod
  console.log('ANALYTICS');
};
```

## Consent logging
```
plcb.logConsent = function(obj) {
  // custom funkce pro ulozeni consentu
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
