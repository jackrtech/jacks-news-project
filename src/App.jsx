import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import HomePage from './components/HomePage'
import ArticlesList from './components/ArticlesList'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/articles' element={<ArticlesList />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
