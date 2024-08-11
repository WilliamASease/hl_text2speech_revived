type IProps = {
  entries: [string, string][];
  pushEntry: (what: [string, string]) => void;
};

export const EntryList = (props: IProps) => {
  const { entries, pushEntry } = props;
  return (
    <div
      style={{
        border: 'solid black 1px',
        overflowY: 'scroll',
        overflowX: 'visible',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      }}
    >
      {entries.map((entry) => (
        <span
          style={{ margin: 5, display: 'inline-block', whiteSpace: 'nowrap' }}
          key={entry[0]}
          onClick={() => pushEntry(entry)}
        >
          {entry[0]}
        </span>
      ))}
    </div>
  );
};
