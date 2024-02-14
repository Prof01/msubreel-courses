import axios from 'axios';
import { 
    ADD_STUDENT_MOMO,
    AUTH_ERROR,
    CHANGE_FAIL,
    CHANGE_PASSWORD,
    CHANGE_PIN,
    CLEAR_SUCCESS,
    STUDENT_LOADED, 
    STUDENT_LOADING,
    CUSTOMER_LOADED,
    DELETE_STUDENT,
    DELETE_STUDENT_MOMO,
    FAILED,
    FETCH_STUDENTS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    STUDENTS_LOADING,
    VERIFY_SUCCESS,
    ADD_STUDENT
 } from "./actionTypes";
import { returnErrors } from './errorActions';
import { useApplication } from '../applicationContext';


export const loadStudent = () => () => {
    const { dispatch } = useApplication();
    //student loading
    dispatch({ type: STUDENT_LOADING });
  
      axios.get('/api/v1/students/dashboard')
          .then(res => dispatch({
              type: STUDENT_LOADED,
              payload: res.data
          }))
          .catch(err => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status));
                dispatch({
                    type: AUTH_ERROR
                });
  
          });
  };

  
//Load a student
export const fetchStudent = (id) => () => {
    const { dispatch } = useApplication();
    //student loading
    dispatch({ type: STUDENT_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/students/student/${id}`)
          .then(res => dispatch({
              type: CUSTOMER_LOADED,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getStudents = () => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
      axios
        .get('/api/v1/students')
        .then(res =>
          dispatch({
            type: FETCH_STUDENTS,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
  };
  
  
  //Register student
  export const registerStudent = ({  firstname, lastname, email, email2, gender, country, countryCode,
    zipCode, phoneNumber, password, password2,  pin, referalCode, token } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
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
        axios.post('/api/v1/students/register', body, config)
            .then(res => dispatch({
                type: ADD_STUDENT,
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
  
  //Update student Info By Admin
  export const updateCustomerInfo = ({  firstname, lastname, phoneNumber, id, isBlocked, isSilenceBanned, haltWithdrawal } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, phoneNumber, isBlocked, isSilenceBanned, haltWithdrawal });
  
      axios.put(`/api/v1/students/${id}/update/admin`, body, config)
          .then(res => dispatch({
              type: STUDENT_LOADED,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
  //Update student Info
  export const updateStudentInfo = ({  firstname, lastname, studentname, phoneNumber, id, isBlocked, showBalance } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, studentname, phoneNumber, isBlocked, showBalance });
  
      axios.put(`/api/v1/students/${id}/update`, body, config)
          .then(res => dispatch({
              type: ADD_STUDENT,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
  //Verify MOMO
  export const verifyNewStudentMomo = ({ accountNumber, confirmationCode } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, confirmationCode });
  
      axios.post('/api/v1/student/deposit-method/momo/verify', body, config)
          .then(res => dispatch({
              type: ADD_STUDENT_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
  //Resend Momo Verification Code
  export const resendStudentMomoCode = ({ accountNumber } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber });
      axios.post('/api/v1/student/deposit-method/momo/sendcode', body, config)
          .then(res => dispatch({
              type: ADD_STUDENT_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
  //Add MOMO
  export const addNewStudentMomo = ({ accountNumber, accountName, network  } ) => dispatch => {
    const name = accountName.toUpperCase()
    dispatch(setStudentsLoading());  
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, accountName:name, network });
  
      axios.post('/api/v1/student/deposit-method/momo', body, config)
          .then(res => dispatch({
              type: ADD_STUDENT_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
  //Add Bank Card
  export const addNewStudentBankCard = ({ accountNumber, accountName, cardType, cvc, expiryMonth, expiryYear  } ) => dispatch => {
    const name = accountName.toUpperCase()
  
    dispatch(setStudentsLoading());  
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, accountName:name, cardType, cvc, expiryMonth, expiryYear });
  
      axios.post('/api/v1/student/deposit-method/bankcard', body, config)
          .then(res => dispatch({
              type: ADD_STUDENT_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_student_FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
  //Add Bank Account
  export const addNewStudentBankAccount = ({ accountNumber, accountName, bankName, bankCode, branch } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ accountNumber, accountName, bankName, bankCode, branch });
  
      axios.post('/api/v1/student/deposit-method/bankaccount', body, config)
          .then(res => dispatch({
              type: ADD_STUDENT_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'ADD_student_FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
  
  export const deleteStudentMomo = (mId) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    axios
        .delete(`/api/v1/student/deposit-method/momo/${mId}`)
        .then(res =>
          dispatch({
            type: DELETE_STUDENT_MOMO,
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
    
  
  export const deleteStudentBankCard = (mId) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    axios
        .delete(`/api/v1/student/deposit-method/bankcard/${mId}`)
        .then(res =>
          dispatch({
            type: DELETE_STUDENT_MOMO,
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
  
  export const deleteStudentBankAccount = (mId) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    axios
        .delete(`/api/v1/student/deposit-method/bankaccount/${mId}`)
        .then(res =>
          dispatch({
            type: DELETE_STUDENT_MOMO,
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
    
  export const deleteStudent = id => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    axios
        .delete(`/api/v1/students/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_STUDENT,
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
  export const loginStudent = ({ email, password, token, ip }) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({email, password, token, ip });
  
      axios.post('/api/v1/students/login', body, config)
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
  
  
  export const updateStudentProfileImage = (body) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
  
      axios.put(`/api/v1/students/student/avatar`, body)
          .then(res => dispatch({
              type: ADD_STUDENT_MOMO,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_FAIL'));
              dispatch({
                  type: CHANGE_FAIL
              })
          })
  }
  
  export const changeStudentPassword = ({ id, password, password2, password1 }) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({password, password2, password1 });
  
      axios.put(`/api/v1/students/student/${id}/password`, body, config)
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
  
  export const resetStudentPin = id => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    
      axios.put(`/api/v1/students/student/${id}/pin/reset`)
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
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ code });
  
      axios.post(`/api/v1/students/confirm-email`, body, config)
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
      dispatch(setStudentsLoading());
  
      axios.post(`/api/v1/students/send-emailcode`)
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
      dispatch(setStudentsLoading());
  
      axios.post(`/api/v1/students/send-emailcode/sms`)
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
  
  export const changestudentPin = ({ id, pin, pin2, pin1 }) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({pin, pin2, pin1 });
  
      axios.put(`/api/v1/students/student/${id}/pin`, body, config)
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
  
  export const resetStudentPasswordMail = ({ email, token }) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  token
      //Request body
      const body = JSON.stringify({ email, token });
  
      axios.post(`/api/v1/students/resetmail`, body, config)
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
  
  export const resetStudentPassword = ({ email, password, password2, resetCode, token }) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ email, password, password2, resetCode, token });
  
      axios.post(`/api/v1/students/resetpassword`, body, config)
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
      dispatch(setStudentsLoading());
    axios
      .get('/api/v1/students/logout')
      .then(res => dispatch({
          type: LOGOUT_SUCCESS
      }))
      .catch(err => dispatch({
          type: "LOGOUT_FAIL"
      }))
  }
  
  
  export const setStudentsLoading = () => {
      return {
        type: STUDENTS_LOADING
      };
    };
  
    