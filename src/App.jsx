import { useState } from "react";
import { motion } from "framer-motion";

const faq = [
  {
    keywords: ["motivation", "motivations", "pourquoi", "motive", "ce qui vous motive"],
    response: "Je suis passionné par le développement web full stack et l'intelligence artificielle, et cette passion est ma première véritable source de motivation. Ce qui m’anime au quotidien, c’est de pouvoir résoudre des problèmes complexes en mobilisant à la fois ma rigueur technique et ma créativité. J’aime imaginer, construire et voir des projets concrets prendre vie, surtout lorsqu’ils ont un impact réel et positif. Travailler en équipe est pour moi essentiel : échanger des idées, progresser ensemble, et faire partie d’un environnement stimulant me pousse à toujours donner le meilleur de moi-même. N'hesitez pas à me contacter directement si vous voulez en savoir plus."
  },
  {
    keywords: ["parlez de vous", "présentez-vous", "vous décrire", "qui êtes-vous", "vous présenter", "de vous", "pouvez-vous vous presenter", "Qui êtes vous ?", "Pouvez-vous vous presenter","Présentez-vous", "Qui es tu", "Qui es-tu?", "qui es tu?","Qui es tu?","Qui es tu ?","qui es tu ?","qui est tu?"],
    response: "Je suis développeur full stack, avec une appétence particulière pour l’IA et le Machine Learning. J’ai commencé par PHP et Symfony, puis je me suis orienté vers des technologies modernes comme React, Node.js et Python. J’ai travaillé sur des projets variés, allant d’applications web à des outils d’analyse prédictive, de leur conception à leur déploiement en passant par la CI/CD. Ce que j’aime dans mon métier, c’est apprendre en continu, construire des solutions utiles, et collaborer avec des équipes qui aiment relever des défis."
  },
  {
    keywords: ["points forts", "qualités", "soft skills", "softs skills"],
    response: "Je suis quelqu'un de curieux, qui apprend très vite avec beaucoup de créativité et j'apprécie évoluer et travailler en équipe."
  },
  {
    keywords: ["projets", "expériences"],
    response: "J'ai conçu plusieurs projets from scratch en React, Node, Python et développé des applications web intégrant de la CI/CD et des tests automatisés. Par exemple une application de partage de fichier destiné aux écoles ou encore des applications internes de suivi de productions. J'ai aussi pu développer des modèles prédictifs basés sur du Machine Learning ainsi que des bots d'analyse de marché financiers et crypto-monnaies, en utilisant Python."
  },
  {
    keywords: ["formation", "parcours", "études", "étudié", "scolarité", "école", "cursus"],
    response: "J'ai découvert le développement il y a quelques années en me formant d'abord sur PHP, ce qui m’a permis de bien comprendre les bases de la programmation orientée objet et les architectures web classiques. J’ai ensuite élargi mes compétences vers des technologies modernes comme JavaScript, React, Node.js et Python, en me spécialisant dans le développement full stack et en explorant l’IA notamment au travers d'une alternance d'une année avec au bout le diplome de concepteur développeur d'applications web. J’ai appris autant à l'école que de manière autonome, à travers des projets concrets qui m’ont vraiment fait progresser."
  },
   {
     keywords: ["merci", "Merci"],
     response: "Merci à vous, n'hesitez pas à me contacter si vous voulez en savoir plus."
   },
  {
    keywords: ["comment ça va", "commment tu vas", "ça va?"],
    response: "Je vais bien merci."
  },
  
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const lowerInput = input.toLowerCase().trim();
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // 💬 Cas spéciaux : salutations
    if (lowerInput === "bonjour") {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: "Bonjour !" }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    if (
      ["bonjour, comment ça va ?", "Bonjour, comment ça va ?", "bonjour, comment ça va?", "Bonjour, comment ça va?", "bonjour comment tu vas?", "Bonjour comment tu vas?", "bonjour comment tu vas ?", "Bonjour comment tu vas ?", "salut, ça va?", "salut ça va ?", "Salut, ça va?", "Salut, ça va ?",].includes(lowerInput)
    ) {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: "Bonjour, je vais bien merci !" }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // 🔍 Analyse des mots-clés
    const matches = faq.filter(f =>
      f.keywords.some(keyword => lowerInput.includes(keyword))
    );

    const containsMotivation = matches.some(m =>
      m.keywords.some(k =>
        ["motivation", "motivations", "pourquoi", "motive"].includes(k)
      )
    );

    const fullResponse = matches.length > 0
      ? matches.map(m => m.response).join(" ")
      : "Désoler, je ne peux pas répondre à cela, demandez moi par exemple qu'est-ce qui me motive, qui je suis, mon parcours ou bien quels sont mes softs skills :) .";

    // 🎸 Blague motivation
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
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">EmericBot 🤖 Qui suis-je? Mes motivations? Mes softs skills? Mon parcours? Demandez </h1>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-white text-gray-800 self-start"
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