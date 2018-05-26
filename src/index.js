import React from 'react';
import ReactDOM from 'react-dom';

const Login = (props) => {
    console.log(props);
    return (
        <form>
            <input type="text" placeholder={props.inputPlaceholder}/>
            <button>{props.label}</button>
        </form>
    );
}

ReactDOM.render(
    <Login label="Zaloguj" inputPlaceholder="podaj login..."/>,
    document.getElementById('root')
);