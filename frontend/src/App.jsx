import {Route, Routes} from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TransactionPage from './pages/TransactionPage';
import NotFoundPAge from './pages/NotFoundPage';
import Header from "./components/ui/Header";

function App() {
  const authUser = true

  return (
    <>
    {authUser && <Header/>}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/transaction/:id" element={<TransactionPage/>}/>
      <Route path="*" element={<NotFoundPAge/>}/>
    </Routes>
    </>
  )
}


export default App
