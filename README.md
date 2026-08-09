# 🗳️ Sri Lanka General Election — Digital Voting System Simulation

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-purple.svg?logo=vite)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.15-green.svg?logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-black.svg?logo=express)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Accessibility](https://img.shields.io/badge/WCAG-Senior%20Accessible%20(18--100%20Yrs)-amber.svg)](#-accessibility--senior-friendly-mode)

> **⚠️ EDUCATIONAL SIMULATION NOTICE**  
> This application is an **educational software prototype** simulating a digital voting system for Sri Lankan parliamentary elections. It is **not** an official Sri Lankan government election platform and uses synthetic mock data for demonstration purposes.

---

## 🌟 Overview

The **Sri Lanka General Election Voting Management Platform** is a full-stack digital election simulation engineered to provide a secure, transparent, accessible, and realistic voting experience.

Designed to serve citizens aged **18 to 100 years old**, the system combines modern civic editorial design, complete trilingual support (**English**, **Sinhala**, **Tamil**), senior accessibility with Web Speech API voice synthesis, cryptographic ballot secrecy, real-time Recharts analytics, and automated publication-grade PDF/CSV decision reports.

---

## ✨ Key Features & Architectural Pillars

### 1. 🎨 Civic Design & Trilingual Experience
- **Civic Technology Aesthetics**: Premium palette featuring Deep Civic Navy (`#0B192C`), Warm Ivory (`#F8F9FA`), Muted Gold (`#C5A059`), and Subtle Crimson (`#B71C1C`).
- **Trilingual Localization**: Instant switching between **English**, **Sinhala (සිංහල)**, and **Tamil (தமிழ்)** across all screens, ballot items, and reports.

### 2. 👵 Accessibility & Senior-Friendly Mode (Ages 18–100)
- **Scalable Typography & High Contrast**: Large 3px touch borders and ultra-clear layouts.
- **Web Speech API Read-Aloud**: Audio voice assistant reads screen instructions aloud in English, Sinhala, or Tamil.

### 3. 🔒 Cryptographic Ballot Secrecy & Database Vault
- **Decoupled Database Architecture**: `voter_verifications` (identity roll) and `anonymous_ballots` (vote vault) are strictly decoupled with zero foreign keys or joinable columns.
- **Duplicate Voting Prevention**: Atomic transaction locks eligibility (`has_voted = true`) while storing an anonymized ballot into the vault.
- **Verifiable Receipt**: Issues an encrypted vote confirmation code (e.g. `SL-VOTE-2026-X8F9-A72K`).

### 4. 🗳️ Realistic Digital Voting Ballot
- Visual party symbol badges (Compass, Telephone, Flower Bud, Gas Cylinder, House, Trophy).
- Candidate photographs/avatars, candidate numbers, party names, slogans, and occupations.
- Selection of **1 Political Party/Group** + up to **3 Candidate Preferences**.
- Irreversible vote review modal before final submission.

### 5. 📊 Password-Protected Results Center & Seat Allocation Engine
- Protected access via passcode (`election2026`).
- Interactive Recharts Bar Chart (vote counts) and Donut Chart (225 Sri Lankan Parliamentary Seat Distribution).
- Proportional Representation seat calculation using Hare Quota math.
- Automated outcome decision (Winning Party, Seats Won out of 225, Super Majority / Absolute Majority / Hung Parliament status).

### 6. 📄 Decision Report Generation & Data Export
- Publication-grade **PDF Report Export** (`jspdf` + `jspdf-autotable`) complete with official header, executive turnout table, party seat breakdown, and decision summary.
- Client-side **CSV Dataset Export** for electoral analysts.

### 7. 📱 100% Device Responsiveness
- Optimized for mobile smartphones (320px–640px), polling station touch tablets (640px–1024px), laptops, desktops, and 4K displays.
- Mobile collapsible navigation drawer and sticky polling station action bar.

---

## 📐 System Architecture & Data Flow

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            REACT 18 FRONTEND CLIENT                         │
│   (Vite + TypeScript + TailwindCSS + Recharts + jsPDF + Web Speech API)     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       │ HTTP REST API (port 5000)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EXPRESS.JS BACKEND API SERVER                      │
│       (JWT Auth + Cryptographic SHA256 Receipts + Audit Logging)            │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
         ┌────────────────────────────┐ ┌───────────────────────────┐
         │    voter_verifications     │ │     anonymous_ballots     │
         │  (Identity & has_voted)    │ │   (Vote Choices Vault)    │
         └────────────────────────────┘ └───────────────────────────┘
                       └──────── NO LINKAGE ────────┘
```

---

## 🔑 Test Credentials & Quick Identifiers

### Admin Portal & Results Access
- **Admin Username**: `admin`
- **Admin Password**: `election2026`
- **Results Center Passcode**: `election2026` *(or click "⚡ Auto-Fill & Unlock")*

### Quick Test Voter Profiles
| Document Type | Document Number | Name & Profile | Electoral District |
|---|---|---|---|
| **NIC** | `199012345678` | Kasun Bandara (36 Yrs) | Colombo |
| **NIC (Senior)** | `194888776655` | Gamini Wijesuriya (Senior 78 Yrs) | Colombo (Senior Mode) |
| **PASSPORT** | `N1234567` | Sinthuja Thiruchelvam (28 Yrs) | Jaffna |
| **DRIVING LICENCE** | `B1234567` | Mohamed Rizan (22 Yrs) | Gampaha |
| **NIC (Elderly)** | `193555667788` | Sirisena Gunaratne (Elderly 91 Yrs) | Galle |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0 or higher
- npm v9.0 or higher

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/sri-lanka-voting-system.git
   cd sri-lanka-voting-system
   ```

2. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Start Backend Server & Frontend App**:
   - In terminal 1 (Server):
     ```bash
     cd server
     npm run dev
     ```
     *Server runs on `http://localhost:5000`*

   - In terminal 2 (Client):
     ```bash
     cd client
     npm run dev
     ```
     *Client runs on `http://localhost:3000`*

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/election` | Returns active election metadata | No |
| `GET` | `/api/districts` | Returns all 22 Sri Lankan electoral districts | No |
| `GET` | `/api/parties` | Returns political parties & symbols | No |
| `GET` | `/api/candidates` | Returns candidate rosters by district/party | No |
| `POST` | `/api/verify-identity` | Verifies NIC/Passport/DL & issues session token | No |
| `POST` | `/api/cast-vote` | Casts anonymous ballot & issues receipt | Voter Token |
| `GET` | `/api/results` | Calculates live vote tallies & 225 seat outcome | Passcode |
| `GET` | `/api/db-status` | Returns global database telemetry status | No |
| `POST` | `/api/admin/login` | Authenticates administrative officers | Admin Auth |
| `POST` | `/api/admin/election-status` | Toggles election state (ACTIVE/CLOSED/FINALIZED) | Admin Auth |
| `POST` | `/api/admin/candidates` | Registers new candidate to election roster | Admin Auth |
| `GET` | `/api/admin/voters` | Audit roll for voter verifications | Admin Auth |

---

## 📄 License & Attribution

Distributed under the MIT License. Developed for educational and software engineering demonstration purposes.

© 2026 Sri Lanka General Election Voting System Simulation.
