import React, { Component } from 'react';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    const {
      expense,
    } = props;
    this.state = {
      description: expense ? expense.description : '',
      note: expense ? expense.note : '',
      amount: expense && expense.amount ? (expense.amount / 100).toString() : '',
      createdAt: expense ? moment(expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    };
  }

  // static getDerivedStateFromProps({ expense }, state) {
  //   console.log('called');

  //   if (expense) {
  //     const { amount, createdAt } = expense;
  //     return {
  //       ...expense,
  //       amount: amount ? (amount / 100).toString() : '',
  //       createdAt: createdAt ? moment(createdAt) : moment(),
  //     };
  //   }
  //   return state;
  // }

  onDescriptionChange = (e) => {
    const { target: { value: description } } = e;
    this.setState({ description });
  }

  onNoteChange = (e) => {
    const { target: { value: note } } = e;
    this.setState({ note });
  }

  onAmountChange = (e) => {
    const { target: { value: amount } } = e;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ amount });
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  }

  onFocusChange = ({ focused }) => {
    this.setState({ calendarFocused: focused });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      description, amount, note, createdAt,
    } = this.state;
    if (!description || !amount) {
      this.setState({ error: 'Please provide description and amount' });
    } else {
      this.setState({ error: '' });
      this.props.onSubmit({
        description,
        note,
        createdAt: createdAt.valueOf(),
        amount: parseFloat(amount, 10) * 100,
      });
    }
  }

  render() {
    const {
      description, note, amount, createdAt, calendarFocused, error,
    } = this.state;
    return (
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={description}
            onChange={this.onDescriptionChange}
          />
          <input type="text" placeholder="Amount" value={amount} onChange={this.onAmountChange} />
          <SingleDatePicker
            date={createdAt}
            numberOfMonths={1}
            isOutsideRange={() => false}
            onDateChange={this.onDateChange}
            focused={calendarFocused}
            onFocusChange={this.onFocusChange}
          />
          <textarea
            placeholder="Add a note (optional)"
            cols="30"
            rows="10"
            value={note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
