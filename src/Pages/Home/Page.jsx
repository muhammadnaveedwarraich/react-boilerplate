import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/features/counter/counterSlice'
const HomePage = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return <h1 className="bg-red-400 h-screen">home page
  <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
</h1>;
};

export default HomePage;