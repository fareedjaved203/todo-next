'use client';

import { useFormStatus } from 'react-dom';
import { addTodo } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 rounded-lg transition ${pending ? 'bg-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
    >
      {pending ? 'Adding...' : 'Add'}
    </button>
  );
}

export default function TodoForm() {
  return (
    <form action={addTodo} className="flex items-center space-x-2 mb-6">
      <input
        name="todo"
        type="text"
        placeholder="Enter todo"
        required
        className="flex-grow px-4 py-2 rounded-lg border text-black border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <SubmitButton />
    </form>
  );
}
