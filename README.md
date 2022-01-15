# Notemock

<p align="center">
<img src="https://github.com/JoaoGabriel-Lima/notemock_website/blob/main/dashboard.jpg" alt="Preview-Screens">
</p>
<p align="center">If you want to take a look on all screens of the App, they are <a href="https://drive.google.com/drive/folders/175RmjnyOH-J2R4tSrEWI8W_R4w8CnLcM?usp=sharing">here</a>
</p>

<p align="center">
<img src="https://img.shields.io/github/checks-status/JoaoGabriel-Lima/notemock_website/main">
<img src="https://img.shields.io/badge/-unfinished-orange">
<img src="https://img.shields.io/github/languages/top/JoaoGabriel-Lima/notemock_website">
</p>

## About this Project

The idea of the Website is:

_"A to-do list Next.js website focused on students and developers, offering better organization and customization options"._

**PS:** The site is not just for students, but for any audience interested in a customizable to-do list. All code within this site can be reused in any to-do list project or other projects inside this context!

## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: jg.limamarinho202@gmail.com

Contact me at [Twitter](https://twitter.com/juaozin__).

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

It's free!

## Some Observations about this App

1 - There are still several functions to be made available in the following versions of the application, buttons like the notifications button were placed only for UI matters.

2 - The only option that works at profile dropdown menu it’s Sign Out button, all the others are just for UI matters too.

## Testing

If you want to test this Website in the Production mode, the website links are listed below:

[Current Production Deployment](https://notemock-website.vercel.app/)

Test Deployments: Soon!

## Functionalities

- Create custom solutions to organize your tasks into specific groups to have a website based on you

- Get Statistics weekly from your collections

- Get data you allow outside the site through the api

- Search tasks, subtasks and collections from anywhere on the site

- Collections

  - Create, Edit and Remove your Collections
  - Instant sync with other devices
  - Customizable colors, icons and sizes

- Tasks

  - Create tasks inside a collection
  - Notificates when the task is about to expire
  - Edit task
  - Create a subtask for a better organization

- Edit Pages

  - Customize colors, names and time for any task, subtasks or collection

- Search

  - Search for collections, tasks e subtasks by name

  - Get information about a certain collection, showing it's task and subtasks and time to expire

- Navbar

  - Notifications button
  - Add button
  - Search button
  - Profile dropdown menu

- Settings
  - Sign Out and Account settings

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a Next.js App, that can be found [here](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website).

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/JoaoGabriel-Lima/notemock_website/

$ cd notemock_website
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Preparing for running

1 - This site uses Next.js serverless functions to make connections to the database and [Google Cloud Platform](https://console.developers.google.com/) along with [Next Auth](https://next-auth.js.org/) for Login

2 - After cloning the repository, go to the [/.env.development](https://github.com/JoaoGabriel-Lima/notemock_website/blob/main/.env.development) file and edit the `MONGO_DB`, `MONGODB_URI`, `GOOGLE_ID`, `GOOGLE_SECRET`, `JWT_SECRET` and `NEXT_PUBLIC_DBTOKEN` according to your own information.

### Running

With all dependencies installed and the environment properly configured, you can now run the website:

yarn

```
$ yarn run dev
```

npm

```
$ npm run dev
```

The website will start on the default port 3000

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - The React Framework  
  for Production
- [Next Auth](https://next-auth.js.org/) - Authentication for Next.js
- [Next PWA](https://github.com/shadowwalker/next-pwa) - Zero Config PWA Plugin for Next.js
- [Axios](https://github.com/axios/axios) - HTTP Client
- [ESlint](https://eslint.org/) - Linter
- [Dotenv](https://github.com/motdotla/dotenv) - Configs from .env file
- [MongoDB](https://www.mongodb.com/) - Distributed Database
- [Prettier](https://prettier.io/) - Code Formatter
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [Framer-Motion](https://www.framer.com/motion/) -Motion Library
- [Styled-Components](https://www.styled-components.com/) - Styles
- [BoxIcons](https://boxicons.com/) - Icons Library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [React-Query](https://react-query.tanstack.com/) - Data synchronization
- [React-Datepicker](https://github.com/Hacker0x01/react-datepicker) - Datepicker
- [React-Circular-Progressbar](https://github.com/kevinsqi/react-circular-progressbar) - Circular Progressbar
- [Next-Sass](https://github.com/vercel/next-plugins/tree/master/packages/next-sass) - Sass Integration on Next.js
- [Headlessui](https://headlessui.dev/) - UI components
- [Mongoose](https://mongoosejs.com/) - MongoDB validation

## Support tools

- [Vercel](https://vercel.com/) - Host Service

## Contributing

You can send me as many PR's as you want, I would be glad to analyse and accept them! And if you have any question about the project...

Email-me: jg.limamarinho202@gmail.com

Contact me at [Twitter](https://twitter.com/juaozin__).

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/JoaoGabriel-Lima/notemock_website/blob/main/LICENSE) file for details
