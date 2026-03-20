import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CORE_CONCEPT_COUNT } from './concepts';
import { LESSONS } from './lessons';
import { Lightbulb, BookOpen, GraduationCap, Library, Crown, Flame, Star, Gem, Sparkles, Trophy, Brain, Map, Calendar, Zap, Target, Users, Moon, RefreshCcw, Clover } from 'lucide-react';

const TOTAL_LESSON_COUNT = LESSONS.length;

export const ACHIEVEMENTS = [
    // ─── Learning ───
    {
        id: 'first-lesson',
        title: 'First Insight',
        description: 'Complete your first lesson',
        hint: 'Complete any lesson from the Learn tab to take your first steps into AI safety.',
        icon: Lightbulb,
        iconColor: '#F59E0B',
        shareEmoji: '\uD83D\uDCA1',
        category: 'learning',
        check: (state) => Object.keys(state.completedLessons).length >= 1,
        progress: (state) => ({ current: Object.keys(state.completedLessons).length, target: 1 }),
    },
    {
        id: 'five-lessons',
        title: 'Getting Started',
        description: 'Complete 5 lessons',
        icon: BookOpen,
        iconColor: '#5B8DEF',
        shareEmoji: '\uD83D\uDCD6',
        category: 'learning',
        check: (state) => Object.keys(state.completedLessons).length >= 5,
        progress: (state) => ({ current: Math.min(Object.keys(state.completedLessons).length, 5), target: 5 }),
    },
    {
        id: 'ten-lessons',
        title: 'Scholar',
        description: 'Complete 10 lessons',
        icon: GraduationCap,
        iconColor: '#6366B8',
        shareEmoji: '\uD83C\uDF93',
        category: 'learning',
        check: (state) => Object.keys(state.completedLessons).length >= 10,
        progress: (state) => ({ current: Math.min(Object.keys(state.completedLessons).length, 10), target: 10 }),
    },
    {
        id: 'all-lessons',
        title: 'Safety Scholar',
        description: 'Complete all lessons',
        hint: 'Finish all lessons in the learning path to earn this achievement.',
        icon: Library,
        iconColor: '#2BA89E',
        shareEmoji: '\uD83C\uDFDB\uFE0F',
        category: 'learning',
        check: (state) => Object.keys(state.completedLessons).length >= TOTAL_LESSON_COUNT,
        progress: (state) => ({
            current: Math.min(Object.keys(state.completedLessons).length, TOTAL_LESSON_COUNT),
            target: TOTAL_LESSON_COUNT,
        }),
    },
    {
        id: 'ai-safety-expert',
        title: 'AI Safety Expert',
        description: 'Complete every lesson and master all concepts',
        hint: 'Finish all lessons and achieve high mastery across every concept.',
        icon: Crown,
        iconColor: '#D4A026',
        shareEmoji: '\uD83D\uDC51',
        category: 'learning',
        check: (state) => Object.keys(state.completedLessons).length >= TOTAL_LESSON_COUNT,
        progress: (state) => ({ current: Math.min(Object.keys(state.completedLessons).length, TOTAL_LESSON_COUNT), target: TOTAL_LESSON_COUNT }),
    },

    // ─── Streaks ───
    {
        id: 'streak-3',
        title: 'On Fire',
        description: 'Reach a 3-day streak',
        icon: Flame,
        iconColor: '#E65100',
        shareEmoji: '\uD83D\uDD25',
        category: 'streaks',
        check: (state) => state.currentStreak >= 3,
        progress: (state) => ({ current: Math.min(state.currentStreak, 3), target: 3 }),
    },
    {
        id: 'streak-7',
        title: 'Dedicated',
        description: 'Reach a 7-day streak',
        icon: Star,
        iconColor: '#F59E0B',
        shareEmoji: '\u2B50',
        category: 'streaks',
        check: (state) => state.currentStreak >= 7,
        progress: (state) => ({ current: Math.min(state.currentStreak, 7), target: 7 }),
    },
    {
        id: 'streak-30',
        title: 'Unstoppable',
        description: 'Reach a 30-day streak',
        icon: Gem,
        iconColor: '#9370DB',
        shareEmoji: '\uD83D\uDC8E',
        category: 'streaks',
        check: (state) => state.currentStreak >= 30,
        progress: (state) => ({ current: Math.min(state.currentStreak, 30), target: 30 }),
    },

    // ─── XP ───
    {
        id: 'xp-100',
        title: 'Rising Star',
        description: 'Earn 100 XP',
        icon: Sparkles,
        iconColor: '#F59E0B',
        shareEmoji: '\u2728',
        category: 'xp',
        check: (state) => state.totalXP >= 100,
        progress: (state) => ({ current: Math.min(state.totalXP, 100), target: 100 }),
    },
    {
        id: 'xp-500',
        title: 'Bright Mind',
        description: 'Earn 500 XP',
        icon: Star,
        iconColor: '#D4A026',
        shareEmoji: '\uD83C\uDF1F',
        category: 'xp',
        check: (state) => state.totalXP >= 500,
        progress: (state) => ({ current: Math.min(state.totalXP, 500), target: 500 }),
    },
    {
        id: 'xp-2000',
        title: 'Grandmaster',
        description: 'Earn 2000 XP',
        icon: Crown,
        iconColor: '#D4A026',
        shareEmoji: '\uD83D\uDC51',
        category: 'xp',
        check: (state) => state.totalXP >= 2000,
        progress: (state) => ({ current: Math.min(state.totalXP, 2000), target: 2000 }),
    },

    // ─── Discovery ───
    {
        id: 'discover-30',
        title: 'Curious Mind',
        description: 'Discover 30 cards',
        icon: Brain,
        iconColor: '#E65100',
        shareEmoji: '\uD83E\uDDE0',
        category: 'discovery',
        check: (state) => (state.seenCards || []).length >= 30,
        progress: (state) => ({ current: Math.min((state.seenCards || []).length, 30), target: 30 }),
    },
    {
        id: 'discover-all',
        title: 'Knowledge Mapper',
        description: `Discover all ${CORE_CONCEPT_COUNT} concepts`,
        hint: `Complete lessons and practice to encounter all ${CORE_CONCEPT_COUNT} AI safety concepts.`,
        icon: Map,
        iconColor: '#2BA89E',
        shareEmoji: '\uD83D\uDDFA\uFE0F',
        category: 'discovery',
        check: (state) => (state.seenCards || []).length >= CORE_CONCEPT_COUNT,
        progress: (state) => ({ current: Math.min((state.seenCards || []).length, CORE_CONCEPT_COUNT), target: CORE_CONCEPT_COUNT }),
    },

    // ─── Collection ───
    {
        id: 'collect-10',
        title: 'Curator',
        description: 'Star 10 cards',
        icon: Trophy,
        iconColor: '#D4A026',
        shareEmoji: '\uD83C\uDFC6',
        category: 'collection',
        check: (state) => (state.starredCards || []).length >= 10,
        progress: (state) => ({ current: Math.min((state.starredCards || []).length, 10), target: 10 }),
    },

    // ─── Mastery ───
    {
        id: 'mastery-5',
        title: 'Sharp Mind',
        description: 'Master 5 cards (6+ mastery)',
        hint: 'Score 6 or higher on 5 different cards. Practice cards you\u2019ve already seen to boost their mastery.',
        icon: Brain,
        iconColor: '#9370DB',
        shareEmoji: '\uD83E\uDDE0',
        category: 'mastery',
        check: (state) => Object.values(state.cardMastery || {}).filter(m => m.overallMastery >= 6).length >= 5,
        progress: (state) => ({
            current: Math.min(Object.values(state.cardMastery || {}).filter(m => m.overallMastery >= 6).length, 5),
            target: 5,
        }),
    },

    // ─── Daily Quiz ───
    {
        id: 'daily-5',
        title: 'Daily Devotee',
        description: 'Complete 5 daily quizzes',
        icon: Calendar,
        iconColor: '#5B8DEF',
        shareEmoji: '\uD83D\uDCC5',
        category: 'daily',
        check: (state) => (state.dailyQuiz?.totalCompleted || 0) >= 5,
        progress: (state) => ({ current: Math.min(state.dailyQuiz?.totalCompleted || 0, 5), target: 5 }),
    },

    // ─── Challenge Mode ───
    {
        id: 'challenge-first',
        title: 'Challenger',
        description: 'Complete your first challenge game',
        icon: Zap,
        iconColor: '#E65100',
        shareEmoji: '\u26A1',
        category: 'challenge',
        check: (state) => ((state.challenge?.soloGamesPlayed || 0) + (state.challenge?.multiplayerGamesPlayed || 0)) >= 1,
        progress: (state) => ({ current: Math.min((state.challenge?.soloGamesPlayed || 0) + (state.challenge?.multiplayerGamesPlayed || 0), 1), target: 1 }),
    },
    {
        id: 'challenge-score-10',
        title: 'On a Roll',
        description: 'Score 10 in a single challenge game',
        icon: Target,
        iconColor: '#D45B5B',
        shareEmoji: '\uD83C\uDFAF',
        category: 'challenge',
        check: (state) => (state.challenge?.soloHighScore || 0) >= 10,
        progress: (state) => ({ current: Math.min(state.challenge?.soloHighScore || 0, 10), target: 10 }),
    },
    {
        id: 'challenge-score-25',
        title: 'Unstoppable Force',
        description: 'Score 25 in a single challenge game',
        icon: Flame,
        iconColor: '#C62828',
        shareEmoji: '\uD83D\uDD25',
        category: 'challenge',
        check: (state) => (state.challenge?.soloHighScore || 0) >= 25,
        progress: (state) => ({ current: Math.min(state.challenge?.soloHighScore || 0, 25), target: 25 }),
    },
    {
        id: 'challenge-streak-5',
        title: 'Flawless Five',
        description: 'Get 5 correct in a row in a challenge',
        icon: Sparkles,
        iconColor: '#D4A026',
        shareEmoji: '\u2728',
        category: 'challenge',
        check: (state) => (state.challenge?.soloBestStreak || 0) >= 5,
        progress: (state) => ({ current: Math.min(state.challenge?.soloBestStreak || 0, 5), target: 5 }),
    },
    {
        id: 'challenge-multiplayer',
        title: 'Party Time',
        description: 'Play a multiplayer challenge',
        icon: Users,
        iconColor: '#6366B8',
        shareEmoji: '\uD83C\uDF89',
        category: 'challenge',
        check: (state) => (state.challenge?.multiplayerGamesPlayed || 0) >= 1,
        progress: (state) => ({ current: Math.min(state.challenge?.multiplayerGamesPlayed || 0, 1), target: 1 }),
    },
];

// ─── Bonus (Hidden) Achievements ───
// These remain hidden ("???") until randomly unlocked.
// Each has a trigger condition (must be true) + a random chance per qualifying state change.
export const BONUS_ACHIEVEMENTS = [
    {
        id: 'bonus-deep-thinker',
        title: 'Deep Thinker',
        description: 'The concepts resonated with you',
        icon: Brain,
        iconColor: '#9370DB',
        shareEmoji: '\uD83E\uDDE0',
        category: 'bonus',
        hidden: true,
        triggerKey: (state) => Object.keys(state.completedLessons).length,
        triggerCondition: (state) => Object.keys(state.completedLessons).length >= 1,
        chance: 0.08,
    },
    {
        id: 'bonus-lucky-scholar',
        title: 'Lucky Scholar',
        description: 'Fortune favors the curious',
        icon: Clover,
        iconColor: '#2E7D32',
        shareEmoji: '\uD83C\uDF40',
        category: 'bonus',
        hidden: true,
        triggerKey: (state) => state.totalXP,
        triggerCondition: (state) => state.totalXP >= 50,
        chance: 0.03,
    },
    {
        id: 'bonus-night-owl',
        title: 'Night Owl',
        description: 'AI safety never sleeps, and neither do you',
        icon: Moon,
        iconColor: '#6366B8',
        shareEmoji: '\uD83E\uDD89',
        category: 'bonus',
        hidden: true,
        triggerKey: (state) => (state.studySessions || []).length,
        triggerCondition: () => {
            const hour = new Date().getHours();
            return hour >= 22 || hour < 5;
        },
        chance: 0.20,
    },
    {
        id: 'bonus-paradigm-shift',
        title: 'Paradigm Shift',
        description: 'A new way of thinking about AI!',
        icon: Lightbulb,
        iconColor: '#F59E0B',
        shareEmoji: '\uD83D\uDCA1',
        category: 'bonus',
        hidden: true,
        triggerKey: (state) => state.dailyQuiz?.totalCompleted || 0,
        triggerCondition: (state) => (state.dailyQuiz?.totalCompleted || 0) >= 1,
        chance: 0.15,
    },
    {
        id: 'bonus-deja-vu',
        title: 'D\u00e9j\u00e0 Vu',
        description: "Haven't we been here before?",
        icon: RefreshCcw,
        iconColor: '#5B8DEF',
        shareEmoji: '\uD83D\uDD04',
        category: 'bonus',
        hidden: true,
        triggerKey: (state) => state.currentStreak,
        triggerCondition: (state) => state.currentStreak >= 2,
        chance: 0.10,
    },
    {
        id: 'bonus-hidden-gem',
        title: 'Hidden Gem',
        description: 'A rare find in the world of AI safety',
        icon: Gem,
        iconColor: '#9370DB',
        shareEmoji: '\uD83D\uDC8E',
        category: 'bonus',
        hidden: true,
        triggerKey: (state) => (state.starredCards || []).length,
        triggerCondition: (state) => (state.starredCards || []).length >= 1,
        chance: 0.12,
    },
];

/** All achievements combined */
export const ALL_ACHIEVEMENTS = [...ACHIEVEMENTS, ...BONUS_ACHIEVEMENTS];

/** Returns achievement IDs that should be unlocked but aren't yet */
export function checkAchievements(state) {
    const unlocked = state.achievements || {};
    return ACHIEVEMENTS
        .filter(a => !unlocked[a.id] && a.check(state))
        .map(a => a.id);
}

/** Hook that checks for new achievements on state changes and dispatches unlocks. */
export function useAchievementChecker() {
    const { state, dispatch } = useApp();
    const prevChecked = useRef(new Set(Object.keys(state.achievements || {})));
    const mounted = useRef(false);
    const bonusRollKeys = useRef({}); // tracks last trigger key per bonus achievement

    // Destructure the specific fields we depend on for the lint rule
    const { completedLessons, currentStreak, totalXP, seenCards, starredCards, cardMastery, dailyQuiz, achievements, studySessions, challenge } = state;

    useEffect(() => {
        const currentState = { completedLessons, currentStreak, totalXP, seenCards, starredCards, cardMastery, dailyQuiz, achievements, studySessions, challenge };

        if (!mounted.current) {
            // On mount: silently unlock all achievements that already qualify
            const alreadyQualified = checkAchievements(currentState);
            for (const id of alreadyQualified) {
                if (!achievements[id]) {
                    dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: id, silent: true });
                }
                prevChecked.current.add(id);
            }
            // Seed bonus roll keys so we don't roll on mount
            for (const ba of BONUS_ACHIEVEMENTS) {
                bonusRollKeys.current[ba.id] = ba.triggerKey(currentState);
            }
            mounted.current = true;
            return;
        }

        // ─── Regular achievements ───
        const newlyUnlocked = checkAchievements(currentState);
        for (const id of newlyUnlocked) {
            if (!prevChecked.current.has(id)) {
                dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: id });
                prevChecked.current.add(id);
            }
        }

        // ─── Bonus (hidden) achievements — random roll ───
        const unlocked = achievements || {};
        for (const ba of BONUS_ACHIEVEMENTS) {
            if (unlocked[ba.id]) continue;
            const currentKey = ba.triggerKey(currentState);
            const prevKey = bonusRollKeys.current[ba.id];
            // Only roll when the trigger key has changed (new activity occurred)
            if (currentKey !== prevKey) {
                bonusRollKeys.current[ba.id] = currentKey;
                if (ba.triggerCondition(currentState) && Math.random() < ba.chance) {
                    dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: ba.id });
                }
            }
        }
    }, [completedLessons, currentStreak, totalXP, seenCards, starredCards, cardMastery, dailyQuiz, achievements, studySessions, challenge, dispatch]);
}
