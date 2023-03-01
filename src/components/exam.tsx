"use client";

import { Question } from "@/interfaces/question";
import { View, Font, Text, StyleSheet, Page, Image } from "@react-pdf/renderer";
import ExamHeader from "./exam_header";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/fonts/Roboto-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/Roboto-Medium.ttf",
      fontWeight: 500,
    },
    {
      src: "/fonts/Roboto-Bold.ttf",
      fontWeight: 700,
    },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

interface ExamProps {
  questions: Question[];
  op_class: string;
  pass_threshold: number;
  time: number;
}

export default function Exam({
  questions,
  op_class,
  pass_threshold,
  time,
}: ExamProps) {
  const num_options = Math.max(...questions.map((q) => q.answers.length));

  return (
    <>
      <Page size="A4" style={styles.page}>
        <ExamHeader
          op_class={op_class}
          num_questions={questions.length}
          num_options={num_options}
          pass_threshold={pass_threshold}
          time={time}
        />
      </Page>

      <Page size="A4" style={styles.page}>
        {questions.map(ExamQuestion)}
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.subtitle}>Pravilni odgovori</Text>
        <View style={styles.tables}>
          {Array(questions.length / 10)
            .fill(0)
            .map((_, i) => (
              <View key={i} style={styles.table}>
                <View style={styles.tr}>
                  <Text style={styles.th}>Vprašanje</Text>
                  <Text style={styles.th}>Odgovor</Text>
                </View>
                {questions.slice(i * 10, (i + 1) * 10).map((q, qi) => (
                  <View key={qi} style={styles.tr}>
                    <Text style={styles.td}>{i * 10 + qi + 1}</Text>
                    <Text style={styles.td}>
                      {String.fromCharCode(q.correct + 65)}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
        </View>
      </Page>
    </>
  );
}

function ExamQuestion(q: Question, i: number) {
  return (
    <View key={i} style={styles.qDiv} wrap={false}>
      <View style={{ flexGrow: 1, flexShrink: 1 }}>
        <Text>
          {i + 1}. {q.question}
        </Text>

        <View style={styles.answer}>
          {q.answers.map((a, ai) => (
            <Text key={ai} style={styles.answer}>
              {String.fromCharCode(ai + 65)}. {a}
            </Text>
          ))}
        </View>
      </View>

      {/* {q.image && (
        <Image
          src={`/question_images/${q.image}`}
          style={{
            width: "200px",
            height: "auto",
          }}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: "50px",
    fontFamily: "Roboto",
    fontSize: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: "20px",
  },
  tables: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
  },
  table: {
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
  },
  tr: {
    display: "flex",
    flexDirection: "row",
  },
  th: {
    fontWeight: "bold",
    backgroundColor: "#eee",
    width: "70px",
    textAlign: "center",
    padding: "2px 5px",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
  },
  td: {
    width: "70px",
    textAlign: "center",
    padding: "2px 5px",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
  },
  qDiv: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",
  },
  answer: {
    marginTop: "5px",
    marginLeft: "10px",
  },
});
