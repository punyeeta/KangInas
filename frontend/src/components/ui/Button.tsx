

interface ButtonProps {
    text: string;
    className?: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ text, className = "" }) => {
    const baseStyle = "px-4 py-2 rounded cursor-pointer";
  
    return <button className={`${className} ${baseStyle}`}>{text}</button>;
  };
  
  export default Button;
  