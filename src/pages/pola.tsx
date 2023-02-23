"use client";

import { Question } from "@/interfaces/question";
import styles from "@/styles/Exam.module.scss";
import Image from "next/image";

const questions = new Array<Question>(60).fill({
  id: 0,
  question:
    "Katero od naštetih frekvenčnih področij ni namenjeno radioamaterjem?",
  answers: ["47 GHz", "432 MHz", "46 MHz"],
  correct: 0,
  category: 12,
});

interface ExamProps {
  vprasanja: Question[];
  klasa: string;
  prag: number;
  cas: number;
}

export default function Exam() {
  return (
    <div className={styles.exam}>
      <ExamHeader />

      <div className={styles.body}>{questions.map(ExamQuestion)}</div>
    </div>
  );
}

function ExamHeader() {
  const klasa = "A";
  const st_vprasanj = questions.length;
  const st_opcij = Math.max(...questions.map((q) => q.answers.length));
  const prag = st_vprasanj * 0.6;
  const cas = 90;

  const opcije = "ABCDEF".split("").slice(0, st_opcij).join(", ");

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Image
          src="/logo/zrs_logo_black.svg"
          alt="ZRS Logo"
          height={100}
          width={100}
        />
        <h1>
          IZPITNA POLA ZA AMATERSKE OPERATERJE <strong>{klasa}</strong> RAZREDA
        </h1>
      </div>

      <div className={styles.podatki}>
        <div>
          <span>Ime in priimek:</span>
          <span />
        </div>
        <div>
          <span>Datum in kraj rojstva:</span>
          <span />
        </div>
        <div>
          <span>Stalno prebivališče:</span>
          <span />
        </div>
        <div>
          <span>Član-ica radiokluba:</span>
          <span />
        </div>
      </div>

      <div className={styles.izjava}>
        <p>
          Izjavljam, da sem izpitno polo izpolnil-a lastnoročno in pri tem nisem
          uporabljal-a nedovoljenih načinov reševanja.
        </p>

        <div>
          <div>
            <span>Kraj:</span>
            <span />
          </div>
          <div>
            <span>Datum:</span>
            <span />
          </div>
          <div>
            <span>Podpis:</span>
            <span />
          </div>
        </div>
      </div>

      <div className={styles.komisija}>
        <div>
          <p>
            <strong>Ocena izpitne komisije:</strong>
          </p>
          <p>
            Kandidat-ka je pravilno odgovoril-a na _______ / {st_vprasanj}{" "}
            vprašanj in JE - NI uspešno opravil-a izpit za radioamaterja {klasa}{" "}
            razreda.
          </p>

          <div>
            <span>Podpis člana izpitne komisije:</span>
            <span />
          </div>
        </div>

        <div>
          <p>
            Prag za uspešno opravljen izpit je {prag} pravilnih odgovorov. Za
            reševanje izpitne pole je na voljo {cas} minut.
          </p>
        </div>
      </div>

      <p>
        <i>Navodilo:</i> Pri vprašanjih obkroži ustrezno črko ({opcije}) pred
        pravilnim odgovorom. Če popravljaš odgovor, se pri popravku podpiši,
        napačen odgovor pa v celoti prečrtaj.
      </p>
    </div>
  );
}

function ExamQuestion(q: Question, i: number) {
  return (
    <div key={i}>
      <p>
        {i + 1}. {q.question}
      </p>

      <ol>
        {q.answers.map((a, ai) => (
          <li key={ai}>{a}</li>
        ))}
      </ol>
    </div>
  );
}
