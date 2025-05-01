// app/page.tsx
'use server';

import dbConnect from '@/lib/mongoose';
import { Todo } from '@/models/Todo';
import { addTodo, deleteTodo, toggleTodo } from './actions';

// SSR
// app/page.tsx
export default async function Home() {
  await dbConnect();
  const todos = await Todo.find().sort({ createdAt: -1 });

  return (
    <main className="max-w-md mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        📝 Mongoose ToDo List
      </h1>
  
      {/* Add Form */}
      <form
        action={addTodo}
        className="flex items-center space-x-2 mb-6"
      >
        <input
          name="todo"
          type="text"
          placeholder="Enter todo"
          required
          className="flex-grow px-4 py-2 rounded-lg border text-black border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </form>
  
      {/* ToDo List */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id.toString()}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-3">
              <form action={toggleTodo.bind(null, todo._id.toString())}>
                <button
                  type="submit"
                  className={`text-2xl ${todo.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-500'}`}
                >
                  {todo.completed ? '✅' : '⬜'}
                </button>
              </form>
              <span
                className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {todo.text}
              </span>
            </div>
            <form action={deleteTodo.bind(null, todo._id.toString())}>
              <button
                type="submit"
                className="text-red-500 text-3xl hover:text-red-700 transition"
                title="Delete"
              >
                🗑
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
  
}

