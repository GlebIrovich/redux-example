import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const setCount = ({ value = 0 } = {}) => ({
  type: 'SET',
  value,
});

const resetCount = () => ({
  type: 'RESET',
});

// Reducers

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':

      return {
        count: state.count + action.incrementBy,
      };

    case 'DECREMENT':

      return {
        count: state.count - action.decrementBy,
      };

    case 'SET':
      return {
        count: action.value,
      };

    case 'RESET':
      return {
        count: 0,
      };

    default:
      return state;
  }
};
const store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState());
});


// actions

// increment
store.dispatch(incrementCount());

// decrement

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount({ decrementBy: 100 }));

// decrement

store.dispatch(resetCount());

store.dispatch(setCount({ value: 100 }));
