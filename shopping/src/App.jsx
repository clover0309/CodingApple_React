import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import data from './data.jsx';
import Detail from './routes/detail.jsx';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
      <div>


      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/'); }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/Detail'); }}>Detail</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>
      
        <Routes>
          <Route path="/" element={
          <>
          <div className='main-bg'></div>
          <div className='container'>
            <div className='row'>
            {shoes.map((a, i) => {
              return <Card shoes={shoes[i]} i={i}></Card>
              })}
            </div>
          </div>
          </>
          } />
          <Route path="/detail/:id" element={<Detail shoes = {shoes}/>} />

          <Route path="/about" element={ <About/> }>
            <Route path="member" element={ <div>멤버 정보</div> } />
            <Route path="location" element={ <div>회사 위치</div> } />
          </Route>
        </Routes>

        <Routes>
          <Route path="/event" element={<EventPage/>}>
            <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
            <Route path="two" element={<p>생일 기념 쿠폰 받기</p>}></Route>
          </Route>
        </Routes>

      </div>
  )
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
          <div className='row'>
          <div className='col-md-4'>
            <img src={'https://codingapple1.github.io/shop/shoes'+ props.i + '.jpg'} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
          </div>
          </div>
  )
}

export default App
