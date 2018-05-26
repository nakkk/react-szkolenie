import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
    static defaultProps = {
        label: "Zaloguj",
        inputPlaceholder: "Podaj login..."
    };

    state = {
        user: null
    };

    render () {
        const props = this.props;
        console.log(props);
        return (
            <form onSubmit = {(e) => {
                if(this.state.user) {
                    alert(this.state.user)
                }
                e.preventDefault();
            }}>
                <input type="text"
                    placeholder={props.inputPlaceholder}
                    onChange = { e => {
                        this.setState({
                            user: e.target.value
                        })
                    }}
                />
                <button>{props.label}</button>
            </form>
        );
    };
};

ReactDOM.render(
    <Login />,
    document.getElementById('root')
);