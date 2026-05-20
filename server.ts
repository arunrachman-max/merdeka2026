import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for generating "Lomba" (Game) ideas
  app.post("/api/generate-lomba", async (req, res) => {
    try {
      const { teamSize, focus } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Saya sedang merencanakan acara Hari Kemerdekaan Indonesia. 
        Tim panitia berjumlah ${teamSize} orang. 
        Fokus utama: ${focus}.
        Tolong berikan 5 ide lomba kelompok yang dimainkan oleh MINIMAL 3-5 orang peserta sekaligus dalam satu tim, yang sangat mengutamakan KERJASAMA (teamwork), kekompakan, dan kebersamaan, bukan kompetisi individual.
        Pastikan setiap cara bermain secara eksplisit menjelaskan peran dari 3-5 orang peserta tersebut untuk bekerja sama secara sinergis mencapai satu tujuan bersama.
        
        Sediakan kata kunci visual (imageKeyword) khusus untuk dicocokkan dengan gambar karakter claymation yang menggemaskan dan sesuai:
        - Jika tentang bakiak raksasa / berjalan kompak di papan kayu, berikan: 'clay_bakiak'
        - Jika tentang estafet sarung kelompok dalam lingkaran atau rantai manusia, berikan: 'clay_sarung'
        - Jika tentang menyumbat pipa bocor menggunakan banyak tangan/jari untuk menaikkan air, berikan: 'clay_bocor'
        - Jika tentang lomba tarik tambang kelompok atau kerja otot bersama, berikan: 'clay_tambang'
        - Jika tentang estafet kelereng menggunakan bilah bambu atau saluran berkelompok, berikan: 'clay_kelereng'

        Berikan jawaban dalam format JSON dengan struktur: 
        {
          "ideas": [
            {
              "title": "Nama Lomba",
              "description": "Penjelasan cara main (menjelaskan aksi serentak minimal 3-5 orang peserta untuk bekerja sama)",
              "togethernessValue": "Filosofi/nilai kebersamaan mendalam di lomba ini",
              "setupComplexity": "Mudah/Sedang/Sulit",
              "iconName": "Nama icon lucide (pilih dari: Users, Flag, Target, Heart, Trophy, Sparkles, Calendar, ClipboardCheck)",
              "imageKeyword": "salah satu dari: clay_bakiak, clay_sarung, clay_bocor, clay_tambang, clay_kelereng"
            }
          ]
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ideas: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    togethernessValue: { type: Type.STRING },
                    setupComplexity: { type: Type.STRING },
                    iconName: { type: Type.STRING },
                    imageKeyword: { type: Type.STRING }
                  },
                  required: ["title", "description", "togethernessValue", "setupComplexity", "iconName", "imageKeyword"]
                }
              }
            },
            required: ["ideas"]
          }
        }
      });

      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate ideas" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
