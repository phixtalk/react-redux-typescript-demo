import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Todo{
    id: number;
    title: string;
    completed: boolean
}

export interface FetchTodosAction{
    type: ActionTypes.fetchTodos;
    payload: Todo[];
}

export interface DeleteTodoAction{
    type: ActionTypes.deleteTodo;
    payload: number;
}

const url = "https://jsonplaceholder.typicode.com/todos";

//Note that here we are using redux-thunk because,
//we want to dispatch an action NOT immediately,
//but with the result of an asynchronous operation
//redux-thunk also makes the dispatch function available in our action creators
export const fetchTodos = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<Todo[]>(url);

        dispatch<FetchTodosAction>({
            type: ActionTypes.fetchTodos,
            payload: response.data
        });
    }
}

//Note that here we will NOT be using redux-thunk because,
//this is NOT an asyn action creator
export const deleteTodo = (id: number): DeleteTodoAction  => {
    return {
        type: ActionTypes.deleteTodo,
        payload: id
    }
}

