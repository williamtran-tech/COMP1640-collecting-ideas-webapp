import React from 'react'
import moment from 'moment';
const calculateTimeDiff = (date) => {
    const now = moment();
    const postTime = moment(date);
    const diffInMinutes = now.diff(postTime, 'minutes');
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
}
export default calculateTimeDiff