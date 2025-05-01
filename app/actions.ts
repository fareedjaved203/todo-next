// Server action

import dbConnect from '@/lib/mongoose';
import { Todo } from '@/models/Todo';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
    'use server';
    const text = formData.get('todo')?.toString();
    if (!text) return;
  
    await dbConnect();
    await Todo.create({ text });
    revalidatePath('/');
  }
  
  // Delete todo
  export async function deleteTodo(id: string) {
    'use server';
    await dbConnect();
    await Todo.findByIdAndDelete(id);
    revalidatePath('/');
  }
  
  // Toggle completion
  export async function toggleTodo(id: string) {
    'use server';
    await dbConnect();
    const todo = await Todo.findById(id);
    if (!todo) return;
    todo.completed = !todo.completed;
    await todo.save();
    revalidatePath('/');
  }