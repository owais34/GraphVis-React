import React,{useState} from 'react';
import './App.css';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import  Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

// import Canvas from '../src/components/canvas/Canvas'

function App() {
  const [nodes, setNodes] = useState([])
  const [graph,setGraph]=useState([])
  const [source,setSource]=useState(0)
  const [sink,setSink]=useState(0)
  const [edges,setEdges]=useState([])
 
  const onAddNode =(event)=>{
    //console.log(event.clientX,event.clientY)
    setNodes([...nodes,{x:event.clientX,y:event.clientY}])
    setGraph([...graph,[]])
  }
  const addEdge=(event)=>{
    if(source>=0&&source<nodes.length&&sink>=0&&sink<nodes.length&&source!==sink)
    {
      if(graph[source].indexOf(sink)===-1)
      {
        let gcopy=graph
        gcopy[source].push(sink);
        gcopy[sink].push(source);
        setGraph(gcopy)
        setEdges([...edges,[source,sink]])
      }
    }
    console.log(graph)
  }
  const onChangeSource=(event)=>{
    setSource(event.target.value)
  }
  const onChangeSink=(event)=>{
    setSink(event.target.value)
  }
  
  return (
    <div >
      <Navbar bg="dark" expand="lg" variant="dark">
  <Navbar.Brand href="#home" >Graph Visualizer</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Algorithms" id="basic-nav-dropdown" >
        <NavDropdown.Item href="#action/3.1">BFS</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">DFS</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Bipartite</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Algo3</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="number" placeholder="Source Node" className="mr-sm-2 app-input"
       onChange={onChangeSource}
       value={source}/>
      <FormControl type="number" placeholder="Sink Node" className="mr-sm-3 app-input"
      onChange={onChangeSink}
      value={sink}/>
      <Button variant="outline-light" className="mr-sm-2" onClick={addEdge}>Add Edge</Button>
      <Button variant="outline-light">Remove Edge</Button>
    </Form>
  </Navbar.Collapse>
  </Navbar>
  <div className="canvas" id="canvas" onDoubleClick={onAddNode} >
    <svg  height="590px" width="100%">
      {
        edges.map(edge=>{
          return (
        <line x1={nodes[edge[0]].x} 
        y1={nodes[edge[0]].y-50} 
        x2={nodes[edge[1]].x} 
        y2={nodes[edge[1]].y-50} 
        style={{stroke:'rgb(255,0,0)',strokeWidth:3}} />
          )
        })
      }
    </svg>
    {
      nodes.map((node,index)=>{
        let tpos=node.y-20
        let lpos=node.x-20
      return (<button className="buton" 
      style={{top:(tpos),left:(lpos),position:'absolute'}}
      key={index}>
        {index}
        </button>)
      })
    }
  </div>
    </div>
  );
}

export default App;
