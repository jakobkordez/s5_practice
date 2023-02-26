"use client";

import { create } from "zustand";
import Exam from "@/components/exam";

import { getQuestions } from "@/util/question-util";
import { PDFViewer, Document } from "@react-pdf/renderer";

interface IzpitState {
  doc: any | null;
}

const useS = create<IzpitState>((set) => ({
  doc: null,
}));

export default function Izpit() {
  const doc = useS((s) => s.doc);

  return (
    <div className="section">
      <button className="button is-primary" onClick={generate}>
        Ustvari PDF
      </button>

      {doc && (
        <PDFViewer
          style={{
            width: "100%",
            height: "100vh",
            marginTop: "1rem",
          }}
        >
          {doc}
        </PDFViewer>
      )}
    </div>
  );
}

async function generate() {
  let questions = await getQuestions();
  // Shuffle questions
  questions.sort(() => Math.random() - 0.5);
  questions = questions.slice(0, 60);
  questions.sort((a, b) => a.id - b.id);

  const exam = Exam({
    op_class: "A",
    pass_threshold: 36,
    time: 90,
    questions,
  });

  const doc = <Document title="Izpitna pola">{exam}</Document>;
  useS.setState({ doc });
}
