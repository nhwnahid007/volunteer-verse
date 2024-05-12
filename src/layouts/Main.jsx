import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";


const Main = () => {
    return (
        <div className="font-lato">
            <Navbar></Navbar>
            <div className="min-h-screen"><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default Main;