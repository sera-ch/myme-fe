import './App.css'
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadMemeForm from './components/UploadMemeForm';
import SearchResult from './components/SearchResult';
import AdvancedSearchForm from './components/AdvancedSearchForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/upload" element={<UploadMemeForm />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="/search/advanced" element={<AdvancedSearchForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
