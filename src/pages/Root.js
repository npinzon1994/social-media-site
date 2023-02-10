import { Outlet } from 'react-router-dom';
import SidebarNavigation from '../components/UI/SidebarNavigation';

const Root = () => {
  return (
    <>
      <SidebarNavigation />
      <Outlet />
    </>
  )
}

export default Root;