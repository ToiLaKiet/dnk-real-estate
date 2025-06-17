import './styles/App.css';
import Header from './components/ui/parts/header.jsx';
import Gioithieu from './pages/terms/Gioithieu.jsx';
import Footer from './components/ui/parts/footer.jsx';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar1 from './assets/SearchBar-1.png'; // Import Searchbar1 component
import SearchBar2 from './assets/SearchBar-2.png'; // Import Searchbar2 component
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
import PostCreate from './components/ui/postcreate/postcreate.jsx';
import TinTuc  from './pages/news/tintuc.jsx';
import UserDashboard from './pages/userdashboard/userdashboard.jsx';
import ImageUploadModal from './components/ui/postcreate/ImageUploadModal.jsx';
import FavoritePosts from './pages/favorite/FavoritePage.jsx';
import AdminDashboard from './pages/admindashboard/admindashboard.jsx';
import NotFoundPage from './pages/error/404.jsx';
import AppBa from './pages/featurednews/AppBa.jsx'; // Import AppBa component
import AppFav from './pages/featurednews/AppFav.jsx';
import NewsCreate from './components/ui/newscreate/newscreate.jsx';
import AppFeaturedProp from './pages/featurednews/AppFeaturedProp.jsx';
import PropertyByLocation from './pages/featurednews/PropertyByLocation.jsx'; // Import PropertyByLocation component
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
                <img
                    src={SearchBar1}
                    alt={'SearchBar1'}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="Searchbar2">
                  <img
                      src={SearchBar2}
                      alt={'SearchBar2'}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
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
            <div className='m-app-container'><FeaturedNews /> </div>
            <AppFav />
            <PropertyByLocation />
            <AppFeaturedProp />
            <AppBa />

            <Footer />
          </div>
        }
      />
      {/*Route cho trang */}
      <Route path="/news/:id" element={<ArticlePage />} /> {/*Route cho trang bài báo */}
      <Route path="/gioithieu" element={<Gioithieu />} /> {/* Trang giới thiệu */}
      <Route path="/home" element={<App/>} /> {/* Trang chính */}
      <Route path="/postspage/:id" element={<PostsPage/>} /> {/* Trang chính */}
      <Route path="/nha-dat-ban" element={<NhaDatBan />} /> {/* Trang nhà đất bán */}
      <Route path="/du-an" element={<DuAn />} /> {/* Trang dự án */}
      <Route path="/post-create" element={<PostCreate />} /> {/* Trang đăng bài */}
      <Route path="/nha-dat-cho-thue" element={<NhaDatChoThue />} /> {/* Trang dự án */}
      <Route path="/tin-tuc" element={<TinTuc />} /> {/* Trang dự án */}
      <Route path="/profile" element={<UserDashboard />} /> {/* Trang dự án */}
      <Route path="/post-create/image-upload" element={<ImageUploadModal />} /> {/* Trang dự án */}
      <Route path="/favorite" element ={<FavoritePosts/>}/>
      <Route path="/admin" element ={<AdminDashboard/>}/>
      <Route path="*" element={<NotFoundPage />} /> {/* Trang 404 */}
      <Route path="/news-create" element={<NewsCreate />} /> {/* Trang tạo bài viết mới */}
    </Routes>
    </AuthProvider>
  );
}

export default App;

