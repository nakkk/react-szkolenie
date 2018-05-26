import React from 'react';
import ReactDOM from 'react-dom';

const poWyslaniu = (e) => {
    e.preventDefault();
    alert('lol!');
};

const Login = (props) => {
    console.log(props);
    return (
        <form onSubmit={props.onSubmit}>
            <input type="text" placeholder={props.inputPlaceholder}/>
            <button>{props.label}</button>
        </form>
    );
}

ReactDOM.render(
    <Login label="Zaloguj" inputPlaceholder="podaj login..." onSubmit={poWyslaniu}/>,
    document.getElementById('root')
);