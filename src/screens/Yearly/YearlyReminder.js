import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity,Alert, Dimensions ,Button,Modal,ScrollView,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar} from 'react-native-calendars';
import YearlyReminderStyle from './YearlyReminderStyle';




export default function YearlyReminder({ navigation }) {
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
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
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
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

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

      console.log('Intervals:', intervals);
      const filteredIntervals = filterIntervalsByDuration(intervals, selectedDuration);

      console.log('Filtered Intervals:', filteredIntervals);

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
      case '4':
        // Filter intervals for every 3 months
        return filterIntervalsByGap(intervals, 4);
        case '5':
        // Filter intervals for every 3 months
        return filterIntervalsByGap(intervals, 5);
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
      console.log("Selecteddates",temp)
      const filteredData = intervals.filter(item => {
        const date = new Date(item.date);

          return temp.includes(date.getDate());
      });
      console.log(filteredData)
      
      
      
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
    <View style={YearlyReminderStyle.container}>
        

        <View style={YearlyReminderStyle.headerContainer}>
  <TouchableHighlight onPress={navigateToMainScreen}>
      {/* <Icon name="arrow-back" size={30} color="black" /> */}
      <Text>Back</Text>
  </TouchableHighlight>

  <Text style={YearlyReminderStyle.title}>YEARLY</Text>
  <TouchableHighlight onPress={navigateToMainScreen}>
      <Text>Cancel</Text>
      </TouchableHighlight>

</View>    
        <Text style={YearlyReminderStyle.text}>Repeat at an interval of {selectedDuration || "_"} months</Text>
      <Text style={YearlyReminderStyle.text}>Between: {chosenStartDate || "_" } to {chosenEndDate || "_"}</Text>
      <Text style={YearlyReminderStyle.text}>Between {chosenStartTime || "_" } to {chosenEndTime || "_" } every {hour || "_"} hour {minute || "_"} mins</Text>
     
      <View style={YearlyReminderStyle.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={YearlyReminderStyle.pickerContainer}>
          <View>
            <TouchableHighlight style={YearlyReminderStyle.customButton} onPress={showStartDatePicker}>
      <Text style={YearlyReminderStyle.customButtonText}>Start Date </Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={YearlyReminderStyle.customButton} onPress={showEndDatePicker}>
      <Text style={YearlyReminderStyle.customButtonText}>End Date </Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
      <View style={YearlyReminderStyle.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={YearlyReminderStyle.pickerContainer}>
          <View>
            <TouchableHighlight style={YearlyReminderStyle.customButton} onPress={showStartTimePicker}>
      <Text style={YearlyReminderStyle.customButtonText}>Start Time</Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={YearlyReminderStyle.customButton} onPress={showEndTimePicker}>
      <Text style={YearlyReminderStyle.customButtonText}>End Time</Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
      <View >
      
      <View style={YearlyReminderStyle.optionContainer}>
      <Text style={YearlyReminderStyle.optionText}>Week</Text>

        <TouchableOpacity
          style={[
            YearlyReminderStyle.option,
            selectedOption === 'week' ? YearlyReminderStyle.selectedOption : null
          ]}
          onPress={() => handleOptionPress('week')}
        >
        </TouchableOpacity>
        <Text style={YearlyReminderStyle.optionText}>Day</Text>

        <TouchableOpacity
          style={[
            YearlyReminderStyle.option,
            selectedOption === 'day' ? YearlyReminderStyle.selectedOption : null
          ]}
          onPress={() => handleOptionPress('day')}
        >
        </TouchableOpacity>
      </View>

      </View>
      <View style={YearlyReminderStyle.rowContainer}>
  {selectedOption === 'week' ? (
    <View>
        {/* <View style={YearlyReminderStyle.rowContainer}>
      <Text style={{ color: 'black', paddingTop: '5%' }}>WEEKS:</Text>

      <ModalDropdown
  options={weekDuration.map((item) => item.label)}
  style={YearlyReminderStyle.customButtonDrop}
  defaultValue={selectedMonth !== null ? String(selectedMonth) : "Select Duration"} 
  onSelect={(index, value) => selectMonth(index, duration[index].value)}
  textStyle={YearlyReminderStyle.dropdownText}
  dropdownStyle={YearlyReminderStyle.dropdownContainer}
  defaultIndex={1}  
/>


      </View> */}
       <View style={YearlyReminderStyle.rowContainer}>
      <Text style={{ color: 'black', paddingTop: '6%' }}>Months:</Text>
      

    <ModalDropdown
  options={duration.map((item) => item.label)}
  style={YearlyReminderStyle.customButtonDrop}
  defaultValue={selectedDuration || 'Select Duration'}
  onSelect={(index, value) => handleDurationSelect(index, duration[index].value)}
  textStyle={YearlyReminderStyle.dropdownText}
  dropdownStyle={YearlyReminderStyle.dropdownContainer}
  defaultIndex={0}
/>
    </View>
     
      <View style={{...YearlyReminderStyle.rowContainer}}>
      <Text style={{ color: 'black', paddingTop: '9%' }}>DAYS:</Text>
        <View style={{...YearlyReminderStyle.monthChooser,marginLeft:"10%"}}>
      {weeks.map((week, index) => (
        <TouchableOpacity
          key={index}
          style={[
            YearlyReminderStyle.weekOption,
            selectedWeeks.includes(week) ? YearlyReminderStyle.selectedMonthOption : null
          ]}
          onPress={() => toggleWeekSelection(week)}
        >
          <Text style={YearlyReminderStyle.monthText}>{week}</Text>
        </TouchableOpacity>
      ))}
    </View>
        </View>
     
      </View>
      
    
  ) : selectedOption === 'day' ? (
    <View>
    <View style={YearlyReminderStyle.rowContainer}>
    <Text style={YearlyReminderStyle.header}>Selected Dates:</Text>
   
    <TouchableHighlight style={{...YearlyReminderStyle.customButton,marginLeft:"32%"}} onPress={openModal}>
      <Text style={{...YearlyReminderStyle.customButtonText}}>CHOOSE DATES</Text>
    </TouchableHighlight>

    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={false}
    >
      <View style={YearlyReminderStyle.modalContainer}>
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
  <Text style={YearlyReminderStyle.selectedDatesText}>
      {Object.keys(selectedDates).join(', ')}
    </Text>
    </View>
  
    ) : null}
</View>

<View style={YearlyReminderStyle.rowContainer}>
<Text style={{ color: 'black',marginTop:"5%" }}>EVERY</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>HOUR</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>MINUTE</Text>


</View>
<View style={{...YearlyReminderStyle.rowContainer}}>
      <TextInput
        style={{...YearlyReminderStyle.input,marginLeft:"32%"}}
        placeholder="0-23"
        onChangeText={handleHourChange}
        value={hour}
        keyboardType="numeric"
      />
      <TextInput
        style={YearlyReminderStyle.input}
        placeholder="0-59"
        onChangeText={handleMinuteChange}
        value={minute}
        keyboardType="numeric"
      />
      {/* <Text style={YearlyReminderStyle.errorText}>{hourError}</Text>
      <Text style={YearlyReminderStyle.errorText}>{minuteError}</Text> */}
    </View>
    <TouchableOpacity style={YearlyReminderStyle.customButtonDone} onPress={() => {
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
  <Text style={{...YearlyReminderStyle.customButtonText, fontWeight: "bold"}}>Done</Text>
</TouchableOpacity>


      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={(date) => handleDateConfirm(date, true)}
        onCancel={hideStartDatePicker}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={(date) => handleDateConfirm(date, false)}
        onCancel={hideEndDatePicker}
      />
          <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />

      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />

    </View>
  );
}
