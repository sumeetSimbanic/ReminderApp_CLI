import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';


const DetailScreen = ({ route }) => {
  // Extract serializable data passed through navigation
  const {
    startDateTimeTimestamp,
    endDateTimeTimestamp,
    selectedStartTime,
    selectedEndTime,
    hour,
    minute,
    selectedDuration,
    selectedWeeks,
    selectedDates,
  } = route.params;

  // Reconstruct Date objects from timestamps
  const startDateTime = new Date(startDateTimeTimestamp);
  const endDateTime = new Date(endDateTimeTimestamp);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminder Details</Text>

      <View style={styles.detailContainer}>
        <Text>Start Date: {startDateTime.toDateString()}</Text>
        <Text>End Date: {endDateTime.toDateString()}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text>Start Time: {selectedStartTime.toLocaleTimeString()}</Text>
        <Text>End Time: {selectedEndTime.toLocaleTimeString()}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text>Hour: {hour}</Text>
        <Text>Minute: {minute}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text>Duration: {selectedDuration} weeks</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text>Weekdays: {selectedWeeks.join(', ')}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text>Chosen Dates: {Object.keys(selectedDates).join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailContainer: {
    marginBottom: 15,
  },
});

export default DetailScreen;
