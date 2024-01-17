import { StyleSheet } from 'react-native';

const ListingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3498db',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  tabToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3498db',
    height: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    color: 'white',
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: 'gray',
  },
  indicator: {
    height: 3,
    backgroundColor: 'white',
  },
  reminderContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  singleReminder: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  editButton: {
    marginRight: 8,
    color: '#3498db',
  },
  deleteButton: {
    color: 'red',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
  },
});

export default ListingStyle;
