import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { todos } from './todos.json';
import FormCreateTask from './components/FormCreateTask';
// import firebase from 'firebase';
import firebase from 'firebase/app';
import { DB_CONFIG } from './config/config';
import 'firebase/database';

class App extends Component {

  constructor() {
    super();
    this.state = {
      //todos: todos
      todos: [

      ]
    }

    this.app = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();
    this.db = this.app.database().ref().child('tasks')

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  componentDidMount = () => {

    const { todos } = this.state;

    this.db.on('child_added', snap => {

      todos.push({
        id: snap.key,
        title: snap.val().title,
        responsible: snap.val().responsible,
        priority: snap.val().priority,
        description: snap.val().description,

      })

      this.setState({ todos });

    });

    this.db.on('child_removed', snap => {

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === snap.key){
          todos.splice(i,1);
        }
      }

      this.setState({todos})

    });
  };


  handleAddTodo(task) {

    // this.setState({
    //   todos: [...this.state.todos, task]
    // });

    // this.db.push().set({title:task.title})
    this.db.push().set(task)

  }

  removeTodo(id) {

    this.db.child(id).remove();

    // if (window.confirm('Esta seguro de eliminar la tarea ?')) {
    //   this.setState({
    //     todos: this.state.todos.filter((t, i) => {
    //       return i !== index
    //     })
    //   });
    // }

  }

  render() {

    //Procesar los datos
    const tareas = this.state.todos.map((task) => {
      return (
        <div className="col-md-4" key={task.id}>
          <div className="card mt-4" >
            <div className="card-header">
              <h3> {task.title} </h3>
              <div className="badge badge-pill badge-danger ml-2">
                {task.priority}
              </div>
            </div>
            <div className="card-body">
              <p>{task.description}</p>
              <p><mark>{task.responsible}</mark></p>
            </div>

            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={this.removeTodo.bind(this, task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="App" >

        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="www.t.com">
            Tasks <span className="badge badge-pill badge-light ml-2">{this.state.todos.length}</span>
          </a>
        </nav>

        <div className="container">
          <div className="row mt-4">

            <div className="col-md-4 text-center">
              <div>
                <img src={logo} className="App-logo" alt="logo" />
                <FormCreateTask onAddTodo={this.handleAddTodo} />
              </div>
            </div>

            <div className="col-md-8">
              <div className="row">
                {tareas}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

}

export default App;
