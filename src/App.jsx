import "./App.scss";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import Layout from "../src/components/Layout/Layout"
import News from "../src/components/News/News"
import StockDetails from "../src/components/Stocks/StocksComponents/StockDetails"
import StockList from '../src/components/Stocks/Stoks'
import Investments from "./components/Investments/Investments"
import Overview from "./components/Overview/Overview"
import Wallet from "./components/Wallet/Wallet"
// import { Welcomme } from "./components/Welcomme/Welcomme"
import { DataContext } from "./context/data.context"




import Loginpage from './components/SignIn/Loginpage';
import HomePage from "./components/PreLoginHomepage/HomePage";
import Register from "./components/SignIn/Registerpage"


import BaseLayout from "./layout/BaseLayout";
import { Dashboard } from "./screens";
import Clientlist from "./components/dashboard/client/clientlist";
import Plans from "./components/dashboard/plans/plans";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";

import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";



function App() {
  const { user } = useContext(DataContext);
  // const { theme, toggleTheme } = useContext(ThemeContext);

  // // adding dark-mode class if the dark mode is set on to the body tag
  // useEffect(() => {
  //   if (theme === DARK_THEME) {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }
  // }, [theme]);
  return (
    <>
      <Routes>
        {/* Layout applied routes */}
        <Route path="/" element={<Layout children={undefined} />}>
          <Route index element={<Overview />} />
          <Route path="client_dashboard" element={<Overview />} />
          <Route path="stocks" element={<StockList />} />
          <Route path="stocks/:symbol" element={<StockDetails />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="news" element={<News />} />
          <Route path="/investments" element={<Investments />} />
        </Route>

        <Route element={<BaseLayout />}>
            <Route path="/advisor_dashboard" element={<Dashboard />} />
            <Route path="/clientlist" element={<Clientlist/>} />
                    <Route path="/plan" element={<Plans/>} />
         
          </Route>
      
       
       
        

<Route path ="/login" element= {<Loginpage />}/>
<Route path ="/home" element= {<HomePage />}/>
<Route path ="/register" element= {<Register />}/>

        
      </Routes>
      {/* <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button> */}
    </>
  );
}

export default App;