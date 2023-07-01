import MarkdownEditor from "./components/MarkdownEditor";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg-gray-100">
        <MarkdownEditor />
      </div>
      <div className="w-1/2 h-full bg-gray-200">asd</div>
    </div>

  )
}
