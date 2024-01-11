import { StyleSheet } from 'react-native';

const ReminderScreenStyle = StyleSheet.create({
    
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


     export default ReminderScreenStyle; 