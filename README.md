
# **Smart Traffic Management System (Simulation) — GitHub Wiki**


# **Overview**

Welcome to the documentation for the **Smart Traffic Management System**, a simulation-based project built using **React + Node.js** and integrated with **Edge Impulse** for machine-learning based traffic detection.

This README guides you through:

* Setting up and running the simulation
* Understanding the traffic logic and emergency protocol
* Learning how ML integrates via Edge Impulse
* System design, architecture, and future extensions

---

# **Table of Contents**

1. [Project Introduction](#project-introduction)
2. [Local Setup (Simulation Version)](#local-setup-simulation-version)
3. [System Architecture](#system-architecture)
4. [Traffic Logic & Blue Light Protocol](#🚦traffic-logic--blue-light-protocol)
5. [Machine Learning Model](#machine-learning-model)
6. [Edge Impulse Integration](#edge-impulse-integration)
7. [Advantages & Limitations](#advantages--limitations)
8. [Current Submission Status](#current-submission-status)
9. [Future Enhancements](#future-enhancements)

---

# **Project Introduction**

The **Smart Traffic Management System** is designed to tackle real-world congestion using **camera-based vehicle detection** and **adaptive signal timing** powered by edge-based machine learning.

### Key Goals

* Reduce unnecessary wait time
* Optimize green-light duration based on actual vehicle count
* Automatically prioritize emergency vehicles
* Demonstrate real-time ML deployment on edge hardware

### Unique Feature: The Blue Emergency Light

A completely new addition to the standard RYG (Red–Yellow–Green) system:

* Blue indicates **emergency override mode**
* Lane containing an emergency vehicle gets immediate clearance
* All other lanes are halted automatically

This creates a safer, faster, and automated response mechanism for emergency services.

---

# **Local Setup (Simulation Version)**

This section explains how to run the **React-based simulation** on your machine.

## **1. Install Node.js & npm**

Download from:
[https://nodejs.org/](https://nodejs.org/)

Verify installation:

```
node -v
npm -v
```

---

## **2. Clone the Repository**

```
git clone https://github.com/your-repo/smart-traffic-sim.git
cd smart-traffic-sim
```

---

## **3. Install Dependencies**

```
npm install
```

---

## **4. Start the Development Server**

```
npm start
```

The simulation will be available at:

```
http://localhost:3000
```
---
Here is a **clean, professional “Project Directory Structure” section** written in GitHub Wiki style. It’s formatted for clarity and gives short explanations of what each file and folder does—perfect for documentation or hackathon submission.

You can place this as a standalone Wiki page (recommended name: **Project-Structure**) or add it inside your main README/Wiki Home.

---

# **Project Directory Structure**

```
src/
│
├── components/
│   ├── CarRenderer.jsx
│   ├── IntersectionRoad.jsx
│   ├── Car.jsx
│   ├── ControlPanel.jsx
│   ├── TrafficLight.jsx
│   ├── TrafficLightsManager.jsx
│   ├── Ambulance.jsx
│   └── TrafficIntersection.jsx
│
├── context/
│   └── TrafficContext.jsx
│
├── logic/
│   ├── trafficController.js
│   ├── dynamicTiming.js
│   ├── trafficPhase.js
│   ├── trafficTiming.js
│   └── emergencyLogic.js
│
├── files.txt
├── App.js
├── styles.css
├── logo.svg
└── index.js
```

---

# **System Architecture**

The simulation models a **four-way intersection** featuring:

### **Core Components**

* **React frontend** for rendering the intersection
* **Car spawning system** with grid-like lane arrangement
* **Traffic signal controller** with adaptive cycle timing
* **Emergency vehicle logic**
* **Event-driven movement system** using frame updates

### **Lane Structure**

Each road has:

* **Incoming lane** (vehicles arriving at center)
* **Outgoing lane** (kept empty for simplicity)

### **Simulation Rendering Includes**

* Cars
* Ambulance models
* Traffic light units
* Stop lines and lane boundaries

---

# **🚦 Traffic Logic & Blue Light Protocol**

### **Adaptive Timing (Primary Logic)**

The system continuously:

* Detects number of cars per lane
* Dynamically assigns green duration
* Skips lanes with zero vehicles

### **Emergency Override (Blue Light System)**

If ML detects an ambulance/police/fire truck:

* All lights switch to **Blue Mode**
* Emergency lane receives uninterrupted flow
* Normal cycle resumes after clearance

This ensures **zero delay for emergency movement**.

---

# **Machine Learning Model**

The vision model is trained to detect:

* Cars
* Emergency vehicles

### **Training Details**

* Lightweight YOLO variant
* Custom dataset of toy cars & ambulance models
* Includes bounding boxes for classification

### **Outputs Used by System**

* Lane-wise vehicle count
* Emergency vehicle presence flag
* Confidence levels

These values feed directly into the **adaptive traffic controller**.

---

# **Edge Impulse Integration**

This project demonstrates end-to-end compatibility with **Edge Impulse**, ensuring easy deployment on embedded devices.

### **Why Edge Impulse?**

* Easy dataset management
* Built-in annotation tools
* Vision ML pipeline
* Automatic model optimization
* Real-time performance benchmarking
* Direct deployment to Raspberry Pi

### **Platforms Used**

* **Edge Impulse Studio** for model building
* **Remote Management API** to link Raspberry Pi
* **Edge Runtime** for real-time inference

### **Deployment Pipeline**

1. Upload and label dataset in Edge Impulse
2. Train model using EI vision pipeline
3. Optimize model for embedded deployment
4. Connect Raspberry Pi via Remote Management API
5. Run inference on live camera feed
6. Feed results to the simulation’s logic engine

This demonstrates **edge-based AI traffic management** without reliance on cloud services.

---

# **Advantages & Limitations**

## **Advantages**

* Fast, real-time adaptive timing
* No wasted green-light time
* Automated emergency priority
* Works with existing camera infrastructure
* Fully edge-based — low latency
* Scalable and cost-effective

## **Limitations**

* Needs broader dataset for varied lighting/weather
* Real-world deployment requires regulatory approval
* Single-intersection model (multi-node planned)
* Simulation supports straight motion only (currently)

---

# **Current Submission Status**

This Hackathon submission includes:

* A fully interactive **React simulation**
* ML model trained externally + tested on Raspberry Pi
* Edge Impulse integration demonstrated through:

  * Remote Management API
  * Logs and inference summaries
* Working implementation of **Blue Light emergency protocol**

---

# **Future Enhancements**

We plan to expand the system with:

* Turning lanes & behavior
* Multi-intersection coordination
* Larger, diverse datasets
* Full physical prototype with sensors
* Predictive ML for congestion anticipation
* Dashboard for analytics

---

