import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";


const Main = () => {
    return (
        <div className="font-lato">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;