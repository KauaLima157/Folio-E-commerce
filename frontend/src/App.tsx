import { BrowserRouter } from 'react-router-dom';
import { ChatWidget } from './components/ChatWidget';
import { AppRoutes } from './routes';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;
