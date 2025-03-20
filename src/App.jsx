import Canvas from "./Canvas";
import "./index.css";
import data from "./data";
import { useEffect, useState, useRef } from "react";
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
function App() {
  const growingSpan = useRef(null);
  const headingRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    
  }, []);
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);
  
  return (
    <>
      <span ref={growingSpan} className="block rounded-full growing fixed top-[-20%] left-[-20%] w-[10px] h-[10px] origin-center"></span>
      <div className="w-full relative min-h-screen font-['poppins']">
        {showCanvas && data[0].map((canvasdetails, index) => (
          <Canvas key={index} details={canvasdetails} />
          
        ))}
        <div className="w-full z-[1] h-screen relative ">
          <nav className=" top-0 left-0 w-full p-6 flex justify-between items-center z-50">
            <div className="  text-2xl font-bold">
              thirtyfivestudios
            </div>
            <ul className="flex gap-8  ">
              {["Home", "About", "Work", "Contact"].map((link, index) => (
                <li key={index} className="cursor-pointer hover:opacity-70">
                  {link}
                </li>
              ))}
            </ul>
          </nav>
         <div className="textcontainer w-full px-[20%]">
            <div className="text w-[40%]">
            <h3 className="text-4xl leading-[1.5]">At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.</h3>
            <p className="text-md w-[80%] mt-10 font-regular">We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.</p>
            <p className="text-md mt-10">Scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
          
            <h1 ref={headingRef} className="text-[16rem] font-normal tracking-tighter leading-none">Thirtyfivestudios</h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10 font-['poppins']">
      {showCanvas && data[1].map((canvasdetails, index) => (
          <Canvas key={index} details={canvasdetails} />
          
        ))}
        <h1 className="text-8xl font-semibold tracking-tighter ">About the brand</h1>
        <p className="text-3xl leading-[1.2]  mt-10">we are a team designers, developers,and strategists who are passionate about creating immersive digital experiences that are both beautiful and functional.we are a team designers, developers,and strategists who are passionate about creating immersive digital experiences that are both beautiful and functional </p>
        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />

      </div>
    </>
  );
}

export default App;
