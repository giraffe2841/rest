import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Text } from 'react-native';
import { IconHome, IconCalendar, IconBook, IconBriefcase, IconUsers } from '@tabler/icons-react-native';

import ProfileScreen from './screens/ProfileScreen';
import CalendarScreen from './screens/CalendarScreen';
import SelfDevelopmentScreen from './screens/SelfDevelopmentScreen';
import EmploymentScreen from './screens/EmploymentScreen';
import FriendsScreen from './screens/FriendsScreen';

type Tab = 'home' | 'calendar' | 'self' | 'employment' | 'friends';

const tabs: { id: Tab; label: string; Icon: any }[] = [
  { id: 'home', label: '홈', Icon: IconHome },
  { id: 'calendar', label: '캘린더', Icon: IconCalendar },
  { id: 'self', label: '자기계발', Icon: IconBook },
  { id: 'employment', label: '고용정보', Icon: IconBriefcase },
  { id: 'friends', label: '친구', Icon: IconUsers },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 화면 콘텐츠 */}
      <View style={styles.content}>
        {activeTab === 'home' && <ProfileScreen />}
        {activeTab === 'calendar' && <CalendarScreen />}
        {activeTab === 'self' && <SelfDevelopmentScreen />}
        {activeTab === 'employment' && <EmploymentScreen />}
        {activeTab === 'friends' && <FriendsScreen />}
      </View>

      {/* 하단 탭바 — 디자인 파일 그대로 */}
      <View style={styles.tabBar}>
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <TouchableOpacity
              key={id}
              onPress={() => setActiveTab(id)}
              style={styles.tabItem}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                color={isActive ? '#7DBF8A' : '#BBBBBB'}
              />
              <Text style={[styles.tabLabel, { color: isActive ? '#7DBF8A' : '#BBBBBB' }]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0D8',
    height: 64,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
});
