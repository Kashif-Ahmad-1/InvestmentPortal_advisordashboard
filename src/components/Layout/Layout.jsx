import Header from "./LayoutComponents/Header"
import Sidebar from "./LayoutComponents/Sidebar"
import styles from "./Layout.module.css"
import { FaRegHeart } from "react-icons/all"
import { Flex } from "@chakra-ui/react"
import { Outlet } from 'react-router-dom';

function Layout({ children }) {
    return (
        <>
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.container}>
                <Header />
                <main className={styles.content}>
                    {/* {children} */}
                    <Outlet />
                   
                </main>
            </div>
        </div>
        
        </>
    )
}

export default Layout