import axios from 'axios';
import { returnErrors } from './errorActions';
import { useApplication } from '../applicationContext';
import { 
    ADD_INVOICE,
    CLEAR_SUCCESS, 
    CREATOR_LOADING,
    DELETE_INVOICE,
    FAILED,
    FETCH_BALANCE,
    FETCH_INVOICE,
    FETCH_INVOICES
 } from './actionTypes';

//Load a Invoice
export const fetchAnInvoice = (id) => () => {
    const { dispatch } = useApplication();
    //Creator loading
    dispatch({ type: CREATOR_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/invoices/invoice/${id}`)
          .then(res => dispatch({
              type: FETCH_INVOICE,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
//Load a Balance
export const fetchABalance = (id) => () => {
    const { dispatch } = useApplication();
    //Creator loading
    dispatch({ type: CREATOR_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/invoices/balance`)
          .then(res => dispatch({
              type: FETCH_BALANCE,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getInvoices = () => () => {
    const { dispatch } = useApplication();
      dispatch(setInvoicesLoading());
      axios
        .get('/api/v1/invoices')
        .then(res =>
          dispatch({
            type: FETCH_INVOICES,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
  };
  
  
  export const getCreatorInvoices = () => () => {
    const { dispatch } = useApplication();
      dispatch(setInvoicesLoading());
      axios
        .get('/api/v1/invoices/creator')
        .then(res =>
          dispatch({
            type: FETCH_INVOICES,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
  };
  
  
  //Create an Invoice
  export const createAnInvoice = ({  
    courseId,
    phoneNumber,
    paymentMethod,
    couponCode,
    type
} ) => () => {
    const { dispatch } = useApplication();
      dispatch(setInvoicesLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ 
        courseId,
    phoneNumber,
    paymentMethod,
    couponCode,
    type });
      
      setTimeout(()=> {
        axios.post('/api/v1/paystack/invoice', body, config)
            .then(res => dispatch({
                type: ADD_INVOICE,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL'));
                dispatch({
                    type: FAILED
                })
            })
      }, 15000)
  }

  
  //Pay For an Invoice
  export const PayForAnInvoice = ({  
    PaymentType,
    MobileNumber,
    Amount,
    ClientReference
} ) => () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { dispatch } = useApplication();
      dispatch(setInvoicesLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ 
        PaymentType,
        MobileNumber,
        Amount,
        ClientReference });
      
      setTimeout(()=> {
        axios.post('/api/v1/invoice/paid', body, config)
            .then(res => dispatch({
                type: ADD_INVOICE,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL'));
                dispatch({
                    type: FAILED
                })
            })
      }, 15000)
  }

  
  export const cancelAnInvoice = ({ClientReference}) => () => {
    const { dispatch } = useApplication();
      dispatch(setInvoicesLoading());
       //Headers
       const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
      //Request body
      const body = JSON.stringify({ 
        ClientReference });

    axios
        .post(`/api/v1/invoices/invoice/cancelled`, config, body)
        .then(res =>
          dispatch({
            type: DELETE_INVOICE,
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
  
  //CLEAR ERRORS
  export const clearSuccess = () => {
    return {
        type: CLEAR_SUCCESS
    };
  };

  
  export const setInvoicesLoading = () => {
    return {
      type: CREATOR_LOADING
    };
  };
