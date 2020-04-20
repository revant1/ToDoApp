import {initialState} from '../store/initialState'

export const  modalReducer = (state=initialState.modalReducer,action) => {
    switch (action.type) {
        case "MODAL_ON":
            console.log('HI...',action.payload)
           return {...state.showModal,showModal:action.payload}
        case "MODAL_OFF":
            console.log('HiXXXX')
            return {...state.modelData,showModal:action.payload }
        default:
            return state;
    }

}