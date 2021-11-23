import { AppDebugger } from 'mobile-app-debugger';
import React from 'react';
import { Button as RNButton, StyleSheet, Text, View } from 'react-native';
import { ApiService } from './ApiService';

export class Playground extends React.Component {
  state = {
    isRenderProblemComponent: false,
  };

  _testPostRequest() {
    ApiService.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
  }

  async _testGetRequest() {
    const data = await ApiService.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    // you will see this log in debbuger app!
    console.log(data);
  }

  render() {
    const { isRenderProblemComponent } = this.state;
    return (
      <View style={styles.container}>
        {isRenderProblemComponent && <ProblemComponent />}
        <Text>This an example for 'mobile-app-debugger'!</Text>
        <Button
          onPress={() => {
            this.setState({ isRenderProblemComponent: true });
          }}
        >
          Test error
        </Button>
        <Button onPress={() => AppDebugger.crash()}>Test native error</Button>
        <Button onPress={this._testPostRequest}>
          Test network POST request
        </Button>
        <Button onPress={this._testGetRequest}>Test network GET request</Button>
        <Button
          onPress={() => {
            AppDebugger.log('test log');
          }}
        >
          Test log
        </Button>
        <Button
          onPress={() => {
            AppDebugger.logWarn('test warn');
          }}
        >
          Test logWarn
        </Button>
        <Button
          onPress={() => {
            AppDebugger.logError('test error');
          }}
        >
          Test logError
        </Button>
        <Button
          onPress={() => {
            console.log('test console.log', { magic: 42 });
          }}
        >
          Test console.log
        </Button>
        <Button
          onPress={() => {
            console.error('test console.error', { magic: 42 });
          }}
        >
          Test console.error
        </Button>
      </View>
    );
  }
}

function ProblemComponent() {
  return <Text>{noSuchObject.someVariable}</Text>;
}

function Button({
  onPress,
  children,
}: {
  onPress: () => void;
  children: string;
}) {
  return (
    <View style={{ marginTop: 10 }}>
      <RNButton title={children} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
