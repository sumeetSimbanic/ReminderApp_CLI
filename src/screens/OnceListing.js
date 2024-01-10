import React,{useEffect,useState} from 'react';
import { View, Text, FlatList,Button ,StyleSheet,TouchableHighlight, ScrollView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';



const db = SQLite.openDatabase({ name: 'reminders.db', location: 'default' });

const OnceListing = ({ route }) => {
    const [reminders, setReminders] = useState([]);
    const [showEdit, setShowEdit] = useState(true); // State to toggle edit functionality

    const navigation = useNavigation(); // Initialize navigation

  // useEffect(() => {
  //   // setReminders(route.params.reminders);
  // }, [route.params.reminders]);
useEffect(()=>{
  fetchUpdatedReminders()
},[])
  const deleteReminder = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM reminders WHERE id = ?',
        [id],
        (tx, result) => {
          console.log('Reminder deleted successfully');
          // After deleting, fetch and update the reminders
          fetchUpdatedReminders();
        },
        (error) => {
          console.log('Error deleting reminder:', error);
        }
      );
    });
  };

  const fetchUpdatedReminders = () => {
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
          // Update the reminders after deletion
          setReminders(data);
        },
        (error) => {
          console.log('Error fetching reminders:', error);
        }
      );
    });
  };
  const navigateToMainScreen = () => {
    setReminders([]); // Clear all reminders when navigating back
    setShowEdit(false); // Hide edit functionality
    navigation.navigate('Home');
  };
  const editReminder = (id) => {
    // Navigate to the ReminderScreen for editing the reminder with specific ID
    navigation.navigate('Home', { reminderId: id });
  };
  return (
    
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableHighlight onPress={navigateToMainScreen}>
          <Text>Back</Text>
        </TouchableHighlight>

        <Text style={styles.title}>ONCE REMINDER</Text>

        <TouchableHighlight onPress={navigateToMainScreen}>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
<ScrollView>
<View style={styles.reminderContainer}>
  {reminders.map((item) => (
    <View key={item.id} style={styles.singleReminder}>
      <View style={styles.reminderTextContainer}>
        <Text style={styles.titleText}>Title: {item.title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => editReminder(item.id)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => deleteReminder(item.id)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
      <Text>Note: {item.note}</Text>
      <Text>Date: {item.date.toLocaleString()}</Text>
      <View style={styles.divider} />
    </View>
  ))}
</View>
</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reminderContainer: {
    flex: 1,
  },
  singleReminder: {
    marginBottom: 15,
  },
  reminderTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop:"1%"
  },
  noteText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    color: 'red',
    marginLeft: "15%",
  },
  editButton: {
    color: 'green',
    marginLeft: 10,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default OnceListing;
