import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, 
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, 
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from "../constants/userConstants"
import axios from "axios";
import { BASE_URL } from "../constants/globalConstant";

//LOGIN
export const login = (email,password)=> async(dispatch)=>{
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Content-Type":"application/json"}
        }

        const {data} = await axios.post(
            BASE_URL+"/login",
            {email,password},
            config
        );

        dispatch({type: LOGIN_SUCCESS,payload: data.user});

    } catch (error) {
        dispatch({type:LOGIN_FAIL, payload:error.response.data.message});
       
    }
};

//REGISTER
export const register = (userData)=> async(dispatch)=>{
try {
    dispatch({type: REGISTER_USER_REQUEST});
    
    const config ={
         headers :{
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "multipart/form-data"}};
    
    const {data} = await axios.post(BASE_URL+"/register", userData, config);
    
    dispatch({type: REGISTER_USER_SUCCESS, payload: data.user})

} catch (error) {
  dispatch({
    type: REGISTER_USER_FAIL,
    payload:error.response.data.message,
  });  
};

};

//LOAD USER
export const loadUser = ()=> async(dispatch)=>{
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const config = {headers:{
            'Access-Control-Allow-Origin': '*',
        }}

        const {data} = await axios.get(BASE_URL+"/me",config);

        dispatch({type: LOAD_USER_SUCCESS,payload: data.user});

    } catch (error) {
        dispatch({type:LOAD_USER_FAIL, payload:error.response.data.message});
       
    }
};

//Logout user
export const logout = ()=> async(dispatch)=>{
    try {
        const config = {headers:{
            'Access-Control-Allow-Origin': '*',
        }}

         await axios.get(BASE_URL+"/logout",config);

        dispatch({type: LOGOUT_SUCCESS});

    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload:error.response.data.message});
       
    }
};

//UPDATE PROFILE
export const updateProfile = (userData)=> async(dispatch)=>{
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});
        
        const config ={ 
            headers :{
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "multipart/form-data"}};
        
        const {data} = await axios.put(BASE_URL+"/me/update", userData, config);
        
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success})
    
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:error.response.data.message,
      });  
    };
    
    };

//Update Password
export const updatePassword = (passwords)=> async(dispatch)=>{
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});
        
        const config ={ 
            headers :{
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json"}};
        
        const {data} = await axios.put(BASE_URL+"/password/update", passwords, config);
        
        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success})
    
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload:error.response.data.message,
      });  
    }; 
};

//FORGOT PASSWORD
export const forgotPassword = (email)=> async(dispatch)=>{
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});

        const config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                "Content-Type":"application/json"}}

        const {data} = await axios.post(
            BASE_URL+"/password/forgot",
            email,
            config
        );

        dispatch({type: FORGOT_PASSWORD_SUCCESS,payload: data.message});

    } catch (error) {
        dispatch({type: FORGOT_PASSWORD_FAIL, payload:error.response.data.message});
       
    }
};

//Reset Password
export const resetPassword = (token, passwords)=> async(dispatch)=>{
    try {
        dispatch({type: RESET_PASSWORD_REQUEST});

        const config = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                "Content-Type":"application/json"}}

        const {data} = await axios.put(
            BASE_URL+`/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({type: RESET_PASSWORD_SUCCESS,payload: data.success});

    } catch (error) {
        dispatch({type: RESET_PASSWORD_FAIL, payload:error.response.data.message});
       
    }
};

//Get All Users --(Admin)
export const getAllUsers = ()=> async(dispatch)=>{
    try {
        dispatch({type: ALL_USERS_REQUEST});

        const config = {headers:{
            'Access-Control-Allow-Origin': '*',
        }}

        const {data} = await axios.get(BASE_URL+"/admin/users",config);

        dispatch({type: ALL_USERS_SUCCESS,payload: data.users});

    } catch (error) {
        dispatch({type:ALL_USERS_FAIL, payload:error.response.data.message});
       
    }
};

//Get User Details --(Admin)
export const getUserDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({type: USER_DETAILS_REQUEST});

        const config = {headers:{
            'Access-Control-Allow-Origin': '*',
        }}

        const {data} = await axios.get(BASE_URL+`/admin/user/${id}`,config);

        dispatch({type: USER_DETAILS_SUCCESS,payload: data.user});

    } catch (error) {
        dispatch({type:USER_DETAILS_FAIL, payload:error.response.data.message});
       
    }
};

//Update User --(Admin)
export const updateUser = (id, userData)=> async(dispatch)=>{
    try {
        dispatch({type: UPDATE_USER_REQUEST});
        
        const config ={ 
            'Access-Control-Allow-Origin': '*',
            headers :{"Content-Type": "application/json"}};
        
        const {data} = await axios.put(BASE_URL+`/admin/user/${id}`, userData, config);
        
        dispatch({type: UPDATE_USER_SUCCESS, payload: data.success})
    
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload:error.response.data.message,
      });  
    };
};

//Delete User --(Admin)
export const deleteUser = (id)=> async(dispatch)=>{
    try {
        dispatch({type: DELETE_USER_REQUEST});
        
        const config = {headers:{
            'Access-Control-Allow-Origin': '*',
        }}

        const {data} = await axios.delete(BASE_URL+`/admin/user/${id}`,config);
        
        dispatch({type: DELETE_USER_SUCCESS, payload: data})
    
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload:error.response.data.message,
      });  
    };
};

//Clearing errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
    };