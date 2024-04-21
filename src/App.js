import { Provider } from 'react-redux';
import './App.css';
import { Navbar } from './components/Navbar';
import ProductCard from './components/ProductCard';
import { ProductCatalogue } from './components/ProductCatalogue';
import store from './redux/store';

function App() {
  return (
    
    <Provider store={store}>
    <div className="App">
      <Navbar />
      <ProductCatalogue />
    </div>
    </Provider>
  );
}

export default App;
