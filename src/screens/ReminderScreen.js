import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ScrollView, FlatList,Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';



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

          // navigation.navigate('OnceListing', { reminders: data });

          // Logging all reminders to the console
          console.log('All reminders in the database:', data);
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

useEffect(() => {
  if (isFocused) {
    if (route.params && route.params.reminderId) {
      // Editing an existing reminder
      const reminderId = route.params.reminderId;
      const reminderIndex = reminders.findIndex((reminder) => reminder.id === reminderId);
      const reminderToEdit = reminders.find((reminder) => reminder.id === reminderId);

      if (reminderToEdit) {
        setInputText(reminderToEdit.title);
        setNoteText(reminderToEdit.note);
        setSelectedDate(reminderToEdit.date);
        setSelectedTime(reminderToEdit.date);
        setIsEditing(true);
        setEditingIndex(reminderIndex);
      }
    } else {
      // Reset the state when the screen gains focus but not for editing
      setInputText('');
      setNoteText('');
      setSelectedDate(null);
      setSelectedTime(null);
      setIsEditing(false);
      setEditingIndex(null);
      // Reset other state variables as needed
    }
  }
}, [isFocused, route.params, reminders]);

useEffect(() => {
  // Check if a reminder ID was passed through navigation
  if (route.params && route.params.reminderId) {
    const reminderId = route.params.reminderId;
    console.log('Reminder ID:', reminderId);
    console.log('Reminders:', reminders);
    const reminderIndex = reminders.findIndex((reminder) => reminder.id === reminderId);

    const reminderToEdit = reminders.find((reminder) => reminder.id === reminderId);
    console.log('Reminder to Edit:', reminderToEdit);

    if (reminderToEdit) {
      console.log(reminderIndex,"kkk")
      // Set the fields for editing based on the retrieved reminder
      setInputText(reminderToEdit.title);
      setNoteText(reminderToEdit.note);
      setSelectedDate(reminderToEdit.date);
      setSelectedTime(reminderToEdit.date); // You might need to adjust this based on your data structure
      setIsEditing(true);
      setEditingIndex(reminderIndex)
      // Other necessary actions for editing...
    }
  }
}, [route.params, reminders]);
const editReminder = (index) => {
  const reminderToEdit = reminders[index];
  setInputText(reminderToEdit.title);
  setNoteText(reminderToEdit.note);
  setSelectedDate(reminderToEdit.date);
  setSelectedTime(reminderToEdit.date);
  setIsEditing(true);
  setEditingIndex(index);
};
  
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
  
        if (isEditing) {
          // Editing an existing reminder
          console.log(editingIndex)
          console.log(reminders[editingIndex])
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

                // fetchRemindersFromDB(); // Fetch updated reminders
              },
              (error) => {
                console.log('Error adding reminder:', error);
              }
            );
          });
        }
        navigation.navigate('OnceListing');

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
        <View style={styles.chosenTimeCategoryContainer}>
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
              <TouchableHighlight style={styles.title} onPress={navigateToList}><Text>List</Text></TouchableHighlight>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>ReminderScreen</Text>
        <TextInput
          style={styles.inputField}
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
          <View style={styles.noteInputContainer}>
           <TextInput
          style={styles.noteInput}
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
        
        
        <TouchableHighlight onPress={addReminder}>
        <View style={styles.centered}>
          <CustomButton title={isEditingMode ? 'Edit Reminder' : 'Set Reminder'} onPress={addReminder} />
        </View>
      </TouchableHighlight>
      </ScrollView>
      {/* <Button title="View All Reminders" onPress={fetchRemindersFromDB} /> */}

      {/* <FlatList
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
 */}


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
