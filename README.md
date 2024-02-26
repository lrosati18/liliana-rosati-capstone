# PinPoint

## Overview

PinPoint is a way to document and share your travel memories, find travel inspiration, and build out your travel bucket list.

PinPoint is an application for those that love to travel, those looking for travel ideas, and those that want to keep up with family and friends off travelling.

### Problem

Upon completing my undergraduate degree, my friends and I, like many others took off on a month-long backpacking trip through Europe. Throughout our travels we collected postcards, pictures, and lasting memories. PinPoint is a way to share those memories, and have one central place to document all your travels in a modern and organized way.

The idea is that it mimics the physical travel maps where you add actual pins to a paper map and makes it easier to share and collaborate on, all while providing others with inspiration for their future travels.

### User Profile

- Travellers

  - looking for a centralized place to store travel memories

- People looking for travel inspiration
- People building their travel bucket list

### Features

- As a user, I can create an account to save all my pins and their associated info
- As a user, I can login to my account
- As a user, I can mark places on my personal map that I have travelled to with digital pins including details about the trip
- As a user, I can add pins for places I want to go with details about what I want to do to my personal map

## Implementation

### Tech Stack

- React
- JavaScript
- MySQL
- Express
- Client libraries:
  - react-router
  - axios
  - SASS

### APIs

- Mapbox
  - Interactive map API for Web (JavaScript)
  - Geocoding API

### Sitemap

- Homepage/Landing page
- Register page
- Login page
- Profile page

### Auth

- JWT auth
  - Store JWT in sessionstorage, remove when a user logs out
  - pass JWT token to backend for authentication to fetch user profile and allow access to profile page

## Future Features

- Deploy to heroku/netlify
- Forgot password functionality
- Ability to edit a details about a pin or change from not visited to visited
- Gamification (earn badges for add 5 new places etc.)
- Choose to make profile private or public
  - public profiles will be able to be viewed even for users not logged in to get travel ideas
- Add functionality to also add photos to details displayed in popup
- Allow users to add a custom profile picture
- Add rating ability for places
- Allow users to tag other users in pins for places they travelled together so that all tagged users can contribute as well and view pin on their own profile
- Allow users to like/comment on other users posts/pages
- Add stats to profile (#cities/countries travelled, member since, etc.)
- Add quiz that uses AI to suggest places to travel next

## Instructions for Running

- `npm i`
- setup variables in .env file by referencing the .env.sample file
  - you will need an access token from Mapbox and the url to the server
