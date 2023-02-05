import Link from "next/link";
import { memo } from "react";
import { signOut } from "next-auth/react";
import style from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { show, hide } from "redux/features/loader/loaderSlice";
import { NavbarProps } from "types/navbar/NavbarProps";
import { navbarItems } from "./NavbarItems";
import { useGlobalContext } from "providers/GlobalProvider";

const Navbar = (props: NavbarProps) => {
  const { username } = props;
  const dispatch = useDispatch();
  const { setTitle, activeNavbarItem, setActiveNavbarItem } = useGlobalContext();

  const signout = async () => {
    dispatch(show());
    await signOut();
    dispatch(hide());
  }

  return (
    <>
      <nav className={style.nav}>
        <div className={style.top_container}>
          <Link href="/dashboard" className={style.logo}
            onClick={() => {
              setActiveNavbarItem("dashboard");
              setTitle("Dashboard");
            }}
          >
            Incubator
          </Link>
          <ul className={style.item_container}>
            {
              navbarItems.map(item => {
                return (
                  <Link 
                    className={`
                      ${style.link}
                      ${activeNavbarItem === item.id ? 'text-white bg-primary' : 'text-[#9DA6BA] hover:bg-primary_light hover:text-primary'}`}
                    href={item.path}
                    key={item.id}
                    onClick={() => {
                      setActiveNavbarItem(item.id);
                      setTitle(item.name);
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })
            }
          </ul>
        </div>
        <div className={style.bottom_container}>
          <div className={style.user_name}>{username}</div>
          <div className={style.singout_button} onClick={() => {
            signout();
          }} >Signout</div>
        </div>
      </nav>
    </>
  );
}

export default memo(Navbar);