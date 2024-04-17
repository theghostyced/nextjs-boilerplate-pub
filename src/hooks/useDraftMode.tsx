import React from 'react';
import {draftMode} from 'next/headers';

const useDraftMode = () => {
  const {isEnabled: draftModeEnabled} = draftMode();
  return draftModeEnabled;
};

export default useDraftMode;
