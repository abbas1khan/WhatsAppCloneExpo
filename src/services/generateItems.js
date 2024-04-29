import moment from 'moment';
import uuid from 'react-native-uuid';

function groupedDays(messages) {
  const today = moment(); // Get the current date
  const yesterday = today.clone().subtract(1, 'day'); // Get the date of yesterday
  const startOfWeek = today.clone().startOf('week'); // Get the start of the current week
  const endOfWeek = today.clone().endOf('week'); // Get the end of the current week

  return messages.reduce((acc, el) => {
    const messageDate = moment(el.createdAt);
    let messageDay;

    if (messageDate.isSame(today, 'day')) {
      // If the message was sent today, display "Today"
      messageDay = 'Today';
    } else if (messageDate.isSame(yesterday, 'day')) {
      // If the message was sent yesterday, display "Yesterday"
      messageDay = 'Yesterday';
    } else if (messageDate.isBetween(startOfWeek, endOfWeek, undefined, '[]')) {
      // If the message is within the current week, display the day name (e.g., Monday, Tuesday, etc.)
      messageDay = messageDate.format('dddd');
    } else {
      // If the message is older than a week, display the date in the format "2 April 2024"
      messageDay = messageDate.format('D MMMM YYYY');
    }

    if (acc[messageDay]) {
      return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
    }
    return { ...acc, [messageDay]: [el] };
  }, {});
}

function generateItems(messages) {
  const days = groupedDays(messages);
  // console.log("🚀 ~ file: generateItems.js:37 ~ generateItems ~ days:", JSON.stringify(days))
  const sortedDays = Object.keys(days).sort((x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix())
  // console.log("🚀 ~ file: generateItems.js:39 ~ generateItems ~ sortedDays:", JSON.stringify(sortedDays))
  const items = sortedDays.reduce((acc, date) => {
    const sortedMessages = days[date]
      .sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))
      .map((message, index, array) => ({
        ...message,
        index: array.length - index - 1, // Invert the index
        isFirstMessage: index === array.length - 1, // Check if it's the first message
        isLastMessage: index === 0, // Check if it's the last message
      }))
    // console.log("🚀 ~ file: generateItems.js:42 ~ items ~ sortedMessages:", JSON.stringify(sortedMessages))
    const unique = uuid.v4()
    return acc.concat([...sortedMessages, { type: 'day', date, _id: unique, messageId: unique }])
  }, []);
  return items;
}

export default generateItems;





// function generateItems(messages) {
//   const days = groupedDays(messages);
//   const sortedDays = Object.keys(days).sort(
//     (x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix()
//   );
//   const items = sortedDays.reduce((acc, date) => {
//     const sortedMessages = days[date].sort(
//       (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
//     );
//     return acc.concat([...sortedMessages, { type: 'day', date, _id: Date.now() }]);
//   }, []);
//   return items;
// }




// import moment from 'moment';

// function groupedDays(messages) {
//   return messages.reduce((acc, el, i) => {
//     const messageDay = moment(el.createdAt).format('YYYY-MM-DD');
//     if (acc[messageDay]) {
//       return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
//     }
//     return { ...acc, [messageDay]: [el] };
//   }, {});
// }

// function generateItems(messages) {
//   const days = groupedDays(messages);
//   const sortedDays = Object.keys(days).sort(
//     (x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix()
//   );
//   const items = sortedDays.reduce((acc, date) => {
//     const sortedMessages = days[date].sort(
//       (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
//     );
//     return acc.concat([...sortedMessages, { type: 'day', date, id: date }]);
//   }, []);
//   return items;
// }

// export default generateItems;