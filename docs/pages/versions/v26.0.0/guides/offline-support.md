---
title: Offline Support
---

import withDocumentationElements from '~/components/page-higher-order/withDocumentationElements';

export default withDocumentationElements(meta);

Your app will encounter circumstances where the internet connection is sub-par or totally unvailable and it still needs to work reasonably well. This guide offers more information and best practices for providing a great experience while the device is offline.

## Load JS updates in the background

When you [publish](../../workflow/publishing/) an update to your app, your users will receieve the new version of your JS over the air. The new version will download either next time the app starts, or next time you call [Updates.reload()](../../sdk/updates/). This behavior also applies the very first time the user opens your app.

Expo offers multiple behaviors for how it should download your JS. It can either block the UI with a [splash screen](../splash-screens/) or [AppLoading component](../../sdk/app-loading/) until the new JS is downloaded, or it can immediately show an old version of your JS and download the update in the background. The former option is better if your users must have the latest version at all times; the latter option is better if you have a bad internet connection and need to show something right away.

To enable background JS downloads, set `updates.fallbackToCacheTimeout` to `0` in `app.json`. You can also listen to see when a new version has finished downloading. For more information, see [Configuring OTA Updates](../configuring-ota-updates/).

## Cache your assets after downloading

By default, all of your assets (images, fonts, etc.) are [uploaded to Expo's CDN](../assets/) when you publish updates to your app, which allows you to update them over the air. Once they're downloaded, you can [cache them](../preloading-and-caching-assets/) so you don't need to download them a second time. If you publish changes, the cache will be invalidated and the changed version will be downloaded.

## Bundle your assets inside your standalone binary

Expo can bundle assets into your standalone binary during the build process so that they will be available immediately, even if the user has never run your app before. This is important if:

- Your users may not have internet the first time they open your app, or
- If your app relies on a nontrivial amount of assets for the very first screen to function properly.

To bundle assets in your binary, use the [assetBundlePatterns](../../workflow/configuration/) key in `app.json` to provide a list of paths in your project directory:

```
"assetBundlePatterns": [
  "assets/images/*"
],
```

Images with paths matching the given patterns will be bundled into your native binaries next time you run `exp build`.

> **Note:** This behavior does not apply to detached ExpoKit projects. We're working on that.

## Listen for changes in network availability

React Native exposes the [NetInfo](https://facebook.github.io/react-native/docs/netinfo.html) API, which informs you if your device's reachability changes. You may want to change your UI (e.g. show a banner, or disable some functions) if you notice that there's no connection available.
