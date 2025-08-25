# TechNow - Technology News Website

## Overview

TechNow is a static technology news and review website that provides content across multiple technology categories including mobile phones, laptops, gaming, wearables, appliances, and smart home devices. The website features a modern, responsive design with dark/light theme support and is built as a multi-page static site focusing on technology journalism and product reviews.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Multi-Page Application**: Built with vanilla HTML5, CSS3, and JavaScript
- **Responsive Design**: Bootstrap 5.3.0 framework for mobile-first responsive layouts
- **Component-Based Structure**: Consistent navigation header and page structure across all pages
- **Theme System**: CSS custom properties (variables) enable dynamic light/dark theme switching
- **Modern JavaScript**: ES6+ class-based architecture for theme management and user interactions

### Design Patterns
- **CSS Custom Properties**: Centralized theme management using CSS variables for colors, shadows, and transitions
- **Progressive Enhancement**: Base functionality works without JavaScript, enhanced features require JS
- **Modular CSS**: Organized stylesheets with clear separation of concerns
- **Semantic HTML**: Proper use of HTML5 semantic elements for accessibility and SEO

### Page Structure
- **Home Page**: Hero section with animated tech gadget background and category exploration
- **Category Pages**: Dedicated pages for mobile phones, laptops, games, wearables, appliances, and smart home
- **Static Pages**: About and contact pages for company information
- **Consistent Navigation**: Fixed header with brand logo and category navigation

### Visual Features
- **Animated Background**: CSS-based tech gadget animations on hero section showing various devices (smartphones, laptops, tablets, smartwatches, headphones, gaming controllers, cameras, monitors, speakers, drones)
- **Sequential Animation**: Gadgets appear and disappear in timed sequences with rotation and scaling effects
- **Responsive Gadgets**: Background elements scale appropriately on mobile devices

### Theme Management
- **Dual Theme Support**: Light and dark mode with persistent user preference storage
- **CSS Variable System**: Comprehensive color scheme management through custom properties
- **Local Storage**: Theme preference persistence across browser sessions
- **Smooth Transitions**: Animated theme switching with visual feedback

## External Dependencies

### Frontend Frameworks
- **Bootstrap 5.3.0**: Responsive grid system, components, and utilities via CDN
- **Font Awesome 6.4.0**: Icon library for UI elements and theme toggle via CDN

### Asset Dependencies
- **Custom Logo**: SVG logo file in assets directory
- **Custom Stylesheets**: Local CSS file for theme management and custom styles
- **JavaScript Modules**: Local script file for theme switching and interactive features

### Browser APIs
- **Local Storage API**: For persistent theme preference storage
- **DOM Manipulation**: For dynamic theme switching and user interface updates