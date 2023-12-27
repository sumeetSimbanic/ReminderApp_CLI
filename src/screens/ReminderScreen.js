import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';



export default function ReminderScreen({navigation}) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showDateButtons, setShowDateButtons] = useState(false);
  const [selectedRepeatOption, setSelectedRepeatOption] = useState(null);
  const [showOnceButton] = useState(true);
  const [reminders, setReminders] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSettingUpcomingTime, setSettingUpcomingTime] = useState(false); // New state variable
  const [isSettingUpcomingDate, setSettingUpcomingDate] = useState(false);
  const [isTimeCategorySelected, setIsTimeCategorySelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Add this line
  const [editingIndex, setEditingIndex] = useState(null); 

useEffect(()=>{
  createChannels();
},[]);
const createChannels = () =>{
  PushNotification.createChannel(
    {
      channelId:"test-channel",
      channelName:"Test Channel"
    }
  )
}

  
  const setUpcomingDate = () => {
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    setIsTimeCategorySelected(true);
    setTimePickerVisible(true);
  };
  
 
  const openNoteInput = () => {
    setShowNoteInput(!showNoteInput);
  };

  const openDateButtons = () => {
    setShowDateButtons(!showDateButtons);
    setSelectedRepeatOption(null);
  };
  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };
  
  const clearTimeCategorySelection = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setShowDateButtons(false);
    setTimePickerVisible(false); // Add this line to hide the time picker
    setDatePickerVisible(false); 
    setIsTimeCategorySelected(false);
  };
  

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };


  const addReminder = () => {
    if (!inputText) {
      setErrorMessage('Please enter a title for the reminder.');
      return;
    }
  
    if (selectedDate) {
      if (selectedTime) {
        const dateTime = new Date(selectedDate);
        dateTime.setHours(selectedTime.getHours());
        dateTime.setMinutes(selectedTime.getMinutes());
  
        const newReminder = {
          date: dateTime,
          note: noteText,
          title: inputText,
        };
  
        if (isEditing) {
          // Editing an existing reminder
          const updatedReminders = [...reminders];
          updatedReminders[editingIndex] = newReminder; // Replace the reminder at the specified index
          setReminders(updatedReminders);
          setIsEditing(false); // Reset the editing flag
        } else {
          // Adding a new reminder
          PushNotification.localNotificationSchedule({
            channelId: 'test-channel',
            title: newReminder.title,
            message: newReminder.note,
            date: newReminder.date,
          });
  
          setReminders([...reminders, newReminder]);
        }
  
        // Reset all fields to their initial state
        setNoteText('');
        setInputText('');
        setSelectedDate(null);
        setSelectedTime(null);
        setShowNoteInput(false);
        setShowDateButtons(false);
        setTimePickerVisible(false);
        setDatePickerVisible(false);
        setIsTimeCategorySelected(false);
        setErrorMessage('');
      } else {
        alert('Please select a time for the reminder.');
      }
    } else {
      alert('Please select a date for the reminder.');
    }
  };
  

  
  
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };



  const setTodayTime = () => {
    const today = new Date();
  
    // Clearing seconds and milliseconds for precise comparison
    today.setSeconds(0);
    today.setMilliseconds(0);
  
    const now = new Date();
    if (selectedDate && selectedDate.toDateString() === now.toDateString() && selectedDate < now) {
      // Allow reopening without the alert
      setSelectedTime(null);
      setShowDateButtons(false);
      setSelectedDate(today);
      setTimePickerVisible(true);
      return;
    }
  
    // If no warning is needed, proceed as usual
    setSelectedTime(null);
    setSelectedDate(today);
    setShowDateButtons(false);
    setTimePickerVisible(true);
  };
  
  
  

  const setTomorrowTime = () => {
    const tomorrow = new Date();
    const now = new Date();
    tomorrow.setDate(now.getDate() + 1);
    setSelectedDate(tomorrow);
    setShowDateButtons(false);
    setTimePickerVisible(true);
  };
  const handleTimeConfirm = (time) => {
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(time.getHours());
    selectedDateTime.setMinutes(time.getMinutes());
  
    const now = new Date();
  
    if (selectedDateTime < now) {
      alert('Please select a time in the future.');
      return;
    }
  
    // Reset the selected time to null to allow reopening after warning
    setSelectedTime(time);
    hideTimePicker();
    setIsTimeCategorySelected(true);
  };
  const editReminder = (index) => {
    const reminderToEdit = reminders[index];
    setInputText(reminderToEdit.title);
    setNoteText(reminderToEdit.note);
    setSelectedDate(reminderToEdit.date);
    setSelectedTime(reminderToEdit.date);
    setIsEditing(true); // Set the editing flag
    setEditingIndex(index); // Set the index of the reminder being edited
    // Additional logic as needed to open pickers etc.
  };
  
  
  const openFrequencyButtons = (option) => {
    if (option === 'Daily' || option === 'Hourly' || option === 'Weekly' || option === 'Monthly' || option === 'Yearly') {
      navigation.navigate(option); 
    } else {
      setSelectedRepeatOption(option);
      setIsTimeCategorySelected(true);
    }
  };
  
  
  const chosenTimeCategory = () => {
    if (selectedDate && selectedTime) {
      return (
        <View style={styles.chosenTimeCategoryContainer}>
          <Text>Chosen Date: {selectedDate.toDateString()}</Text>
          <Text>Chosen Time: {selectedTime.toLocaleTimeString()}</Text>
         
        </View>
      );
    }
    return null;
  };
  
  
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>ReminderScreen</Text>
        <TextInput
          style={styles.inputField}
          value={inputText}
          placeholder="ADD REMINDER HERE...."
          onChangeText={(text) => {
            const words = text.split(' ').slice(0, 15);
            setInputText(words.join(' '));
            setErrorMessage(''); // Clear the error message when the user types
          }}
        />
        
        {errorMessage ? (
          <Text  style={{color:"red"}}>{errorMessage}</Text>
        ) : null}
        {showNoteInput && (
          <View style={styles.noteInputContainer}>
           <TextInput
          style={styles.noteInput}
          placeholder="Add a note..."
          value={noteText}
          multiline={true}
  onChangeText={(text) => {
    // Limit the note to 50 words
    const words = text.split(' ').slice(0, 50);
    setNoteText(words.join(' '));
  }}
/>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <CustomButton title="Note" onPress={openNoteInput} />
          <CustomButton title="Camera" />
          <CustomButton title="Notification" />
        </View>
        {showDateButtons ? (
          <>
            <View style={styles.buttonContainerOne}>
              <CustomButton title="Today" onPress={setTodayTime} />
              <CustomButton title="Tomorrow" onPress={setTomorrowTime} />
              <CustomButton title="Upcoming" onPress={setUpcomingDate} />
              <CustomButton title="Cancel" onPress={clearTimeCategorySelection} />
            </View>
          </>
        ) : (
          <View style={styles.buttonCategoryContainer}>
            {!selectedRepeatOption && (
              <>
                <CustomButton title="Once" onPress={openDateButtons} />
                {showOnceButton && (
                  <CustomButton title="Repeat" onPress={() => openFrequencyButtons('Repeat')} />
                )}
              </>
            )}
            {selectedRepeatOption && (
              <View style={styles.buttonContainerTwo}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <CustomButton title="Hourly" onPress={() => openFrequencyButtons('Hourly')} />
                  <CustomButton title="Daily" onPress={() => openFrequencyButtons('Daily')} />
                  <CustomButton title="Weekly" onPress={() => openFrequencyButtons('Weekly')} />
                  <CustomButton title="Monthly" onPress={() => openFrequencyButtons('Monthly')} />
                  <CustomButton title="Yearly" onPress={() => openFrequencyButtons('Yearly')} />
                  <CustomButton title="Cancel" onPress={() => openFrequencyButtons(null)} />
                </View>
              </View>
            )}
          </View>
        )}
        
        {chosenTimeCategory()}
        
        
        <TouchableHighlight>
          <View style={styles.centered}>
            <CustomButton title="Add Reminder" onPress={addReminder} />
          </View>
        </TouchableHighlight>
      </ScrollView>
      <FlatList
  data={reminders}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => (
    <View style={styles.reminderItem}>
      <Text style={styles.reminderTitle}>Title: {item.title}</Text>
      <Text style={styles.reminderDate}>Date: {item.date.toDateString()}</Text>
      <Text style={styles.reminderTime}>Time: {item.date.toLocaleTimeString()}</Text>
      <Text style={styles.reminderNote}>Note: {item.note}</Text>
      <TouchableHighlight onPress={() => deleteReminder(index)}>
        <View style={styles.deleteButtonContainer}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => editReminder(index)}>
  <View style={styles.deleteButtonContainer}>
    <Text style={styles.deleteButtonText}>Edit</Text>
  </View>
</TouchableHighlight>
    </View>
  )}
/>



<TimePickerModal
  isVisible={isTimePickerVisible}
  mode="time"
  onConfirm={handleTimeConfirm}
  onCancel={() => {
    hideTimePicker();
    setSettingUpcomingTime(false);
  }}
  date={new Date()}
  />

<DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="date"
  onConfirm={handleDateConfirm}
  onCancel={hideDatePicker}
  defaultDate={new Date()} 
/>

    </View>
  );
}
const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={styles.customButton} onPress={onPress}>
      <Text style={styles.customButtonText}>{title}</Text>
    </TouchableHighlight>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop:"10%",
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10, 
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputField: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: 'black',
  },
  reminderItem: {
    backgroundColor: 'white',
    padding: 1,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reminderDate: {
    fontSize: 12,
  },
  reminderTime: {
    fontSize: 12,
  },
  reminderNote: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    justifyContent: 'space-around', 
  },
  buttonCategoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    justifyContent: 'space-around',
  },
  buttonContainerOne: {
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    justifyContent: 'space-around', 
  },
  deleteButtonContainer: {
    // backgroundColor: 'red',
    padding: 3,
    marginTop: 3,
    borderRadius: 5,
    
    borderColor:"black",
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainerTwo: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
  },
  customButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  customButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  centered: {
    
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center', 
  },
  noteInputContainer: {
    marginTop: 20,
    width: '90%',
  },
  noteInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    minHeight: 100,
  },
  chosenTimeCategoryContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
});
