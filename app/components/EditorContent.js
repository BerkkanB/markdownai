'use client'

import { useEditor, EditorContent } from '@tiptap/react'
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
  })

  return (
    <div>
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap