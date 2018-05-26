import io from "socket.io-client";

let socket;

const api = {
  open: () => {
    socket = io('http://147.135.192.225:8080', {jsonp: false});
    socket.on('connect', () => {                                                                            
      console.log('Connected to API');
    });   
  },

  listen: (callback) => {
    socket.on('echo', (data) => {
      callback(data);
    });
  },

  close: () => {
    socket.close();
  },

  send: (author, message) => {
    socket.emit('msg', {
      author,
      message
    });
  }
}

export const mock = {
  open: () => {
    setTimeout(() => {
      mock.send('System', 'Witaj na warsztatach Node School :)');
    }, 250);
    console.log('Connected to mock server');
  },

  close: () => null,

  listen: (callback) => {
    mock.callback = callback;
  },

  send: (author, message) => {
    mock.callback({
      id: Math.random(),
      author: author,
      message: message,
      date: new Date()
    });
  }
}

export default api;
