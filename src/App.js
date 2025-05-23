import React from 'react';
import './App.css';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: '',
            filter: 'all',
            priorityFilter: 'all',
            sortBy: 'none',
            dueDateFilter: 'all',
            priority: 'medium',
            dueDate: '',
            showAddForm: false,
            isDarkTheme: false
        };
    }

    toggleTheme = () => {
        this.setState(prevState => ({
            isDarkTheme: !prevState.isDarkTheme
        }));
    };

    setPriorityFilter = (priorityFilter) => {
        this.setState({ priorityFilter });
    };

    setSortBy = (sortBy) => {
        this.setState({ sortBy });
    };

    setDueDateFilter = (dueDateFilter) => {
        this.setState({ dueDateFilter });
    };

    addTodo = () => {
        if (this.state.newTodo.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: this.state.newTodo,
            completed: false,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            createdAt: new Date()
        };

        this.setState({
            todos: [...this.state.todos, newTodo],
            newTodo: '',
            priority: 'medium',
            dueDate: '',
            showAddForm: false
        });
    };

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        });
    };

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    };

    setFilter = (filter) => {
        this.setState({ filter });
    };

    getFilteredTodos = () => {
        let filtered = [...this.state.todos];

        // Filter by completion status
        if (this.state.filter === 'completed') {
            filtered = filtered.filter(todo => todo.completed);
        } else if (this.state.filter === 'incomplete') {
            filtered = filtered.filter(todo => !todo.completed);
        }

        // Filter by priority
        if (this.state.priorityFilter !== 'all') {
            filtered = filtered.filter(todo => todo.priority === this.state.priorityFilter);
        }

        // Sort todos
        if (this.state.sortBy === 'priority') {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        } else if (this.state.sortBy === 'date') {
            filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }

        return filtered;
    };

    editTodo = (id) => {
        const todo = this.state.todos.find(todo => todo.id === id);
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null) {
            this.setState({
                todos: this.state.todos.map(todo =>
                    todo.id === id ? { ...todo, text: newText } : todo
                )
            });
        }
    };
    
    render() {
        const filteredTodos = this.getFilteredTodos();
        const priorityColors = {
            high: '#ff4d4d',
            medium: '#ffa64d',
            low: '#4dff4d'
        };

        return (
            <div className={`todo-app ${this.state.isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                <header className="app-header">
                    <div className="header-content">
                        <h1>Task Master</h1>
                        <p className="subtitle">Organize your day, achieve your goals</p>
                    </div>
                    <div className="theme-toggle">
                        <input
                            type="checkbox"
                            id="theme-switch"
                            checked={this.state.isDarkTheme}
                            onChange={this.toggleTheme}
                        />
                        <label htmlFor="theme-switch" className="theme-label">
                            <span className="theme-icon">🌙</span>
                            <span className="theme-icon">☀️</span>
                        </label>
                    </div>
                </header>

                <div className="controls">
                    <div className="filters">
                        <div className="filter-group">
                            <button
                                className={`filter-btn ${this.state.filter === 'all' ? 'active' : ''}`}
                                onClick={() => this.setState({ filter: 'all' })}
                            >
                                <span className="filter-icon">📋</span>
                                All Tasks
                            </button>
                            <button
                                className={`filter-btn ${this.state.filter === 'completed' ? 'active' : ''}`}
                                onClick={() => this.setState({ filter: 'completed' })}
                            >
                                <span className="filter-icon">✅</span>
                                Completed
                            </button>
                            <button
                                className={`filter-btn ${this.state.filter === 'incomplete' ? 'active' : ''}`}
                                onClick={() => this.setState({ filter: 'incomplete' })}
                            >
                                <span className="filter-icon">⏳</span>
                                Incomplete
                            </button>
                        </div>

                        <div className="filter-group">
                            <button
                                className={`filter-btn ${this.state.priorityFilter === 'high' ? 'active' : ''}`}
                                onClick={() => this.setState({ priorityFilter: 'high' })}
                            >
                                <span className="filter-icon">🔥</span>
                                High Priority
                            </button>
                            <button
                                className={`filter-btn ${this.state.priorityFilter === 'medium' ? 'active' : ''}`}
                                onClick={() => this.setState({ priorityFilter: 'medium' })}
                            >
                                <span className="filter-icon">⚡</span>
                                Medium Priority
                            </button>
                            <button
                                className={`filter-btn ${this.state.priorityFilter === 'low' ? 'active' : ''}`}
                                onClick={() => this.setState({ priorityFilter: 'low' })}
                            >
                                <span className="filter-icon">💧</span>
                                Low Priority
                            </button>
                        </div>

                        <div className="filter-group">
                            <button
                                className={`filter-btn ${this.state.sortBy === 'priority' ? 'active' : ''}`}
                                onClick={() => this.setState({ sortBy: 'priority' })}
                            >
                                <span className="filter-icon">📊</span>
                                Sort by Priority
                            </button>
                            <button
                                className={`filter-btn ${this.state.sortBy === 'date' ? 'active' : ''}`}
                                onClick={() => this.setState({ sortBy: 'date' })}
                            >
                                <span className="filter-icon">📅</span>
                                Sort by Date
                            </button>
                        </div>
                    </div>

                    <button 
                        className="add-task-btn"
                        onClick={() => this.setState({ showAddForm: !this.state.showAddForm })}
                    >
                        <span className="add-icon">
                            <svg viewBox="0 0 24 24" className="add-svg">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                        </span>
                        {this.state.showAddForm ? 'Cancel' : 'Add New Task'}
                    </button>
                </div>

                {this.state.showAddForm && (
                    <div className="add-task-form">
                        <div className="form-group">
                            <input
                                type="text"
                                value={this.state.newTodo}
                                onChange={(e) => this.setState({ newTodo: e.target.value })}
                                placeholder="What needs to be done?"
                                className="task-input"
                            />
                        </div>
                        <div className="form-group">
                            <select
                                value={this.state.priority}
                                onChange={(e) => this.setState({ priority: e.target.value })}
                                className="priority-select"
                            >
                                <option value="high">High Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="low">Low Priority</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                value={this.state.dueDate}
                                onChange={(e) => this.setState({ dueDate: e.target.value })}
                                className="date-input"
                            />
                        </div>
                        <button 
                            onClick={this.addTodo} 
                            className="submit-btn"
                            disabled={!this.state.newTodo.trim()}
                        >
                            <span className="submit-icon">
                                <svg viewBox="0 0 24 24" className="submit-svg">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                            </span>
                            Add Task
                        </button>
                    </div>
                )}

                <div className="todo-list">
                    {filteredTodos.map(todo => (
                        <div 
                            key={todo.id} 
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                            style={{ borderLeft: `4px solid ${priorityColors[todo.priority]}` }}
                        >
                            <div className="todo-content">
                                <div className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => this.toggleComplete(todo.id)}
                                        className="todo-checkbox"
                                        id={`todo-${todo.id}`}
                                    />
                                    <label htmlFor={`todo-${todo.id}`} className="checkbox-label"></label>
                                </div>
                                <div className="todo-text">
                                    <span className="task-text">{todo.text}</span>
                                    {todo.dueDate && (
                                        <span className="due-date">
                                            <span className="due-icon">📅</span>
                                            Due: {new Date(todo.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                    <span className={`priority-badge ${todo.priority}`}>
                                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                                    </span>
                                </div>
                            </div>
                            <div className="todo-actions">
                                <button 
                                    onClick={() => this.editTodo(todo.id)}
                                    className="action-btn edit-btn"
                                    title="Edit Task"
                                >
                                    <svg viewBox="0 0 24 24" className="action-icon">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => this.deleteTodo(todo.id)}
                                    className="action-btn delete-btn"
                                    title="Delete Task"
                                >
                                    <svg viewBox="0 0 24 24" className="action-icon">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTodos.length === 0 && !this.state.showAddForm && (
                    <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <p>No tasks found. Click "Add New Task" to get started!</p>
                    </div>
                )}
            </div>
        );
    }
}

export default TodoApp;
