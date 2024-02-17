import axios from 'axios';
import { 
  ADD_ADMIN,
  ADD_ADMIN_MOMO,
    ADMIN_LOADED,
    AUTH_ERROR,
    CHANGE_FAIL,
    CHANGE_PASSWORD,
    CHANGE_PIN,
    CLEAR_SUCCESS,
    CREATOR_LOADING,
    DELETE_ADMIN,
    FAILED,
    FETCH_ADMINS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    VERIFY_SUCCESS
 } from "./actionTypes";
import { returnErrors } from './errorActions';
import { useApplication } from '../applicationContext';


export const loadAdmin = () => () => {
    const { dispatch } = useApplication();
    //Creator loading
    dispatch({ type: CREATOR_LOADING });
  
      axios.get('/api/v1/admins/admin/dashboard')
          .then(res => dispatch({
              type: ADMIN_LOADED,
              payload: res.data
          }))
          .catch(err => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status));
                dispatch({
                    type: AUTH_ERROR
                });
  
          });
  };

  
//Load a Admin
export const fetchAnAdmin = (id) => () => {
    const { dispatch } = useApplication();
    //Admin loading
    dispatch({ type: CREATOR_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/admins/admin/${id}`)
          .then(res => dispatch({
              type: ADMIN_LOADED,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getAdmins = () => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
      axios
        .get('/api/v1/admins')
        .then(res =>
          dispatch({
            type: FETCH_ADMINS,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
  };
  
  
  //Register admin
  export const registerAdmin = ({  
    password,
    email,
    firstname,
    lastname,
    phoneNumber,
    username, 
    referalCode, 
    token 
} ) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ 
        password,
        email,
        firstname,
        lastname,
        phoneNumber,
        username, 
        referalCode, 
        token });
      
      setTimeout(()=> {
        axios.post('/api/v1/admins/admin/signup', body, config)
            .then(res => dispatch({
                type: ADD_ADMIN,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL'));
                dispatch({
                    type: SIGNUP_FAIL
                })
            })
      }, 15000)
  }
  
  //Update admin Info
  export const updateAdminInfo = ({  firstname, lastname, adminname, phoneNumber, id } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, adminname, phoneNumber });
  
      axios.put(`/api/v1/admins/${id}/update`, body, config)
          .then(res => dispatch({
              type: ADD_ADMIN,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_adminCARD_FAILED'));
              dispatch({
                  type: ADD_adminCARD_FAILED
              })
          })
  }
  
  export const deleteAdmin = id => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    axios
        .delete(`/api/v1/admins/admin/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_ADMIN,
            payload: res.data
          })
        )
        .catch(err =>{
          dispatch(returnErrors(err.response.data, err.response.status))
          dispatch({
            type: FAILED
          })
        });
    };
    
    
  //LOGIN
  export const loginAdmin = ({ email, password, token, ip }) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({email, password, token, ip });
  
      axios.post('/api/v1/admins/admin/login', body, config)
          .then(res => dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
              dispatch({
                  type: LOGIN_FAIL
              })
          })
  }
  
  
  export const updateadminProfileImage = (body) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
  
      axios.put(`/api/v1/admins/admin/avatar`, body)
          .then(res => dispatch({
              type: ADD_ADMIN_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const changeAdminPassword = ({ id, password, password2, password1 }) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({password, password2, password1 });
  
      axios.put(`/api/v1/admins/admin/changepassword/${id}`, body, config)
          .then(res => dispatch({
              type: CHANGE_PASSWORD,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const verifyAccount = ({ emailCode:code }) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ code });
  
      axios.post(`/api/v1/admins/confirm-email`, body, config)
          .then(res => dispatch({
              type: VERIFY_SUCCESS,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const resendEmailVerificationCode = () => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
  
      axios.post(`/api/v1/admins/send-emailcode`)
          .then(res => dispatch({
              type: SEND_CODE,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const resendEmailVerificationCodeSMS = () => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
  
      axios.post(`/api/v1/admins/send-emailcode/sms`)
          .then(res => dispatch({
              type: SEND_CODE,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const resetAdminPasswordMail = ({ email, token }) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  token
      //Request body
      const body = JSON.stringify({ email, token });
  
      axios.post(`/api/v1/admins/resetmail`, body, config)
          .then(res => dispatch({
              type: SEND_CODE,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const resetAdminPassword = ({ email, password, password2, resetCode, token }) => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ email, password, password2, resetCode, token });
  
      axios.post(`/api/v1/admins/resetpassword`, body, config)
          .then(res => dispatch({
              type: CHANGE_PIN,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  //CLEAR ERRORS
  export const clearSuccess = () => {
    return {
        type: CLEAR_SUCCESS
    };
  };
  
  //logout
  export const logout = () => () => {
    const { dispatch } = useApplication();
      dispatch(setAdminsLoading());
    axios
      .get('/api/v1/admins/admin/logout')
      .then(res => dispatch({
          type: LOGOUT_SUCCESS
      }))
      .catch(err => dispatch({
          type: "LOGOUT_FAIL"
      }))
  }
  
  
  export const setAdminsLoading = () => {
      return {
        type: CREATOR_LOADING
      };
    };
  
    