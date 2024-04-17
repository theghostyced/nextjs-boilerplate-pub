import logger from '@/lib/logger';

export const consoleAndTrack = (messageToLog: string) => {
  logger.info(messageToLog);

  // TODO: Add trackers below to capture steps
};

export const consoleAndReturnNull = (messageToLog: string) => {
  consoleAndTrack(messageToLog);
  return null;
};
