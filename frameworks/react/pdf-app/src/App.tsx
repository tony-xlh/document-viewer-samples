import { useEffect, useRef } from 'react'
import './App.css'
import { DDV, EditViewer, UiConfig } from 'dynamsoft-document-viewer';
import "dynamsoft-document-viewer/dist/ddv.css";

function App() {
  const initializing = useRef(false);
  const editViewer = useRef<EditViewer|undefined>();
  useEffect(()=>{
    console.log("mounted");
    if (initializing.current == false) {
      initializing.current = true;
      initDDV();
    }
  },[])

  const initDDV = async () => {
    DDV.Core.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAwMjI3NzYzLVRYbFFjbTlxIiwibWFpblNlcnZlclVSTCI6Imh0dHBzOi8vbWx0cy5keW5hbXNvZnQuY29tIiwib3JnYW5pemF0aW9uSUQiOiIxMDAyMjc3NjMiLCJzdGFuZGJ5U2VydmVyVVJMIjoiaHR0cHM6Ly9zbHRzLmR5bmFtc29mdC5jb20iLCJjaGVja0NvZGUiOjE4OTc4MDUzNDV9"; // Public trial license which is valid for 24 hours
    DDV.Core.engineResourcePath = "assets/ddv-resources/engine";// Lead to a folder containing the distributed WASM files
    await DDV.Core.loadWasm();
    await DDV.Core.init(); 
    const config = DDV.getDefaultUiConfig("editViewer", {includeAnnotationSet: true}) as UiConfig;
    // Create an edit viewer
    editViewer.current = new DDV.EditViewer({
      container: "container",
      uiConfig: config,
    });
    // Configure image filter feature which is in edit viewer
    DDV.setProcessingHandler("imageFilter", new DDV.ImageFilter());
  }

  return (
    <div id="app">
      <h2>Document Viewer Demo</h2>
      <div id="container"></div>
    </div>
  )
}

export default App
