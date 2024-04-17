import {DateTime} from 'luxon';

const formatDate = (dateObj: string | object | 'now', format: string = 'yyyy', tz: string = 'local') => {
	const options = {zone: tz}
	if (DateTime) {
	    if (dateObj == 'now') {
	      return DateTime.fromObject({}, options).toFormat(format);
	    } else if (dateObj?.constructor?.name === 'Date') {
	      return DateTime.fromJSDate(dateObj, options).toFormat(format);
	    } else {
	      return DateTime.fromISO(dateObj, options).toFormat(format);
	    }
	} else {
		return dateObj;
	}
}

export default formatDate;