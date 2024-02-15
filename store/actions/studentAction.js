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
  
      axios.get('/api/v1/students/student/dashboard')
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
  
  
  export const getStudentsByCourse = (courseId) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
      axios
        .get(`/api/v1/students/${courseId}`)
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
  export const registerStudent = ({  
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
      dispatch(setStudentsLoading());
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
        token  });
      
      setTimeout(()=> {
        axios.post('/api/v1/students/student/signup', body, config)
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
  

  //Update student Info
  export const updateStudentInfo = ({  firstname, lastname, phoneNumber, id } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setStudentsLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ firstname, lastname, phoneNumber });
  
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
  
      axios.post('/api/v1/students/student/login', body, config)
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
  
      axios.put(`/api/v1/students/student/changepassword/${id}`, body, config)
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
  
    