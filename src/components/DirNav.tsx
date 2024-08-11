import sndMap from '../defs/sndMap.json';

type IProps = {
  sendEntries: (toSet: [string, string][]) => void;
};

export const DirNav = (props: IProps) => {
  const { sendEntries } = props;
  return <div>{divNonStringEntries(sndMap, '/', sendEntries)}</div>;
};

function divNonStringEntries(
  obj: Object,
  prepend: string,
  sendEntries: (toSet: [string, string][]) => void
) {
  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={prepend + key}>
            <span onClick={() => sendEntries(getAllStringEntries(value))}>
              {prepend + key}
            </span>
            {divNonStringEntries(value, prepend + key + '/', sendEntries)}
          </div>
        );
      } else return <></>;
    });
  }
}

function getAllStringEntries(
  obj: Object,
  previousKey: string = ''
): [string, string][] {
  if (typeof obj === 'string') {
    return [[previousKey, obj]];
  } else if (typeof obj === 'object') {
    return Object.entries(obj)
      .map(([key, value]) => getAllStringEntries(value, key))
      .flat()
      .sort((a, b) => a[0].localeCompare(b[0]));
  }
  return [];
}
