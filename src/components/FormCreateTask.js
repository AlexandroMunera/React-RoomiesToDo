import React, { Component } from 'react';

class FormCreateTask extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            responsible: '',
            description: '',
            priority: 'higth'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(e) {
        const { value, name } = e.target;
        console.log('value', value);
        console.log('name', name);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddTodo(this.state);
        this.setState({
            title: '',
            responsible: '',
            description: '',
            priority: 'low'
        });
    }
    render() {
        return (
            <div className="card" >
                <form onSubmit={this.handleSubmit} className="card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            placeholder="Title"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            value={this.state.responsible}
                            onChange={this.handleInputChange}
                            type="text" name="responsible" className="form-control" placeholder="Responsible" />
                    </div>
                    <div className="form-group">
                        <input
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            type="text" name="description" className="form-control" placeholder="Description" />
                    </div>
                    <div className="form-group">
                        <select
                            value={this.state.priority}
                            onChange={this.handleInputChange}
                            name="priority" className="form-control">
                            <option>low</option>
                            <option>medium</option>
                            <option>high</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>

        )
    }

}

export default FormCreateTask;
