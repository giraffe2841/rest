import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';

type InfoCard = {
  id: number;
  category: string;
  title: string;
  description: string;
  target: string;
  benefit: string;
  deadline?: string;
  views: number;
  bookmarks: number;
  isBookmarked: boolean;
  isNew?: boolean;
};

const FILTERS = ['전체', '취업지원', '생활지원', '교육훈련', '심리상담'] as const;
const SORTS = ['최신순', '마감임박', '혜택순'] as const;

const INFO_CARDS: InfoCard[] = [
  {
    id: 1,
    category: '취업지원',
    title: '청년 일자리 도약 장려금',
    description: '중소·중견기업 취업 청년에게 최대 1,200만원을 지원해드립니다. 6개월 이상 고용 유지 시 장려금이 지급됩니다.',
    target: '만 15~34세',
    benefit: '최대 1,200만원',
    deadline: 'D-7',
    views: 2841,
    bookmarks: 184,
    isBookmarked: true,
    isNew: true,
  },
  {
    id: 2,
    category: '생활지원',
    title: '청년 월세 한시 특별지원',
    description: '독립 거주 청년의 주거 부담을 줄이기 위해 월 최대 20만원을 최대 12개월간 지원합니다.',
    target: '만 19~34세',
    benefit: '월 최대 20만원',
    views: 1523,
    bookmarks: 97,
    isBookmarked: false,
  },
  {
    id: 3,
    category: '교육훈련',
    title: '국민내일배움카드',
    description: '구직자 및 재직자 누구나 신청 가능한 직업훈련 지원 카드. 원하는 강의를 골라 역량을 키워보세요.',
    target: '구직자·재직자',
    benefit: '최대 500만원 훈련비',
    views: 3107,
    bookmarks: 256,
    isBookmarked: true,
  },
  {
    id: 4,
    category: '심리상담',
    title: '청년 마음건강 지원사업',
    description: '전문 심리상담사와 함께 마음 건강을 돌볼 수 있습니다. 개인 맞춤형 상담 프로그램을 무료로 제공합니다.',
    target: '만 19~34세',
    benefit: '무료 심리상담',
    deadline: 'D-14',
    views: 891,
    bookmarks: 63,
    isBookmarked: false,
    isNew: true,
  },
  {
    id: 5,
    category: '취업지원',
    title: '청년 취업 아카데미',
    description: '대학교 재학·졸업생 대상으로 기업 연계형 교육을 제공합니다. 수료 후 채용 연계까지 지원합니다.',
    target: '만 18~34세',
    benefit: '교육비 전액 무료',
    views: 1204,
    bookmarks: 88,
    isBookmarked: false,
  },
];

const DETAIL_ROWS = [
  { label: '지원 대상', value: '만 15~34세 청년 중 구직 중인 자' },
  { label: '지원 혜택', value: '최대 1,200만원 (월 100만원 × 12개월)' },
  { label: '신청 방법', value: '온라인 신청 (worknet.go.kr)' },
  { label: '마감일', value: '2026년 6월 14일' },
];

export default function EmploymentScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [selectedSort, setSelectedSort] = useState<string>('최신순');
  const [selectedCard, setSelectedCard] = useState<InfoCard | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<number>>(
    new Set(INFO_CARDS.filter((c) => c.isBookmarked).map((c) => c.id))
  );
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = INFO_CARDS.filter(
    (c) => selectedFilter === '전체' || c.category === selectedFilter
  ).filter(
    (c) => query === '' || c.title.includes(query) || c.description.includes(query)
  );

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>고용정보</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>저장 {bookmarked.size}개</Text>
          </View>
        </View>

        {/* 검색 */}
        <View style={styles.searchBar}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="제도명, 지원 대상으로 검색"
            placeholderTextColor="#AAAAAA"
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.searchClear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 필터 + 정렬 */}
        <View style={styles.filterRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChips}
          >
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setSelectedFilter(f)}
                style={[styles.filterChip, selectedFilter === f && styles.filterChipOn]}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, selectedFilter === f && styles.filterChipTextOn]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() => {
              const idx = SORTS.indexOf(selectedSort as any);
              setSelectedSort(SORTS[(idx + 1) % SORTS.length]);
            }}
          >
            <Text style={styles.sortBtnText}>{selectedSort} ∨</Text>
          </TouchableOpacity>
        </View>

        {/* 알림 배너 */}
        <TouchableOpacity
          style={[styles.alertBanner, alertSubscribed && styles.alertBannerOn]}
          onPress={() => setAlertSubscribed(!alertSubscribed)}
          activeOpacity={0.85}
        >
          <Text style={[styles.alertBannerText, alertSubscribed && styles.alertBannerTextOn]}>
            {alertSubscribed ? '✓  새 지원사업 알림 수신 중' : '새 지원사업 알림 신청'}
          </Text>
        </TouchableOpacity>

        {/* 결과 수 */}
        <View style={styles.resultRow}>
          <Text style={styles.resultText}>총 <Text style={styles.resultCount}>{filtered.length}개</Text> 제도</Text>
        </View>

        {/* 리스트 */}
        <View style={styles.listCard}>
          {filtered.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => setSelectedCard(card)}
              activeOpacity={0.85}
            >
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.listItem}>
                {/* 상단: 카테고리 + 마감 */}
                <View style={styles.listItemTop}>
                  <View style={styles.catPill}>
                    <Text style={styles.catPillText}>{card.category}</Text>
                  </View>
                  <View style={styles.listItemTopRight}>
                    {card.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                      </View>
                    )}
                    {card.deadline ? (
                      <View style={styles.deadlinePill}>
                        <Text style={styles.deadlineText}>{card.deadline}</Text>
                      </View>
                    ) : (
                      <View style={styles.ongoingPill}>
                        <Text style={styles.ongoingText}>상시</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* 제목 */}
                <Text style={styles.listItemTitle}>{card.title}</Text>

                {/* 설명 */}
                <Text style={styles.listItemDesc} numberOfLines={2}>{card.description}</Text>

                {/* 지원 정보 */}
                <View style={styles.infoChips}>
                  <View style={styles.infoChip}>
                    <Text style={styles.infoChipLabel}>대상  </Text>
                    <Text style={styles.infoChipValue}>{card.target}</Text>
                  </View>
                  <View style={styles.infoChipDot} />
                  <View style={styles.infoChip}>
                    <Text style={styles.infoChipLabel}>혜택  </Text>
                    <Text style={styles.infoChipValue}>{card.benefit}</Text>
                  </View>
                </View>

                {/* 하단: 조회수 + 북마크 */}
                <View style={styles.listItemBottom}>
                  <Text style={styles.metaText}>조회 {card.views.toLocaleString()}  ·  저장 {card.bookmarks}</Text>
                  <TouchableOpacity
                    onPress={(e) => { e.stopPropagation?.(); toggleBookmark(card.id); }}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={[styles.bookmarkIcon, bookmarked.has(card.id) && styles.bookmarkIconOn]}>
                      {bookmarked.has(card.id) ? '저장됨' : '저장'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* 상세 바텀 시트 */}
      <Modal visible={!!selectedCard} animationType="slide" transparent>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setSelectedCard(null)}
          activeOpacity={1}
        >
          <TouchableOpacity activeOpacity={1} style={styles.sheet}>
            <View style={styles.handle} />

            <View style={styles.sheetCatRow}>
              <View style={styles.catPill}>
                <Text style={styles.catPillText}>{selectedCard?.category}</Text>
              </View>
              {selectedCard?.deadline && (
                <View style={styles.deadlinePill}>
                  <Text style={styles.deadlineText}>{selectedCard.deadline}</Text>
                </View>
              )}
            </View>

            <Text style={styles.sheetTitle}>{selectedCard?.title}</Text>
            <Text style={styles.sheetDesc}>{selectedCard?.description}</Text>

            <View style={styles.detailRows}>
              {DETAIL_ROWS.map((row) => (
                <View key={row.label} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{row.label}</Text>
                  <Text style={styles.detailValue}>{row.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sheetActions}>
              <TouchableOpacity
                style={styles.bookmarkBtn}
                onPress={() => selectedCard && toggleBookmark(selectedCard.id)}
              >
                <Text style={[
                  styles.bookmarkBtnText,
                  selectedCard && bookmarked.has(selectedCard.id) && styles.bookmarkBtnTextOn,
                ]}>
                  {selectedCard && bookmarked.has(selectedCard.id) ? '저장됨' : '저장'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>신청하러 가기 →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
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

  // 검색
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderWidth: 0.5,
    borderColor: '#E0E0D8',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1E1E1E' },
  searchClear: { fontSize: 14, color: '#AAAAAA', paddingLeft: 8 },

  // 필터
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 16,
  },
  filterChips: { paddingLeft: 20, gap: 8, paddingRight: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#E0E0D8',
  },
  filterChipOn: { backgroundColor: '#1E1E1E', borderColor: '#1E1E1E' },
  filterChipText: { fontSize: 13, color: '#888888' },
  filterChipTextOn: { color: 'white', fontWeight: '500' },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  sortBtnText: { fontSize: 12, color: '#555555' },

  // 알림 배너
  alertBanner: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7DBF8A',
    alignItems: 'center',
  },
  alertBannerOn: {
    backgroundColor: '#E8F5E4',
    borderColor: '#7DBF8A',
  },
  alertBannerText: { fontSize: 14, color: '#7DBF8A', fontWeight: '500' },
  alertBannerTextOn: { color: '#4A9E5C' },

  // 결과 수
  resultRow: { paddingHorizontal: 20, marginBottom: 10 },
  resultText: { fontSize: 12, color: '#AAAAAA' },
  resultCount: { color: '#4A9E5C', fontWeight: '600' },

  // 리스트 카드
  listCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  divider: { height: 0.5, backgroundColor: '#F0F0EC', marginHorizontal: 16 },
  listItem: { padding: 16 },

  listItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemTopRight: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  listItemDesc: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 19,
    marginBottom: 10,
  },

  // 배지
  catPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#E8F5E4',
  },
  catPillText: { fontSize: 11, color: '#4A9E5C', fontWeight: '500' },
  newBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#FFF0E0',
  },
  newBadgeText: { fontSize: 10, color: '#E08030', fontWeight: '700' },
  deadlinePill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#FDECEA',
  },
  deadlineText: { fontSize: 11, color: '#C0392B', fontWeight: '600' },
  ongoingPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
  },
  ongoingText: { fontSize: 11, color: '#888888' },

  // 지원 정보 칩
  infoChips: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  infoChip: { flexDirection: 'row', alignItems: 'center' },
  infoChipLabel: { fontSize: 11, color: '#AAAAAA' },
  infoChipValue: { fontSize: 11, color: '#555555', fontWeight: '500' },
  infoChipDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D0D0D0',
  },

  // 하단 메타
  listItemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: { fontSize: 11, color: '#AAAAAA' },
  bookmarkIcon: { fontSize: 12, color: '#BBBBBB' },
  bookmarkIconOn: { color: '#7DBF8A', fontWeight: '600' },

  // 모달
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.32)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0D8',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetCatRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 10,
  },
  sheetDesc: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 20,
    marginBottom: 20,
  },
  detailRows: { gap: 14, marginBottom: 24 },
  detailRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    width: 56,
    paddingTop: 1,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#1E1E1E',
    lineHeight: 20,
  },
  sheetActions: { flexDirection: 'row', gap: 10 },
  bookmarkBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0D8',
    alignItems: 'center',
  },
  bookmarkBtnText: { fontSize: 14, color: '#BBBBBB' },
  bookmarkBtnTextOn: { color: '#7DBF8A', fontWeight: '500' },
  applyBtn: {
    flex: 2,
    backgroundColor: '#7DBF8A',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  applyBtnText: { fontSize: 14, color: 'white', fontWeight: '600' },
});
