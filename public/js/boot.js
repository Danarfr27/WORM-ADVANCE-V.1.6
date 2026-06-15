(function () {
    // Service Worker killer to prevent caching old JS and CSP blocks
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }

    // Previously forced a login redirect; this is disabled so the app
    // can load directly without showing a separate login page.
})();
