'use client'

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

const Tiptap = () => {
  const [currentContent,setCurrentState] = useState(`
  <p>
    Try to select <em>this text</em> to see what we call the bubble menu.
  </p>
  <p>
    Neat, isn’t it? Add an empty paragraph to see the floating menu.
  </p>
`)
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: currentContent,
    editorProps: {
      attributes: {
        class: 'bg-white p-4 text-black',
      },
    },
  })

  return (
    <>
    {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        Strike
      </button>
    </BubbleMenu>}

    {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>
    </FloatingMenu>}

    <EditorContent editor={editor} />
  </>
  )
}

export default Tiptap