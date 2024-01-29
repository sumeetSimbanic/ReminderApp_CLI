import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {format} from 'date-fns'; // Import date-fns library for date formatting
import { BackHandler } from 'react-native';

import SQLite from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

import ListingStyle from './ListingStyle';

const db = SQLite.openDatabase({name: 'reminders.db', location: 'default'});

const OnceListing = ({route}) => {
  const [onceReminders, setOnceReminders] = useState([]);
  const [repeatReminders, setRepeatReminders] = useState([]);
  const [showEdit, setShowEdit] = useState(true);
  const [isOnceReminder, setIsOnceReminder] = useState(true);
  const navigation = useNavigation();
  const [showOnceReminders, setShowOnceReminders] = useState(true); // Updated state
  const [showRepeatReminders, setShowRepeatReminders] = useState(false); // Updated state

  useEffect(() => {
    fetchUpdatedReminders();
  }, [isOnceReminder]);
  const scheduleReminders = reminders => {
    reminders.forEach(reminder => {
      const {id, title, note, date} = reminder;

      // Use the 'date' property to set the reminder time
      const reminderTime = new Date(date).getTime(); // Convert date to timestamp

      PushNotification.localNotificationSchedule({
        channelId: 'default',
        title: title,
        message: note,
        date: new Date(reminderTime),
        userInfo: {id: id}, // You can attach any additional data to identify the reminder
      });

      console.log(
        `Notification scheduled successfully for reminder with ID ${id}`,
      );
    });
  };
  // Call the function with your once reminders data
  const deleteReminder = id => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this reminder?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => confirmDelete(id),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };
const confirmDelete = (id) => {
  // Delete from the 'reminders' table
  db.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM reminders WHERE id = ?',
        [id],
        (tx, result) => {
          console.log(`Reminder deleted successfully from 'reminders' table, ID: ${id}`);
          PushNotification.cancelLocalNotifications({ id: id.toString() });
          fetchUpdatedReminders(); // Update the state after deletion
        },
        (error) => {
          console.log('Error deleting reminder from "reminders" table:', error);
        }
      );
    }
  );

  // Delete from the 'repeatreminder' table
  db.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM repeatreminder WHERE id = ?',
        [id],
        (tx, result) => {
          console.log(`Reminder deleted successfully from 'repeatreminder' table, ID: ${id}`);
          PushNotification.cancelLocalNotifications({ id: id.toString() });
          fetchUpdatedReminders(); // Update the state after deletion
        },
        (error) => {
          console.log('Error deleting reminder from "repeatreminder" table:', error);
        }
      );
    }
  );
};


  const fetchUpdatedReminders = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM reminders',
        [],
        (tx, result) => {
          const data = [];
          for (let i = 0; i < result.rows.length; i++) {
            const item = result.rows.item(i);
            data.push({
              id: item.id,
              title: item.title,
              note: item.note,
              date: new Date(item.date),
            });
          }
          // Sort once reminders by ID in descending order
          data.sort((a, b) => b.id - a.id);
          setOnceReminders(data);
          console.log('once reminder -- ', data);
          scheduleReminders(onceReminders);
        },
        error => {
          console.log('Error fetching once reminders:', error);
        },
      );

      tx.executeSql(
        'SELECT * FROM repeatreminder',
        [],
        (tx, result) => {
          const data = [];
          for (let i = 0; i < result.rows.length; i++) {
            const item = result.rows.item(i);
            data.push({
              id: item.id,
              title: item.title,
              notes: item.notes,
              category: item.category,
              startDateTime: item.startDateTime,
              endDateTime: item.endDateTime,
              selectedStartTime: item.selectedStartTime,
              selectedEndTime: item.selectedEndTime,
              hour: item.hour,
              minute: item.minute,
              selectedDates: JSON.parse(item.selectedDates),
              selectedDuration: item.selectedDuration,
              selectedWeeks: JSON.parse(item.selectedWeeks),
              filteredIntervals: JSON.parse(item.filteredIntervals),
            });
          }
          // Sort repeat reminders by ID in descending order
          data.sort((a, b) => b.id - a.id);
          setRepeatReminders(data);
          // console.log('Repeat Reminders:', data); // Log the specific fields
        },
        error => {
          console.log('Error fetching repeat reminders:', error);
        },
      );
    });
  };

  
  const formatDate = dateTimeString => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const navigateToMainScreen = () => {
    setOnceReminders([]);
    setRepeatReminders([]);
    setShowEdit(false);
    navigation.navigate('Home');
  };

  const navigateToDetailScreen = id => {
    navigation.navigate('Details', {reminderId: id});
  };

  const renderOnceReminders = () => {
    return onceReminders.map(item => (
      <View key={item.id} style={ListingStyle.singleReminder}>
        {/* Once Reminder UI */}
        <Text>Title: {item.title || `ID: ${item.id}`}</Text>
        <Text>
            Notes: {item.note.length > 20 ? `${item.note.substring(0, 20)}...` : item.note}
          </Text>
                  <Text>Date: {item.date.toLocaleString()}</Text>
        <View style={ListingStyle.buttonContainer}>
          <TouchableHighlight onPress={() => editReminder(item.id)}>
            <Text style={ListingStyle.editButton}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => deleteReminder(item.id)}>
            <Text style={ListingStyle.deleteButton}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    ));
  };

  const renderRepeatReminders = () => {
    return repeatReminders.map(item => (
      <View key={item.id} style={ListingStyle.singleReminder}>
        <TouchableHighlight onPress={() => navigateToDetailScreen(item.id)}>
          <View>
            <Text>Title: {item.title}</Text>
            <Text>
            Notes: {item.notes.length > 20 ? `${item.notes.substring(0, 20)}...` : item.notes}
          </Text>
            <Text>Category: {item.category}</Text>
            <Text>
              Date:{formatDate(item.startDateTime)} to{' '}
              {formatDate(item.endDateTime)}
            </Text>
            <Text>
              Time: {item.selectedStartTime} to {item.selectedEndTime}{' '}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={ListingStyle.buttonContainer}>
          <TouchableHighlight onPress={() => editRepeatReminder(item.id)}>
            <Text style={ListingStyle.editButton}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => deleteReminder(item.id)}>
            <Text style={ListingStyle.deleteButton}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    ));
  };
  
  const toggleReminders = type => {
    if (type === 'once') {
      setShowOnceReminders(true);
      setShowRepeatReminders(false);
    } else if (type === 'repeat') {
      setShowOnceReminders(false);
      setShowRepeatReminders(true);
    }
  };
  useEffect(() => {
    // Check if the category is passed from the navigation
    const {category} = route.params;

    if (category === 'Repeat') {
      // If the category is 'Repeat', toggle to the 'Repeat Reminders' tab
      toggleReminders('repeat');
    }
  }, [route.params]);
  const editReminder = id => {
    navigation.navigate('Home', {
      reminderId: id,
      onEditComplete: fetchUpdatedReminders,
    });
  };

  const editRepeatReminder = (id) => {
    const repeatReminder = repeatReminders.find((item) => item.id === id);
  
    if (repeatReminder) {
      const categoryScreenMap = {
        Hourly: 'Hourly',
        Daily: 'Daily',
        Weekly: 'Weekly',
        Monthly: 'Monthly',
        Yearly: 'Yearly',
        // Add more categories as needed
      };
  
      const categoryScreen = categoryScreenMap[repeatReminder.category];
  
      if (categoryScreen) {
        // Pass both the reminder ID and the repeat reminder data to the screen
        navigation.navigate(categoryScreen, {
          reminderId: id,
          reminderData: repeatReminder,
        });
      } else {
        // Handle unknown category
        console.warn(`Unknown category: ${repeatReminder.category}`);
      }
    }
  };
  
  useEffect(() => {
    const handleBackButton = () => {
      // Handle the hardware back button press here
      navigateToMainScreen();
      return true; // Return true to prevent the default behavior (app exit)
    };

    // Add the event listener for hardware back button press
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      // Remove the event listener when the component is unmounted
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={ListingStyle.container}>
        <View style={ListingStyle.headerContainer}>
          <TouchableHighlight onPress={navigateToMainScreen}>
            <Text>Back</Text>
          </TouchableHighlight>
          <Text style={ListingStyle.title}>REMINDERS</Text>
          <TouchableHighlight onPress={navigateToMainScreen}>
            <Text>Add</Text>
          </TouchableHighlight>
        </View>
        <View style={ListingStyle.tabToggleContainer}>
          <TouchableHighlight onPress={() => toggleReminders('once')}>
            <Text
              style={
                showOnceReminders
                  ? ListingStyle.activeTab
                  : ListingStyle.inactiveTab
              }>
              Once Reminders
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => toggleReminders('repeat')}>
            <Text
              style={
                showRepeatReminders
                  ? ListingStyle.activeTab
                  : ListingStyle.inactiveTab
              }>
              Repeat Reminders
            </Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={ListingStyle.reminderContainer}>
          {showOnceReminders && renderOnceReminders()}
          {showRepeatReminders && renderRepeatReminders()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OnceListing;
