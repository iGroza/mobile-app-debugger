# ⚛️ mobile-app-debugger

<br/>
  <p align="center">
    <img src="example/img/example-1.gif" alt="App Debugger client gif example" width="300">
  </p>
<br/>

[App Debugger client gif example](https://giphy.com/gifs/android-ios-react-native-afXhgFXufSlLWf04q4)


## 🚀 Install

### First you have to install the debugger client on your smartphone

- [Android client](https://play.google.com/store/apps/details?id=ru.kirillag.mobileappdebugger)
- iOS client (the client is ready, the money is being collected for "Apple Developer membership")
> if you care, you can donate money, thanks 🙃
> [paypal.me/agkirill](https://paypal.me/agkirill)
> 
> RUB - R115771767910
> 
> USD - Z233893567937
> 
> EUR - E585715598235

run

`yarn add mobile-app-debugger`

or

`npm i mobile-app-debugger --save`

## About

It serves for debugging network requests, catching errors and crashes, as well as for viewing logs from a device with the ability to export data to JSON.

## ‼️ Important
### Installation for Android

add below code in `AndroidManifest.xml` file in `application` section:

```XML
 <application
    android:usesCleartextTraffic="true"
    ...
  >
      ...
  </application>
```

## 🪄 Usage

### ⚙️ Setup
```typescript
// Configure debugger
import { AppDebugger } from 'app-debugger';

AppDebugger.configure({
  // debugger client port
  port: number;
  // optional, ovewrrite default console behavior and send logs to debugger client
  isOverwriteConsole: boolean;
});
```

### 🌐 Network handling

> 💡 will soon have functionality for automatic catching of requests to the network

```typescript
// Send network data to debbuger client
AppDebugger.network({
  url: string;
  method: string;
  status: number;

  // request info
  reqData?: Object;
  reqHeaders?: Object;

  // response info
  resData?: Object;
  resHeaders?: Object;
});
```

### ⚠️ Error catching
Errors and crashes are automatically caught, and you do not need to do anything. But if you want to send custom error, you can also use the following API.

> NOTE: If you override `componentDidCatch` you must also send an error from it yourself.

```typescript
// send error to debbuger client
AppDebugger.error({
  // error object
  error: Error;
  // short description of the error
  message?: string;
  // any metadata to help you
  meta?: Object;
});
```

### 💬 Send logs

if you use `isOverwriteConsole: true` logs will be sent automatically

```typescript
// send console.log to debbuger client
AppDebugger.log(...args: any[]);
// send console.warn to debbuger client
AppDebugger.logWarn(...args: any[]);
// send console.error to debbuger client
AppDebugger.logError(...args: any[]);
```

## Example of usage

[See example in directory](https://github.com/iGroza/mobile-app-debugger/tree/master/example/src)

## Docs

[Privacy policy](https://www.termsfeed.com/live/b41d66d1-43ba-48af-88b0-c14ec71bd810)
