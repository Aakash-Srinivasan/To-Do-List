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
        };
    }

    // ... (previous methods)

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

        const newTodos = [...this.state.todos, { text: this.state.newTodo, completed: false }];
        this.setState({ todos: newTodos, newTodo: '' });
    };

    toggleComplete = (index) => {
        const newTodos = [...this.state.todos];
        newTodos[index].completed = !newTodos[index].completed;
        this.setState({ todos: newTodos });
    };

    deleteTodo = (index) => {
        const newTodos = [...this.state.todos];
        newTodos.splice(index, 1);
        this.setState({ todos: newTodos });
    };

    setFilter = (filter) => {
        this.setState({ filter });
    };

    getFilteredTodos = () => {
        const { todos, filter } = this.state;
        switch (filter) {
            case 'completed':
                return todos.filter((todo) => todo.completed);
            case 'incomplete':
                return todos.filter((todo) => !todo.completed);
            default:
                return todos;
        }
    };
// ... (previous code)

    editTodo = (index) => {
        const newText = prompt('Edit the task:', this.state.todos[index].text);
        if (newText !== null) {
            const newTodos = [...this.state.todos];
            newTodos[index].text = newText;
            this.setState({ todos: newTodos });
        }
    };
    
    render() {
        const filteredTodos = this.getFilteredTodos();

        return (
            <div className="todo-app">
                <div className="heading">To-Do-List</div>
                <div className="quote">"The best way to get something done is to begin."</div>
                <div>
                    <input
                        type="text"
                        value={this.state.newTodo}
                        onChange={(e) => this.setState({ newTodo: e.target.value })}
                        placeholder="Add a new todo"
                    />
                    <button onClick={this.addTodo}>Add</button>
                </div>
                <ul className="todo-list">
                    {filteredTodos.map((todo, index) => (
                        <li key={index} className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => this.toggleComplete(index)}
                            />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.text}
                            </span>
                            <button className="edit-btn" onClick={() => this.editTodo(index)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => this.deleteTodo(index)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="filter-bar">
                    <button
                        onClick={() => this.setFilter('all')}
                        className={this.state.filter === 'all' ? 'active' : ''}
                    >
                        All
                    </button>
                    <button
                        onClick={() => this.setFilter('completed')}
                        className={this.state.filter === 'completed' ? 'active' : ''}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => this.setFilter('incomplete')}
                        className={this.state.filter === 'incomplete' ? 'active' : ''}
                    >
                        Incomplete
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
