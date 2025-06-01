import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import data from './data.jsx';
import Cart from './routes/cart.jsx';
import Detail from './routes/detail.jsx';


// Context API를 사용하기 위한 createContext 함수 호출
export let Context1 = createContext();

function App() {

    useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
  },[])

  let obj = { name: 'kim' };
  // 그대로 Array나 Object를 넣으면 안되고, JSON.stringify를 통해 문자열로 변환해서 넣어야 함.
  localStorage.setItem('data', JSON.stringify(obj));
  let getobj = localStorage.getItem('data');
  console.log(JSON.parse(getobj)); // JSON.parse를 통해 다시 객체로 변환



  let [shoes, setShoes] = useState(data);
  //context api를 사용하기위한 state
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();

  let result = useQuery(['작명'], () => {
    return axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{
      console.log("요청됨");
      return a.data
    }),
    { staleTime : 2000 }
  })

  result.data; // result.data를 통해 서버에서 받아온 데이터를 사용할 수 있음.
  result.isLoading; // 로딩 중인지 확인할 수 있음.
  result.error; // 에러가 발생했는지 확인할 수 있음.


  return (
      <div>


      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/'); }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/Detail'); }}>Detail</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading && '로딩중'}
            { result.error && '에러남'}
            { result.data && result.data.name }
            </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>
      <Link to="/cart">장바구니</Link>
      
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
          <button onClick={()=> {
            //axios를 통해 get 요청.
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((결과)=>{
              //먼저 shoes의 데이터를 복사후, 결과.data를 복사해서 새로운 배열을 만들어줌.
              let copy = [...shoes, ...결과.data];
              //그리고 상태에 값을 컨트롤하는 setShoes를 통해 새로운 배열을 넣어줌.
              //이렇게 하면 기존의 배열에 새로운 배열을 추가하는 형태가 됨.
              setShoes(copy);
            })



          }}>더보기</button>
          </>
          } />
          <Route path="/detail/:id" element={
            <Context1.Provider value={{ 재고 }}>
            <Detail shoes = {shoes}/>
            </Context1.Provider>
            } />

          <Route path="/cart" element={ <Cart/> } />

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
