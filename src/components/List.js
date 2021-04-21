import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToList } from "../actions/listActions";
import '../css/list.css'

const List = () => {
  const [query, setQuery] = useState("");
  const [id, setId] = useState(0);
  const [onClick, setOnClick] = useState(false)



  const dispatch = useDispatch();
  const msg = useSelector(state => state.list.massage)



  const changeHandler = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };


  const clickHandler = (e) => {
    e.preventDefault();
    setOnClick(true)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setOnClick(false)
    const date = getCurrentDateAndTime()
    dispatch(addToList(id + 1000,query, false, date))
    setQuery("")
    setId(id + 1)
  };

  const getCurrentDateAndTime = (separator='-', space=' ') =>{
    let newDate = new Date()
    //Date
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    //Time
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;

    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}${space}${strTime}`
  }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-center">
        <form action="POST">
          <div className="from-group row py-3">
              <input
                className="form-control outline-dark "
                type="text"
                value={query}
                onChange={changeHandler}
                onClick={clickHandler}
              />
          </div>
          <div className="from-group row">
            <button
              className="btn form-control btn-outline-dark "
              onClick={submitHandler}
              type="submit"
              value="Submit"
            >
              Enter
            </button>
          </div>
          <div className="container d-flex justify-content-center py-2">
            {msg.error && !onClick  ? (<p className="text-danger">{msg.error}</p>):(null)}
            {msg.success && !onClick ?(<p className="text-success">{msg.success}</p>):(null)}
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  list: state.list,
});
export default connect(mapStateToProps)(List);
