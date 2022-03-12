const SET_USER = 'USER/SET_USER' as const;

type UserType = {
  id: number;
  phone_number: string;
  name: string;
  is_child: boolean;
  parent: {
    id: number;
    phone_number: string;
    name: string;
    is_child: boolean;
  } | null;
  children: {
    id: number;
    phone_number: string;
    name: string;
    is_child: boolean;
  } | null;
} | null;

export const chagneUser = (user: UserType) => ({
  type: SET_USER,
  payload: user,
});

type UserAction = ReturnType<typeof chagneUser>;

export interface IUserState {
  user: UserType;
}

const initialState: IUserState = {
  user: null,
};

const setUser = (state: IUserState, user: UserType) => ({
  ...state,
  user,
});

const reducer = (state: IUserState = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
