import Tiptap from "./components/EditorContent";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";

export default function Home() {
  return (
    <div className="flex h-screen bg-white flex-col ">
      <Navbar />
      <div className="flex flex-row"> 
        <SideBar />
        <Tiptap />
      </div>
    </div>

  )
}
