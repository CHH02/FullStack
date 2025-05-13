const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='successful-operation'>
        {message}
      </div>
    )
}

export default Notification