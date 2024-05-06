import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

export const createTimestamp = () => {
  return Timestamp.now().toMillis().toString();
}

export const getTimeFromNowByTimestamp = (timestamp) => moment(parseInt(timestamp)).fromNow();
