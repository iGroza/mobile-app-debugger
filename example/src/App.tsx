import React from 'react';
import { AppDebugger } from 'mobile-app-debugger';
import { Playground } from './Playground';

// Configure debbuger
AppDebugger.configure({
  port: 9000,
  isOverwriteConsole: true,
});

export default function App() {
  return <Playground />;
}
