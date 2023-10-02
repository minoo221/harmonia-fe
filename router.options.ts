
    import type { RouterConfig } from "@nuxt/schema";

    export default {
      scrollBehavior(to: any, from: any, savedPosition: any) {
        if(savedPosition)
          return savedPosition;

        if (to.hash && to.path == from.path) {
           const el = document.querySelector(to.hash);
        return { top: el.offsetTop, left: 0, behavior: "smooth" };
        }

        return {
          top: 0,
          left: 0
        }
      }
    };