import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions ,Button,Modal,ScrollView,TextInput,Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import HourlyReminderStyle from './HourlyReminderStyle';


export default function HourlyReminder({ navigation }) {

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isEndTimeSelected, setIsEndTimeSelected] = useState(false);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [chosenStartDate, setChosenStartDate] = useState(null);
  const [chosenEndDate, setChosenEndDate] = useState(null);
  const [chosenStartTime, setChosenStartTime] = useState(null);
  const [chosenEndTime, setChosenEndTime] = useState(null);
  const [hourError, setHourError] = useState('');
  const [minuteError, setMinuteError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [intervals, setIntervals] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToMainScreen = () => {
    navigation.navigate("Home");
  };
 
const reopenEndDatePicker = () => {
  setEndDatePickerVisible(true);
};

const handleDateConfirm = (date, isStartDate) => {
  const currentDate = new Date(); // Get the current date and time

  if (date < currentDate) {
    date = currentDate; // Set the selected date to the current date
  }

  if (isStartDate) {
    setSelectedStartDate(date);
    setChosenStartDate(date.toDateString()); // Convert to a string representation
  } else {
    if (date < selectedStartDate) {
      Alert.alert(
        'Error',
        'End date should be greater than or equal to the start date',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reopen the end date picker to set the correct end date
              reopenEndDatePicker(); // Reopen end date picker
            },
          },
        ]
      );
      hideEndDatePicker(); // Hide the incorrect end date picker
      return; // Don't update the end date if it's before the start date
    }

    setSelectedEndDate(date);
    setChosenEndDate(date.toDateString()); // Convert to a string representation
  }
  hideStartDatePicker();
  hideEndDatePicker();
};


  
  const handleStartTimeConfirm = (time) => {
    setSelectedStartTime(time);
    setChosenStartTime(time.toLocaleTimeString()); // Convert to a string representation
    hideStartTimePicker();
  };
  
 
    const handleHourChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 23) {
      setHour(numericValue.toString());
      setHourError('');
    } else {
      setHour('');  // Reset to an empty string or any default value you prefer
      setHourError('Hour must be between 1 and 23');
    }
  };
  
  const handleMinuteChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 59) {
      setMinute(numericValue.toString());
      setMinuteError('');
    } else {
      setMinute('');  // Reset to an empty string or any default value you prefer
      setMinuteError('Minute must be between 1 and 59');
    }
  };
  
  const handleEndTimeConfirm = (time) => {
    setSelectedEndTime(time);
    setChosenEndTime(time.toLocaleTimeString());
    hideEndTimePicker();
    setIsEndTimeSelected(true); // Set the flag when the end time is selected
  };

 
 
 
  


  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  
  // Function to hide the start time picker
  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  // Function to handle the selected start time
 
  // Function to show the end time picker


  // Function to hide the end time picker
  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const setReminder = () => {
    if (
      selectedStartDate &&
      selectedStartTime &&
      hour &&
      minute
    ) {
      const startDateTime = new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        selectedStartDate.getDate(),
        selectedStartTime.getHours(),
        selectedStartTime.getMinutes()
      );
  
      // Set end date and time to be the same as start date and time if not provided
      const endDateTime = selectedEndDate
        ? new Date(
            selectedEndDate.getFullYear(),
            selectedEndDate.getMonth(),
            selectedEndDate.getDate(),
            selectedEndTime.getHours(),
            selectedEndTime.getMinutes()
          )
        : new Date(startDateTime);
  
      // Check if the end date is later than the start date
      if (endDateTime < startDateTime) {
        console.warn('End date & time must be later than start date & time ');
        return; // Exit the function if the validation fails
      }
  
      const intervalInMillis = (parseInt(hour) * 60 + parseInt(minute)) * 60 * 1000;
  
      let currentDateTime = new Date(startDateTime);
  
      const calculatedIntervals = [];
  
      while (currentDateTime <= endDateTime) {
        const currentDate = new Date(currentDateTime);
        currentDate.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
  
        const endDate = new Date(currentDateTime);
        endDate.setHours(selectedEndTime.getHours(), selectedEndTime.getMinutes());
  
        while (currentDate <= endDate) {
          calculatedIntervals.push({
            date: currentDate.toDateString(),
            time: currentDate.toLocaleTimeString(),
          });
          currentDate.setTime(currentDate.getTime() + intervalInMillis);
        }
  
        currentDateTime.setDate(currentDateTime.getDate() + 1);
        currentDateTime.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
      }
  
      setIntervals(calculatedIntervals);
      toggleModal();
    } else {
      Alert.alert(
        'Error',
        'Incomplete data to set Reminder',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reopen the end date picker to set the correct end date
              // reopenEndDatePicker(); // Reopen end date picker
            },
          },
        ]
      );    }
  };
  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };
  
  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };
  
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };
  
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };
  
  const renderHourMinuteInputs = () => {
    if (isEndTimeSelected) {
      return (
        <View>
          <View style={HourlyReminderStyle.rowContainer}>
            <Text style={{ color: 'black', marginTop: "5%" }}>EVERY</Text>
            <Text style={{ color: 'black', marginTop: "5%" }}>HOUR</Text>
            <Text style={{ color: 'black', marginTop: "5%" }}>MINUTE</Text>
          </View>
          <View style={{ ...HourlyReminderStyle.rowContainer }}>
            <TextInput
              style={{ ...HourlyReminderStyle.input, marginLeft: "32%" }}
              placeholder="0-23"
              onChangeText={handleHourChange}
              value={hour}
              keyboardType="numeric"
            />
            <TextInput
              style={HourlyReminderStyle.input}
              placeholder="0-59"
              onChangeText={handleMinuteChange}
              value={minute}
              keyboardType="numeric"
            />
          </View>
        </View>
      );
    }
    return null; // Render nothing if end time is not selected
  };
  
  
  return (
    <View style={HourlyReminderStyle.container}>
        
        <View style={HourlyReminderStyle.headerContainer}>
  <TouchableHighlight onPress={navigateToMainScreen}>
      {/* <Icon name="arrow-back" size={30} color="black" /> */}
      <Text>Back</Text>
  </TouchableHighlight>

  <Text style={HourlyReminderStyle.title}>HOURLY</Text>
  <TouchableHighlight onPress={navigateToMainScreen}>
      <Text>Cancel</Text>
      </TouchableHighlight>

</View>
      <Text style={HourlyReminderStyle.text}>Between: {chosenStartDate || "_" } to {chosenEndDate || "_"}</Text>
      <Text style={HourlyReminderStyle.text}>Between {chosenStartTime || "_" } to {chosenEndTime || "_" } every {hour || "_"} hour {minute || "_"} mins</Text>
     



     
      <View style={HourlyReminderStyle.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={HourlyReminderStyle.pickerContainer}>
          <View>
            <TouchableHighlight style={HourlyReminderStyle.customButton} onPress={showStartDatePicker}>
      <Text style={HourlyReminderStyle.customButtonText}>Start Date </Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={HourlyReminderStyle.customButton} onPress={showEndDatePicker}>
      <Text style={HourlyReminderStyle.customButtonText}>End Date </Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
      <View style={HourlyReminderStyle.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={HourlyReminderStyle.pickerContainer}>
          <View>
            <TouchableHighlight style={HourlyReminderStyle.customButton} onPress={showStartTimePicker}>
      <Text style={HourlyReminderStyle.customButtonText}>Start Time</Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={HourlyReminderStyle.customButton} onPress={showEndTimePicker}>
      <Text style={HourlyReminderStyle.customButtonText}>End Time</Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
    
      {renderHourMinuteInputs()}


<TouchableOpacity style={HourlyReminderStyle.customButtonDone} onPress={setReminder}>
  <Text style={{...HourlyReminderStyle.customButtonText,fontWeight:"bold"}}>Done</Text>
</TouchableOpacity>

<Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={HourlyReminderStyle.modalContainer}>
          <ScrollView>

          <Text style={HourlyReminderStyle.modalTitle}>Intervals:</Text>
            {intervals.map((interval, index) => (
              <Text key={index} style={HourlyReminderStyle.modalText}>{`${interval.date} - ${interval.time}`}</Text>
              ))}
          </ScrollView>

          <TouchableOpacity style={HourlyReminderStyle.closeButton} onPress={toggleModal}>
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>
      <DateTimePickerModal
  isVisible={isStartDatePickerVisible}
  mode="date"
  onConfirm={(date) => handleDateConfirm(date, true)}
  onCancel={hideStartDatePicker}
  date={selectedStartDate || new Date()} // Use selectedStartDate as the default value
/>
      <DateTimePickerModal
  isVisible={isEndDatePickerVisible}
  mode="date"
  onConfirm={(date) => handleDateConfirm(date, false)}
  onCancel={hideEndDatePicker}
  date={selectedEndDate || new Date()} // Use selectedEndDate as the default value
/>

<DateTimePickerModal
  isVisible={isStartTimePickerVisible}
  mode="time"
  onConfirm={handleStartTimeConfirm}
  onCancel={hideStartTimePicker}
  date={selectedStartTime || new Date()} // Use selectedStartTime as the default value
/>

<DateTimePickerModal
  isVisible={isEndTimePickerVisible}
  mode="time"
  onConfirm={handleEndTimeConfirm}
  onCancel={hideEndTimePicker}
  date={selectedEndTime || new Date()} // Use selectedEndTime as the default value
/>

    </View>
  );
}
