import './App.css'
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Error from './components/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadMemeForm from './components/UploadMemeForm';
import SearchResult from './components/SearchResult';
import AdvancedSearchForm from './components/AdvancedSearchForm';
import AdvancedSearchResult from './components/AdvancedSearchResult';

function App() {
    return (
        <BrowserRouter basename={ "/myme-fe" }>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:page" element={<Home />}/>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/error" element={<Error/>} />
                <Route path="/upload" element={<UploadMemeForm />} />
                <Route path="/search/:page" element={<SearchResult />} />
                <Route path="/search/advanced" element={<AdvancedSearchForm />} />
                <Route path="/search/advanced/result/:page" element={<AdvancedSearchResult />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
