import dynamic from 'next/dynamic'
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const QuillNoSSRWrapper = dynamic(
    () => {
        hljs.configure({
          languages: ['javascript', 'CSS', 'HTML', 'ruby', 'python', 'cpp', 'c', 'dart', 'go', 'markdown', 'motoko', 'r', 'rust', 'sql', 'stata', 'typescript', 'vbnet', 'php', 'objectivec', 'haskell']
        })
        // @ts-ignore
        window.hljs = hljs
       return  import ("react-quill")
    }, {
    ssr: false,
    loading: () => <p>Quill loading</p>
})

export default function Editor({value,onChange}) {
  const modules = {
    syntax: true,              // Include syntax module
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'script': 'sub'}, { 'script': 'super' }], 
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['header',
      'font',
      'size',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
      'code-block'
    ],
      ['clean'],
    ],
  };
  return (
    <div className="editor_content">
    <QuillNoSSRWrapper
    placeholder='compose here' 
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
    </div>
  );
}