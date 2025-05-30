import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);

  let {id} = useParams();
  let findShoes = props.shoes.find(function(x) {
    return x.id == id;
  });

  useEffect(() => {
    let a = setTimeout(() => { setAlert(false); }, 2000)
    console.log(2);
    return () => {
      console.log(1);
      clearTimeout(a);
    }
  });

//1번 2번은 useEffect 실행 전에 뭔가 실행하려면 언제나 return () => {}을 사용해주면 된다. 
// useEffect(() => { }) = 1.재레던링마다 코드실행하고 싶으면
// useEffect(() => { }, []) = 2.mount시 1회 코드실행하고 싶으면
// useEffect(() => { return () => {} }, []) = 3.unmount시 1회 코드실행.

return (
<div className="container">
  {
  alert == true ?
  <div className="alert alert-warning">
    2초이내 구매시 할인
  </div> : null
  }
  {count}
  <button onClick={ () => { setCount(count+1) }}>버튼</button>
  <div className="row">
    <div className="col-md-6">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
    </div>

    <div className="col-md-6">
      <h4 className="pt-5">{findShoes.title}</h4>
      <p>{findShoes.content}</p>
      <p>{findShoes.price}원</p>
      <button className="btn btn-danger">주문하기</button> 
    </div>
  </div>
</div>
)
}
export default Detail;