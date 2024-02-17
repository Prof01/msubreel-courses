import axios from 'axios';
import { 
    ADD_CREATOR,
    ADD_CREATOR_MOMO,
    AUTH_ERROR,
    CHANGE_FAIL,
    CHANGE_PASSWORD,
    CHANGE_PIN,
    CLEAR_SUCCESS,
    CREATOR_LOADED, 
    CREATOR_LOADING,
    CUSTOMER_LOADED,
    DELETE_CREATOR,
    DELETE_CREATOR_MOMO,
    FAILED,
    FETCH_CREATORS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    VERIFY_SUCCESS
 } from "./actionTypes";
import { returnErrors } from './errorActions';


export const loadCreator = (dispatch) => {
    //Creator loading
    dispatch({ type: CREATOR_LOADING });
  
      axios.get('/api/v1/creators/creator/dashboard')
          .then(res => dispatch({
              type: CREATOR_LOADED,
              payload: res.data
          }))
          .catch(err => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status));
                dispatch({
                    type: AUTH_ERROR
                });
  
          });
  };

  
//Load a Creator
export const fetchACreator = (dispatch, id) => {
    //Creator loading
    dispatch({ type: CREATOR_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/creators/creator/${id}`)
          .then(res => dispatch({
              type: CREATOR_LOADED,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getCreators = (dispatch) => {
      dispatch(setCreatorsLoading());
      axios
        .get('/api/v1/creators')
        .then(res =>
          dispatch({
            type: FETCH_CREATORS,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
  };
  
  
  //Register Creator
  export const registerCreator = ({  
    dispatch,
    password,
    email,
    firstname,
    lastname,
    phoneNumber,
    username, 
    referalCode, 
    token 
} ) => {
      dispatch(setCreatorsLoading());
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
        axios.post('/api/v1/creators/creator/signup', body, config)
            .then(res => dispatch({
                type: ADD_CREATOR,
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
  
  //Update creator Info
  export const updateCreatorInfo = ({  dispatch, firstname, lastname, phoneNumber, id } ) => {
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, phoneNumber });
  
      axios.put(`/api/v1/creators/${id}/update`, body, config)
          .then(res => dispatch({
              type: ADD_CREATOR,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CREATORCARD_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  export const deleteCreator = ({dispatch, id}) => {
      dispatch(setCreatorsLoading());
    axios
        .delete(`/api/v1/creators/creator/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_CREATOR,
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
  export const loginCreator = ({ dispatch, email, password, token, ip }) => {
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({email, password, token, ip });
  
      axios.post('/api/v1/creators/creator/login', body, config)
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
  
  
  export const updateCreatorProfileImage =  ({body, dispatch}) => {
      dispatch(setCreatorsLoading());
  
      axios.put(`/api/v1/creators/creator/avatar`, body)
          .then(res => dispatch({
              type: ADD_CREATOR_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const changeCreatorPassword = ({ dispatch, id, password, password2, password1 }) => {
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({password, password2, password1 });
  
      axios.put(`/api/v1/creators/creator/changepassword/${id}`, body, config)
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
  
  export const verifyAccount = ({ dispatch, emailCode:code }) => {
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ code });
  
      axios.post(`/api/v1/creators/confirm-email`, body, config)
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
  
  export const resendEmailVerificationCode = (dispatch) => {
      dispatch(setCreatorsLoading());
  
      axios.post(`/api/v1/creators/send-emailcode`)
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
  
  export const resendEmailVerificationCodeSMS = (dispatch) => {
      dispatch(setCreatorsLoading());
  
      axios.post(`/api/v1/creators/send-emailcode/sms`)
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
  
  export const resetCreatorPasswordMail = ({ dispatch, email, token }) => {
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  token
      //Request body
      const body = JSON.stringify({ email, token });
  
      axios.post(`/api/v1/creators/resetmail`, body, config)
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
  
  export const resetCreatorPassword = ({ dispatch, email, password, password2, resetCode, token }) => {
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ email, password, password2, resetCode, token });
  
      axios.post(`/api/v1/creators/resetpassword`, body, config)
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
  export const logout = (dispatch) => {
      dispatch(setCreatorsLoading());
    axios
      .get('/api/v1/creators/creator/logout')
      .then(res => dispatch({
          type: LOGOUT_SUCCESS
      }))
      .catch(err => dispatch({
          type: "LOGOUT_FAIL"
      }))
  }
  
  
  export const setCreatorsLoading = () => {
      return {
        type: CREATOR_LOADING
      };
    };
  
    