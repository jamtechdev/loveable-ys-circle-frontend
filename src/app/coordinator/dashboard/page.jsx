"use client";
import {
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
import { Button, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import Sidebar from "../../../components/coordinator/Sidebar";
import Navbar from "../../../components/coordinator/Navbar";
import { useRouter } from "next/navigation";
import { supportService } from "../../../lib/support/supportService";
import Cookies from "js-cookie";

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

export default function CoordinatorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportPagses, setSupportPages] = useState()
  const [helpers, setHelpers] = useState()
  const [completedTask, setCompletedTask] = useState()
  const [upcomingTask, setUpcomingTask] = useState()
  const [latestSupportPage, setLatestSupportPage] = useState()
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const user = {
    name: "Co ordinator ",
    email: "coordinator.com",
  };
      const currentUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
      const userName = currentUser.name
      //  console.log(currentUser, "currentUser");

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await supportService.getCoordinateDashboardStats();
      setSupportPages(response.data.data.total_support_pages)
      setHelpers(response.data.data.total_volunteers)
      setCompletedTask(response.data.data.completed_tasks)
    } catch (err) {
      console.error(err);
      setError("Failed to load support details");
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingTask = async () => {
    setLoading(true);
    try {
      const response = await supportService.getUpcomingTask();
      // console.log(response.data.data, "response")
      setUpcomingTask(response.data.data)
    } catch (err) {
      console.error(err);
      setError("Failed to load support details");
    } finally {
      setLoading(false);
    }
  };

  const fetchSupportPagses = async () => {
    setLoading(true);
    try {
      const response = await supportService.getlatestSupportPage();
      console.log(response.data.data, "response")
      setLatestSupportPage(response.data.data)
    } catch (err) {
      console.error(err);
      setError("Failed to load support details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchUpcomingTask()
    fetchSupportPagses()
  }, []);

  const handleopenCreatesupport = () => {
    router.push("/coordinator/support-pages/create")
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 bg-gray-100 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            👋 Welcome back, {userName}!
          </h1>
          <p className="text-gray-600">Here is your snapshot for today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardCard
            title="Active Support Pages"
            value={supportPagses}
            icon={<PeopleAltOutlined className="w-6 h-6 text-blue-500" />}
            bgColor="bg-blue-100"
          />

          <DashboardCard
            title="Total Helpers"
            value={helpers}
            icon={<Diversity3 className="w-6 h-6 text-red-500" />}
            bgColor="bg-red-100"
          />

          <DashboardCard
            title="Upcoming Tasks"
            value={upcomingTask?.length}
            icon={<CalendarMonth className="w-6 h-6 text-green-500" />}
            bgColor="bg-green-100"
          />

          <DashboardCard
            title="Completed Tasks"
            value={completedTask}
            icon={<TaskAlt className="w-6 h-6 text-orange-500" />}
            bgColor="bg-orange-100"
          />
        </div>
        <div className="flex justify-between flex-wrap items-center mb-4">
          <h2 className="text-xl font-semibold !mb-0">My Support Pages</h2>
          <button className="theme-btn-primary" onClick={handleopenCreatesupport}>
            <Add /> Create New Page
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {latestSupportPage && latestSupportPage.length > 0 ? (
              latestSupportPage.map((page) => {
                // Truncate description if too long
                const truncateText = (text, maxLength) => {
                  if (text && text.length > maxLength) {
                    return text.slice(0, maxLength - 3) + '...';
                  }
                  return text;
                };

                return (
                  <div key={page.id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <Typography className="!text-lg !font-semibold !mb-0">
                        {page.title}
                      </Typography>
                      <div className={`rounded-2xl text-sm px-4 py-1 ${page.status === 'active'
                          ? 'bg-green-100 text-green-500'
                          : 'bg-gray-100 text-gray-500'
                        }`}>
                        {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                      </div>
                    </div>

                    {page.support_reason && (
                      <Typography className="!font-medium !mb-2">{page.support_reason}</Typography>
                    )}

                    <Typography>
                      {truncateText(page.description, 150)}
                    </Typography>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 mb-6 mt-6">
                      <div className="bg-blue-100 p-6 rounded-lg border border-blue-500 flex flex-col items-center justify-between">
                        <Typography className="!text-3xl !font-bold text-blue-400 mt-1">
                          {page.total_helpers || 0}
                        </Typography>
                        <Typography className="!text-lg !font-bold !text-gray-900 mt-1">
                          Helper
                        </Typography>
                      </div>

                      <div className="bg-orange-100 p-6 rounded-lg border border-orange-500 flex flex-col items-center justify-between">
                        <Typography className="!text-3xl !font-bold text-orange-400 mt-1">
                          {page.upcoming_tasks || 0}
                        </Typography>
                        <Typography className="!text-lg !font-bold !text-gray-900 mt-1">
                          Upcoming
                        </Typography>
                      </div>

                      <div className="bg-green-100 p-6 rounded-lg border border-green-500 flex flex-col items-center justify-between">
                        <Typography className="!text-3xl !font-bold text-green-400 mt-1">
                          {page.completed_tasks || 0}
                        </Typography>
                        <Typography className="!text-lg !font-bold !text-gray-900 mt-1">
                          Completed
                        </Typography>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 mt-6">
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="!shadow-none !min-h-[48px] !rounded-[30px] !font-semibold"
                        onClick={() => router.push(`/coordinator/support-pages/${page.id}`)}
                      >
                        View Page
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="!shadow-none !min-h-[48px] !rounded-[30px] !font-semibold"
                        // onClick={() => router.push(`/coordinator/support-pages/${page.id}/manage`)}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 text-center text-gray-500">
                No support pages found
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3 border-gray-300 border-b">
                <div className="h-10 w-10 rounded-lg  bg-blue-100 flex items-center justify-center">
                  <AccessAlarm className="!text-blue-500" />
                </div>
                Recent Activity
              </h2>
              <ul className="space-y-3">
                <li className="p-2 border-b">
                  <Typography className="!text-sm !font-semibold !mb-2">
                    New user **Jane** registered.
                  </Typography>
                  <Typography className="!text-sm !mb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas, repellendus!
                  </Typography>
                  <Typography className="!text-muted !text-sm">
                    25-11-22 at 18:00
                  </Typography>
                </li>
                <li className="p-2 border-b">
                  <Typography className="!text-sm !font-semibold !mb-2">
                    New user **Jane** registered.
                  </Typography>
                  <Typography className="!text-sm !mb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas, repellendus!
                  </Typography>
                  <Typography className="!text-muted !text-sm">
                    25-11-22 at 18:00
                  </Typography>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 pb-3 border-gray-300 border-b">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CalendarMonth className="!text-green-500" />
                </div>
                Upcoming Task
              </h2>

              <ul className="space-y-3">
                {upcomingTask && upcomingTask.length > 0 ? (
                  upcomingTask.map((task) => {
                    const scheduledDate = new Date(task.scheduled_at);
                    const formattedDate = scheduledDate.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    const isFilled = task.volunteers_count >= task.max_volunteers;

                    return (
                      <li key={task.id} className="p-2 border-b">
                        <Typography className="!text-sm !font-semibold !mb-2">
                          {task.title}
                        </Typography>

                        <Typography className="!text-muted !text-sm">
                          {formattedDate}
                        </Typography>

                        <Typography className={`!text-sm ${isFilled ? '!text-red-500' : '!text-green-500'}`}>
                          {isFilled ? 'Filled' : 'Need Volunteers'}
                        </Typography>
                      </li>
                    );
                  })
                ) : (
                  <li className="p-2 text-center text-gray-500">
                    No upcoming tasks
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
