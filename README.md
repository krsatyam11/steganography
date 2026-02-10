# 🕵️‍♂️ Steganography Tool (v1.0.0)

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-fast-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

> 🔐 **A high-performance Client-Side Steganography Suite.**
> Securely hide secret messages inside images using LSB (Least Significant Bit) encoding, wrapped in a professional "Cyber-Hacker" aesthetic.

---

## 🚀 Live Demo

🔗 **Live Preview:**
👉 [https://steganographyui.vercel.app](https://steganographyui.vercel.app)

---

## 🧠 Key Features

*   **🎨 Cyber-Professional UI:** A sleek, forced dark-mode interface with glassmorphism, neon accents, and CRT-style terminal effects designed for privacy enthusiasts.
*   **🔒 Client-Side Privacy:** All processing happens **100% in your browser**. Images and messages are never uploaded to any server.
*   **🖼️ LSB Algorithm:** Utilizes **Least Significant Bit** manipulation to embed binary data into the RGB channels of pixels without noticeable visual distortion.
*   **⚡ Real-Time Calculation:**
    *   **Capacity Meter:** Instantly calculates how many characters you can hide based on image dimensions.
    *   **Safety Checks:** Prevents data corruption by enforcing file size limits (5MB) and format validation.
*   **💾 Lossless Output:** Generates PNG images to prevent compression artifacts from destroying your hidden message.

---

## 📂 Project Structure

```
steganography/
│
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable Shadcn-style components
│   │   ├── Navbar.tsx       # Navigation with smooth scroll
│   │   ├── EncoderTab.tsx   # Encryption/Hiding Logic
│   │   ├── DecoderTab.tsx   # Decryption/Extracting Logic
│   │   └── Footer.tsx       # Author & Socials
│   ├── lib/
│   │   └── steganography.ts # Core LSB Algorithm (The "Brain")
│   ├── App.tsx              # Main Layout
│   ├── main.tsx
│   └── index.css            # Tailwind, Animations & Cyber Grids
│
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Tech Stack

*   **Core:** React 18 + TypeScript
*   **Build:** Vite
*   **Styling:** TailwindCSS + Custom CSS Variables (Neon/Glassmorphism)
*   **Icons:** Lucide React
*   **Logic:** HTML5 Canvas API (Pixel manipulation)

---

## ⚙️ Installation & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/krsatyam11/steganography.git

# 2. Navigate to directory
cd steganography

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
```

Open in browser: `http://localhost:5173`

---

## 🔬 The Science (LSB)

| Component | Explanation |
| :--- | :--- |
| **Concept** | Least Significant Bit (LSB) Steganography. |
| **Process** | Every pixel has RGB values (e.g., `255, 0, 0`). We convert your message to binary and replace the last bit of these values. |
| **Stealth** | Changing a color value from `254` to `255` is invisible to the human eye. |
| **Capacity** | `(Width * Height * 3) / 8` bytes. Roughly 1 character per 3 pixels. |
| **Fragility** | **Note:** This method is fragile to compression. Always save/share as **PNG** or **File**, never as a compressed JPG (like on WhatsApp). |

---

## 💾 How to Use

### 1. Encode (Hide Message)
1.  Upload a carrier image (PNG or JPG).
2.  Type your secret message in the terminal input.
3.  Watch the capacity meter to ensure it fits.
4.  Click **ENCODE MESSAGE**.
5.  Download the resulting PNG image.

### 2. Decode (Extract Message)
1.  Switch to the **Decoder** tab.
2.  Upload the image containing the hidden message.
3.  Click **DECODE MESSAGE**.
4.  The hidden text will appear in the output console.

---

## 👨‍💻 Author

**Kr Satyam**
🎓 3rd Year CSE Student
🛡️ Cybersecurity Learner & Offensive Security Enthusiast

📧 Email: **[kaizenbreach@gmail.com](mailto:kaizenbreach@gmail.com)**

---

## 🌐 Socials

[![GitHub](https://img.shields.io/badge/GitHub-krsatyam11-black?logo=github)](https://github.com/krsatyam11)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-krsatyam07-blue?logo=linkedin)](https://linkedin.com/in/krsatyam07)
[![YouTube](https://img.shields.io/badge/YouTube-KaizenBreach-red?logo=youtube)](https://youtube.com/@KaizenBreach)
[![Instagram](https://img.shields.io/badge/Instagram-kaizenbreach-purple?logo=instagram)](https://instagram.com/kaizenbreach)
[![Threads](https://img.shields.io/badge/Threads-kaizenbreach-black?logo=threads)](https://threads.net/@kaizenbreach)

---

## ⚠️ Disclaimer

> 🛑 **Educational Purpose Only:**
> This tool is designed for educational purposes to demonstrate how digital steganography works.
>
> The author (**Kr Satyam**) is not responsible for the misuse of this tool for illicit communication or evasion of security monitoring. Always follow local laws regarding encryption and data obscuration.

---

## ⭐ Support

If you find this tool useful for learning or CTFs:

*   ⭐ **Star the repo**
*   🍴 **Fork it**
*   🧠 **Share with others**

---

## 📜 License

📄 MIT License