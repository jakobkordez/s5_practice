'use client';

import { create } from 'zustand';

interface IzpitState {
  seed: number;
  klasa: string;
  count: number;
  passThreshold: number;
  time: number;
  frameUrl: string | null;
  updateFrameUrl: () => void;
  randomize: () => void;
}

const useS = create<IzpitState>((set) => ({
  seed: new Date().valueOf(),
  klasa: 'A',
  count: 60,
  passThreshold: 36,
  time: 90,
  frameUrl: null,
  updateFrameUrl: () => {
    set((s) => ({
      frameUrl: `/exam?r=${s.seed.toString(36)}&class=${s.klasa}&count=${
        s.count
      }&time=${s.time}&pt=${s.passThreshold}`,
    }));
  },
  randomize: () => set({ seed: Math.floor(Math.random() * 1000000000) }),
}));

export default function Generator() {
  const {
    seed,
    klasa,
    count,
    passThreshold,
    time,
    frameUrl,
    updateFrameUrl,
    randomize,
  } = useS();

  return (
    <>
      <div className="field">
        <label className="label">Klasa</label>
        <div className="control">
          <div className="select">
            <select
              value={klasa}
              onChange={(e) => useS.setState({ klasa: e.target.value })}
            >
              <option value="A">A</option>
              <option value="N">N</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Število vprašanj</label>
        <div className="control">
          <input
            className="input"
            type="number"
            value={count}
            onChange={(e) => useS.setState({ count: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <label className="label">Čas</label>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="number"
            value={time}
            onChange={(e) => useS.setState({ time: parseInt(e.target.value) })}
          />
        </div>
        <p className="control">
          <span className="button is-static">minut</span>
        </p>
      </div>

      <div className="field">
        <label className="label">Potrebno za uspeh</label>
        <div className="control">
          <input
            className="input"
            type="number"
            value={passThreshold}
            onChange={(e) =>
              useS.setState({ passThreshold: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <label className="label">Naključno seme</label>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            value={seed.toString(36).toUpperCase()}
            onChange={(e) =>
              useS.setState({ seed: parseInt(e.target.value, 36) })
            }
          />
        </div>
        <div className="control">
          <button className="button" onClick={randomize}>
            Premešaj
          </button>
        </div>
      </div>

      <div className="buttons">
        <button className="button" onClick={updateFrameUrl}>
          Generiraj
        </button>
        {frameUrl && (
          <button
            className="button"
            onClick={() =>
              (
                document.getElementById('exam-frame') as HTMLIFrameElement
              )?.contentWindow?.print()
            }
          >
            Natisni
          </button>
        )}
      </div>

      {frameUrl && (
        <iframe
          id="exam-frame"
          src={frameUrl}
          style={{
            width: '100%',
            height: '50rem',
            marginTop: '1rem',
            border: '1px solid #ccc',
          }}
        />
      )}
    </>
  );
}
