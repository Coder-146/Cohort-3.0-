# DOM Explorer: Interactive Task Manager

This project is a Vanilla JavaScript assignment that demonstrates DOM manipulation, event handling, event delegation, event propagation, attributes vs properties, and the browser rendering pipeline.

## How to Run

Open `index.html` in a browser. No framework, library, build command, or server is needed.

## How to Go Through the Project

1. Start with `index.html`.
   - Identify the Create Task button, dialog form, task list container, theme button, propagation demo, and browser rendering pipeline section.

2. Study `script.js`.
   - `createTaskCard()` uses `createElement()`, `createTextNode()`, `appendChild()`, `append()`, and custom `data-*` attributes.
   - `handleTaskAction()` uses event delegation by listening on `#taskList` instead of every task card.
   - `editTask()`, `completeTask()`, and `deleteTask()` show real DOM updates.

3. Test attributes vs properties.
   - Click Create Task and change the task title input in the dialog.
   - Click "Compare input.value".
   - Open the console and compare `input.value` with `input.getAttribute("value")`.

4. Test event propagation.
   - Open the browser console.
   - Click the child button inside the propagation boxes.
   - Capturing logs run outer-to-inner.
   - Bubbling logs run inner-to-outer.

5. Test every required DOM method.
   - `append()` creates task internals.
   - `prepend()` adds a new task at the top.
   - `before()` inserts the hint before the task list.
   - `after()` adds a delete message after a task.
   - `replaceWith()` replaces a title while editing.
   - `remove()` deletes cards and temporary notices.

6. Use the bonus features.
   - Search tasks by title.
   - Filter tasks by category.

## Requirement Checklist

- Task creation form
- Dynamic task cards
- `data-id`, `data-status`, and `data-category`
- `getAttribute()`, `setAttribute()`, `removeAttribute()`, `hasAttribute()`, and `dataset`
- Edit, complete, and delete actions
- Dark mode and light mode using `classList`, `dataset`, and `setAttribute()`
- Event delegation
- Event bubbling and capturing demo
- Browser rendering pipeline visual section
- Search and category filter bonus features
