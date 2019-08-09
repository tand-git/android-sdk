// Custom event function
// name : Event Name
// params : Parameter of JSON type
function logEvent(name, params) {
  if (window.SphereJsInterface) {
    // Call Android interface
    window.SphereJsInterface.logEvent(name, JSON.stringify(params));
  } else if (window.webkit
      && window.webkit.messageHandlers
      && window.webkit.messageHandlers.sphere) {
    // Call iOS interface
    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    window.webkit.messageHandlers.sphere.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
}
