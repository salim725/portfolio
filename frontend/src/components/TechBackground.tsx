const LOGOS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",          size: 72,  top: "8%",   left: "5%",   dur: 14, delay: 0   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", size: 56,  top: "15%",  left: "88%",  dur: 18, delay: 2   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",         size: 80,  top: "72%",  left: "3%",   dur: 20, delay: 4   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",       size: 60,  top: "80%",  left: "90%",  dur: 16, delay: 1   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", size: 52,  top: "45%",  left: "94%",  dur: 22, delay: 5   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", size: 48,  top: "55%",  left: "2%",   dur: 17, delay: 3   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",               size: 58,  top: "30%",  left: "91%",  dur: 19, delay: 6   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",       size: 64,  top: "90%",  left: "45%",  dur: 15, delay: 2.5 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",size:54,  top: "5%",   left: "55%",  dur: 21, delay: 7   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",           size: 50,  top: "65%",  left: "78%",  dur: 13, delay: 1.5 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",             size: 46,  top: "20%",  left: "18%",  dur: 24, delay: 8   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",         size: 50,  top: "88%",  left: "22%",  dur: 18, delay: 3.5 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",         size: 56,  top: "40%",  left: "7%",   dur: 20, delay: 6.5 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",       size: 48,  top: "10%",  left: "74%",  dur: 16, delay: 4.5 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",         size: 52,  top: "60%",  left: "55%",  dur: 23, delay: 9   },
];

export default function TechBackground() {
  return (
    <>
      <style>{`
        @keyframes bgFloat {
          0%   { transform: translateY(0px)   rotate(0deg);   }
          33%  { transform: translateY(-18px)  rotate(4deg);   }
          66%  { transform: translateY(8px)   rotate(-3deg);  }
          100% { transform: translateY(0px)   rotate(0deg);   }
        }
        .bg-logo {
          position: fixed;
          pointer-events: none;
          user-select: none;
          opacity: 0.07;
          filter: saturate(0.6) brightness(1.4);
          z-index: 0;
          animation: bgFloat linear infinite alternate;
          transition: opacity 0.3s;
        }
        .bg-logo:hover { opacity: 0.18 !important; }
      `}</style>

      {LOGOS.map((l, i) => (
        <img
          key={i}
          src={l.src}
          alt=""
          className="bg-logo"
          style={{
            width:  l.size,
            height: l.size,
            top:    l.top,
            left:   l.left,
            animationDuration:  `${l.dur}s`,
            animationDelay:     `${l.delay}s`,
          }}
          draggable={false}
        />
      ))}
    </>
  );
}
