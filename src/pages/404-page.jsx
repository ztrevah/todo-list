import { Divider } from "antd";
import { Link } from "react-router-dom";

const Error404Page = () => {
    return (
        <div className="h-screen w-screen justify-center flex flex-col items-center">
            <div className="flex items-center">
                <div className="text-[50px] font-semibold mb-5">404</div>
                <Divider type="vertical" />
                <div className="text-2xl">
                    Page Not Found
                </div>
            </div>
            <button className="text-xl py-2 px-5 rounded-[40px] bg-indigo-600 hover:bg-indigo-400 text-white">
                <Link to="/">Back to Home</Link>
            </button>
        </div>
    )
}

export default Error404Page;