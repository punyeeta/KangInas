import Mark from "../../assets/Mark.png"
import Roxanne from "../../assets/Roxanne.png"
import Rhenel from "../../assets/Rhenel.png"

interface MemberCardProps {
  image: string; 
  name: string;
  title: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ image, name, title }) => {
  return (
    <div className="flex flex-col items-center text-center w-62">
      <div className="w-48 h-48 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-[#32347C] text-xl font-semibold mb-1">{name}</h3>
      <p className="text-[#525252] text-base">{title}</p>
    </div>
  );
}

const Team = () => {
  return (
    <section className="bg-[#f6f6f6] py-10 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-[#32347C] text-center mb-12">Meet the Team</h2>
        
        <div className="flex flex-col items-center gap-4 p-4 md:p-8 md:flex-row md:items-baseline md:justify-around md:gap-5">
          <MemberCard 
            image={Mark} 
            name="Mark Vincent Limpahan" 
            title="UI/UX Designer" 
          />
          <MemberCard 
            image={Roxanne} 
            name="Roxanne Locsin" 
            title="Front-end Developer" 
          />
          <MemberCard 
            image={Rhenel} 
            name="Rhenel Jhon Sajol" 
            title="Back-end Developer" 
          />
        </div>
      </div>
    </section>
  )
}

export default Team