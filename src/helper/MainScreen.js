import { View, Text, StyleSheet,TouchableOpacity, Button } from 'react-native';
import React from 'react'


const MainScreen = ({ navigation }) => {
  const navigateToMainScreen = () => {
    navigation.navigate('Reminder');
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToMainScreen}>
      <View style={styles.centered}>
        <Button title='ADD'/>
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
  },
});
export default MainScreen;