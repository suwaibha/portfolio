import { useState, useRef, useEffect } from 'react'
import {
  Link2, Mail, MapPin, GraduationCap, Briefcase,
  Download, Eye, ExternalLink, Code2, Layers, Database,
  Sparkles, Trophy, Rocket, Brain, Users, CheckCircle2,
} from 'lucide-react'

// lucide-react dropped brand/logo icons in this version; reuse generic equivalents
const Github = ExternalLink
const Linkedin = Link2

const LINKS = {
  email: 'suwaibharauf08@gmail.com',
  phone: '+91-8317347169',
  github: 'https://github.com/suwaibha',
  githubUser: 'suwaibha',
  linkedin: 'https://www.linkedin.com/in/suwaibha-fatima-b567212a8/', 
  leetcode: 'https://leetcode.com/u/Suwaibha/', 
  location: 'Bengaluru, Karnataka, India',
}

const PROJECTS = [
  {
    id: 'prepvio',
    name: 'PrepVio',
    tagline: 'AI-powered interview preparation platform',
    problem: 'Candidates rarely get to rehearse interviews under realistic, pressure-like conditions before the real thing.',
    solution: 'PrepVio simulates a real interview end to end — voice-based mock interviews, a live coding round, and performance feedback — so candidates can practice the way they\u2019ll actually be tested.',
    features: [
      'Voice-based mock interviews',
      'Real-time coding environment',
      'Interview practice workflows',
      'Candidate performance tracking',
      'Interactive interview experience',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebRTC'],
    live: 'https://www.prepvio.in',
    github: LINKS.github,
    status: 'live',
  },
  {
    id: 'krishimitra',
    name: 'KrishiMitra',
    tagline: 'Agriculture-focused platform for smarter farming decisions',
    problem: 'Farmers often lack quick, localized access to digital tools and crop/weather information needed to make informed decisions.',
    solution: 'KrishiMitra gives farmers a simple dashboard with agricultural insights and resource management, in their own language, so decisions are easier to make.',
    features: [
      'Farmer dashboard',
      'Agricultural insights',
      'Resource management',
      'Easy-to-use interface',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://krishi-mitra-dng7.onrender.com',
    github: LINKS.github,
    status: 'live',
  },
  {
    id: 'jobportal',
    name: 'Job Portal',
    tagline: 'Recruitment platform connecting job seekers and recruiters',
    problem: 'Job seekers and recruiters need one reliable place to post, find, and track applications without juggling spreadsheets and email threads.',
    solution: 'A full-stack job portal with secure authentication and role-based dashboards, so recruiters manage postings and candidates while applicants track status in one place.',
    features: [
      'Authentication system',
      'Job posting',
      'Job applications',
      'Recruiter dashboard',
      'Candidate management',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://job-portal-full-stack-client-chi-black.vercel.app/',
    github: LINKS.github,
    status: 'live',
  },
  {
    id: 'launchpad',
    name: 'LaunchPad',
    tagline: 'Career development platform for students',
    problem: 'Students juggle job hunting, resume tailoring, and interview prep across scattered tools with no single place to track progress.',
    solution: 'LaunchPad brings opportunity discovery, learning resources, and a career dashboard into one place so students can track their job-search progress over time.',
    features: [
      'Opportunity discovery',
      'Learning resources',
      'Career dashboard',
      'Progress tracking',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    live: null,
    github: LINKS.github,
    status: 'building',
  },
]

const SKILLS = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express.js'],
  Database: ['MongoDB', 'MySQL'],
  Programming: ['JavaScript', 'Python', 'C'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Postman'],
  'Currently Learning': ['Next.js', 'TypeScript', 'Docker'],
}

const WHY_ME = [
  { icon: Layers, text: 'Built multiple full-stack applications using the MERN stack.' },
  { icon: Database, text: 'Strong understanding of frontend, backend, and database integration.' },
  { icon: Rocket, text: 'Experience building complete projects from idea to deployment.' },
  { icon: Brain, text: 'Continuously practicing Data Structures and Algorithms.' },
  { icon: Sparkles, text: 'Quick learner with strong problem-solving ability.' },
  { icon: Users, text: 'Passionate about creating user-focused software products.' },
]

const ACHIEVEMENTS = [
  { icon: Trophy, text: 'Built 4+ full-stack projects.' },
  { icon: Layers, text: 'Developed MERN stack applications end to end.' },
  { icon: Users, text: 'Participated in technical events and hackathons.' },
  { icon: Brain, text: 'Continuously improving DSA and problem-solving skills.' },
  { icon: CheckCircle2, text: 'Built projects solving real-world problems.' },
]

const DSA_TOPICS = ['Arrays', 'Linked Lists', 'Hash Maps', 'Stacks', 'Queues', 'Trees', 'Sorting', 'Recursion']

const FILES = [
  { id: 'about', label: 'about.js' },
  { id: 'skills', label: 'skills.json' },
  { id: 'why-me', label: 'why-me.md' },
  {
    id: 'projects',
    label: 'projects/',
    children: PROJECTS.map((p) => ({ id: p.id, label: `${p.id}.jsx` })),
  },
  { id: 'leetcode', label: 'leetcode.js' },
  { id: 'achievements', label: 'achievements.md' },
  { id: 'education', label: 'education.md' },
  { id: 'currently', label: 'currently.js' },
  { id: 'github', label: 'github.js' },
  { id: 'resume', label: 'resume.pdf' },
  { id: 'contact', label: 'contact.sh' },
]

// ---------- small shared bits ----------

function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(progress * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

function MetricsBar() {
  const projectCount = useCountUp(4)
  return (
    <div className="metrics-bar">
      <div className="metric">
        <div className="metric-value">{projectCount}+</div>
        <div className="metric-label">Projects Built</div>
      </div>
      <div className="metric">
        <div className="metric-value">MERN</div>
        <div className="metric-label">Tech Stack</div>
      </div>
      <div className="metric">
        <div className="metric-value">Full Stack</div>
        <div className="metric-label">Focus Area</div>
      </div>
      <div className="metric">
        <div className="metric-value"><span className="status-dot" />Open</div>
        <div className="metric-label">To Internships</div>
      </div>
    </div>
  )
}

function StatusPill({ status }) {
  if (status === 'building') {
    return <span className="status-pill building">in progress</span>
  }
  return <span className="status-pill live">live</span>
}

// ---------- views ----------

function AboutView() {
  return (
    <>
      <p className="headline">// about.js</p>
      <h1 className="h1">
        Suwaibha Fatima 
        {/* <br />
        <span className="accent"></span> Full Stack Developer | Software Development Engineer (SDE) */}
      </h1>
      <h2 className="h2">
        Full Stack Developer | Software Development Engineer (SDE)
      </h2>
      <p className="lede">
        Computer Science student building production-ready web applications using React, Node.js,
        Express, and MongoDB. Experienced in developing AI-powered platforms, recruitment systems,
        agricultural solutions, and career-focused products.
      </p>

      <div className="badge-row">
        <span className="info-badge"><MapPin size={13} /> Bangalore, India</span>
        <span className="info-badge"><GraduationCap size={13} /> B.Tech Computer Science</span>
        <span className="info-badge"><Briefcase size={13} /> Open to Software Engineering &amp; Full Stack Internships</span>
      </div>

      <div className="cta-row">
        <a className="cta-btn primary" href={`mailto:${LINKS.email}`}><Mail size={14} /> Get In Touch</a>
        <a className="cta-btn" href={LINKS.github} target="_blank" rel="noreferrer"><Github size={14} /> View GitHub</a>
        <a className="cta-btn" href={LINKS.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} /> Connect on LinkedIn</a>
        <a className="cta-btn" href="/resume.pdf" download><Download size={14} /> Download Resume</a>
      </div>

      <MetricsBar />

      <div className="section-title">who I am</div>
      <p className="lede" style={{ marginBottom: 12 }}>
        I am a Computer Science student passionate about building software that solves real-world
        problems.
      </p>
      <p className="lede" style={{ marginBottom: 12 }}>
        My focus is full stack web development using React, Node.js, Express, and MongoDB. I enjoy
        transforming ideas into complete products, from designing user interfaces to developing
        backend systems and databases.
      </p>
      <p className="lede" style={{ marginBottom: 12 }}>
        I have worked on projects in interview preparation, agriculture, recruitment, and career
        development platforms.
      </p>
      <p className="lede">
        I continuously improve my problem-solving skills through Data Structures and Algorithms
        while exploring modern technologies and best practices in software engineering.
      </p>
    </>
  )
}

function SkillsView() {
  let i = 0
  return (
    <>
      <p className="headline">// skills.json</p>
      <h1 className="h1">Skills</h1>
      <p className="lede">The stack I build and ship with — plus what's next.</p>

      {Object.entries(SKILLS).map(([group, items]) => (
        <div className="skill-block" key={group}>
          <div className="skill-block-label">"{group.toLowerCase().replace(/ /g, '_')}":</div>
          <div className="skill-chip-row">
            {items.map((s) => {
              i += 1
              return (
                <span
                  className={`skill-chip fade-in-up ${group === 'Currently Learning' ? 'learning' : ''}`}
                  style={{ animationDelay: `${i * 35}ms` }}
                  key={s}
                >
                  {s}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

function WhyMeView() {
  return (
    <>
      <p className="headline">// why-me.md</p>
      <h1 className="h1">Why Hire Me?</h1>
      <p className="lede">A quick case, in six points.</p>
      <div className="why-grid">
        {WHY_ME.map((item, idx) => {
          const Icon = item.icon
          return (
            <div className="why-card fade-in-up" style={{ animationDelay: `${idx * 60}ms` }} key={idx}>
              <Icon size={18} className="why-icon" />
              <p>{item.text}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

function ProjectsIndexView({ onOpen }) {
  return (
    <>
      <p className="headline">// projects/</p>
      <h1 className="h1">Projects</h1>
      <p className="lede">Four builds, idea to deployment — open a file in the sidebar for the full breakdown.</p>
      {PROJECTS.map((p) => (
        <div className="project-card" key={p.id}>
          <div className="project-head">
            <span className="project-name">
              {p.name} <StatusPill status={p.status} />
            </span>
            {p.live ? (
              <a className="project-link" href={p.live} target="_blank" rel="noreferrer">
                {p.live.replace('https://', '')} <ExternalLink size={11} />
              </a>
            ) : (
              <span className="project-link dim">not deployed yet</span>
            )}
          </div>
          <div className="project-stack">{p.stack.join(' · ')}</div>
          <div className="project-body">
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 0 }}>{p.tagline}</p>
            <button className="cta-btn" style={{ fontSize: 12 }} onClick={() => onOpen(p.id)}>
              open {p.id}.jsx →
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

function ProjectDetailView({ project }) {
  return (
    <>
      <p className="headline">// projects/{project.id}.jsx</p>
      <h1 className="h1">
        {project.name} <StatusPill status={project.status} />
      </h1>
      <p className="lede" style={{ marginBottom: 14 }}>{project.tagline}</p>

      <div className="tag-row">
        {project.stack.map((s) => (
          <span className="tag" key={s}>{s}</span>
        ))}
      </div>

      <div className="cta-row" style={{ marginBottom: 8 }}>
        {project.live ? (
          <a className="cta-btn primary" href={project.live} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Live Demo
          </a>
        ) : (
          <span className="cta-btn disabled"><ExternalLink size={14} /> Not deployed yet</span>
        )}
        <a className="cta-btn" href={project.github} target="_blank" rel="noreferrer">
          <Github size={14} /> GitHub
        </a>
      </div>

      <div className="section-title">problem</div>
      <p className="lede" style={{ marginBottom: 4 }}>{project.problem}</p>

      <div className="section-title">solution</div>
      <p className="lede" style={{ marginBottom: 4 }}>{project.solution}</p>

      <div className="section-title">features</div>
      <ul style={{ paddingLeft: 18 }}>
        {project.features.map((f, i) => (
          <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.7, marginBottom: 8 }}>
            {f}
          </li>
        ))}
      </ul>

      <div className="section-title">tech stack</div>
      <div className="tag-row">
        {project.stack.map((s) => (
          <span className="tag" key={s}>{s}</span>
        ))}
      </div>
    </>
  )
}

function LeetCodeView() {
  return (
    <>
      <p className="headline">// leetcode.js</p>
      <h1 className="h1">Data Structures &amp; Algorithms</h1>
      <p className="lede">Currently practicing:</p>
      <div className="skill-chip-row" style={{ marginBottom: 26 }}>
        {DSA_TOPICS.map((t) => (
          <span className="skill-chip" key={t}>{t}</span>
        ))}
      </div>
      <div className="cta-row">
        <a className="cta-btn primary" href={LINKS.leetcode} target="_blank" rel="noreferrer">
          <Code2 size={14} /> LeetCode Profile
        </a>
        <a className="cta-btn" href={LINKS.github} target="_blank" rel="noreferrer">
          <Github size={14} /> GitHub Profile
        </a>
      </div>
      <p className="note-text">
        Live LeetCode stats aren't shown here — LeetCode doesn't offer a public, reliable API, so a
        "stats widget" would either break often or show made-up numbers. The profile link above is
        always accurate.
      </p>
    </>
  )
}

function AchievementsView() {
  return (
    <>
      <p className="headline">// achievements.md</p>
      <h1 className="h1">Achievements</h1>
      <div className="achv-list">
        {ACHIEVEMENTS.map((a, idx) => {
          const Icon = a.icon
          return (
            <div className="achv-row fade-in-up" style={{ animationDelay: `${idx * 60}ms` }} key={idx}>
              <Icon size={16} className="achv-icon" />
              <span>{a.text}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

function EducationView() {
  return (
    <>
      <p className="headline">// education.md</p>
      <h1 className="h1">Education</h1>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-period">2023 — 2027</div>
            <strong>Bachelor of Technology, Computer Science Engineering</strong>
            <div>Garden City University, Bangalore</div>
            <div className="timeline-meta">Current CGPA: 9.5 / 10 (through 3rd year)</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-period">2023</div>
            <strong>12th (PUC) — 81.2%</strong>
            <div>Vidya Bharati Shikshana Kendra, Raichur</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-period">2021</div>
            <strong>10th (SSLC) — 82.2%</strong>
            <div>Vidya Bharati Shikshana Kendra, Raichur</div>
          </div>
        </div>
      </div>
    </>
  )
}

function CurrentlyView() {
  return (
    <>
      <p className="headline">// currently.js</p>
      <h1 className="h1">Currently</h1>

      <div className="section-title">learning</div>
      <div className="skill-chip-row" style={{ marginBottom: 26 }}>
        {SKILLS['Currently Learning'].map((s) => (
          <span className="skill-chip learning" key={s}>{s}</span>
        ))}
      </div>

      <div className="section-title">seeking</div>
      <div className="skill-chip-row">
        <span className="skill-chip">Software Engineering Internship</span>
        <span className="skill-chip">Full Stack Developer Internship</span>
      </div>
    </>
  )
}

function GithubView() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${LINKS.githubUser}`),
          fetch(`https://api.github.com/users/${LINKS.githubUser}/repos?per_page=100`),
        ])
        if (!pRes.ok || !rRes.ok) throw new Error('GitHub API request failed')
        const p = await pRes.json()
        const r = await rRes.json()
        if (!cancelled) {
          setProfile(p)
          setRepos(r)
        }
      } catch (e) {
        if (!cancelled) setError('Could not load live GitHub data right now — view the profile directly below.')
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const topLanguages = repos
    ? Object.entries(
        repos.reduce((acc, repo) => {
          if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1
          return acc
        }, {})
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : []

  const recent = repos
    ? [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 5)
    : []

  return (
    <>
      <p className="headline">// github.js</p>
      <h1 className="h1">GitHub</h1>
      <p className="lede">Live data, pulled straight from the GitHub API.</p>

      {error && <p className="note-text">{error}</p>}

      {profile && repos && (
        <>
          <div className="metrics-bar" style={{ marginTop: 0 }}>
            <div className="metric">
              <div className="metric-value">{repos.length}</div>
              <div className="metric-label">Public Repos</div>
            </div>
            <div className="metric">
              <div className="metric-value">{profile.followers}</div>
              <div className="metric-label">Followers</div>
            </div>
            <div className="metric">
              <div className="metric-value">{topLanguages[0]?.[0] || '—'}</div>
              <div className="metric-label">Top Language</div>
            </div>
            <div className="metric">
              <div className="metric-value">{profile.public_gists}</div>
              <div className="metric-label">Public Gists</div>
            </div>
          </div>

          <div className="section-title">top languages</div>
          <div className="skill-chip-row" style={{ marginBottom: 26 }}>
            {topLanguages.length ? topLanguages.map(([lang, count]) => (
              <span className="skill-chip" key={lang}>{lang} · {count}</span>
            )) : <span className="note-text">No public language data yet.</span>}
          </div>

          <div className="section-title">recent activity</div>
          <ul style={{ paddingLeft: 18 }}>
            {recent.map((repo) => (
              <li key={repo.id} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 6 }}>
                <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-teal)', textDecoration: 'none' }}>
                  {repo.name}
                </a>{' '}
                — updated {new Date(repo.updated_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}

      {!profile && !error && <p className="note-text">Loading live GitHub data…</p>}

      <div className="cta-row">
        <a className="cta-btn primary" href={LINKS.github} target="_blank" rel="noreferrer">
          <Github size={14} /> View Full Profile
        </a>
      </div>
    </>
  )
}

function ResumeView() {
  return (
    <>
      <p className="headline">// resume.pdf</p>
      <h1 className="h1">Resume</h1>
      <p className="lede">Full-stack developer resume — view it in the browser or download a copy.</p>
      <div className="cta-row">
        <a className="cta-btn primary" href="/resume.pdf" download>
          <Download size={14} /> Download Resume
        </a>
        <a className="cta-btn" href="/resume.pdf" target="_blank" rel="noreferrer">
          <Eye size={14} /> View Resume
        </a>
      </div>
      <p className="note-text">
        This links to the resume file bundled with the site at <code>/public/resume.pdf</code> —
        swap that file any time you update your resume, no code changes needed.
      </p>
    </>
  )
}

function ContactView() {
  return (
    <>
      <p className="headline">// contact.sh</p>
      <h1 className="h1">Let's talk</h1>
      <p className="lede">Open to software engineering internships and full stack developer roles.</p>
      <div className="contact-line">
        <span className="contact-key">email</span>
        <span className="contact-val"><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></span>
      </div>
      <div className="contact-line">
        <span className="contact-key">phone</span>
        <span className="contact-val">{LINKS.phone}</span>
      </div>
      <div className="contact-line">
        <span className="contact-key">github</span>
        <span className="contact-val"><a href={LINKS.github} target="_blank" rel="noreferrer">{LINKS.github.replace('https://', '')}</a></span>
      </div>
      <div className="contact-line">
        <span className="contact-key">linkedin</span>
        <span className="contact-val"><a href={LINKS.linkedin} target="_blank" rel="noreferrer">{LINKS.linkedin.replace('https://', '')}</a></span>
      </div>
      <div className="contact-line">
        <span className="contact-key">location</span>
        <span className="contact-val">{LINKS.location}</span>
      </div>
      <div className="cta-row">
        <a className="cta-btn primary" href={`mailto:${LINKS.email}`}>./send_email.sh</a>
      </div>
    </>
  )
}

// ---------- terminal (signature interactive element) ----------

const HELP_LINES = [
  'Available Commands:',
  '',
  '  about         skills        projects      whyme',
  '  leetcode      achievements  education     currently',
  '  github        resume        linkedin      contact',
  '  clear',
]

function Terminal({ onNavigate, height, setHeight }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome — type `help` to see what this terminal can do.' },
  ])
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  function run(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase()
    const next = [...history, { type: 'cmd', text: cmdRaw }]

    if (!cmd) {
      setHistory(next)
      return
    }

    const goTo = (id, msg) => {
      next.push({ type: 'output', text: msg })
      onNavigate(id)
    }

    switch (cmd) {
      case 'help':
        next.push({ type: 'output', lines: HELP_LINES })
        break
      case 'about':
        goTo('about', 'Suwaibha Fatima — full stack developer (MERN), CS student at Garden City University. Open to internships.')
        break
      case 'skills':
        goTo('skills', 'React, Node, Express, MongoDB, MySQL, Python, C — full breakdown opened in the editor.')
        break
      case 'projects':
        goTo('projects', 'PrepVio · KrishiMitra · Job Portal · LaunchPad — opened in the editor.')
        break
      case 'whyme':
      case 'why-me':
        goTo('why-me', 'Six reasons, opened in the editor.')
        break
      case 'leetcode':
        goTo('leetcode', 'DSA practice topics opened in the editor.')
        break
      case 'achievements':
        goTo('achievements', 'Achievements opened in the editor.')
        break
      case 'education':
        goTo('education', 'B.Tech CS, Garden City University — CGPA 9.5/10. Opened in the editor.')
        break
      case 'currently':
        goTo('currently', 'What I\u2019m learning and what I\u2019m looking for — opened in the editor.')
        break
      case 'github':
        goTo('github', 'Pulling live GitHub data…')
        break
      case 'resume':
        goTo('resume', 'Resume view opened — download or view in the editor.')
        break
      case 'linkedin':
        next.push({ type: 'output', text: `Opening ${LINKS.linkedin}` })
        window.open(LINKS.linkedin, '_blank')
        break
      case 'contact':
        goTo('contact', `${LINKS.email} · ${LINKS.phone} — opened in the editor.`)
        break
      case 'prepvio':
      case 'krishimitra':
      case 'jobportal':
      case 'launchpad':
        goTo(cmd, `Opening ${cmd}.jsx…`)
        break
      case 'whoami':
        next.push({ type: 'output', text: 'suwaibha-fatima — full-stack-developer' })
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        next.push({ type: 'output', text: `command not found: ${cmd} — type 'help' for a list.` })
    }
    setHistory(next)
    setInput('')
  }

  return (
    <div className="terminal" style={{ height }}>
      <div className="terminal-bar">
        <span>● terminal — zsh</span>
        <button onClick={() => setHeight(height > 60 ? 44 : 220)}
         style={{
    fontSize: "13px",
    fontWeight: "600",
    color: "white"
  }}
        >
          {height > 60 ? 'minimize' : 'expand'}
        </button>
      </div>
      {height > 60 && (
        <>
          <div className="terminal-body" ref={bodyRef}>
            {history.map((h, i) =>
              h.type === 'cmd' ? (
                <div className="term-line" key={i}>
                  <span className="term-prompt">suwaibha@portfolio:~$</span> {h.text}
                </div>
              ) : (
                <div className="term-line term-output" key={i}>
                  {h.lines ? h.lines.join('\n') : h.text}
                </div>
              )
            )}
          </div>
          <div className="terminal-input-row">
            <span className="prompt-sym">suwaibha@portfolio:~$</span>
            <form
              className="terminal-form"
              onSubmit={(e) => {
                e.preventDefault()
                run(input)
                inputRef.current?.focus()
              }}
            >
              <input
                ref={inputRef}
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type 'help'"
                aria-label="Portfolio terminal command input"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </>
      )}
    </div>
  )
}

// ---------- minimap (fills the empty right-hand edge) ----------

function hashString(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

function mulberry32(seed) {
  let s = seed
  return function () {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Minimap({ seed, viewport, onJump }) {
  const rand = mulberry32(hashString(seed))
  const lines = Array.from({ length: 48 }, () => {
    const blank = rand() < 0.14
    return { width: blank ? 0 : 18 + rand() * 72, accent: !blank && rand() < 0.16 }
  })

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientY - rect.top) / rect.height
    onJump(Math.min(Math.max(ratio, 0), 1))
  }

  return (
    <button className="minimap" onClick={handleClick} aria-label="Jump to a section of this file" title="Click to jump around the file">
      <div className="minimap-lines">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`minimap-line ${l.accent ? 'accent' : ''}`}
            style={{ width: `${l.width}%` }}
          />
        ))}
      </div>
      <div
        className="minimap-viewport"
        style={{ top: `${viewport.top * 100}%`, height: `${viewport.height * 100}%` }}
      />
    </button>
  )
}

export default function App() {
  const [active, setActive] = useState('about')
  const [termHeight, setTermHeight] = useState(220)
  const contentRef = useRef(null)
  const [viewport, setViewport] = useState({ top: 0, height: 1 })

  const activeProject = PROJECTS.find((p) => p.id === active)

  function updateViewport() {
    const el = contentRef.current
    if (!el) return
    const top = el.scrollHeight > 0 ? el.scrollTop / el.scrollHeight : 0
    const height = el.scrollHeight > 0 ? Math.min(el.clientHeight / el.scrollHeight, 1) : 1
    setViewport({ top, height })
  }

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
    // measure on the next frame, after new content has laid out
    const raf = requestAnimationFrame(updateViewport)
    return () => cancelAnimationFrame(raf)
  }, [active])

  function handleJump(ratio) {
    const el = contentRef.current
    if (!el) return
    el.scrollTop = ratio * (el.scrollHeight - el.clientHeight)
  }

  function renderContent() {
    if (active === 'about') return <AboutView />
    if (active === 'skills') return <SkillsView />
    if (active === 'why-me') return <WhyMeView />
    if (active === 'projects') return <ProjectsIndexView onOpen={setActive} />
    if (activeProject) return <ProjectDetailView project={activeProject} />
    if (active === 'leetcode') return <LeetCodeView />
    if (active === 'achievements') return <AchievementsView />
    if (active === 'education') return <EducationView />
    if (active === 'currently') return <CurrentlyView />
    if (active === 'github') return <GithubView />
    if (active === 'resume') return <ResumeView />
    if (active === 'contact') return <ContactView />
    return <AboutView />
  }

  const activeLabel = activeProject
    ? `${activeProject.id}.jsx`
    : FILES.find((f) => f.id === active)?.label || 'about.js'

  return (
    <div className="app">
      <div className="titlebar">
        <span className="dot red" />
        <span className="dot amber" />
        <span className="dot green" />
        <span className="titlebar-path">~/suwaibha-fatima/portfolio</span>
        <div className="titlebar-right">
          <a className="titlebar-link" href={LINKS.github} target="_blank" rel="noreferrer">github</a>
          <a className="titlebar-link" href={LINKS.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          <a className="titlebar-link" href={`mailto:${LINKS.email}`}>email</a>
        </div>
      </div>

      <div className="body-row">
        <div className="sidebar">
          <div className="sidebar-label">explorer</div>
          {FILES.map((f) =>
            f.children ? (
              <div key={f.id}>
                <button
                  className={`file-item ${active === f.id ? 'active' : ''}`}
                  onClick={() => setActive(f.id)}
                >
                  <span>📁</span> {f.label}
                </button>
                {f.children.map((c) => (
                  <button
                    key={c.id}
                    className={`file-item nested ${active === c.id ? 'active' : ''}`}
                    onClick={() => setActive(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            ) : (
              <button
                key={f.id}
                className={`file-item ${active === f.id ? 'active' : ''}`}
                onClick={() => setActive(f.id)}
              >
                <span>📄</span> {f.label}
              </button>
            )
          )}
          <div className="sidebar-footer">
            <div><span className="status-dot" />open to internships</div>
            <div>Bengaluru, India</div>
          </div>
        </div>

        <div className="editor">
          <div className="tabs">
            <div className="tab active">{activeLabel}</div>
          </div>
          <div className="editor-content-wrap">
            <div className="editor-content" ref={contentRef} onScroll={updateViewport}>
              <div className="editor-content-inner">{renderContent()}</div>
            </div>
            <Minimap seed={activeLabel} viewport={viewport} onJump={handleJump} />
          </div>
        </div>
      </div>

      <div className="statusbar">
        Built and designed by Suwaibha Fatima · Powered by React &amp; Vite
      </div>

      <Terminal onNavigate={setActive} height={termHeight} setHeight={setTermHeight} />
    </div>
  )
}
