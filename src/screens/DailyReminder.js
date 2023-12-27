import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions ,Button,Modal,ScrollView,TextInput} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import ModalDropdown from 'react-native-modal-dropdown';


export default function DailyReminder() {

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDailyDuration, setSelectedDailyDuration] = useState(null);
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


 const dailyDuration = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },


 ];
 
  const handleDateConfirm = (date, isStartDate) => {
    const currentDate = new Date(); // Get the current date and time
  
    // Check if the selected date is in the past
    if (date < currentDate) {
      date = currentDate; // Set the selected date to the current date
    }
  
    if (isStartDate) {
      setSelectedStartDate(date);
      setChosenStartDate(date.toDateString()); // Convert to a string representation
    } else {
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
  
  const handleEndTimeConfirm = (time) => {
    setSelectedEndTime(time);
    setChosenEndTime(time.toLocaleTimeString()); // Convert to a string representation
    hideEndTimePicker();
    setIsEndTimeSelected(true); // Set the flag when the end time is selected

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
  const selectDailyDuration = (index, value) => {
    setSelectedDailyDuration(value);
  };

  const setReminder = () => {
    if (
      selectedStartDate &&
      selectedStartTime &&
      hour &&
      minute &&
      selectedDailyDuration
    ) {
      let endDate = selectedStartDate; // Default end date to start date
      let endTime = selectedStartTime; // Default end time to start time
  
      if (selectedEndDate && selectedEndTime) {
        endDate = selectedEndDate;
        endTime = selectedEndTime;
      }
  
      if (endDate < selectedStartDate) {
        console.warn('End date should be equal to or greater than the start date');
        return;
      }
  
  
      const startDateTime = new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        selectedStartDate.getDate(),
        selectedStartTime.getHours(),
        selectedStartTime.getMinutes()
      );
  
      const endDateTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );
  
      const intervalInMillis = (parseInt(hour) * 60 + parseInt(minute)) * 60 * 1000;
      const dailyDurationInDays = parseInt(selectedDailyDuration);
  
      let currentDateTime = new Date(startDateTime);
  
      const calculatedIntervals = [];
  
      while (currentDateTime <= endDateTime) {
        const currentDate = new Date(currentDateTime);
        currentDate.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
  
        const loopEndTime = new Date(currentDateTime);
        loopEndTime.setHours(endTime.getHours(), endTime.getMinutes());
  
        while (currentDate <= loopEndTime) {
          calculatedIntervals.push({
            date: currentDate.toDateString(),
            time: currentDate.toLocaleTimeString(),
          });
          currentDate.setTime(currentDate.getTime() + intervalInMillis);
        }
  
        currentDateTime.setDate(currentDateTime.getDate() + dailyDurationInDays);
        currentDateTime.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
      }
  
      setIntervals(calculatedIntervals);
      toggleModal();
  
    } else {
      console.warn('Incomplete data for calculation');
    }
  };
  const renderHourMinuteInputs = () => {
    if (isEndTimeSelected) {
      return (
        <View>
          <View style={styles.rowContainer}>
            <Text style={{ color: 'black', marginTop: "5%" }}>EVERY</Text>
            <Text style={{ color: 'black', marginTop: "5%" }}>HOUR</Text>
            <Text style={{ color: 'black', marginTop: "5%" }}>MINUTE</Text>
          </View>
          <View style={{ ...styles.rowContainer }}>
            <TextInput
              style={{ ...styles.input, marginLeft: "32%" }}
              placeholder="0-23"
              onChangeText={handleHourChange}
              value={hour}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
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
    <View style={styles.container}>
        

      <Text style={styles.title}>DAILY</Text>
      <Text style={styles.text}>Repeat every at interval of every {selectedDailyDuration || "_"} day</Text>

      <Text style={styles.text}>Between: {chosenStartDate || "_" } to {chosenEndDate || "_"}</Text>
      <Text style={styles.text}>Between {chosenStartTime || "_" } to {chosenEndTime || "_" } every {hour || "_"} hour {minute || "_"} mins</Text>
      <View style={styles.rowContainer}>
 <Text style={{ color: 'black', paddingTop: '5%' }}>DAILY EVERY:</Text>
      <ModalDropdown
          options={dailyDuration.map((item) => item.label)}
          style={styles.customButtonDrop}
          defaultValue={selectedDailyDuration !== null ? String(selectedDailyDuration) : "Select Duration"} 
          onSelect={selectDailyDuration}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownContainer}
          defaultIndex={1}
        />

</View>
     
      <View style={styles.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={styles.pickerContainer}>
          <View>
            <TouchableHighlight style={styles.customButton} onPress={showStartDatePicker}>
      <Text style={styles.customButtonText}>Start Date </Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={styles.customButton} onPress={showEndDatePicker}>
      <Text style={styles.customButtonText}>End Date </Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
      <View style={styles.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={styles.pickerContainer}>
          <View>
            <TouchableHighlight style={styles.customButton} onPress={showStartTimePicker}>
      <Text style={styles.customButtonText}>Start Time</Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={styles.customButton} onPress={showEndTimePicker}>
      <Text style={styles.customButtonText}>End Time</Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
    
{/*   

<View style={styles.rowContainer}>
<Text style={{ color: 'black',marginTop:"5%" }}>EVERY</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>HOUR</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>MINUTE</Text>


</View>
<View style={{...styles.rowContainer}}>
      <TextInput
        style={{...styles.input,marginLeft:"32%"}}
        placeholder="1-23"
        onChangeText={handleHourChange}
        value={hour}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="1-59"
        onChangeText={handleMinuteChange}
        value={minute}
        keyboardType="numeric"
      />
   

    </View> */}
          {renderHourMinuteInputs()}

<TouchableOpacity style={styles.customButtonDone} onPress={setReminder}>
  <Text style={{...styles.customButtonText,fontWeight:"bold"}}>Done</Text>
</TouchableOpacity>

<Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Intervals:</Text>
            {intervals.map((interval, index) => (
              <Text key={index} style={styles.modalText}>{`${interval.date} - ${interval.time}`}</Text>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
            <Text style={styles.modalButtonText}>Close</Text>
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

const styles = StyleSheet.create({
  container: {
    padding: 14,
    margin: 8,
  },
 
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  text: {
    marginBottom: 8,
    color: 'black',
  },

  dropdownContainer: {
    height: 40,
color:"red",
    marginBottom: 8,
    width: "30%",
    marginLeft: "45%",
    marginTop: "3%",

  },
 
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: "20%",
    marginTop: "7%",
    
  },
  monthChooser: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    

  },
 
 
  monthText: {
    textAlign: 'center',
    color: 'black',
  },
  weekOption: {
    width: '12%',
  marginTop:"10%",
  
   padding:"1%",
    borderWidth: 1,
    borderColor: 'black',
    
  },
  dropdownContainer: {
    width: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    padding: "auto",
  },
  customButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    margin:"3%",

    
  },
  customButtonDrop: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width:125,
    height:40,
    marginTop:"5%",
    padding:"2%"
  },
  customButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  
  optionContainer: {
    flexDirection: 'row',
    marginTop: 36,
    
    
  },
  option: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin:3,
    marginLeft:5,
    marginRight:15
  },
 


  customButtonDone: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginTop:"90%",
    
    
    backgroundColor:"gray",
    
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 80,
    height:40, 
    textAlign: 'center',
  },
  selectedMonthOption: {
    backgroundColor: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});





