import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Ellipse, G, Text as SvgText } from 'react-native-svg';

export default function ProfileScreen() {
  const progress = 68;
  const radius = 115;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const milestones = [33, 66, 100];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.nickname}>지민</Text>

      <Text style={styles.label}>오늘의 기분</Text>
      <Text style={styles.value}>😊 평온해요 · Calm — The 1975</Text>

      <Text style={styles.label}>목표</Text>
      <Text style={[styles.value, { marginBottom: 32 }]}>30일 안에 규칙적인 생활 되찾기</Text>

      {/* 진행 링 + 식물 */}
      <View style={styles.circleWrapper}>
        <Svg width={250} height={250} style={styles.svgOverlay}>
          <Circle cx={125} cy={125} r={115} fill="none" stroke="#E0E0D8" strokeWidth={3} opacity={0.3} />
          <Circle
            cx={125} cy={125} r={115}
            fill="none" stroke="#7DBF8A" strokeWidth={3} strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            rotation={-90} originX={125} originY={125}
          />
          {milestones.map((milestone) => {
            const angle = (milestone / 100) * 360 - 90;
            const radian = (angle * Math.PI) / 180;
            const x = 125 + 115 * Math.cos(radian);
            const y = 125 + 115 * Math.sin(radian);
            const isPassed = progress >= milestone;
            return (
              <G key={milestone}>
                <Circle cx={x} cy={y} r={8} fill={isPassed ? '#7DBF8A' : '#E0E0D8'} />
                {isPassed && (
                  <SvgText x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={10}>🌿</SvgText>
                )}
              </G>
            );
          })}
        </Svg>

        <View style={styles.plantCircle}>
          <Svg width={120} height={140} viewBox="0 0 120 140">
            <Path d="M60 140 Q60 100 60 60" stroke="#4A9E5C" strokeWidth={3} fill="none" strokeLinecap="round" />
            <Ellipse cx={40} cy={90} rx={15} ry={25} fill="#7DBF8A" rotation={-30} originX={40} originY={90} />
            <Ellipse cx={80} cy={95} rx={15} ry={25} fill="#A8D5A2" rotation={30} originX={80} originY={95} />
            <Ellipse cx={38} cy={70} rx={18} ry={28} fill="#A8D5A2" rotation={-35} originX={38} originY={70} />
            <Ellipse cx={82} cy={75} rx={18} ry={28} fill="#7DBF8A" rotation={35} originX={82} originY={75} />
            <Ellipse cx={50} cy={55} rx={12} ry={20} fill="#7DBF8A" rotation={-40} originX={50} originY={55} />
            <Ellipse cx={70} cy={55} rx={12} ry={20} fill="#A8D5A2" rotation={40} originX={70} originY={55} />
          </Svg>
        </View>
      </View>

      <Text style={styles.growthText}>🌱 성장 중 · {progress}%</Text>
      <Text style={styles.streakText}>7일 연속 출석 중</Text>
      <View style={styles.divider} />

      <View style={styles.pills}>
        <View style={styles.pill}><Text style={styles.pillText}>퀘스트 완료 12개</Text></View>
        <View style={styles.pill}><Text style={styles.pillText}>목표 달성률 68%</Text></View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  content: { alignItems: 'center', paddingTop: 144, paddingHorizontal: 20, paddingBottom: 40 },
  nickname: { fontSize: 22, fontWeight: 'bold', color: '#1E1E1E', textAlign: 'center', marginBottom: 6 },
  label: { fontSize: 11, color: '#AAAAAA', textAlign: 'center', marginBottom: 6 },
  value: { fontSize: 13, color: '#555555', textAlign: 'center', marginBottom: 6 },
  circleWrapper: { width: 250, height: 250, position: 'relative', marginBottom: 24 },
  svgOverlay: { position: 'absolute', top: -5, left: -5 },
  plantCircle: {
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: '#FAF8F5', borderWidth: 1, borderColor: '#C8D8C0',
    alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 32, overflow: 'hidden',
  },
  growthText: { fontSize: 12, color: '#4A9E5C', textAlign: 'center', marginBottom: 12 },
  streakText: { fontSize: 13, color: '#7DBF8A', textAlign: 'center', marginBottom: 16 },
  divider: { width: 96, height: 0.5, backgroundColor: '#E0E0D8', marginBottom: 16 },
  pills: { flexDirection: 'row', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20, backgroundColor: '#E8F5E4' },
  pillText: { fontSize: 11, color: '#4A9E5C' },
});
