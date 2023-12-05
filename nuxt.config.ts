import vuetify from "vite-plugin-vuetify";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ["vuetify/lib/styles/main.sass", "~/assets/scss/styles.scss"],
    build: {
		transpile: ["vuetify"],
	},
	/* vue: {
    	compilerOptions: {
      		isCustomElement: (tag) => ['silent-box'].includes(tag),
		},
	}, */
	vite: {
		ssr: {
			noExternal: ["vuetify"],
		},
		define: {
			"process.env.DEBUG": false,
		},
		css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/_variables.scss";',
                },
            },
        },

	},
    modules: [
        /* Treeshaking: https://next.vuetifyjs.com/en/features/treeshaking/ */
        async (options, nuxt) => {
			// @ts-ignore
			nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
		},
        "@pinia/nuxt",
        "@nuxtjs/i18n",
		'@nuxtjs/strapi',
		'@dargmuesli/nuxt-cookie-control',
		'nuxt-swiper'
    ],
	runtimeConfig: {
		public: {
			strapi: {
				url: process.env.STRAPI_URL // can be overridden by NUXT_PUBLIC_STRAPI_URL environment variable
			},
		}
	},
	cookieControl: {
		colors: {
			barBackground: '#ffffff',
			checkboxActiveBackground: '#00A34A', // text-green-600
			barButtonBackground: '#EF233C',
			barButtonColor: '#ffffff',
			barTextColor: "#000000",
			modalBackground: '#ffffff',
			modalButtonBackground: '#EF233C',
			modalButtonColor: '#ffffff',
			modalTextColor: '#000000',
		},
		closeModalOnClickOutside: true,
		cookies: {
			necessary: [
				{
				description:
					"Tieto súbory cookie sú nevyhnutné na to, aby sme vám mohli poskytovať služby dostupné prostredníctvom našej webovej stránky a aby ste mohli používať určité funkcie našej webovej stránky. Bez týchto súborov cookie vám nemôžeme poskytnúť určité služby na našom webe.",
				name:
					'Nevyhnutne potrebné cookies',
				targetCookieIds: ['NEC'],
				links: {
					'https://www.penzion-harmonia.sk/sukromie/ochrana-osobnych': 'Ochrana osobných údajov',
					'https://www.penzion-harmonia.sk/sukromie/cookies': 'Cookies',
				},
        	},
      ],
    },
	isCookieIdVisible: true,
	isIframeBlocked: true,
	locales: ['sk'],
  },
    i18n: {
		locales: ['sk'],  // used in URL path prefix
		strategy: 'prefix_except_default',
	    defaultLocale: 'sk',
        vueI18n: "./i18n.config.ts",
		customRoutes: 'config',
		detectBrowserLanguage: false
		/* pages: {
			contact: {
				sk: '/kontakt',
				en: '/contact',
			}
		} */
    },


});
