// check browser supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      // a promise
      .register("./serviceworker.js")
      .then((reg) => console.log(`Success: ${reg.scope}`))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}
