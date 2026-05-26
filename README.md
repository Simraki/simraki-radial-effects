# Simraki's Radial Effects

![Foundry Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FSimraki%2Fsimraki-radial-effects%2Fmaster%2Fmodule.json&label=Foundry%20Version&query=$.compatibility.verified&colorB=orange&style=for-the-badge)
![System](https://img.shields.io/badge/System-D%26D%205e-red?style=for-the-badge)

![GitHub issues](https://img.shields.io/github/issues-raw/Simraki/simraki-radial-effects?style=for-the-badge)
![Latest Release Download Count](https://img.shields.io/github/downloads/Simraki/simraki-radial-effects/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge)
![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FSimraki%2Fsimraki-radial-effects%2Fmaster%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)
![GitHub all releases downloads](https://img.shields.io/github/downloads/Simraki/simraki-radial-effects/total?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Simraki's Radial Effects** enhances how active effect icons are displayed around tokens.  
Effects are arranged in adjustable **orbits** (circle, square, hexagon) with customizable icon shapes, hover
interactions, tooltips, and click actions.

---

## Features

- **Radial effect placement** - Icons orbit the token, automatically arranged in rings
- **Multiple orbit shapes** - Circle, square, or hexagon (pointy or flat top)
- **Customizable icon appearance**
    - Shape: circle, rounded square, hexagon, triangle
    - Background & border colors
    - Size multiplier and opacity
- **Interactive icons**
    - Click actions: disable or delete the effect (GM / owner permissions)
    - Hover scaling animation
- **Tooltips** (effect name, duration, description, source)
- **Fine‑grained visibility** - Who sees tooltips? GM only, owners, etc.

---

## How It Works

**Icon (hex) example**

<img src="/media/hex_icons.webp" />

**Tooltip example**

<img src="/media/tooltip.webp" />

---

## Settings

| Setting                           | Description                                                                                                         |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------|
| **GM Click Action**               | What happens when GM clicks an effect: Nothing / Disable / Delete                                                   |
| **Owner Click Action**            | Same for token owners                                                                                               |
| **Tooltip Visibility**            | Who can see effect tooltips (Disabled / GM only / Owners only / Any Player's token / Friendly & Neutral / Everyone) |
| **Tooltip Content (GM / Player)** | Show Duration, Description, Source                                                                                  |
| **Require Alt Key**               | Hover/click only works while holding Alt                                                                            |
| **Effect Icon Shape**             | Icon shape                                                                                                          |
| **Effect Background Color**       | Fill icon color of the icon frame                                                                                   |
| **Effect Border Color**           | Stroke color of the icon frame                                                                                      |
| **Effect Size Multiplier**        | Scale of effect icons                                                                                               |
| **Effect Opacity**                | Opacity when not hovered                                                                                            |
| **Orbit Trajectory**              | Geometric path: Circle, Square, Hexagon                                                                             |
| **Icon Spacing**                  | Distance multiplier between icons on the same ring                                                                  |
| **Start Angle**                   | Starting angle for the first icon                                                                                   |
| **Base Orbit Radius**             | Radius multiplier for the first ring                                                                                |
| **Reverse Direction**             | Place icons clockwise instead of counter‑clockwise                                                                  |
| **Enable Hover Animation**        | Scale up icon on mouse hover                                                                                        |
| **Tooltip Delay**                 | Milliseconds before tooltip appears                                                                                 |

---

## Compatibility

- **libWrapper**
- **D&D 5e system**

---

## License

This package is under an [MIT](LICENSE) license and
the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).
