import React,{useState} from 'react'
import { Menu } from 'antd';
import { 
    HomeOutlined, 
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined, 
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import firebase from 'firebase/app';

import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const {SubMenu} = Menu
const {Item} = Menu

function Header() {
    const [current,setCurrent] = useState('home')
    let dispatch = useDispatch()
    const {user} = useSelector((state)=>{
        return ({...state})
    })
    let history = useHistory()

    const handlerClick = (e) => {
        // console.log(e);
        setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type:'LOGOUT',
            payload: null,
        })

        history.push('/login')
    }

    return (
        <Menu onClick={handlerClick} selectedKeys={[current]} mode="horizontal" style={{display:'block'}}>
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>
           
            {!user && (
                <Item key="login" icon={<LogoutOutlined />} style={{float:'right'}}>
                    <Link to="/login">Login</Link>
                </Item>
            )}
            {!user && (
              <Item key="register" icon={<UserAddOutlined />} style={{float:'right'}}>
                <Link to="/register">Register</Link>
              </Item>
            )}

            {user && (
              <SubMenu key="SubMenu" 
                icon={<UserOutlined />} 
                title={user.email && user.email.split('@')[0]} //name@gmail.com ['name','gmail.com'] 
                style={{float:'right'}}
                
              >
              {/* <ItemGroup title="Item 1"> */}
                {
                    user && user.role === 'admin' 
                    && <Item key="dashboard-admin">
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Item>
                }
                {
                    user && user.role === 'subscriber' 
                    && <Item key="dashboard-user">
                        <Link to="/user/history">Dashboard</Link>
                    </Item>
                }
           
                 <Item key ="logout" icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
              {/* </ItemGroup> */}
              </SubMenu>
            )}
           
           
        </Menu>
    )
}

export default Header
