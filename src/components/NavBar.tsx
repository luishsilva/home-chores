export const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light px-4">
            <div className="container-fluid d-flex flex-row justify-content-between align-items-center">
                <a className="navbar-brand" href="#">
                    <img className="logo" src="../../public/house-hand.png" alt="logo" />
                    <div className="ms-2">Home Chores</div>
                </a>
                <div className="align-items-center d-flex">
                        <img className="user-thumb" src="default-user-thumb.png" alt="user profile thumbnail" />  
                        <span className="ms-2">Login</span>
                    </div>
                    {/* 
                        Will display if user is logged
                        Signed in as: <a href="#login">Mark Otto</a> 
                    */}
            </div>
        </nav>
    );
};