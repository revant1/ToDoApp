import React, { Component } from 'react'
import './style.css';
import { Priority } from './Priority';
import { DatePicker} from './DatePicker';
import { CancelSave } from './CancelSave';
import { connect }from 'react-redux';


class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state= {
            modalBtn:false,
            onModalKeyPressed:false,
            taskData: {
                taskId:3,
                mySummary:"",
                myDescription:"",
                myPriority:"",
                myDate:"",
                timeStamp: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
            }
        }
        this.mySummaryRef = React.createRef();
        this.state.taskData = props.editedRow || this.state.taskData;
    }
    handleButton = () => {
        this.setState((prevState,props) => {
           return { modalBtn: !prevState.modalBtn ,onModalKeyPressed : false}
        })
    }
    componentDidUpdate(){
        console.log("componentDidMount",this.state)
    }
    onKeyPressed = (e) => {
       if (e.keyCode === 27) {
        this.setState((prevState,props) => {
            return { onModalKeyPressed: !prevState.onModalKeyPressed,modalBtn: false }
        })
        this.props.history.push('/');
       }
       
    }
        
    handleChange = (e,type) => {
        this.setState({
            taskData:{
                ...this.state.taskData,
                [type]:e.target.value,
            }
        })
    }

    handleFocus = () =>  {
        this.mySummaryRef.current.focus();
    }
    closeModal = () => {
        this.setState((prevState,props) => {
            return { onModalKeyPressed: !prevState.onModalKeyPressed,modalBtn: false }
        });
        this.props.history.push('/');
    }
    saveForm = () => {

       setTimeout(() => {
        const allData = this.state.taskData;
        this.props.addTask(allData);
        this.props.history.push('/');
       },0)
    }

    render() {
        const {modalData,editedRow} = this.props;
        // console.log(this.state.taskData,"DATA TO UPDATED");
        const {taskData} = this.state;
        console.log(taskData.myDate,"DATE")
        return (
            <div onKeyDown={(e) => this.onKeyPressed(e)} >
                <div id="simpleModal" className={`${!modalData.showModal || this.state.onModalKeyPressed ? "noModalDisplay" : "modal"}`} >
                <div className="modal-content">
                    <label id="mySummary" name="summary" htmlFor="mySummary" className="myFont">Summary :</label>
                        <input id="mySummary"
                            type="text"
                            className="myLine" 
                            ref={this.mySummaryRef}
                            onChange={e => this.handleChange(e,"mySummary")} 
                            onClick={this.handleFocus}
                            value={taskData.mySummary}
                            maxlength={25}
                          />
                    <br />
                    <br />
                    <label id="myDescription" name="myDescription" htmlFor="myDescription" className="myFont">Description :</label>
                        <textarea id="myDescription" 
                            className="myDescription"
                            onChange={e => this.handleChange(e,"myDescription")} 
                            rows= {4}
                            value={taskData.myDescription}
                            maxLength={250}
                         />
                            <span className="closeBtn" onClick={this.closeModal} >&times;</span>
                        <div className="mypridt">
                        <Priority
                        id="myPriority"
                        name="Priority:"
                        onSelection={e => this.handleChange(e,"myPriority")}
                        selectedvalue={this.state.taskData.myPriority}
                        value={taskData.myPriority}
                    />
                    <DatePicker
                        id="myDatePicker"
                        name="Date"
                        onSelection={e => this.handleChange(e,"myDate")}
                        selectedvalue={this.state.taskData.myDate}
                    />
                        </div>
                    <br/>
                    <br/>
                    <CancelSave
                        cancelProps={this.closeModal}
                        saveProps={this.saveForm}
                    /> 
                </div>
                </div>
            </div>
        )
    }
}
export const mapDispatchToProps = dispatch => {
    return {
        addTask: taskData => {
         if (taskData.taskId === 3) dispatch({type:"UPDATE_TASKID_COUNT"})
        
    return  dispatch({type:"ADD_TASK",payload:taskData})}  
    }
}
export const mapStateToProps = state => {
    return {
        modalData: state.modalReducer,
        editedRow: state.taskReducer.editedRow,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm)