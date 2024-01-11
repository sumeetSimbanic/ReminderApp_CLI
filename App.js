import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReminderScreen from './src/screens/Once/ReminderScreen';
import DailyReminder from './src/screens/Daily/DailyReminder';
import HourlyReminder from './src/screens/Hourly/HourlyReminder';
import WeeklyReminder from './src/screens/Weekly/WeeklyReminder';
import MonthlyReminder from './src/screens/Monthly/MonthlyReminder';
import YearlyReminder from './src/screens/Yearly/YearlyReminder';
import PushNotification from 'react-native-push-notification';
import DetailScreen from './src/screens/Detail/DetailScreen';
import OnceListing from './src/screens/Listing/OnceListing';

const Stack = createNativeStackNavigator();

const App = () => {
 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={ReminderScreen} />
        <Stack.Screen name="Hourly" component={HourlyReminder} />

        <Stack.Screen name="Daily" component={DailyReminder} />
        <Stack.Screen name="Weekly" component={WeeklyReminder} />
        <Stack.Screen name="Monthly" component={MonthlyReminder} />
        <Stack.Screen name="Yearly" component={YearlyReminder} />
        <Stack.Screen name="OnceListing" component={OnceListing} />

        <Stack.Screen name="Details" component={DetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;








