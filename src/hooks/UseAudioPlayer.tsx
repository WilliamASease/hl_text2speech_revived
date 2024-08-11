import { useEffect, useRef, useState } from 'react';
import { isEmpty, isNil } from 'lodash';

import prepend from '../defs/prepend.json';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState<string>();
  const [soundQueue, setSoundQueue] = useState<string[]>([]);

  useEffect(() => {
    if (isNil(playing) && !isEmpty(soundQueue)) {
      setPlaying(soundQueue[0]);
      setSoundQueue(soundQueue.splice(1));
    }
  }, [soundQueue, playing]);

  return {
    audioPlayerComponent: !isNil(playing) ? (
      <audio
        ref={audioRef}
        src={prepend.myServer + prepend.sndDir + playing}
        onLoadedData={() => audioRef.current?.play()}
        onEnded={() => {
          setPlaying(undefined);
        }}
      />
    ) : null,
    pushSnd: (what: string) => setSoundQueue((prev) => prev.concat([what])),
    setQueue: setSoundQueue,
    haltAndClear: () => {
      audioRef.current?.pause();
      setSoundQueue([]);
      setPlaying(undefined);
    },
    politeDebugger: (
      <div
        style={{
          position: 'absolute',
          padding: '.25rem',
          border: 'solid black 1px',
        }}
      >
        <div>Debugger</div>
        <div>Playing: </div>
        <div>{playing}</div>
        <div>Queue:</div>
        {soundQueue.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    ),
  };
};
