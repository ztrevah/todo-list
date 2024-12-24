import UserMenu from "./user-menu"

export const Header = () => {
    return (
        <div className="w-full p-5 shadow flex items-center justify-end">
            <UserMenu />
        </div>
    )
}