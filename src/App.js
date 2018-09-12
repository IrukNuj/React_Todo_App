import React, {Component} from 'react';
import './App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const todos_base = [];

function TodoHeader(props) {
    const remaining = props.todos.filter(todo => {
        return !todo.isDone;
    });

    return (
        <h1>
            Todo List<span>({remaining.length}/{props.todos.length})</span>
        </h1>
    )
}

function TodoItem(props) {
    return (
        <List>
            <ListItem
                key={props.todo.id}
                className={props.todo.title}
            >
                <label className="TodoContent">
                    <Checkbox
                        checked={props.todo.isDone}
                        onChange={() => props.checkTodo(props.todo)}
                    />
                    <span className={props.todo.isDone ? 'done' : ''}>
                        {props.todo.title}
                    </span>
                </label>
                <IconButton
                    className="delete"
                    aria-label="Delete"
                    onClick={() =>
                        props.deleteTodo(props.todo)
                    }
                >
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        </List>
    )
}

function TodoList(props) {
    const todos = props.todos.map(todo => {
        return (
            <TodoItem
                key={todo.id}
                todo={todo}
                checkTodo={props.checkTodo}
                deleteTodo={props.deleteTodo}
            />
        )
    });
    return (
        <ul>
            {props.todos.length ? todos : <li>Nothing to do!</li>}
        </ul>
    )
}

function TodoForm(props) {
    return (
        <form onSubmit={props.addTodo}>
            <FormControl>
                <InputLabel htmlFor="name-simple">Add Todo</InputLabel>
                <Input id="add-todo" value={props.item} onChange={props.updateItem} />
            </FormControl>

            <Button variant="fab" mini color="primary" id="add-button" aria-label="Add" type="submit">
                <AddIcon />
            </Button>
        </form>
    )
}

function getUniqueId() {
    return new Date().getTime().toString(36) + '-' + Math.random().toString(36);
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: todos_base,
            item: ''
        };
        this.checkTodo = this.checkTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    addTodo(e) {
        e.preventDefault();

        if (this.state.item.trim() === '') {
            return;
        }

        const item = {
            id: getUniqueId(),
            title: this.state.item,
            isDone: false
        };

        const todos = this.state.todos.slice();
        todos.push(item);
        this.setState({
            todos: todos,
            item: ''
        });
    }

    deleteTodo(todo) {
        if (!window.confirm('削除しても大丈夫ですか?')) {
            return;
        }

        const todos = this.state.todos.slice();
        const pos = this.state.todos.indexOf(todo);

        todos.splice(pos, 1)
        this.setState({
            todos: todos
        });
    }

    checkTodo(todo) {
        const todos = this.state.todos.map(todo => {
            return {id: todo.id, title: todo.title, isDone: todo.isDone};
        });

        const pos = this.state.todos.map(todo => {
            return todo.id;
        }).indexOf(todo.id);

        todos[pos].isDone = !todos[pos].isDone;
        this.setState({
            todos: todos
        })
    }

    updateItem(e) {
        this.setState({
            item: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <TodoHeader
                    todos={this.state.todos}
                />
                <TodoList
                    todos={this.state.todos}
                    checkTodo={this.checkTodo}
                    deleteTodo={this.deleteTodo}
                    addTodo={this.addTodo}
                />
                <TodoForm
                    item={this.state.item}
                    updateItem={this.updateItem}
                    addTodo={this.addTodo}
                />
            </div>
        );
    }
}

export default App;
