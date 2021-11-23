package ru.kirillag.mobileappdebugger;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = MobileAppDebuggerModule.NAME)
public class MobileAppDebuggerModule extends ReactContextBaseJavaModule {
  public static final String NAME = "MobileAppDebugger";
  private ReactApplicationContext reactContext;
  private Callback callbackHolder;
  private Thread.UncaughtExceptionHandler originalHandler;

  public MobileAppDebuggerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }


  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void crash() {
    callbackHolder.invoke("Test crash");
    throw new NullPointerException();
  }

  @ReactMethod
  public void setNativeExceptionHandler(final boolean forceToQuit, Callback customHandler) {

    callbackHolder = customHandler;
    originalHandler = Thread.getDefaultUncaughtExceptionHandler();

    Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {

      @Override
      public void uncaughtException(Thread thread, Throwable throwable) {

        String stackTraceString = Log.getStackTraceString(throwable);
        callbackHolder.invoke(stackTraceString);

        originalHandler.uncaughtException(thread, throwable);

        if (forceToQuit) {
          System.exit(0);
        }
      }
    });
  }
}
