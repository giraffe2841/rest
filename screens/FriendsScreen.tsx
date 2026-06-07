import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Friend = {
  id: number;
  name: string;
  streak: number;
  goal: string;
  status: string;
  cheered: boolean;
  isAchieved?: boolean;
};

type Activity = {
  id: number;
  name: string;
  action: string;
  time: string;
};

const FRIENDS: Friend[] = [
  { id: 1, name: '수현', streak: 12, goal: '취업 준비', status: '오늘 퀘스트 완료', cheered: false },
  { id: 2, name: '민지', streak: 30, goal: '자기계발', status: '30일 목표 달성', cheered: true, isAchieved: true },
  { id: 3, name: '준호', streak: 7,  goal: '생활 습관', status: '7일 연속 중', cheered: false },
  { id: 4, name: '예진', streak: 45, goal: '취업 준비', status: '취업 성공', cheered: true, isAchieved: true },
  { id: 5, name: '태양', streak: 3,  goal: '운동', status: '오늘 퀘스트 완료', cheered: false },
  { id: 6, name: '하윤', streak: 18, goal: '독서', status: '이번 달 5권 완독', cheered: false },
];

const ACTIVITIES: Activity[] = [
  { id: 1, name: '민지', action: '30일 목표를 달성했어요. 함께 축하해주세요!', time: '방금 전' },
  { id: 2, name: '예진', action: '취업에 성공했어요!', time: '1시간 전' },
  { id: 3, name: '준호', action: '7일 연속 출석을 기록했어요.', time: '3시간 전' },
  { id: 4, name: '수현', action: '오늘의 퀘스트를 완료했어요.', time: '오전 9:14' },
];

const AVATAR_COLORS = [
  { bg: '#E8F5E4', text: '#4A9E5C' },
  { bg: '#E4EEF5', text: '#4A7A9E' },
  { bg: '#F5EDE4', text: '#9E6A4A' },
  { bg: '#F0E4F5', text: '#8A4A9E' },
  { bg: '#F5E4E4', text: '#9E4A4A' },
  { bg: '#E4F5F0', text: '#4A9E8A' },
];

export default function FriendsScreen() {
  const [cheered, setCheered] = useState<Set<number>>(
    new Set(FRIENDS.filter((f) => f.cheered).map((f) => f.id))
  );

  const toggleCheer = (id: number) => {
    setCheered((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>친구</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>함께하는 {FRIENDS.length}명</Text>
        </View>
      </View>

      {/* 초대 배너 */}
      <TouchableOpacity style={styles.inviteBanner} activeOpacity={0.85}>
        <View style={styles.inviteLeft}>
          <Text style={styles.inviteTitle}>친구를 초대하고 함께 성장해요</Text>
          <Text style={styles.inviteDesc}>초대한 친구가 가입하면 뱃지를 드려요</Text>
        </View>
        <View style={styles.inviteBtn}>
          <Text style={styles.inviteBtnText}>초대하기</Text>
        </View>
      </TouchableOpacity>

      {/* 친구 목록 */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>친구 목록</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>전체보기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {FRIENDS.map((friend, index) => {
          const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
          const isCheerOn = cheered.has(friend.id);
          return (
            <View key={friend.id} style={styles.friendCard}>
              {/* 아바타 */}
              <View style={[styles.avatar, { backgroundColor: color.bg }]}>
                <Text style={[styles.avatarText, { color: color.text }]}>{friend.name}</Text>
                {friend.isAchieved && <View style={styles.achievedDot} />}
              </View>

              {/* 이름 + 목표 */}
              <Text style={styles.friendName}>{friend.name}</Text>
              <View style={styles.goalPill}>
                <Text style={styles.goalPillText}>{friend.goal}</Text>
              </View>

              {/* 상태 */}
              <Text style={styles.friendStatus} numberOfLines={1}>{friend.status}</Text>

              {/* 연속 일수 */}
              <View style={styles.streakRow}>
                <View style={styles.streakBar} />
                <Text style={styles.streakText}>{friend.streak}일 연속</Text>
              </View>

              {/* 응원 버튼 */}
              <TouchableOpacity
                style={[styles.cheerBtn, isCheerOn && styles.cheerBtnOn]}
                onPress={() => toggleCheer(friend.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.cheerBtnText, isCheerOn && styles.cheerBtnTextOn]}>
                  {isCheerOn ? '응원중' : '응원하기'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* 최근 소식 */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>최근 소식</Text>
      </View>

      <View style={styles.activityCard}>
        {ACTIVITIES.map((item, index) => (
          <View key={item.id}>
            {index > 0 && <View style={styles.activityDivider} />}
            <View style={styles.activityRow}>
              <View style={styles.activityAvatar}>
                <Text style={styles.activityAvatarText}>{item.name[0]}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.activityName}>{item.name}</Text>
                  {'님이 '}
                  {item.action}
                </Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  content: { paddingBottom: 40 },

  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E1E1E' },
  headerBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#E8F5E4',
  },
  headerBadgeText: { fontSize: 12, color: '#4A9E5C', fontWeight: '500' },

  // 초대 배너
  inviteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E4',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    gap: 12,
  },
  inviteLeft: { flex: 1 },
  inviteTitle: { fontSize: 14, fontWeight: '600', color: '#1E1E1E', marginBottom: 3 },
  inviteDesc: { fontSize: 12, color: '#4A9E5C' },
  inviteBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#7DBF8A',
  },
  inviteBtnText: { fontSize: 12, color: '#4A9E5C', fontWeight: '500' },

  // 섹션 헤더
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '500', color: '#1E1E1E' },
  viewAll: { fontSize: 12, color: '#7DBF8A' },

  // 2열 그리드
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 28,
  },
  friendCard: {
    width: '47.5%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },

  // 아바타
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  avatarText: { fontSize: 15, fontWeight: '600' },
  achievedDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7DBF8A',
    borderWidth: 2,
    borderColor: 'white',
  },

  // 친구 정보
  friendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 5,
  },
  goalPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    marginBottom: 6,
  },
  goalPillText: { fontSize: 11, color: '#888888' },
  friendStatus: {
    fontSize: 11,
    color: '#AAAAAA',
    marginBottom: 10,
    textAlign: 'center',
  },

  // 연속 일수
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 12,
  },
  streakBar: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7DBF8A',
  },
  streakText: { fontSize: 11, color: '#4A9E5C', fontWeight: '500' },

  // 응원 버튼
  cheerBtn: {
    width: '100%',
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  cheerBtnOn: { backgroundColor: '#E8F5E4' },
  cheerBtnText: { fontSize: 12, color: '#888888' },
  cheerBtnTextOn: { color: '#4A9E5C', fontWeight: '500' },

  // 활동 피드
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  activityDivider: {
    height: 0.5,
    backgroundColor: '#F0F0EC',
    marginHorizontal: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
  },
  activityAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E4',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activityAvatarText: { fontSize: 13, fontWeight: '600', color: '#4A9E5C' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 13, color: '#555555', lineHeight: 19, marginBottom: 3 },
  activityName: { fontWeight: '600', color: '#1E1E1E' },
  activityTime: { fontSize: 11, color: '#AAAAAA' },
});
