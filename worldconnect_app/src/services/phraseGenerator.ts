import { GameLevel, GameQuestion, GameMode, PHRASE_CATEGORIES } from '../types/game';

const QUESTION_TYPES: GameMode[] = ['quiz', 'match', 'type'];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

async function generateWithAI(difficulty: GameLevel, category: string): Promise<GameQuestion | null> {
  const apiKey = localStorage.getItem('openrouter_api_key');
  
  if (!apiKey) {
    return generateFallbackQuestion(difficulty, category);
  }

  const prompt = `
Genera UNA sola pregunta de aprendizaje de idiomas en formato JSON.
Contexto: Copa del Mundo - app de viaje

NIVEL: ${difficulty.toUpperCase()}
CATEGORÍA: ${category}

IDIOMAS: Español -> Francés (ejemplo)

Formato JSON obligatorio:
{
  "phrase": "texto en español",
  "translation": "traducción en francés",
  "distractors": ["opción错误1", "opción错误2", "opción错误3"],
  "type": "${getRandomElement(QUESTION_TYPES)}"
}

Requisitos:
- NO repitas frases del diccionario interno
- Las opciones incorrectas deben ser traducciones plausibles pero incorrectas
- Para type: no uses distractors, usa null
- La traducción debe ser precisa
- Genera solo el JSON, sin texto adicional
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'WorldConnect Learning Game'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      console.warn('AI generation failed, using fallback');
      return generateFallbackQuestion(difficulty, category);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return generateFallbackQuestion(difficulty, category);
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return generateFallbackQuestion(difficulty, category);
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      id: generateId(),
      phrase: parsed.phrase,
      correctAnswer: parsed.translation,
      options: parsed.distractors ? shuffleArray([parsed.translation, ...parsed.distractors]) : undefined,
      difficulty,
      category,
      type: parsed.type || 'quiz'
    };
  } catch (error) {
    console.warn('AI generation error:', error);
    return generateFallbackQuestion(difficulty, category);
  }
}

interface PhraseData {
  es: string;
  fr: string;
  wrong: string[];
}

const FALLBACK_PHRASES: Record<GameLevel, Record<string, PhraseData[]>> = {
  principiante: {
    saludos: [
      { es: 'Hola', fr: 'Bonjour', wrong: ['Salut', 'Bonsoir', 'Au revoir'] },
      { es: 'Gracias', fr: 'Merci', wrong: ['Pardon', 'Excusez-moi', 'De rien'] },
      { es: 'Por favor', fr: "S'il vous plaît", wrong: ['Merci', 'De rien', 'Excusez-moi'] },
      { es: 'Adiós', fr: 'Au revoir', wrong: ['Bonjour', 'Salut', 'À bientôt'] },
      { es: 'Sí', fr: 'Oui', wrong: ['Non', 'Peut-être', 'Bien sûr'] },
      { es: 'No', fr: 'Non', wrong: ['Oui', 'Peut-être', 'Jamais'] },
    ],
    comida: [
      { es: 'Agua', fr: 'Eau', wrong: ['Vin', 'Café', 'Thé'] },
      { es: 'Cerveza', fr: 'Bière', wrong: ['Vin', 'Eau', 'Soda'] },
      { es: 'Café', fr: 'Café', wrong: ['Thé', 'Lait', 'Eau'] },
      { es: 'Pan', fr: 'Pain', wrong: ['Eau', 'Vin', 'Fromage'] },
      { es: 'Carne', fr: 'Viande', wrong: ['Poisson', 'Poulet', 'Légume'] },
    ],
    transporte: [
      { es: 'Taxi', fr: 'Taxi', wrong: ['Bus', 'Métro', 'Train'] },
      { es: 'Metro', fr: 'Métro', wrong: ['Taxi', 'Bus', 'Train'] },
      { es: 'Aeropuerto', fr: 'Aéroport', wrong: ['Gare', 'Station', 'Arrêt'] },
    ],
    emergencia: [
      { es: 'Ayuda', fr: 'Aide', wrong: ['Merci', 'Pardon', 'Excusez-moi'] },
      { es: 'Hospital', fr: 'Hôpital', wrong: ['Pharmacie', 'Police', 'Médecin'] },
      { es: 'Médico', fr: 'Médecin', wrong: ['Pharmacien', 'Infirmier', 'Docteur'] },
    ],
    fútbol: [
      { es: 'Gol', fr: 'But', wrong: ['Match', 'Équipe', 'Joueur'] },
      { es: 'Equipo', fr: 'Équipe', wrong: ['Joueur', 'Match', 'Stade'] },
      { es: 'Vamos', fr: 'Allez', wrong: ['Venez', 'Restez', 'Partez'] },
    ],
    compras: [
      { es: 'Dinero', fr: 'Argent', wrong: ['Prix', 'Carte', 'Facture'] },
      { es: 'Caro', fr: 'Cher', wrong: ['Bon marché', 'Gratuit', 'Prix'] },
      { es: 'Barato', fr: 'Bon marché', wrong: ['Cher', ' Gratuit', 'Exorbitant'] },
    ],
    direcciones: [
      { es: 'Dónde está', fr: 'Où est', wrong: ['Comment', 'Quand', 'Pourquoi'] },
      { es: 'Izquierda', fr: 'Gauche', wrong: ['Droite', 'Devant', 'Derrière'] },
      { es: 'Derecha', fr: 'Droite', wrong: ['Gauche', 'Devant', 'Derrière'] },
    ],
    social: [
      { es: 'Amigo', fr: 'Ami', wrong: ['Ennemi', 'Famille', 'Camarade'] },
      { es: 'Familia', fr: 'Famille', wrong: ['Amis', 'Parents', 'Frères'] },
    ]
  },
  intermedio: {
    saludos: [
      { es: 'Buenos días', fr: 'Bonjour', wrong: ['Bonsoir', 'Bonne nuit', 'Salut'] },
      { es: 'Cómo estás', fr: 'Comment allez-vous', wrong: ['Qui êtes-vous', 'Où allez-vous', 'Que faites-vous'] },
      { es: 'Mucho gusto', fr: 'Enchanté', wrong: ['Au revoir', 'Bonne journée', 'À bientôt'] },
      { es: 'Hasta luego', fr: 'À bientôt', wrong: ['Jamais', 'Maintenant', 'Toujours'] },
    ],
    comida: [
      { es: 'La cuenta por favor', fr: "L'addition s'il vous plaît", wrong: ['Le menu', 'La carte', 'Le prix'] },
      { es: 'Está delicioso', fr: 'C\'est délicieux', wrong: ['C\'est mauvais', 'C\'est OK', 'C\'est cher'] },
      { es: 'Una mesa para dos', fr: 'Une table pour deux', wrong: ['Une chaise', 'Un verre', 'Un plat'] },
      { es: 'El menú por favor', fr: 'Le menu s\'il vous plaît', wrong: ['La carte', 'L\'addition', 'Le prix'] },
    ],
    transporte: [
      { es: 'Cuánto cuesta el taxi', fr: 'Combien coûte le taxi', wrong: ['Où est le taxi', 'Quand vient le taxi', 'Qui prend le taxi'] },
      { es: 'A dónde va este bus', fr: 'Où va ce bus', wrong: ['Quand part le bus', 'Qui conduit le bus', 'Pourquoi le bus'] },
      { es: 'Dónde está la estación', fr: 'Où est la gare', wrong: ['Quand ouvre la gare', 'Qui est à la gare', 'Pourquoi la gare'] },
    ],
    emergencia: [
      { es: 'Necesito un médico', fr: 'J\'ai besoin d\'un médecin', wrong: ['Je veux un médecin', 'Je cherche un médecin', 'Je mange un médecin'] },
      { es: 'Llame a la policía', fr: 'Appelez la police', wrong: ['Aidez la police', 'Cherchez la police', 'Voyez la police'] },
      { es: 'Dónde está el hospital', fr: 'Où est l\'hôpital', wrong: ['Quand ouvre l\'hôpital', 'Qui est à l\'hôpital', 'Pourquoi l\'hôpital'] },
    ],
    fútbol: [
      { es: 'Es un partidazo', fr: 'C\'est un grand match', wrong: ['C\'est nul', 'C\'est fini', 'C\'est long'] },
      { es: 'El equipo local gana', fr: 'L\'équipe locale gagne', wrong: ['L\'équipe adverse gagne', 'Personne ne gagne', 'Tout le monde gagne'] },
      { es: 'Qué partido', fr: 'Quel match', wrong: ['Quel joueur', 'Quel stade', 'Quel but'] },
    ],
    compras: [
      { es: 'Acepta tarjeta de crédito', fr: 'Acceptez-vous la carte de crédit', wrong: ['Avez-vous la carte', 'Voulez-vous la carte', 'Donnez la carte'] },
      { es: 'Es demasiado caro', fr: 'C\'est trop cher', wrong: ['C\'est bon marché', 'C\'est gratuit', 'C\'est juste'] },
      { es: 'Tiene algo más barato', fr: 'Avez-vous quelque chose de moins cher', wrong: ['Avez-vous plus cher', 'Voulez-vous moins', 'Cherchez plus'] },
    ],
    direcciones: [
      { es: 'Cómo llego al estadio', fr: 'Comment aller au stade', wrong: ['Quand aller au stade', 'Pourquoi aller au stade', 'Qui va au stade'] },
      { es: 'Está muy lejos', fr: 'C\'est très loin', wrong: ['C\'est très proche', 'C\'est petit', 'C\'est grand'] },
      { es: 'Puede mostrarme en el mapa', fr: 'Pouvez-vous me montrer sur la carte', wrong: ['Pouvez-vous me donner', 'Pouvez-vous me dire', 'Pouvez-vous m\'aider'] },
    ],
    social: [
      { es: 'Podemos hacer una foto', fr: 'Pouvons-nous prendre une photo', wrong: ['Voulons-nous voir', 'Devons-nous prendre', 'Allons-nous prendre'] },
      { es: 'De dónde eres', fr: 'D\'où venez-vous', wrong: ['Qui êtes-vous', 'Que faites-vous', 'Quand venez-vous'] },
    ]
  },
  avanzado: {
    saludos: [
      { es: 'Qué onda', fr: 'Quoi de neuf', wrong: ['Comment ça va', 'Ça gaze', 'Tout va bien'] },
      { es: 'Todo bien', fr: 'Tout va bien', wrong: ['Rien ne va', 'Ça va mal', 'Tout est perdu'] },
      { es: 'Venga ya', fr: 'Allez allez', wrong: ['Restez', 'Partez', 'Venez'] },
    ],
    comida: [
      { es: 'Está para chorriarse', fr: 'C\'est à se lécher les doigts', wrong: ['C\'est bon', 'C\'est mangeable', 'C\'est excellent'] },
      { es: 'Me voy a quedar frito', fr: 'Je vais me payer le luxe', wrong: ['Je vais payer', 'Je vais manger', 'Je vais partir'] },
      { es: 'No está mal', fr: 'Pas mal', wrong: ['C\'est nul', 'C\'est parfait', 'C\'est horrible'] },
    ],
    transporte: [
      { es: 'Me tiene hasta las narices', fr: 'J\'en ai marre', wrong: ['J\'aime ça', 'Je veux ça', 'Je prends ça'] },
      { es: 'Vámonos de aquí', fr: 'Partons d\'ici', wrong: ['Restons ici', 'Venez ici', 'Allez-y'] },
      { es: 'Se fue al carajo', fr: 'Tout est parti en fumée', wrong: ['Tout va bien', 'Tout est ok', 'Tout est bon'] },
    ],
    emergencia: [
      { es: 'Me han robado', fr: 'On m\'a volé', wrong: ['J\'ai perdu', 'J\'ai donné', 'J\'ai trouvé'] },
      { es: 'Es una urgencia', fr: 'C\'est urgent', wrong: ['C\'est calme', 'C\'est ok', 'C\'est normal'] },
      { es: 'No es para tanto', fr: 'Ce n\'est pas grave', wrong: ['C\'est grave', 'C\'est sérieux', 'C\'est important'] },
    ],
    fútbol: [
      { es: 'Es un golaco', fr: 'C\'est un but magnifique', wrong: ['C\'est un but', 'C\'est nul', 'C\'est ok'] },
      { es: 'El arbitro es un parcial', fr: 'L\'arbitre est partial', wrong: ['L\'arbitre est juste', 'L\'arbitre est bon', 'L\'arbitre est ok'] },
      { es: 'Menudo partidazo', fr: 'Quel match incroyable', wrong: ['Quel match', 'Quel nul', 'Quel aburrimiento'] },
    ],
    compras: [
      { es: 'Me han timado', fr: 'Je me suis fait avoir', wrong: ['J\'ai acheté', 'J\'ai vendu', 'J\'ai échangé'] },
      { es: 'Es un robo', fr: 'C\'est du vol', wrong: ['C\'est gratuit', 'C\'est bon marché', 'C\'est cadeau'] },
      { es: 'No me tomes el pelo', fr: 'Ne me prenez pas pour un idiot', wrong: ['Aidez-moi', 'Comprenez-moi', 'Écoutez-moi'] },
    ],
    direcciones: [
      { es: 'Está perdido', fr: 'Vous êtes perdu', wrong: ['Vous êtes ici', 'Vous êtes là', 'Vous êtes bien'] },
      { es: 'No tengo ni idea', fr: 'Je n\'en ai aucune idée', wrong: ['Je sais tout', 'Je connais', 'Je comprends'] },
      { es: 'Tira todo recto', fr: 'Allez tout droit', wrong: ['Tournez', 'Retournez', 'Restez'] },
    ],
    social: [
      { es: 'Es un fuera de serie', fr: 'C\'est un champion', wrong: ['C\'est nul', 'C\'est normal', 'C\'est ok'] },
      { es: 'Me importa un bledo', fr: 'Je m\'en fiche', wrong: ['Je cares', 'Je veux', 'Je cherche'] },
      { es: 'Qué pasada', fr: 'C\'est incroyable', wrong: ['C\'est nul', 'C\'est normal', 'C\'est genial'] },
    ]
  }
};

function generateFallbackQuestion(difficulty: GameLevel, category: string): GameQuestion {
  const categoryPhrases = FALLBACK_PHRASES[difficulty][category] || FALLBACK_PHRASES[difficulty].saludos;
  const phraseData = getRandomElement(categoryPhrases);
  const questionType = getRandomElement(QUESTION_TYPES);
  
  const question: GameQuestion = {
    id: generateId(),
    phrase: phraseData.es,
    correctAnswer: phraseData.fr,
    difficulty,
    category,
    type: questionType
  };

  if (questionType === 'quiz' || questionType === 'match') {
    question.options = shuffleArray([phraseData.fr, ...phraseData.wrong].slice(0, 4));
  }

  return question;
}

class PhraseGeneratorService {
  async generateQuestion(difficulty: GameLevel): Promise<GameQuestion> {
    const category = getRandomElement(PHRASE_CATEGORIES);
    const aiQuestion = await generateWithAI(difficulty, category);
    return aiQuestion ?? generateFallbackQuestion(difficulty, category);
  }

  async generateQuestions(difficulty: GameLevel, count: number): Promise<GameQuestion[]> {
    const questions: GameQuestion[] = [];
    const usedPhrases = new Set<string>();
    
    for (let i = 0; i < count * 2 && questions.length < count; i++) {
      const question = await this.generateQuestion(difficulty);
      
      if (!usedPhrases.has(question.phrase)) {
        usedPhrases.add(question.phrase);
        questions.push(question);
      }
    }

    return questions.slice(0, count);
  }

  getCategories(): string[] {
    return PHRASE_CATEGORIES;
  }
}

const phraseGenerator = new PhraseGeneratorService();
export default phraseGenerator;