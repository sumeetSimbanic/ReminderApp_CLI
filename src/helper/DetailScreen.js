import React,{useState} from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';


const DetailScreen = ({ route }) => {
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [intervalsModalVisible, setIntervalsModalVisible] = useState(false);
  const [intervals, setIntervals] = useState([]);
  // Extract serializable data passed through navigation
  const {
    startDateTime,
    endDateTime,
    selectedStartTime,
    selectedEndTime,
    hour,
    minute,
    selectedDuration,
    selectedWeeks,
    selectedDates,
    intervals:routeIntervals
  } = route.params;
console.log("----",intervals)
const toggleModal = () => {
  setNewModalVisible(!isNewModalVisible);
};

  // Reconstruct Date objects from timestamps
  const toggleIntervalsModal = () => {
    // Here you can fetch intervals or use existing data (from route.params.intervals)
    // For example, fetching intervals from a source
    // Replace this with your actual implementation
    // const fetchedIntervals = fetchIntervals(); // Implement this function to fetch intervals

    // For now, let's assume intervals are available in route.params.intervals
    const fetchedIntervals = routeIntervals || []; // Default to an empty array if intervals are not available

    setIntervals(fetchedIntervals);
    setIntervalsModalVisible(true);
  };
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
      <Button title="Show Intervals" onPress={toggleIntervalsModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={intervalsModalVisible}
        onRequestClose={() => {
          setIntervalsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Intervals</Text>
            {intervals.map((interval, index) => (
              <Text key={index}>{interval}</Text>
            ))}
            <Button title="Close" onPress={() => setIntervalsModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* <Button></Button> */}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
});

export default DetailScreen;
