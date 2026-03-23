import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CONCEPTS } from '../data/concepts';
import { LESSONS } from '../data/lessons';
import { Card, Button, Divider, ConfirmModal } from './shared';
import StreakFlame from './StreakFlame';
import {
    rescheduleNotifications,
    cancelAllReminders,
    requestNotificationPermission,
} from '../services/notifications';
import * as feedback from '../services/feedback';
import { X, Clock, Sun, Volume2, Music, Smartphone, Download, Upload, MessageCircle, Coffee, GraduationCap, Lock, Check, ChevronDown, Zap } from 'lucide-react';
import { COURSES, validateCoursePassword, getCourseById } from '../data/courseConfig';

const STORAGE_KEY = 'aisafety-state-v1';

async function exportProgress(state) {
    const data = JSON.stringify(state, null, 2);
    const filename = `aisafety-backup-${new Date().toISOString().split('T')[0]}.json`;

    // On Android / mobile, use Web Share API to let user save/send the file
    if (navigator.share && navigator.canShare) {
        const file = new File([data], filename, { type: 'application/json' });
        if (navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({ files: [file], title: 'AI Safety Backup' });
                return;
            } catch (e) {
                if (e.name === 'AbortError') return; // user cancelled, that's fine
            }
        }
    }

    // Fallback: blob download (works on desktop browsers)
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export default function Settings() {
    const { state, dispatch } = useApp();
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [importStatus, setImportStatus] = useState(null); // 'success' | 'error' | null
    const [showCourseSetup, setShowCourseSetup] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0]?.id || '');
    const [coursePassword, setCoursePassword] = useState('');
    const [courseError, setCourseError] = useState(null);
    const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
    const fileInputRef = useRef(null);

    const learnedCount = (state.seenCards || []).length;
    const totalConcepts = ALL_CONCEPTS.length;
    const completedLessons = Object.keys(state.completedLessons).length;

    // Format study time
    const totalSeconds = state.totalStudyTime || 0;
    const formatTime = (secs) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    };
    const studyTimeStr = formatTime(totalSeconds);

    // Today's study time
    const todayStr = new Date().toISOString().slice(0, 10);
    const todaySeconds = (state.studySessions || [])
        .filter(s => s.date && s.date.slice(0, 10) === todayStr)
        .reduce((sum, s) => sum + (s.duration || 0), 0);
    const todayTimeStr = formatTime(todaySeconds);

    // Play modal open sound on mount
    useEffect(() => { feedback.modalOpen(); }, []);

    // Reschedule notifications when settings change
    useEffect(() => {
        if (state.notificationsEnabled) {
            rescheduleNotifications(state, state.currentStreak);
        } else {
            cancelAllReminders();
        }
    }, [state.notificationsEnabled, state.dailyReminderTime, state.streakRemindersEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    const masteryEntries = Object.values(state.cardMastery || {});
    const greenCount = masteryEntries.filter(m => m.overallMastery >= 7).length;
    const yellowCount = masteryEntries.filter(m => m.overallMastery >= 3 && m.overallMastery < 7).length;
    const redCount = masteryEntries.filter(m => m.overallMastery < 3 && m.overallMastery > 0).length;

    const handleImport = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const imported = JSON.parse(ev.target.result);
                // Basic validation
                if (typeof imported !== 'object' || !imported.completedLessons) {
                    setImportStatus('error');
                    return;
                }
                dispatch({ type: 'IMPORT_STATE', payload: imported });
                setImportStatus('success');
                setTimeout(() => setImportStatus(null), 3000);
            } catch {
                setImportStatus('error');
                setTimeout(() => setImportStatus(null), 3000);
            }
        };
        reader.readAsText(file);
        // Reset file input so the same file can be selected again
        e.target.value = '';
    };

    // Privacy policy modal
    if (showPrivacy) {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={() => setShowPrivacy(false)}>
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.4)', backdropFilter: 'blur(4px)' }} />
                <div
                    className="relative w-full max-w-lg rounded-[4px] p-6 mx-4 animate-fade-in-up"
                    style={{ backgroundColor: 'var(--color-bg)', maxHeight: '80vh', overflowY: 'auto', boxShadow: 'var(--shadow-elevated)' }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                            Privacy Policy
                        </h2>
                        <button onClick={() => setShowPrivacy(false)} className="p-1 rounded-[3px]" style={{ color: 'var(--color-ink-muted)' }}>
                            <X size={20} strokeWidth={2} />
                        </button>
                    </div>
                    <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--color-ink-secondary)' }}>
                        <p><strong>Last updated:</strong> February 26, 2026</p>
                        <p>AI Safety is an AI safety learning app. Your privacy is important to us.</p>
                        <h3 className="font-bold mt-4" style={{ color: 'var(--color-ink)' }}>Data Collection</h3>
                        <p>AI Safety does <strong>not</strong> collect, transmit, or share any personal data. The app works entirely offline.</p>
                        <h3 className="font-bold mt-4" style={{ color: 'var(--color-ink)' }}>Local Storage</h3>
                        <p>Your learning progress (completed lessons, mastery scores, XP, and streaks) is stored locally on your device using browser storage. This data never leaves your device.</p>
                        <h3 className="font-bold mt-4" style={{ color: 'var(--color-ink)' }}>No Analytics or Tracking</h3>
                        <p>AI Safety does not use any analytics services, advertising SDKs, crash reporting tools, or tracking technologies.</p>
                        <h3 className="font-bold mt-4" style={{ color: 'var(--color-ink)' }}>No Network Requests</h3>
                        <p>The app makes zero network requests after installation. All content, fonts, and assets are bundled with the app.</p>
                        <h3 className="font-bold mt-4" style={{ color: 'var(--color-ink)' }}>Children{"'"}s Privacy</h3>
                        <p>AI Safety is an educational app suitable for all ages. Since no data is collected, there are no special concerns regarding children{"'"}s privacy.</p>
                        <h3 className="font-bold mt-4" style={{ color: 'var(--color-ink)' }}>Data Deletion</h3>
                        <p>You can delete all your data at any time using the {"\""}Reset All Progress{"\""} button in Settings, or by clearing the app{"'"}s data in your device settings.</p>
                        <h3 className="font-bold mt-4" style={{ color: 'var(--color-ink)' }}>Contact</h3>
                        <p>If you have questions about this privacy policy, please contact us via the app{"'"}s GitHub repository.</p>
                    </div>
                    <div className="mt-6">
                        <Button className="w-full" onClick={() => setShowPrivacy(false)}>Close</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.4)', backdropFilter: 'blur(4px)' }} />
            <div
                className="relative w-full max-w-lg rounded-[4px] p-6 mx-4 animate-fade-in-up"
                style={{ backgroundColor: 'var(--color-bg)', maxHeight: '80vh', overflowY: 'auto', boxShadow: 'var(--shadow-elevated)' }}
                onClick={e => e.stopPropagation()}
            >
                <div className="relative flex items-center justify-center mb-4">
                    <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                        Your &nbsp;Progress
                    </h2>
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
                        className="absolute right-0 p-1 rounded-[3px]"
                        style={{ color: 'var(--color-ink-muted)' }}
                    >
                        <X size={20} strokeWidth={2} />
                    </button>
                </div>


                <div className="grid grid-cols-2 gap-3 mb-4">
                    <Card className="text-center p-4">
                        <div className="flex items-center justify-center gap-1.5">
                            <Zap size={20} color="var(--color-warning)" fill="var(--color-warning)" strokeWidth={2} style={{ opacity: 0.7 }} />
                            <div className="text-2xl font-bold" style={{ color: 'var(--color-coral)', fontFamily: 'var(--font-display)' }}>{state.totalXP}</div>
                        </div>
                        <div className="text-[11px] mt-1 uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Total XP</div>
                    </Card>
                    <Card className="text-center p-4">
                        <div className="flex items-center justify-center gap-1.5">
                            <StreakFlame status={(() => {
                                if (!state.lastActiveDate || state.currentStreak === 0) return 'inactive';
                                const today = new Date().toISOString().split('T')[0];
                                if (state.lastActiveDate === today) return 'active';
                                const yesterday = new Date();
                                yesterday.setDate(yesterday.getDate() - 1);
                                return state.lastActiveDate === yesterday.toISOString().split('T')[0] ? 'at-risk' : 'inactive';
                            })()} size={22} />
                            <div className="text-2xl font-bold" style={{ color: 'var(--color-coral)', fontFamily: 'var(--font-display)' }}>{state.currentStreak}</div>
                        </div>
                        <div className="text-[11px] mt-1 uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Day Streak</div>
                    </Card>
                    <Card className="text-center p-4">
                        <div className="text-2xl font-bold" style={{ color: 'var(--color-coral)', fontFamily: 'var(--font-display)' }}>{learnedCount}/{totalConcepts}</div>
                        <div className="text-[11px] mt-1 uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Cards Learned</div>
                    </Card>
                    <Card className="text-center p-4">
                        <div className="text-2xl font-bold" style={{ color: 'var(--color-coral)', fontFamily: 'var(--font-display)' }}>{completedLessons}/{LESSONS.length}</div>
                        <div className="text-[11px] mt-1 uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>Lessons Complete</div>
                    </Card>
                </div>

                {(totalSeconds > 0 || todaySeconds > 0) && (
                    <Card className="mb-4 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock size={16} color="var(--color-ink-muted)" strokeWidth={2} className="flex-shrink-0" />
                            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Study Time</span>
                        </div>
                        <div className="flex items-center justify-around">
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold" style={{ color: 'var(--color-coral)', fontFamily: 'var(--font-display)' }}>{todayTimeStr}</span>
                                <span className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>Today</span>
                            </div>
                            <div style={{ width: 1, height: 28, backgroundColor: 'rgba(var(--color-ink-rgb), 0.08)' }} />
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold" style={{ color: 'var(--color-coral)', fontFamily: 'var(--font-display)' }}>{studyTimeStr}</span>
                                <span className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>Total</span>
                            </div>
                        </div>
                    </Card>
                )}

                {masteryEntries.length > 0 && (
                    <Card className="mb-4 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Mastery Breakdown</div>
                        <div className="flex items-center justify-around w-full">
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold" style={{ color: 'var(--color-success)', fontFamily: 'var(--font-display)' }}>{greenCount}</span>
                                <span className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>Mastered</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold" style={{ color: 'var(--color-warning)', fontFamily: 'var(--font-display)' }}>{yellowCount}</span>
                                <span className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>Learning</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold" style={{ color: 'var(--color-error)', fontFamily: 'var(--font-display)' }}>{redCount}</span>
                                <span className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>Needs Work</span>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Lesson Settings */}
                {(() => {
                    const recap = state.recapPerCard ?? 2;
                    const totalQ = 3 * (2 + recap);
                    const estMin = Math.max(1, Math.round(totalQ / 2));
                    return (
                        <>
                            <Card className="mb-3 p-4">
                                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Recap intensity (lessons)</div>
                                <div className="flex gap-2">
                                    {[
                                        { value: 0, label: 'Off', sub: 'No recap' },
                                        { value: 1, label: '1', sub: '1 per card' },
                                        { value: 2, label: '2', sub: '2 per card' },
                                        { value: 3, label: '3', sub: '3 per card' },
                                    ].map(({ value, label }) => {
                                        const isActive = recap === value;
                                        return (
                                            <button
                                                key={value}
                                                onClick={() => dispatch({ type: 'SET_RECAP_PER_CARD', value })}
                                                className="flex-1 py-2.5 rounded-[3px] text-sm font-semibold transition-colors"
                                                style={{
                                                    backgroundColor: isActive ? 'var(--color-sidebar-bg)' : 'var(--color-card)',
                                                    color: isActive ? '#F0EBE5' : 'var(--color-ink-secondary)',
                                                    border: isActive ? 'none' : '1px solid rgba(var(--color-ink-rgb), 0.08)',
                                                    fontFamily: 'var(--font-display)',
                                                }}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex gap-2 mt-1">
                                    {[
                                        'No recap',
                                        '1 per card',
                                        '2 per card',
                                        '3 per card',
                                    ].map(text => (
                                        <span key={text} className="flex-1 text-center text-[11px]" style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)' }}>{text}</span>
                                    ))}
                                </div>
                            </Card>
                            <p className="text-xs text-center mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                                {totalQ} questions · ~{estMin} min per lesson
                            </p>
                        </>
                    );
                })()}

                {/* Course Mode */}
                <Card className="mb-3 p-4">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <GraduationCap size={16} color="var(--color-ink-muted)" strokeWidth={2} />
                            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Course Mode</span>
                        </div>
                        {state.courseMode ? (
                            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-[3px]" style={{ backgroundColor: 'rgba(0, 191, 165, 0.12)', color: 'var(--color-accent, #00BFA5)' }}>
                                <Check size={12} strokeWidth={2.5} />
                                {getCourseById(state.courseMode.courseId)?.name || state.courseMode.courseId}
                            </span>
                        ) : (
                            <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>General</span>
                        )}
                    </div>
                    <p className="text-xs mb-3" style={{ color: 'var(--color-ink-muted)' }}>
                        {state.courseMode
                            ? `You're in ${getCourseById(state.courseMode.courseId)?.fullName || 'course'} mode. Lessons are tailored to your course curriculum.`
                            : 'Are you pursuing a course? Unlock a course companion mode for tailored lessons.'}
                    </p>

                    {state.courseMode ? (
                        <button
                            onClick={() => { feedback.tap(); setShowDeactivateConfirm(true); }}
                            className="w-full py-2 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                            style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'var(--color-card)', border: '1px solid rgba(var(--color-ink-rgb), 0.08)', fontFamily: 'var(--font-display)' }}
                        >
                            Switch to General Mode
                        </button>
                    ) : !showCourseSetup ? (
                        <button
                            onClick={() => { feedback.tap(); setShowCourseSetup(true); setCourseError(null); setCoursePassword(''); }}
                            className="w-full py-2 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                            style={{ color: '#F0EBE5', backgroundColor: 'var(--color-sidebar-bg)', border: 'none', fontFamily: 'var(--font-display)' }}
                        >
                            Unlock Course Mode
                        </button>
                    ) : (
                        <div className="space-y-2 animate-fade-in">
                            {/* Course selector */}
                            <div className="relative">
                                <select
                                    value={selectedCourseId}
                                    onChange={e => { setSelectedCourseId(e.target.value); setCourseError(null); }}
                                    className="w-full appearance-none rounded-[3px] px-3 py-2 pr-8 text-xs font-semibold"
                                    style={{
                                        backgroundColor: 'var(--color-bg)',
                                        color: 'var(--color-ink)',
                                        border: '1px solid rgba(var(--color-ink-rgb), 0.12)',
                                        fontFamily: 'var(--font-display)',
                                    }}
                                >
                                    {COURSES.map(c => (
                                        <option key={c.id} value={c.id}>{c.fullName} ({c.name})</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-ink-muted)' }} />
                            </div>

                            {/* Password input */}
                            <div className="relative">
                                <Lock size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
                                <input
                                    type="password"
                                    value={coursePassword}
                                    onChange={e => { setCoursePassword(e.target.value); setCourseError(null); }}
                                    placeholder="Enter course password"
                                    className="w-full rounded-[3px] pl-8 pr-3 py-2 text-xs"
                                    style={{
                                        backgroundColor: 'var(--color-bg)',
                                        color: 'var(--color-ink)',
                                        border: courseError ? '1px solid var(--color-error)' : '1px solid rgba(var(--color-ink-rgb), 0.12)',
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && coursePassword.trim()) {
                                            if (validateCoursePassword(selectedCourseId, coursePassword)) {
                                                dispatch({ type: 'ACTIVATE_COURSE', courseId: selectedCourseId });
                                                setShowCourseSetup(false);
                                                setCoursePassword('');
                                                setCourseError(null);
                                                feedback.correct();
                                            } else {
                                                setCourseError('Incorrect password. Please try again.');
                                                feedback.wrong();
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {courseError && (
                                <p className="text-xs" style={{ color: 'var(--color-error)' }}>{courseError}</p>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => { feedback.tap(); setShowCourseSetup(false); setCoursePassword(''); setCourseError(null); }}
                                    className="flex-1 py-2 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                                    style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'var(--color-card)', border: '1px solid rgba(var(--color-ink-rgb), 0.08)', fontFamily: 'var(--font-display)' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        feedback.tap();
                                        if (!coursePassword.trim()) {
                                            setCourseError('Please enter the course password.');
                                            return;
                                        }
                                        if (validateCoursePassword(selectedCourseId, coursePassword)) {
                                            dispatch({ type: 'ACTIVATE_COURSE', courseId: selectedCourseId });
                                            setShowCourseSetup(false);
                                            setCoursePassword('');
                                            setCourseError(null);
                                            feedback.correct();
                                        } else {
                                            setCourseError('Incorrect password. Please try again.');
                                            feedback.wrong();
                                        }
                                    }}
                                    className="flex-1 py-2 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                                    style={{ color: '#F0EBE5', backgroundColor: 'var(--color-sidebar-bg)', border: 'none', fontFamily: 'var(--font-display)' }}
                                >
                                    Activate
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Notifications */}
                <Card className="mb-3 p-4">
                    <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Daily reminders</div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={state.notificationsEnabled}
                            onClick={async () => {
                                feedback.toggleClick();
                                if (!state.notificationsEnabled) {
                                    const result = await requestNotificationPermission();
                                    if (result === 'denied') return;
                                }
                                dispatch({
                                    type: state.notificationsEnabled ? 'DISABLE_NOTIFICATIONS' : 'ENABLE_NOTIFICATIONS',
                                });
                            }}
                            className="relative w-11 h-6 rounded-[3px] transition-colors"
                            style={{
                                backgroundColor: state.notificationsEnabled ? 'var(--color-sidebar-bg)' : 'rgba(var(--color-ink-rgb), 0.12)',
                            }}
                        >
                            <span
                                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-[2px] bg-white transition-transform"
                                style={{
                                    transform: state.notificationsEnabled ? 'translateX(20px)' : 'translateX(0)',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }}
                            />
                        </button>
                    </div>
                    {state.notificationsEnabled && (
                        <div className="mt-2 space-y-2 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                    Reminder time
                                </span>
                                <input
                                    type="time"
                                    value={state.dailyReminderTime}
                                    onChange={e => dispatch({ type: 'SET_DAILY_REMINDER_TIME', value: e.target.value })}
                                    className="rounded-[3px] px-2 py-1 text-xs"
                                    style={{
                                        backgroundColor: 'var(--color-bg)',
                                        color: 'var(--color-ink)',
                                        border: '1px solid rgba(var(--color-ink-rgb), 0.08)',
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                    Streak reminders
                                </span>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={state.streakRemindersEnabled}
                                    onClick={() => { feedback.toggleClick(); dispatch({ type: 'SET_STREAK_REMINDERS', value: !state.streakRemindersEnabled }); }}
                                    className="relative w-9 h-5 rounded-[3px] transition-colors"
                                    style={{
                                        backgroundColor: state.streakRemindersEnabled ? '#D4C5B0' : 'rgba(var(--color-ink-rgb), 0.12)',
                                    }}
                                >
                                    <span
                                        className="absolute top-0.5 left-0.5 w-4 h-4 rounded-[2px] bg-white transition-transform"
                                        style={{
                                            transform: state.streakRemindersEnabled ? 'translateX(16px)' : 'translateX(0)',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Appearance / Theme */}
                <Card className="mb-3 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sun size={16} color="var(--color-ink-muted)" strokeWidth={2} />
                            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Appearance</span>
                        </div>
                        <div className="flex rounded-[3px] overflow-hidden" style={{ border: '1px solid rgba(var(--color-ink-rgb), 0.1)' }}>
                            {[
                                { value: 'light', label: 'Light' },
                                { value: 'dark', label: 'Dark' },
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => dispatch({ type: 'SET_THEME', mode: opt.value })}
                                    className="px-3 py-1.5 text-xs font-semibold transition-colors"
                                    style={{
                                        backgroundColor: state.themeMode === opt.value ? 'var(--color-sidebar-bg)' : 'transparent',
                                        color: state.themeMode === opt.value ? '#F0EBE5' : 'var(--color-ink-muted)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-display)',
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Sound & Haptics */}
                <Card className="mb-3 p-4 space-y-4" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
                    {/* Sound effects volume */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Volume2 size={16} color="var(--color-ink-muted)" strokeWidth={2} />
                                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Sound effects</span>
                            </div>
                            <span className="text-xs tabular-nums" style={{ color: 'var(--color-ink-muted)', minWidth: '2.5rem', textAlign: 'right' }}>
                                {(state.soundVolume ?? 1) === 0 ? 'Off' : `${Math.round((state.soundVolume ?? 1) * 100)}%`}
                            </span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.05"
                            value={state.soundVolume ?? 1}
                            onChange={e => dispatch({ type: 'SET_SOUND_VOLUME', value: parseFloat(e.target.value) })}
                            className="volume-slider"
                            style={{
                                background: `linear-gradient(to right, var(--color-coral) ${(state.soundVolume ?? 1) * 100}%, rgba(var(--color-ink-rgb), 0.10) ${(state.soundVolume ?? 1) * 100}%)`
                            }}
                        />
                    </div>

                    {/* Ambient music volume */}
                    <div className="pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Music size={16} color="var(--color-ink-muted)" strokeWidth={2} />
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Ambient music</span>
                                    <div className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>Ambient soundscape</div>
                                </div>
                            </div>
                            <span className="text-xs tabular-nums" style={{ color: 'var(--color-ink-muted)', minWidth: '2.5rem', textAlign: 'right' }}>
                                {(state.musicVolume ?? 1) === 0 ? 'Off' : `${Math.round((state.musicVolume ?? 1) * 100)}%`}
                            </span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.05"
                            value={state.musicVolume ?? 1}
                            onChange={e => dispatch({ type: 'SET_MUSIC_VOLUME', value: parseFloat(e.target.value) })}
                            className="volume-slider"
                            style={{
                                background: `linear-gradient(to right, var(--color-coral) ${(state.musicVolume ?? 1) * 100}%, rgba(var(--color-ink-rgb), 0.10) ${(state.musicVolume ?? 1) * 100}%)`
                            }}
                        />
                    </div>

                    {/* Haptic feedback toggle */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                        <div className="flex items-center gap-2">
                            <Smartphone size={16} color="var(--color-ink-muted)" strokeWidth={2} />
                            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>Haptic feedback</span>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={state.hapticsEnabled}
                            onClick={() => { feedback.toggleClick(); dispatch({ type: 'TOGGLE_HAPTICS' }); }}
                            className="relative w-11 h-6 rounded-[3px] transition-colors"
                            style={{ backgroundColor: state.hapticsEnabled ? 'var(--color-sidebar-bg)' : 'rgba(var(--color-ink-rgb), 0.12)' }}
                        >
                            <span
                                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-[2px] bg-white transition-transform"
                                style={{ transform: state.hapticsEnabled ? 'translateX(20px)' : 'translateX(0)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                            />
                        </button>
                    </div>
                </Card>

                <Divider />

                {/* Data Management */}
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={() => { feedback.tap(); exportProgress(state); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                        style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'var(--color-card)', border: '1px solid rgba(var(--color-ink-rgb), 0.08)', fontFamily: 'var(--font-mono)' }}
                    >
                        <Download size={13} strokeWidth={2} />
                        Export
                    </button>
                    <button
                        onClick={() => { feedback.tap(); fileInputRef.current?.click(); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                        style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'var(--color-card)', border: '1px solid rgba(var(--color-ink-rgb), 0.08)', fontFamily: 'var(--font-mono)' }}
                    >
                        <Upload size={13} strokeWidth={2} />
                        Import
                    </button>
                    <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                </div>
                {importStatus === 'success' && (
                    <p className="text-xs text-center mb-3" style={{ color: 'var(--color-success)' }}>Progress imported successfully!</p>
                )}
                {importStatus === 'error' && (
                    <p className="text-xs text-center mb-3" style={{ color: 'var(--color-error)' }}>Invalid backup file. Please try again.</p>
                )}

                <button
                    onClick={() => { feedback.tap(); setShowResetConfirm(true); }}
                    className="w-full text-center py-2 text-xs font-medium transition-all active:scale-[0.98]"
                    style={{ color: 'var(--color-ink-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    Reset All Progress
                </button>

                <Divider />

                {/* Feedback & Support */}
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={() => window.open('https://forms.gle/JDUzvYqq5dVxo5vL9', '_blank')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                        style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'var(--color-card)', border: '1px solid rgba(var(--color-ink-rgb), 0.08)', fontFamily: 'var(--font-mono)' }}
                    >
                        <MessageCircle size={13} strokeWidth={2} />
                        Feedback
                    </button>
                    <button
                        onClick={() => window.open('https://buymeacoffee.com/elsadonnat0', '_blank')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[3px] text-xs font-semibold transition-all active:scale-[0.98]"
                        style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'var(--color-card)', border: '1px solid rgba(var(--color-ink-rgb), 0.08)', fontFamily: 'var(--font-mono)' }}
                    >
                        <Coffee size={13} strokeWidth={2} />
                        Buy Me a Coffee
                    </button>
                </div>

                <button
                    onClick={() => setShowPrivacy(true)}
                    className="w-full text-center text-xs py-2"
                    style={{ color: 'var(--color-ink-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    Privacy Policy
                </button>

                <p className="text-center text-xs mt-2" style={{ color: 'var(--color-ink-faint)' }}>
                    alignd. v{__APP_VERSION__}
                </p>
            </div>

            {showDeactivateConfirm && (
                <ConfirmModal
                    title="Switch to General Mode?"
                    message="This will deactivate course mode. Your progress is kept — you can reactivate anytime with the course password."
                    confirmLabel="Switch to General"
                    cancelLabel="Stay in Course"
                    onConfirm={() => {
                        dispatch({ type: 'DEACTIVATE_COURSE' });
                        setShowDeactivateConfirm(false);
                        feedback.tap();
                    }}
                    onCancel={() => setShowDeactivateConfirm(false)}
                />
            )}

            {showResetConfirm && (
                <ConfirmModal
                    title="Reset all progress?"
                    message="This will erase all your lessons, XP, streaks, and mastery data. This cannot be undone."
                    confirmLabel="Reset Everything"
                    cancelLabel="Cancel"
                    danger
                    onConfirm={() => {
                        cancelAllReminders();
                        localStorage.removeItem('aisafety-settings-tip-seen');
                        dispatch({ type: 'RESET_PROGRESS' });
                        setShowResetConfirm(false);
                    }}
                    onCancel={() => setShowResetConfirm(false)}
                />
            )}
        </div>
    );
}
