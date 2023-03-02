"use client";

import Exam from "@/components/exam";
import { getExamQuestions } from "@/util/question-util";
import { Document, PDFViewer } from "@react-pdf/renderer";
import { create } from "zustand";

interface IzpitState {
  doc: any | null;
}

const useS = create<IzpitState>((set) => ({
  doc: null,
}));

export default function Generator() {
  const doc = useS((s) => s.doc);

  return (
    <>
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
    </>
  );
}

async function generate() {
  let questions = await getExamQuestions();

  const exam = Exam({
    op_class: "A",
    pass_threshold: 36,
    time: 90,
    questions,
  });

  const doc = <Document title="Izpitna pola">{exam}</Document>;
  useS.setState({ doc });
}
