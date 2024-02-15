import { 
  ADD_CERTIFICATE,
  ADD_COURSE,
  ADD_CREATOR,
  ADD_CREATOR_MOMO,
  ADD_LESSON,
  ADD_STUDENT,
  ADD_STUDENT_FAILED,
  ADD_STUDENT_MOMO,
  ADD_TEST,
  AUTH_ERROR,
    CHANGE_FAIL,
    CHANGE_PASSWORD,
    CHANGE_PIN,
    CLEAR_SUCCESS,
    CLEAR_TYPE,
    CREATOR_LOADED,
    CREATOR_LOADING,
    CUSTOMER_LOADED,
    DELETE_CERTIFICATE,
    DELETE_COURSE,
    DELETE_CREATOR,
    DELETE_CREATOR_MOMO,
    DELETE_LESSON,
    DELETE_STUDENT,
    DELETE_STUDENT_MOMO,
    DELETE_TEST,
    FAILED,
    FETCH_CERTIFICATE,
    FETCH_CERTIFICATES,
    FETCH_COURSE,
    FETCH_COURSES,
    FETCH_CREATORS,
    FETCH_LESSON,
    FETCH_LESSONS,
    FETCH_STUDENT, 
    FETCH_STUDENTS, 
    FETCH_TEST,
    FETCH_TESTS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SEND_CODE,
    SIGNUP_FAIL,
    STUDENTS_LOADED,
    STUDENTS_LOADING,
    STUDENT_LOADED,
    STUDENT_LOADING,
    VERIFY_SUCCESS
} from "./actions/actionTypes";

const initialState = {
    creator: null,
    student: null,
    students: [],
    course: null,
    courses: [],
    lesson: null,
    lessons: [],
    certificate: null,
    certificates: [],
    isLoading: false,
    isAuthenticated: false,
    test: null,
    errorMsg: null,
    success: null,
    successMsg: null,
    msg: null,
  };

  
const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLEAR_TYPE:
            return {
                ...state,
                type: '',
                isLoading: false
            }
      case CREATOR_LOADING:
        return { 
          ...state, 
          isLoading: true
        };
        case CREATOR_LOADED:
          return { 
            ...state, 
            creator: action.payload, 
            isLoading: false 
          };
          case FETCH_CREATORS:
            return { 
              ...state, 
              creators: action.payload, 
              isLoading: false 
            };
            case ADD_CREATOR:
                return {
                    ...state,
                    creator: action.payload?.creator,
                    isAuthenticated: true,
                    success: action.payload?.msg,
                    isLoading: false
           };
      case FETCH_TEST:
        return { 
          ...state, 
          test: action.payload, 
          isLoading: false 
        };
      case FETCH_TESTS:
        return { 
          ...state, 
          tests: action.payload, 
          isLoading: false 
        };
        case ADD_TEST:
            return {
                ...state,
                test: action.payload.test,
                success: action.payload.msg,
                isLoading: false,
                selectedIndex: 0
            }
        case DELETE_TEST:
          return {
              ...state,
              tests: state.tests.filter(test => test._id !== action.payload),
              isLoading: false,
          }
      case FETCH_CERTIFICATE:
        return { 
          ...state, 
          certificate: action.payload, 
          isLoading: false 
        };
      case FETCH_CERTIFICATES:
        return { 
          ...state, 
          certificates: action.payload, 
          isLoading: false 
        };
        case ADD_CERTIFICATE:
            return {
                ...state,
                certificate: action.payload.certificate,
                success: action.payload.msg,
                isLoading: false,
                selectedIndex: 0
            }
        case DELETE_CERTIFICATE:
          return {
              ...state,
              certificates: state.certificates.filter(certificate => certificate._id !== action.payload),
              isLoading: false,
          }
      case FETCH_COURSE:
        return { 
          ...state, 
          course: action.payload, 
          isLoading: false 
        };
      case FETCH_COURSES:
        return { 
          ...state, 
          courses: action.payload, 
          isLoading: false 
        };
        case ADD_COURSE:
            return {
                ...state,
                course: action.payload.course,
                success: action.payload.msg,
                isLoading: false,
                selectedIndex: 0
            }
        case DELETE_COURSE:
          return {
              ...state,
              courses: state.courses.filter(course => course._id !== action.payload),
              isLoading: false,
          }
      case FETCH_LESSON:
        return { 
          ...state, 
          lesson: action.payload, 
          isLoading: false 
        };
      case FETCH_LESSONS:
        return { 
          ...state, 
          lessons: action.payload, 
          isLoading: false 
        };
        case ADD_LESSON:
            return {
                ...state,
                lesson: action.payload.lesson,
                success: action.payload.msg,
                isLoading: false,
                selectedIndex: 0
            }
        case DELETE_LESSON:
          return {
              ...state,
              lessons: state.lessons.filter(lesson => lesson._id !== action.payload),
              isLoading: false,
          }
      case FETCH_STUDENT:
        return { 
          ...state, 
          student: action.payload, 
          isLoading: false 
        };
      case FETCH_STUDENTS:
        return { 
          ...state, 
          students: action.payload, 
          isLoading: false 
        };
      case VERIFY_SUCCESS:
          return {
              ...state,
              student: action.payload?.student,
              isLoading: false
          }
          case CHANGE_FAIL:
              return {
                  ...state,
                  msg: action.payload,
                  isLoading: false,
              };
          case CHANGE_PASSWORD:
              return {
                  ...state,
                  success: action.payload,
                  isLoading: false,
              };
          case CHANGE_PIN:
              return {
                  ...state,
                  success: action.payload,
                  isLoading: false,
              };
              case CLEAR_SUCCESS:
                  return {
                      ...state,
                     success: null,
                     isLoading: false
                      };
          case SEND_CODE:
              return {
                  ...state,
                  msg: action.payload,
                  isLoading: false,
              };
      case STUDENTS_LOADING: 
      return {
          ...state,
          isLoading: true
        };
        case STUDENT_LOADING:
             return {
                 ...state,
                 isLoading: true
              };
              case ADD_STUDENT:
                  return {
                      ...state,
                      student: action.payload?.student,
                      isAuthenticated: true,
                      success: action.payload?.msg,
                      isLoading: false
             };
        case ADD_STUDENT_MOMO:
             return {
              ...state,
              student: action.payload?.student,
              success: action.payload?.msg,
              isAuthenticated: true,
              isLoading: false
          };
        case DELETE_STUDENT_MOMO:
             return {
              ...state,
              student: action.payload?.student,
              isAuthenticated: true,
              isLoading: false
          };
          case STUDENT_LOADED:
              return {
                  ...state,
                  isAuthenticated: true,
                  student: action.payload?.student,
                  isLoading: false,
              };       
              case CUSTOMER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                selectedCustomer: action.payload?.user,
                isLoading: false,
              };       
              case LOGIN_SUCCESS:
                  case REGISTER_SUCCESS:
                      return {
                          ...state,
                          ...action.payload,
                          isAuthenticated: true,
                          isLoading: false
                      };
                      case DELETE_STUDENT:
                          return {
                              ...state,
                              success: action.payload?.msg,
                              isLoading: false
                          }
                      case DELETE_CREATOR:
                          return {
                              ...state,
                              success: action.payload?.msg,
                              isLoading: false
                          }
          case REGISTER_FAIL:
          return {
              ...state,
              isAuthenticated: true,
              isLoading: false
          }
          case FAILED:
          return {
              ...state,
              isLoading: false
          }
      case ADD_STUDENT_FAILED:
          return {
              ...state,
              user: null,
              isAuthenticated: false,
              isLoading: false
          }
      case ADD_STUDENTCARD_FAILED:
          return {
              ...state,
              isAuthenticated: true,
              isLoading: false
          }
      case SIGNUP_FAIL:
          return {
              ...state,
              isAuthenticated: false,
              isLoading: false
          }
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
          return {
              ...state,
              student: null,
              creator: null,
              isAuthenticated: false,
              isLoading: false
          }
      default:
        return state;
    }
  };
  
  export { initialState, applicationReducer };