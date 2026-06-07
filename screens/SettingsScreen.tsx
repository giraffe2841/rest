import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';

const TAGS = ['#취업준비', '#자기계발', '#생활습관'];

const STATS = [
  { label: '연속 출석', value: '7', unit: '일' },
  { label: '완료 퀘스트', value: '42', unit: '개' },
  { label: '목표 달성률', value: '68', unit: '%' },
];

export default function SettingsScreen() {
  const [notifRoutine, setNotifRoutine] = useState(true);
  const [notifFriend, setNotifFriend] = useState(false);
  const [notifInfo, setNotifInfo] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <TouchableOpacity style={styles.gearBtn}>
          <Text style={styles.gearIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* 프로필 카드 */}
      <View style={styles.profileCard}>
        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>지민</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>지민</Text>
            <Text style={styles.profileGoal}>30일 안에 규칙적인 생활 되찾기</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>편집</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tagRow}>
          <Text style={styles.tagLabel}>나의 관심사</Text>
          <View style={styles.tags}>
            {TAGS.map((tag) => (
              <Text key={tag} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* 스탯 */}
      <View style={styles.statsCard}>
        {STATS.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <View style={styles.statDivider} />}
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statUnit}>{s.unit}</Text>
              </View>
            </View>
          </React.Fragment>
        ))}
      </View>

      {/* 내 활동 */}
      <Text style={styles.sectionLabel}>내 활동</Text>
      <View style={styles.menuCard}>
        <MenuItem label="나의 루틴" value="12개" />
        <MenuDivider />
        <MenuItem label="저장한 지원사업" value="3개" />
        <MenuDivider />
        <MenuItem label="완료한 퀘스트" value="42개" />
      </View>

      {/* 알림 */}
      <Text style={styles.sectionLabel}>알림</Text>
      <View style={styles.menuCard}>
        <ToggleItem
          label="루틴 알림"
          desc="설정한 시간에 루틴을 알려드려요"
          value={notifRoutine}
          onChange={setNotifRoutine}
        />
        <MenuDivider />
        <ToggleItem
          label="친구 소식"
          desc="친구의 달성 소식을 알려드려요"
          value={notifFriend}
          onChange={setNotifFriend}
        />
        <MenuDivider />
        <ToggleItem
          label="지원사업 마감 알림"
          desc="마감 3일 전에 알림을 드려요"
          value={notifInfo}
          onChange={setNotifInfo}
        />
      </View>

      {/* 앱 설정 */}
      <Text style={styles.sectionLabel}>앱 설정</Text>
      <View style={styles.menuCard}>
        <MenuItem label="공지사항" />
        <MenuDivider />
        <MenuItem label="개인정보 처리방침" />
        <MenuDivider />
        <MenuItem label="이용약관" />
        <MenuDivider />
        <MenuItem label="앱 버전" value="1.0.0" arrow={false} />
      </View>

      {/* 로그아웃 */}
      <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

function MenuItem({
  label,
  value,
  arrow = true,
}: {
  label: string;
  value?: string;
  arrow?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
      <Text style={styles.menuLabel}>{label}</Text>
      <View style={styles.menuRight}>
        {value && <Text style={styles.menuValue}>{value}</Text>}
        {arrow && <Text style={styles.menuArrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

function MenuDivider() {
  return <View style={styles.menuDivider} />;
}

function ToggleItem({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleLeft}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.toggleDesc}>{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#E0E0D8', true: '#A8D5A2' }}
        thumbColor={value ? '#7DBF8A' : '#FFFFFF'}
        ios_backgroundColor="#E0E0D8"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  content: { paddingBottom: 48 },

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
  gearBtn: { padding: 4 },
  gearIcon: { fontSize: 22, color: '#888888' },

  // 프로필 카드
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 20,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '600', color: '#4A9E5C' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '700', color: '#1E1E1E', marginBottom: 4 },
  profileGoal: { fontSize: 12, color: '#888888', lineHeight: 17 },
  editBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0D8',
  },
  editBtnText: { fontSize: 12, color: '#555555' },
  tagLabel: { fontSize: 12, color: '#AAAAAA', marginBottom: 8 },
  tagRow: {},
  tags: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  tag: { fontSize: 13, color: '#4A9E5C', fontWeight: '500' },

  // 스탯
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 0.5, backgroundColor: '#E0E0D8', marginVertical: 4 },
  statLabel: { fontSize: 11, color: '#AAAAAA', marginBottom: 6 },
  statValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#1E1E1E' },
  statUnit: { fontSize: 12, color: '#7DBF8A' },

  // 섹션 라벨
  sectionLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '500',
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 4,
  },

  // 메뉴 카드
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuDivider: { height: 0.5, backgroundColor: '#F0F0EC', marginHorizontal: 16 },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  menuLabel: { fontSize: 14, color: '#1E1E1E' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  menuValue: { fontSize: 13, color: '#7DBF8A', fontWeight: '500' },
  menuArrow: { fontSize: 18, color: '#BBBBBB', lineHeight: 20 },

  // 토글 행
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  toggleLeft: { flex: 1, marginRight: 12 },
  toggleDesc: { fontSize: 12, color: '#AAAAAA', marginTop: 2 },

  // 로그아웃
  logoutBtn: {
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0D8',
  },
  logoutText: { fontSize: 14, color: '#AAAAAA' },
});
