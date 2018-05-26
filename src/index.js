import React from 'react';
import ReactDOM from 'react-dom';

const api = require("./utils/api.js").default

class TextInput extends React.Component {
    static defaultProps = {
        label: "Zaloguj",
        inputPlaceholder: "Podaj login..."
    };

    state = {
        text: null
    };

    render () {
        const props = this.props;
        return (
            <form onSubmit = {(e) => {
                console.log(this.state.text + "przed if")
                if(this.state.text) {
                    this.props.onSubmit(this.state.text);
                    this.setState({
                        text: null
                    })
                }
                e.preventDefault();
            }}>
                <input type="text"
                    placeholder={props.inputPlaceholder}
                    onChange = { e => {
                        this.setState({
                            text: e.target.value
                        })
                    }}
                />
                <button>{props.label}</button>
            </form>
        );
    };
};

const Messages = [];

class ChatList extends React.Component {
    render() {
        const props = this.props;

        return (
            <div>
            {props.Messages.map(m => {
                return <div key={m.id}><i>{m.date} </i><b>{m.author}</b>: {m.message}</div>
            })}
            </div>
        )
    }
}

class Chat extends React.Component {
    state = {
        Messages,
        UserName: undefined
    }
    componentDidMount() {
        api.open()                     
        api.listen((msg) => {
            console.log(msg)
            this.setState({
                Messages: [
                    ...this.state.Messages,
                    {
                        id: this.state.Messages.length + 1,
                        author: msg.author,
                        message: msg.message,
                        date: msg.date
                    }
                ]
            })
        })  
    }
    
    render () {
        if (!this.state.UserName) {
            return <TextInput label = "Zaloguj" inputPlaceholder = "wpisz login..." onSubmit={name => this.setState({
                UserName: name
            })} />
        }
        return (
            <div>    
                <ChatList Messages = {this.state.Messages}/>
                <TextInput label = "Napisz" inputPlaceholder = "wpisz tekst..." onSubmit = { text => {
                     api.send(this.state.UserName, text)         
                }}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Chat />,
    document.getElementById('root')
);