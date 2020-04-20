import React, { Component } from 'react';
import {connect} from 'react-redux';
import './style.css';
import {hData} from '../../constants/'


const HeaderData = ({data,sortAction}) => {
    const delData = data;
    return (
        data.map((val,ind) => (
            <th key={ind} onClick={(e) => sortAction(e,data[ind])}>{val}</th>
        ))
    )
}
class Table extends Component {
    constructor(props){
        super(props);
        this.state = this.props.rowData;
    }
    handleButton = (e) => {
        e.preventDefault();
        this.props.openModel(true);
        this.props.history.push('/addTask');
    }
    doEdit = (e,type,rowData) => {
        e.preventDefault();
           this.props.updateTask(rowData);
           this.props.history.push('/addTask');
    }
    doDelete = (e,type,rowData) => {
        e.preventDefault();
       this.props.deleteTask(rowData.taskId);
}
    
    render() {
        const {rowData,editedRow} = this.props;
       
        return (
            <div className="myContent">
            <h1>ToDo App</h1>
                <table className="content-table">
               <thead>
                   <tr>
                   <HeaderData data={hData} sortAction={(e,val) => this.props.doSort(e,val)}/>
                   </tr>
               </thead>
               <tbody>
                   {rowData && rowData.map(
                       (row,ind) => (
                           <tr>
                               <td key={`${ind}-z`}>{row.taskId}</td>
                               <td key={`${ind}-a`}>{row.mySummary}</td>
                               <td key={`${ind}-b`}>{row.myDescription}</td>
                               <td key={`${ind}-c`}>{row.myPriority}</td>
                               <td key={`${ind}-d`}>{row.myDate}</td>
                               <td key={`${ind}-e`}>{row.timeStamp}</td>
                               <td key={`${ind}-f`}>
                                   <button 
                                    id="myEdit"
                                    className="myEdit"
                                    onClick={e => this.doEdit(e,"update",row)}/>
                                   <button 
                                   id="myButton"
                                   className="myDelete" 
                                   onClick={e => this.doDelete(e,"Delete",row)}
                                   />
                               </td>
                           </tr>
                       )
                   )}
               </tbody>
            </table>
            <button id="modalBtn" className="button" onClick={(e) => this.handleButton(e)}/>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        rowData: state.taskReducer.taskDetails,
        modalData: state.modalReducer,
        editedRow: state.taskReducer.editedRow,
        taskIdS: state.taskReducer.taskIdVal,
    }
}

export const mapDispatchtoProps = dispatch => {
    return {
        openModel: (data) => {
            dispatch({type:"EDIT_ROW_DELETE"})
            return (dispatch({type:"MODAL_ON",payload:data}))},
        updateTask: (data) => {
            (dispatch({type:"MODAL_ON",payload:true}))
            return (dispatch({type:"UPDATE_START",payload:data}))
        },
        deleteTask : (data) => {dispatch({type:"DELETE_TASK",payload:data})},
        doSort : (e,key) => {
            if (!(key === "Description" || key === "createdAt" || key === "Action" ))
            return  (dispatch({type:"DO_SORT",payload:key}))},
    }
}
export default connect(mapStateToProps,mapDispatchtoProps)(Table)