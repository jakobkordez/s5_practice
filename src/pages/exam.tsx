"use client";

import { Question } from "@/interfaces/question";
import { getExamQuestions } from "@/util/question-util";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "@/styles/Exam.module.scss";

const podatki = [
  "Ime in priimek",
  "Datum in kraj rojstva",
  "Stalno prebivališče",
  "Član-ica radiokluba",
];

const izjava = ["Kraj", "Datum", "Podpis"];

export default function Exam() {
  const params = useSearchParams();

  const r = params?.get("r");

  if (!r || !/^[\dA-Z]+$/i.test(r)) {
    return <>Missing or invalid r</>;
  }

  const questions = getExamQuestions(parseInt(r, 36), 60);

  return (
    <div style={{ fontFamily: "Arial" }}>
      <Suspense fallback={<p>Nalaganje...</p>}>
        <ExamDoc promise={questions} />
      </Suspense>
    </div>
  );
}

const ExamDoc = async function ExamDoc({
  promise,
}: {
  promise: Promise<Question[]>;
}) {
  const q = await promise;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <img
            src="/logo/zrs_logo_black.png"
            style={{ height: "10rem", width: "auto" }}
          />
          <div style={{ textAlign: "center", flex: 1, fontSize: "2rem" }}>
            Izpitna pola za amaterske operaterje <strong>{"A"}</strong> razreda
          </div>
        </div>

        <div>
          {podatki.map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "baseline" }}>
              <span>{p}:</span>
              <span className={styles.input} />
            </div>
          ))}
        </div>

        <div>
          <div>
            Izjavljam, da sem izpitno polo izpolnil-a lastnoročno in pri tem
            nisem uporabljal-a nedovoljenih načinov reševanja.
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            {izjava.map((f) => (
              <div
                key={f}
                style={{ flex: 1, display: "flex", alignItems: "baseline" }}
              >
                <span>{f}:</span>
                <span className={styles.input} />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            border: "1px solid",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Ocena izpitne komisije</div>

          <div>
            Kandidat-ka je pravilno odgovoril-a na _______ / {60} vprašanj in JE
            - NI uspešno opravil-a izpit za radioamaterja {"A"} razreda.
          </div>

          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span>Podpis člana komisije:</span>
            <span className={styles.input} />
          </div>
        </div>

        <div>
          Prag za uspešno opravljen izpit je {36} pravilnih odgovorov. Za
          reševanje izpitne pole je na voljo {90} minut.
        </div>
        <div>
          Navodilo: Pri vprašanjih obkroži ustrezno črko (A, B, C) pred
          pravilnim odgovorom. Če popravljaš odgovor, se pri popravku podpiši,
          napačen odgovor pa v celoti prečrtaj.
        </div>
      </div>

      <div style={{ pageBreakBefore: "always" }}>
        {q.map((q, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              breakInside: "avoid",
              marginTop: "1rem",
              border: "1px solid #444",
              borderRadius: "10px",
              padding: "1rem",
            }}
          >
            <div style={{ marginRight: "10px", flex: 1 }}>
              <div style={{ display: "flex" }}>
                <span>{i + 1}.</span>
                <span style={{ marginLeft: "0.5rem" }}>{q.question}</span>
              </div>
              <ol style={{ listStyleType: "upper-alpha" }}>
                {q.answers.map((a, j) => (
                  <li key={j} style={{ marginBottom: "0.5rem" }}>
                    {a}
                  </li>
                ))}
              </ol>
            </div>
            {q.image && (
              <img
                src={`/question_images/${q.image}`}
                style={{
                  maxHeight: "20rem",
                  maxWidth: "50vw",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ pageBreakBefore: "always" }}>
        <h2>Odgovori</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-evenly",
          }}
        >
          {Array(q.length / 10)
            .fill(0)
            .map((_, i) => (
              <table key={i} className={styles.akey}>
                <thead>
                  <tr>
                    <th>Vprašanje</th>
                    <th>Odgovor</th>
                  </tr>
                </thead>
                <tbody>
                  {q.slice(i * 10, (i + 1) * 10).map((q, qi) => (
                    <tr key={qi}>
                      <td>{i * 10 + qi + 1}</td>
                      <td>{String.fromCharCode(q.correct + 65)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
        </div>
      </div>
    </>
  );
} as unknown as ({ promise }: { promise: Promise<Question[]> }) => JSX.Element;
