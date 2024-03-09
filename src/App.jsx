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


import Login from './components/Authorization/Login'
import Signup from './components/Authorization/Singup'


// import Loginpage from './components/SignIn/Loginpage';
import HomePage from "./components/PreLoginHomepage/HomePage";
// import Register from "./components/SignIn/Registerpage"
import HomepageAbout from "./components/PreLoginHomepage/HomepageAbout"; 
import Service from "./components/PreLoginHomepage/Service";
import HomepageInfo from "./components/PreLoginHomepage/HomepageInfo";

import BaseLayout from "./layout/BaseLayout";
import { Dashboard } from "./screens";
import Clientlist from "./components/dashboard/client/clientlist";
import Plans from "./components/dashboard/plans/plans";
import Transaction from "./components/dashboard/transactions/transaction";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";

import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";





function App() {
  const { user } = useContext(DataContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        {/* <Route path="/login" element={<Loginpage />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        <Route path="/register" element={<Signup />} />
        <Route path="/about" element={<HomepageAbout />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<HomepageInfo />} />

        {/* Layout applied routes */}
        <Route element={<Layout />}>
          <Route path="client_dashboard" element={<Overview />} />
          <Route path="stocks" element={<StockList />} />
          <Route path="stocks/:symbol" element={<StockDetails />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="news" element={<News />} />
          <Route path="investments" element={<Investments />} />
        
        </Route>

        <Route element={<BaseLayout />}>
          <Route path="advisor_dashboard" element={<Dashboard />} />
          <Route path="clientlist" element={<Clientlist />} />
          <Route path="plan" element={<Plans />} />
          <Route path="transaction" element={<Transaction />} />
        </Route>
      </Routes>

      <button type="button" className="theme-toggle-btn" onClick={toggleTheme}>
        <img className="theme-icon" src={theme === LIGHT_THEME ? SunIcon : MoonIcon} alt="Theme Icon" />
      </button>
    </>
  );
}

export default App;