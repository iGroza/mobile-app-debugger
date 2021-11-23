import { NativeModules } from 'react-native';

type MobileAppDebuggerType = {
  multiply(a: number, b: number): Promise<number>;
};

const { MobileAppDebugger } = NativeModules;

export default MobileAppDebugger as MobileAppDebuggerType;
