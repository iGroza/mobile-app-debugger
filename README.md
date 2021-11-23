# ⚛️ mobile-app-debugger

![App Debugger client](https://media4.giphy.com/media/afXhgFXufSlLWf04q4/giphy.gif)

[App Debugger client gif example](https://giphy.com/gifs/android-ios-react-native-afXhgFXufSlLWf04q4)


## 🚀 Install

> first you have to install the debugger client on your smartphone

- Android client (coming soon)
- iOS client (coming soon)

run

`yarn add mobile-app-debugger`

or

`npm i mobile-app-debugger --save`

## Mannualy instalation for Android

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

```typescript
// 1. Configure debugger
import { AppDebugger } from 'app-debugger';

AppDebugger.configure({
  // debugger client port
  port: number;
  // optional, ovewrrite default console behavior and send logs to debugger client
  isOverwriteConsole: boolean;
});

// 2. Usage

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

// send error to debbuger client
AppDebugger.error({
  // error object
  error: Error;
  // short description of the error
  message?: string;
  // any metadata to help you
  meta?: Object;
});

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
