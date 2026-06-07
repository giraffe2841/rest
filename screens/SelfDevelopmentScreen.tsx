import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const SOURCES = ['책', '영상', '직접입력'] as const;
type Source = typeof SOURCES[number];

const RECOMMENDATIONS = [
  { id: 1, title: '데미안', quote: '새는 알을 깨고 나온다. 알은 세계다.', recommender: '하윤서', color: '#D4E8D0' },
  { id: 2, title: '아몬드', quote: '감정이 없는 것이 아니라, 다를 뿐이야.', recommender: '박도현', color: '#C8DFF5' },
  { id: 3, title: '꽃을 보듯 너를 본다', quote: '사람은 누구나 섬이다.', recommender: '이서진', color: '#F5E4D0' },
];

const BADGES = [
  { id: 1, emoji: '🌱', name: '첫 출석', earned: true },
  { id: 2, emoji: '🔥', name: '7일 연속', earned: true },
  { id: 3, emoji: '📚', name: '독서왕', earned: true },
  { id: 4, emoji: '🧘', name: '명상', earned: false },
  { id: 5, emoji: '💪', name: '운동', earned: false },
];

const STATS = [
  { label: '최장 연속일', value: '7', unit: '일' },
  { label: '완료 퀘스트', value: '42', unit: '개' },
  { label: '명상 횟수', value: '15', unit: '회' },
  { label: '목표 달성률', value: '68', unit: '%' },
];

export default function SelfDevelopmentScreen() {
  const [source, setSource] = useState<Source>('책');
  const [quoteInput, setQuoteInput] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>자기계발</Text>
        <View style={styles.questBadge}>
          <Text style={styles.questBadgeText}>📚 퀘스트 42개</Text>
        </View>
      </View>

      {/* 오늘의 명언 */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle}>오늘의 명언</Text>
          <View style={styles.sourceRow}>
            {SOURCES.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSource(s)}
                style={[styles.srcBtn, source === s && styles.srcBtnOn]}
                activeOpacity={0.7}
              >
                <Text style={[styles.srcBtnText, source === s && styles.srcBtnTextOn]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteOpenMark}>"</Text>
          {source === '직접입력' ? (
            <TextInput
              value={quoteInput}
              onChangeText={setQuoteInput}
              placeholder="나만의 명언을 입력해보세요"
              placeholderTextColor="#AAAAAA"
              style={styles.quoteInput}
              multiline
            />
          ) : (
            <Text style={styles.quoteText}>
              천천히 가도 괜찮아.{'\n'}멈추지 않는 것이 중요해.
            </Text>
          )}
        </View>

        <View style={styles.quoteMeta}>
          <View style={styles.catPill}>
            <Text style={styles.catPillText}>
              {source === '책' ? '나미야 잡화점의 기적' : source === '영상' ? 'TED Talk' : '직접 입력'}
            </Text>
          </View>
        </View>
      </View>

      {/* 또래 추천 */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>또래 추천 책 & 구절</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>전체보기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hScroll}
        contentContainerStyle={styles.hScrollContent}
      >
        {RECOMMENDATIONS.map((rec) => (
          <TouchableOpacity key={rec.id} style={styles.recCard} activeOpacity={0.85}>
            <View style={[styles.recCover, { backgroundColor: rec.color }]}>
              <Text style={styles.recCoverEmoji}>📖</Text>
            </View>
            <Text style={styles.recTitle}>{rec.title}</Text>
            <Text style={styles.recQuote} numberOfLines={2}>"{rec.quote}"</Text>
            <View style={styles.recFooter}>
              <View style={styles.avatarDot} />
              <Text style={styles.recRecommender}>{rec.recommender}님</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 수집한 뱃지 */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>수집한 뱃지</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>전체보기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hScroll}
        contentContainerStyle={styles.hScrollContent}
      >
        {BADGES.map((badge) => (
          <View key={badge.id} style={styles.badgeItem}>
            <View style={[styles.badgeCircle, badge.earned ? styles.badgeEarned : styles.badgeLocked]}>
              <Text style={styles.badgeEmoji}>{badge.earned ? badge.emoji : '🔒'}</Text>
            </View>
            <Text style={[styles.badgeName, !badge.earned && styles.badgeNameLocked]}>
              {badge.name}
            </Text>
          </View>
        ))}
      </ScrollView>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  content: {
    paddingBottom: 40,
  },

  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  questBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#E8F5E4',
  },
  questBadgeText: {
    fontSize: 12,
    color: '#4A9E5C',
    fontWeight: '500',
  },

  // 공통 카드
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  // 섹션 헤더
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E1E1E',
  },
  viewAll: {
    fontSize: 12,
    color: '#7DBF8A',
  },

  // 명언
  sourceRow: {
    flexDirection: 'row',
    gap: 6,
  },
  srcBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  srcBtnOn: {
    backgroundColor: '#7DBF8A',
  },
  srcBtnText: {
    fontSize: 11,
    color: '#888888',
  },
  srcBtnTextOn: {
    color: 'white',
    fontWeight: '500',
  },
  quoteBox: {
    backgroundColor: '#FAF8F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  quoteOpenMark: {
    fontSize: 36,
    color: '#E8F5E4',
    lineHeight: 36,
    marginBottom: 4,
  },
  quoteText: {
    fontSize: 16,
    color: '#1E1E1E',
    lineHeight: 26,
    fontWeight: '500',
  },
  quoteInput: {
    fontSize: 15,
    color: '#1E1E1E',
    lineHeight: 24,
    minHeight: 60,
  },
  quoteMeta: {
    flexDirection: 'row',
  },
  catPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#E8F5E4',
  },
  catPillText: {
    fontSize: 11,
    color: '#4A9E5C',
  },

  // 또래 추천
  hScroll: {
    marginBottom: 24,
  },
  hScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  recCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  recCover: {
    width: '100%',
    height: 88,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recCoverEmoji: {
    fontSize: 32,
  },
  recTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  recQuote: {
    fontSize: 11,
    color: '#888888',
    lineHeight: 16,
    marginBottom: 10,
  },
  recFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatarDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E8F5E4',
  },
  recRecommender: {
    fontSize: 11,
    color: '#AAAAAA',
  },

  // 뱃지
  badgeItem: {
    alignItems: 'center',
    gap: 6,
  },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEarned: {
    backgroundColor: '#E8F5E4',
  },
  badgeLocked: {
    backgroundColor: '#F5F5F5',
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeName: {
    fontSize: 10,
    color: '#1E1E1E',
  },
  badgeNameLocked: {
    color: '#CCCCCC',
  },

  // 기록
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  statLabel: {
    fontSize: 11,
    color: '#AAAAAA',
    marginBottom: 8,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  statUnit: {
    fontSize: 13,
    color: '#7DBF8A',
  },
});
