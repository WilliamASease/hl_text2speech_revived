import './App.css';
import { useAudioPlayer } from './hooks/UseAudioPlayer';
import { useEffect, useState } from 'react';
import { DirNav } from './components/DirNav';
import { EntryList } from './components/EntryList';
import { EntryBay } from './components/EntryBay';
import { Controls } from './components/Controls';
import { isNil } from 'lodash';

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const share = params.get('share'); // Replace 'myParam' with your query parameter name
  console.log('Specific parameter:', share);

  const { audioPlayerComponent, setQueue, haltAndClear, politeDebugger } =
    useAudioPlayer();

  const [showPoliteDebugger] = useState(false);

  const [entryList, setEntryList] = useState<[string, string][]>([]);
  const [inEntryBay, setInEntryBay] = useState<[string, string][]>([]);

  useEffect(() => {
    if (!isNil(share)) {
      setInEntryBay(
        JSON.parse(decodeURIComponent(escape(atob(share)))) as [
          string,
          string,
        ][]
      );
    }
  }, [share]);

  return (
    <div className="App">
      {showPoliteDebugger && politeDebugger}
      {audioPlayerComponent}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>HLS TSS REVIVED</div>
        <div
          style={{
            flexGrow: 1,
            border: 'solid black 1px',
            padding: 50,
          }}
        >
          <div
            style={{
              border: 'solid green 1px',
              height: '25%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                border: 'solid blue 1px',
                height: '100%',
                width: '75%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <EntryBay entries={inEntryBay} setInEntryBay={setInEntryBay} />
            </div>
            <div
              style={{
                border: 'solid blue 1px',
                height: '100%',
                width: '25%',
              }}
            >
              <Controls
                entries={inEntryBay}
                setQueue={setQueue}
                haltAndClear={haltAndClear}
                clearBay={() => setInEntryBay(() => [])}
              />
            </div>
          </div>
          <div
            style={{
              border: 'solid green 1px',
              height: '75%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                border: 'solid blue 1px',
                height: '100%',
                width: '25%',
              }}
            >
              <DirNav sendEntries={setEntryList} />
            </div>
            <div
              style={{
                border: 'solid blue 1px',
                height: '100%',
                width: '75%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <EntryList
                entries={entryList}
                pushEntry={(what) =>
                  setInEntryBay((prev) => prev.concat([what]))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
