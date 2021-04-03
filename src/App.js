import React from 'react';
import MainPage from "./pages/mainpage";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from "./pages/homepage";
import FormPage from "./pages/mainpage/events/formpage";
import Header from "./components/header";
import DetailPage from "./pages/detail";
import SignInForm from "./components/login/signform";
import ModalManage from "./components/login/modalmanage";
import ChangePassword from "./components/header/changepassword";
import ErrorPage from "./pages/Errorpage";
import Profile from "./pages/profile";
import ScrollToTop from "./scrolltotop";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import LoadingPage from "./pages/loading";
import PrivateRouter from "./components/login/privaterouter";
import { ConnectedRouter } from 'connected-react-router'
import {history} from "./store";



function App() {
    const {initial}=useSelector(state=>state.asyn);
    if(!initial) return <LoadingPage/>
    return (
        <>
            <ConnectedRouter history={history}>
            <ToastContainer position="bottom-right"
                            hideProgressBar={true}/>
            <ModalManage/>
                <ScrollToTop/>
                <Route path='/' exact component={HomePage}></Route>
                <Route path={"/(.+)"} exact render={() => (
                    <>
                        <Header/>
                        <Switch>
                            <Route path='/events' exact component={MainPage}></Route>
                            <PrivateRouter path={['/create', '/manage/:selectedId']} exact component={FormPage}></PrivateRouter>
                            <Route path='/eventdetail/:id' exact component={DetailPage}></Route>
                            <Route path='/sign' exact component={SignInForm}></Route>
                            <PrivateRouter path='/account' exact component={ChangePassword}></PrivateRouter>
                            <PrivateRouter path='/profile/:id' exact component={Profile}></PrivateRouter>
                            <Route component={ErrorPage}></Route>
                        </Switch>
                    </>
                )}></Route>
            </ConnectedRouter>
        </>
    );
}

export default App;
