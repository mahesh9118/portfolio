// Mahesh Chavhan portfolio: API console and theme toggle
(function () {
  var DATA = {
    mahesh: {
      name: "Mahesh Chavhan",
      role: "Technical Support Engineer (fresher)",
      education: "MCA, Thakur College of Engineering and Technology",
      batch: 2027,
      cgpa: 8.48,
      focus: ["Java", "SQL", "REST APIs", "Troubleshooting"],
      location: "Yavatmal, Maharashtra"
    },
    skills: {
      support: ["Technical Troubleshooting", "Issue Resolution", "Root Cause Analysis", "API and SQL Debugging", "API Testing"],
      languages: ["Java", "SQL", "JavaScript", "C"],
      databases: ["MySQL", "PostgreSQL", "Oracle SQL"],
      backend: ["Spring Boot", "Spring MVC", "JDBC", "REST APIs", "Spring Security", "JWT"],
      tools: ["Git", "GitHub", "IntelliJ IDEA", "Eclipse", "VS Code"]
    },
    projects: [
      { name: "ReserveNow", summary: "Classroom availability and occupancy system", stack: ["Java", "Spring Boot", "MySQL", "React.js"] },
      { name: "EVCWard", summary: "EV charging station platform", stack: ["Spring Boot", "JWT", "MySQL", "HTML", "CSS", "JavaScript"] }
    ],
    contact: {
      email: "maheshchavhan9118@gmail.com",
      phone: "+91 73508 57701",
      linkedin: "linkedin.com/in/mahesh-chavhan-80942529b",
      github: "github.com/mahesh9118",
      hackerrank: "hackerrank.com/profile/maheshchavhan911"
    }
  };

  var out = document.getElementById("out");
  var req = document.getElementById("req");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".console-bar button"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var run = 0;

  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function paint(json) {
    return esc(json).replace(/("(?:\\.|[^"\\])*")(\s*:)?|\b(\d+(?:\.\d+)?)\b/g, function (m, str, colon, num) {
      if (str) return colon ? '<span class="k">' + str + "</span>" + colon : '<span class="s">' + str + "</span>";
      return '<span class="n">' + num + "</span>";
    });
  }

  function show(ep) {
    var id = ++run;
    tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.dataset.ep === ep)); });
    req.textContent = "GET /" + ep;
    var lines = paint(JSON.stringify(DATA[ep], null, 2)).split("\n");
    out.setAttribute("aria-busy", "true");
    out.innerHTML = "";
    if (reduce) {
      out.innerHTML = lines.join("\n");
      out.setAttribute("aria-busy", "false");
      return;
    }
    var i = 0;
    (function next() {
      if (id !== run) return;
      if (i >= lines.length) { out.setAttribute("aria-busy", "false"); return; }
      out.insertAdjacentHTML("beforeend", (i ? "\n" : "") + lines[i++]);
      setTimeout(next, 45);
    })();
  }

  tabs.forEach(function (t) {
    t.setAttribute("aria-controls", "out");
    t.addEventListener("click", function () { show(t.dataset.ep); });
  });
  show("mahesh");

  var root = document.documentElement;
  document.getElementById("themeBtn").addEventListener("click", function () {
    var current = root.getAttribute("data-theme");
    if (!current) current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    root.setAttribute("data-theme", current === "dark" ? "light" : "dark");
  });
})();
