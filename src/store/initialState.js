export const initialState  = {
    taskReducer :{
        taskDetails:[{
            taskId:3,
            mySummary:"XXX",
            myDescription:"my Description 2",
            myPriority:"high",
            myDate:"2019-02-24",
            timeStamp: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
        },
        {
            taskId:1,
            mySummary:"XZZh",
            myDescription:"my Description 2",
            myPriority:"medium",
            myDate:"2018-09-13",
            timeStamp: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
        },
        {
            taskId:2,
            mySummary:"ABCD",
            myDescription:"my Description 3",
            myPriority:"medium",
            myDate:"2004-02-22",
            timeStamp: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
        }
        ],
        editedRow:{
        },
        taskIdVal:3,
    },
    modalReducer: {
        showModal:false
    },

};