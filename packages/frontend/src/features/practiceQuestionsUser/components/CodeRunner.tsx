import React, { useRef, useState, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Button } from '../../../shared/ui/button';
import { useRunCodeMutation } from '../../../shared/api/runCodeApi';

type Language = 'java' | 'python' | 'sql' | 'html' | 'c' | 'cpp' | 'javascript';

interface CodeRunnerProps {
  onCodeChange?: (code: string) => void; // הוספתי את הפרופס כאן
}

const languageMap: Record<Language, string> = {
  java: 'java',
  python: 'python',
  sql: 'sql',
  html: 'html',
  c: 'c',
  cpp: 'cpp',
  javascript: 'javascript',
};


const initialCode: Record<Language, string> = {
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}`,
  python: `print("Hello, Python!")`,
  sql: `SELECT 'Hello, SQL!' AS message;`,
  html: `<!DOCTYPE html>
<html>
  <head>
    <title>Hello HTML</title>
  </head>
  <body>
    <h1>Hello, HTML!</h1>
  </body>
</html>`,
  c: `#include <stdio.h>

int main() {
  printf("Hello, C!\\n");
  return 0;
}
`,
  cpp: `#include <iostream>

int main() {
  std::cout << "Hello, C++!" << std::endl;
  return 0;
}
`,
  javascript: `console.log("Hello, JavaScript!");`,
};

const commentSymbols: Record<Language, string> = {
  java: '//',
  python: '#',
  sql: '--',
  html: '<!--',
  c: '//',
  cpp: '//',
  javascript: '//',

};

const CodeRunner = ({ onCodeChange }: CodeRunnerProps) => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState<Language>('java');
  const [code, setCode] = useState(initialCode['java']);
  const [output, setOutput] = useState<string | null>(null);

  const [showOutputModal, setShowOutputModal] = useState(false);

  const [runCode, { isLoading }] = useRunCodeMutation();

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code);
    }
  }, [code, onCodeChange]);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    // כאן אפשר להוסיף קיצור דרך וכו'
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
    setCode(initialCode[lang]);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setOutput(null);
    try {
      const data = await runCode({ language, code }).unwrap();
      const result = data.rows ? JSON.stringify(data.rows, null, 2) : data.output;
      setOutput(result);
      setShowOutputModal(true); // פותח פופאפ תוצאה
    } catch (error: any) {
      setOutput('שגיאה: ' + (error?.data?.error || error.message || 'אירעה שגיאה'));
      setShowOutputModal(true);
    }
  };

  return (
    <>
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          direction: 'ltr',
          height: '100%',
          maxWidth: '100%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: 16,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <select
            value={language}
            onChange={handleLanguageChange}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1.5px solid #ccc',
              fontSize: 14,
              minWidth: 130,
              cursor: 'pointer',
            }}
            disabled={isLoading}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="html">HTML</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>

          </select>

          <Button
            onClick={handleRunCode}
            className="run-code-button"
            disabled={isLoading}
            style={{ minWidth: 100, padding: '4px 8px' }}
          >
            {isLoading ? '...מריץ' : 'הרצת קוד'}
          </Button>
        </div>

        <Editor
          height="calc(100% - 110px)"
          defaultLanguage={languageMap[language]}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* פופאפ תוצאה */}
      {showOutputModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowOutputModal(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              maxWidth: '90vw',
              maxHeight: '80vh',
              width: '800px',
              padding: 20,
              position: 'relative',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowOutputModal(false)}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: 'transparent',
                border: 'none',
                fontSize: 35,
                cursor: 'pointer',
                lineHeight: 1,
                color: 'red'
              }}
              aria-label="Close output modal"
            >
              ×
            </button>

            <h2 className="text-m font-bold text-[--color-text] mb-2">תוצאת הרצת הקוד</h2>

            {language === 'html' ? (
              <iframe
                title="HTML Preview"
                srcDoc={output || ''}
                style={{
                  width: '100%',
                  height: '60vh',
                  border: '1px solid #ccc',
                  borderRadius: 6,
                }}
              />
            ) : (
              <pre
                style={{
                  background: '#f9f9f9',
                  padding: 12,
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  whiteSpace: 'pre-wrap',
                  fontSize: 14,
                  lineHeight: 1.4,
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  direction: 'ltr',
                  textAlign: 'left',
                }}
              >
                {typeof output === 'string' ? output : JSON.stringify(output, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CodeRunner;

