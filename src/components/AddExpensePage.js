import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = ({ dispatch, history }) => (
  <div>
    <h3>Add expense</h3>
    <ExpenseForm
      onSubmit={(expense) => {
        dispatch(addExpense(expense));
        history.push('/');
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
