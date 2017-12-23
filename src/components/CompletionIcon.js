import React from 'react';
import Check from 'react-icons/lib/fa/check';
import Close from 'react-icons/lib/fa/close';

type Props = {
  isComplete?: boolean
};

const CompletionIcon = ({ isComplete, ...rest }: Props) => (
  <span>
    {isComplete
      ? <Check {...rest} />
      : <Close {...rest} />
    }
  </span>
);

CompletionIcon.defaultProps = {
  isComplete: false,
};

export default CompletionIcon;
