import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { calculateInitialInterval } from '../data/spacedRepetition';
import { initWidgets, syncWidgetData } from '../services/widgetBridge';
import { configure as configureFeedback } from '../services/feedback';
import { configure as configureAmbientMusic } from '../services/ambientMusic';

const AppContext = createContext(null);

const STORAGE_KEY = 'aisafety-state-v1';

const defaultState = {
    // Lesson completion: { [lessonId]: number }
    completedLessons: {},
    // Card mastery: { [cardId]: { whatScore, whyScore, howScore, timesReviewed, lastSeen, overallMastery } }
    cardMastery: {},
    // Set of card IDs the user has seen the learn card for
    seenCards: [],
    // Starred/favorited card IDs
    starredCards: [],
    // XP
    totalXP: 0,
    // Streak
    currentStreak: 0,
    lastActiveDate: null, // ISO date string e.g. '2025-02-23'
    // Settings
    settingsOpen: false,
    // Whether the rating prompt has been shown/dismissed
    ratingPromptDismissed: false,
    // Notifications
    notificationOnboardingDismissed: false,
    notificationsEnabled: false,
    dailyReminderTime: '09:00',
    streakRemindersEnabled: true,
    // Cards per lesson setting (1, 2, or 3). Undefined until user makes a choice.
    // cardsPerLesson: undefined (not set here — LessonFlow falls back to 3)
    // Whether the favorites tip has been shown
    hasSeenFavoriteTip: false,
    // Appearance
    themeMode: 'light', // 'light' | 'dark' | 'system'
    // Sound & haptic feedback (volumes 0–1; 0 = muted/off)
    soundVolume: 1,
    hapticsEnabled: true,
    musicVolume: 1,
    musicPromptDismissed: false,

    // ─── Daily Quiz ───
    dailyQuiz: {
        lastCompletedDate: null,  // ISO date string 'YYYY-MM-DD'
        lastAttemptedDate: null,  // ISO date string — set when quiz is opened (hides card for the day)
        lastXPEarned: 0,
        totalCompleted: 0,
        acquiredCardIds: [],      // card IDs acquired via daily quiz
        lastResults: null,        // { questions: [...], results: ['correct'|'wrong'], xpEarned }
    },

    // ─── Achievements ───
    achievements: {},       // { [achievementId]: ISO timestamp }
    newAchievements: [],    // IDs unlocked this session (for toast)

    // ─── Onboarding ───
    // 'welcome' | 'topic_overview' | 'complete' | null
    onboardingStep: 'welcome',

    // ─── Spaced Repetition Schedule ───
    // { [cardId]: { interval, ease, nextReview, reviewCount, lastReviewScore } }
    srSchedule: {},

    // ─── Study Timer ───
    totalStudyTime: 0,       // cumulative seconds
    studySessions: [],       // [{ date, duration, type, questionsAnswered }] — last 50

    // ─── Fun Facts ───
    seenFunFacts: [],  // IDs of fun facts the user has answered

    // ─── Course Mode ───
    // null = general mode (no course), or { courseId, unlockedAt }
    courseMode: null,

    // ─── Challenge Mode ───
    challenge: {
        soloHighScore: 0,
        soloGamesPlayed: 0,
        soloBestStreak: 0,
        totalChallengeCorrect: 0,
        multiplayerGamesPlayed: 0,
        multiplayerVictories: 0,
        lastPlayedDate: null,
    },
};

function migrateState(parsed) {
    const merged = { ...defaultState, ...parsed, settingsOpen: false };

    // Migration: rename old field names to new ones
    if (parsed.eventMastery && !parsed.cardMastery) {
        merged.cardMastery = parsed.eventMastery;
        delete merged.eventMastery;
    }
    if (parsed.seenEvents && !parsed.seenCards) {
        merged.seenCards = parsed.seenEvents;
        delete merged.seenEvents;
    }
    if (parsed.starredEvents && !parsed.starredCards) {
        merged.starredCards = parsed.starredEvents;
        delete merged.starredCards;
    }

    // Migration: rename acquiredEventIds to acquiredCardIds in dailyQuiz
    if (parsed.dailyQuiz?.acquiredEventIds && !parsed.dailyQuiz?.acquiredCardIds) {
        merged.dailyQuiz = {
            ...merged.dailyQuiz,
            acquiredCardIds: parsed.dailyQuiz.acquiredEventIds,
        };
        delete merged.dailyQuiz.acquiredEventIds;
    }

    // Migration: remove legacy fields
    delete merged.placementQuizzes;
    delete merged.skippedEvents;
    delete merged.eventMastery;
    delete merged.seenEvents;
    delete merged.starredEvents;

    // Migration: existing users skip onboarding
    if (parsed.onboardingStep === undefined) {
        const hasProgress = Object.keys(parsed.completedLessons || {}).length > 0
            || (parsed.seenCards || parsed.seenEvents || []).length > 0;
        merged.onboardingStep = hasProgress ? 'complete' : 'welcome';
    }

    // Migration: removed onboarding steps — redirect to 'complete'
    if (['post_lesson0', 'placement_offer', 'guide_lesson0', 'placement_active'].includes(parsed.onboardingStep)) {
        merged.onboardingStep = 'complete';
    }

    // Migration: ensure srSchedule exists for all seen cards
    if (!parsed.srSchedule) {
        merged.srSchedule = {};
        const today = getTodayDate();
        (merged.seenCards || []).forEach(id => {
            const mastery = merged.cardMastery[id];
            merged.srSchedule[id] = {
                interval: mastery ? calculateInitialInterval(mastery) : 0,
                ease: 2.5,
                nextReview: today,
                reviewCount: 0,
                lastReviewScore: null,
            };
        });
    }

    // Migration: daily quiz + achievements
    if (!parsed.dailyQuiz) merged.dailyQuiz = { lastCompletedDate: null, lastAttemptedDate: null, lastXPEarned: 0, totalCompleted: 0, acquiredCardIds: [] };
    else {
        if (!('lastAttemptedDate' in parsed.dailyQuiz)) merged.dailyQuiz = { ...merged.dailyQuiz, lastAttemptedDate: null };
        if (!parsed.dailyQuiz.acquiredCardIds && !parsed.dailyQuiz.acquiredEventIds) merged.dailyQuiz = { ...merged.dailyQuiz, acquiredCardIds: [] };
    }
    if (!parsed.achievements) merged.achievements = {};
    if (!parsed.newAchievements) merged.newAchievements = [];

    // Migration: study timer
    if (parsed.totalStudyTime === undefined) merged.totalStudyTime = 0;
    if (!parsed.studySessions) merged.studySessions = [];

    // Migration: theme
    if (parsed.themeMode === undefined) merged.themeMode = 'light';

    // Migration: sound & haptics — convert legacy booleans to volumes
    if (parsed.soundVolume === undefined) {
        merged.soundVolume = parsed.soundEnabled === false ? 0 : 1;
    }
    if (parsed.hapticsEnabled === undefined) merged.hapticsEnabled = true;
    if (parsed.musicVolume === undefined) {
        merged.musicVolume = parsed.musicEnabled === false ? 0 : 1;
    }
    if (parsed.musicPromptDismissed === undefined) merged.musicPromptDismissed = false;

    // Migration: course mode
    if (parsed.courseMode === undefined) merged.courseMode = null;

    // Migration: challenge mode
    if (!parsed.challenge) merged.challenge = {
        soloHighScore: 0, soloGamesPlayed: 0, soloBestStreak: 0,
        totalChallengeCorrect: 0, multiplayerGamesPlayed: 0, lastPlayedDate: null,
    };

    return merged;
}

function getInitialState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return migrateState(parsed);
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
    return defaultState;
}

function calculateOverallMastery(mastery) {
    const scoreMap = { green: 3, yellow: 1, red: 0 };
    const what = scoreMap[mastery.whatScore] ?? 0;
    // null whyScore = exempt (card has no whyItMatters) → full 3 points
    const why = mastery.whyScore != null ? (scoreMap[mastery.whyScore] ?? 0) : 3;
    const how = scoreMap[mastery.howScore] ?? 0;
    return what + why + how;
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function reducer(state, action) {
    switch (action.type) {
        case 'COMPLETE_LESSON': {
            const prev = state.completedLessons[action.lessonId] || 0;
            return {
                ...state,
                completedLessons: {
                    ...state.completedLessons,
                    [action.lessonId]: prev + 1
                }
            };
        }

        case 'MARK_CARDS_SEEN': {
            const newSeen = [...new Set([...state.seenCards, ...action.cardIds])];
            // Also initialize SR entries for newly seen cards
            const newSr = { ...state.srSchedule };
            const today = getTodayDate();
            action.cardIds.forEach(id => {
                if (!newSr[id]) {
                    newSr[id] = {
                        interval: 0,
                        ease: 2.5,
                        nextReview: today,
                        reviewCount: 0,
                        lastReviewScore: null,
                    };
                }
            });
            return { ...state, seenCards: newSeen, srSchedule: newSr };
        }

        case 'MARK_FUN_FACT_SEEN': {
            const ffId = action.funFactId;
            if (state.seenFunFacts.includes(ffId)) return state;
            return { ...state, seenFunFacts: [...state.seenFunFacts, ffId] };
        }

        case 'UPDATE_CARD_MASTERY': {
            const { cardId, questionType, score } = action;
            const existing = state.cardMastery[cardId] || {
                whatScore: null,
                whyScore: null,
                howScore: null,
                timesReviewed: 0,
                lastSeen: null,
                overallMastery: 0
            };

            const updated = { ...existing };
            if (questionType === 'what') updated.whatScore = score;
            if (questionType === 'why') updated.whyScore = score;
            if (questionType === 'how') updated.howScore = score;
            updated.timesReviewed = (existing.timesReviewed || 0) + 1;
            updated.lastSeen = Date.now();
            updated.overallMastery = calculateOverallMastery(updated);

            return {
                ...state,
                cardMastery: {
                    ...state.cardMastery,
                    [cardId]: updated
                }
            };
        }

        case 'ADD_XP': {
            const today = getTodayDate();
            let newStreak = state.currentStreak;

            if (state.lastActiveDate !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (state.lastActiveDate === yesterdayStr) {
                    newStreak = state.currentStreak + 1;
                } else if (!state.lastActiveDate) {
                    newStreak = 1;
                } else {
                    newStreak = 1;
                }
            }

            return {
                ...state,
                totalXP: state.totalXP + action.amount,
                currentStreak: newStreak,
                lastActiveDate: today
            };
        }

        case 'UPDATE_STREAK': {
            const today = getTodayDate();
            if (state.lastActiveDate === today) return state;

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (state.lastActiveDate === yesterdayStr) {
                return state; // streak is still active
            }
            if (state.lastActiveDate && state.lastActiveDate !== today) {
                // Streak broken
                return { ...state, currentStreak: 0 };
            }
            return state;
        }

        case 'TOGGLE_STAR': {
            const { cardId } = action;
            const starred = state.starredCards || [];
            const isStarred = starred.includes(cardId);
            return {
                ...state,
                starredCards: isStarred
                    ? starred.filter(id => id !== cardId)
                    : [...starred, cardId]
            };
        }

        case 'CLEAR_ALL_STARS':
            return { ...state, starredCards: [] };

        case 'TOGGLE_SETTINGS': {
            return { ...state, settingsOpen: !state.settingsOpen };
        }

        case 'IMPORT_STATE': {
            return migrateState(action.payload);
        }

        case 'DISMISS_RATING_PROMPT': {
            return { ...state, ratingPromptDismissed: true };
        }

        case 'SET_CARDS_PER_LESSON': {
            return { ...state, cardsPerLesson: action.value };
        }

        case 'SET_RECAP_PER_CARD': {
            return { ...state, recapPerCard: action.value };
        }

        case 'DISMISS_NOTIFICATION_ONBOARDING': {
            return { ...state, notificationOnboardingDismissed: true };
        }

        case 'ENABLE_NOTIFICATIONS': {
            return {
                ...state,
                notificationsEnabled: true,
                notificationOnboardingDismissed: true,
                ...(action.dailyReminderTime && { dailyReminderTime: action.dailyReminderTime }),
                ...(action.streakRemindersEnabled !== undefined && { streakRemindersEnabled: action.streakRemindersEnabled }),
            };
        }

        case 'DISABLE_NOTIFICATIONS': {
            return { ...state, notificationsEnabled: false };
        }

        case 'SET_DAILY_REMINDER_TIME': {
            return { ...state, dailyReminderTime: action.value };
        }

        case 'SET_STREAK_REMINDERS': {
            return { ...state, streakRemindersEnabled: action.value };
        }

        case 'DISMISS_FAVORITE_TIP': {
            return { ...state, hasSeenFavoriteTip: true };
        }

        case 'SET_SOUND_VOLUME': {
            return { ...state, soundVolume: action.value };
        }

        case 'TOGGLE_HAPTICS': {
            return { ...state, hapticsEnabled: !state.hapticsEnabled };
        }

        case 'SET_MUSIC_VOLUME': {
            return { ...state, musicVolume: action.value };
        }

        case 'SET_THEME': {
            return { ...state, themeMode: action.mode };
        }

        case 'DISMISS_MUSIC_PROMPT': {
            return { ...state, musicPromptDismissed: true };
        }

        // ─── Onboarding ───
        case 'SET_ONBOARDING_STEP': {
            return { ...state, onboardingStep: action.step };
        }

        // ─── Spaced Repetition ───
        case 'UPDATE_SR_SCHEDULE': {
            return {
                ...state,
                srSchedule: {
                    ...state.srSchedule,
                    [action.cardId]: {
                        interval: action.interval,
                        ease: action.ease,
                        nextReview: action.nextReview,
                        reviewCount: action.reviewCount,
                        lastReviewScore: action.lastReviewScore,
                    },
                },
            };
        }

        // ─── Study Timer ───
        case 'RECORD_STUDY_SESSION': {
            const session = {
                date: new Date().toISOString(),
                duration: action.duration,       // seconds
                type: action.sessionType,        // 'lesson' | 'practice' | 'daily_quiz'
                questionsAnswered: action.questionsAnswered || 0,
            };
            const sessions = [...state.studySessions, session].slice(-50); // keep last 50
            return {
                ...state,
                totalStudyTime: state.totalStudyTime + action.duration,
                studySessions: sessions,
            };
        }

        // ─── Daily Quiz ───
        case 'START_DAILY_QUIZ': {
            return {
                ...state,
                dailyQuiz: {
                    ...state.dailyQuiz,
                    lastAttemptedDate: getTodayDate(),
                },
            };
        }
        case 'COMPLETE_DAILY_QUIZ': {
            return {
                ...state,
                dailyQuiz: {
                    ...state.dailyQuiz,
                    lastCompletedDate: getTodayDate(),
                    lastXPEarned: action.xpEarned,
                    totalCompleted: (state.dailyQuiz?.totalCompleted || 0) + 1,
                    lastResults: action.lastResults || null,
                    acquiredCardIds: [
                        ...new Set([
                            ...(state.dailyQuiz?.acquiredCardIds || []),
                            ...(action.cardIds || []),
                        ]),
                    ],
                },
            };
        }

        // ─── Achievements ───
        case 'UNLOCK_ACHIEVEMENT': {
            if (state.achievements[action.achievementId]) return state;
            return {
                ...state,
                achievements: {
                    ...state.achievements,
                    [action.achievementId]: new Date().toISOString(),
                },
                newAchievements: action.silent
                    ? (state.newAchievements || [])
                    : [...(state.newAchievements || []), action.achievementId],
            };
        }

        case 'DISMISS_ACHIEVEMENT_TOAST': {
            return { ...state, newAchievements: [] };
        }

        // ─── Challenge Mode ───
        case 'UPDATE_CHALLENGE_STATS': {
            const ch = state.challenge || {};
            const newHighScore = Math.max(ch.soloHighScore || 0, action.score || 0);
            const newBestStreak = Math.max(ch.soloBestStreak || 0, action.bestStreak || 0);
            return {
                ...state,
                challenge: {
                    ...ch,
                    soloHighScore: action.mode === 'solo' ? newHighScore : (ch.soloHighScore || 0),
                    soloGamesPlayed: action.mode === 'solo'
                        ? (ch.soloGamesPlayed || 0) + 1
                        : (ch.soloGamesPlayed || 0),
                    soloBestStreak: action.mode === 'solo' ? newBestStreak : (ch.soloBestStreak || 0),
                    totalChallengeCorrect: (ch.totalChallengeCorrect || 0) + (action.correctCount || 0),
                    multiplayerGamesPlayed: action.mode === 'multiplayer'
                        ? (ch.multiplayerGamesPlayed || 0) + 1
                        : (ch.multiplayerGamesPlayed || 0),
                    multiplayerVictories: action.isVictory
                        ? (ch.multiplayerVictories || 0) + 1
                        : (ch.multiplayerVictories || 0),
                    lastPlayedDate: getTodayDate(),
                },
            };
        }

        // ─── Course Mode ───
        case 'ACTIVATE_COURSE': {
            return {
                ...state,
                courseMode: {
                    courseId: action.courseId,
                    unlockedAt: new Date().toISOString(),
                },
            };
        }

        case 'DEACTIVATE_COURSE': {
            return { ...state, courseMode: null };
        }

        case 'RESET_PROGRESS': {
            // After reset, don't re-show onboarding — user already knows the app
            // Preserve total study time — it represents real effort
            return { ...defaultState, onboardingStep: 'complete', totalStudyTime: state.totalStudyTime, studySessions: state.studySessions };
        }

        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, null, getInitialState);

    // Persist to localStorage + sync widgets
    const widgetsInitialized = useRef(false);
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
        syncWidgetData(state);
        configureFeedback({ soundVolume: state.soundVolume, hapticsEnabled: state.hapticsEnabled });
        configureAmbientMusic({ musicVolume: state.musicVolume });
    }, [state]);

    // Check streak on mount + init widgets
    useEffect(() => {
        dispatch({ type: 'UPDATE_STREAK' });
        if (!widgetsInitialized.current) {
            widgetsInitialized.current = true;
            initWidgets();
        }
    }, []);

    // ─── Theme: apply data-theme attribute + meta theme-color ───
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const apply = () => {
            const resolved = state.themeMode === 'system'
                ? (mq.matches ? 'dark' : 'light')
                : state.themeMode;
            document.documentElement.dataset.theme = resolved;
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0F172A' : '#F0F4F8');
        };
        apply();
        if (state.themeMode === 'system') {
            mq.addEventListener('change', apply);
            return () => mq.removeEventListener('change', apply);
        }
    }, [state.themeMode]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars
export function useIsLessonUnlocked(lessonIndex, lessons) {
    // All lessons unlocked for testing — TODO: restore sequential gating
    // const { state } = useApp();
    // if (lessonIndex === 0) return true;
    // const prevLesson = lessons[lessonIndex - 1];
    // return !!state.completedLessons[prevLesson.id];
    return true;
}
