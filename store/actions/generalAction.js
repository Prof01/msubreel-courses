import { useApplication } from "../applicationContext";
import { 
    ADD_COURSE,
    ADD_LESSON,
    COURSES_LOADING, 
    COURSE_LOADED, 
    DELETE_CERTIFICATE, 
    DELETE_COURSE, 
    DELETE_LESSON, 
    FAILED,
    FETCH_CERTIFICATE,
    FETCH_CERTIFICATES,
    FETCH_CHATS,
    FETCH_COURSES,
    FETCH_LESSONS,
    LESSONS_LOADING,
    LESSON_LOADED
} from "./actionTypes";
import { returnErrors } from "./errorActions";

 
//Load a course
export const fetchACourse = (id) => () => {
    const { dispatch } = useApplication();
    //student loading
    dispatch({ type: COURSES_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/courses/course/${id}`)
          .then(res => dispatch({
              type: COURSE_LOADED,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getAllCourses = () => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
      axios
        .get('/api/v1/courses/all')
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
  
  
  export const getSponsoredCourses = () => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
      axios
        .get('/api/v1/courses/sponsored/all')
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
  
  
  export const getApprovedCourses = () => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
      axios
        .get('/api/v1/courses/approved/all')
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
  
  
  export const getAllCoursesByCreatorId = (creatorId) => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
      axios
        .get(`/api/v1/courses/creator/id/${creatorId}`)
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
  
  
  export const getAllCoursesByCreatorUsername = (username) => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
      axios
        .get(`/api/v1/courses/creator/name/${username}`)
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
  export const addNewCourse = ({ schoolname,
      courseIntroVideo,
      schoolImage,
      title,
      type,
      currencySymbol,
      amount,
      courseOutline,
      shortDescription,
      longDescription,
      discount  } ) => dispatch => {
    dispatch(setCoursesLoading());  
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ schoolname,
      courseIntroVideo,
      schoolImage,
      title,
      type,
      currencySymbol,
      amount,
      courseOutline,
      shortDescription,
      longDescription,
      discount });
  
      axios.post('/api/v1/courses/new', body, config)
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
  export const updateACourse = ({  schoolname,
    courseIntroVideo,
    schoolImage,
    title,
    type,
    currencySymbol,
    amount,
    courseOutline,
    shortDescription,
    longDescription,
    discount,
     id } ) => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ 
        schoolname,
        courseIntroVideo,
        schoolImage,
        title,
        type,
        currencySymbol,
        amount,
        courseOutline,
        shortDescription,
        longDescription,
        discount });
  
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
  
export const deleteACourse = id => () => {
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
    
 
//Load a lesson
export const fetchALesson = (id) => () => {
    const { dispatch } = useApplication();
    //student loading
    dispatch({ type: LESSONS_LOADING });
  
    setTimeout(()=> {
      axios.get(`/api/v1/courses/course/lessons/${id}`)
          .then(res => dispatch({
              type: LESSON_LOADED,
              payload: res.data
          }))
          .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
        }, 5000)
  };
  
  export const getLessons = (id) => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
      axios
        .get(`/api/v1/courses/course/${id}/lessons`)
        .then(res =>
          dispatch({
            type: FETCH_LESSONS,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
  };
  
  
  //Add lesson
  export const addNewLesson = ({ title, school, duration  } ) => dispatch => {
    dispatch(setCoursesLoading());  
    //Headers
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      };
  
      //Request body
      const body = JSON.stringify({ title, school, duration });
  
      axios.post('/api/v1/courses/lessons/add', body, config)
          .then(res => dispatch({
              type: ADD_LESSON,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }

  
  //Update a lesson Info
  export const updateALesson = ({  title, school, duration, id } ) => () => {
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
  
      axios.put(`/api/v1/courses/lessons/${id}`, body, config)
          .then(res => dispatch({
              type: LESSON_LOADED,
              payload: res.data
          }))
          .catch(err => {
              dispatch(returnErrors(err.response.data, err.response.status, 'FAILED'));
              dispatch({
                  type: FAILED
              })
          })
  }
  
export const deleteALesson = id => () => {
    const { dispatch } = useApplication();
      dispatch(setCoursesLoading());
    axios
        .delete(`/api/v1/courses/lessons/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_LESSON,
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
    
    
    export const getAllCertificates = () => () => {
        const { dispatch } = useApplication();
          dispatch(setCoursesLoading());
          axios
            .get(`/api/v1/certificateS/all`)
            .then(res =>
              dispatch({
                type: FETCH_CERTIFICATES,
                payload: res.data
              })
            )
            .catch(err =>
              dispatch(returnErrors(err.response.data, err.response.status))
            );
      };

    export const getAllCertificatesByCreator = (id) => () => {
        const { dispatch } = useApplication();
          dispatch(setCoursesLoading());
          axios
            .get(`/api/v1/certificates/creator/id/${id}`)
            .then(res =>
              dispatch({
                type: FETCH_CERTIFICATES,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
                );
            };
            
export const getACertificate = (id) => () => {
  const { dispatch } = useApplication();
  dispatch(setCoursesLoading());
  axios
  .get(`/api/v1/certificates/certificate/${id}`)
  .then(res =>
      dispatch({
          type: FETCH_CERTIFICATE,
          payload: res.data
      })
      )
      .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
          );
      };
      
      
      export const deleteACertificate = id => () => {
        const { dispatch } = useApplication();
        dispatch(setCoursesLoading());
        axios
        .delete(`/api/v1/certificates/certificate/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_CERTIFICATE,
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
        
export const getChatsFromAChartRoom = (id) => () => {
  const { dispatch } = useApplication();
  dispatch(setCoursesLoading());
  axios
  .get(`/api/v1/chatrooms/${id}`)
  .then(res =>
      dispatch({
          type: FETCH_CHATS,
          payload: res.data
      })
      )
      .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
          );
      };
      
export const setCoursesLoading = () => {
    return {
      type: COURSES_LOADING
    };
  };