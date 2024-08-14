import PropTypes from 'prop-types';

const Button = ({
  children,
  type = "button",
  bgColor = "",
  textColor = "",
  className = "",
  ...props
})=> {
  return (
    <button className={` ${bgColor} ${textColor} ${className}`} type={type} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};


export default Button