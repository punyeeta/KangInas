import logoRed from '../../assets/LogoRed.svg'

interface LogoRedProps {
  className?: string;
}

const LogoRed: React.FC<LogoRedProps> = ({ className }) => {
  return (
    <img src={logoRed} className={className}/>
  )
}

export default LogoRed