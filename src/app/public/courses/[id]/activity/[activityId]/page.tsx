"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Activity types with real interactive content
const activitiesContent: any = {
  "1.1": {
    id: "1.1",
    name: "Activity 1.1: Vocabulary Flashcards",
    type: "flashcards",
    description: "تعلم 20 مفردة أساسية عن الحياة اليومية",
    cards: [
      { english: "wake up", arabic: "يستيقظ", example: "I wake up at 7 AM every day.", image: "⏰" },
      { english: "brush teeth", arabic: "ينظف أسنانه", example: "I brush my teeth twice a day.", image: "🪥" },
      { english: "take a shower", arabic: "يستحم", example: "He takes a shower in the morning.", image: "🚿" },
      { english: "have breakfast", arabic: "يتناول الإفطار", example: "We have breakfast together.", image: "🍳" },
      { english: "go to school", arabic: "يذهب للمدرسة", example: "She goes to school by bus.", image: "🏫" },
      { english: "do homework", arabic: "يؤدي الواجب", example: "I do my homework after dinner.", image: "📚" },
      { english: "watch TV", arabic: "يشاهد التلفاز", example: "They watch TV in the evening.", image: "📺" },
      { english: "go to bed", arabic: "يذهب للنوم", example: "I go to bed at 10 PM.", image: "🛏️" },
      { english: "exercise", arabic: "يمارس الرياضة", example: "He exercises every morning.", image: "💪" },
      { english: "read books", arabic: "يقرأ الكتب", example: "She reads books before bed.", image: "📖" },
      { english: "cook dinner", arabic: "يطبخ العشاء", example: "Mom cooks dinner at 6 PM.", image: "🍲" },
      { english: "clean room", arabic: "ينظف الغرفة", example: "I clean my room on weekends.", image: "🧹" },
      { english: "listen to music", arabic: "يستمع للموسيقى", example: "I listen to music while studying.", image: "🎵" },
      { english: "play games", arabic: "يلعب ألعاب", example: "We play games on Friday.", image: "🎮" },
      { english: "walk dog", arabic: "يمشي الكلب", example: "He walks the dog every evening.", image: "🐕" },
      { english: "chat with friends", arabic: "يدردش مع الأصدقاء", example: "She chats with friends online.", image: "💬" },
      { english: "study English", arabic: "يدرس الإنجليزية", example: "I study English for 30 minutes daily.", image: "🇬🇧" },
      { english: "drink water", arabic: "يشرب ماء", example: "You should drink water regularly.", image: "💧" },
      { english: "eat lunch", arabic: "يتناول الغداء", example: "We eat lunch at noon.", image: "🍱" },
      { english: "relax", arabic: "يسترخي", example: "I relax by reading books.", image: "😌" }
    ]
  },
  "1.2": {
    id: "1.2",
    name: "Activity 1.2: Grammar Mini-Lesson",
    type: "grammar",
    description: "تعلم Present Simple مع أمثلة تفاعلية",
    content: {
      title: "Present Simple Tense",
      explanation: "نستخدم Present Simple للحديث عن العادات اليومية والحقائق الثابتة",
      rules: [
        {
          rule: "للمفرد (He, She, It) نضيف s أو es للفعل",
          examples: [
            "I play → He plays",
            "I watch → She watches",
            "I study → It studies"
          ]
        },
        {
          rule: "للجمع (I, You, We, They) نستخدم الفعل كما هو",
          examples: [
            "I play football",
            "You watch TV",
            "We study English"
          ]
        }
      ],
      practice: [
        { question: "She ___ (play) tennis every day.", answer: "plays", options: ["play", "plays", "playing"] },
        { question: "They ___ (watch) movies on weekends.", answer: "watch", options: ["watch", "watches", "watching"] },
        { question: "He ___ (study) English at school.", answer: "studies", options: ["study", "studies", "studying"] },
        { question: "I ___ (go) to the gym twice a week.", answer: "go", options: ["go", "goes", "going"] },
        { question: "We ___ (have) breakfast at 7 AM.", answer: "have", options: ["have", "has", "having"] }
      ]
    }
  },
  "1.3": {
    id: "1.3",
    name: "Activity 1.3: Drag-and-Drop Quiz",
    type: "drag-drop",
    description: "رتب الكلمات لتكوين جمل صحيحة",
    questions: [
      {
        sentence: "I wake up at 7 AM every day",
        words: ["I", "wake", "up", "at", "7", "AM", "every", "day"],
        shuffled: ["day", "wake", "I", "at", "every", "up", "7", "AM"]
      },
      {
        sentence: "She goes to school by bus",
        words: ["She", "goes", "to", "school", "by", "bus"],
        shuffled: ["to", "She", "bus", "goes", "school", "by"]
      },
      {
        sentence: "They play football on weekends",
        words: ["They", "play", "football", "on", "weekends"],
        shuffled: ["football", "on", "They", "weekends", "play"]
      },
      {
        sentence: "He watches TV in the evening",
        words: ["He", "watches", "TV", "in", "the", "evening"],
        shuffled: ["TV", "in", "watches", "evening", "He", "the"]
      },
      {
        sentence: "We study English every Monday",
        words: ["We", "study", "English", "every", "Monday"],
        shuffled: ["Monday", "study", "We", "every", "English"]
      }
    ]
  },
  "2.1": {
    id: "2.1",
    name: "Activity 2.1: Adverbs of Frequency Song",
    type: "flashcards",
    description: "تعلم ظروف التكرار من خلال أغنية تعليمية",
    cards: [
      { english: "always", arabic: "دائماً (100%)", example: "I always brush my teeth.", image: "💯" },
      { english: "usually", arabic: "عادةً (80%)", example: "She usually walks to school.", image: "🔄" },
      { english: "often", arabic: "غالباً (70%)", example: "We often play football.", image: "⚽" },
      { english: "sometimes", arabic: "أحياناً (50%)", example: "They sometimes eat pizza.", image: "🍕" },
      { english: "rarely", arabic: "نادراً (20%)", example: "He rarely watches TV.", image: "📺" },
      { english: "never", arabic: "أبداً (0%)", example: "I never smoke.", image: "🚫" }
    ]
  },
  "2.2": {
    id: "2.2",
    name: "Activity 2.2: Voice Recording Task",
    type: "quiz",
    description: "اختبر معرفتك بظروف التكرار",
    questions: [
      {
        question: "How ___ do you exercise? - Every day!",
        options: ["never", "often", "rarely", "sometimes"],
        correct: 1,
        explanation: "نستخدم 'often' للتعبير عن شيء نفعله بشكل متكرر"
      },
      {
        question: "She ___ eats breakfast. She never misses it!",
        options: ["never", "rarely", "sometimes", "always"],
        correct: 3,
        explanation: "نستخدم 'always' عندما نفعل شيء 100% من الوقت"
      },
      {
        question: "I ___ drink coffee. Maybe once a month.",
        options: ["always", "usually", "rarely", "often"],
        correct: 2,
        explanation: "نستخدم 'rarely' للأشياء التي نفعلها قليلاً جداً"
      },
      {
        question: "They ___ go to the cinema. About once a week.",
        options: ["never", "usually", "rarely", "always"],
        correct: 1,
        explanation: "نستخدم 'usually' للعادات المنتظمة"
      },
      {
        question: "He ___ smokes. He quit last year!",
        options: ["always", "usually", "sometimes", "never"],
        correct: 3,
        explanation: "نستخدم 'never' عندما لا نفعل شيء أبداً"
      }
    ]
  },
  "2.3": {
    id: "2.3",
    name: "Activity 2.3: Matching Game",
    type: "quiz",
    description: "اربط الجمل بالظروف المناسبة",
    questions: [
      {
        question: "I eat vegetables ___ day. I love them!",
        options: ["never", "rarely", "sometimes", "every"],
        correct: 3,
        explanation: "'every day' تعني كل يوم"
      },
      {
        question: "She ___ arrives late. She's very punctual.",
        options: ["never", "always", "usually", "often"],
        correct: 0,
        explanation: "الشخص المنضبط لا يتأخر أبداً"
      },
      {
        question: "We ___ play tennis. 3 times a week.",
        options: ["never", "rarely", "often", "sometimes"],
        correct: 2,
        explanation: "3 مرات بالأسبوع = غالباً"
      },
      {
        question: "I ___ visit my grandparents. Maybe twice a year.",
        options: ["always", "usually", "rarely", "often"],
        correct: 2,
        explanation: "مرتين بالسنة = نادراً"
      },
      {
        question: "He ___ helps his mom. He's a good son.",
        options: ["never", "rarely", "sometimes", "always"],
        correct: 3,
        explanation: "الابن الجيد يساعد دائماً"
      }
    ]
  },
  "2.4": {
    id: "2.4",
    name: "Activity 2.4: Speaking Practice",
    type: "grammar",
    description: "تدرب على وصف روتينك اليومي",
    content: {
      title: "Describing Your Daily Routine",
      explanation: "استخدم Present Simple وظروف التكرار لوصف يومك",
      rules: [
        {
          rule: "ضع ظرف التكرار قبل الفعل الأساسي",
          examples: [
            "I always wake up at 7 AM",
            "She usually has breakfast",
            "They sometimes play games"
          ]
        },
        {
          rule: "ضع ظرف التكرار بعد فعل 'to be'",
          examples: [
            "I am always tired",
            "He is usually happy",
            "We are sometimes late"
          ]
        }
      ],
      practice: [
        { question: "I ___ (always/be) hungry in the morning.", answer: "am always", options: ["am always", "always am", "always be"] },
        { question: "She ___ (usually/study) at night.", answer: "usually studies", options: ["usually studies", "studies usually", "usually study"] },
        { question: "They ___ (never/eat) fast food.", answer: "never eat", options: ["never eat", "eat never", "never eats"] },
        { question: "He ___ (sometimes/be) late for class.", answer: "is sometimes", options: ["is sometimes", "sometimes is", "be sometimes"] },
        { question: "We ___ (often/play) football.", answer: "often play", options: ["often play", "play often", "often plays"] }
      ]
    }
  },
  "3.1": {
    id: "3.1",
    name: "Activity 3.1: Reading Passage",
    type: "grammar",
    description: "اقرأ نصاً عن العادات الصحية",
    content: {
      title: "Healthy Habits for Teens",
      explanation: "اقرأ النص التالي بعناية وافهم المعاني",
      rules: [
        {
          rule: "النص الكامل",
          examples: [
            "Healthy teenagers usually follow good habits every day. They always wake up early and never skip breakfast. Most teens exercise often - at least three times a week. They sometimes play sports with friends or go to the gym.",
            "",
            "Good sleep is important too. Teenagers should sleep 8-10 hours every night. They rarely stay up late on school nights. Drinking water is another healthy habit. Teens should drink 6-8 glasses daily.",
            "",
            "Eating vegetables is essential. Healthy teens often eat salad and rarely eat junk food. They usually have three balanced meals and sometimes enjoy healthy snacks like fruits or nuts."
          ]
        }
      ],
      practice: [
        { question: "How often do healthy teens exercise?", answer: "at least three times a week", options: ["every day", "at least three times a week", "once a week"] },
        { question: "Do healthy teens skip breakfast?", answer: "never", options: ["always", "sometimes", "never"] },
        { question: "How many hours should teens sleep?", answer: "8-10 hours", options: ["5-6 hours", "8-10 hours", "12 hours"] },
        { question: "How often do healthy teens eat junk food?", answer: "rarely", options: ["always", "often", "rarely"] },
        { question: "When do teens stay up late?", answer: "rarely on school nights", options: ["every night", "often", "rarely on school nights"] }
      ]
    }
  },
  "3.2": {
    id: "3.2",
    name: "Activity 3.2: True/False Questions",
    type: "quiz",
    description: "أجب بصح أو خطأ حسب النص",
    questions: [
      {
        question: "Healthy teenagers always wake up early.",
        options: ["True ✓", "False ✗"],
        correct: 0,
        explanation: "النص يقول 'They always wake up early'"
      },
      {
        question: "Teens should sleep 12 hours every night.",
        options: ["True ✓", "False ✗"],
        correct: 1,
        explanation: "النص يقول 8-10 ساعات وليس 12"
      },
      {
        question: "Healthy teens exercise at least three times a week.",
        options: ["True ✓", "False ✗"],
        correct: 0,
        explanation: "النص يذكر 'at least three times a week'"
      },
      {
        question: "Teenagers often eat junk food.",
        options: ["True ✓", "False ✗"],
        correct: 1,
        explanation: "النص يقول 'rarely eat junk food'"
      },
      {
        question: "Drinking water is a healthy habit.",
        options: ["True ✓", "False ✗"],
        correct: 0,
        explanation: "النص يذكر أن شرب الماء عادة صحية"
      }
    ]
  },
  "3.3": {
    id: "3.3",
    name: "Activity 3.3: Vocabulary in Context",
    type: "quiz",
    description: "استخرج معاني الكلمات من السياق",
    questions: [
      {
        question: "What does 'skip' mean in 'never skip breakfast'?",
        options: ["eat", "not eat", "cook", "buy"],
        correct: 1,
        explanation: "'skip' تعني يتخطى أو لا يأكل"
      },
      {
        question: "What does 'essential' mean?",
        options: ["optional", "very important", "difficult", "easy"],
        correct: 1,
        explanation: "'essential' تعني ضروري أو مهم جداً"
      },
      {
        question: "What are 'balanced meals'?",
        options: ["big meals", "meals with all nutrients", "fast food", "snacks"],
        correct: 1,
        explanation: "'balanced meals' وجبات متوازنة تحتوي على جميع العناصر الغذائية"
      },
      {
        question: "What does 'stay up late' mean?",
        options: ["wake up early", "sleep late", "not sleep at night", "take a nap"],
        correct: 2,
        explanation: "'stay up late' تعني يسهر ولا ينام باكراً"
      },
      {
        question: "What is 'junk food'?",
        options: ["healthy food", "vegetables", "unhealthy food", "fruits"],
        correct: 2,
        explanation: "'junk food' طعام غير صحي"
      }
    ]
  },
  "3.4": {
    id: "3.4",
    name: "Activity 3.4: Discussion Questions",
    type: "grammar",
    description: "أسئلة للتفكير والنقاش",
    content: {
      title: "Think and Discuss",
      explanation: "فكر في هذه الأسئلة واكتب إجاباتك",
      rules: [
        {
          rule: "Question 1: What healthy habits do you have?",
          examples: [
            "Think about: sleep, exercise, food, water",
            "Use frequency adverbs: always, usually, sometimes, never",
            "Example: I always drink water and usually exercise."
          ]
        },
        {
          rule: "Question 2: What habit do you want to change?",
          examples: [
            "Think about: bad habits you want to stop",
            "Think about: good habits you want to start",
            "Example: I want to sleep earlier and eat less junk food."
          ]
        },
        {
          rule: "Question 3: How can you improve your lifestyle?",
          examples: [
            "Think about: small changes you can make",
            "Think about: realistic goals",
            "Example: I can drink more water and walk 30 minutes daily."
          ]
        }
      ],
      practice: [
        { question: "I ___ eat breakfast because it gives me energy.", answer: "always", options: ["always", "never", "rarely"] },
        { question: "I want to ___ more and watch less TV.", answer: "exercise", options: ["exercise", "sleep", "eat"] },
        { question: "Drinking ___ is important for health.", answer: "water", options: ["water", "soda", "juice"] },
        { question: "I should ___ 8 hours every night.", answer: "sleep", options: ["sleep", "study", "play"] },
        { question: "Eating ___ is good for my body.", answer: "vegetables", options: ["vegetables", "candy", "chips"] }
      ]
    }
  },
  "4.1": {
    id: "4.1",
    name: "Activity 4.1: Guided Writing Template",
    type: "grammar",
    description: "اكتب فقرة عن روتينك الأسبوعي",
    content: {
      title: "My Weekly Routine",
      explanation: "استخدم هذا القالب لكتابة فقرة عن روتينك",
      rules: [
        {
          rule: "البداية (Opening)",
          examples: [
            "My name is _____ and I am _____ years old.",
            "I have a daily routine that I follow.",
            "Let me tell you about my weekly routine."
          ]
        },
        {
          rule: "الروتين الصباحي (Morning Routine)",
          examples: [
            "I always wake up at _____.",
            "I usually have _____ for breakfast.",
            "I never skip breakfast because _____."
          ]
        },
        {
          rule: "المدرسة والدراسة (School & Study)",
          examples: [
            "I go to school _____ days a week.",
            "I often study _____ subjects.",
            "I sometimes do homework _____."
          ]
        },
        {
          rule: "وقت الفراغ (Free Time)",
          examples: [
            "In my free time, I usually _____.",
            "I sometimes _____ with my friends.",
            "I rarely _____ because _____."
          ]
        },
        {
          rule: "الخاتمة (Closing)",
          examples: [
            "I think my routine is _____.",
            "I want to _____ more.",
            "This is my weekly routine!"
          ]
        }
      ],
      practice: [
        { question: "Start with: My name is ___ and I am ___ years old.", answer: "introduce yourself", options: ["introduce yourself", "end the paragraph", "talk about food"] },
        { question: "Use frequency adverbs like:", answer: "always, usually, sometimes", options: ["always, usually, sometimes", "yesterday, today, tomorrow", "big, small, good"] },
        { question: "Write about your ___ routine.", answer: "daily/weekly", options: ["daily/weekly", "monthly", "yearly"] },
        { question: "Include ___ in your writing.", answer: "Present Simple", options: ["Present Simple", "Past Simple", "Future"] },
        { question: "Aim for ___ words.", answer: "80", options: ["20", "80", "200"] }
      ]
    }
  },
  "4.2": {
    id: "4.2",
    name: "Activity 4.2: Grammar Checker",
    type: "quiz",
    description: "تحقق من الأخطاء النحوية في الجمل",
    questions: [
      {
        question: "Find the mistake: 'She always go to school by bus.'",
        options: ["No mistake", "Should be 'goes'", "Should be 'going'", "Should be 'went'"],
        correct: 1,
        explanation: "مع She نضيف 'es' للفعل: goes"
      },
      {
        question: "Find the mistake: 'They never eats junk food.'",
        options: ["No mistake", "Should be 'eat'", "Should be 'eating'", "Should be 'ate'"],
        correct: 1,
        explanation: "مع They نستخدم الفعل الأصلي: eat"
      },
      {
        question: "Find the mistake: 'I am usually wake up at 7 AM.'",
        options: ["No mistake", "Remove 'am'", "Should be 'waking'", "Add 'to'"],
        correct: 1,
        explanation: "نستخدم 'I usually wake up' بدون am"
      },
      {
        question: "Find the mistake: 'He study English every day.'",
        options: ["No mistake", "Should be 'studies'", "Should be 'studying'", "Should be 'studied'"],
        correct: 1,
        explanation: "مع He نحول y إلى ies: studies"
      },
      {
        question: "Find the mistake: 'We sometimes plays football.'",
        options: ["No mistake", "Should be 'play'", "Should be 'playing'", "Should be 'played'"],
        correct: 1,
        explanation: "مع We نستخدم الفعل الأصلي: play"
      },
      {
        question: "Find the mistake: 'She often drink water.'",
        options: ["No mistake", "Should be 'drinks'", "Should be 'drinking'", "Should be 'drank'"],
        correct: 1,
        explanation: "مع She نضيف s: drinks"
      },
      {
        question: "Find the mistake: 'I always am happy.'",
        options: ["No mistake", "Should be 'am always'", "Should be 'be always'", "Remove 'always'"],
        correct: 1,
        explanation: "ظرف التكرار يأتي بعد verb to be: I am always happy"
      },
      {
        question: "Find the mistake: 'They doesn't like pizza.'",
        options: ["No mistake", "Should be 'don't'", "Should be 'isn't'", "Should be 'aren't'"],
        correct: 1,
        explanation: "مع They نستخدم don't وليس doesn't"
      },
      {
        question: "Find the mistake: 'He don't go to the gym.'",
        options: ["No mistake", "Should be 'doesn't'", "Should be 'isn't'", "Should be 'aren't'"],
        correct: 1,
        explanation: "مع He نستخدم doesn't وليس don't"
      },
      {
        question: "Find the mistake: 'We rarely goes out.'",
        options: ["No mistake", "Should be 'go'", "Should be 'going'", "Should be 'went'"],
        correct: 1,
        explanation: "مع We نستخدم الفعل الأصلي: go"
      }
    ]
  },
  "4.3": {
    id: "4.3",
    name: "Activity 4.3: Reflection Journal",
    type: "grammar",
    description: "أسئلة تأملية عن رحلة التعلم",
    content: {
      title: "Learning Reflection",
      explanation: "فكر في ما تعلمته وأجب على هذه الأسئلة",
      rules: [
        {
          rule: "Question 1: What did you learn in this course?",
          examples: [
            "I learned new vocabulary about daily routines",
            "I learned how to use Present Simple correctly",
            "I learned frequency adverbs like always, usually, sometimes, never",
            "I learned how to describe my habits"
          ]
        },
        {
          rule: "Question 2: What was the most useful activity?",
          examples: [
            "The flashcards helped me learn new words",
            "The grammar exercises were very helpful",
            "The reading passage taught me a lot",
            "The quiz helped me practice"
          ]
        },
        {
          rule: "Question 3: How will you use this English in real life?",
          examples: [
            "I can talk about my daily routine in English",
            "I can describe healthy habits",
            "I can understand texts about lifestyles",
            "I can write about my weekly schedule"
          ]
        }
      ],
      practice: [
        { question: "This course helped me improve my ___.", answer: "English", options: ["English", "Math", "Science"] },
        { question: "I feel ___ confident using Present Simple now.", answer: "more", options: ["more", "less", "not"] },
        { question: "The ___ activities were my favorite.", answer: "interactive", options: ["interactive", "boring", "difficult"] },
        { question: "I can now ___ my daily routine in English.", answer: "describe", options: ["describe", "forget", "ignore"] },
        { question: "I will ___ practicing English.", answer: "continue", options: ["continue", "stop", "never"] }
      ]
    }
  },
  "4.4": {
    id: "4.4",
    name: "Activity 4.4: Final Assessment",
    type: "quiz",
    description: "اختبار شامل نهائي",
    questions: [
      {
        question: "She ___ breakfast at 7 AM every day.",
        options: ["have", "has", "having", "had"],
        correct: 1,
        explanation: "مع She نستخدم has في Present Simple"
      },
      {
        question: "I ___ play football on weekends.",
        options: ["never", "always", "usually", "sometimes"],
        correct: 3,
        explanation: "sometimes مناسب لشيء نفعله أحياناً"
      },
      {
        question: "They ___ to school by bus.",
        options: ["go", "goes", "going", "went"],
        correct: 0,
        explanation: "مع They نستخدم الفعل الأصلي go"
      },
      {
        question: "He is ___ late for class.",
        options: ["never", "not never", "don't", "doesn't"],
        correct: 0,
        explanation: "ظرف التكرار يأتي بعد verb to be"
      },
      {
        question: "We ___ our homework after dinner.",
        options: ["do", "does", "doing", "did"],
        correct: 0,
        explanation: "مع We نستخدم do في Present Simple"
      },
      {
        question: "Healthy teens ___ eat junk food.",
        options: ["always", "usually", "rarely", "often"],
        correct: 2,
        explanation: "الأشخاص الأصحاء نادراً ما يأكلون الطعام غير الصحي"
      },
      {
        question: "She ___ English every day.",
        options: ["study", "studies", "studying", "studied"],
        correct: 1,
        explanation: "نحول y إلى ies مع He/She/It: studies"
      },
      {
        question: "Do you ___ exercise?",
        options: ["never", "rarely", "often", "sometimes"],
        correct: 2,
        explanation: "السؤال عن تكرار التمارين والإجابة المناسبة often"
      },
      {
        question: "___ is important for good health.",
        options: ["Sleep", "Sleeping", "Sleeps", "Slept"],
        correct: 0,
        explanation: "نستخدم المصدر كمبتدأ للجملة"
      },
      {
        question: "I want to ___ more vegetables.",
        options: ["eat", "eats", "eating", "ate"],
        correct: 0,
        explanation: "بعد want to نستخدم الفعل الأصلي"
      }
    ]
  },
  "1.4": {
    id: "1.4",
    name: "Activity 1.4: Self-Check Quiz",
    type: "quiz",
    description: "10 أسئلة اختيار متعدد مع تغذية راجعة فورية",
    questions: [
      {
        question: "I ___ breakfast at 7 AM every day.",
        options: ["have", "has", "having", "had"],
        correct: 0,
        explanation: "نستخدم 'have' مع I/You/We/They"
      },
      {
        question: "She ___ to school by bus.",
        options: ["go", "goes", "going", "gone"],
        correct: 1,
        explanation: "نضيف 'es' مع He/She/It للأفعال المنتهية بـ o"
      },
      {
        question: "They ___ football every Friday.",
        options: ["plays", "play", "playing", "played"],
        correct: 1,
        explanation: "نستخدم الفعل الأصلي مع They"
      },
      {
        question: "He ___ his homework after dinner.",
        options: ["do", "does", "doing", "did"],
        correct: 1,
        explanation: "نستخدم 'does' مع He/She/It"
      },
      {
        question: "What time do you ___ up?",
        options: ["wakes", "wake", "waking", "woke"],
        correct: 1,
        explanation: "بعد 'do' نستخدم الفعل الأصلي"
      },
      {
        question: "She ___ English every day.",
        options: ["study", "studies", "studying", "studied"],
        correct: 1,
        explanation: "نحول y إلى ies مع He/She/It"
      },
      {
        question: "We ___ TV in the evening.",
        options: ["watch", "watches", "watching", "watched"],
        correct: 0,
        explanation: "نستخدم الفعل الأصلي مع We"
      },
      {
        question: "He ___ at 10 PM every night.",
        options: ["sleep", "sleeps", "sleeping", "slept"],
        correct: 1,
        explanation: "نضيف 's' مع He/She/It"
      },
      {
        question: "Do they ___ coffee?",
        options: ["drinks", "drink", "drinking", "drank"],
        correct: 1,
        explanation: "بعد 'Do' نستخدم الفعل الأصلي"
      },
      {
        question: "My sister ___ books before bed.",
        options: ["read", "reads", "reading", "red"],
        correct: 1,
        explanation: "نضيف 's' مع My sister (She)"
      }
    ]
  }
};

export default function ActivityPage() {
  const params = useParams();
  const router = useRouter();
  const activityId = params.activityId as string;
  const courseId = params.id as string;

  const activity = activitiesContent[activityId];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userSentence, setUserSentence] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Save completion when activity is completed
  useEffect(() => {
    if (completed && activity) {
      const savedProgress = localStorage.getItem(`course-${courseId}-progress`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (!progress.completedActivities.includes(activity.name)) {
          progress.completedActivities.push(activity.name);
          progress.totalPoints = (progress.totalPoints || 0) + earnedPoints;
          localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(progress));
        }
      }
    }
  }, [completed, activity, courseId, earnedPoints]);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">النشاط غير موجود</h2>
          <button
            onClick={() => router.push(`/public/courses/${courseId}`)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
          >
            العودة للدورة
          </button>
        </div>
      </div>
    );
  }

  // Flashcards Component
  if (activity.type === "flashcards") {
    const card = activity.cards[currentIndex];
    const progress = Math.round(((currentIndex + 1) / activity.cards.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push(`/public/courses/${courseId}`)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-bold">العودة للدورة</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{activity.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{activity.description}</p>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">البطاقة {currentIndex + 1} من {activity.cards.length}</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* Flashcard */}
          <div className="mb-8">
            <div
              onClick={() => setShowAnswer(!showAnswer)}
              className="relative h-96 cursor-pointer perspective-1000"
            >
              <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${showAnswer ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="h-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-blue-500">
                    <div className="text-9xl mb-6">{card.image}</div>
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{card.english}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">اضغط لرؤية المعنى</p>
                  </div>
                </div>
                
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-white">
                    <div className="text-9xl mb-6">{card.image}</div>
                    <h2 className="text-5xl font-bold mb-4">{card.arabic}</h2>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mt-4">
                      <p className="text-xl italic mb-2">"{card.example}"</p>
                      <p className="text-sm opacity-90">مثال على الاستخدام</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setCurrentIndex(Math.max(0, currentIndex - 1));
                setShowAnswer(false);
              }}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              السابق
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">اضغط على البطاقة للقلب</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">استخدم الأسهم للتنقل</p>
            </div>

            {currentIndex === activity.cards.length - 1 ? (
              <button
                onClick={() => {
                  setCompleted(true);
                  setEarnedPoints(10);
                  setTimeout(() => router.push(`/public/courses/${courseId}`), 2000);
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                إنهاء النشاط ✓
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentIndex(Math.min(activity.cards.length - 1, currentIndex + 1));
                  setShowAnswer(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                التالي
              </button>
            )}
          </div>

          {completed && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl">
                <div className="text-8xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">أحسنت!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">لقد أتممت جميع البطاقات التعليمية</p>
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-6 mb-4">
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">كسبت</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    +10 نقاط ⭐
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">جاري العودة للدورة...</p>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    );
  }

  // Grammar Lesson Component
  if (activity.type === "grammar") {
    const [practiceIndex, setPracticeIndex] = useState(0);
    const [practiceAnswers, setPracticeAnswers] = useState<number[]>([]);
    const [showPracticeResult, setShowPracticeResult] = useState(false);

    const handlePracticeAnswer = (answerIndex: number) => {
      const newAnswers = [...practiceAnswers];
      newAnswers[practiceIndex] = answerIndex;
      setPracticeAnswers(newAnswers);
      setShowPracticeResult(true);
    };

    const practiceQuestion = activity.content.practice[practiceIndex];
    const isCorrect = showPracticeResult && practiceAnswers[practiceIndex] !== undefined && 
                     activity.content.practice[practiceIndex].options[practiceAnswers[practiceIndex]] === practiceQuestion.answer;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <button
            onClick={() => router.push(`/public/courses/${courseId}`)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-bold">العودة للدورة</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{activity.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{activity.description}</p>

          {/* Grammar Explanation */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-5xl">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activity.content.title}</h2>
            </div>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
              {activity.content.explanation}
            </p>

            {activity.content.rules.map((rule: any, idx: number) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  {rule.rule}
                </h3>
                <div className="space-y-2 pl-8">
                  {rule.examples.map((example: string, exIdx: number) => (
                    <div key={exIdx} className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 font-mono">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practice Section */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">✏️</span>
              تمرين تطبيقي ({practiceIndex + 1}/{activity.content.practice.length})
            </h3>

            <div className="mb-6">
              <p className="text-xl text-gray-900 dark:text-white mb-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                {practiceQuestion.question}
              </p>

              <div className="grid gap-3">
                {practiceQuestion.options.map((option: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handlePracticeAnswer(idx)}
                    disabled={showPracticeResult}
                    className={`p-4 rounded-xl font-bold text-left transition-all ${
                      showPracticeResult
                        ? option === practiceQuestion.answer
                          ? "bg-green-500 text-white"
                          : practiceAnswers[practiceIndex] === idx
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    }`}
                  >
                    <span className="mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {showPracticeResult && (
              <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'}`}>
                <p className={`font-bold mb-2 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {isCorrect ? '✓ إجابة صحيحة!' : '✗ إجابة خاطئة'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  الإجابة الصحيحة: <strong>{practiceQuestion.answer}</strong>
                </p>
              </div>
            )}

            <div className="flex justify-between">
              {practiceIndex < activity.content.practice.length - 1 ? (
                <button
                  onClick={() => {
                    setPracticeIndex(practiceIndex + 1);
                    setShowPracticeResult(false);
                  }}
                  disabled={!showPracticeResult}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold disabled:opacity-50 hover:shadow-xl transition-all"
                >
                  السؤال التالي →
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/public/courses/${courseId}`)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  إنهاء الدرس ✓
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Component
  if (activity.type === "quiz") {
    const progress = Math.round(((currentIndex + 1) / activity.questions.length) * 100);
    const question = activity.questions[currentIndex];

    const handleAnswer = (answerIndex: number) => {
      setSelectedAnswer(answerIndex);
      if (answerIndex === question.correct) {
        setScore(score + 1);
      }
    };

    const nextQuestion = () => {
      if (currentIndex < activity.questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setCompleted(true);
        setEarnedPoints(score * 2); // 2 points per correct answer
        setTimeout(() => router.push(`/public/courses/${courseId}`), 3000);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.push(`/public/courses/${courseId}`)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-bold">العودة للدورة</span>
          </button>

          {!completed ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{activity.name}</h1>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">النتيجة</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {score}/{activity.questions.length}
                    </p>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  السؤال {currentIndex + 1} من {activity.questions.length}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {question.question}
                </h2>

                <div className="space-y-3 mb-6">
                  {question.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-xl font-bold text-left transition-all ${
                        selectedAnswer !== null
                          ? idx === question.correct
                            ? "bg-green-500 text-white"
                            : idx === selectedAnswer
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/50"
                      }`}
                    >
                      <span className="mr-3">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                {selectedAnswer !== null && (
                  <>
                    <div className={`p-4 rounded-xl mb-6 ${selectedAnswer === question.correct ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>شرح:</strong> {question.explanation}
                      </p>
                    </div>
                    
                    <button
                      onClick={nextQuestion}
                      className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                    >
                      {currentIndex < activity.questions.length - 1 ? 'السؤال التالي →' : 'عرض النتيجة'}
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl text-center">
              <div className="text-8xl mb-6">
                {score >= 8 ? '🌟' : score >= 6 ? '👍' : '💪'}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {score >= 8 ? 'ممتاز!' : score >= 6 ? 'جيد!' : 'حاول مرة أخرى!'}
              </h2>
              <p className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                {score}/{activity.questions.length}
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {score >= 8 ? 'لقد أتقنت الموضوع!' : score >= 6 ? 'أداء جيد، استمر!' : 'راجع الدرس وحاول مجدداً'}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setSelectedAnswer(null);
                    setScore(0);
                    setCompleted(false);
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  إعادة الاختبار
                </button>
                <button
                  onClick={() => router.push(`/public/courses/${courseId}`)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  العودة للدورة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
