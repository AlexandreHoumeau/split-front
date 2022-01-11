import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Home = lazy(() => import('../pages/Home'))
const MySpace = lazy(() => import('../pages/Myspace'))
const Messenger = lazy(() => import('../pages/Messenger'))
const Settings = lazy(() => import('../pages/Settings'))
const Search = lazy(() => import('../pages/Home/Search'))
const TeacherOverview = lazy(() => import('../pages/Home/TeacherOverview'))
const MyCourses = lazy(() => import('../pages/MyCourses'))
const EditInformations = lazy(() => import('../pages/Settings/Informations'))
const EditNotifications = lazy(() => import('../pages/Settings/Notifications'))
const EditPassword = lazy(() => import('../pages/Settings/Password'))
const EditPayment = lazy(() => import('../pages/Settings/Payments'))
// const Modals = lazy(() => import('../pages/Modals'))
// const Tables = lazy(() => import('../pages/Tables'))
// const Page404 = lazy(() => import('../pages/404'))
// const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/home', // the url
    component: Home, // view rendered
  },
  {
    path: '/space',
    component: MySpace,
  },
  {
    path: '/me/courses',
    component: MyCourses,
  },
  {
    path: '/messenger',
    component: Messenger,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/settings/informations',
    component: EditInformations,
  },
  {
    path: '/home/search', // the url
    component: Search, // view rendered
  },
  {
    path: '/home/teacher/:id', // the url
    component: TeacherOverview, // view rendered
  },
  {
    path: '/settings/notifications',
    component: EditNotifications
  },
  {
    path: '/settings/password',
    component: EditPassword,
  },
  {
    path: '/settings/payment',
    component: EditPayment,
  },
  // {
  //   path: '/tables',
  //   component: Tables,
  // },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes
