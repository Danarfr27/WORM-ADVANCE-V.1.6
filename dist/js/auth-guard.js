// Bypass login redirect and reveal the app regardless of auth
(function () {

    // If the auth shim is missing, warn and reveal the app
    if (!window.auth) {
        console.warn('auth shim missing; skipping login redirect.');
        document.body.style.display = 'block';
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
        return;
    }

    // Check auth status but do not redirect — always reveal the app
    auth.isAuthenticated().then(() => {
        document.body.style.display = 'block';
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
    }).catch((e) => {
        console.error("Auth Exception:", e);
        document.body.style.display = 'block';
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
    });

})();
