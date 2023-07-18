/* eslint-disable @next/next/no-img-element */
'use client';

import { Question } from '@/interfaces/question';
import { getExamQuestions } from '@/util/question-util';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from '@/styles/Exam.module.scss';
import { InlineMath } from 'react-katex';

import 'katex/dist/katex.min.css';

const podatki = [
  'Ime in priimek',
  'Datum in kraj rojstva',
  'Stalno prebivališče',
  'Član-ica radiokluba',
];

const izjava = ['Kraj', 'Datum', 'Podpis'];

export default function Exam() {
  const params = useSearchParams();

  const r = params?.get('r');
  const klasa = params?.get('class');
  const count = params?.get('count');
  const time = params?.get('time');
  const passThreshold = params?.get('pt');

  if (!r || !/^[\dA-Z]+$/i.test(r)) {
    return <>Missing or invalid r</>;
  }

  if (!klasa || !/^[AN]$/i.test(klasa)) {
    return <>Missing or invalid class</>;
  }

  if (!count || !/^\d+$/.test(count)) {
    return <>Missing or invalid count</>;
  }

  const countInt = parseInt(count);
  if (countInt < 1) {
    return <>Invalid count</>;
  }

  if (!time || !/^\d+$/.test(time) || parseInt(time) < 1) {
    return <>Missing or invalid time</>;
  }

  if (
    !passThreshold ||
    !/^\d+$/.test(passThreshold) ||
    parseInt(passThreshold) < 1
  ) {
    return <>Missing or invalid passThreshold</>;
  }

  const questions = getExamQuestions(parseInt(r, 36), countInt);

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <Suspense fallback={<p>Nalaganje...</p>}>
        <FrontPage
          klasa={klasa}
          qNumber={count}
          passThreshold={passThreshold}
          time={time}
        />

        <ExamDoc qPromise={questions} />
      </Suspense>
    </div>
  );
}

async function ExamDoc({ qPromise }: { qPromise: Promise<Question[]> }) {
  const q = await qPromise;

  return (
    <>
      <div style={{ pageBreakBefore: 'always' }}>
        {q.map((q, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              breakInside: 'avoid',
              marginTop: '1rem',
              border: '1px solid #444',
              borderRadius: '10px',
              padding: '1rem',
            }}
          >
            <div style={{ marginRight: '10px', flex: 1 }}>
              <div style={{ display: 'flex' }}>
                <span>{i + 1}.</span>
                <span style={{ marginLeft: '0.5rem' }}>{q.question}</span>
              </div>
              <ol style={{ listStyleType: 'upper-alpha' }}>
                {q.answers.map((a, j) => (
                  <li key={j} style={{ marginBottom: '0.5rem' }}>
                    {a.startsWith('$') ? (
                      <span style={{ marginLeft: '0.5rem' }}>
                        <InlineMath math={a.slice(1, a.length - 1)} />
                      </span>
                    ) : (
                      a
                    )}
                  </li>
                ))}
              </ol>
            </div>
            {q.image && (
              <img
                src={`/question_images/${q.image}`}
                alt=""
                style={{
                  maxHeight: '20rem',
                  maxWidth: '50%',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ pageBreakBefore: 'always' }}>
        <h2>Odgovori</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-evenly',
          }}
        >
          {Array(Math.ceil(q.length / 10))
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
}

function FrontPage({
  klasa,
  qNumber,
  passThreshold,
  time,
}: {
  klasa: string;
  qNumber: string;
  passThreshold: string;
  time: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <img
          src="/logo/zrs_logo_black.png"
          alt=""
          style={{ height: '10rem', width: 'auto' }}
        />
        <div style={{ textAlign: 'center', flex: 1, fontSize: '2rem' }}>
          Izpitna pola za amaterske operaterje <strong>{klasa}</strong> razreda
        </div>
      </div>

      <div>
        {podatki.map((p) => (
          <div key={p} style={{ display: 'flex', alignItems: 'baseline' }}>
            <span>{p}:</span>
            <span className={styles.input} />
          </div>
        ))}
      </div>

      <div>
        <div>
          Izjavljam, da sem izpitno polo izpolnil-a lastnoročno in pri tem nisem
          uporabljal-a nedovoljenih načinov reševanja.
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {izjava.map((f) => (
            <div
              key={f}
              style={{ flex: 1, display: 'flex', alignItems: 'baseline' }}
            >
              <span>{f}:</span>
              <span className={styles.input} />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          border: '1px solid',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>Ocena izpitne komisije</div>

        <div>
          Kandidat-ka je pravilno odgovoril-a na _______ / {qNumber} vprašanj in
          JE - NI uspešno opravil-a izpit za radioamaterja {klasa} razreda.
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span>Podpis člana komisije:</span>
          <span className={styles.input} />
        </div>
      </div>

      <div>
        Prag za uspešno opravljen izpit je {passThreshold} pravilnih odgovorov.
        Za reševanje izpitne pole je na voljo {time} minut.
      </div>
      <div>
        Navodilo: Pri vprašanjih obkroži ustrezno črko (A, B, C) pred pravilnim
        odgovorom. Če popravljaš odgovor, se pri popravku podpiši, napačen
        odgovor pa v celoti prečrtaj.
      </div>
    </div>
  );
}
