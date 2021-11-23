import { NativeModules, Platform } from 'react-native';

const { MobileAppDebugger } = NativeModules;

const noop = (_: string, __?: boolean) => {};

const setNativeExceptionHandler = (
  customErrorHandler = noop,
  forceApplicationToQuit = true,
  executeDefaultHandler = false
) => {
  if (Platform.OS === 'ios') {
    MobileAppDebugger.setNativeExceptionHandler(
      executeDefaultHandler,
      customErrorHandler
    );
  } else {
    MobileAppDebugger.setNativeExceptionHandler(
      forceApplicationToQuit,
      customErrorHandler
    );
  }
};

export interface INetworkData {
  url: string;
  method: string;
  status: number;

  resHeaders?: any;
  reqHeaders?: any;
  resData?: any;
  reqData?: any;
}

export interface IDebuggerConfig {
  port: number;
  isOverwriteConsole?: boolean;
}

export interface IErrorData {
  error: any;
  message: string;
  meta?: Record<any, any>;
}

export interface IAppDebugger {
  readonly debuggerUrl: string;

  crash(): void;
  configure(config: IDebuggerConfig): void;
  network(data: INetworkData): void;
  error(data: IErrorData): void;
  log(...args: any[]): void;
  logError(...args: any[]): void;
  logWarn(...args: any[]): void;
}

const DEBUGGER_HOST = 'http://localhost';

const DebuggerLogType = {
  Log: Symbol.for('Log'),
  Warn: Symbol.for('Warn'),
  Error: Symbol.for('Error'),
};

export class AppDebugger {
  private static _port: number;

  public static get debuggerUrl() {
    if (!AppDebugger._port) {
      throw new Error(
        '[AppDebugger]: You must specify the port in AppDebugger.configure()'
      );
    }
    return `${DEBUGGER_HOST}:${AppDebugger._port}`;
  }

  public static configure({ port, isOverwriteConsole }: IDebuggerConfig) {
    AppDebugger._port = port;

    if (isOverwriteConsole) {
      const origLog = console.log;
      const origWarn = console.warn;
      const origError = console.error;

      console.log = (...args: any[]) => {
        AppDebugger._log(...args, DebuggerLogType.Log);
        origLog(...args);
      };

      console.warn = (...args: any[]) => {
        AppDebugger._log(...args, DebuggerLogType.Warn);
        origWarn(...args);
      };

      console.error = (...args: any[]) => {
        AppDebugger._log(...args, DebuggerLogType.Error);
        origError(...args);
      };
    }

    // register native exteption handler
    setNativeExceptionHandler(function (error) {
      AppDebugger.error({
        error: arguments,
        message: `Native error: ${error}`,
      });
    });

    // register global js exteption handler
    // @ts-ignore
    global.ErrorUtils.setGlobalHandler(function (error, isFatal) {
      AppDebugger.error({
        error: error,
        message: `${isFatal ? 'Fatal ' : ''}JS error: ${error}`,
        meta: { isFatal },
      });
    });

    // const proxied = GLOBAL.XMLHttpRequest.prototype.open;
    // GLOBAL.XMLHttpRequest.prototype.open = function () {
    //   console.log('OPEN', arguments);
    //   return proxied.apply(this, [].slice.call(arguments));
    // };
  }

  public static network(data: INetworkData) {
    const req = {
      ...data,
      date: new Date().toISOString(),
    };

    fetch(`${AppDebugger.debuggerUrl}/network`, {
      method: 'POST',
      body: JSON.stringify(req),
    }).catch(() => {});
  }

  public static error(data: IErrorData) {
    const message =
      data?.message ||
      (data?.error as Error)?.message ||
      'error message not defined';
    const req = {
      ...data,
      message,
      date: new Date().toISOString(),
    };

    fetch(`${AppDebugger.debuggerUrl}/error`, {
      method: 'POST',
      body: JSON.stringify(req),
    }).catch(() => {});
  }

  public static log(...args: any[]) {
    AppDebugger._log(...args, DebuggerLogType.Log);
  }

  public static logError(...args: any[]) {
    AppDebugger._log(...args, DebuggerLogType.Error);
  }

  public static logWarn(...args: any[]) {
    AppDebugger._log(...args, DebuggerLogType.Warn);
  }

  private static _log(...data: any[]) {
    // last param is a log type
    const logType = data?.[data?.length - 1];
    // remove last param
    data?.splice?.(-1, 1);

    let type;

    switch (logType) {
      case DebuggerLogType.Warn:
        type = 'warn';
        break;
      case DebuggerLogType.Error:
        type = 'error';
        break;
      case DebuggerLogType.Log:
      default:
        type = 'log';
    }

    const req = {
      data,
      type,
      date: new Date().toISOString(),
    };
    fetch(`${AppDebugger.debuggerUrl}/log`, {
      method: 'POST',
      body: JSON.stringify(req),
    }).catch(() => {});
  }

  public static crash() {
    MobileAppDebugger.crash();
  }
}
