import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function SelfDevelopmentScreen() {
  const [meditationTime, setMeditationTime] = useState(10);
  const [source, setSource] = useState('책');

  const recommendations = [
    { id: 1, title: '데미안', quote: '새는 알을 깨고 나온다...', recommender: '수현' },
    { id: 2, title: '아몬드', quote: '감정이 없는 것이 아니라...', recommender: '민지' },
    { id: 3, title: '꽃을 보듯 너를 본다', quote: '사람은 누구나 섬이다...', recommender: '준호' },
  ];

  const badges = [
    { id: 1, emoji: '🌱', name: '첫 출석', earned: true },
    { id: 2, emoji: '🔥', name: '7일 연속', earned: true },
    { id: 3, emoji: '📚', name: '독서왕', earned: true },
    { id: 4, emoji: '🧘', name: '명상', earned: false },
    { id: 5, emoji: '💪', name: '운동', earned: false },
  ];

  const stats = [
    { label: '최장 연속일', value: '7', unit: '일' },
    { label: '완료 퀘스트', value: '42', unit: '개' },
    { label: '명상 횟수', value: '15', unit: '회' },
    { label: '목표 달성률', value: '68', unit: '%' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>자기계발</Text>
      </View>

      {/* 나의 명언 */}
      <View style={styles.card}>
        <Text style={styles.quoteChar}>"</Text>
        <Text style={styles.quoteText}>천천히 가도 괜찮아. 멈추지 않는 것이 중요해.</Text>
        <View style={styles.sourceRow}>
          {['책', '영상', '직접입력'].map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSource(s)}
              style={[styles.srcBtn, source === s ? styles.srcBtnOn : styles.srcBtnOff]}
            >
              <Text style={{ fontSize: 11, color: source === s ? 'white' : '#888888' }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.srcLabel}>
          {source === '책' ? '나미야 잡화점의 기적' : source === '영상' ? 'TED Talk' : ''}
        </Text>
      </View>

      {/* 또래 추천 */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>또래 추천 책 & 구절</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll} contentContainerStyle={styles.hScrollContent}>
        {recommendations.map((rec) => (
          <View key={rec.id} style={styles.recCard}>
            <View style={styles.recCover} />
            <Text style={styles.recTitle}>{rec.title}</Text>
            <Text style={styles.recQuote} numberOfLines={2}>"{rec.quote}"</Text>
            <Text style={styles.recRecommender}>{rec.recommender}님 추천</Text>
          </View>
        ))}
      </ScrollView>

      {/* 명상 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>명상</Text>
        <View style={styles.timeRow}>
          {[5, 10, 15, 20].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setMeditationTime(t)}
              style={[styles.timeBtn, meditationTime === t ? styles.timeBtnOn : styles.timeBtnOff]}
            >
              <Text style={{ fontSize: 13, color: meditationTime === t ? 'white' : '#888888' }}>{t}분</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.meditationCenter}>
          <TouchableOpacity style={styles.playBtn}>
            <Text style={styles.playIcon}>▶</Text>
          </TouchableOpacity>
          <Text style={styles.meditationCount}>오늘 명상 0회</Text>
        </View>
      </View>

      {/* 뱃지 */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>수집한 뱃지</Text>
        <Text style={styles.viewAll}>전체보기</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll} contentContainerStyle={styles.hScrollContent}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badgeItem}>
            <View style={[styles.badgeCircle, { backgroundColor: badge.earned ? '#E8F5E4' : '#F0F0F0' }]}>
              <Text style={{ fontSize: 24 }}>{badge.earned ? badge.emoji : '🔒'}</Text>
            </View>
            <Text style={[styles.badgeName, { color: badge.earned ? '#1E1E1E' : '#CCCCCC' }]}>{badge.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 최고 기록 */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>최고 기록</Text>
      </View>
      <View style={styles.statsGrid}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statLabel}>{s.label}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statUnit}>{s.unit}</Text>
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
  header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E1E1E' },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 24 },
  cardTitle: { fontSize: 15, fontWeight: '500', color: '#1E1E1E', marginBottom: 16 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '500', color: '#1E1E1E' },
  viewAll: { fontSize: 12, color: '#7DBF8A' },
  quoteChar: { fontSize: 48, color: '#E8F5E4', lineHeight: 48, marginBottom: 12 },
  quoteText: { fontSize: 16, color: '#1E1E1E', textAlign: 'center', lineHeight: 24, marginBottom: 16 },
  sourceRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 12 },
  srcBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  srcBtnOn: { backgroundColor: '#7DBF8A' },
  srcBtnOff: { backgroundColor: '#F5F5F5' },
  srcLabel: { fontSize: 12, color: '#AAAAAA', textAlign: 'center' },
  hScroll: { marginBottom: 24 },
  hScrollContent: { paddingHorizontal: 20, gap: 12 },
  recCard: { width: 160, backgroundColor: 'white', borderRadius: 16, padding: 16 },
  recCover: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#E8F5E4', marginBottom: 12, alignSelf: 'center' },
  recTitle: { fontSize: 13, fontWeight: '500', color: '#1E1E1E', marginBottom: 8, textAlign: 'center' },
  recQuote: { fontSize: 11, color: '#888888', marginBottom: 8 },
  recRecommender: { fontSize: 11, color: '#AAAAAA' },
  timeRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 24 },
  timeBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  timeBtnOn: { backgroundColor: '#7DBF8A' },
  timeBtnOff: { backgroundColor: '#F5F5F5' },
  meditationCenter: { alignItems: 'center' },
  playBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#7DBF8A', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  playIcon: { fontSize: 22, color: 'white', marginLeft: 4 },
  meditationCount: { fontSize: 12, color: '#AAAAAA' },
  badgeItem: { alignItems: 'center' },
  badgeCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  badgeName: { fontSize: 10 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 20, marginBottom: 24 },
  statCard: { width: '47%', backgroundColor: 'white', borderRadius: 16, padding: 16 },
  statLabel: { fontSize: 11, color: '#AAAAAA', marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1E1E1E' },
  statUnit: { fontSize: 13, color: '#7DBF8A' },
});
