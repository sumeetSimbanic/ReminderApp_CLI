import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReminderScreen from './src/screens/ReminderScreen';
import DailyReminder from './src/screens/DailyReminder';
import HourlyReminder from './src/screens/HourlyReminder';
import WeeklyReminder from './src/screens/WeeklyReminder';
import MonthlyReminder from './src/screens/MonthlyReminder';
import YearlyReminder from './src/screens/YearlyReminder';
import PushNotification from 'react-native-push-notification';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
