import { useState } from 'react';

type IProps = {
  entries: [string, string][];
  setQueue: (what: string[]) => void;
  haltAndClear: () => void;
  clearBay: () => void;
};

export const Controls = (props: IProps) => {
  const { entries, setQueue, haltAndClear, clearBay } = props;
  const [shareLink, setShareLink] = useState<string>();

  return (
    <div>
      <div onClick={() => setQueue(entries.map((v) => v[1]))}>PLAY</div>
      <div onClick={haltAndClear}>HALT</div>
      <div onClick={clearBay}>CLEAR</div>
      <div
        onClick={() => {
          let share = btoa(
            unescape(encodeURIComponent(JSON.stringify(entries)))
          );
          const url = new URL(window.location.href);
          url.searchParams.set('share', share);
          setShareLink(url.toString());
        }}
      >
        SHARE
      </div>
      {shareLink && <div style={{ wordBreak: 'break-word' }}>{shareLink}</div>}
    </div>
  );
};
