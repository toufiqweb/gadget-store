# Gadget Store — Client 🛍️📱

Welcome to the frontend application of the **Gadget Store**, a modern, blazing-fast, and deeply interactive e-commerce platform crafted with cutting-edge web technologies.

## ✨ Key Features

- **Modern Tech Stack**: Built on **Next.js 16** with the App Router, leveraging React 19 and **Tailwind CSS v4** for robust and responsive styling.
- **Robust Authentication**: Powered by **Better Auth**, featuring secure login, registration, and session management.
- **Advanced Product Filtering**: A completely backend-controlled filtering system. Users can effortlessly filter products by text search, brand, category, price range, stock availability, and customer rating, alongside rich sorting options (A-Z, Newest, Price, Rating).
- **Custom Toast System**: A handcrafted, animated, global React Context-based toast notification system that provides beautiful contextual feedback without relying on bulky external libraries.
- **Dynamic Dashboards**: Dedicated views for user profiles and an administrative dashboard to manage products.
- **Fully Responsive**: Painstakingly crafted with Tailwind CSS to ensure a premium, dark-accented UI (driven by a custom CSS variables theme) that looks stunning on desktops, tablets, and mobile devices.

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have Node.js (v20+) installed on your machine.

### 2. Installation
Navigate into the `client` directory and install the required dependencies:
```bash
cd client
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root of the `client` directory and configure your environment variables. A typical setup looks like:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
# Add your Better Auth or other necessary variables here
```

### 4. Running the Development Server
Fire up the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app/` — Contains the Next.js App Router endpoints, including layout files, authentication flows (`/login`, `/register`), the product discovery page (`/products`), and dashboards.
- `src/components/` — Houses modular UI components.
  - `shared/` — Reusable layouts like `Navbar.tsx` and `ProductCard.tsx`.
  - `ui/` — Hand-crafted granular UI components (e.g., `Toast.tsx`).
- `src/contexts/` — Global state providers (like `ToastContext.tsx`).
- `src/lib/` — Helper files, custom API fetchers (`api/`), and authentication configurations (`auth-client.ts`).

## 🛠️ Scripts

- `npm run dev` — Starts the development server with Turbopack.
- `npm run build` — Compiles the application for production deployment.
- `npm run start` — Runs the compiled production build locally.
- `npm run lint` — Runs ESLint to statically analyze the code for issues.

## 🎨 Theming
The visual aesthetic is strictly controlled through custom CSS variables found in `src/app/globals.css`. By manipulating `--primary`, `--secondary`, and `--ternary` variables, the global color palette updates instantly across all components.

---
*Developed with ❤️ for the Gadget Store.*
