"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import LandingLayout from "../components/layout/LandingLayout";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules"; // Import modules
import Cookies from "js-cookie";
import {
  Favorite,
  PlaceOutlined,
  PlayCircle,
  Search,
  Shield,
} from "@mui/icons-material";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get token and user from cookies
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // useEffect(() => {
  //   if (!loading && user) {
  //     router.push(`/${user.roles[0]}/dashboard`)
  //   }
  // }, [user, loading, router])
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="hero-bg flex items-center pt-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
            <div className="lg:w-1/2 text-center lg:text-left relative">
              <svg
                className="absolute -top-20 -left-4  text-yellow-5 text-orange-40000 transform rotate-12 hero-shap"
                width="114"
                height="187"
                viewBox="0 0 114 187"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M93.12 0.783896C83.5913 4.17035 78.896 17.1554 76.2838 26.101C74.2083 33.4898 72.596 40.9793 71.5482 48.5039C67.8399 44.6126 64.2859 40.7549 60.5776 36.8636C56.7102 32.6734 52.9396 28.1518 48.1159 24.9867C44.6912 22.6549 40.3009 20.8175 35.8073 21.8649C30.8551 23.0768 27.1407 27.6417 24.7054 32.0447C10.8811 56.6083 36.9681 79.4704 54.5523 88.1464C59.2077 90.482 64.008 92.3206 68.9583 93.9276C67.0366 95.4471 65.1148 96.9666 63.193 98.4862C48.5239 109.915 33.6957 121.045 21.7992 135.633C10.2506 149.592 0.764874 167.172 0.00405858 185.243C-0.108606 187.597 2.15644 185.183 2.80853 184.355C4.21408 182.636 6.20942 179.458 6.32208 177.104C7.17037 158.172 18.6382 142.521 32.3623 129.829C45.734 117.5 60.8365 107.399 74.5746 95.5034C82.4055 97.6497 90.4344 99.3987 98.3091 101.114C100.934 101.686 105.469 91.2207 104.18 90.852C97.6949 89.4393 90.9541 88.059 84.257 86.2477C84.6096 85.884 84.9621 85.5204 85.3147 85.1566C97.7505 72.0959 108.278 55.4478 112.176 37.884C114.078 29.4004 114.326 20.1159 111.523 12.2811C108.98 4.67927 101.935 -2.40577 93.12 0.783896ZM27.7358 32.3525C27.586 32.5841 27.4363 32.8158 27.2865 33.0475C27.3832 32.7162 27.48 32.3849 27.7358 32.3525ZM107.357 34.9841C107.235 42.7105 105.116 50.5301 101.651 57.6161C96.4019 68.2782 88.3511 77.0081 79.6686 84.8077C59.6212 78.943 40.6427 69.699 30.9709 50.2365C29.694 47.5797 28.5714 44.9565 27.8544 42.0692C27.7391 41.3393 26.9803 36.0643 27.1944 33.6441C27.7497 33.1484 28.3097 32.918 28.971 32.6215C30.3951 31.9626 31.8769 31.6688 33.2619 31.7062C35.6217 31.7798 37.894 32.7152 39.9636 33.7827C45.3472 36.7175 49.3783 41.4719 53.5061 45.8952C59.0951 51.7819 64.5828 57.7347 70.1718 63.6214C71.5316 65.151 76.1857 55.6811 76.2155 54.4541C76.8596 44.375 78.3242 34.2982 80.8166 24.3574C81.7747 20.5135 82.4355 14.3143 85.9842 12.0039C89.6343 9.6274 94.257 10.1058 97.5712 11.973C105.281 15.9429 107.464 26.4619 107.357 34.9841Z"
                  fill="#EEB012"
                />
              </svg>
              <h1 className="hero-title  mt-0">
                Helping <span>people</span> changing lives.
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 pt-2">
                Show love and care, supporting the children in their journey
                kindness and compassion.
              </p>

              <div className="pt-6 flex gap-4 flex-wrap items-center">
                <button className="theme-btn-primary">START A PAGE</button>
                <button className="theme-btn-white">
                  <Search /> FIND A PAGE
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 w-full max-w-md lg:max-w-none relative">
              <div className="text-right">
                <img
                  className="w-full max-w-[400px] ml-auto"
                  src="/assets/img/hero-img-2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORK Section */}

      <section className="py-16 relative process-section">
        <div className="container mx-auto">
          <div className="max-w-[1145px] mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="title mt-0  text-center">HOW IT WORK</h1>
              <p className="mt-4 text-lg text-gray-700">
                Powerful tools to organize and coordinate community support
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-16 items-center justify-between flex-wrap">
              <div className="bg-orange-100 itWork relative py-8 px-3 rounded-xl border border-orange-500 transition duration-300 hover:shadow-lg space-y-8 text-center item">
                <span className="border border-orange-500 bg-orange-500">
                  01
                </span>
                <div className="icon text-orange-500 mt-0">
                  {/* <img src="/assets/img/perm_phone_msg.svg" alt="" /> */}
                  <svg
                    width="56"
                    height="52"
                    viewBox="0 0 56 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.75 28.4423V2.84423C27.75 2.03836 28.0455 1.36286 28.6365 0.817715C29.2274 0.272572 29.9597 0 30.8333 0H52.4167C53.2903 0 54.0226 0.272572 54.6135 0.817715C55.2045 1.36286 55.5 2.03836 55.5 2.84423V17.0654C55.5 17.8712 55.2045 18.5467 54.6135 19.0919C54.0226 19.637 53.2903 19.9096 52.4167 19.9096H37L27.75 28.4423ZM33.9167 14.2211H49.3333V5.68845H33.9167V14.2211ZM52.2625 51.1961C45.8389 51.1961 39.4924 49.9043 33.2229 47.3208C26.9535 44.7373 21.2493 41.0754 16.1104 36.335C10.9715 31.5946 7.00174 26.3328 4.20104 20.5495C1.40035 14.7663 0 8.91191 0 2.98644C0 2.13317 0.308333 1.42211 0.925 0.853268C1.54167 0.284423 2.3125 0 3.2375 0H15.725C16.4444 0 17.0868 0.225168 17.6521 0.675504C18.2174 1.12584 18.5514 1.65913 18.6542 2.27538L20.6583 12.2302C20.7611 12.9886 20.7354 13.6286 20.5812 14.15C20.4271 14.6715 20.1444 15.1218 19.7333 15.501L12.2563 22.4694C13.284 24.2233 14.5045 25.918 15.9177 27.5534C17.3309 29.1889 18.8854 30.765 20.5812 32.282C22.1743 33.7515 23.8444 35.1143 25.5917 36.3705C27.3389 37.6267 29.1889 38.7763 31.1417 39.8192L38.3875 33.1352C38.85 32.7086 39.4538 32.3886 40.199 32.1753C40.9441 31.962 41.6764 31.9027 42.3958 31.9975L53.0333 33.9885C53.7528 34.1781 54.3437 34.5218 54.8062 35.0195C55.2687 35.5173 55.5 36.0743 55.5 36.6905V48.2096C55.5 49.0629 55.1917 49.774 54.575 50.3428C53.9583 50.9116 53.1875 51.1961 52.2625 51.1961ZM9.32708 17.0654L14.4146 12.3724L13.1042 5.68845H6.24375C6.50069 7.63201 6.86042 9.55186 7.32292 11.448C7.78542 13.3442 8.45347 15.2166 9.32708 17.0654ZM36.9229 42.5212C38.9271 43.327 40.9698 43.967 43.051 44.441C45.1323 44.9151 47.2264 45.2232 49.3333 45.3654V39.1081L42.0875 37.7571L36.9229 42.5212Z"
                      fill="currentColor"
                    />
                    {/* <defs>
                    <linearGradient
                      id="paint0_linear_1_303"
                      x1="0"
                      y1="25.598"
                      x2="18.7639"
                      y2="25.5824"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3D7AE5" />
                      <stop offset="1" stop-color="#008E50" />
                    </linearGradient>
                  </defs> */}
                  </svg>
                </div>
                <h2>Create Support</h2>
                <div className="shape">
                  <img
                    className="animation1 ani1"
                    src="/assets/img/arrow.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="item bg-green-100 itWork relative py-8 px-3 rounded-xl border border-green-500 transition duration-300 hover:shadow-lg space-y-8 text-center item">
                <span className="bg-green-500 border border-green-500">02</span>
                <div className="icon text-green-500">
                  <svg
                    width="55"
                    height="57"
                    viewBox="0 0 55 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.08333 56.1158C4.41042 56.1158 2.9783 55.5663 1.78698 54.4674C0.59566 53.3685 0 52.0474 0 50.5042V11.2232C0 9.67998 0.59566 8.35892 1.78698 7.25998C2.9783 6.16105 4.41042 5.61158 6.08333 5.61158H18.8583C19.5174 3.92811 20.62 2.57197 22.1661 1.54318C23.7123 0.514395 25.4486 0 27.375 0C29.3014 0 31.0377 0.514395 32.5839 1.54318C34.13 2.57197 35.2326 3.92811 35.8917 5.61158H48.6667C50.3396 5.61158 51.7717 6.16105 52.963 7.25998C54.1543 8.35892 54.75 9.67998 54.75 11.2232V50.5042C54.75 52.0474 54.1543 53.3685 52.963 54.4674C51.7717 55.5663 50.3396 56.1158 48.6667 56.1158H6.08333ZM6.08333 50.5042H48.6667V11.2232H6.08333V50.5042ZM12.1667 44.8926H33.4583V39.2811H12.1667V44.8926ZM12.1667 33.6695H42.5833V28.0579H12.1667V33.6695ZM12.1667 22.4463H42.5833V16.8347H12.1667V22.4463ZM27.375 9.11882C28.034 9.11882 28.579 8.92007 29.0099 8.52259C29.4408 8.1251 29.6562 7.6224 29.6562 7.01447C29.6562 6.40655 29.4408 5.90385 29.0099 5.50636C28.579 5.10888 28.034 4.91013 27.375 4.91013C26.716 4.91013 26.171 5.10888 25.7401 5.50636C25.3092 5.90385 25.0938 6.40655 25.0938 7.01447C25.0938 7.6224 25.3092 8.1251 25.7401 8.52259C26.171 8.92007 26.716 9.11882 27.375 9.11882Z"
                      fill="currentColor"
                    />
                    {/* <defs>
                    <linearGradient
                      id="paint0_linear_1_276"
                      x1="0"
                      y1="28.0579"
                      x2="18.5103"
                      y2="28.044"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3D7AE5" />
                      <stop offset="1" stop-color="#008E50" />
                    </linearGradient>
                  </defs> */}
                  </svg>
                </div>
                <h2>List Tasks & Needs</h2>
                <div className="shape">
                  <img
                    className="animation1 ani2"
                    src="/assets/img/arrow.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="item bg-blue-100 itWork relative py-8 px-3 rounded-xl border border-blue-500 transition duration-300 hover:shadow-lg space-y-8 text-center item">
                <span className="border border-blue-500 bg-blue-500">03</span>
                <div className="icon text-blue-500">
                  {/* <img src="/assets/img/groups.svg" alt="" /> */}

                  <svg
                    width="87"
                    height="41"
                    viewBox="0 0 87 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 40.1266V34.86C0 32.4636 1.32917 30.513 3.9875 29.0082C6.64583 27.5035 10.15 26.7511 14.5 26.7511C15.2854 26.7511 16.0406 26.765 16.7656 26.7929C17.4906 26.8208 18.1854 26.8904 18.85 27.0019C18.0042 28.1722 17.3698 29.3983 16.9469 30.6802C16.524 31.962 16.3125 33.2995 16.3125 34.6928V40.1266H0ZM21.75 40.1266V34.6928C21.75 32.9094 22.2786 31.2793 23.3359 29.8024C24.3932 28.3255 25.8885 27.0298 27.8219 25.9151C29.7552 24.8005 32.0661 23.9645 34.7547 23.4072C37.4432 22.8499 40.3583 22.5712 43.5 22.5712C46.7021 22.5712 49.6474 22.8499 52.3359 23.4072C55.0245 23.9645 57.3354 24.8005 59.2688 25.9151C61.2021 27.0298 62.6823 28.3255 63.7094 29.8024C64.7365 31.2793 65.25 32.9094 65.25 34.6928V40.1266H21.75ZM70.6875 40.1266V34.6928C70.6875 33.2438 70.4911 31.8784 70.0984 30.5966C69.7057 29.3147 69.1167 28.1165 68.3313 27.0019C68.9958 26.8904 69.6755 26.8208 70.3703 26.7929C71.0651 26.765 71.775 26.7511 72.5 26.7511C76.85 26.7511 80.3542 27.4895 83.0125 28.9664C85.6708 30.4433 87 32.4078 87 34.86V40.1266H70.6875ZM29.4531 33.4389H57.6375C57.0333 32.3242 55.3568 31.3489 52.6078 30.513C49.8589 29.677 46.8229 29.259 43.5 29.259C40.1771 29.259 37.1411 29.677 34.3922 30.513C31.6432 31.3489 29.9969 32.3242 29.4531 33.4389ZM14.5 23.4072C12.5063 23.4072 10.7995 22.7524 9.37969 21.4427C7.9599 20.133 7.25 18.5586 7.25 16.7194C7.25 14.8246 7.9599 13.2362 9.37969 11.9544C10.7995 10.6726 12.5063 10.0317 14.5 10.0317C16.5542 10.0317 18.276 10.6726 19.6656 11.9544C21.0552 13.2362 21.75 14.8246 21.75 16.7194C21.75 18.5586 21.0552 20.133 19.6656 21.4427C18.276 22.7524 16.5542 23.4072 14.5 23.4072ZM72.5 23.4072C70.5062 23.4072 68.7995 22.7524 67.3797 21.4427C65.9599 20.133 65.25 18.5586 65.25 16.7194C65.25 14.8246 65.9599 13.2362 67.3797 11.9544C68.7995 10.6726 70.5062 10.0317 72.5 10.0317C74.5542 10.0317 76.276 10.6726 77.6656 11.9544C79.0552 13.2362 79.75 14.8246 79.75 16.7194C79.75 18.5586 79.0552 20.133 77.6656 21.4427C76.276 22.7524 74.5542 23.4072 72.5 23.4072ZM43.5 20.0633C40.4792 20.0633 37.9115 19.088 35.7969 17.1374C33.6823 15.1868 32.625 12.8182 32.625 10.0317C32.625 7.18936 33.6823 4.80684 35.7969 2.8841C37.9115 0.961367 40.4792 0 43.5 0C46.5812 0 49.1641 0.961367 51.2484 2.8841C53.3328 4.80684 54.375 7.18936 54.375 10.0317C54.375 12.8182 53.3328 15.1868 51.2484 17.1374C49.1641 19.088 46.5812 20.0633 43.5 20.0633ZM43.5 13.3755C44.5271 13.3755 45.388 13.0551 46.0828 12.4142C46.7776 11.7733 47.125 10.9791 47.125 10.0317C47.125 9.08423 46.7776 8.29005 46.0828 7.64914C45.388 7.00823 44.5271 6.68777 43.5 6.68777C42.4729 6.68777 41.612 7.00823 40.9172 7.64914C40.2224 8.29005 39.875 9.08423 39.875 10.0317C39.875 10.9791 40.2224 11.7733 40.9172 12.4142C41.612 13.0551 42.4729 13.3755 43.5 13.3755Z"
                      fill="currentColor"
                    />
                    {/* <defs>
                    <linearGradient
                      id="paint0_linear_1_279"
                      x1="0"
                      y1="20.0633"
                      x2="29.4135"
                      y2="20.0143"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3D7AE5" />
                      <stop offset="1" stop-color="#008E50" />
                    </linearGradient>
                  </defs> */}
                  </svg>
                </div>
                <h2>Invite Community</h2>
                <div className="shape">
                  <img
                    className="animation1 ani3"
                    src="/assets/img/arrow.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="item bg-sky-100 itWork relative py-8 px-3 rounded-xl border border-sky-500 transition duration-300 hover:shadow-lg space-y-8 text-center item">
                <span className="border border-sky-500 bg-sky-500 ">04</span>
                <div className="icon text-sky-500">
                  {/* <img src="/assets/img/blind.svg" alt="" /> */}
                  <svg
                    width="61"
                    height="69"
                    viewBox="0 0 61 69"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.91667 68.5881L1.38333 64.7599L10.375 53.6742V36.6867C10.375 35.0384 10.5335 33.2174 10.8505 31.2235C11.1675 29.2297 11.5854 27.4352 12.1042 25.8402L6.91667 28.5518V39.8768H0V24.8831L18.675 15.0734C19.1361 14.8076 19.626 14.6215 20.1448 14.5152C20.6635 14.4088 21.2111 14.3557 21.7875 14.3557C23.1708 14.3557 24.4389 14.6747 25.5917 15.3127C26.7444 15.9507 27.609 16.828 28.1854 17.9446L30.8656 23.2881C32.0184 25.6275 33.7764 27.3821 36.1396 28.5518C38.5028 29.7215 41.4424 30.3064 44.9583 30.3064V36.6867H41.5865L60.5208 67.1525L57.4948 68.7476L37.0042 35.8094C34.6986 35.1182 32.6092 34.1213 30.7359 32.8186C28.8627 31.516 27.2632 29.9342 25.9375 28.0733C25.3611 29.6152 24.9144 31.383 24.5974 33.3769C24.2804 35.3707 24.1795 37.2184 24.2948 38.9198L31.125 47.8522V68.5881H24.2083V52.6374L18.0698 44.5025L17.2917 55.8275L6.91667 68.5881ZM25.9375 12.7606C24.0354 12.7606 22.4071 12.1358 21.0526 10.8864C19.6981 9.6369 19.0208 8.13487 19.0208 6.38029C19.0208 4.62571 19.6981 3.12368 21.0526 1.87421C22.4071 0.624737 24.0354 0 25.9375 0C27.8396 0 29.4679 0.624737 30.8224 1.87421C32.1769 3.12368 32.8542 4.62571 32.8542 6.38029C32.8542 8.13487 32.1769 9.6369 30.8224 10.8864C29.4679 12.1358 27.8396 12.7606 25.9375 12.7606Z"
                      fill="currentColor"
                    />
                    {/* <defs>
                    <linearGradient
                      id="paint0_linear_1_282"
                      x1="0"
                      y1="34.3738"
                      x2="20.4613"
                      y2="34.36"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3D7AE5" />
                      <stop offset="1" stop-color="#008E50" />
                    </linearGradient>
                  </defs> */}
                  </svg>
                </div>
                <h2>Coordinate Help</h2>
                <div className="shape">
                  <img src="/assets/img/arrow.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-4">
          <img src="/assets/img/shape4.svg" alt="" />
        </div>
      </section>

      {/* about Section */}

      <section className="py-16 relative aboutSection">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
            <div className="md:w-1/2">
              <div className="about-image">
                <div className="img-1">
                  <img src="assets/img/about-1.jpg" alt="" />
                  <a href="#" className="video-btn" data-type="iframe">
                    <PlayCircle className="text-white !text-6xl" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="about-content">
                <h2>Building Brighter Futures Through Kindness.</h2>
                <h2 className="title">
                  Helping each other can make <span>world</span> better
                </h2>
                <p>
                  Helping each other creates a stronger, kinder world. We build
                  trust, spread compassion, and inspire others to do the same.
                  Together, we can overcome challenges and make lasting positive
                  changes.
                </p>

                <div className="inner-content flex gap-10 flex-col lg:flex-row">
                  <div className="inner-item md:w-1/2">
                    <div className="icon">
                      {/* <img src="/assets/img/volunteer_activism.svg" alt="" /> */}
                      <Favorite className="text-orange-500 !text-4xl" />
                    </div>
                    <div className="content">
                      <h4>Trusted organization</h4>
                      <span>
                        A trusted and reliable organization dedicated to making
                        real, positive change.
                      </span>
                    </div>
                  </div>
                  <div className="inner-item md:w-1/2">
                    <div className="icon">
                      {/* <img src="/assets/img/rewarded_ads.svg" alt="" /> */}
                      <Shield className="text-primary !text-4xl" />
                    </div>
                    <div className="content">
                      <h4>Awarded services</h4>
                      <span>
                        We are known for its awarded services, recognized for
                        impactful solutions.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="about-btn">
                  <a
                    href="#"
                    className="theme-btn-primary min-w-52 text-orange-4002"
                  >
                    About Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/img/shape1.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="assets/img/shape3.svg" alt="" />
        </div>
        <div className="shape-6">
          <img src="assets/img/shape6.svg" alt="" />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="max-w-[1145px] mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="title">Everything You Need</h2>
              <p className="mt-4 text-lg text-gray-700">
                Powerful tools to organize and coordinate community support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md transition duration-300 hover:shadow-lg space-y-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="iconBox text-rose-500">
                    <svg
                      width="40"
                      height="45"
                      viewBox="0 0 40 45"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.41667 44.1667C3.20208 44.1667 2.16233 43.7342 1.2974 42.8693C0.432465 42.0043 0 40.9646 0 39.75V8.83333C0 7.61875 0.432465 6.57899 1.2974 5.71406C2.16233 4.84913 3.20208 4.41667 4.41667 4.41667H6.625V0H11.0417V4.41667H28.7083V0H33.125V4.41667H35.3333C36.5479 4.41667 37.5877 4.84913 38.4526 5.71406C39.3175 6.57899 39.75 7.61875 39.75 8.83333V39.75C39.75 40.9646 39.3175 42.0043 38.4526 42.8693C37.5877 43.7342 36.5479 44.1667 35.3333 44.1667H4.41667ZM4.41667 39.75H35.3333V17.6667H4.41667V39.75ZM4.41667 13.25H35.3333V8.83333H4.41667V13.25ZM19.875 26.5C19.2493 26.5 18.7248 26.2884 18.3016 25.8651C17.8783 25.4418 17.6667 24.9174 17.6667 24.2917C17.6667 23.666 17.8783 23.1415 18.3016 22.7182C18.7248 22.295 19.2493 22.0833 19.875 22.0833C20.5007 22.0833 21.0252 22.295 21.4484 22.7182C21.8717 23.1415 22.0833 23.666 22.0833 24.2917C22.0833 24.9174 21.8717 25.4418 21.4484 25.8651C21.0252 26.2884 20.5007 26.5 19.875 26.5ZM11.0417 26.5C10.416 26.5 9.89149 26.2884 9.46823 25.8651C9.04496 25.4418 8.83333 24.9174 8.83333 24.2917C8.83333 23.666 9.04496 23.1415 9.46823 22.7182C9.89149 22.295 10.416 22.0833 11.0417 22.0833C11.6674 22.0833 12.1918 22.295 12.6151 22.7182C13.0384 23.1415 13.25 23.666 13.25 24.2917C13.25 24.9174 13.0384 25.4418 12.6151 25.8651C12.1918 26.2884 11.6674 26.5 11.0417 26.5ZM28.7083 26.5C28.0826 26.5 27.5582 26.2884 27.1349 25.8651C26.7116 25.4418 26.5 24.9174 26.5 24.2917C26.5 23.666 26.7116 23.1415 27.1349 22.7182C27.5582 22.295 28.0826 22.0833 28.7083 22.0833C29.334 22.0833 29.8585 22.295 30.2818 22.7182C30.705 23.1415 30.9167 23.666 30.9167 24.2917C30.9167 24.9174 30.705 25.4418 30.2818 25.8651C29.8585 26.2884 29.334 26.5 28.7083 26.5ZM19.875 35.3333C19.2493 35.3333 18.7248 35.1217 18.3016 34.6984C17.8783 34.2752 17.6667 33.7507 17.6667 33.125C17.6667 32.4993 17.8783 31.9748 18.3016 31.5516C18.7248 31.1283 19.2493 30.9167 19.875 30.9167C20.5007 30.9167 21.0252 31.1283 21.4484 31.5516C21.8717 31.9748 22.0833 32.4993 22.0833 33.125C22.0833 33.7507 21.8717 34.2752 21.4484 34.6984C21.0252 35.1217 20.5007 35.3333 19.875 35.3333ZM11.0417 35.3333C10.416 35.3333 9.89149 35.1217 9.46823 34.6984C9.04496 34.2752 8.83333 33.7507 8.83333 33.125C8.83333 32.4993 9.04496 31.9748 9.46823 31.5516C9.89149 31.1283 10.416 30.9167 11.0417 30.9167C11.6674 30.9167 12.1918 31.1283 12.6151 31.5516C13.0384 31.9748 13.25 32.4993 13.25 33.125C13.25 33.7507 13.0384 34.2752 12.6151 34.6984C12.1918 35.1217 11.6674 35.3333 11.0417 35.3333ZM28.7083 35.3333C28.0826 35.3333 27.5582 35.1217 27.1349 34.6984C26.7116 34.2752 26.5 33.7507 26.5 33.125C26.5 32.4993 26.7116 31.9748 27.1349 31.5516C27.5582 31.1283 28.0826 30.9167 28.7083 30.9167C29.334 30.9167 29.8585 31.1283 30.2818 31.5516C30.705 31.9748 30.9167 32.4993 30.9167 33.125C30.9167 33.7507 30.705 34.2752 30.2818 34.6984C29.8585 35.1217 29.334 35.3333 28.7083 35.3333Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Care Calendar
                </h3>
                <p className="text-base text-gray-600">
                  Set up a page for someone in need with their story and
                  speccing
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition duration-300 hover:shadow-lg space-y-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="iconBox text-emerald-500">
                    <svg
                      width="45"
                      height="43"
                      viewBox="0 0 45 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 33.75V38.25H40.5V33.75H4.5ZM4.5 9H9.45C9.2625 8.6625 9.14062 8.30625 9.08437 7.93125C9.02812 7.55625 9 7.1625 9 6.75C9 4.875 9.65625 3.28125 10.9688 1.96875C12.2812 0.65625 13.875 0 15.75 0C16.875 0 17.9156 0.290625 18.8719 0.871875C19.8281 1.45312 20.6625 2.175 21.375 3.0375L22.5 4.5L23.625 3.0375C24.3 2.1375 25.125 1.40625 26.1 0.84375C27.075 0.28125 28.125 0 29.25 0C31.125 0 32.7188 0.65625 34.0312 1.96875C35.3438 3.28125 36 4.875 36 6.75C36 7.1625 35.9719 7.55625 35.9156 7.93125C35.8594 8.30625 35.7375 8.6625 35.55 9H40.5C41.7375 9 42.7969 9.44063 43.6781 10.3219C44.5594 11.2031 45 12.2625 45 13.5V38.25C45 39.4875 44.5594 40.5469 43.6781 41.4281C42.7969 42.3094 41.7375 42.75 40.5 42.75H4.5C3.2625 42.75 2.20312 42.3094 1.32188 41.4281C0.440625 40.5469 0 39.4875 0 38.25V13.5C0 12.2625 0.440625 11.2031 1.32188 10.3219C2.20312 9.44063 3.2625 9 4.5 9ZM4.5 27H40.5V13.5H29.025L33.75 19.9125L30.15 22.5L22.5 12.15L14.85 22.5L11.25 19.9125L15.8625 13.5H4.5V27ZM15.75 9C16.3875 9 16.9219 8.78438 17.3531 8.35313C17.7844 7.92188 18 7.3875 18 6.75C18 6.1125 17.7844 5.57813 17.3531 5.14688C16.9219 4.71563 16.3875 4.5 15.75 4.5C15.1125 4.5 14.5781 4.71563 14.1469 5.14688C13.7156 5.57813 13.5 6.1125 13.5 6.75C13.5 7.3875 13.7156 7.92188 14.1469 8.35313C14.5781 8.78438 15.1125 9 15.75 9ZM29.25 9C29.8875 9 30.4219 8.78438 30.8531 8.35313C31.2844 7.92188 31.5 7.3875 31.5 6.75C31.5 6.1125 31.2844 5.57813 30.8531 5.14688C30.4219 4.71563 29.8875 4.5 29.25 4.5C28.6125 4.5 28.0781 4.71563 27.6469 5.14688C27.2156 5.57813 27 6.1125 27 6.75C27 7.3875 27.2156 7.92188 27.6469 8.35313C28.0781 8.78438 28.6125 9 29.25 9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Gift Card Wallet
                </h3>
                <p className="text-base text-gray-600">
                  Add meals, rides, childcare, errands, and other ways people
                  can help.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition duration-300 hover:shadow-lg space-y-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="iconBox text-fuchsia-500">
                    <svg
                      width="42"
                      height="40"
                      viewBox="0 0 42 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 39.375C2.71875 39.375 1.83594 39.0078 1.10156 38.2734C0.367188 37.5391 0 36.6562 0 35.625V11.25H3.75V35.625H31.875V39.375H3.75ZM24.375 23.7188L11.25 16.0312V28.125H37.5V16.0312L24.375 23.7188ZM11.25 31.875C10.2188 31.875 9.33594 31.5078 8.60156 30.7734C7.86719 30.0391 7.5 29.1562 7.5 28.125V12.1875C7.5 11.5312 7.64844 10.9063 7.94531 10.3125C8.24219 9.71875 8.6875 9.25 9.28125 8.90625L24.375 0L28.125 2.20313L11.625 11.9062L24.375 19.4062L37.0312 11.9062C37.5 11.625 37.9766 11.4922 38.4609 11.5078C38.9453 11.5234 39.4062 11.6562 39.8438 11.9062C40.2812 12.1562 40.625 12.4922 40.875 12.9141C41.125 13.3359 41.25 13.8125 41.25 14.3438V28.125C41.25 29.1562 40.8828 30.0391 40.1484 30.7734C39.4141 31.5078 38.5312 31.875 37.5 31.875H11.25ZM24.375 16.875L19.125 11.625L21.75 9L24.375 11.625L31.0313 4.96875L33.6562 7.59375L24.375 16.875Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Updates and Messages
                </h3>
                <p className="text-base text-gray-600">
                  Share with friends, family, church groups, and eighbors
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition duration-300 hover:shadow-lg space-y-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="iconBox text-amber-500">
                    <svg
                      width="48"
                      height="47"
                      viewBox="0 0 48 47"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.75 24.75L24.4125 15.6375C23.25 14.5125 22.2656 13.2656 21.4594 11.8969C20.6531 10.5281 20.25 9.0375 20.25 7.425C20.25 5.3625 20.9719 3.60938 22.4156 2.16563C23.8594 0.721875 25.6125 0 27.675 0C28.875 0 30 0.253125 31.05 0.759375C32.1 1.26562 33 1.95 33.75 2.8125C34.5 1.95 35.4 1.26562 36.45 0.759375C37.5 0.253125 38.625 0 39.825 0C41.8875 0 43.6406 0.721875 45.0844 2.16563C46.5281 3.60938 47.25 5.3625 47.25 7.425C47.25 9.0375 46.8563 10.5281 46.0688 11.8969C45.2812 13.2656 44.3063 14.5125 43.1438 15.6375L33.75 24.75ZM33.75 18.45L39.8813 12.4313C40.5938 11.7188 41.25 10.9594 41.85 10.1531C42.45 9.34688 42.75 8.4375 42.75 7.425C42.75 6.6 42.4688 5.90625 41.9062 5.34375C41.3438 4.78125 40.65 4.5 39.825 4.5C39.3 4.5 38.8031 4.60313 38.3344 4.80938C37.8656 5.01562 37.4625 5.325 37.125 5.7375L33.75 9.7875L30.375 5.7375C30.0375 5.325 29.6344 5.01562 29.1656 4.80938C28.6969 4.60313 28.2 4.5 27.675 4.5C26.85 4.5 26.1562 4.78125 25.5938 5.34375C25.0312 5.90625 24.75 6.6 24.75 7.425C24.75 8.4375 25.05 9.34688 25.65 10.1531C26.25 10.9594 26.9063 11.7188 27.6188 12.4313L33.75 18.45ZM13.5 37.125L29.1375 41.4L42.525 37.2375C42.3375 36.9 42.0656 36.6094 41.7094 36.3656C41.3531 36.1219 40.95 36 40.5 36H29.1375C28.125 36 27.3188 35.9625 26.7188 35.8875C26.1187 35.8125 25.5 35.6625 24.8625 35.4375L19.6313 33.6938L20.8688 29.3063L25.425 30.825C26.0625 31.0125 26.8125 31.1625 27.675 31.275C28.5375 31.3875 29.8125 31.4625 31.5 31.5C31.5 31.0875 31.3781 30.6938 31.1344 30.3188C30.8906 29.9438 30.6 29.7 30.2625 29.5875L17.1 24.75H13.5V37.125ZM0 45V20.25H17.1C17.3625 20.25 17.625 20.2781 17.8875 20.3344C18.15 20.3906 18.3938 20.4562 18.6188 20.5312L31.8375 25.425C33.075 25.875 34.0781 26.6625 34.8469 27.7875C35.6156 28.9125 36 30.15 36 31.5H40.5C42.375 31.5 43.9688 32.1187 45.2812 33.3563C46.5938 34.5938 47.25 36.225 47.25 38.25V40.5L29.25 46.125L13.5 41.7375V45H0ZM4.5 40.5H9V24.75H4.5V40.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Connected Fundraising
                </h3>
                <p className="text-base text-gray-600">
                  Track who's helping, send reminders, and celebrate support
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition duration-300 hover:shadow-lg space-y-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="iconBox text-lime-500">
                    <svg
                      width="45"
                      height="41"
                      viewBox="0 0 45 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.0833 40.5229L18.8813 37.6521C15.1639 34.3028 12.0906 31.4135 9.66146 28.9844C7.23229 26.5552 5.3 24.3745 3.86458 22.4422C2.42917 20.5099 1.42622 18.734 0.855729 17.1146C0.285243 15.4951 0 13.8389 0 12.1458C0 8.68611 1.15938 5.79688 3.47813 3.47813C5.79688 1.15938 8.68611 0 12.1458 0C14.0597 0 15.8816 0.404861 17.6115 1.21458C19.3413 2.02431 20.8319 3.16528 22.0833 4.6375C23.3347 3.16528 24.8253 2.02431 26.5552 1.21458C28.2851 0.404861 30.1069 0 32.0208 0C35.4806 0 38.3698 1.15938 40.6885 3.47813C43.0073 5.79688 44.1667 8.68611 44.1667 12.1458C44.1667 13.8389 43.8814 15.4951 43.3109 17.1146C42.7405 18.734 41.7375 20.5099 40.3021 22.4422C38.8667 24.3745 36.9344 26.5552 34.5052 28.9844C32.076 31.4135 29.0028 34.3028 25.2854 37.6521L22.0833 40.5229ZM22.0833 34.5604C25.6167 31.3951 28.5243 28.6807 30.8063 26.4172C33.0882 24.1536 34.8917 22.1846 36.2167 20.5099C37.5417 18.8352 38.4618 17.3446 38.9771 16.038C39.4924 14.7314 39.75 13.434 39.75 12.1458C39.75 9.9375 39.0139 8.09722 37.5417 6.625C36.0694 5.15278 34.2292 4.41667 32.0208 4.41667C30.291 4.41667 28.6899 4.90434 27.2177 5.87969C25.7455 6.85504 24.7333 8.09722 24.1813 9.60625H19.9854C19.4333 8.09722 18.4212 6.85504 16.949 5.87969C15.4767 4.90434 13.8757 4.41667 12.1458 4.41667C9.9375 4.41667 8.09722 5.15278 6.625 6.625C5.15278 8.09722 4.41667 9.9375 4.41667 12.1458C4.41667 13.434 4.67431 14.7314 5.18958 16.038C5.70486 17.3446 6.625 18.8352 7.95 20.5099C9.275 22.1846 11.0785 24.1536 13.3604 26.4172C15.6424 28.6807 18.55 31.3951 22.0833 34.5604Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Wishlist</h3>
                <p className="text-base text-gray-600">
                  Track who's helping, send reminders, and celebrate support
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition duration-300 hover:shadow-lg space-y-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="iconBox  text-pink-500">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.875 22.0833V2.20833C19.875 1.58264 20.0866 1.05816 20.5099 0.634896C20.9332 0.211632 21.4576 0 22.0833 0H37.5417C38.1674 0 38.6918 0.211632 39.1151 0.634896C39.5384 1.05816 39.75 1.58264 39.75 2.20833V13.25C39.75 13.8757 39.5384 14.4002 39.1151 14.8234C38.6918 15.2467 38.1674 15.4583 37.5417 15.4583H26.5L19.875 22.0833ZM24.2917 11.0417H35.3333V4.41667H24.2917V11.0417ZM37.4313 39.75C32.8306 39.75 28.2851 38.747 23.7948 36.7411C19.3045 34.7352 15.2191 31.892 11.5385 28.2115C7.85799 24.5309 5.01476 20.4455 3.00885 15.9552C1.00295 11.4649 0 6.91944 0 2.31875C0 1.65625 0.220833 1.10417 0.6625 0.6625C1.10417 0.220833 1.65625 0 2.31875 0H11.2625C11.7778 0 12.2378 0.174826 12.6427 0.524479C13.0476 0.874132 13.2868 1.28819 13.3604 1.76667L14.7958 9.49583C14.8694 10.0847 14.851 10.5816 14.7406 10.9865C14.6302 11.3913 14.4278 11.741 14.1333 12.0354L8.77812 17.4458C9.51424 18.8076 10.3884 20.1234 11.4005 21.3932C12.4127 22.663 13.526 23.8868 14.7406 25.0646C15.8816 26.2056 17.0778 27.2637 18.3292 28.2391C19.5806 29.2144 20.9056 30.1069 22.3042 30.9167L27.4937 25.7271C27.825 25.3958 28.2575 25.1474 28.7911 24.9818C29.3248 24.8161 29.8493 24.7701 30.3646 24.8438L37.9833 26.3896C38.4986 26.5368 38.9219 26.8036 39.2531 27.1901C39.5844 27.5766 39.75 28.009 39.75 28.4875V37.4313C39.75 38.0938 39.5292 38.6458 39.0875 39.0875C38.6458 39.5292 38.0938 39.75 37.4313 39.75ZM6.68021 13.25L10.324 9.60625L9.38542 4.41667H4.47188C4.6559 5.92569 4.91354 7.41632 5.24479 8.88854C5.57604 10.3608 6.05451 11.8146 6.68021 13.25ZM26.4448 33.0146C27.8802 33.6403 29.3432 34.1372 30.8339 34.5052C32.3245 34.8733 33.8243 35.1125 35.3333 35.2229V30.3646L30.1437 29.3156L26.4448 33.0146Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Live Chat Support
                </h3>
                <p className="text-base text-gray-600">
                  Track who's helping, send reminders, and celebrate support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 relative causes-section overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className="mb-8">
                <h2 className="title">
                  Ongoing <span>Campaigns</span> That Need You NOW
                </h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              {/* Custom Navigation Buttons */}
              <div className="flex items-center justify-end gap-6">
                <div className="sliderBtn h-16 w-16 rounded-full flex items-center justify-center border border-primary">
                  <svg
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    ></path>
                  </svg>
                </div>
                <div className="sliderBtn h-16 w-16 rounded-full flex items-center justify-center border border-primary">
                  <svg
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={4.5}
              pagination={false}
              loop={true}
              autoplay={true}
              // navigation={{
              //   prevEl: prevRef.current,
              //   nextEl: nextRef.current,
              // }}
              // onBeforeInit={(swiper) => {
              //   swiper.params.navigation.prevEl = prevRef.current;
              //   swiper.params.navigation.nextEl = nextRef.current;
              // }}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className=" bg-white shadow-md mb-3 rounded-xl overflow-hidden blog-card">
                  <div className="relative image">
                    <img
                      src="/assets/img/1.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                    <img
                      src="/assets/img/1.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="p-6 text-gray-800">
                    <h3 className="text-xl font-bold mb-2">
                      <a
                        href="causes-single.html"
                        className="hover:text-primary transition duration-300 whitespace-normal"
                      >
                        Bringing Clean Water to Rural Communities
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 whitespace-normal">
                      Our initiative provides clean water to rural communities,
                      improving health
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" bg-white shadow-md mb-3 rounded-xl overflow-hidden blog-card">
                  <div className="relative image">
                    <img
                      src="/assets/img/2.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                    <img
                      src="/assets/img/2.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="p-6 text-gray-800">
                    <h3 className="text-xl font-bold mb-2">
                      <a
                        href="causes-single.html"
                        className="hover:text-primary transition duration-300 whitespace-normal"
                      >
                        Bringing Clean Water to Rural Communities
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 whitespace-normal">
                      Our initiative provides clean water to rural communities,
                      improving health
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" bg-white shadow-md mb-3 rounded-xl overflow-hidden blog-card">
                  <div className="relative image">
                    <img
                      src="/assets/img/3.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                    <img
                      src="/assets/img/3.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="p-6 text-gray-800">
                    <h3 className="text-xl font-bold mb-2">
                      <a
                        href="causes-single.html"
                        className="hover:text-primary transition duration-300 whitespace-normal"
                      >
                        Bringing Clean Water to Rural Communities
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 whitespace-normal">
                      Our initiative provides clean water to rural communities,
                      improving health
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className=" bg-white shadow-md mb-3 rounded-xl overflow-hidden blog-card">
                  <div className="relative image">
                    <img
                      src="/assets/img/1.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                    <img
                      src="/assets/img/1.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="p-6 text-gray-800">
                    <h3 className="text-xl font-bold mb-2">
                      <a
                        href="causes-single.html"
                        className="hover:text-primary transition duration-300 whitespace-normal"
                      >
                        Bringing Clean Water to Rural Communities
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 whitespace-normal">
                      Our initiative provides clean water to rural communities,
                      improving health
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" bg-white shadow-md mb-3 rounded-xl overflow-hidden blog-card">
                  <div className="relative image">
                    <img
                      src="/assets/img/2.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                    <img
                      src="/assets/img/2.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="p-6 text-gray-800">
                    <h3 className="text-xl font-bold mb-2">
                      <a
                        href="causes-single.html"
                        className="hover:text-primary transition duration-300 whitespace-normal"
                      >
                        Bringing Clean Water to Rural Communities
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 whitespace-normal">
                      Our initiative provides clean water to rural communities,
                      improving health
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" bg-white shadow-md mb-3 rounded-xl overflow-hidden blog-card">
                  <div className="relative image">
                    <img
                      src="/assets/img/3.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                    <img
                      src="/assets/img/3.jpg"
                      alt="Image for the cause"
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="p-6 text-gray-800">
                    <h3 className="text-xl font-bold mb-2">
                      <a
                        href="causes-single.html"
                        className="hover:text-primary transition duration-300 whitespace-normal"
                      >
                        Bringing Clean Water to Rural Communities
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 whitespace-normal">
                      Our initiative provides clean water to rural communities,
                      improving health
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="shape">
          <img src="/assets/img/shape-heart-outline.svg" alt="" />
        </div>

        <div className="shape-2">
          <img src="/assets/img/bg-bottom-slider.jpg" alt="" />
        </div>
      </section>

      <section className="py-16 relative">
        <div className="container mx-auto">
          <h1 className="title text-center mb-8">
            Stories from Those Who <br></br> Make a <span>Difference</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="shadow-md bg-light-custom p-6 rounded-md testimonial-card hover:shadow-lg">
              <div className="flex items-center gap-2 text-orange-400 mb-4 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores soluta sunt non tempora quas temporibus, dignissimos
                tenetur, perferendis reprehenderit minus modi omnis provident
                pariatur voluptates numquam harum. Error ut, nostrum aliquid
                dolor accusamus sunt saepe, repudiandae atque illo labore
                facilis. Veritatis quis a nemo ratione iure inventore mollitia
                sint ad. Corporis ratione minima maxime eaque dolor et facere ea
                dolorum.
              </p>
              <hr className="my-3" />

              <div className="flex items-center gap-5 pt-3">
                <img
                  className="h-16 w-16 min-w-16 rounded-full"
                  src="/assets/img/1.jpg"
                  alt=""
                />

                <div className="">
                  <h4 className="font-nunito text-lg font-extrabold text-black">
                    Michel Jhonson
                  </h4>
                  <p>Donar</p>
                </div>
              </div>
            </div>
            <div className="shadow-md bg-light-custom p-6 rounded-md testimonial-card hover:shadow-lg">
              <div className="flex items-center gap-2 text-orange-400 mb-4 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores soluta sunt non tempora quas temporibus, dignissimos
                tenetur, perferendis reprehenderit minus modi omnis provident
                pariatur voluptates numquam harum. Error ut, nostrum aliquid
                dolor accusamus sunt saepe, repudiandae atque illo labore
                facilis. Veritatis quis a nemo ratione iure inventore mollitia
                sint ad. Corporis ratione minima maxime eaque dolor et facere ea
                dolorum.
              </p>
              <hr className="my-3" />

              <div className="flex items-center gap-5 pt-3">
                <img
                  className="h-16 w-16 min-w-16 rounded-full"
                  src="/assets/img/1.jpg"
                  alt=""
                />

                <div className="">
                  <h4 className="font-nunito text-lg font-extrabold text-black">
                    Michel Jhonson
                  </h4>
                  <p>Donar</p>
                </div>
              </div>
            </div>
            <div className="shadow-md bg-light-custom p-6 rounded-md testimonial-card hover:shadow-lg">
              <div className="flex items-center gap-2 text-orange-400 mb-4 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores soluta sunt non tempora quas temporibus, dignissimos
                tenetur, perferendis reprehenderit minus modi omnis provident
                pariatur voluptates numquam harum. Error ut, nostrum aliquid
                dolor accusamus sunt saepe, repudiandae atque illo labore
                facilis. Veritatis quis a nemo ratione iure inventore mollitia
                sint ad. Corporis ratione minima maxime eaque dolor et facere ea
                dolorum.
              </p>
              <hr className="my-3" />

              <div className="flex items-center gap-5 pt-3">
                <img
                  className="h-16 w-16 min-w-16 rounded-full"
                  src="/assets/img/1.jpg"
                  alt=""
                />

                <div className="">
                  <h4 className="font-nunito text-lg font-extrabold text-black">
                    Michel Jhonson
                  </h4>
                  <p>Donar</p>
                </div>
              </div>
            </div>
            <div className="shadow-md bg-light-custom p-6 rounded-md testimonial-card hover:shadow-lg">
              <div className="flex items-center gap-2 text-orange-400 mb-4 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                  />
                </svg>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores soluta sunt non tempora quas temporibus, dignissimos
                tenetur, perferendis reprehenderit minus modi omnis provident
                pariatur voluptates numquam harum. Error ut, nostrum aliquid
                dolor accusamus sunt saepe, repudiandae atque illo labore
                facilis. Veritatis quis a nemo ratione iure inventore mollitia
                sint ad. Corporis ratione minima maxime eaque dolor et facere ea
                dolorum.
              </p>
              <hr className="my-3" />

              <div className="flex items-center gap-5 pt-3">
                <img
                  className="h-16 w-16 min-w-16 rounded-full"
                  src="/assets/img/1.jpg"
                  alt=""
                />

                <div className="">
                  <h4 className="font-nunito text-lg font-extrabold text-black">
                    Michel Jhonson
                  </h4>
                  <p>Donar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="container mx-auto">
          <h1 className="title mb-10">Need help?</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-20">
            <div className="flex items-start">
              <div className="min-w-10 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-orange-400"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M60.44 389.17c0 .07 0 .2-.08.38.03-.12.05-.25.08-.38zM439.9 405.6a26.77 26.77 0 01-9.59-2l-56.78-20.13-.42-.17a9.88 9.88 0 00-3.91-.76 10.32 10.32 0 00-3.62.66c-1.38.52-13.81 5.19-26.85 8.77-7.07 1.94-31.68 8.27-51.43 8.27-50.48 0-97.68-19.4-132.89-54.63A183.38 183.38 0 01100.3 215.1a175.9 175.9 0 014.06-37.58c8.79-40.62 32.07-77.57 65.55-104A194.76 194.76 0 01290.3 32c52.21 0 100.86 20 137 56.18 34.16 34.27 52.88 79.33 52.73 126.87a177.86 177.86 0 01-30.3 99.15l-.19.28-.74 1c-.17.23-.34.45-.5.68l-.15.27a21.63 21.63 0 00-1.08 2.09l15.74 55.94a26.42 26.42 0 011.12 7.11 24 24 0 01-24.03 24.03z"
                  />
                  <path
                    fill="currentColor"
                    d="M299.87 425.39a15.74 15.74 0 00-10.29-8.1c-5.78-1.53-12.52-1.27-17.67-1.65a201.78 201.78 0 01-128.82-58.75A199.21 199.21 0 0186.4 244.16C85 234.42 85 232 85 232a16 16 0 00-28-10.58s-7.88 8.58-11.6 17.19a162.09 162.09 0 0011 150.06C59 393 59 395 58.42 399.5c-2.73 14.11-7.51 39-10 51.91a24 24 0 008 22.92l.46.39A24.34 24.34 0 0072 480a23.42 23.42 0 009-1.79l53.51-20.65a8.05 8.05 0 015.72 0c21.07 7.84 43 12 63.78 12a176 176 0 0074.91-16.66c5.46-2.56 14-5.34 19-11.12a15 15 0 001.95-16.39z"
                  />
                </svg>
              </div>
              <div className="">
                <h4 className="font-nunito text-black text-lg font-black">
                  Weekday Chat Support
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, atque!
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="min-w-10 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-indigo-500"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64zm-6 304a20 20 0 1120-20 20 20 0 01-20 20zm33.44-102C267.23 276.88 265 286.85 265 296a14 14 0 01-28 0c0-21.91 10.08-39.33 30.82-53.26C287.1 229.8 298 221.6 298 203.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 191.25 214 202.83 214 203a14 14 0 11-28-1.35c.11-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82C312.7 161.34 326 180.43 326 203.57c0 33.83-22.61 49.02-42.56 62.43z"
                  />
                </svg>
              </div>
              <div className="">
                <h4 className="font-nunito text-black text-lg font-black">
                  FAQs
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, atque!
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="min-w-10 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-green-600"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M439.91 112h-23.82a.09.09 0 00-.09.09V416a32 32 0 0032 32 32 32 0 0032-32V152.09A40.09 40.09 0 00439.91 112z"
                  />
                  <path
                    fill="currentColor"
                    d="M384 416V72a40 40 0 00-40-40H72a40 40 0 00-40 40v352a56 56 0 0056 56h342.85a1.14 1.14 0 001.15-1.15 1.14 1.14 0 00-.85-1.1A64.11 64.11 0 01384 416zM96 128a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16h-64a16 16 0 01-16-16zm208 272H112.45c-8.61 0-16-6.62-16.43-15.23A16 16 0 01112 368h191.55c8.61 0 16 6.62 16.43 15.23A16 16 0 01304 400zm0-64H112.45c-8.61 0-16-6.62-16.43-15.23A16 16 0 01112 304h191.55c8.61 0 16 6.62 16.43 15.23A16 16 0 01304 336zm0-64H112.45c-8.61 0-16-6.62-16.43-15.23A16 16 0 01112 240h191.55c8.61 0 16 6.62 16.43 15.23A16 16 0 01304 272zm0-64h-63.55c-8.61 0-16-6.62-16.43-15.23A16 16 0 01240 176h63.55c8.61 0 16 6.62 16.43 15.23A16 16 0 01304 208zm0-64h-63.55c-8.61 0-16-6.62-16.43-15.23A16 16 0 01240 112h63.55c8.61 0 16 6.62 16.43 15.23A16 16 0 01304 144z"
                  />
                </svg>
              </div>
              <div className="">
                <h4 className="font-nunito text-black text-lg font-black">
                  Help Center
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, atque!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
