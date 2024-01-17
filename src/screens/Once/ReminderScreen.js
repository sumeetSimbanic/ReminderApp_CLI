import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ScrollView, FlatList,Button} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import ReminderScreenStyle from './ReminderScreenStyle'; 


const db = SQLite.openDatabase({ name: 'reminders.db', location: 'default' });



export default function ReminderScreen({navigation,route}) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const isEditingMode = route.params && route.params.reminderId;

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
  const isFocused = useIsFocused();


  useEffect(() => {
    initDB();
    fetchRemindersFromDB();
  }, []);

  const initDB = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS reminders (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, note TEXT, date INTEGER)',
        [],
        (tx, result) => {
          console.log('Table created successfully');
        },
        (error) => {
          console.log('Error creating table:', error);
        }
      );
    });
  };

  
  const fetchRemindersFromDB = () => {
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
          setReminders(data);
        },
        (error) => {
          console.log('Error fetching reminders:', error);
        }
      );
    });
  };
  


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

// In the ReminderScreen component

useEffect(() => {
  if (isFocused) {
    if (route.params && route.params.reminderId) {
      const reminderId = route.params.reminderId;
      console.log('Reminder ID from navigation params:', reminderId);

      const reminderIndex = reminders.findIndex((reminder) => reminder.id === reminderId);
      const reminderToEdit = reminders.find((reminder) => reminder.id === reminderId);

      console.log('Reminder Index:', reminderIndex);
      console.log('Reminder to edit:', reminderToEdit);

      if (reminderToEdit) {
        setInputText(reminderToEdit.title);
        setNoteText(reminderToEdit.note);
        setSelectedDate(reminderToEdit.date);
        setSelectedTime(reminderToEdit.date);
        setIsEditing(true);
        setEditingIndex(reminderIndex);
      }
    } else {
      setInputText('');
      setNoteText('');
      setSelectedDate(null);
      setSelectedTime(null);
      setIsEditing(false);
      setEditingIndex(null);
    }

    // Check for the callback and execute it
    if (route.params && route.params.onEditComplete) {
      route.params.onEditComplete();
    }
  }
}, [isFocused, route.params, reminders]);



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

  
  const clearTimeCategorySelection = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setShowDateButtons(false);
    setTimePickerVisible(false); 
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
  
        if (isEditing) {
          const updatedReminder = {
            id: reminders[editingIndex].id,
            date: dateTime,
            note: noteText,
            title: inputText,
          };
  
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE reminders SET title = ?, note = ?, date = ? WHERE id = ?',
              [updatedReminder.title, updatedReminder.note, updatedReminder.date.getTime(), updatedReminder.id],
              (tx, result) => {
                console.log('Reminder updated successfully');
                fetchRemindersFromDB(); // Fetch updated reminders
                navigateToList(); // Navigate only after successful update
              },
              (error) => {
                console.log('Error updating reminder:', error);
              }
            );
          });
  
          setIsEditing(false); // Reset the editing flag
        } else {
          // Adding a new reminder
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO reminders (title, note, date) VALUES (?, ?, ?)',
              [inputText, noteText, dateTime.getTime()],
              (tx, result) => {
                console.log('Reminder added successfully');
                PushNotification.localNotificationSchedule({
                  channelId: 'test-channel',
                  title: inputText,
                  message: noteText,
                  date: dateTime,
                });
                fetchRemindersFromDB(); // Fetch updated reminders
                navigateToList(); // Navigate only after successful insertion
              },
              (error) => {
                console.log('Error adding reminder:', error);
              }
            );
          });
        }
  
        // Reset all fields to their initial state
        setNoteText('');
        setInputText('');
        setSelectedDate(null);
        setSelectedTime(null);
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
  
    today.setSeconds(0);
    today.setMilliseconds(0);
  
    const now = new Date();
    if (selectedDate && selectedDate.toDateString() === now.toDateString() && selectedDate < now) {
      setSelectedTime(null);
      setShowDateButtons(false);
      setSelectedDate(today);
      setTimePickerVisible(true);
      return;
    }
  
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
      setSelectedTime(time);
    hideTimePicker();
    setIsTimeCategorySelected(true);
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
        <View style={ReminderScreenStyle.chosenTimeCategoryContainer}>
          <Text>Chosen Date: {selectedDate.toDateString()}</Text>
          <Text>Chosen Time: {selectedTime.toLocaleTimeString()}</Text>
         
        </View>
      );
    }
    return null;
  };
  
  const navigateToList = () => {
    navigation.navigate('OnceListing');
  };
 
  return (
    <View>
              <TouchableHighlight style={ReminderScreenStyle.title} onPress={navigateToList}><Text style={{padding:"1%"}}>LISTS</Text></TouchableHighlight>
              {/* <TouchableHighlight style={ReminderScreenStyle.title} onPress={navigateToRepeatList}><Text>Repeat</Text></TouchableHighlight> */}

      <ScrollView contentContainerStyle={ReminderScreenStyle.container}>
        <Text style={ReminderScreenStyle.heading}>ReminderScreen</Text>
        <TextInput
          style={ReminderScreenStyle.inputField}
          value={inputText}
          placeholder="ADD REMINDER HERE...."
          onChangeText={(text) => {
            const words = text.split(' ').slice(0, 15);
            setInputText(words.join(' '));
            setErrorMessage(''); 
          }}
        />
        
        {errorMessage ? (
          <Text  style={{color:"red"}}>{errorMessage}</Text>
        ) : null}
        {showNoteInput && (
          <View style={ReminderScreenStyle.noteInputContainer}>
           <TextInput
          style={ReminderScreenStyle.noteInput}
          placeholder="Add a note..."
          value={noteText}
          multiline={true}
  onChangeText={(text) => {
    const words = text.split(' ').slice(0, 50);
    setNoteText(words.join(' '));
  }}
/>
          </View>
        )}
        <View style={ReminderScreenStyle.buttonContainer}>
          <CustomButton title="Note" onPress={openNoteInput} />
          <CustomButton title="Camera" />
          <CustomButton title="Notification" />
        </View>
        {showDateButtons ? (
          <>
            <View style={ReminderScreenStyle.buttonContainerOne}>
              <CustomButton title="Today" onPress={setTodayTime} />
              <CustomButton title="Tomorrow" onPress={setTomorrowTime} />
              <CustomButton title="Upcoming" onPress={setUpcomingDate} />
              <CustomButton title="Cancel" onPress={clearTimeCategorySelection} />
            </View>
          </>
        ) : (
          <View style={ReminderScreenStyle.buttonCategoryContainer}>
            {!selectedRepeatOption && (
              <>
                <CustomButton title="Once" onPress={openDateButtons} />
                {showOnceButton && (
                  <CustomButton title="Repeat" onPress={() => openFrequencyButtons('Repeat')} />
                )}
              </>
            )}
            {selectedRepeatOption && (
              <View style={ReminderScreenStyle.buttonContainerTwo}>
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
        
        
        <TouchableHighlight onPress={addReminder}>
        <View style={ReminderScreenStyle.centered}>
          <CustomButton title={isEditingMode ? 'Edit Reminder' : 'Set Reminder'} onPress={addReminder} />
        </View>
      </TouchableHighlight>
      </ScrollView>
    


<TimePickerModal
  isVisible={isTimePickerVisible}
  mode="time"
  onConfirm={handleTimeConfirm}
  onCancel={() => {
    hideTimePicker();
    setSettingUpcomingTime(false);
  }}
  date={selectedTime || new Date()} 
  />

<DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="date"
  onConfirm={handleDateConfirm}
  onCancel={hideDatePicker}
  defaultDate={new Date()} 
  date={selectedDate|| new Date()} 

/>

    </View>
  );
}
const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={ReminderScreenStyle.customButton} onPress={onPress}>
      <Text style={ReminderScreenStyle.customButtonText}>{title}</Text>
    </TouchableHighlight>
  );
};

