import { useRef, useState } from 'react';
import DragAndDrop from './components/UI/DragAndDrop/DragAndDrop';
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const contentContainerRef = useRef(null)
  const dragZoneRef = useRef(null)


  return (
    <DragAndDrop mainContainerRef={contentContainerRef} dragZoneRef={dragZoneRef} callback={setFile}>
      <div className="App">
        <aside className="sidebar" ref={dragZoneRef}>
          <h1>Sidebar</h1>
        </aside>
        <div className="container" ref={contentContainerRef}>
          <header className="header">Header</header>
          <div className="content">Content</div>
        </div>
      </div>
    </DragAndDrop>
  );
}

export default App;
