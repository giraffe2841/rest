import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function CalendarScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<30 | 60 | 90>(30);
  const todos = [
    { id: 1, name: '자기소개서 작성', completed: false, category: '취업', failed: false },
    { id: 2, name: '포트폴리오 업데이트', completed: true, category: '자기계발', failed: false },
    { id: 3, name: '운동 30분', completed: false, category: '건강', failed: true },
  ];

  const daysInMonth = 30;
  const startDay = 2;
  const completedDays = [1, 2, 3, 5, 6, 7, 10];
  const partialDays = [4, 8];
  const today = 7;
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>캘린더</Text>
      </View>

      {/* 기간 선택 */}
      <View style={styles.periodRow}>
        {[30, 60, 90].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setSelectedPeriod(p as 30 | 60 | 90)}
            style={[styles.periodBtn, selectedPeriod === p ? styles.periodBtnOn : styles.periodBtnOff]}
          >
            <Text style={{ fontSize: 13, color: selectedPeriod === p ? 'white' : '#BBBBBB' }}>{p}일</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 달력 */}
      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.dayLabelsRow}>
            {dayLabels.map((d) => (
              <View key={d} style={styles.dayLabelCell}>
                <Text style={styles.dayLabel}>{d}</Text>
              </View>
            ))}
          </View>
          <View style={styles.grid}>
            {Array.from({ length: startDay }).map((_, i) => <View key={`e${i}`} style={styles.dayCell} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isCompleted = completedDays.includes(day);
              const isPartial = partialDays.includes(day);
              const isToday = day === today;
              return (
                <View key={day} style={styles.dayCell}>
                  <View style={[
                    styles.dayCircle,
                    isCompleted && styles.dayCircleCompleted,
                    isToday && styles.dayCircleToday,
                    isPartial && styles.dayCirclePartial,
                  ]}>
                    <Text style={[styles.dayText, isCompleted && styles.dayTextWhite]}>{day}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#7DBF8A' }]} /><Text style={styles.legendLabel}>완료</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDotOutline, { borderColor: '#A8D5A2' }]} /><Text style={styles.legendLabel}>부분</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDotOutline, { borderColor: '#1E1E1E' }]} /><Text style={styles.legendLabel}>오늘</Text></View>
          </View>
        </View>
      </View>

      {/* 목표 세우기 */}
      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>목표 세우기</Text>
          <TextInput placeholder="목표 입력" placeholderTextColor="#AAAAAA" style={styles.input} />
          <View style={styles.dayBtnsRow}>
            {[30, 60, 90].map((d) => (
              <TouchableOpacity key={d} style={styles.dayBtn}>
                <Text style={styles.dayBtnText}>{d}일</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.aiBtn}>
            <Text style={styles.aiBtnText}>AI 계획 만들기 →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 오늘 할 일 */}
      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>오늘 할 일</Text>
          {todos.map((todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <View style={styles.todoRow}>
                <View style={[styles.checkbox, todo.completed && styles.checkboxOn]}>
                  {todo.completed && <Text style={{ color: 'white', fontSize: 10 }}>✓</Text>}
                </View>
                <Text style={[styles.todoText, todo.completed && styles.todoTextDone]}>{todo.name}</Text>
                <View style={styles.catBadge}><Text style={styles.catText}>{todo.category}</Text></View>
              </View>
              {todo.failed && <Text style={styles.retryText}>다시 시도해봐요 💚</Text>}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  content: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E1E1E' },
  periodRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 24, paddingHorizontal: 20 },
  periodBtn: { paddingHorizontal: 24, paddingVertical: 8, borderRadius: 20 },
  periodBtnOn: { backgroundColor: '#7DBF8A' },
  periodBtnOff: { backgroundColor: 'white', borderWidth: 1, borderColor: '#BBBBBB' },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20 },
  cardTitle: { fontSize: 15, fontWeight: '500', color: '#1E1E1E', marginBottom: 16 },
  dayLabelsRow: { flexDirection: 'row', marginBottom: 12 },
  dayLabelCell: { flex: 1, alignItems: 'center' },
  dayLabel: { fontSize: 11, color: '#AAAAAA' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', alignItems: 'center', marginBottom: 8 },
  dayCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  dayCircleCompleted: { backgroundColor: '#7DBF8A' },
  dayCircleToday: { borderWidth: 1, borderColor: '#1E1E1E' },
  dayCirclePartial: { borderWidth: 2, borderColor: '#A8D5A2' },
  dayText: { fontSize: 13, color: '#1E1E1E' },
  dayTextWhite: { color: 'white' },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 16, paddingTop: 16, borderTopWidth: 0.5, borderTopColor: '#E0E0D8' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendDotOutline: { width: 12, height: 12, borderRadius: 6, borderWidth: 2 },
  legendLabel: { fontSize: 10, color: '#888888' },
  input: { borderWidth: 0.5, borderColor: '#E0E0D8', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 13, marginBottom: 12, color: '#1E1E1E' },
  dayBtnsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  dayBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center' },
  dayBtnText: { fontSize: 13, color: '#888888' },
  aiBtn: { backgroundColor: '#7DBF8A', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  aiBtnText: { fontSize: 14, color: 'white' },
  todoItem: { marginBottom: 12 },
  todoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#E0E0D8', alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: '#7DBF8A', borderColor: '#7DBF8A' },
  todoText: { flex: 1, fontSize: 13, color: '#1E1E1E' },
  todoTextDone: { color: '#BBBBBB', textDecorationLine: 'line-through' },
  catBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, backgroundColor: '#E8F5E4' },
  catText: { fontSize: 11, color: '#4A9E5C' },
  retryText: { fontSize: 11, color: '#7DBF8A', marginLeft: 32, marginTop: 4 },
});
