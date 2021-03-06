import { Linking, Platform } from 'react-native';
import { UnavailabilityError } from 'expo-errors';
import ExponentWebBrowser from './ExpoWebBrowser';
export async function openBrowserAsync(url) {
    if (!ExponentWebBrowser.openBrowserAsync) {
        throw new UnavailabilityError('WebBrowser', 'openBrowserAsync');
    }
    return ExponentWebBrowser.openBrowserAsync(url);
}
export function dismissBrowser() {
    if (!ExponentWebBrowser.dismissBrowser) {
        throw new UnavailabilityError('WebBrowser', 'dismissBrowser');
    }
    ExponentWebBrowser.dismissBrowser();
}
export async function openAuthSessionAsync(url, redirectUrl) {
    if (_authSessionIsNativelySupported()) {
        if (!ExponentWebBrowser.openAuthSessionAsync) {
            throw new UnavailabilityError('WebBrowser', 'openAuthSessionAsync');
        }
        return ExponentWebBrowser.openAuthSessionAsync(url, redirectUrl);
    }
    else {
        return _openAuthSessionPolyfillAsync(url, redirectUrl);
    }
}
export function dismissAuthSession() {
    if (_authSessionIsNativelySupported()) {
        if (!ExponentWebBrowser.dismissAuthSession) {
            throw new UnavailabilityError('WebBrowser', 'dismissAuthSession');
        }
        ExponentWebBrowser.dismissAuthSession();
    }
    else {
        if (!ExponentWebBrowser.dismissBrowser) {
            throw new UnavailabilityError('WebBrowser', 'dismissAuthSession');
        }
        ExponentWebBrowser.dismissBrowser();
    }
}
/* iOS <= 10 and Android polyfill for SFAuthenticationSession flow */
function _authSessionIsNativelySupported() {
    if (Platform.OS === 'android') {
        return false;
    }
    const versionNumber = parseInt(String(Platform.Version), 10);
    return versionNumber >= 11;
}
let _redirectHandler = null;
async function _openAuthSessionPolyfillAsync(startUrl, returnUrl) {
    if (_redirectHandler) {
        throw new Error(`The WebBrowser's auth session is in an invalid state with a redirect handler set when it should not be`);
    }
    try {
        return await Promise.race([openBrowserAsync(startUrl), _waitForRedirectAsync(returnUrl)]);
    }
    finally {
        dismissBrowser();
        if (!_redirectHandler) {
            throw new Error(`The WebBrowser auth session is in an invalid state with no redirect handler when one should be set`);
        }
        Linking.removeEventListener('url', _redirectHandler);
        _redirectHandler = null;
    }
}
function _waitForRedirectAsync(returnUrl) {
    return new Promise(resolve => {
        _redirectHandler = (event) => {
            if (event.url.startsWith(returnUrl)) {
                resolve({ url: event.url, type: 'success' });
            }
        };
        Linking.addEventListener('url', _redirectHandler);
    });
}
//# sourceMappingURL=WebBrowser.js.map