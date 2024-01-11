import React,{useEffect,useState} from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableHighlight, ScrollView, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

import ListingStyle from './ListingStyle';

const db = SQLite.openDatabase({ name: 'reminders.db', location: 'default' });

const OnceListing = ({ route }) => {
    const [reminders, setReminders] = useState([]);
    const [showEdit, setShowEdit] = useState(true); // State to toggle edit functionality

    const navigation = useNavigation(); // Initialize navigation

  // useEffect(() => {
  //   // setReminders(route.params.reminders);
  // }, [route.params.reminders]);
useEffect(()=>{
  fetchUpdatedReminders()
},[])
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
        onPress: () => confirmDelete(id), // Call confirmDelete if the user presses 'Delete'
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

const confirmDelete = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM reminders WHERE id = ?',
      [id],
      (tx, result) => {
        console.log('Reminder deleted successfully');
        // After deleting, fetch and update the reminders
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
            data.push({ id: item.id, title: item.title, note: item.note, date: new Date(item.date) });
          }
          // Update the reminders after deletion
          setReminders(data);
        },
        (error) => {
          console.log('Error fetching reminders:', error);
        }
      );
    });
  };
  const navigateToMainScreen = () => {
    setReminders([]); // Clear all reminders when navigating back
    setShowEdit(false); // Hide edit functionality
    navigation.navigate('Home');
  };
  const editReminder = (id) => {
    // Navigate to the ReminderScreen for editing the reminder with specific ID
    navigation.navigate('Home', { reminderId: id });
  };
  return (
    
    <View style={ListingStyle.container}>
      <View style={ListingStyle.headerContainer}>
        <TouchableHighlight onPress={navigateToMainScreen}>
          <Text>Back</Text>
        </TouchableHighlight>

        <Text style={ListingStyle.title}>ONCE REMINDER</Text>

        <TouchableHighlight onPress={navigateToMainScreen}>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
<ScrollView>
<View style={ListingStyle.reminderContainer}>
  {reminders.map((item) => (
    <View key={item.id} style={ListingStyle.singleReminder}>
      <View style={ListingStyle.reminderTextContainer}>
        <Text style={ListingStyle.titleText}>Title: {item.title}</Text>
        <View style={ListingStyle.buttonContainer}>
          <TouchableHighlight onPress={() => editReminder(item.id)}>
            <Text style={ListingStyle.editButton}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => deleteReminder(item.id)}>
            <Text style={ListingStyle.deleteButton}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
      <Text>Note: {item.note}</Text>
      <Text>Date: {item.date.toLocaleString()}</Text>
      <View style={ListingStyle.divider} />
    </View>
  ))}
</View>
</ScrollView>
    </View>
  );
};


export default OnceListing;
