import React from 'react';
import type { Node } from 'react';

import type { Id } from '../types';

type Props = {
  children: Node,
  id: Id,
  type: string,
};

const WowheadLink = ({ children, id, type }: Props) => {
  const param = `${type}=${id}`;
  return (
    <span>
      <a
        target="_blank"
        className="wowhead font-weight-bold d-flex align-items-center text-truncate"
        href={`//www.wowhead.com/${param}`}
        rel={param}
      >
        {children}
      </a>
    </span>
  );
};

export default WowheadLink;
