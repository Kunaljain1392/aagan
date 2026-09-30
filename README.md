# AANGAN: Breathing Courtyard (आंगन)
### Smart India Hackathon 2026 | Problem Statement 26116: Urban Mixed-Use Design Challenge
**Autodesk Revit 2026 • Team MIDNIGHT-CODERS (Team ID: 157275)**

> *"Shops below. Homes above. A courtyard in the middle."*  
> A procedural, climate-responsive mixed-use urban block for Delhi-NCR, reviving the traditional Indian courtyard as a high-performance 35m vertical thermal chimney for natural stack ventilation, 11.4 W/m² RETV, and biophilic community living.

---

## Live Prototype Features

1. **Procedural 3D Building Explorer**:
   - Built to exact metric dimensions on an 8,000 x 8,000 mm structural grid.
   - 40,000 x 32,000 mm footprint with a 16,000 x 16,000 mm central courtyard aperture (256 m²).
   - 11 datum levels: Basement (-3.6m), Ground (4.5m), Level 1 (4.0m), Levels 2–9 (each 3.3m), and Roof Terrace (~35 m total height).
   - Columns: 600x600 mm tapering to 450x450 mm above Level 5; Beams: 300x550 mm; Slabs: 175 mm two-way RC slab.
   - Interactive level isolation, exploded massing view, and central courtyard section cut.

2. **Sun & Facade Response Simulator**:
   - Real solar trigonometry for Delhi-NCR (Latitude 28.4089° N, Longitude 77.1025° E).
   - Live directional sun light and dynamic shadow mapping across the day (5:00 AM to 7:00 PM) and month (January to December).
   - Parametric adaptive fins: North (diffuse vertical), South (horizontal overhang shelves), East (morning angled fins), West (deep 600mm louvres + jaali screen).
   - Live solar heat gain avoidance % and direct sun hours computation.

3. **Courtyard Breathing: Fluid Dynamics & Stack Effect**:
   - 2D Canvas particle simulation modeling buoyancy updraft through the 8,960 m³ vertical courtyard chimney.
   - Controls for outdoor temperature (20°C to 45°C), wind speed, and biophilic water mirror & trees.
   - Computes Air Changes per Hour (ACH), microclimate temperature reduction (-4.8°C), and cross-ventilation flow across residential units.

4. **Typical Floor & Home Planner**:
   - 1,024 m² standard floor plate (L2–L9) with 8 dual-aspect apartments (4x 3BHK corner units + 4x 2BHK mid units).
   - Interactive overlays: Ventilation vectors, Daylight penetration cones, Acoustic/Sightline privacy zones, and Courtyard vistas.
   - "Copy to L2–L9" animation demonstrating our hackathon BIM efficiency strategy.

5. **Facade Family Lab**:
   - Demonstrates our "One Family, Four Faces" Revit strategy: 1 nested parametric curtain panel family driving all 4 elevations via instance parameters.
   - Real-time sliders for fin depth, spacing, rotation angle, louvre depth, and jaali porosity.

6. **Structure & Rebar Detailing**:
   - Dual lateral load-resisting RC skeleton: 8x8m column bays, twin 250mm shear-wall elevator/stair cores resisting 82% of base shear in Seismic Zone IV.
   - Animated 2D beam cross-section SVG with 135° seismic hooks per IS 13920:2016 and clear cover callouts.
   - Gravity and lateral load-path stress flow animations.

7. **Area, FAR & Impact Dashboard**:
   - 10,240 m² above-ground built-up area (80% Residential: 8,192 m², 20% Commercial: 2,048 m²).
   - Dynamic FAR calculator against the 60x60m (3,600 m²) plot.
   - Interactive Eco-Niwas Samhita 2018 RETV estimator comparing AANGAN (11.4 W/m²) against the 15.0 W/m² national ceiling and unshaded box towers (24.2 W/m²).

8. **Code & Fire-Safety Compliance Checklist**:
   - Interactive audit for NBCS 2026 (SP 7:2026), IS 456:2000, IS 13920:2016, IS 1893:2016, IS 875, and Model Building Bye-Laws 2016.
   - Direct 3D camera focus triggers highlighting setbacks, stair cores, columns, and basement EV bays.

9. **Site & Plot Circulation Plan**:
   - 60x60m corner plot with 10–14m continuous fire-tender turning ring (turning radius > 12m).
   - Basement parking plan with 72 total bays and 15 EV-ready bays (20.8% quota).

10. **Revit Execution Timeline & 30-Second Walkthrough**:
    - 8-stage Revit workflow demonstrating BIM assembly from grids to schedules.
    - Scripted 30-second camera flight path with timeline scrubber and contextual subtitles.

11. **Risk Mitigation, Team Roles & 12 Authoritative References**:
    - 6 interactive 3D flip-cards with mitigations and 4 rule-compliance badges.
    - Team roles highlighting model layer ownership.
    - 12 statutory literature citations.

---

## Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **3D Engine**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Physics & Simulation**: Custom mathematical models in `src/sim/` (Cooper's solar equations, buoyancy stack hydrostatic equations, BEE RETV formulas)
- **Charts**: Recharts
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Offline & Standalone**: Zero external image or database calls; runs 100% offline with procedural SVG and Three.js geometry.

---

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with the prototype.

### 3. Production Build
```bash
npm run build
```
Generates production-optimized static assets in `dist/`.

### 4. Static Deployment
Deployable directly as static files on Vercel, Netlify, or GitHub Pages:
```bash
npm run preview
```

---

## Keyboard Shortcuts

- `1` – `9`: Instant jump to sections 1 through 9
- `F`: Toggle Jury Presentation Mode (auto-advancing demo)
- `D`: Toggle Day / Night lighting mode
- `Space`: Pause / Play solar trajectory or walkthrough
- `Esc`: Close comparison modal

---

## Assumptions & Limitations

> [!NOTE]
> All simulations in this web companion (solar radiation, buoyancy stack effect, temperature reduction, and RETV calculations) are **illustrative engineering approximations** built to allow hackathon judges to interactively stress-test design parameters in real-time.
> 
> The **authoritative, contractual architectural geometry, LOD 350 BIM models, construction drawings, and full numerical CFD/Forma environmental analyses** are produced directly within **Autodesk Revit 2026** and **Autodesk Forma**.
