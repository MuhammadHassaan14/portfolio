import React from 'react';

const Hero = () => {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "transparent"
      }}
    >
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}
      </style>

      {/* Tagline */}
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        letterSpacing: "0.2em",
        color: "var(--color-cyan)",
        marginBottom: "1rem",
        textTransform: "uppercase"
      }}>
        Computer Science · Web Dev · AI
      </p>

      {/* Name Heading */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(3rem, 8vw, 7rem)",
        fontWeight: 800,
        color: "white",
        lineHeight: 1,
        textAlign: "center"
      }}>
        Muhammad Hassaan
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "1.1rem",
        color: "#aaaaaa",
        marginTop: "1rem"
      }}>
        I build things that think.
      </p>

      {/* Scroll Indicator */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)"
      }}>
        <div style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#00f5d4",
          borderRadius: "50%",
          animation: "bounce 1.5s infinite",
          boxShadow: "0 0 10px #00f5d4"
        }} />
      </div>
    </section>
  );
};

export default Hero;