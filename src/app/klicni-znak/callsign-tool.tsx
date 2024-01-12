'use client';

import { robotoMono } from '@/fonts/fonts';
import {
  generateAllCallsigns,
  levenshteinDistance,
} from '@/util/callsign-util';
import {
  faCheckCircle,
  faXmarkCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

const classATest = /^S5(\d[A-Z]{1,2}|([0467][A-X]|[4678]Z)[A-Z]{2})$/i;
const classNTest = /^S5(2[A-XZ]|8[A-X])[A-Z]{2}$/i;

interface TakenCallsigns {
  taken?: Set<string>;
  free?: string[];
}

const useStore = create<TakenCallsigns>(() => ({}));

async function loadCallsigns() {
  const callsigns = await fetch('/api/akos').then((res) => res.json());
  useStore.setState({ taken: new Set(callsigns) });
  const free = generateAllCallsigns({ exclude: callsigns });
  useStore.setState({ free });
}

export default function CallsignTool() {
  const [clas, setClas] = useState(1);
  const [callsign, setCs] = useState('');
  const [taken, free] = useStore((state) => [state.taken, state.free]);
  const [showSimilar, setShowSimilar] = useState(false);

  function setCallsign(cs: string | undefined) {
    if (cs == null) return;
    setCs(cs);
    if (showSimilar) setShowSimilar(false);
  }

  function randCall(length: number | undefined): string | undefined {
    if (!free) return;
    const test = [classNTest, classATest][clas];
    let avail = free.filter((c) => test.test(c));
    if (!avail.length) return;
    if (length) avail = avail.filter((c) => c.length === length);
    return avail[Math.floor(Math.random() * avail.length)];
  }

  useEffect(() => {
    if (taken === undefined) loadCallsigns();
  }, [taken]);

  const isTaken = taken?.has(callsign.toUpperCase()) ?? null;

  return (
    <div className="section container prose flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Izberi razred</label>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setClas(0)}
            className={`flex-1 rounded-lg border-4 bg-light py-2 font-semibold text-dark shadow ${
              !clas ? 'border-dark' : 'border-transparent'
            }`}
          >
            N razred
          </button>
          <button
            onClick={() => setClas(1)}
            className={`flex-1 rounded-lg border-4 bg-light py-2 font-semibold text-dark shadow ${
              clas ? 'border-dark' : 'border-transparent'
            }`}
          >
            A razred
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Vnesi klicni znak</label>
        <input
          type="text"
          className={`rounded-lg border border-light py-3 text-center text-3xl uppercase shadow-lg placeholder:font-sans placeholder:normal-case ${robotoMono.className}`}
          value={callsign}
          onChange={(e) => setCallsign(e.target.value)}
          placeholder='npr. "S50HQ"'
        />
        <div className="mt-1 flex flex-row gap-2">
          {clas ? (
            <button
              className="button flex-1 text-sm"
              onClick={() => setCallsign(randCall(5))}
            >
              Naključen prost 2-črkovni klicni znak
            </button>
          ) : (
            <></>
          )}
          <button
            className="button flex-1 text-sm"
            onClick={() => setCallsign(randCall(6))}
          >
            Naključen prost 3-črkovni klicni znak
          </button>
        </div>
      </div>

      <div className="flex flex-col overflow-clip rounded-lg border">
        {tests
          .filter((test) =>
            test.preTest ? test.preTest(clas, callsign) : true,
          )
          .map((test, i) => {
            const result = test.test(callsign);

            return (
              <div
                key={i}
                className={`flex flex-row items-center gap-4 border-b px-5 py-3 text-lg last:border-b-0 ${
                  result ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <FontAwesomeIcon
                  icon={result ? faCheckCircle : faXmarkCircle}
                  className={`w-5 ${
                    result ? 'text-green-600' : 'text-red-600'
                  }`}
                />
                <span>{test.name}</span>
              </div>
            );
          })}

        {/^S5\d[A-Z]{1,3}$/i.test(callsign) && isTaken !== null && (
          <div
            className={`flex flex-row items-center gap-4 px-5 py-3 text-lg ${
              !isTaken ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <FontAwesomeIcon
              icon={!isTaken ? faCheckCircle : faXmarkCircle}
              className={`w-5 ${!isTaken ? 'text-green-600' : 'text-red-600'}`}
            />
            <span>Klicni znak je {isTaken ? 'zaseden' : 'prost'}</span>
          </div>
        )}
      </div>

      {showSimilar ? (
        <div>
          <h4 className="mb-1 text-xl font-semibold">
            Podobni prosti klicni znaki
          </h4>
          <div
            className={`grid grid-cols-4 gap-2 md:grid-cols-5 ${robotoMono.className}`}
          >
            {free
              ?.map((c) => [levenshteinDistance(callsign, c), c])
              .sort()
              .slice(0, 100)
              .map((c) => (
                <button
                  key={c[1]}
                  onClick={() => setCallsign(c[1] as string)}
                  className="rounded-lg border bg-light p-1 text-center hover:border-dark"
                >
                  {c[1]}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <button className="button" onClick={() => setShowSimilar(true)}>
          Poišči podobne proste klicne znake
        </button>
      )}
    </div>
  );
}

const tests = [
  {
    name: 'Se začne s S5',
    preTest: (clas: number, callsign: string) => callsign.length > 0,
    test: (callsign: string) => /^S5/i.test(callsign),
  },
  {
    name: 'Vsebuje eno številko',
    preTest: (clas: number, callsign: string) => /^S5/i.test(callsign),
    test: (callsign: string) => /^S5\d/i.test(callsign),
  },
  {
    name: 'Vsebuje eno do tri črke',
    preTest: (clas: number, callsign: string) =>
      clas === 1 && /^S5\d/i.test(callsign),
    test: (callsign: string) => /^S5\d[A-Z]{1,3}$/i.test(callsign),
  },
  {
    name: 'Vsebuje tri črke',
    preTest: (clas: number, callsign: string) =>
      clas === 0 && /^S5\d/i.test(callsign),
    test: (callsign: string) => /^S5\d[A-Z]{3}$/i.test(callsign),
  },
  {
    name: 'Ustreza razredu A',
    preTest: (clas: number, callsign: string) =>
      clas === 1 && /^S5\d[A-Z]{1,3}$/i.test(callsign),
    test: (callsign: string) => classATest.test(callsign),
  },
  {
    name: 'Ustreza razredu N',
    preTest: (clas: number, callsign: string) =>
      clas === 0 && /^S5\d[A-Z]{3}$/i.test(callsign),
    test: (callsign: string) => classNTest.test(callsign),
  },
];
