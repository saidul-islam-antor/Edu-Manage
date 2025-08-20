import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const EduManageExtraSections = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  const successStories = [
    {
      text: "Thanks to EduManage, I aced my CSE final exams! The classes and assignments helped me practice a lot.",
      author: "Arif Hossain, CSE Student",
    },
    {
      text: "The teachers here are so supportive and knowledgeable. I feel confident about my digital marketing skills now.",
      author: "Sumaiya Akter, Digital Marketing Learner",
    },
    {
      text: "Easy to use platform and helpful feedback from teachers made my learning journey smooth.",
      author: "Rakib Hasan, Graphic Designer Student",
    },
  ];

  const featuredCourses = [
    {
      title: "Full Stack Web Development",
      desc: "Learn frontend and backend development with hands-on projects.",
      category: "Web Development",
    },
    {
      title: "Digital Marketing Masterclass",
      desc: "Master social media, SEO, and advertising strategies.",
      category: "Digital Marketing",
    },
    {
      title: "Graphic Design Basics",
      desc: "Get started with Photoshop, Illustrator and creative design principles.",
      category: "Graphic Design",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20 ">

      {/* Student Success Stories */}
      <section
        className="bg-base-100 rounded-lg p-10 shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-extrabold text-indigo-900 mb-8 text-center">
          Student Success Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map(({ text, author }, i) => (
            <div
              key={i}
              className="bg-base-300 p-6 rounded-lg shadow cursor-default"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <p className="text-base-content mb-4 italic">"{text}"</p>
              <h4 className="font-semibold text-indigo-800">— {author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section
        className="bg-base-100 rounded-lg p-10 shadow-lg border border-indigo-200"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-extrabold text-primary mb-10 text-center">
          Featured Courses
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredCourses.map(({ title, desc, category }, i) => (
            <div
              key={i}
              className="border rounded-lg p-5 cursor-pointer hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
              <p className="text-base-content mb-4">{desc}</p>
              <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default EduManageExtraSections;
