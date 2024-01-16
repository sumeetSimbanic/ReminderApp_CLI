// RepeatReminderDetail.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, Alert, StyleSheet,Button,Modal,ScrollView } from 'react-native';
import { format } from 'date-fns';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';
import DetailScreenStyle from './DetailScreenStyle';

const db = SQLite.openDatabase({ name: 'reminders.db', location: 'default' });

const DetailScreen = ({ route }) => {
  const { reminderId } = route.params;
  const [repeatReminder, setRepeatReminder] = useState({});
  const navigation = useNavigation();
  const [intervalsModalVisible, setIntervalsModalVisible] = useState(false);
  const [filteredIntervals, setfilteredIntervals] = useState([]);


  useEffect(() => {
    fetchRepeatReminderDetails();
  }, []);

  const fetchRepeatReminderDetails = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM repeatreminder WHERE id = ?',
        [reminderId],
        (tx, result) => {
          if (result.rows.length > 0) {
            const item = result.rows.item(0);
            setRepeatReminder({
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
        },
        (error) => {
          console.log('Error fetching repeat reminder details:', error);
        }
      );
    });
  };

  const deleteReminder = () => {
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
          onPress: confirmDelete,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const confirmDelete = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM repeatreminder WHERE id = ?',
        [reminderId],
        (tx, result) => {
          console.log('Repeat Reminder deleted successfully');
          navigation.goBack(); // Navigate back to the listing page after deletion
        },
        (error) => {
          console.log('Error deleting repeat reminder:', error);
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
  const navigateToListingScreen = () => {
    navigation.navigate('OnceListing');
  };
  return (
    // <Vi style={DetailScreenStyle.container}>
    //   <Text style={DetailScreenStyle.title}>Reminder Detail</Text>
    //   <View style={DetailScreenStyle.detailContainer}>
    //     <Text>ID: {repeatReminder.id}</Text>
    //     <Text>Date: {formatDate(repeatReminder.startDateTime)} to {formatDate(repeatReminder.endDateTime)}</Text>
    //     <Text>Time: {repeatReminder.selectedStartTime} to {repeatReminder.selectedEndTime}</Text>
    //     {/* Render other details as needed */}
    //   </View>
    
     
    
       <View style={DetailScreenStyle.container}>
     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
  <Text style={DetailScreenStyle.title}>Reminder Details</Text>
  <TouchableHighlight onPress={navigateToListingScreen}>
    <Text >Back</Text>
  </TouchableHighlight>
</View>


      <View style={DetailScreenStyle.detailContainer}>
        <Text>Date: {formatDate(repeatReminder.startDateTime)} to {formatDate(repeatReminder.endDateTime)}</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
        <Text> Time: {repeatReminder.selectedStartTime} to {repeatReminder.selectedEndTime}</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
        <Text>Every {repeatReminder.hour} hour and {repeatReminder.minute} minutes</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
        <Text>Repeat at an interval of {repeatReminder.selectedDuration} weeks</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
      {repeatReminder.selectedWeeks && repeatReminder.selectedWeeks.length > 0 ? (
    <Text>Weekdays: {repeatReminder.selectedWeeks.join(', ')}</Text>
  ) : (
    <Text>No weekdays selected</Text>
  )}     
   </View>

      <View style={DetailScreenStyle.detailContainer}>
      {repeatReminder.selectedDates && Object.keys(repeatReminder.selectedDates).length > 0 ? (
    <Text>Chosen Dates: {Object.keys(repeatReminder.selectedDates).join(', ')}</Text>
  ) : (
    <Text>No dates chosen</Text>
  )}   
     </View>
     <Button title="Show Intervals" onPress={() => setIntervalsModalVisible(true)} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={intervalsModalVisible}
        onRequestClose={() => {
          setIntervalsModalVisible(false);
        }}
      >
        <View style={DetailScreenStyle.modalContainer}>
          <View style={DetailScreenStyle.modalContent}>
            <Text style={DetailScreenStyle.title}>Intervals</Text>
            <ScrollView>
            {repeatReminder.filteredIntervals && repeatReminder.filteredIntervals.length > 0 ? (
    repeatReminder.filteredIntervals.map((interval, index) => (
      <Text key={index} style={DetailScreenStyle.modalText}>{`${interval.date} - ${interval.time}`}</Text>
    ))
  ) : (
    <Text>No intervals available</Text>
  )}
            </ScrollView>
            <Button title="Close" onPress={() => setIntervalsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View> 
    
  );
};

export default DetailScreen;
