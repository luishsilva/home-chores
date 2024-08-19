import NavItems from './NavItems';

const SideMenu = () => {
  return (
    <div className="align-items-center bg-secondary-subtle h-100 d-flex flex-column ps-3 pe-3">
      <div className="align-items-center d-flex mb-3  mt-3">
        <img className="logo" src="../../public/house-hand.png" alt="logo" />
      </div>
      <NavItems />
    </div>
  );
};

export default SideMenu;
