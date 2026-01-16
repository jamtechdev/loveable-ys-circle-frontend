"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  ArrowForward,
  Check,
  CheckBox,
  CheckBoxOutlineBlank,
  Diversity1,
  Facebook,
  Favorite,
  HeadsetSharp,
  Instagram,
  LinkedIn,
  PlayArrow,
  Share,
  Twitter,
} from "@mui/icons-material";
import LandingLayout from "../../components/layout/LandingLayout";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("Tab1");

  const serviceData = [
    {
      icon: "/assets/img/icon-1.svg",
      title: "They get new home",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa pariatur unde repellendus sunt rerum debitis amet quisquam nobis atque!",
    },
    {
      icon: "/assets/img/icon-2.svg",
      title: "Veterinary Helping",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa pariatur unde repellendus sunt rerum debitis amet quisquam nobis atque!",
    },
    {
      icon: "/assets/img/icon-3.svg",
      title: "Make Pets Happy",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa pariatur unde repellendus sunt rerum debitis amet quisquam nobis atque!",
    },
    {
      icon: "/assets/img/icon-4.svg",
      title: "Medical Care",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa pariatur unde repellendus sunt rerum debitis amet quisquam nobis atque!",
    },
  ];
// change the about page
  return (
    <LandingLayout>
      <div className="relative breadcumb-area py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center relative z-10">
            <h2 className="text-xl uppercase text-white">trusted non profit</h2>
            <h3 className="title !text-white">
              <span className="text-primary">About</span> us
            </h3>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="about-section-s4 section-padding py-20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT IMAGE */}
          <div className="text-center">
            <img
              src="/assets/img/about-3.jpg"
              className="rounded-lg shadow-md mx-auto"
              alt="About"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h3 className="title">
              Helping each other can make{" "}
              <span className="text-primary">world</span> better
            </h3>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Helping each other creates a stronger, kinder world. We build
              trust, spread compassion, and inspire others to do the same.
            </p>

            {/* TABS */}
            <div className="mt-6">
              {/* TAB BUTTONS */}
              <div className="flex gap-4 border-b pb-2">
                {["Tab1", "Tab2", "Tab3"].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-semibold ${
                      activeTab === tab
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500"
                    }`}
                  >
                    {tab === "Tab1" && "Our Mission"}
                    {tab === "Tab2" && "Our Vision"}
                    {tab === "Tab3" && "Excellence"}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              {activeTab === "Tab1" && (
                <div className="mt-6 flex flex-col md:flex-row gap-8">
                  <div className="relative w-full md:w-4/12">
                    <img
                      className="w-full rounded-xl"
                      src="/assets/img/about-5.jpg"
                      alt=""
                    />
                    <a className="absolute bg-blue-600 h-12 w-12 rounded-full top-0 bottom-0 left-0 right-0 m-auto inset-0 flex items-center justify-center text-white text-3xl">
                      <PlayArrow className="!text-3xl" />
                    </a>
                  </div>

                  <ul className="space-y-3 md:w-8/12 w-full">
                    <li>
                      <Check /> People’s Growth
                    </li>
                    <li>
                      <Check /> People’s Growth Helped fund 3,265 Project
                      powerful
                    </li>
                    <li>
                      <Check />
                      Award-winning nonprofit company
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "Tab2" && (
                <div className="mt-6 flex flex-col md:flex-row gap-8">
                  <div className="relative w-full md:w-4/12">
                    <img
                      className="w-full rounded-xl"
                      src="/assets/img/about-6.jpg"
                      alt=""
                    />
                    <a className="absolute bg-blue-600 h-12 w-12 rounded-full top-0 bottom-0 left-0 right-0 m-auto inset-0 flex items-center justify-center text-white text-3xl">
                      <PlayArrow className="!text-3xl" />
                    </a>
                  </div>

                  <ul className="space-y-3 md:w-8/12 w-full">
                    <li>
                      <Check /> People’s Growth
                    </li>
                    <li>
                      <Check /> People’s Growth Helped fund 3,265 Project
                      powerful
                    </li>
                    <li>
                      <Check />
                      Award-winning nonprofit company
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "Tab3" && (
                <div className="mt-6 flex flex-col md:flex-row gap-8">
                  <div className="relative w-full md:w-4/12">
                    <img
                      className="w-full rounded-xl"
                      src="/assets/img/about-7.jpg"
                      alt=""
                    />
                    <a className="absolute bg-blue-600 h-12 w-12 rounded-full top-0 bottom-0 left-0 right-0 m-auto inset-0 flex items-center justify-center text-white text-3xl">
                      <PlayArrow className="!text-3xl" />
                    </a>
                  </div>

                  <ul className="space-y-3 md:w-8/12 w-full">
                    <li>
                      <Check /> People’s Growth
                    </li>
                    <li>
                      <Check /> People’s Growth Helped fund 3,265 Project
                      powerful
                    </li>
                    <li>
                      <Check />
                      Award-winning nonprofit company
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE SECTION WITH SWIPER */}
      <section className="service-section-s5 py-20 bg-[#F9F4F2]">
        <div className="container mx-auto mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <h2 className="title">
                Through mutual support and <span>kindness</span>.
              </h2>
            </div>

            <div className="flex justify-end">
              <a className="theme-btn px-6 py-3 bg-primary text-white rounded-md">
                All Services
              </a>
            </div>
          </div>
        </div>

        {/* SWIPER SLIDER */}
        <div className="container mx-auto">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
          >
            {serviceData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="service-card hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-300">
                  <div className="icon">
                    <img src={item.icon} alt="" className="m-auto" />
                  </div>

                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <div className="services-btn mt-5">
                    <a href="#">
                      See Details <ArrowForward />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="volunteer-section py-20">
        <div className="container mx-auto text-center mb-10">
          <span>You Can Help The Poor With Us</span>
          <h2 className="title">
            Meet the Team <span className="text-primary">Member</span>
          </h2>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <div className="text-center">
            <div className="relative teamCard">
              <img
                src={`/assets/img/team-1.jpg`}
                className="rounded-[30px] w-full h-92 object-cover"
                alt=""
              />

              <span className="h-[64px] w-[64px] absolute bottom-0 left-0 bg-blue-600 flex items-center justify-center">
                <Share className="text-white" />
              </span>
              <ul className="absolute bottom-0 left-[40px] bg-white max-w-[175px] px-[15px] opacity-0 invisible">
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Instagram />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Facebook />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <LinkedIn />
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <h3 className="font-nunito text-black font-bold text-[24px] mb-3">
                <a href="#">Volunteer</a>
              </h3>
              <span className="text-gray-500">GRAPHIC DESIGNER</span>
            </div>
          </div>
          <div className="text-center">
            <div className="relative teamCard">
              <img
                src={`/assets/img/team-4.jpg`}
                className="rounded-[30px] w-full h-92 object-cover"
                alt=""
              />

              <span className="h-[64px] w-[64px] absolute bottom-0 left-0 bg-blue-600 flex items-center justify-center">
                <Share className="text-white" />
              </span>
              <ul className="absolute bottom-0 left-[40px] bg-white max-w-[175px] px-[15px] opacity-0 invisible">
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Instagram />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Facebook />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <LinkedIn />
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <h3 className="font-nunito text-black font-bold text-[24px] mb-3">
                <a href="#">Volunteer</a>
              </h3>
              <span className="text-gray-500">GRAPHIC DESIGNER</span>
            </div>
          </div>
          <div className="text-center">
            <div className="relative teamCard">
              <img
                src={`/assets/img/team-2.jpg`}
                className="rounded-[30px] w-full h-92 object-cover"
                alt=""
              />

              <span className="h-[64px] w-[64px] absolute bottom-0 left-0 bg-blue-600 flex items-center justify-center">
                <Share className="text-white" />
              </span>
              <ul className="absolute bottom-0 left-[40px] bg-white max-w-[175px] px-[15px] opacity-0 invisible">
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Instagram />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Facebook />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <LinkedIn />
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <h3 className="font-nunito text-black font-bold text-[24px] mb-3">
                <a href="#">Volunteer</a>
              </h3>
              <span className="text-gray-500">GRAPHIC DESIGNER</span>
            </div>
          </div>
          <div className="text-center">
            <div className="relative teamCard">
              <img
                src={`/assets/img/team-3.jpg`}
                className="rounded-[30px] w-full h-92 object-cover"
                alt=""
              />

              <span className="h-[64px] w-[64px] absolute bottom-0 left-0 bg-blue-600 flex items-center justify-center">
                <Share className="text-white" />
              </span>
              <ul className="absolute bottom-0 left-[40px] bg-white max-w-[175px] px-[15px] opacity-0 invisible">
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Instagram />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Facebook />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <LinkedIn />
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <h3 className="font-nunito text-black font-bold text-[24px] mb-3">
                <a href="#">Volunteer</a>
              </h3>
              <span className="text-gray-500">GRAPHIC DESIGNER</span>
            </div>
          </div>
          <div className="text-center">
            <div className="relative teamCard">
              <img
                src={`/assets/img/team-4.jpg`}
                className="rounded-[30px] w-full h-92 object-cover"
                alt=""
              />

              <span className="h-[64px] w-[64px] absolute bottom-0 left-0 bg-blue-600 flex items-center justify-center">
                <Share className="text-white" />
              </span>
              <ul className="absolute bottom-0 left-[40px] bg-white max-w-[175px] px-[15px] opacity-0 invisible">
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Instagram />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <Facebook />
                  </a>
                </li>
                <li className="inline-block">
                  <a href="#" className="block p-[8px]">
                    <LinkedIn />
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <h3 className="font-nunito text-black font-bold text-[24px] mb-3">
                <a href="#">Volunteer</a>
              </h3>
              <span className="text-gray-500">GRAPHIC DESIGNER</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a className="theme-btn px-6 py-3 bg-primary text-white rounded-md">
            All Volunteers
          </a>
        </div>
      </section>
    </LandingLayout>
  );
}
