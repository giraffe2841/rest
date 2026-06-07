import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

type Friend = {
  id: number;
  name: string;
  initials: string;
  status: string;
  isSpecial?: boolean;
};

export default function FriendsScreen() {
  const friends: Friend[] = [
    { id: 1, name: '수현', initials: '수현', status: '오늘 퀘스트 완료 ✅' },
    { id: 2, name: '민지', initials: '민지', status: '30일 목표 달성! 🎉' },
    { id: 3, name: '준호', initials: '준호', status: '7일 연속 중 🌱' },
    { id: 4, name: '예진', initials: '예진', status: '취업했어요! 🎊', isSpecial: true },
    { id: 5, name: '태양', initials: '태양', status: '오늘 퀘스트 완료 ✅' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>친구</Text>
      </View>

      {/* 초대 카드 */}
      <View style={styles.inviteCard}>
        <Text style={styles.inviteIcon}>👤+</Text>
        <Text style={styles.inviteText}>친구를 초대하고 함께 성장해요</Text>
        <TouchableOpacity style={styles.inviteBtn}>
          <Text style={styles.inviteBtnText}>초대하기</Text>
        </TouchableOpacity>
      </View>

      {/* 친구 목록 */}
      <View style={styles.friendList}>
        {friends.map((friend) => (
          <View key={friend.id} style={[styles.friendRow, friend.isSpecial && styles.friendRowSpecial]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{friend.initials}</Text>
            </View>
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <Text style={styles.friendStatus} numberOfLines={1}>{friend.status}</Text>
            </View>
            {friend.isSpecial && <Text style={styles.specialIcon}>🎊</Text>}
            <TouchableOpacity style={styles.cheerBtn}>
              <Text style={styles.cheerText}>응원하기</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 알림 */}
      <View style={styles.notifications}>
        <View style={styles.notifItem}>
          <Text style={styles.notifText}>지민님이 오늘 목표를 달성했어요! 당신도 한 걸음만 더 가볼까요? 💚</Text>
        </View>
        <View style={styles.notifItem}>
          <Text style={styles.notifText}>수현님이 취업했어요! 🎊 함께 축하해주세요</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  content: { paddingBottom: 40, paddingHorizontal: 20 },
  header: { paddingTop: 24, paddingBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E1E1E' },
  inviteCard: { backgroundColor: '#E8F5E4', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  inviteIcon: { fontSize: 20 },
  inviteText: { flex: 1, fontSize: 14, fontWeight: '500', color: '#1E1E1E' },
  inviteBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#7DBF8A' },
  inviteBtnText: { fontSize: 12, color: '#7DBF8A' },
  friendList: { gap: 12, marginBottom: 20 },
  friendRow: { backgroundColor: 'white', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  friendRowSpecial: { backgroundColor: '#FFF8E6' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8F5E4', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '500', color: '#4A9E5C' },
  friendInfo: { flex: 1, minWidth: 0 },
  friendName: { fontSize: 14, fontWeight: '500', color: '#1E1E1E', marginBottom: 2 },
  friendStatus: { fontSize: 12, color: '#888888' },
  specialIcon: { fontSize: 20, marginRight: 4 },
  cheerBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#E8F5E4' },
  cheerText: { fontSize: 11, color: '#4A9E5C' },
  notifications: { gap: 12 },
  notifItem: { backgroundColor: '#FAF8F5', borderRadius: 12, padding: 16, borderWidth: 0.5, borderColor: '#E0E0D8' },
  notifText: { fontSize: 12, color: '#555555', lineHeight: 18 },
});
