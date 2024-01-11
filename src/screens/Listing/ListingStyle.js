import { StyleSheet } from "react-native";
const ListingStyle = StyleSheet.create({
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
  export default ListingStyle;