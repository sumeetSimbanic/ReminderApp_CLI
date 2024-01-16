import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Alert,
} from 'react-native';
import { format } from 'date-fns'; // Import date-fns library for date formatting

import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

import ListingStyle from './ListingStyle';

const db = SQLite.openDatabase({ name: 'reminders.db', location: 'default' });

const OnceListing = ({ route }) => {
  const [onceReminders, setOnceReminders] = useState([]);
  const [repeatReminders, setRepeatReminders] = useState([]);
  const [showEdit, setShowEdit] = useState(true);
  const [isOnceReminder, setIsOnceReminder] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUpdatedReminders();
  }, [isOnceReminder]);

  const deleteReminder = (id) => {
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
      { cancelable: false }
    );
  };

  const confirmDelete = (id) => {
    const table = isOnceReminder ? 'reminders' : 'repeatreminder';

    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${table} WHERE id = ?`,
        [id],
        (tx, result) => {
          console.log('Reminder deleted successfully');
          fetchUpdatedReminders();
        },
        (error) => {
          console.log('Error deleting reminder:', error);
        }
      );
    });
  };

  const fetchUpdatedReminders = () => {
    db.transaction((tx) => {
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
          setOnceReminders(data);
        },
        (error) => {
          console.log('Error fetching once reminders:', error);
        }
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
          setRepeatReminders(data);
          console.log('Repeat Reminders:', data); // Log the specific fields
        },
        (error) => {
          console.log('Error fetching repeat reminders:', error);
        }
      );
    });
  };
  
  const formatDate = (dateTimeString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
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
const navigateToDetailScreen = (id) =>{
  navigation.navigate('Details',{ reminderId: id })
}
  const renderOnceReminders = () => {
    return onceReminders.map((item) => (
      <View key={item.id} style={ListingStyle.singleReminder}>
        {/* Once Reminder UI */}
        <Text>Title: {item.title || `ID: ${item.id}`}</Text>
        <Text>Note: {item.note}</Text>
        <Text>Date: {item.date.toLocaleString()}</Text>
        <View style={ListingStyle.buttonContainer}>
          <TouchableHighlight onPress={() => editReminder(item.id)}>
            <Text style={ListingStyle.editButton}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => deleteReminder(item.id)}>
            <Text style={ListingStyle.deleteButton}>Delete</Text>
          </TouchableHighlight>
        </View>
        <View style={ListingStyle.divider} />
      </View>
    ));
  };

  const renderRepeatReminders = () => {
    return repeatReminders.map((item) => (
      <View key={item.id} style={ListingStyle.singleReminder} >
        <TouchableHighlight onPress={() => navigateToDetailScreen(item.id)}>
          <View>
        <Text>ID: {item.id}</Text>
        <Text>Date:{formatDate(item.startDateTime)} to {formatDate(item.endDateTime)}</Text>

        <Text>Time: {item.selectedStartTime} to {item.selectedEndTime} </Text>
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
        <View style={ListingStyle.divider} />
      </View>
    ));
  };
  

  const editReminder = (id) => {
    navigation.navigate('Home', { reminderId: id, onEditComplete: fetchUpdatedReminders });
  };
  const editRepeatReminder = (id) => {
    navigation.navigate('Monthly', { reminderId: id, onEditComplete: fetchUpdatedReminders });
  };

  return (
    <View style={ListingStyle.container}>
      <View style={ListingStyle.headerContainer}>
        <TouchableHighlight onPress={navigateToMainScreen}>
          <Text>Back</Text>
        </TouchableHighlight>
        <Text style={ListingStyle.title}>REMINDERS</Text>
        <TouchableHighlight onPress={() => setIsOnceReminder(!isOnceReminder)}>
          <Text>{isOnceReminder ? 'Show Repeat Reminders' : 'Show Once Reminders'}</Text>
        </TouchableHighlight>
      </View>
      <ScrollView>
        {isOnceReminder ? (
          <View style={ListingStyle.reminderContainer}>
            {renderOnceReminders()}
          </View>
        ) : (
          <View style={ListingStyle.reminderContainer}>
            {renderRepeatReminders()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OnceListing;
