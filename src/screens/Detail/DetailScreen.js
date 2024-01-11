import React,{useState} from 'react';
import { View, Text ,Button,Modal, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import DetailScreenStyle from './DetailScreenStyle';

const DetailScreen = ({ route }) => {
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [intervalsModalVisible, setIntervalsModalVisible] = useState(false);
  const [filteredIntervals, setfilteredIntervals] = useState([]);
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
    filteredIntervals:routeIntervals,
    selectedDailyDuration,
  } = route.params;
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

    setfilteredIntervals(fetchedIntervals);
    setIntervalsModalVisible(true);
  };
  return (
    <View style={DetailScreenStyle.container}>
      <Text style={DetailScreenStyle.title}>Reminder Details</Text>

      <View style={DetailScreenStyle.detailContainer}>
        <Text> Date: {startDateTime.toDateString()} to {endDateTime.toDateString()}</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
        <Text> Time: {selectedStartTime.toLocaleTimeString()} to {selectedEndTime.toLocaleTimeString()}</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
        <Text>Every {hour} hour and {minute} minutes</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
        <Text>Repeat at an interval of {selectedDuration} weeks</Text>
      </View>

      <View style={DetailScreenStyle.detailContainer}>
      {selectedWeeks && selectedWeeks.length > 0 ? (
    <Text>Weekdays: {selectedWeeks.join(', ')}</Text>
  ) : (
    <Text>No weekdays selected</Text>
  )}     
   </View>

      <View style={DetailScreenStyle.detailContainer}>
      {selectedDates && Object.keys(selectedDates).length > 0 ? (
    <Text>Chosen Dates: {Object.keys(selectedDates).join(', ')}</Text>
  ) : (
    <Text>No dates chosen</Text>
  )}   
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
        <View style={DetailScreenStyle.modalContainer}>
          <View style={DetailScreenStyle.modalContent}>
            <Text style={DetailScreenStyle.title}>Intervals</Text>
            <ScrollView>

            {filteredIntervals.map((interval, index) => (

<Text key={index} style={DetailScreenStyle.modalText}>{`${interval.date} - ${interval.time}`}</Text>

))}
</ScrollView>

            <Button title="Close" onPress={() => setIntervalsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default DetailScreen;
