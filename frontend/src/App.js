import './styles/App.css';
import Header from './components/ui/parts/header.jsx';
import Gioithieu from './pages/terms/Gioithieu.jsx';
import Footer from './components/ui/parts/footer.jsx';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Searchbar1 from './components/Searchbar1.js';
import Searchbar2 from './components/Searchbar2.js';
import SearchEngine from './components/ui/search-engine.jsx';
import FeaturedNews from './pages/featurednews/featurednews.jsx';
import ArticlePage from './pages/featurednews/ArticlePage.jsx';
import { AuthProvider } from '../src/components/ui/context/AuthContext.jsx';
import PostsPage  from './pages/PostsPage.jsx'; // Import PostsPage component
import NhaDatBan from './pages/nhadatban/nhadatban.jsx';
import NhaDatChoThue from './pages/nhadatchothue/nhadatchothue.jsx';
import DuAn from './pages/duan/duan.jsx';
import SearchBar3 from './assets/SearchBar-3.png'; // Import SearchBar3 image
import SearchBar4 from './assets/SearchBar-4.png'; // Import SearchBar3 image
function App() {
  const seUseCase = {
    all:1,
    nhadatban:0,
    nhadatchothue:0,
    duan:0,
  }
  return (
    <AuthProvider>
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex-box">
            <Header/>
            <div className="content">
              <div className="App-banner">
                <div className="Searchbar1">
                  <Searchbar1 />
                </div>
                <div className="Searchbar2">
                  <Searchbar2 />
                </div>
                <div className="Searchbar4">
                <img
                  src={SearchBar4}
                  alt={'Searchbar4'}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                </div>
                <div className="Searchbar3">
                  <img
                    src={SearchBar3}
                    alt={'SearchBar3'}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <SearchEngine useCase={seUseCase}/>
              </div>
            </div>
            <FeaturedNews /> 
            <Footer />
          </div>
        }
      />
      {/*Route cho trang */}
      <Route path="/article/:id" element={<ArticlePage />} /> {/*Route cho trang bài báo */}
      <Route path="/gioithieu" element={<Gioithieu />} /> {/* Trang giới thiệu */}
      <Route path="/home" element={<App/>} /> {/* Trang chính */}
      <Route path="/postspage/:id" element={<PostsPage/>} /> {/* Trang chính */}
      <Route path="/nha-dat-ban" element={<NhaDatBan />} /> {/* Trang nhà đất bán */}
      <Route path="/du-an" element={<DuAn />} /> {/* Trang dự án */}
      <Route path="/nha-dat-cho-thue" element={<NhaDatChoThue />} /> {/* Trang dự án */}
    </Routes>
    </AuthProvider>
  );
}

export default App;

