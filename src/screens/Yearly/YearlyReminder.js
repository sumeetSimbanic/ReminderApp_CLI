import React, { useState,useEffect } from 'react';
import { View, Text, StylSheet, TouchableHighlight, TouchableOpacity, Dimensions ,Button,Modal,ScrollView,TextInput,Alert} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar} from 'react-native-calendars';
import MonthlyReminderStyle from '../Monthly/MonthlyReminderStyle';
import SQLite from 'react-native-sqlite-storage';
import ReminderScreenStyle from '../Once/ReminderScreenStyle';



const db = SQLite.openDatabase({ name: 'reminders.db', location: 'default' });


export default function YearlyReminder({navigation}) {
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
  const [hour, setHour] = useState('1');
  const [minute, setMinute] = useState('0');
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
const [title, setTitle] = useState('');
const [notes, setNotes] = useState('');

  
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
 
  const logRepeatReminderData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM repeatreminder;',
        [],
        (tx, result) => {
          const rows = result.rows;
  
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            console.log(`Entry ${i + 1}:`, item);
          }
        },
        (error) => {
          console.error('Error fetching data from repeatreminder table:', error);
        }
      );
    });
  };
  
  // Call this function when you want to log the data
  
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
      case '4':
        // Filter intervals for every 3 months
        return filterIntervalsByGap(intervals, 4);
      // Add more cases for other durations as needed
      case '5':
        // Filter intervals for every 3 months
        return filterIntervalsByGap(intervals, 5);
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
  const createRepeatReminderTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS repeatreminder (id INTEGER PRIMARY KEY AUTOINCREMENT, startDateTime TEXT, endDateTime TEXT, selectedStartTime TEXT, selectedEndTime TEXT, hour TEXT, minute TEXT, selectedDates TEXT, selectedDuration TEXT, selectedWeeks TEXT, filteredIntervals TEXT, title TEXT, notes TEXT, category TEXT DEFAULT "Monthly" );',
        [],
        (tx, result) => {
          console.log('repeatreminder table created successfully');
        },
        (error) => {
          console.error('Error creating repeatreminder table:', error);
        }
      );
    });
  };
  
  // Call this function when your application starts or when you initialize the database
  createRepeatReminderTable();

  
  const setReminderTwo = () => {
    if (
      selectedStartDate &&
      selectedEndDate &&
      selectedStartTime &&
      selectedEndTime &&
      hour &&
      minute &&
      selectedDates &&
      Object.keys(selectedDates).length > 0 &&
      title.trim() !== ''

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
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO repeatreminder (startDateTime, endDateTime, selectedStartTime, selectedEndTime, hour, minute, selectedDates, filteredIntervals, title, notes, category) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          [
            startDateTime.toString(),
            endDateTime.toString(),
            selectedStartTime.toLocaleTimeString(),
            selectedEndTime.toLocaleTimeString(),
            hour,
            minute,
            JSON.stringify(selectedDates),
            JSON.stringify(filteredIntervals),
            title,
            notes,
            'Yearly', // Set the constant value for the "category" column
          ],
          (tx, result) => {
            console.log('Reminder inserted successfully');
          },
          (error) => {
            console.error('Error inserting into repeatreminder table:', error);
          }
        );
      });
      setIntervals(filteredIntervals);
      console.log("real",filteredData)
      toggleModal();
      logRepeatReminderData();
      createRepeatReminderTable();

      const startTimestamp = startDateTime.getTime();
const endTimestamp = endDateTime.getTime();

navigation.navigate('OnceListing', {
  category: 'Repeat', 
});
      
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
      selectedWeeks.length > 0 &&
      title.trim() !== ''

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
  
      const filteredIntervals = filterIntervalsByDuration(intervals, selectedDuration);
  
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO repeatreminder (startDateTime, endDateTime, selectedStartTime, selectedEndTime, hour, minute,  selectedDuration, selectedWeeks, filteredIntervals, title, notes, category) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          [
            startDateTime.toString(),
            endDateTime.toString(),
            selectedStartTime.toLocaleTimeString(),
            selectedEndTime.toLocaleTimeString(),
            hour,
            minute,
            selectedDuration,
            JSON.stringify(selectedWeeks),
            JSON.stringify(filteredIntervals),
            title,
            notes,
            'Yearly', // Set the constant value for the "category" column
          ],
          (tx, result) => {
            console.log('Reminder inserted successfully');
          },
          (error) => {
            console.error('Error inserting into repeatreminder table:', error);
          }
        );
      });
    
      setIntervals("week",filteredIntervals);
      toggleModal();
      logRepeatReminderData();
      createRepeatReminderTable();

      navigation.navigate('OnceListing', {
        category: 'Repeat', 
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
      );
    }
  };
  
  
  return (
    <View style={MonthlyReminderStyle.container}>

        <View style={MonthlyReminderStyle.headerContainer}>
  <TouchableHighlight onPress={navigateToMainScreen}>
      {/* <Icon name="arrow-back" size={30} color="black" /> */}
      <Text>Back</Text>
  </TouchableHighlight>

  <Text style={MonthlyReminderStyle.title}>YEARLY</Text>
  <TouchableHighlight onPress={navigateToMainScreen}>
      <Text>Cancel</Text>
      </TouchableHighlight>

</View>      
    <Text style={MonthlyReminderStyle.text}>Repeat at an interval of {selectedDuration || "_"} weeks</Text>
      <Text style={MonthlyReminderStyle.text}>Between: {chosenStartDate || "_" } to {chosenEndDate || "_"}</Text>
      <Text style={MonthlyReminderStyle.text}>Between {chosenStartTime || "_" } to {chosenEndTime || "_" } every {hour || "_"} hour {minute || "_"} mins</Text>
<View style={MonthlyReminderStyle.rowContainer}>
<Text style={{ color: 'black', marginTop: '5%' }}>Title:</Text>
        <TextInput
          style={{...ReminderScreenStyle.inputField,width:"50%"}}
          placeholder="Enter input text"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
      </View>

      <View style={MonthlyReminderStyle.rowContainer}>
        <Text style={{ color: 'black', marginTop: '5%' }}>Notes:</Text>
        <TextInput
          style={{...ReminderScreenStyle.inputField,width:"50%"}}
          placeholder="Enter notes"
          onChangeText={(text) => setNotes(text)}
          value={notes}
        />
      </View>
      <View style={MonthlyReminderStyle.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={MonthlyReminderStyle.pickerContainer}>
          <View>
            <TouchableHighlight style={MonthlyReminderStyle.customButton} onPress={showStartDatePicker}>
      <Text style={MonthlyReminderStyle.customButtonText}>Start Date </Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={MonthlyReminderStyle.customButton} onPress={showEndDatePicker}>
      <Text style={MonthlyReminderStyle.customButtonText}>End Date </Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
      <View style={MonthlyReminderStyle.rowContainer}>
        <Text style={{ color: 'black', paddingTop: '8%' }}>Between:</Text>
        <View style={MonthlyReminderStyle.pickerContainer}>
          <View>
            <TouchableHighlight style={MonthlyReminderStyle.customButton} onPress={showStartTimePicker}>
      <Text style={MonthlyReminderStyle.customButtonText}>Start Time</Text>
    </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight style={MonthlyReminderStyle.customButton} onPress={showEndTimePicker}>
      <Text style={MonthlyReminderStyle.customButtonText}>End Time</Text>
    </TouchableHighlight>
          </View>
        </View>
        
      </View>
      <View >
      
      <View style={MonthlyReminderStyle.optionContainer}>
      <Text style={MonthlyReminderStyle.optionText}>Week</Text>

        <TouchableOpacity
          style={[
            MonthlyReminderStyle.option,
            selectedOption === 'week' ? MonthlyReminderStyle.selectedOption : null
          ]}
          onPress={() => handleOptionPress('week')}
        >
        </TouchableOpacity>
        <Text style={MonthlyReminderStyle.optionText}>Day</Text>

        <TouchableOpacity
          style={[
            MonthlyReminderStyle.option,
            selectedOption === 'day' ? MonthlyReminderStyle.selectedOption : null
          ]}
          onPress={() => handleOptionPress('day')}
        >
        </TouchableOpacity>
      </View>

      </View>
      <View style={MonthlyReminderStyle.rowContainer}>
  {selectedOption === 'week' ? (
    <View>
       <View style={MonthlyReminderStyle.rowContainer}>
      <Text style={{ color: 'black', paddingTop: '6%' }}>WEEKS:</Text>
      

    <ModalDropdown
  options={duration.map((item) => item.label)}
  style={MonthlyReminderStyle.customButtonDrop}
  defaultValue={selectedDuration || 'Select Duration'}
  onSelect={(index, value) => handleDurationSelect(index, duration[index].value)}
  textStyle={MonthlyReminderStyle.dropdownText}
  dropdownStyle={MonthlyReminderStyle.dropdownContainer}
  defaultIndex={0}
/>
    </View>
     
        {/* <View style={MonthlyReminderStyle.rowContainer}>
      <Text style={{ color: 'black', paddingTop: '5%' }}>WEEKS:</Text>

      <ModalDropdown
  options={weekDuration.map((item) => item.label)}
  style={MonthlyReminderStyle.customButtonDrop}
  defaultValue={selectedMonth !== null ? String(selectedMonth) : "Select Duration"} 
  onSelect={(index, value) => selectMonth(index, duration[index].value)}
  textStyle={MonthlyReminderStyle.dropdownText}
  dropdownStyle={MonthlyReminderStyle.dropdownContainer}
  defaultIndex={1}  
/>


      </View> */}
      <View style={{...MonthlyReminderStyle.rowContainer}}>
      <Text style={{ color: 'black', paddingTop: '9%' }}>DAYS:</Text>
        <View style={{...MonthlyReminderStyle.monthChooser,marginLeft:"10%"}}>
      {weeks.map((week, index) => (
        <TouchableOpacity
          key={index}
          style={[
            MonthlyReminderStyle.weekOption,
            selectedWeeks.includes(week) ? MonthlyReminderStyle.selectedMonthOption : null
          ]}
          onPress={() => toggleWeekSelection(week)}
        >
          <Text style={MonthlyReminderStyle.monthText}>{week}</Text>
        </TouchableOpacity>
      ))}
    </View>
        </View>
     
      </View>
      
    
  ) : selectedOption === 'day' ? (
    <View>
    <View style={MonthlyReminderStyle.rowContainer}>
    <Text style={MonthlyReminderStyle.header}>Selected Dates:</Text>
   
    <TouchableHighlight style={{...MonthlyReminderStyle.customButton,marginLeft:"32%"}} onPress={openModal}>
      <Text style={{...MonthlyReminderStyle.customButtonText}}>CHOOSE DATES</Text>
    </TouchableHighlight>

    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={false}
    >
      <View style={MonthlyReminderStyle.modalContainer}>
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
  <Text style={MonthlyReminderStyle.selectedDatesText}>
      {Object.keys(selectedDates).join(', ')}
    </Text>
    </View>
  
    ) : null}
</View>

<View style={MonthlyReminderStyle.rowContainer}>
<Text style={{ color: 'black',marginTop:"5%" }}>EVERY</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>HOUR</Text>

<Text style={{ color: 'black',marginTop:"5%"  }}>MINUTE</Text>


</View>
<View style={{...MonthlyReminderStyle.rowContainer}}>
      <TextInput
        style={{...MonthlyReminderStyle.input,marginLeft:"32%"}}
        placeholder="0-23"
        onChangeText={handleHourChange}
        value={hour}
        keyboardType="numeric"
      />
      <TextInput
        style={MonthlyReminderStyle.input}
        placeholder="0-59"
        onChangeText={handleMinuteChange}
        value={minute}
        keyboardType="numeric"
      />
      {/* <Text style={MonthlyReminderStyle.errorText}>{hourError}</Text>
      <Text style={MonthlyReminderStyle.errorText}>{minuteError}</Text> */}
    </View>
    <TouchableOpacity style={MonthlyReminderStyle.customButtonDone} onPress={() => {
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
  <Text style={{...MonthlyReminderStyle.customButtonText, fontWeight: "bold"}}>Done</Text>
  {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isNewModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={MonthlyReminderStyle.modalContainer}>
          <ScrollView style={MonthlyReminderStyle.modalContent}>
            <Text style={MonthlyReminderStyle.modalTitle}>Intervals:</Text>
            {intervals.map((interval, index) => (

              <Text key={index} style={MonthlyReminderStyle.modalText}>{`${interval.date} - ${interval.time}`}</Text>
            ))}
          </ScrollView>
          <TouchableOpacity style={MonthlyReminderStyle.modalButton} onPress={toggleModal}>
            <Text style={MonthlyReminderStyle.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
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