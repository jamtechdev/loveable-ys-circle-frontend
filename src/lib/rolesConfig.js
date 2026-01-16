export const sidebarMenuConfig = {
  coordinator: [
    { text: 'Dashboard', icon: 'DashboardIcon', path: '/coordinator/dashboard' },
    { text: 'Requests', icon: 'AssignmentIcon', path: '/coordinator/requests' },
  ],
  helper: [
    { text: 'Dashboard', icon: 'DashboardIcon', path: '/helper/dashboard' },
    { text: 'My Tasks', icon: 'TaskIcon', path: '/helper/my-tasks' },
    { text: 'Requests dd', icon: 'AssignmentIcon', path: '/helper/requests' },
  ],
  recipient: [
    { text: 'Dashboard', icon: 'DashboardIcon', path: '/recipient/dashboard' },
    { text: 'My Requests', icon: 'ListAltIcon', path: '/recipient/my-requests' },
    { text: 'New Request', icon: 'AddCircleIcon', path: '/recipient/new-request' },
  ],
}
