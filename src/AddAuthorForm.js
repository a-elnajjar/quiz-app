import React from 'react';
import { connect } from 'react-redux';
import "./AddAuthorForm.css";
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        imageUrl: { type: 'string', format: 'uri' },
        books: { type: 'array', items: { type: 'string' }, minItems: 1 }
    },
    required: ['name', 'imageUrl', 'books']
};

const validate = ajv.compile(schema);

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: '',
            errors: {}
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    validate() {
        const errors = {};

        const payload = {
            name:     this.state.name.trim(),
            imageUrl: this.state.imageUrl.trim(),
            books:    this.state.books.map(b => b.trim()).filter(b => b.length > 0)
        };

        const valid = validate(payload);
        if (!valid) {
            validate.errors.forEach(err => {
                if (err.instancePath === '/name')     errors.name = 'Name is required';
                if (err.instancePath === '/imageUrl') errors.imageUrl = 'Must be a valid URL';
                if (err.instancePath === '/books')    errors.books = 'At least one book is required';
                if (err.instancePath.startsWith('/books/')) errors.books = 'Book titles cannot be empty';
            });
        }

        return errors;
    }

    handleSubmit(event) {
        event.preventDefault();
        const errors = this.validate();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }
        this.props.onAddAuthor({
            name: this.state.name,
            imageUrl: this.state.imageUrl,
            books: this.state.books
        });
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errors: { ...this.state.errors, [event.target.name]: undefined }
        });
    }

    handleAddBook() {
        if (!this.state.bookTemp.trim()) return;
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: '',
            errors: { ...this.state.errors, books: undefined }
        });
    }

    render() {
        const { errors } = this.state;
        return <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm__input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
                {errors.name && <span className="AddAuthorForm__error">{errors.name}</span>}
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
                {errors.imageUrl && <span className="AddAuthorForm__error">{errors.imageUrl}</span>}
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="bookTemp">Books</label>
                {this.state.books.map((book) => <p key={book}>{book}</p>)}
                <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} />
                <input type="button" value="+" onClick={this.handleAddBook} />
                {errors.books && <span className="AddAuthorForm__error">{errors.books}</span>}
            </div>
            <input type="submit" value="Add"/>
        </form>;
    }
}

function AddAuthorForm({ onAddAuthor }) {
    return <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>;
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            ownProps.history.push('/');
        }
    };
}

export default connect(null, mapDispatchToProps)(AddAuthorForm);
