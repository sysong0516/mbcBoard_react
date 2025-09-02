import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import './PostEditor.css';

const PostEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      {/* Toolbar */}
      <div className="toolbar">
        <button
          className={editor.isActive('bold') ? 'active' : ''}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <b>B</b>
        </button>
        <button
          className={editor.isActive('italic') ? 'active' : ''}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </button>
        <button
          className={editor.isActive('bulletList') ? 'active' : ''}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          className={editor.isActive('blockquote') ? 'active' : ''}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          ❝ 인용
        </button>
        <button
          onClick={() => {
            const url = prompt('링크 URL을 입력하세요');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          🔗 링크
        </button>
        <button onClick={() => editor.chain().focus().unsetLink().run()}>
          링크 해제
        </button>
      </div>

      {/* Content Area */}
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
};

export default PostEditor;
