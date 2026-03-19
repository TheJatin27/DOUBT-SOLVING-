import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";

function TeacherRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subjects, setSubjects] = useState("");
  const navigate = useNavigate();

  const registerTeacher = async () => {
    if (!name || !email || !password || !subjects) {
      alert("All fields are required");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      const user = userCredential.user;
      const subjectsArray = subjects.split(",").map((s) => s.trim());

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "teacher",
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(db, "teachers", user.uid), {
        name,
        email,
        subjects: subjectsArray,
        approved: true,
        createdAt: serverTimestamp(),
      });

      alert("Teacher registered successfully!");
      navigate("/"); // Redirecting to login

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // --- REUSED MODERN STYLES ---
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#F0F5FA",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      margin: 0,
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      width: "100%",
      maxWidth: "450px", // Slightly wider for the subjects field
      textAlign: "center",
    },
    logo: {
      color: "#2D60FF",
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "10px",
      display: "block",
    },
    subtitle: {
      color: "#718096",
      fontSize: "14px",
      marginBottom: "30px",
    },
    inputGroup: {
      textAlign: "left",
      marginBottom: "18px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: "600",
      color: "#4A5568",
      marginBottom: "8px",
      marginLeft: "4px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "10px",
      border: "1px solid #E2E8F0",
      fontSize: "15px",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#2D60FF",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(45, 96, 255, 0.2)",
      transition: "transform 0.1s",
      marginTop: "10px",
    },
    footerLink: {
      marginTop: "25px",
      fontSize: "14px",
      color: "#718096",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.logo}>Learnify</span>
        <h2 style={{ margin: "0 0 5px 0", color: "#1A202C" }}>Teacher Portal</h2>
        <p style={styles.subtitle}>Create your educator account</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Dr. Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Work Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="jane.smith@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Subjects (Comma Separated)</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. DSA, DBMS, React"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />
        </div>

        <button 
          style={styles.button} 
          onClick={registerTeacher}
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Complete Registration
        </button>

        <div style={styles.footerLink}>
          Already registered? <span 
            onClick={() => navigate("/")} 
            style={{color: "#2D60FF", cursor: "pointer", fontWeight: "600"}}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;