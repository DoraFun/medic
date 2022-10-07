// import Gallery from "./components/gallery/Gallery";
import ImageGallery from 'react-image-gallery';
import Content from "./components/routes/Content";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Services from "./components/routes/Services";
import Specialists from "./components/routes/Specialists";
import News from './components/routes/News';
import Contacts from './components/routes/Contacts';
import logo from './components/images/header/logo.png';
import logo_slogan from './components/images/header/logo_slogan.png';
import year from './components/images/header/year.png';
import Popus from './components/popup/Popus';



// const images = [
//   {
//     original: 'https://3ost.ru/uploads/posts/2022-07/1657402195_minions-the-rise-of-gru.jpg',


//   },
//   {
//     original: 'https://oceanballoons.ru/content/photo/full/V0081_img1.jpg',


//   },
//   {
//     original: 'http://cdn.shopify.com/s/files/1/0069/0854/3041/products/214835c0-0b1e-447a-83e8-a732f98b1353_1.2edff5964a9b53fae150843be4c1c8e4_800x.jpg?v=1572118947',


//   },
// ];

function App() {
  return (
    <div className="grid grid-flow-row mx-auto App max-w-screen-2xl gap-y-10 ">
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between'>
          <img src={logo} className='self-center' alt='logo' />
          <img src={logo_slogan} className='self-center' alt='logo_slogan' />
          <img src={year} className='self-center' alt='year' />
          <Popus/>
        </div>
        <div className=''>
          <BrowserRouter>
            <div className='grid items-center h-16 grid-cols-5 mb-3 text-lg font-medium text-center text-white uppercase bg-emerald-500 gap-x-2'>
              <div><Link to="/" >Главная</Link> </div>
              <div><Link to="/services" >Услуги</Link> </div>
              <div><Link to="/specialists" >Специалисты</Link> </div>
              <div><Link to="/news" >Новости</Link> </div>
              <div><Link to="/contacts" >Контакты</Link> </div>
            </div>
            <Routes>
              <Route index element={<Content />} />
              <Route path="/services" element={<Services />} />
              <Route path="/specialists" element={<Specialists />} />
              <Route path="/news" element={<News />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      {/* <ImageGallery items={images} showNav={false} showThumbnails={false} showFullscreenButton={false} showBullets={false} autoPlay={true} showPlayButton={false} /> */}

    </div>
  );
}

export default App;
