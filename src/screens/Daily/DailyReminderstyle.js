import { StyleSheet } from "react-native";


const DailyReminderStyle = StyleSheet.create({
    container: {
      padding: 14,
      margin: 8,
    },
    headerContainer: {
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'space-between',
      
     
      // Add more styles as needed
    },
   
    title: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'black',
    },
    text: {
      marginBottom: 8,
      color: 'black',
    },
  
    dropdownContainer: {
      height: 40,
  color:"red",
      marginBottom: 8,
      width: "30%",
      marginLeft: "45%",
      marginTop: "3%",
  
    },
   
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: "20%",
      marginTop: "7%",
      
    },
    monthChooser: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      
  
    },
   
   
    monthText: {
      textAlign: 'center',
      color: 'black',
    },
    weekOption: {
      width: '12%',
    marginTop:"10%",
    
     padding:"1%",
      borderWidth: 1,
      borderColor: 'black',
      
    },
    dropdownContainer: {
      width: 120,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    dropdownText: {
      fontSize: 16,
      padding: "auto",
    },
    customButton: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      padding: 5,
      margin:"3%",
  
      
    },
    customButtonDrop: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      width:125,
      height:40,
      marginTop:"5%",
      padding:"2%"
    },
    customButtonText: {
      color: 'black',
      textAlign: 'center',
    },
    
    optionContainer: {
      flexDirection: 'row',
      marginTop: 36,
      
      
    },
    option: {
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      margin:3,
      marginLeft:5,
      marginRight:15
    },
   
  
  
    customButtonDone: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      marginTop:"90%",
      
      
      backgroundColor:"gray",
      
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      width: 80,
      height:40, 
      textAlign: 'center',
    },
    selectedMonthOption: {
      backgroundColor: 'blue',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
  
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  
    closeButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
  });
  
  
  
  
  
  export default DailyReminderStyle;