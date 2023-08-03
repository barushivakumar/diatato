// store.js

import { legacy_createStore as createStore} from 'redux';

const initialState = {
  appData: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ROLE':
      return { ...state, role: action.payload };
      case 'PropertyId':
      return { ...state, PropertyId: action.payload };
      case 'SubscriptionType':
      return { ...state, SubscriptionType: action.payload };
      case 'SubscriptionPlanPrice':
      return { ...state, SubscriptionPlanPrice: action.payload };
      case 'EmailVerification':
      return { ...state, EmailVerification: action.payload };
      
    default:
      return state;
  }
};



export const store = createStore(rootReducer);

