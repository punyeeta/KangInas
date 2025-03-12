import { motion } from 'framer-motion';
import Carousel from '../../components/ui/Carousel';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

const About = () => {
  return (
    <section className="bg-[#F58E26] py-12 text-white md:mt-0.4 p-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Carousel - Now automatic */}
        <div className="w-full md:w-1/2 sm:w-2/3 lg:w-1/3 mb-6 md:mb-0 flex justify-center flex-1">
          <Carousel />
        </div>

        {/* Text and Stats */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center items-center md:items-start flex-1 md:pl-8">
          {/* Animated Heading */}
          <motion.h2
            className="text-[3em] uppercase font-bold text-white "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            We are Kangina.
          </motion.h2>

          {/* Animated Paragraph */}
          <motion.p
            className="max-w-[53ch] font-light text-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Our adventure began in a humble kitchen where we discovered that the true secret ingredient wasn't in the pantry—it was in the playful spirit of every "tarantado" who dared to break the rules. We take pride in transforming everyday ingredients into masterpieces that carry the soul of Filipino cooking, spiced up with a hint of rebellious wit.
          </motion.p>

          {/* Animated Statistics Section with Dynamic Counters */}
          <motion.div
            className="flex justify-center md:justify-start gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {/* Individual Stats with Dynamic Counting */}
            <AnimatedCounter targetValue={5432} label="active customers" delay={800} />
            <AnimatedCounter targetValue={9876} label="satisfied diners" delay={1000} />
            <AnimatedCounter targetValue={16} label="award winning" delay={1200} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;