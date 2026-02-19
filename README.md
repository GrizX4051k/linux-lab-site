# Linux Lab Site

A focused place to track my journey from “Linux user” to **Linux‑first engineer** – with command logs, labs, and resources all in one spot.

This repo powers my live Linux Lab site:

> 🔗 **Live site:** https://grizx4051k.github.io/linux-lab-site/

---

<p align="center">

  <span>
    <img
      src="https://github-readme-stats-five-delta-54.vercel.app/api?username=GrizX4051k&show_icons=true&theme=radical&include_all_commits=true&count_private=true&hide_rank=false&number_format=long"
      alt="GitHub stats for GrizX4051k"
      style="display:inline-block;" />
  </span>

  <span>
    <img
      src="https://github-readme-stats-five-delta-54.vercel.app/api/top-langs/?username=GrizX4051k&layout=compact&langs_count=6&theme=radical&hide=javascript,typescript,html,css,c,c%2B%2B"
      alt="Top shell usage"
      style="display:inline-block;" />
  </span>

  <span>
    <a href="https://github.com/GrizX4051k/linux-lab-site">
      <img
        src="https://github-readme-stats-five-delta-54.vercel.app/api/pin/?username=GrizX4051k&repo=linux-lab-site&theme=radical&show_owner=true"
        alt="linux-lab-site repo card"
        style="display:inline-block;" />
    </a>
  </span>

</p>

> Note: the language card hides everything except **Shell** to highlight the Linux‑focused nature of this repo.

---

## Why this repo exists

I wanted more than random terminal screenshots and notes scattered across machines.

This Linux Lab is where I:

- Practice **real commands** on a real system and log the sessions.  
- Turn those logs into **structured topics** (files, networking, services, scripting, etc.).  
- Present everything in a clean web UI so I (and others) can quickly review and learn.

If you’re curious how I work in Linux day‑to‑day, this is the best place to see it.

---

## How I run the lab site locally

This is a static site (HTML/CSS/JS), so running it locally is simple.

### 1. Clone the repo

```bash
git clone https://github.com/GrizX4051k/linux-lab-site.git
cd linux-lab-site
2. Option A – open directly in a browser
On most systems you can just double‑click index.html or:

bash
# Linux/macOS
xdg-open index.html    # or: open index.html on macOS

# Windows
start index.html
3. Option B – run a small dev server (recommended)
This avoids any issues with file:// URLs and makes it easier to extend the site later.

Using Python:

bash
python -m http.server 8000
# then visit http://localhost:8000
Or use any static server you like (VS Code Live Server, npx serve, etc.).

How I use this lab
Command logging with script
On my Linux machine (Ubuntu), I record practice sessions like this:

bash
mkdir -p logs
script -a logs/2026-02-18-files-and-permissions.log
# ...practice commands...
exit   # stops recording
Each log is then linked from the site so I can replay what I did and annotate it.
```
## Topics I track

Over time I’m building out sections such as:

- **Basics:** navigation, files, permissions, processes.  
- **Scripting:** bash scripts, loops, conditionals, small automation.  
- **Networking:** `ssh`, `scp`, `curl`, `ping`, basic troubleshooting.  
- **System:** services, logs, package management, monitoring tools.  
- **Security:** users/groups, sudo, simple hardening habits.  

Progress in each area comes from how many logs and notes I’ve completed.

---

## Tech stack

The site is deliberately lightweight:

- **Frontend:** HTML5, modern CSS, vanilla JavaScript.  
- **Hosting:** GitHub Pages (served from this repo).  
- **Data source:** plain text logs plus markdown‑style notes.  

This makes it easy to browse on any machine (including inside a VM or WSL) with no build step.

---

## Roadmap

Things I’d like to add next:

- A searchable **command reference** generated from my logs (for example, “show me every time I used `find`”).  
- A small **API or JSON export** so I can integrate these logs into other tools.  
- More visual **dashboards** for progress (topics completed, hours logged, etc.).  

---

## About me

I’m **Manish Kumar** (`@GrizX4051k`), a web and mobile developer who is intentionally leveling up as a **Linux‑first engineer** – learning the command line, system internals, and security fundamentals one session at a time.

If you find a bug, have feedback, or want to suggest new lab ideas, feel free to open an issue or start a discussion in this repo.
