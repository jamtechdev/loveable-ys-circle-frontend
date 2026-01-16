"use client";

import { useState } from "react";

import LandingLayout from "../../components/layout/LandingLayout";
import {
  Call,
  CallOutlined,
  Email,
  EmailOutlined,
  LocationCityOutlined,
  LocationOn,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Box, Button, TextareaAutosize, TextField } from "@mui/material";

export default function ContactPage() {
  return (
    <LandingLayout>
      <div className="relative breadcumb-area py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center relative z-10">
            {/* <h2 className="text-xl uppercase text-white">trusted non profit</h2> */}
            <h3 className="title !text-white">
              <span className="text-primary">Contact</span> us
            </h3>
          </div>
        </div>
      </div>

      <section className="contactUSSection py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 xl:gap-12">
            <div className="bg-white p-[40px] shadow-md rounded-xl text-center">
              <LocationOnOutlined className="!text-[65px]" />
              <h1 className="text-black font-nunito text-3xl font-semibold mt-8">
                Address Line
              </h1>
              <p className="mt-8 text-[18px] font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum, blanditiis.
              </p>
            </div>
            <div className="bg-white p-[40px] shadow-md rounded-xl text-center">
              <CallOutlined className="!text-[65px]" />
              <h1 className="text-black font-nunito text-3xl font-semibold mt-8">
                Phone Number
              </h1>
              <p className="mt-8 text-[18px] font-medium">
                +1255 - 568 - 6523 4374-221
                <br /> +1255 - 568 - 6523
              </p>
            </div>
            <div className="bg-white p-[40px] shadow-md rounded-xl text-center">
              <EmailOutlined className="!text-[65px]" />
              <h1 className="text-black font-nunito text-3xl font-semibold mt-8">
                Address
              </h1>
              <p className="mt-8 text-[18px] font-medium">
                contact@support.com <br />
                info@supportcircle.com
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-28 gap-4 xl:gap-32">
            <div className="w-full md:w-1/2">
              <h1 className="text-black font-nunito !text-[32px] font-black">
                Get in touch
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
                perferendis molestiae eligendi.
              </p>

              <iframe
                className="w-full h-[400px] mt-10"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976314309273!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbd!4v1547528325671"
              ></iframe>
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="text-black font-nunito !text-[32px] font-black">
                Fill Up The Form
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
                perferendis molestiae eligendi.
              </p>
              <Box className="mt-10">
                <TextField
                  fullWidth
                  label="Your Name*"
                  type="email"
                  required
                  className="!mb-4"
                />
                <TextField
                  fullWidth
                  label="Email*"
                  type="email"
                  required
                  className="!mb-4"
                />

                <TextareaAutosize
                  fullwidth
                  label="details"
                  minRows={7}
                  placeholder="Enter Your Message here"
                  className="!mb-4 border w-full p-4 rounded-md"
                />

                <button className="theme-btn-primary w-full mt-5">
                  Submit
                </button>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
