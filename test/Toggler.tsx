import React, { useCallback, useState } from 'react';

type Props = {
  onLabel?: React.ReactNode,
  offLabel?: React.ReactNode,
}

export default function Toggler({ onLabel = "on", offLabel = "off" }: Props) {
  const [on, toggleOn] = useToggle(false);
  return (
    <button onClick={toggleOn} type="button">
      {on ? onLabel : offLabel}
    </button>
  );
}

function useToggle(initial: boolean): [boolean, () => void] {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => {
    setState(current => !current);
  }, []);
  return [state, toggle];
}
