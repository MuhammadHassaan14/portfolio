import React, { useState, useEffect, useRef } from 'react';

  var Contact = function() {
    var [name, setName] = useState('');
    var [company, setCompany] = useState('');
    var [projectType, setProjectType] = useState('');
    var [email, setEmail] = useState('');
    var [isMobile, setIsMobile] = useState(false);

    // Badge interaction states
    var [badgeHovered, setBadgeHovered] = useState(false);
    var [badgeTiltX, setBadgeTiltX] = useState(0);
    var [badgeTiltY, setBadgeTiltY] = useState(0);
    var [centerHovered, setCenterHovered] = useState(false);
    var badgeRef = useRef(null);

    useEffect(function() {
      var checkMobile = function() { setIsMobile(window.innerWidth < 768); };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return function() { window.removeEventListener('resize', checkMobile); };
    }, []);

    var handleBadgeMove = function(e) {
      if (centerHovered || !badgeRef.current) return;
      var rect = badgeRef.current.getBoundingClientRect();
      var relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      var relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setBadgeTiltX(-relY * 15);
      setBadgeTiltY(relX * 15);
      setBadgeHovered(true);
    };

    var handleBadgeLeave = function() {
      setBadgeHovered(false);
      setBadgeTiltX(0);
      setBadgeTiltY(0);
    };

    var inputStyle = {
      background: "transparent",
      border: "none",
      borderBottom: "1px solid rgba(255,255,255,0.2)",
      color: "var(--color-accent)",
      fontFamily: "Space Mono, monospace",
      fontSize: "clamp(0.85rem, 2vw, 1rem)",
      outline: "none",
      padding: "2px 8px",
      minWidth: "120px",
      transition: "all 0.3s"
    };

    var spanStyle = {
      fontFamily: "Space Mono, monospace",
      color: "rgba(255,255,255,0.7)",
      fontSize: "clamp(0.85rem, 2vw, 1rem)",
      whiteSpace: "nowrap"
    };

    var sentenceWrapper = {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
      gap: "8px",
      marginBottom: "16px"
    };

    return (
      <section id="contact" style={{
        minHeight: "100vh",
        width: "100%",
        padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
        paddingBottom: "10rem",
        background: "transparent",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 2
      }}>
        <style>{
          "@keyframes contact-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-25%); } }" +
          "@keyframes contact-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }" +
          "input::placeholder { color: rgba(255,255,255,0.25); }" +
          ".contact-input:focus { border-bottom-color: var(--color-accent) !important; box-shadow: 0 2px 0 var(--color-accent); }"
        }</style>

        <div>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 'clamp(1.5rem, 7vw, 5rem)',
            fontWeight: "800",
            lineHeight: "1.1",
            margin: 0,
            color: "white"
          }}>
            Let's Work 
            <span style={{ color: "var(--color-accent)", transition: "color 0.3s" }}> Together</span>
          </h2>

          <div style={{
            overflow: "hidden",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "12px 0",
            margin: "3rem 0"
          }}>
            <div style={{
              display: "inline-flex",
              whiteSpace: "nowrap",
              willChange: 'transform',
              animation: "contact-marquee 18s linear infinite"
            }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map(function(i) {
                return (
                  <span key={i} style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.3)",
                    marginRight: "2rem"
                  }}>
                    AVAILABLE FOR WORK — SAY HELLO — GO AHEAD — 
                  </span>
                );
              })}
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
            gap: isMobile ? "3.5rem" : "4rem",
            alignItems: "center"
          }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Sentence 1 */}
              <div style={sentenceWrapper}>
                <span style={spanStyle}>Hey! My name is</span>
                <input 
                  className="contact-input"
                  style={inputStyle} 
                  placeholder="your name" 
                  value={name}
                  onChange={function(e) { setName(e.target.value); }}
                />
                <span style={spanStyle}>and I work at</span>
                <input 
                  className="contact-input"
                  style={inputStyle} 
                  placeholder="company" 
                  value={company}
                  onChange={function(e) { setCompany(e.target.value); }}
                />
                <span style={spanStyle}>.</span>
              </div>

              {/* Sentence 2 */}
              <div style={sentenceWrapper}>
                <span style={spanStyle}>I'm looking for help with</span>
                <input 
                  className="contact-input"
                  style={{ ...inputStyle, minWidth: "200px" }} 
                  placeholder="a new website / AI project / web app" 
                  value={projectType}
                  onChange={function(e) { setProjectType(e.target.value); }}
                />
              </div>

              {/* Sentence 3 */}
              <div style={sentenceWrapper}>
                <span style={spanStyle}>Reach me at</span>
                <input 
                  type="email"
                  className="contact-input"
                  style={{ ...inputStyle, minWidth: "220px" }} 
                  placeholder="email@example.com" 
                  value={email}
                  onChange={function(e) { setEmail(e.target.value); }}
                />
              </div>

              <button 
                onClick={function() { console.log({ name: name, company: company, projectType: projectType, email: email }); }}
                style={{
                  marginTop: "2.5rem",
                  padding: "0.8rem 2.2rem",
                  border: "1px solid var(--color-accent)",
                  background: "transparent",
                  color: "var(--color-accent)",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  borderRadius: "3px",
                  transition: "all 0.25s"
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.background = "var(--color-accent)";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
              >
                SEND MESSAGE <span>↑</span>
              </button>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px"
            }}>
              <div 
                ref={badgeRef}
                onMouseMove={handleBadgeMove}
                onMouseLeave={handleBadgeLeave}
                style={{ 
                  width: "180px", 
                  height: "180px", 
                  position: "relative",
                  transform: "perspective(1000px) rotateX(" + badgeTiltX + "deg) rotateY(" + badgeTiltY + "deg)",
                  transition: badgeHovered ? "none" : "transform 0.5s ease"
                }}
              >
                <svg 
                  viewBox="0 0 180 180" 
                  style={{ 
                    width: "180px", 
                    height: "180px", 
                    animation: "contact-spin 12s linear infinite",
                    pointerEvents: "none"
                  }}
                >
                  <defs>
                    <path id="circlePath" d="M 90,90 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                  </defs>
                  <text style={{ fontFamily: "Space Mono, monospace", fontSize: "10.5px", fill: "rgba(255,255,255,0.4)", letterSpacing: "3.2px"
  }}>
                    <textPath href="#circlePath">
                      AVAILABLE FOR WORK — SAY HELLO — AVAILABLE FOR WORK — SAY HELLO — 
                    </textPath>
                  </text>
                </svg>

                <div 
                  onMouseEnter={function() { setBadgeHovered(false); setCenterHovered(true); setBadgeTiltX(0); setBadgeTiltY(0); }}
                  onMouseLeave={function() { setCenterHovered(false); }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    background: centerHovered ? "var(--color-accent)" : "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    color: centerHovered ? "#000" : "var(--color-accent)",
                    transform: "translate(-50%, -50%) scale(" + (centerHovered ? "1.12" : "1") + ")",
                    zIndex: 10
                  }}
                >
                  <span style={{ fontSize: "1.6rem" }}>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          gap: isMobile ? "1.5rem" : "0"
        }}>
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em"
          }}>
            © 2025 Muhammad Hassaan
          </div>

          <div style={{ display: "flex", gap: "2.5rem" }}>
            <a href="#" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.75rem",
              textDecoration: "none",
              letterSpacing: "0.15em",
              transition: "all 0.3s"
            }}
            onMouseEnter={function(e) { e.currentTarget.style.color = "var(--color-accent)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              GH <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>↗</span>
            </a>
            <a href="#" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.75rem",
              textDecoration: "none",
              letterSpacing: "0.15em",
              transition: "all 0.3s"
            }}
            onMouseEnter={function(e) { e.currentTarget.style.color = "var(--color-accent)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              LI <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>↗</span>
            </a>
          </div>
        </div>
      </section>
    );
  };

  export default Contact;