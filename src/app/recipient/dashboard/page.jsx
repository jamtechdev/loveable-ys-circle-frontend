"use client";
import { useEffect, useState } from "react";
import {
  AccessTime,
  Chat,
  FavoriteBorderOutlined,
  AccessAlarm,
  CalendarMonth,
} from "@mui/icons-material";
import { Button, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { recipientService } from "../../../lib/recipient/recipientService";
import Cookies from "js-cookie";


export default function RecipientDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [helper, setHelper] = useState()
  const [taskCompleted, setTaskCompleted] = useState()
  const [volentierCount, setVolentierCount] = useState()
  const [upCominghelp, setUpCominghelp] = useState()
  // console.log(upCominghelp, "response")
  const [error, setError] = useState()
  const user = {
    name: "Recipient U",
    email: "recipient@gmail.com",
  };
     const currentUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
      const userName = currentUser.name
     //   console.log(currentUser, "currentUser");


  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await recipientService.getRecipientStats();
    //    console.log(response.data.data, "responsecc")
      setHelper(response.data.data.total_helpers)
      setTaskCompleted(response.data.data.total_tasks_completed)
      setVolentierCount(response.data.data.volunteer_hours)
    } catch (err) {
      console.error(err);
      setError("Failed to load support details");
    } finally {
      setLoading(false);
    }
  };

  const fetchupcominghelp = async () => {
    setLoading(true);
    try {
      const response = await recipientService.getUpcominghelp();

      setUpCominghelp(response.data.data)
    } catch (err) {
      console.error(err);
      setError("Failed to load support details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchupcominghelp()
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 bg-gray-100 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            👋 Welcome, {userName}
          </h1>
          <p className="text-gray-600">
            Your community is here to support you.
          </p>
        </div>
        <div className=" bg-white p-6 rounded-lg shadow-lg mb-6">
          <Typography className="!text-lg !font-semibold !mb-4">
            The Johnson Family
          </Typography>
          <div className="bg-red-100 inline-flex rounded-2xl text-red-500 text-sm px-4 py-1 mb-3">
            Cancer Treatment
          </div>

          <Typography>
            Emily is undergoing chemotherapy tissatment and neecis support
            with meas, transportation, and childcare for her thras children.
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 mb-6 mt-6">
            <div className="bg-blue-100 p-6 rounded-lg border border-blue-500 flex flex-col items-center justify-between">
              <Typography className="!text-3xl !font-bold text-blue-400 mt-1">
                {helper}
              </Typography>
              <Typography className="!text-lg !font-bold !text-gray-900 mt-1">
                Community helper
              </Typography>
            </div>

            <div className="bg-orange-100 p-6 rounded-lg border border-orange-500 flex flex-col items-center justify-between">
              <Typography className="!text-3xl !font-bold text-orange-400 mt-1">
                {taskCompleted}
              </Typography>
              <Typography className="!text-lg !font-bold !text-gray-900 mt-1">
                Task Completed
              </Typography>
            </div>

            <div className="bg-green-100 p-6 rounded-lg border border-green-500 flex flex-col items-center justify-between">
              <Typography className="!text-3xl !font-bold text-green-400 mt-1">
                {volentierCount}
              </Typography>
              <Typography className="!text-lg !font-bold !text-gray-900 mt-1">
                Volunteer hours
              </Typography>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className=" bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3">
                <div className="h-10 w-10 rounded-lg  bg-orange-100 flex items-center justify-center">
                  <CalendarMonth className="!text-orange-500" />
                </div>
                Your Upcoming Help
              </h2>
              {upCominghelp && upCominghelp.length > 0 ? (
                upCominghelp.map((item, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-2xl mb-4">
                    {/* Support Page Title and Description */}
                    <Typography className="!text-lg !font-semibold !mb-0">
                      {item.support_page?.title || "N/A"}
                    </Typography>

                    <Typography>
                      {item.support_page?.description || "No description available"}
                    </Typography>

                    {/* Calendar Events */}
                    {item.calendar && item.calendar.length > 0 ? (
                      item.calendar.map((event, eventIndex) => (
                        <div key={eventIndex} className="mt-3">
                          <div className="flex items-center gap-5 my-3">
                            <div className="flex items-center gap-2">
                              <CalendarMonth />
                              {event.scheduled_at || "N/A"}
                            </div>

                            <div className="flex items-center gap-2">
                              <AccessTime />
                              {event.duration_hours || "N/A"}
                            </div>
                          </div>

                          <div className="flex items-center bg-gray-100 px-3 py-3 rounded-2xl mb-2">
                            <div className="h-[40px] w-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-gray-400 mr-4"></div>
                            <div className="grow text-ellipsis overflow-hidden whitespace-nowrap">
                              <Typography className="text-ellipsis overflow-hidden whitespace-nowrap !font-semibold !text-[14px]">
                                {event.title || "N/A"}
                              </Typography>
                              <Typography className="text-ellipsis overflow-hidden whitespace-nowrap !text-[14px]">
                                {event.description || "No details available"}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Typography className="text-gray-500 mt-3">No calendar events available</Typography>
                    )}
                  </div>
                ))
              ) : (
                <Typography className="text-gray-500">No upcoming help available</Typography>
              )}

            </div>
            <div className=" bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3">
                <div className="h-10 w-10 rounded-lg  bg-orange-100 flex items-center justify-center">
                  <Chat className="!text-orange-500" />
                </div>
                Share an Update
              </h2>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3 border-gray-300 border-b">
                <div className="h-10 w-10 rounded-lg  bg-orange-100 flex items-center justify-center">
                  <FavoriteBorderOutlined className="!text-orange-500" />
                </div>
                Community Love
              </h2>
              <div className="grid grid-cols-3 gap-5 mt-3">
                <div className="border border-gray-100 p-4 text-center rounded-xl">
                  <Typography className="!font-semibold !text-[22px]">
                    24
                  </Typography>
                  <Typography className=" !text-[14px]">
                    People supporting you
                  </Typography>
                </div>
                <div className="border border-gray-100 p-4 text-center rounded-xl">
                  <Typography className="!font-semibold !text-[22px]">
                    18
                  </Typography>
                  <Typography className=" !text-[14px]">
                    Task Completed
                  </Typography>
                </div>
                <div className="border border-gray-100 p-4 text-center rounded-xl">
                  <Typography className="!font-semibold !text-[22px]">
                    45
                  </Typography>
                  <Typography className=" !text-[14px]">
                    Hours of help
                  </Typography>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3 border-gray-300 border-b">
                <div className="h-10 w-10 rounded-lg  bg-green-100 flex items-center justify-center">
                  <AccessAlarm className="!text-green-500" />
                </div>
                Still Needed
              </h2>
              <div className="flex items-center border border-gray-100 px-3 py-3 rounded-2xl mb-2">
                <div className="grow text-ellipsis overflow-hidden whitespace-nowrap">
                  <Typography className="text-ellipsis overflow-hidden whitespace-nowrap !font-semibold !text-[14px]">
                    Fresh vegetables
                  </Typography>
                  <Typography className="text-ellipsis overflow-hidden whitespace-nowrap !text-[14px]">
                    Grocery
                  </Typography>
                </div>

                <div className=" flex items-center justify-center rounded-full bg-red-100 text-red-500 px-3 py-1 text-sm ml-4">
                  High
                </div>
              </div>
              <div className="flex items-center border border-gray-100 px-3 py-3 rounded-2xl mb-2">
                <div className="grow text-ellipsis overflow-hidden whitespace-nowrap">
                  <Typography className="text-ellipsis overflow-hidden whitespace-nowrap !font-semibold !text-[14px]">
                    Paper towel
                  </Typography>
                  <Typography className="text-ellipsis overflow-hidden whitespace-nowrap !text-[14px]">
                    Holder house
                  </Typography>
                </div>

                <div className=" flex items-center justify-center rounded-full bg-orange-100 text-orange-500 px-3 py-1 text-sm ml-4">
                  Medium
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
