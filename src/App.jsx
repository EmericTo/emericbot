import { useState } from "react";
import { motion } from "framer-motion";

// ✅ Fonction pour nettoyer les chaînes (ponctuation, accents, etc.)
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire accents
    .replace(/[^a-z0-9 ]/g, "")      // retire ponctuation
    .trim();
}

const faq = [
  {
    keywords: ["motivation", "motivations", "pourquoi", "motive", "ce qui vous motive"],
    response: "Je suis passionné par le développement web full stack et l'intelligence artificielle, et cette passion est ma première véritable source de motivation. Ce qui m’anime au quotidien, c’est de pouvoir résoudre des problèmes complexes en mobilisant à la fois ma rigueur technique et ma créativité. J’aime imaginer, construire et voir des projets concrets prendre vie, surtout lorsqu’ils ont un impact réel et positif. Travailler en équipe est pour moi essentiel : échanger des idées, progresser ensemble, et faire partie d’un environnement stimulant me pousse à toujours donner le meilleur de moi-même. N'hésitez pas à me contacter directement si vous voulez en savoir plus."
  },
  {
    keywords: ["parlez de vous", "presentez vous", "vous decrire", "qui etes vous", "vous presenter", "de vous", "pouvez vous vous presenter", "qui es tu", "Qui es-tu?"],
    response: "Je suis développeur full stack, avec une appétence particulière pour l’IA et le Machine Learning. J’ai commencé par PHP et Symfony, puis je me suis orienté vers des technologies modernes comme React, Node.js et Python. J’ai travaillé sur des projets variés, allant d’applications web à des outils d’analyse prédictive, de leur conception à leur déploiement en passant par la CI/CD. Ce que j’aime dans mon métier, c’est apprendre en continu, construire des solutions utiles, et collaborer avec des équipes qui aiment relever des défis."
  },
  {
    keywords: ["points forts", "qualites", "soft skills", "softs skills"],
    response: "Je suis quelqu'un de curieux, qui apprend très vite avec beaucoup de créativité et j'apprécie évoluer et travailler en équipe."
  },
  {
    keywords: ["projets", "experiences"],
    response: "J'ai conçu plusieurs projets from scratch en React, Node, Python et développé des applications web intégrant de la CI/CD et des tests automatisés. Par exemple une application de partage de fichier destiné aux écoles ou encore des applications internes de suivi de productions. J'ai aussi pu développer des modèles prédictifs basés sur du Machine Learning ainsi que des bots d'analyse de marché financiers et crypto-monnaies, en utilisant Python."
  },
  {
    keywords: ["formation", "parcours", "etudes", "etudie", "scolarite", "ecole", "cursus"],
    response: "J'ai découvert le développement il y a quelques années en me formant d'abord sur PHP, ce qui m’a permis de bien comprendre les bases de la programmation orientée objet et les architectures web classiques. J’ai ensuite élargi mes compétences vers des technologies modernes comme JavaScript, React, Node.js et Python, en me spécialisant dans le développement full stack et en explorant l’IA notamment au travers d'une alternance d'une année avec au bout le diplôme de concepteur développeur d'applications web. J’ai appris autant à l'école que de manière autonome, à travers des projets concrets qui m’ont vraiment fait progresser."
  },
  {
    keywords: ["merci"],
    response: "Merci à vous, n'hésitez pas à me contacter si vous voulez en savoir plus."
  },
  {
    keywords: ["comment ca va", "comment tu vas", "ca va"],
    response: "Je vais bien merci."
  },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const normalizedInput = normalize(input);
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // 💬 Cas spéciaux : salutations
    if (normalizedInput === "bonjour") {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: "Bonjour !" }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    if (
      [
        "bonjour comment ca va",
        "salut ca va",
        "salut comment tu vas",
        "bonjour comment tu vas"
      ].includes(normalizedInput)
    ) {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: "Bonjour, je vais bien merci !" }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // 🔍 Recherche par mots-clés normalisés
    const matches = faq.filter(f =>
      f.keywords.some(keyword => normalizedInput.includes(normalize(keyword)))
    );

    const containsMotivation = matches.some(m =>
      m.keywords.some(k =>
        ["motivation", "motivations", "pourquoi", "motive"].includes(normalize(k))
      )
    );

    const fullResponse = matches.length > 0
      ? matches.map(m => m.response).join(" ")
      : "Désolé, je ne peux pas répondre à cela. Essayez avec des questions comme : qu'est-ce qui me motive, qui je suis, mon parcours ou mes soft skills 🙂.";

    // 🎸 Séquence humour motivation
    if (containsMotivation) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: "bot",
          text: "Mon plat préféré est la pizza et mon style de musique préféré est le métal."
        }]);
      }, 1000);

      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: "bot",
          text: "Ahaha je rigole 😄 Je fonctionne très bien."
        }]);
      }, 3000);

      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: fullResponse }]);
        setIsTyping(false);
      }, 4500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: fullResponse }]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col h-[600px]">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
          EmericBot 🤖 Qui suis-je ? Mes motivations ? Mon parcours ? Mes softs skills ? Demandez-moi !
        </h1>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-white text-gray-800 self-start"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
              className="p-3 bg-white text-gray-500 rounded-lg max-w-[80%] self-start italic"
            >
              EmericBot est en train d'écrire...
            </motion.div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Posez votre question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
