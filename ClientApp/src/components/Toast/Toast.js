import React, {useState, useEffect} from 'react';
import './Toast.css';
import PropTypes from 'prop-types';

const Toast = (props) =>{
    Toast.defaultProps={
        position:'bottom-right'
    }
    Toast.propTypes = {
        toastList: PropTypes.array.isRequired,
        position: PropTypes.string,
        autoDelete: PropTypes.bool,
        autoDeleteTime: PropTypes.number
    }
    const {toastList, position, autoDelete, autoDeleteTime } = props;
    const[list, setList] = useState(toastList);
    useEffect (()=>{
        setList(toastList);
    },[toastList]);
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(autoDelete && toastList.length && list.length){
                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);
        return () =>{
            clearInterval(interval);
        }
    },[toastList, autoDelete, autoDeleteTime, list]);

    const deleteToast = id =>{
        const index = list.findIndex(e=>e.id===id);
        list.splice(index,1);
        setList([...list]);
    }

    return(
        
        <div className={`notification-container ${position}`}>
            {
            list.map((toast, i)=>
            <div key={i} 
                className={`notification toast ${position}`}
                style={{backgroundColor: toast.backgroundColor}}
                >
                <button
                onClick={()=> deleteToast(toast.id)}>X</button>
                <div className="notification-image">
                    <img src={toast.icon} alt=""/>
                </div>
                <div>
                    <p className="notification-title">{toast.title}</p>
                    <p className="notification-message">{toast.description}</p>
                </div>
            </div>
                )
            }
        </div>
        
    );
}

export default Toast;