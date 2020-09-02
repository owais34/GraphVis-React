import React,{useState,useEffect} from 'react';
import './App.css';
import  Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios'



function App() {
  const [graph,setGraph]=useState({"edges":[],"node":[]})
  const [source,setSource]=useState(0)
  const [sink,setSink]=useState(0)
  
  useEffect(() => {
    
    axios.get(`http://127.0.0.1:5000/`)
    .then(response=>{
      console.log(response.data)
      setGraph(response.data)
    })
    return () => {
      
    }
  }, [])
  const onAddNode =(event)=>{
    //console.log(event.clientX,event.clientY)
    let x=event.clientX
    let y=event.clientY
    axios.get(`http://127.0.0.1:5000/addNode?x=${x}&&y=${y}`)
    .then(response=>{
      console.log(response.data)
      setGraph(response.data)
    })
  }
  const addEdge=(event)=>{
    axios.get(`http://127.0.0.1:5000/addEdge?source=${source}&&sink=${sink}`)
    .then(response=>{
      console.log(response.data)
      setGraph(response.data)
    })
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
        graph['edges'].map(edge=>{
          return (
        <line x1={graph['node'][edge[0]][2]} 
        y1={graph['node'][edge[0]][3]-55} 
        x2={graph['node'][edge[1]][2]} 
        y2={graph['node'][edge[1]][3]-55} 
        style={{stroke:edge[2],strokeWidth:3}} />
          )
        })
      }
    </svg>
    {
      graph['node'].map((node,index)=>{
        let tpos=node[3]-20
        let lpos=node[2]-20
      return (<button className="buton " 
      style={{top:(tpos),left:(lpos),position:'absolute',background:node[1]}}
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
