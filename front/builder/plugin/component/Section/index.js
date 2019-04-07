import './index.less'
export default (props) => (
  <div className='bc-section-cont'>
    <div className='split' style={props.style ? {...props.style} : null}>
      <i />
      <span>{props.title}</span>
      <i />
    </div>
    {props.children}
  </div>
)
