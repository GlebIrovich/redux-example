import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});


// EDIT_EXPENSE

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});
// SORT_BY_AMOUNT

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE

const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});
// SET_END_DATE

const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});

// Expenses reducer
const expencesReduserDefaultState = [];

const expensesReducer = (state = expencesReduserDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense,
      ];

    case 'REMOVE_EXPENSE':
      return [
        ...state,
      ].filter(({ id }) => id !== action.id);

    case 'EDIT_EXPENSE':
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.updates,
          };
        }
        return item;
      });

    default:
      return state;
  }
};

// Filters reducer

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date', // date or amount
  startDate: undefined,
  endDate: undefined,
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };

    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };

    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };

    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };

    default:
      return state;
  }
};

// Store creation

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filter: filterReducer,
}));

// get visible expenses

const getVisibleExpenses = (expenses, {
  text, sortBy, startDate, endDate,
}) => expenses.filter((item) => {
  const startDateMatch = typeof startDate !== 'number' || item.createdAt >= startDate;
  const endDateMatch = typeof endDate !== 'number' || item.createdAt <= endDate;


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

// test
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
  console.log(visibleExpenses);
});

store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000 }));
const { expense: { id } } = store.dispatch(addExpense({ description: 'to be deleted', amount: 400, createdAt: 1000 }));

// store.dispatch(removeExpense({ id }));

// store.dispatch(editExpense(id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));

// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250));


const demoState = {
  expenses: [{
    id: 'alwdawd',
    description: 'Rent',
    note: 'My note text',
    amount: 54500,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
