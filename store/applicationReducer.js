import { 
    CREATOR_LOADED,
    CREATOR_LOADING,
    FETCH_COURSE,
    FETCH_COURSES,
    FETCH_CREATORS,
    FETCH_STUDENT, 
    FETCH_STUDENTS, 
    FETCH_TEST,
    FETCH_TESTS
} from "./actions/actionTypes";

const initialState = {
    creator: null,
    student: null,
    students: [],
    course: null,
    courses: [],
    certificate: null,
    certificates: [],
    isLoading: false,
    isAuthenticated: false,
    test: null,
    errorMsg: null,
    success: null,
    successMsg: null,
    totalTime: '0:00',
  };

  
const applicationReducer = (state, action) => {
    switch (action.type) {
      case CREATOR_LOADING:
        return { ...state, isLoading: true };
      case CREATOR_LOADED:
        return { ...state, creator: action.payload, isLoading: false };
      case FETCH_CREATORS:
        return { ...state, creators: action.payload, isLoading: false };
      case FETCH_TEST:
        return { ...state, test: action.payload, isLoading: false };
      case FETCH_TESTS:
        return { ...state, tests: action.payload, isLoading: false };
      case FETCH_COURSE:
        return { ...state, course: action.payload, isLoading: false };
      case FETCH_COURSES:
        return { ...state, courses: action.payload, isLoading: false };
      case FETCH_STUDENT:
        return { ...state, student: action.payload, isLoading: false };
      case FETCH_STUDENTS:
        return { ...state, students: action.payload, isLoading: false };
      default:
        return state;
    }
  };
  
  export { initialState, applicationReducer };