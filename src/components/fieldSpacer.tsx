import React, { memo } from "react";


const FieldSpacer = ({ id = "", level=0 }) => {
  const separators = [];
  while (level > 0) {
    separators.push(<div key={`${id}.${level}`} className="separator" />);
    level -= 1;
  }
  return <>{separators}</>;
};

export default memo(FieldSpacer);
