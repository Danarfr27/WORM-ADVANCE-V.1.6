(function () {
    // Service Worker killer to prevent caching old JS and CSP blocks
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }

    // Force login auth check before React loads
    if (window.location.pathname !== '/login' && window.location.pathname !== '/login.html') {
        var hasCookie = document.cookie.split(';').some(function (item) {
            return item.trim().startsWith('ai_session=');
        });

        if (!hasCookie) {
            // Immediate redirect if no session cookie exists
            window.location.replace('/login');
        }
    }
})();
