import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; //for routing
import './App.css';
import { HomePage, LoginPage, SignupPage, ProfilePage, ExplorePage, NoMatchPage, BookmarksPage, SinglePostPage, UsersProfilePage } from './pages';
import RequireAuth from './utils/RequiresAuth';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter> {/*UI in sync with URL*/}
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/profile/:username" element={<RequireAuth><UsersProfilePage /></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post/:id" element={<RequireAuth><SinglePostPage /></RequireAuth>}/>
        <Route path="/bookmarks" element={<RequireAuth><BookmarksPage /></RequireAuth>} />
        <Route path="/explore" element={<RequireAuth><ExplorePage /></RequireAuth>} />
        <Route path="*" element={<NoMatchPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
