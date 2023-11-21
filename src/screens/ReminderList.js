import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function ReminderList() {
  const [viewMode, setViewMode] = useState('list'); // Default view mode is 'list'
  const data = [
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
  ];

  const renderList = () => {
    return (
      <FlatList
      style={{margin:"2%"}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
          </View>
        )}
      />
    );
  };

  const renderKanban = () => {
    return (
      <View style={styles.kanbanContainer}>
        {data.map((item, index) => (
          <View style={styles.kanbanItem} key={index}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => setViewMode('list')}
        >
          <Text style={styles.buttonText}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => setViewMode('kanban')}
        >
          <Text style={styles.buttonText}>Kanban</Text>
        </TouchableOpacity>
      </View>
      {viewMode === 'list' ? renderList() : renderKanban()}
    </View>
  );
}

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    width: 100,
  },
  container: {
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  headerButtons: {
    position: 'absolute',
  right: 10,
  top: 40, // Add 20 units of margin to the top
  flexDirection: 'row',
  alignItems: 'center',
  },
  space: {
    height: '15%', // Add space between buttons and the list
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  kanbanContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  kanbanItem: {
    width: '45%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: "white", 
    borderRadius: 5, 
    margin: 5, 
    marginLeft:8,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, 
  },
});
