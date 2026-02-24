// Redirect to login if not authenticated
(function () {

    // Immediate redirection if auth shim is missing
    if (!window.auth) {
        console.warn('Auth system not initialized');
        window.location.href = '/login';
        return;
    }

    // Hide body initially to prevent flash of unauth content
    document.body.style.display = 'none';
    document.body.style.opacity = '0';
    document.body.style.pointerEvents = 'none';

    // Check auth status
    auth.isAuthenticated().then(valid => {
        if (!valid) {
            console.log('User not authenticated, redirecting to login');
            window.location.href = '/login';
        } else {
            console.log('User authenticated, showing app');
            // Auth success: Reveal the app
            document.body.style.display = 'block';
            document.body.style.opacity = '1';
            document.body.style.pointerEvents = 'auto';
        }
    }).catch((e) => {
        console.error("Auth Exception:", e);
        window.location.href = '/login';
    });

})();
