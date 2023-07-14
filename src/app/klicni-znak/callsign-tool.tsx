'use client';

import { robotoMono } from '@/fonts/fonts';
import {
  faCheckCircle,
  faXmarkCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function CallsignTool() {
  const [clas, setClas] = useState(1);
  const [callsign, setCallsign] = useState('S50HQ');

  return (
    <div className="container my-10 flex flex-col gap-6">
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
          className={`rounded-lg border border-light py-3 text-center text-3xl uppercase shadow-lg ${robotoMono.className}`}
          value={callsign}
          onChange={(e) => setCallsign(e.target.value)}
        />
      </div>

      <div className="flex flex-col overflow-clip rounded-lg">
        {tests
          .filter((test) =>
            test.preTest ? test.preTest(clas, callsign) : true
          )
          .map((test, i) => {
            const result = test.test(callsign);

            return (
              <div
                key={i}
                className={`flex flex-row items-center gap-4 px-5 py-3 text-lg ${
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
      </div>
    </div>
  );
}

const tests = [
  {
    name: 'Se začne s S5',
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
    test: (callsign: string) =>
      /^S5(\d[A-Z]{1,2}|([0457][A-X]|[4678]Z)[A-Z]{2})$/i.test(callsign),
  },
  {
    name: 'Ustreza razredu N',
    preTest: (clas: number, callsign: string) =>
      clas === 0 && /^S5\d[A-Z]{3}$/i.test(callsign),
    test: (callsign: string) => /^S5(2[A-XZ]|8[A-X])[A-Z]{2}$/i.test(callsign),
  },
];
