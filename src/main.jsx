
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {store} from "./redux/store"
import  {Provider}  from 'react-redux'

export const server="https://api.themoviedb.org/3"

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <App />
    </Provider>
    
)
