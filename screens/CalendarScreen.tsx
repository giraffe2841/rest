import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const DAY_KR = ['일', '월', '화', '수', '목', '금', '토'];

function getWeekDates(base: Date): Date[] {
  const sunday = new Date(base);
  sunday.setDate(base.getDate() - base.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const ROUTINES = [
  {
    id: 1,
    time: '09:00',
    title: '아침 루틴',
    category: '건강',
    tasks: [
      { id: 1, text: '기상 후 물 한 잔 마시기', done: true },
      { id: 2, text: '10분 스트레칭', done: true },
      { id: 3, text: '오늘 할 일 메모하기', done: false },
    ],
  },
  {
    id: 2,
    time: '20:00',
    title: '내일 할 일 하나 정하기',
    category: '자기계발',
    tasks: [
      { id: 1, text: '종이, 펜 or 메모앱 준비하기', done: false },
      { id: 2, text: '해야할 일 쭉 써보기', done: true },
      { id: 3, text: '정말 해야할 일 하나만 일단 해보기', done: true },
    ],
  },
];

export default function CalendarScreen() {
  const today = new Date();
  const [weekBase, setWeekBase] = useState(today);
  const [selected, setSelected] = useState(today);

  const weekDates = getWeekDates(weekBase);
  const year = weekBase.getFullYear();
  const month = weekBase.getMonth() + 1;

  const prevWeek = () => {
    const d = new Date(weekBase);
    d.setDate(d.getDate() - 7);
    setWeekBase(d);
  };

  const nextWeek = () => {
    const d = new Date(weekBase);
    d.setDate(d.getDate() + 7);
    setWeekBase(d);
  };

  const completedCount = ROUTINES.reduce(
    (acc, r) => acc + r.tasks.filter((t) => t.done).length,
    0
  );
  const totalCount = ROUTINES.reduce((acc, r) => acc + r.tasks.length, 0);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>캘린더</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🌿 7일 연속</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* 주간 캘린더 카드 */}
        <View style={styles.card}>
          <View style={styles.monthRow}>
            <Text style={styles.monthText}>{year}년 {month}월</Text>
            <View style={styles.arrowGroup}>
              <TouchableOpacity onPress={prevWeek} style={styles.arrowBtn}>
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextWeek} style={styles.arrowBtn}>
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekRow}>
            {weekDates.map((d, i) => {
              const isToday = isSameDay(d, today);
              const isSel = isSameDay(d, selected);
              const isSunday = d.getDay() === 0;
              const isSaturday = d.getDay() === 6;

              return (
                <TouchableOpacity
                  key={i}
                  style={styles.dayCol}
                  onPress={() => setSelected(d)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.dayLabel,
                    isToday && styles.dayLabelToday,
                    isSunday && styles.dayLabelSun,
                    isSaturday && styles.dayLabelSat,
                  ]}>
                    {isToday ? '오늘' : DAY_KR[d.getDay()]}
                  </Text>
                  <View style={[
                    styles.dayCircle,
                    isSel && styles.dayCircleSel,
                    isToday && !isSel && styles.dayCircleToday,
                  ]}>
                    <Text style={[
                      styles.dayNum,
                      isSel && styles.dayNumSel,
                      isToday && !isSel && styles.dayNumToday,
                    ]}>
                      {d.getDate()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 오늘 달성률 카드 */}
        <View style={styles.progressCard}>
          <View style={styles.progressLeft}>
            <Text style={styles.progressLabel}>오늘의 달성률</Text>
            <Text style={styles.progressValue}>
              {completedCount}/{totalCount}
              <Text style={styles.progressUnit}> 완료</Text>
            </Text>
          </View>
          <View style={styles.progressBarWrap}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${(completedCount / totalCount) * 100}%` as any }]} />
            </View>
            <Text style={styles.progressPercent}>{Math.round((completedCount / totalCount) * 100)}%</Text>
          </View>
        </View>

        {/* 루틴 리스트 */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>루틴 리스트</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>더보기</Text>
          </TouchableOpacity>
        </View>

        {ROUTINES.map((routine) => {
          const doneCount = routine.tasks.filter((t) => t.done).length;
          return (
            <View key={routine.id} style={styles.routineRow}>
              <View style={styles.timeLine}>
                <Text style={styles.routineTime}>{routine.time}</Text>
                <View style={styles.timeLineBar} />
              </View>
              <View style={styles.routineCard}>
                <View style={styles.routineCardTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.routineName}>{routine.title}</Text>
                    <View style={styles.catPill}>
                      <Text style={styles.catText}>{routine.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.routineCount}>{doneCount}/{routine.tasks.length}</Text>
                </View>
                <View style={styles.divider} />
                {routine.tasks.map((task) => (
                  <View key={task.id} style={styles.taskRow}>
                    <View style={[styles.taskCircle, task.done && styles.taskCircleDone]}>
                      {task.done && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                    <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                      {task.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
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
  streakBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#E8F5E4',
  },
  streakText: {
    fontSize: 12,
    color: '#4A9E5C',
    fontWeight: '500',
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  // 카드
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },

  // 월 네비게이션
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  arrowGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#555555',
    lineHeight: 22,
  },

  // 주간 스트립
  weekRow: {
    flexDirection: 'row',
  },
  dayCol: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 11,
    color: '#AAAAAA',
    fontWeight: '500',
  },
  dayLabelToday: {
    color: '#4A9E5C',
    fontWeight: '600',
  },
  dayLabelSun: {
    color: '#E07070',
  },
  dayLabelSat: {
    color: '#7090D0',
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSel: {
    backgroundColor: '#7DBF8A',
  },
  dayCircleToday: {
    backgroundColor: '#E8F5E4',
  },
  dayNum: {
    fontSize: 14,
    color: '#1E1E1E',
    fontWeight: '500',
  },
  dayNumSel: {
    color: 'white',
    fontWeight: '700',
  },
  dayNumToday: {
    color: '#4A9E5C',
    fontWeight: '700',
  },

  // 달성률 카드
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressLeft: {
    flex: 1,
  },
  progressLabel: {
    fontSize: 11,
    color: '#AAAAAA',
    marginBottom: 6,
  },
  progressValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  progressUnit: {
    fontSize: 13,
    color: '#7DBF8A',
    fontWeight: '400',
  },
  progressBarWrap: {
    flex: 1,
    gap: 6,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E8F5E4',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#7DBF8A',
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 12,
    color: '#4A9E5C',
    fontWeight: '600',
    textAlign: 'right',
  },

  // 섹션 헤더
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  // 루틴 아이템
  routineRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  timeLine: {
    alignItems: 'center',
    width: 44,
    paddingTop: 4,
  },
  routineTime: {
    fontSize: 11,
    color: '#AAAAAA',
    fontWeight: '500',
    marginBottom: 6,
  },
  timeLineBar: {
    flex: 1,
    width: 1,
    backgroundColor: '#E0E0D8',
    minHeight: 40,
  },
  routineCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  routineCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  routineName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  catPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#E8F5E4',
  },
  catText: {
    fontSize: 11,
    color: '#4A9E5C',
  },
  routineCount: {
    fontSize: 13,
    color: '#7DBF8A',
    fontWeight: '600',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#E0E0D8',
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  taskCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCircleDone: {
    backgroundColor: '#7DBF8A',
    borderColor: '#7DBF8A',
  },
  checkMark: {
    fontSize: 10,
    color: 'white',
    fontWeight: '700',
  },
  taskText: {
    fontSize: 13,
    color: '#555555',
    flex: 1,
  },
  taskTextDone: {
    color: '#BBBBBB',
    textDecorationLine: 'line-through',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#7DBF8A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7DBF8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 26,
    color: 'white',
    lineHeight: 30,
    fontWeight: '300',
  },
});
