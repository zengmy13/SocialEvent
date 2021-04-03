import React from 'react';
import Mainpage from "./pages/mainpage";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from "./pages/homepage";
import Formpage from "./pages/mainpage/events/formpage";
import Header from "./components/header";
import Detailpage from "./pages/detail";
import Signinform from "./components/login/signform";
import Modalmanage from "./components/login/modalmanage";
import Changepassword from "./components/header/changepassword";
import Errorpage from "./pages/Errorpage";
import Profile from "./pages/profile";
import ScrollToTop from "./scrolltotop";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import Loadingpage from "./pages/loading";
import Privaterouter from "./components/login/privaterouter";
import { ConnectedRouter } from 'connected-react-router'
import {history} from "./store";



function App() {
    const {initial}=useSelector(state=>state.asyn);
    if(!initial) return <Loadingpage/>
    return (
        <>
            <ConnectedRouter history={history}>
            <ToastContainer position="bottom-right"
                            hideProgressBar={true}/>
            <Modalmanage/>
                <ScrollToTop/>
                <Route path='/' exact component={Homepage}></Route>
                <Route path={"/(.+)"} exact render={() => (
                    <>
                        <Header/>
                        <Switch>
                            <Route path='/events' exact component={Mainpage}></Route>
                            <Privaterouter path={['/create', '/manage/:selectedid']} exact component={Formpage}></Privaterouter>
                            <Route path='/eventdetail/:id' exact component={Detailpage}></Route>
                            <Route path='/sign' exact component={Signinform}></Route>
                            <Privaterouter path='/account' exact component={Changepassword}></Privaterouter>
                            <Privaterouter path='/profile/:id' exact component={Profile}></Privaterouter>
                            <Route component={Errorpage}></Route>
                        </Switch>
                    </>
                )}></Route>
            </ConnectedRouter>
        </>
    );
}

export default App;
