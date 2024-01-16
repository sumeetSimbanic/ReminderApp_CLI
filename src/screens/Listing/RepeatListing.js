// Import necessary components and libraries
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, ScrollView, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

import ListingStyle from './ListingStyle';

// Open the repeatreminders database
const db = SQLite.openDatabase({ name: 'reminders.db', location: 'default' });

// Define the RepeatListing component
const RepeatListing = () => {
    const [reminders, setReminders] = useState([]);
    const [showEdit, setShowEdit] = useState(true); // State to toggle edit functionality
    const [isOnceReminder, setIsOnceReminder] = useState(true); // State to toggle between Once and Repeat Reminders
  
    const navigation = useNavigation(); // Initialize navigation
  
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
          isOnceReminder ? 'DELETE FROM reminders WHERE id = ?' : 'DELETE FROM repeatreminder WHERE id = ?',
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
          isOnceReminder ? 'SELECT * FROM reminders' : 'SELECT * FROM repeatreminder',
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
      // Navigate to the ReminderScreen for editing the reminder with a specific ID
      navigation.navigate('Home', { reminderId: id });
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
          <View style={ListingStyle.reminderContainer}>
            {reminders.map((item) => (
              <View key={item.id} style={ListingStyle.singleReminder}>
                <View style={ListingStyle.reminderTextContainer}>
                  <Text style={ListingStyle.titleText}>ID: {item.id}</Text>
                  <View style={ListingStyle.buttonContainer}>
                    <TouchableHighlight onPress={() => editReminder(item.id)}>
                      <Text style={ListingStyle.editButton}>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => deleteReminder(item.id)}>
                      <Text style={ListingStyle.deleteButton}>Delete</Text>
                    </TouchableHighlight>
                  </View>
                </View>
                <Text>Date: {item.date.toLocaleString()}</Text>
                <View style={ListingStyle.divider} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
export default RepeatListing;
