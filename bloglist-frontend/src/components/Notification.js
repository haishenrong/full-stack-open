import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(props.notification !== '')
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  return (
    <div>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification

/*
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirm, setConfirm] = useState(null)
const Notification = ({ confirm, message }) => {
  if (confirm === null && message === null) {
    return null
  }
  if(confirm === null) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="notif">
        {confirm}
      </div>
    )
  }
}*/