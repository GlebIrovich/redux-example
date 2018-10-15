import React from 'react';
import { connect } from 'react-redux';

import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = ({ expense, history, dispatch }) => (
  <div>
    <ExpenseForm
      expense={expense}
      onSubmit={(editedExpense) => {
        dispatch(editExpense(expense.id, editedExpense));
        history.push('/');
      }}
    />
    <button onClick={() => {
      dispatch(removeExpense(expense));
      history.push('/');
    }}
    >
Remove

    </button>
  </div>
);
const mapStateToProps = ({ expenses }, props) => ({
  expense: expenses.find(item => item.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
