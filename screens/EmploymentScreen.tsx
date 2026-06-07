import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';

type InfoCard = {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  deadline?: string;
  isBookmarked: boolean;
};

export default function EmploymentScreen() {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [selectedCard, setSelectedCard] = useState<InfoCard | null>(null);

  const filters = ['전체', '취업지원', '생활지원', '교육훈련', '심리상담'];

  const infoCards: InfoCard[] = [
    { id: 1, category: '취업지원', title: '청년 일자리 도약 장려금', subtitle: '만 15~34세 · 최대 1,200만원 지원', deadline: 'D-7', isBookmarked: true },
    { id: 2, category: '생활지원', title: '청년 월세 한시 특별지원', subtitle: '만 19~34세 · 월 최대 20만원', isBookmarked: false },
    { id: 3, category: '교육훈련', title: '국민내일배움카드', subtitle: '구직자 · 최대 500만원 훈련비', isBookmarked: true },
    { id: 4, category: '심리상담', title: '청년 마음건강 지원사업', subtitle: '만 19~34세 · 무료 심리상담', deadline: 'D-14', isBookmarked: false },
  ];

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>고용정보</Text>
        </View>

        {/* 검색 */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="제도명, 지역으로 검색"
            placeholderTextColor="#AAAAAA"
            style={styles.searchInput}
          />
        </View>

        {/* 필터 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setSelectedFilter(f)}
              style={[styles.filterChip, selectedFilter === f ? styles.filterChipOn : styles.filterChipOff]}
            >
              <Text style={{ fontSize: 13, color: selectedFilter === f ? 'white' : '#888888' }}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 카드 목록 */}
        <View style={styles.cardsContainer}>
          {infoCards.map((card) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={styles.catBadge}>
                  <Text style={styles.catText}>{card.category}</Text>
                </View>
                {card.deadline ? (
                  <View style={styles.deadlineBadge}><Text style={styles.deadlineText}>{card.deadline}</Text></View>
                ) : (
                  <View style={styles.ongoingBadge}><Text style={styles.ongoingText}>상시</Text></View>
                )}
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              <View style={styles.cardBottom}>
                <TouchableOpacity onPress={() => setSelectedCard(card)}>
                  <Text style={styles.detailBtn}>자세히 보기 →</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: card.isBookmarked ? '#7DBF8A' : '#BBBBBB' }}>
                  {card.isBookmarked ? '♥' : '♡'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 상세 모달 */}
      <Modal visible={!!selectedCard} animationType="slide" transparent>
        <TouchableOpacity style={styles.overlay} onPress={() => setSelectedCard(null)} activeOpacity={1}>
          <TouchableOpacity activeOpacity={1} style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>{selectedCard?.title}</Text>
            <View style={styles.infoRows}>
              {[
                { label: '대상', value: '만 15~34세 청년 중 구직 중인 자' },
                { label: '혜택', value: '최대 1,200만원 지원 (월 100만원 × 12개월)' },
                { label: '신청방법', value: '온라인 신청 (worknet.go.kr)' },
                { label: '마감일', value: '2025년 6월 14일' },
              ].map((row) => (
                <View key={row.label}>
                  <Text style={styles.infoLabel}>{row.label}</Text>
                  <Text style={styles.infoValue}>{row.value}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>신청하러 가기 →</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  content: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E1E1E' },
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 16, borderWidth: 0.5, borderColor: '#E0E0D8', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white' },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 13, color: '#1E1E1E' },
  filtersScroll: { marginBottom: 16 },
  filtersContent: { paddingHorizontal: 20, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  filterChipOn: { backgroundColor: '#7DBF8A' },
  filterChipOff: { backgroundColor: 'white', borderWidth: 0.5, borderColor: '#E0E0D8' },
  cardsContainer: { paddingHorizontal: 20, gap: 12 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, borderWidth: 0.5, borderColor: '#E0E0D8', marginBottom: 12 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  catBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, backgroundColor: '#E8F5E4' },
  catText: { fontSize: 11, color: '#4A9E5C' },
  deadlineBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, backgroundColor: '#FDECEA' },
  deadlineText: { fontSize: 11, color: '#C0392B' },
  ongoingBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, backgroundColor: '#F0F0F0' },
  ongoingText: { fontSize: 11, color: '#888888' },
  cardTitle: { fontSize: 15, fontWeight: '500', color: '#1E1E1E', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#888888', marginBottom: 12 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailBtn: { fontSize: 12, color: '#7DBF8A' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#E0E0D8', alignSelf: 'center', marginBottom: 24 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 24 },
  infoRows: { gap: 16, marginBottom: 24 },
  infoLabel: { fontSize: 12, color: '#AAAAAA', marginBottom: 4 },
  infoValue: { fontSize: 14, color: '#1E1E1E' },
  applyBtn: { backgroundColor: '#7DBF8A', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  applyBtnText: { fontSize: 14, color: 'white' },
});
