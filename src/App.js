import "./App.css";
import logo from "./spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png";
import SideMenu from "./Components/sideMenu";
import UserMenu from "./Components/userMenu";
import Card from "./Components/Card"

export default function App() {
  return (
    <div className="flex no-wrap w-full h-full">
      <div className="flex wrap flex flex-col w-1/5 h-full">
        <img
          src={logo}
          width={134}
          className="m-5 "
          aria-label="spotify_logo"
        ></img>
        <SideMenu />
      </div>
      <div className="flex flex-col wrap w-4/5 h-full bg-neutral-900">
        <div className="flex no-wrap items-center h-20 w-full mx-10 justify-between">
          <h1 className="text-white text-5xl">Hello</h1>
          <UserMenu />
        </div>
        <Card />
      </div>
    </div>
  );
}
