import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Home = () => (
  <>
    <NavBar />
    <main className="d-flex flex-column flex-grow-1">
      <div className="d-flex align-items-center justify-content-center flex-grow-1 flex-wrap-reverse">
        <div>
          <div className="fs-2 font-weight-bold">
            <div>Join Hands, Organize Together, Free Up Time</div>
            <div>Everyone`&apos;s Effort Counts!.</div>
          </div>
          <Link to="/signup">
            <div className="btn-create-account col-6 d-grid mt-5 mx-auto">
              <button className="btn btn-primary" type="button">
                Create an account
              </button>
            </div>
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center col-6 p-5">
          <img
            className="home-img"
            src="/people-helping-2.png"
            alt="People Helping"
          />
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
