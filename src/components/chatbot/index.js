import React from 'react';
import App from './App'
import { Provider } from "react-redux";
import { store } from "./Chat";



class index extends React.Component {
    render(){
        return (
       <Provider store={store}>
           <App />
       </Provider>
    );
    }
    
}

export default index;
