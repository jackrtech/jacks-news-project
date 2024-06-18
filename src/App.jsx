import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import HomePage from './components/HomePage'
import ArticlesList from './components/ArticlesList'
import IndividialArticle from './components/IndividualArticle'
import CommentList from './components/CommentList'

function App() {

  console.log('string')

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/articles' element={<ArticlesList />} />
        <Route path='/articles/:article_id' element={<IndividialArticle />} />
        <Route path='/articles/:article_id' element={<CommentList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App