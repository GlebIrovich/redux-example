import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import uuid from 'uuid';

import {
  setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate,
} from '../actions/filters';

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  }

  onFocusChange = (calendarFocused) => {
    this.setState({ calendarFocused });
  }

  render() {
    const {
      filters: {
        text, sortBy, startDate, endDate,
      }, dispatch,
    } = this.props;
    return (
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            const { target: { value } } = e;
            dispatch(setTextFilter(value));
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => {
            const { target: { value } } = e;

            dispatch(value === 'date' ? sortByDate() : sortByAmount());
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={startDate}
          startDateId={uuid()}
          endDate={endDate}
          endDateId={uuid()}
          onDatesChange={this.onDatesChange}
          isOutsideRange={() => false}
          numberOfMonths={1}
          showClearDates
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ filters }) => ({
  filters,
});
export default connect(mapStateToProps)(ExpenseListFilters);
