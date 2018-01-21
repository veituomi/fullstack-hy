import React from 'react'
import styles from './styles.css'

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.message = props.message
  }

  render = () =>
    <div className="notification">
      {this.message}
    </div>
}

export default Notification
