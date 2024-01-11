import { StyleSheet } from "react-native";
const DetailScreenStyle = StyleSheet.create({
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
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5,
    },
    
  });
  export default DetailScreenStyle