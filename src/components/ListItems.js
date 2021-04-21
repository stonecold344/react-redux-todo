import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/listItems.css";
import { connect, useDispatch } from "react-redux";
import {
  removeFromList,
  editListItem,
  checkItem,
} from "../actions/listActions";

const ListItems = () => {
  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    return () => {
      setEdit(false);
      setQuery("");
    };
  }, []);
  const list = useSelector((state) => state.list.list);
  console.log(list);
  const dispatch = useDispatch();

  const deleteHandler = (index) => {
    dispatch(removeFromList(index));
  };

  const onSubmitEdit = (index, data) => {
    dispatch(editListItem(index, data));
    setEdit(!edit)
  };

  const checkHandler = (index) => {
    dispatch(checkItem(index));
  };

  const changeHandler = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="d-flex flex-column container">
      {list.length <= 0 ? (
        <div style={{ display: list.length === 0 ? "block" : "none" }}>
          <h3 className="text-center py-3">No tasks where found!</h3>
          <p className="text-center">Add new tasks :)</p>
        </div>
      ) : (
        <div style={{ display: list.length !== 0 ? "block" : "none" }}>
          <ul className="list-group w-200">
            {list.map((item, i) => {
              console.log(item);
              return (
                <li
                  className="list-group-item list-group-item-action list-group-item-dark d-flex justify-content-between align-items-center item"
                  key={item.id}
                  data-toggle="tooltip"
                  title={`Created at : ${item.date}`}
                >
                  <b>{i + 1}.</b>
                  {!edit ? (
                    <span
                      className={
                        !item.isChecked
                          ? "text-decoration-none"
                          : "text-decoration-line-through"
                      }
                    >
                      {item.data}
                    </span>
                  ) : (
                    <div className="d-flex">
                      <input type="text" value={query} onChange={changeHandler}/>
                      <span className="btn btn-light btn-sm " onClick={()=>
                        onSubmitEdit(item.id, query)
                      }>Done</span>
                    </div>
                  )}
                  <div>
                    {!item.isChecked ? (
                      <span
                        className="btn btn-info edit mr-1"
                        onClick={() => {
                          setEdit(!edit);
                          setQuery(item.data)
                        }}
                      >
                        <i className="far fa-edit"></i>
                      </span>
                    ) : null}
                    <span
                      className="btn btn-success check"
                      onClick={() => {
                        checkHandler(item.id);
                      }}
                    >
                      <i className="fas fa-check"></i>{" "}
                    </span>
                    <span
                      className="btn btn-danger trash ml-1"
                      onClick={() => {
                        deleteHandler(item.id);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.list,
});
export default connect(mapStateToProps)(ListItems);
