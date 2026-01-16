"use client";
import { useEffect, useState } from "react";
import {
  AccessTime,
  FavoriteBorderOutlined,
  FavoriteBorderSharp,
  FmdGood,
  FmdGoodOutlined,
  InsertLinkOutlined,
  LockClock,
  PeopleOutline,
  PunchClock,
  Recommend,
  TaskAltOutlined,
  Timelapse,
  AccessAlarm,
  Add,
  CalendarMonth,
  ContactPage,
  Diversity3,
  Favorite,
  HeartBrokenSharp,
  Home,
  LocalActivity,
  People,
  PeopleAltOutlined,
  Settings,
  TaskAlt,
} from "@mui/icons-material";
import { Button, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Cookies from "js-cookie";
import { volunteerService } from "../../../lib/volunteer/volunteerService";
import { useRouter } from "next/navigation";

const DashboardCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
  </div>
);

const MenuIcon = (props) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    ></path>
  </svg>
);

export default function VolunteerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState()
  const [commitments, setCommitments] = useState()
  const [hoursVolentirs, setHoursVolentiers] = useState()
  const [countFamilyhelped, stCountFamilyhelped] = useState()
  const [upComingCommites, setUpcomingCommites] = useState()
  const router = useRouter()
 // console.log(upComingCommites, "responsecc")
  const user = {
    name: "Volunteer",
    email: "volunteer@gmail.com",
  };
  const currentUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
  const userName = currentUser.name



  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await volunteerService.getVolentierdashboardstats();
      // console.log(response.data.data, "responsecc")
      setCommitments(response.data.data.active_commitments)
      setHoursVolentiers(response.data.data.volunteered_hours)
      stCountFamilyhelped(response.data.data.families_helped)
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcommingCommits = async () => {
    setLoading(true);
    try {
      const response = await volunteerService.getUpcomingCommits();
      // console.log(response, "responsecc")
      setUpcomingCommites(response.data.data)
    } catch (err) {
      console.error(err);
      setError("Failed to load upcoming commites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchUpcommingCommits()
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 bg-gray-100 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            👋 Welcome back, {userName}
          </h1>
          <p className="text-gray-600">
            Thank you for being part of our community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <DashboardCard
            title="Active Commitments"
            value={commitments}
            icon={<PeopleAltOutlined className="w-6 h-6 text-blue-500" />}
            bgColor="bg-blue-100"
          />

          <DashboardCard
            title="Hours Volunteered"
            value={hoursVolentirs}
            icon={<Diversity3 className="w-6 h-6 text-red-500" />}
            bgColor="bg-red-100"
          />

          <DashboardCard
            title="Family Helped"
            value={countFamilyhelped}
            icon={<CalendarMonth className="w-6 h-6 text-green-500" />}
            bgColor="bg-green-100"
          />
        </div>
        <div className="flex justify-between flex-wrap items-center mb-4">
          <h2 className="text-xl font-semibold !mb-0">
            My Upcoming Commitments
          </h2>
          <button className="theme-btn-primary">
            <FavoriteBorderSharp className="mr-2" /> Find More Ways to Help
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {upComingCommites && upComingCommites.length > 0 ? (
              upComingCommites.map((commitment, index) => (
                <div key={commitment.task_id || index} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <div className="flex items-center gap-3 justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-300 text-orange-900 px-3 py-1 text-sm rounded-2xl">
                        {commitment.support_page?.support_reason || "Support"}
                      </div>
                      <div>{commitment.support_page?.special_instructions || "N/A"}</div>
                    </div>
                    <div className="bg-blue-300 text-blue-900 px-3 py-1 text-sm rounded-2xl">
                      Comment
                    </div>
                  </div>

                  <Typography className="!text-lg !font-semibold !mb-0">
                    {commitment.task_title}
                  </Typography>

                  <Typography>
                    {commitment.task_description}
                  </Typography>

                  <div className="flex items-center gap-5 my-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <CalendarMonth />
                      {commitment.scheduled_at}
                    </div>

                    <div className="flex items-center gap-2">
                      <AccessTime />
                      {commitment.duration_hours}
                    </div>

                    <div className="flex items-center gap-2">
                      <FmdGoodOutlined />
                      {commitment.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 mt-6">
                    <Button
                    onClick={() => router.push(`/volunteer/support-pages/${commitment.support_page?.support_page_id}/${commitment.task_id}`)}
                      variant="outlined"
                      color="secondary"
                      className="!shadow-none !min-h-[48px] !rounded-[30px] !font-semibold"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className="!shadow-none !min-h-[48px] !rounded-[30px] !font-semibold"
                    >
                      Mark Complete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <Typography className="text-center text-gray-500">
                  No upcoming commitments found
                </Typography>
              </div>
            )}
            <div className="w-full mt-10">
              <h2 className="text-xl font-semibold !mb-6">
                Families Who Need Help
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <div className="flex items-center gap-3 justify-between mb-3">
                    <Typography className="!text-lg !font-semibold !mb-0">
                      The Johnson Family
                    </Typography>
                    <div className="bg-blue-100 text-blue-500 px-3 py-1 text-sm rounded-2xl">
                      Cancer Treatment
                    </div>
                  </div>
                  <Typography>
                    Emily is undergoing chemotherapy tissatment and neecis
                    support with meas, transportation, and childcare for her
                    thras children.
                  </Typography>
                  <div className="flex items-center gap-5 mt-3 mb-5 flex-wrap">
                    <div className="inline-flex items-center bg-red-100 text-red-500 px-3 py-2 rounded-3xl text-sm gap-2">
                      <PeopleOutline />
                      12 Task open
                    </div>

                    <div className="inline-flex items-center bg-green-100 text-green-500 px-3 py-2 rounded-3xl text-sm gap-2">
                      <FavoriteBorderOutlined />
                      18 Helpers
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="!shadow-none w-full !min-h-[48px] !rounded-[30px] !font-semibold"
                  >
                    View Needs
                  </Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <div className="flex items-center gap-3 justify-between mb-3">
                    <Typography className="!text-lg !font-semibold !mb-0">
                      The Martinez Family
                    </Typography>
                    <div className="bg-orange-100 text-orange-500 px-3 py-1 text-sm rounded-2xl">
                      Home fire recovery
                    </div>
                  </div>
                  <Typography>
                    Emily is undergoing chemotherapy tissatment and neecis
                    support with meas, transportation, and childcare for her
                    thras children.
                  </Typography>
                  <div className="flex items-center gap-5 mt-3 mb-5 flex-wrap">
                    <div className="inline-flex items-center bg-red-100 text-red-500 px-3 py-2 rounded-3xl text-sm gap-2">
                      <PeopleOutline />8 Task open
                    </div>

                    <div className="inline-flex items-center bg-green-100 text-green-500 px-3 py-2 rounded-3xl text-sm gap-2">
                      <FavoriteBorderOutlined />
                      18 Helpers
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="!shadow-none w-full !min-h-[48px] !rounded-[30px] !font-semibold"
                  >
                    View Needs
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3 border-gray-300 border-b">
                <div className="h-10 w-10 rounded-lg  bg-orange-100 flex items-center justify-center">
                  <FavoriteBorderOutlined className="!text-orange-500" />
                </div>
                Your Impact
              </h2>
              <div className="flex items-center gap-5 mt-3 mb-5 flex-wrap">
                <div className="inline-flex items-center bg-green-100 text-green-500 px-3 py-2 rounded-3xl text-sm gap-2">
                  <TaskAltOutlined />
                  15 Task Completed
                </div>

                <div className="inline-flex items-center bg-red-100 text-red-500 px-3 py-2 rounded-3xl text-sm gap-2">
                  <FavoriteBorderOutlined />
                  45 Hours Volunteered
                </div>
                <div className="inline-flex items-center bg-blue-100 text-blue-500 px-3 py-2 rounded-3xl text-sm gap-2">
                  <Recommend />
                  45 Families supported
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3 border-gray-300 border-b">
                <div className="h-10 w-10 rounded-lg  bg-green-100 flex items-center justify-center">
                  <InsertLinkOutlined className="!text-green-500" />
                </div>
                Quick Actions
              </h2>
              <h2 className="text-xl font-semibold mb-4"></h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 bg-gray-200 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                  >
                    <CalendarMonth />
                    Browes all support pages
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 bg-gray-200 hover:bg-blue-100 hover:text-blue-500 rounded-md"
                  >
                    <TaskAltOutlined />
                    View my signups
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
