import { Dropdown } from 'antd';
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserMenu = () => {
    const { data: currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const onLogOut = () => {
        logout();
        navigate(0);
    }
    const menuItems = [
        {
            key: 1,
            label: (
                <div className="flex items-center">
                    <span className="hugeicons--profile mr-1"></span>
                    Profile
                </div>
            )
        },
        {
            key: 2,
            label: (
                <div className="flex items-center">
                    <span className="material-symbols--settings-outline mr-1"></span>
                    Settings
                </div>
            )
        },
        {
            key: 3,
            label: (
                <div className="flex items-center">
                    <span className="ic--outline-feedback mr-1"></span>
                    Feedback
                </div>
            )
        },
        {
            key: 4,
            label: (
                <div className="flex items-center" onClick={onLogOut}>
                    <span className="material-symbols--logout mr-1"></span>
                    Logout
                </div>
            )
        },
    ]
    return (
        <Dropdown 
            menu={{items: menuItems}}
        >
            <div className="flex p-2 items-center">
                <span className="stash--user-avatar"></span>
                <div className="text-xl font-semibold flex items-center ml-1">
                    {currentUser && `${currentUser?.firstname} ${currentUser?.surname}`}
                </div>
            </div>
        </Dropdown>
    );
}

export default UserMenu;