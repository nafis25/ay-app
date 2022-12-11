import {createContext, useReducer} from 'react';
import {getScholarshipInfo} from '../requests/PortalRequests';
import {isUndefined} from '../utils/functions';

const initialState = {
  data: {
    student_index: null,
    selected_student: {},
  },
};

const PortalContext = createContext({
  ...initialState,
  setSelectedStudent: student => {},
  setStudentIndex: index => {},
});

const portalReducer = (state, {payload, type}) => {
  switch (type) {
    case 'SET_SELECTED_STUDENT':
      return {
        ...state,
        data: {
          ...state.data,
          student_index: payload.id || null,
          selected_student: payload,
        },
      };
    default:
      return state;
  }
};

const PortalProvider = props => {
  const [state, dispatch] = useReducer(portalReducer, initialState);

  const setSelectedStudent = student => {
    dispatch({
      type: 'SET_SELECTED_STUDENT',
      payload: student,
    });
  };

  return (
    <PortalContext.Provider
      value={{
        data: state.data,
        setSelectedStudent,
      }}
      {...props}
    />
  );
};

export {PortalContext, PortalProvider};
