import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

const Main = () => {
    return (
        <div className="font-lato">
            <div className="container mx-auto">
                <Navbar></Navbar>
                <div className="min-h-screen"><Outlet></Outlet></div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;