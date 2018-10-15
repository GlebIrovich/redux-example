import moment from 'moment';

// get visible expenses

export default (expenses, {
  text, sortBy, startDate, endDate,
}) => expenses.filter((item) => {
  const createdAtMoment = moment(item.createdAt);
  const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;


  // figure out if expenses.description as the text variable string inside of it
  // includes

  const textMatch = item.description.toLowerCase().includes(text.toLowerCase());


  return startDateMatch && endDateMatch && textMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    return a.createdAt < b.createdAt ? 1 : -1;
  } if (sortBy === 'amount') {
    return a.amount < b.amount ? 1 : -1;
  }
});
