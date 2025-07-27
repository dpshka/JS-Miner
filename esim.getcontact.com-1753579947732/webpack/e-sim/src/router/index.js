import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home"

const routes = [
  {
    path: "/:catchAll(.*)",
    component: Home,
  },
  {
    path: "/:locale?",
    name: "Home",
    component: Home,
    meta: {
      showFooter: true,
      pageTitle: "homepage",
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
