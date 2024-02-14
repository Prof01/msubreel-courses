import axios from 'axios';
import { 
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
import { useApplication } from '../applicationContext';


export const loadCreator = () => () => {
    const { dispatch } = useApplication();
    //Creator loading
    dispatch({ type: CREATOR_LOADING });
  
      axios.get('/api/v1/creators/dashboard')
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
export const fetchCreator = (id) => () => {
    const { dispatch } = useApplication();
    //Creator loading
    dispatch({ type: CREATOR_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/creators/creator/${id}`)
          .then(res => dispatch({
              type: CUSTOMER_LOADED,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getCreators = () => () => {
    const { dispatch } = useApplication();
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
  export const registerCreator = ({  firstname, lastname, email, email2, gender, country, countryCode,
    zipCode, phoneNumber, password, password2,  pin, referalCode, token } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, email, email2, gender, country, countryCode,
        zipCode, phoneNumber, password, password2,  pin, referalCode, token });
      
      setTimeout(()=> {
        axios.post('/api/v1/creators/register', body, config)
            .then(res => dispatch({
                type: ADD_creator,
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
  
  //Update Creator Info By Admin
  export const updateCustomerInfo = ({  firstname, lastname, phoneNumber, id, isBlocked, isSilenceBanned, haltWithdrawal } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, phoneNumber, isBlocked, isSilenceBanned, haltWithdrawal });
  
      axios.put(`/api/v1/creators/${id}/update/admin`, body, config)
          .then(res => dispatch({
              type: SEND_COIN,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CREATORCARD_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  //Update creator Info
  export const updatecreatorInfo = ({  firstname, lastname, creatorname, phoneNumber, id, isBlocked, showBalance } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, creatorname, phoneNumber, isBlocked, showBalance });
  
      axios.put(`/api/v1/creators/${id}/update`, body, config)
          .then(res => dispatch({
              type: ADD_creator,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CREATORCARD_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  //Verify MOMO
  export const verifyNewcreatorMomo = ({ accountNumber, confirmationCode } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, confirmationCode });
  
      axios.post('/api/v1/creator/deposit-method/momo/verify', body, config)
          .then(res => dispatch({
              type: ADD_CREATOR_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CREATORCARD_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  //Resend Momo Verification Code
  export const resendCreatorMomoCode = ({ accountNumber } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber });
      axios.post('/api/v1/creator/deposit-method/momo/sendcode', body, config)
          .then(res => dispatch({
              type: ADD_CREATOR_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CREATORCARD_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  //Add MOMO
  export const addNewCreatorMomo = ({ accountNumber, accountName, network  } ) => dispatch => {
    const name = accountName.toUpperCase()
    dispatch(setCreatorsLoading());  
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, accountName:name, network });
  
      axios.post('/api/v1/creator/deposit-method/momo', body, config)
          .then(res => dispatch({
              type: ADD_CREATOR_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CREATORCARD_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  //Add Bank Card
  export const addNewCreatorBankCard = ({ accountNumber, accountName, cardType, cvc, expiryMonth, expiryYear  } ) => dispatch => {
    const name = accountName.toUpperCase()
  
    dispatch(setCreatorsLoading());  
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, accountName:name, cardType, cvc, expiryMonth, expiryYear });
  
      axios.post('/api/v1/creator/deposit-method/bankcard', body, config)
          .then(res => dispatch({
              type: ADD_CREATOR_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_creator_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  //Add Bank Account
  export const addNewCreatorBankAccount = ({ accountNumber, accountName, bankName, bankCode, branch } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, accountName, bankName, bankCode, branch });
  
      axios.post('/api/v1/creator/deposit-method/bankaccount', body, config)
          .then(res => dispatch({
              type: ADD_CREATOR_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_creator_FAILED'));
              dispatch({
                  type: ADD_CREATORCARD_FAILED
              })
          })
  }
  
  
  export const deleteCreatorMomo = (mId) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    axios
        .delete(`/api/v1/creator/deposit-method/momo/${mId}`)
        .then(res =>
          dispatch({
            type: DELETE_CREATOR_MOMO,
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
    
  
  export const deleteCreatorBankCard = (mId) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    axios
        .delete(`/api/v1/creator/deposit-method/bankcard/${mId}`)
        .then(res =>
          dispatch({
            type: DELETE_CREATOR_MOMO,
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
  
  export const deleteCreatorBankAccount = (mId) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    axios
        .delete(`/api/v1/creator/deposit-method/bankaccount/${mId}`)
        .then(res =>
          dispatch({
            type: DELETE_CREATOR_MOMO,
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
    
  export const deleteCreator = id => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    axios
        .delete(`/api/v1/creators/${id}`)
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
  export const loginCreator = ({ email, password, token, ip }) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({email, password, token, ip });
  
      axios.post('/api/v1/creators/login', body, config)
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
  
  
  export const updateCreatorProfileImage = (body) => () => {
    const { dispatch } = useApplication();
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
  
  export const changeCreatorPassword = ({ id, password, password2, password1 }) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({password, password2, password1 });
  
      axios.put(`/api/v1/creators/creator/${id}/password`, body, config)
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
  
  export const resetCreatorPin = id => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    
      axios.put(`/api/v1/creators/creator/${id}/pin/reset`)
          .then(res => dispatch({
              type: CHANGE_PIN,
              payload: res.data.msg
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
  
  export const resendEmailVerificationCode = () => () => {
    const { dispatch } = useApplication();
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
  
  export const resendEmailVerificationCodeSMS = () => () => {
    const { dispatch } = useApplication();
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
  
  export const changeCreatorPin = ({ id, pin, pin2, pin1 }) => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({pin, pin2, pin1 });
  
      axios.put(`/api/v1/creators/creator/${id}/pin`, body, config)
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
  
  export const resetCreatorPasswordMail = ({ email, token }) => () => {
    const { dispatch } = useApplication();
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
  
  export const resetCreatorPassword = ({ email, password, password2, resetCode, token }) => () => {
    const { dispatch } = useApplication();
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
  export const logout = () => () => {
    const { dispatch } = useApplication();
      dispatch(setCreatorsLoading());
    axios
      .get('/api/v1/creators/logout')
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
  
    