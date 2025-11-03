'use client';

import { useState, useEffect } from 'react';

const topics = [
  "Day 1 – What is Python, print, input/output",
  "Day 2 – Variables, data types, operators",
  "Day 3 – If-else, loops",
  "Day 4 – Functions",
  "Day 5 – Mini project – calculator",
  "Day 6 – Lists and tuples",
  "Day 7 – Dictionaries and sets",
  "Day 8 – Strings and loops",
  "Day 9 – Error handling",
  "Day 10 – Mini project – quiz or word counter",
  "Day 11 – NumPy basics",
  "Day 12 – Pandas (dataframes)",
  "Day 13 – Data filtering",
  "Day 14 – Matplotlib visualization",
  "Day 15 – CSV analysis mini-project",
  "Day 16 – What is Machine Learning",
  "Day 17 – Install Scikit-learn",
  "Day 18 – Linear regression example",
  "Day 19 – Decision Tree example",
  "Day 20 – Mini project – predict house prices"
];

const motivationQuotes = [
  "Keep coding — your AI skills are growing! 💻",
  "Small steps today, big AI tomorrow! 🚀",
  "You're building something amazing! 🌟",
  "Every line of code makes you stronger! 💪",
  "Learning Python is your superpower! ⚡",
  "Progress over perfection! 📈",
  "You've got this! Keep going! 🎯",
  "Future AI expert in the making! 🤖"
];

export default function Home() {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    // Load saved progress from localStorage
    const saved = localStorage.getItem('pythonAIProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setCurrentDay(data.currentDay || 1);
      setCompletedDays(data.completedDays || []);
      setStartDate(data.startDate ? new Date(data.startDate) : new Date());
    } else {
      setStartDate(new Date());
    }

    // Set random quote
    setCurrentQuote(motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]);

    // Check for daily reminder
    const lastReminder = localStorage.getItem('lastReminder');
    const now = new Date().getTime();
    if (!lastReminder || now - parseInt(lastReminder) > 24 * 60 * 60 * 1000) {
      setShowReminder(true);
      localStorage.setItem('lastReminder', now.toString());
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    if (startDate) {
      localStorage.setItem('pythonAIProgress', JSON.stringify({
        currentDay,
        completedDays,
        startDate: startDate.toISOString()
      }));
    }
  }, [currentDay, completedDays, startDate]);

  const markDayComplete = (day) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day]);
      if (day === currentDay && currentDay < 20) {
        setCurrentDay(currentDay + 1);
      }
      setCurrentQuote(motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]);
    }
  };

  const toggleDayComplete = (day) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      markDayComplete(day);
    }
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setCurrentDay(1);
      setCompletedDays([]);
      setStartDate(new Date());
      localStorage.removeItem('pythonAIProgress');
    }
  };

  const daysElapsed = startDate ? Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24)) : 0;
  const progressPercentage = (completedDays.length / 20) * 100;

  return (
    <div style={styles.container}>
      {showReminder && (
        <div style={styles.reminder}>
          <div style={styles.reminderContent}>
            <h2 style={styles.reminderTitle}>📚 Daily Learning Reminder!</h2>
            <p style={styles.reminderText}>It's time for your Python & AI learning session!</p>
            <button
              onClick={() => setShowReminder(false)}
              style={styles.reminderButton}
            >
              Let's Go! 🚀
            </button>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <h1 style={styles.title}>🐍 20-Day Python + AI Learning Journey</h1>
        <p style={styles.subtitle}>{currentQuote}</p>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{completedDays.length}/20</div>
          <div style={styles.statLabel}>Days Completed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{daysElapsed}</div>
          <div style={styles.statLabel}>Days Since Start</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{Math.round(progressPercentage)}%</div>
          <div style={styles.statLabel}>Progress</div>
        </div>
      </div>

      <div style={styles.progressBarContainer}>
        <div style={{...styles.progressBar, width: `${progressPercentage}%`}}></div>
      </div>

      <div style={styles.topicsContainer}>
        {topics.map((topic, index) => {
          const day = index + 1;
          const isCompleted = completedDays.includes(day);
          const isCurrent = day === currentDay;

          return (
            <div
              key={day}
              style={{
                ...styles.topicCard,
                ...(isCompleted ? styles.topicCardCompleted : {}),
                ...(isCurrent ? styles.topicCardCurrent : {})
              }}
              onClick={() => toggleDayComplete(day)}
            >
              <div style={styles.topicHeader}>
                <span style={styles.dayNumber}>
                  {isCompleted ? '✓' : day}
                </span>
                <span style={styles.topicText}>{topic}</span>
              </div>
              {isCurrent && !isCompleted && (
                <div style={styles.currentBadge}>← You are here</div>
              )}
            </div>
          );
        })}
      </div>

      <div style={styles.footer}>
        <button onClick={resetProgress} style={styles.resetButton}>
          Reset Progress
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '30px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    margin: 0
  },
  statsContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px 30px',
    minWidth: '150px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666'
  },
  progressBarContainer: {
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '20px',
    height: '20px',
    marginBottom: '30px',
    overflow: 'hidden'
  },
  progressBar: {
    background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)',
    height: '100%',
    borderRadius: '20px',
    transition: 'width 0.5s ease'
  },
  topicsContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  topicCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '15px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  topicCardCompleted: {
    background: '#4CAF50',
    color: 'white'
  },
  topicCardCurrent: {
    border: '3px solid #FFD700',
    boxShadow: '0 4px 12px rgba(255,215,0,0.4)'
  },
  topicHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  dayNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#667eea',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    flexShrink: 0
  },
  topicText: {
    fontSize: '1.1rem',
    flex: 1
  },
  currentBadge: {
    marginTop: '10px',
    fontSize: '0.9rem',
    color: '#FFD700',
    fontWeight: 'bold'
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    paddingBottom: '20px'
  },
  resetButton: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    padding: '12px 30px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  },
  reminder: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  reminderContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '400px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
  },
  reminderTitle: {
    fontSize: '2rem',
    margin: '0 0 15px 0',
    color: '#667eea'
  },
  reminderText: {
    fontSize: '1.2rem',
    margin: '0 0 25px 0',
    color: '#666'
  },
  reminderButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '15px 40px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};
