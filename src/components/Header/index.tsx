import Logo from '../Logo'
import Search from '../Search'
import Profile from '../User/Profile'

const Header = () => {
  return (
    <div className="top-0 sticky py-5 px-14 w-full flex justify-center items-center border-b-[1px] gap-12">
      <Logo />
      <Search />
      <Profile />
    </div>
  )
}

export default Header
