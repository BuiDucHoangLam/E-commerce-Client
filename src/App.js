import React,{useEffect} from 'react'
import {Switch,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'
import Login from './pages/Authorization/Login'
import Register from './pages/Authorization/Register'
import Header from './component/nav/Header'
import RegisterComplete from './pages/Authorization/RegisterComplete';
import ForgotPassword from './pages/Authorization/ForgotPassword';
import History from './pages/user/History';
import UserRoute from './component/routes/UserRoute';
import AdminRoute from './component/routes/AdminRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/product/ProductCreate';

import {auth} from './component/firebase'
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';

const App =() => {
  const dispatch = useDispatch()

  // To check firebase auth state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=> {
      
      if(user) {
        console.log(user);
        const idTokenResult = await user.getIdTokenResult()

        // Use current instead of createOrUpdate to prevent losing info
        currentUser(idTokenResult.token)
        .then(res=>{
          dispatch({
            type:'LOGGED_IN_USER',
            payload:{
              name:res.data.name,
              email:res.data.email,
              token:idTokenResult.token,
              role:res.data.role,
              _id:res.data._id,
            }
          })
        })
        .catch(err => console.log(err))
      }
    })

    return () => unsubscribe()
  },[dispatch])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete}/>
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component ={History} />
        <UserRoute exact path="/user/password" component ={Password} />
        <UserRoute exact path="/user/wishlist" component ={Wishlist} />
        <AdminRoute exact path ="/admin/dashboard" component = {AdminDashboard} />
        <AdminRoute exact path ="/admin/category" component = {CategoryCreate} />
        <AdminRoute exact path ="/admin/category/:slug" component = {CategoryUpdate} />
        <AdminRoute exact path ="/admin/sub" component = {SubCreate} />
        <AdminRoute exact path ="/admin/sub/:slug" component = {SubUpdate} />
        <AdminRoute exact path ="/admin/product" component = {ProductCreate} />
        
      </Switch>
    </>
  )
}

export default App

