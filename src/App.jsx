import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ArticlesList from './components/ArticlesList';
import IndividualArticle from './components/IndividualArticle';
import CommentList from './components/CommentList';
import { UserProvider } from './components/UserComponent';
import IndividualTopic from './components/IndividualTopic'; 

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/articles' element={<ArticlesList />} />
          <Route path='/articles/:article_id' element={<IndividualArticle />} />
          <Route path='/articles/:article_id/comments' element={<CommentList />} />
          <Route path='/topics/:topic' element={<IndividualTopic />} /> 
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
