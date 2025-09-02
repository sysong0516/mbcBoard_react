import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Bold, Italic, List, Quote, Link as LinkIcon, Unlink } from 'lucide-react'
import './PostEditor.css'

const PostEditor = ({ value, title, onTitleChange, onChange, onSubmit }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: false }), Link.configure({ openOnClick: false })],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

    return (
      <>
        <div className="editor-wrapper">
          <input
            className="editor-title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => onTitleChange && onTitleChange(e.target.value)}
          />
          <div className="toolbar">
            <button
              className={editor.isActive('bold') ? 'active' : ''}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={16} />
            </button>
            <button
              className={editor.isActive('italic') ? 'active' : ''}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={16} />
            </button>
            <button
              className={editor.isActive('bulletList') ? 'active' : ''}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={16} />
            </button>
            <button
              className={editor.isActive('blockquote') ? 'active' : ''}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote size={16} />
            </button>
            <button
              onClick={() => {
                const url = prompt('링크 URL을 입력하세요')
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run()
                }
              }}
            >
              <LinkIcon size={16} />
            </button>
            <button onClick={() => editor.chain().focus().unsetLink().run()}>
              <Unlink size={16} />
            </button>
          </div>
  
          <EditorContent editor={editor} className="tiptap" />
        </div>
        <div className="editor-submit-wrapper">
          <button className="editor-submit-btn" onClick={onSubmit}>등록</button>
        </div>
      </>
    )
}

export default PostEditor;
