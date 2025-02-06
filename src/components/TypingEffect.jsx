import React, { useState, useEffect } from "react";

const TypingEffect = () => {
  const texts = ["Hi, Welcome To My Portfolio", "Hi, My name Fardani."];
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return; 

    const handleTyping = () => {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText((prev) => prev + currentText[charIndex]);
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Tunggu 2 detik sebelum menghapus
        }
      } else {
        if (charIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setPause(true); // Aktifkan jeda setelah teks terhapus
          setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
            setPause(false);
          }, 1000); // Jeda 4 detik sebelum teks baru mulai diketik
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, pause]);

  return (
    <header className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 bg-gradient">
      <div className="container">
        <h1 className="display-3 fw-bold">{displayText}</h1>
        <p className="lead">
          I'm an illustrator and a programmer, nice to meet you.
        </p>
        <a href="#about" className="btn-modern mt-3">
          About Me
        </a>
      </div>
    </header>
  );
};

export default TypingEffect;
