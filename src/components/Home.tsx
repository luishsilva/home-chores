import { NavBar } from './NavBar';

export const Home = () => {
    return (
        <div className='d-flex flex-column vh-100'>
            <NavBar />
            <div className="d-flex align-items-center justify-content-center flex-grow-1 flex-wrap-reverse">
                <div>
                    <div className="fs-2 font-weight-bold">
                        <div>Join Hands, Organize Together, Free Up Time</div>
                        <div>Everyone's Effort Counts!.</div>
                    </div>
                    <div className="d-grid col-6 mt-5 mx-auto">
                        <button className="btn btn-primary" type="button">
                            Create an account
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center col-6 p-5">
                    <img className="home-img" src="/people-helping-2.png" alt="People Helping" />
                </div>
            </div>
            <div className="h-auto bg-light">
                <div className="mb-5 mt-5 px-4">
                    Footer
                </div>
            </div>
        </div>
    );
};