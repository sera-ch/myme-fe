import './App.css'
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadMemeForm from './components/UploadMemeForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/upload" element={<UploadMemeForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
