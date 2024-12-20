<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        // Fetch all tasks for the authenticated user
        return Task::where('user_id', auth()->id())->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'user_id' => $request->user()->id, // Associate task with authenticated user
        ]);

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        // Ensure the task belongs to the authenticated user
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $task;
    }

    public function update(Request $request, Task $task)
    {
        // Ensure the task belongs to the authenticated user
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        return response()->json($task, 200);
    }

    public function destroy(Task $task)
    {
        // Ensure the task belongs to the authenticated user
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(null, 204);
    }
}
