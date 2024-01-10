import React, { startTransition, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions ,Button,Modal,ScrollView,TextInput,Alert} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar} from 'react-native-calendars';




export default function MonthlyReminder({navigation}) {
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedWeekDuration,setSelectedWeekDuration] = useState('1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenWeekly,setIsDropdownOpenWeekly] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
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

 
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [intervals, setIntervals] = useState([]);

  const toggleModal = () => {
    setNewModalVisible(!isNewModalVisible);
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  const weeks = [
   'S','M','T','W','TH','F','ST'
  ]

  const duration = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];
  const weekDuration = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: 'LAST', value: 'LAST' },
    { label: 'ALL', value: 'ALL' },


   
  ];
  const handleDateConfirm = (date, isStartDate) => {
    const currentDate = new Date(); 
  
    if (date < currentDate) {
      date = currentDate; 
    }
  
    if (isStartDate) {
      setSelectedStartDate(date);
      setChosenStartDate(date.toDateString()); 
    } else {
      setSelectedEndDate(date);
      setChosenEndDate(date.toDateString()); 
    }
  
    hideStartDatePicker();
    hideEndDatePicker();
  };
  
  const navigateToMainScreen = () => {
    navigation.navigate("Home");
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
  };
  
  const toggleWeekSelection = (week) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((selectedWeek) => selectedWeek !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };
  const handleDurationSelect = (index, value) => {
    setSelectedDuration(value);
  };
  const selectMonth = (month) => {
    setSelectedMonth(month);
  };

  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdownWeek = () => {
    setIsDropdownOpenWeekly(!isDropdownOpenWeekly);
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
  
  // Inside your JSX, use the selected times as defaults for the pickers
 
  
 

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

  // Function to handle the selected end time
 

  const handleWeekSelection = (week) => {
    setSelectedWeek(week);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const handleDayPress = (day) => {
    const updatedDates = { ...selectedDates };
    if (updatedDates[day.dateString]) {
      delete updatedDates[day.dateString];
    } else {
      updatedDates[day.dateString] = { selected: true };
    }
    setSelectedDates(updatedDates);
  };
  const handleHourChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 23) {
      setHour(numericValue.toString());
      setHourError('');
    } else {
      setHour('');  
      setHourError('Hour must be between 1 and 23');
    }
  };
  
  const handleMinuteChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 59) {
      setMinute(numericValue.toString());
      setMinuteError('');
    } else {
      setMinute('');  
      setMinuteError('Minute must be between 1 and 59');
    }
  };
 
  const handleDatePress = (date) => {
    const updatedDates = { ...selectedDates };
    if (updatedDates[date]) {
      delete updatedDates[date];
    } else {
      updatedDates[date] = { selected: true };
    }
    setSelectedDates(updatedDates);
  };
 

  const filterIntervalsByDuration = (intervals, selectedDuration) => {
    const filteredIntervals = [];
  
    // Logic to filter intervals based on selected duration
    switch (selectedDuration) {
      case '1':
        // No filtering, intervals remain unchanged
        return intervals;
      case '2':
        // Filter intervals for every 2 months
        return filterIntervalsByGap(intervals, 2);
      case '3':
        // Filter intervals for every 3 months
        return filterIntervalsByGap(intervals, 3);
      // Add more cases for other durations as needed
      default:
        return intervals;
    }
  };
  
  const filterIntervalsByGap = (intervals, gapInWeeks) => {
    const filteredIntervals = [];
    const seenDates = new Set();
  
    // Logic to filter intervals based on the specified gap in weeks
    for (let i = 0; i < intervals.length; i++) {
      const currentDate = intervals[i].date;
  
      // Check if the current date has not been seen within the specified gap
      if (!seenDates.has(currentDate)) {
        filteredIntervals.push(intervals[i]);
  
        // Mark dates within the gap as seen to avoid duplication
        for (let j = 1; j < gapInWeeks; j++) {
          const nextDate = new Date(currentDate);
          nextDate.setDate(nextDate.getDate() + j * 7);
  
          seenDates.add(nextDate.toDateString());
        }
      }
    }
  
    return filteredIntervals;
  };


  
  const setReminderTwo = () => {
    if (
      selectedStartDate &&
      selectedEndDate &&
      selectedStartTime &&
      selectedEndTime &&
      hour &&
      minute &&
      selectedDates &&
      Object.keys(selectedDates).length > 0
    ) {
      const startDateTime = new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        selectedStartDate.getDate(),
        selectedStartTime.getHours(),
        selectedStartTime.getMinutes()
      );
  
      const endDateTime = new Date(
        selectedEndDate.getFullYear(),
        selectedEndDate.getMonth(),
        selectedEndDate.getDate(),
        selectedEndTime.getHours(),
        selectedEndTime.getMinutes()
      );
  
      const intervalInMillis = (parseInt(hour) * 60 + parseInt(minute)) * 60 * 1000;
  
      let currentDateTime = new Date(startDateTime);
  
      const intervals = [];
  
      while (currentDateTime <= endDateTime) {
        const currentDate = new Date(currentDateTime);
        currentDate.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
  
        const endDate = new Date(currentDate);
        endDate.setHours(selectedEndTime.getHours(), selectedEndTime.getMinutes());
  
        while (currentDate <= endDate) {
          intervals.push({
            date: currentDate.toDateString(),
            time: currentDate.toLocaleTimeString(),
          });
          currentDate.setTime(currentDate.getTime() + intervalInMillis);
        }
  
        currentDateTime.setDate(currentDateTime.getDate() + 1); // Move to the next day
        currentDateTime.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
      }
      const temp = Object.keys(selectedDates).map(x => parseInt(x));
      // console.log("Selecteddates",temp)
      const filteredData = intervals.filter(item => {
        const date = new Date(item.date);

          return temp.includes(date.getDate());
      });
      // console.log('Intervals:', intervals);
      // console.log('Filtered Intervals:', filteredIntervals);
      const filteredIntervals = filterIntervalsByDuration(filteredData, selectedDuration);

      setIntervals(filteredIntervals);
      console.log("fliterdata",filteredData)
      toggleModal();

      const startTimestamp = startDateTime.getTime();
const endTimestamp = endDateTime.getTime();

      navigation.navigate('Details', {
        startDateTime: startTimestamp,
        endDateTime: endTimestamp,
        selectedStartTime: selectedStartTime,
        selectedEndTime: selectedEndTime,
        hour: hour,
        minute: minute,
        selectedDuration: selectedDuration,
        selectedWeeks: selectedWeeks,
        intervals:intervals,
    });
    console.log("---",startDateTime)
      
    } else {
      console.warn('Incomplete data for calculation');
    }
  };
  const setReminder = () => {
    if (
      selectedStartDate &&
      selectedEndDate &&
      selectedStartTime &&
      selectedEndTime &&
      hour &&
      minute &&
      selectedWeekDuration &&
      selectedWeeks.length > 0
    ) {
      const startDateTime = new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        selectedStartDate.getDate(),
        selectedStartTime.getHours(),
        selectedStartTime.getMinutes()
      );
  
      const endDateTime = new Date(
        selectedEndDate.getFullYear(),
        selectedEndDate.getMonth(),
        selectedEndDate.getDate(),
        selectedEndTime.getHours(),
        selectedEndTime.getMinutes()
      );
  
      const intervalInMillis = (parseInt(hour) * 60 + parseInt(minute)) * 60 * 1000;
      const weeklyDurationInWeeks = parseInt(selectedWeekDuration);
  
      let currentDateTime = new Date(startDateTime);
  
      const intervals = [];
  
      while (currentDateTime <= endDateTime) {
        const currentDayOfWeek = currentDateTime.getDay();
        const currentDayName = weeks[currentDayOfWeek];
  
        if (selectedWeeks.includes(currentDayName)) {
          const currentDate = new Date(currentDateTime);
          currentDate.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
  
          const endDate = new Date(currentDate);
          endDate.setHours(selectedEndTime.getHours(), selectedEndTime.getMinutes());
  
          while (currentDate <= endDate) {
            intervals.push({
              date: currentDate.toDateString(),
              time: currentDate.toLocaleTimeString(),
            });
            currentDate.setTime(currentDate.getTime() + intervalInMillis);
          }
        }
  
        currentDateTime.setDate(currentDateTime.getDate() + 1); // Move to the next day
        currentDateTime.setHours(selectedStartTime.getHours(), selectedStartTime.getMinutes());
      }

      // console.log('Intervals:', intervals);
      const filteredIntervals = filterIntervalsByDuration(intervals, selectedDuration);

      console.log('Filtered Intervals:', filteredIntervals);
      setIntervals(filteredIntervals);
      toggleModal();

      navigation.navigate('Details', {
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        selectedStartTime: selectedStartTime,
        selectedEndTime: selectedEndTime,
        hour: hour,
        minute: minute,
        selectedDuration: selectedDuration,
        selectedWeeks: selectedWeeks,
        selectedDates: selectedDates,
        intervals:intervals,
      });
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
  
  
  return (
    <View style={styles.container}>

        <View style={styles.headerContainer}>
  <TouchableHighlight onPress={navigateToMainScreen}>
      {/* <Icon name="arrow-back" size={30} color="black" /> */}
      <Text>Back</Text>
  </TouchableHighlight>

  <Text style={styles.title}>MONTHLY</Text>
  <TouchableHighlight onPress={navigateToMainScreen}>
      <Text>Cancel</Text>
      </TouchableHighlight>

</View>      
    <Text style={styles.text}>Repeat at an interval of {selectedDuration || "_"} weeks</Text>
      <Text style={styles.text}>Between: {chosenStartDate || "_" } to {chosenEndDate || "_"}</Text>
      <Text style={styles.text}>Between {chosenStartTime || "_" } to {chosenEndTime || "_" } every {hour || "_"} hour {minute || "_"} mins</Text>
     
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
      <View >
      
      <View style={styles.optionContainer}>
      <Text style={styles.optionText}>Week</Text>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'week' ? styles.selectedOption : null
          ]}
          onPress={() => handleOptionPress('week')}
        >
        </TouchableOpacity>
        <Text style={styles.optionText}>Day</Text>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'day' ? styles.selectedOption : null
          ]}
          onPress={() => handleOptionPress('day')}
        >
        </TouchableOpacity>
      </View>

      </View>
      <View style={styles.rowContainer}>
  {selectedOption === 'week' ? (
    <View>
       <View style={styles.rowContainer}>
      <Text style={{ color: 'black', paddingTop: '6%' }}>WEEKS:</Text>
      

    <ModalDropdown
  options={duration.map((item) => item.label)}
  style={styles.customButtonDrop}
  defaultValue={selectedDuration || 'Select Duration'}
  onSelect={(index, value) => handleDurationSelect(index, duration[index].value)}
  textStyle={styles.dropdownText}
  dropdownStyle={styles.dropdownContainer}
  defaultIndex={0}
/>
    </View>
     
        {/* <View style={styles.rowContainer}>
      <Text style={{ color: 'black', paddingTop: '5%' }}>WEEKS:</Text>

      <ModalDropdown
  options={weekDuration.map((item) => item.label)}
  style={styles.customButtonDrop}
  defaultValue={selectedMonth !== null ? String(selectedMonth) : "Select Duration"} 
  onSelect={(index, value) => selectMonth(index, duration[index].value)}
  textStyle={styles.dropdownText}
  dropdownStyle={styles.dropdownContainer}
  defaultIndex={1}  
/>


      </View> */}
      <View style={{...styles.rowContainer}}>
      <Text style={{ color: 'black', paddingTop: '9%' }}>DAYS:</Text>
        <View style={{...styles.monthChooser,marginLeft:"10%"}}>
      {weeks.map((week, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.weekOption,
            selectedWeeks.includes(week) ? styles.selectedMonthOption : null
          ]}
          onPress={() => toggleWeekSelection(week)}
        >
          <Text style={styles.monthText}>{week}</Text>
        </TouchableOpacity>
      ))}
    </View>
        </View>
     
      </View>
      
    
  ) : selectedOption === 'day' ? (
    <View>
    <View style={styles.rowContainer}>
    <Text style={styles.header}>Selected Dates:</Text>
   
    <TouchableHighlight style={{...styles.customButton,marginLeft:"32%"}} onPress={openModal}>
      <Text style={{...styles.customButtonText}}>CHOOSE DATES</Text>
    </TouchableHighlight>

    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.modalContainer}>
      <View style={{ padding: 20 }}>
        <Text >CHOOSE DATES
      {Object.keys(selectedDates).join(', ')}
    </Text>
          {/* Display a list of dates from 1 to 31 */}
          {/* <Text style={{ marginBottom: 10 }}>Select dates:</Text> */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  {Array.from({ length: 31 }, (_, index) => index + 1).map((date) => (
    <Button
      key={date}
      title={date.toString()}
      onPress={() => handleDatePress(date)}
      style={{
        margin: 5,
        backgroundColor: selectedDates[date] ? 'blue' : 'white',
        color: selectedDates[date] ? 'white' : 'black',
      }}
    />
  ))}
</View>
</View>
        <Button
       
          title="Done"
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </View>
    
    </Modal>
    </View>
  <Text style={styles.selectedDatesText}>
      {Object.keys(selectedDates).join(', ')}
    </Text>
    </View>
  
    ) : null}
</View>

<View style={styles.rowContainer}>
<Text style={{ color: 'black',marginTop:"5%" }}>EVERY</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>HOUR</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>MINUTE</Text>


</View>
<View style={{...styles.rowContainer}}>
      <TextInput
        style={{...styles.input,marginLeft:"32%"}}
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
      {/* <Text style={styles.errorText}>{hourError}</Text>
      <Text style={styles.errorText}>{minuteError}</Text> */}
    </View>
    <TouchableOpacity style={styles.customButtonDone} onPress={() => {
  if (selectedOption === 'week') {
    setReminder();
  } else if (selectedOption === 'day') {
    setReminderTwo();
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
      );  }
}}>
  <Text style={{...styles.customButtonText, fontWeight: "bold"}}>Done</Text>
  <Modal
        animationType="slide"
        transparent={true}
        visible={isNewModalVisible}
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
</TouchableOpacity>


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
  headerContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    
   
    // Add more styles as needed
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
  monthOption: {
    width: '15%',
    margin: 0,
   padding:"1%",
    borderWidth: 1,
    borderColor: 'black',
    
  },
  selectedMonthOption: {
    backgroundColor: 'blue',
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
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 24,
  },
   circleStyle : {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "white" || 'green',
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
  selectedOption: {
    backgroundColor: 'black',
  },
  optionText: {
    color: 'black',
    fontSize: 16,
  
  },
 
  header: {
    fontSize: 16,
    marginTop: "1%",
    color: 'black',
  },
  selectedDatesText: {
    

    fontSize: 10,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  customButtonDone: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginTop:"10%",
    
    
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

const calendarTheme = {
  textSectionTitleColor: 'black',
  selectedDayBackgroundColor: 'black',
  selectedDayTextColor: 'white',
  todayTextColor: 'black',
  dayTextColor: 'black',
  arrowColor: 'black',
  monthTextColor: 'black',
  textMonthFontWeight: 'bold',
};