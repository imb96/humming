import Logo from '../Logo'
import Search from '../Search'
import Profile from '../User/Profile'

const Header = () => {
  return (
    <div className="top-0 sticky py-5 px-14 w-full flex justify-around items-center border-b-[1px]">
      <Logo />
      <Search />
      <Profile />
    </div>
  )
}

export default Header
