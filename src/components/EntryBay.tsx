type IProps = {
  entries: [string, string][];
  setInEntryBay: React.Dispatch<React.SetStateAction<[string, string][]>>;
};

export const EntryBay = (props: IProps) => {
  const { entries, setInEntryBay } = props;
  return (
    <div
      style={{
        border: 'solid red 1px',
        overflow: 'scroll',
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
      {entries.map((entry, idx) => (
        <span
          style={{ margin: 5, display: 'inline-block', whiteSpace: 'nowrap' }}
          key={idx}
          onClick={() =>
            setInEntryBay((prev) =>
              prev.slice(0, idx).concat(prev.slice(idx + 1))
            )
          }
        >
          {entry[0]}
        </span>
      ))}
    </div>
  );
};
