import { ADD, REMOVE, EDIT, CHECK } from "../actions/types";


const listReducer = (state = {list:[] ,massage:""}, action) => {
  switch (action.type) {
    case ADD:
      let exists = false
      if(action.payload.data === ""){
        return {
          ...state,
          massage:{error:"Can't add an empty task!"}
        }
      }
       state.list.map((item) =>{
        if(item.data === action.payload.data){
          exists = true
        }
        return item
      })
      if(exists){
        return {
          ...state,
          massage: {error:"This task already exists!"}
        }
      }
      if(!exists){
        state.list.push(action.payload);
      }
      return {
        ...state,
        massage:{success:"Task added!"}
      };
    case REMOVE:
      console.log(action.payload)
      const filtered = state.list.filter((item) =>  item.id !== action.payload)
      console.log(filtered)
      return {
        list:[...filtered],
        massage:{error:""}
      };
    case EDIT:
      state.list.map((item) => {
        if(item.id === action.payload.id){
          item.data = action.payload.data
        }
        return item
      })
      console.log(state.list)
      return {
        ...state
      };
    case CHECK:
      state.list.map((item) => {
        if(item.id === action.payload)
          item.isChecked = !item.isChecked
        return item  
      })
      console.log(state.list)
      return {
        ...state
      }  
    default:
      return state;
  }
};

export default listReducer;
