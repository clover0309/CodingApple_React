import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../app.css";

import { useDispatch } from "react-redux";
import { addItem } from "../store";
import { Context1 } from "./../App";

function Detail(props) {

useEffect(()=>{
  let 꺼낸거 = localStorage.getItem('watched')
  꺼낸거 = JSON.parse(꺼낸거)
  꺼낸거.push(찾은상품.id)

  //Set으로 바꿨다가 다시 array로 만들기
  꺼낸거 = new Set(꺼낸거)
  꺼낸거 = Array.from(꺼낸거)
  localStorage.setItem('watched', JSON.stringify(꺼낸거))
  }, [])

  // Context API를 사용하기 위해 createContext로 만든 Context1을 불러옴
  let {재고, shoes} = useContext(Context1);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [fade2, setFade2] = useState('');

    useEffect(() => {
    let a = setTimeout(() => { setAlert(false); }, 2000)
    console.log(2);
    return () => {
      console.log(1);
      clearTimeout(a);
    }
  });

  useEffect(() => {
    setFade2('end');
    return () => {
      setFade2('');
    }
  }, []);
  
  let [탭, 탭변경] = useState(0);
  let {id} = useParams();
  let 찾은상품 = props.shoes.find(x => x.id == id);



//1번 2번은 useEffect 실행 전에 뭔가 실행하려면 언제나 return () => {}을 사용해주면 된다. 
// useEffect(() => { }) = 1.재레던링마다 코드실행하고 싶으면
// useEffect(() => { }, []) = 2.mount시 1회 코드실행하고 싶으면
// useEffect(() => { return () => {} }, []) = 3.unmount시 1회 코드실행.

return (

<div className={"container start " + fade2}>
  {
  alert == true ?
  <div className="alert alert-warning">
    2초이내 구매시 할인
  </div> : null
}
  {count}
  <button onClick={ () => { setCount(count+1) }}>버튼</button>

  {재고[0]}
  <div className="row">
    <div className="col-md-6">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
    </div>

    <div className="col-md-6">
      <h4 className="pt-5">{찾은상품.title}</h4>
      <p>{찾은상품.content}</p>
      <p>{찾은상품.price}원</p>
      <button className="btn btn-danger" onClick={
        () => {
          dispatch(addItem({ id : 찾은상품.id, name: 찾은상품.title, count: 1 }));
          console.log('장바구니에 담겼습니다.');
        }
      }>주문하기</button> 
    </div>
  </div>



  <Nav variant="tabs" defaultActiveKey="link0">
  <Nav.Item>
    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">버튼1</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">버튼2</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">버튼3</Nav.Link>
  </Nav.Item>
  </Nav>
  <TabContent 탭={탭}/>


</div>
)
}

function TabContent({탭}){

  let [fade, setFade] = useState('');
  let {재고} = useContext(Context1);
  useEffect(() => {
    let a = setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      clearTimeout(a);
      setFade('');
    }
  },  [탭])

  return (
    <div className={'start ' + fade}>
      { [<div>{재고[0]}</div>, <div>내용1</div>, <div>내용2</div>][탭] }
    </div>
  )
}


export default Detail;