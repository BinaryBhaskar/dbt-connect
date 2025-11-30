
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../constants/globalStyles';


type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

const initialMessages: Message[] = [
  { id: '1', text: 'Hello! How can I help you today?', sender: 'bot' },
  { id: '2', text: 'Hi! I have a question.', sender: 'user' },
  { id: '3', text: 'Sure, go ahead!', sender: 'bot' },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);
  const router = useRouter();
  const Wrapper = Platform.OS === 'android' ? SafeAreaView : View;

  const handleBack = () => {
    if (typeof router.canGoBack === 'function' && router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/explore');
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    // Simulate bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: "I'm a bot!", sender: 'bot' as const },
      ]);
    }, 700);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === 'user' ? styles.messageRowUser : styles.messageRowBot,
      ]}
    >
      <View
        style={[
          styles.bubble,
          item.sender === 'user' ? styles.bubbleUser : styles.bubbleBot,
        ]}
      >
        <Text style={item.sender === 'user' ? styles.textUser : styles.textBot}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <Wrapper style={globalStyles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={{ fontSize: 22, color: '#2563eb' }}>{'\u2190'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 56 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd?.({ animated: true })}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
            placeholderTextColor="#94a3b8"
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 8,
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  chatContent: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowBot: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  bubbleUser: {
    backgroundColor: '#2563eb',
    borderTopRightRadius: 4,
    marginLeft: 40,
  },
  bubbleBot: {
    backgroundColor: '#e5e7eb',
    borderTopLeftRadius: 4,
    marginRight: 40,
  },
  textUser: {
    color: '#fff',
    fontSize: 16,
  },
  textBot: {
    color: '#222',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },

  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
    color: '#222',
  },
  sendBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
  },
});
