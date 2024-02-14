import { useApplication } from "../applicationContext";
import { 
    ADD_COURSE,
    COURSES_LOADING, 
    COURSE_LOADED, 
    DELETE_COURSE, 
    FAILED,
    FETCH_COURSES
} from "./actionTypes";
import { returnErrors } from "./errorActions";

 
//Load a course
export const fetchACourse = (id) => () => {
    const { dispatch } = useApplication();
    //student loading
    dispatch({ type: COURSES_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/courses/${id}`)
          .then(res => dispatch({
              type: COURSE_LOADED,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getCourses = () => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
      axios
        .get('/api/v1/courses')
        .then(res =>
          dispatch({
            type: FETCH_COURSES,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
  };
  
  
  //Add Course
  export const addNewCourse = ({ title, school, duration  } ) => dispatch => {
    dispatch(setCoursesLoading());  
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ title, school, duration });
  
      axios.post('/api/v1/courses/add', body, config)
          .then(res => dispatch({
              type: ADD_COURSE,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }

  
  //Update a Course Info
  export const updateACourse = ({  title, school, duration, id } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ title, school, duration });
  
      axios.put(`/api/v1/courses/${id}`, body, config)
          .then(res => dispatch({
              type: COURSE_LOADED,
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
      dispatch(setCoursesLoading());
    axios
        .delete(`/api/v1/courses/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_COURSE,
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
    

export const setCoursesLoading = () => {
    return {
      type: COURSES_LOADING
    };
  };