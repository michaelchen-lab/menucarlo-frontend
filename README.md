
<p align="center">
  <img src="https://i.ibb.co/cJB59D9/android-chrome-512x512.png" alt="MenuCarloLogo" border="0" height="200" width="200">
</p>

MenuCarlo helps F&B owners optimize their menu using their historical transactions data. We make menu engineering and data science techniques accessible to non-technical business owners.

* **Understand Your Business.** Instantly learn about how popular/profitable your menu items are. Find out how your revenue changed over time.
* **Optimize Your Menu.** Learn how you can modify your menu to maximize profits, using custom simulations run for you.
* **Set and Forget.** Connect to your [Square](https://squareup.com/us/en) account after signing up and never worry about importing data. 

## Demo

![](https://s2.gifyu.com/images/ezgif.com-gif-makerc81254673c52ae87.gif)

https://menucarlo.netlify.app/

Username: `demo`

Password: `demo2021`

## How It Works
MenuCarlo's frontend is built using `create-react-app` & `React Hooks`, and hosted with Netlify CDN.

1. **Authentication.** When a user is authenticated, a JWT access and refresh token is received and stored in `localStorage`. Whenever an authenticated user wants to make an API call, the user's access token is first verified to be valid, else a new access token will be generated using the refresh token. If the refresh token is invalid, the user is forced to log in again.
2. **Data Layer.** REST API calls are handled using `axios` for auth and data retrieval. `React Context` is used for state management. `AuthContext` handles the validation/refreshing of access tokens as mentioned above.
3. **UI & Visualization.** Since a utility-first approach gives us both the flexibility of CSS and the convenience of UI frameworks, `Tailwind CCS` is used as our UI framework.  All visualizations in MenuCarlo are generated using `Recharts`. 

*Check out MenuCarlo's backend [here](https://github.com/michaelchen-lab/menucarlo-backend)!*
