import { StyleSheet } from "react-native";

const YearlyReminderStyle = StyleSheet.create({
    container: {
      padding: 14,
      margin: 8,
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
    headerContainer: {
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'space-between',
      
     
      // Add more styles as needed
    },
    monthOption: {
      width: '15%',
      margin: 0,
     padding:"1%",
      borderWidth: 1,
      borderColor: 'black',
      
    },
    selectedMonthOption: {
      backgroundColor: 'blue',
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
    circle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmark: {
      color: 'white',
      fontSize: 24,
    },
     circleStyle : {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      backgroundColor: "white" || 'green',
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
    selectedOption: {
      backgroundColor: 'black',
    },
    optionText: {
      color: 'black',
      fontSize: 16,
    
    },
   
    header: {
      fontSize: 16,
      marginTop: "1%",
      color: 'black',
    },
    selectedDatesText: {
      
  
      fontSize: 10,
      color: 'black',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'white',
    },
    customButtonDone: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      marginTop:"10%",
      
      
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
  });
  
  export default YearlyReminderStyle