import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat with AI</Text>
      {/* Chat UI will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
