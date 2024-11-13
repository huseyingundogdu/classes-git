import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // State to manage background color, starting with white
  const [bgColor, setBgColor] = useState('#FFFFFF');

  // Func to generate new random color
  const generateRandomBgColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomColor);
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text style={{marginVertical: 15}}>Hello World!</Text>

      <Button
        onPress={generateRandomBgColor}
        title="Click me!"
      />
      
      <Pressable 
        style={styles.customButton} 
        onPress={generateRandomBgColor}>

        <Text>Custom Click me!</Text>

      </Pressable>

      <StatusBar style="auto" hidden={true}/>
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
  customButton: {
    marginVertical: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3
  },

});
