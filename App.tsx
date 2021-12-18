/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const dimensions = useWindowDimensions();

  const [documentResponse, setSource] =
    React.useState<DocumentPickerResponse | null>(null);

  const handleDocumentPick = async () => {
    try {
      const [response] = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(response);
      setSource(response);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error occurred.');
      }
    }
  };

  const handleLoadComplete = (numberOfPages: number) => {
    console.log(`Number of pages: ${numberOfPages}`);
  };

  const expandStyle = {width: dimensions.width, height: dimensions.height};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {documentResponse ? (
        <Pdf
          source={documentResponse}
          onLoadComplete={handleLoadComplete}
          style={[expandStyle]}
        />
      ) : (
        <Pressable onPress={handleDocumentPick}>
          <Text>Pick PDF file</Text>
        </Pressable>
      )}
    </View>
  );
};

export default App;
