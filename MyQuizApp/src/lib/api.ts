// src/lib/api.ts
import axios from './axios';

const api = {
    // ─── User ──────────────────────────────────────────────────
    login: (data: { email: string; password: string }) => axios.post('/auth/login', data).then(res => res.data),
    register: (data: { name: string; email: string; password: string }) => axios.post('/auth/register', data).then(res => res.data),
    getCurrentUser: (userId: string) => axios.get(`/users/${userId}`).then(res => res.data),

    // ─── Categories ─────────────────────────────────────────────
    getCategories: () => axios.get('/categories').then(res => res.data),

    // ─── Quizzes ─────────────────────────────────────────────
    getQuizzes: (categoryId?: string) => axios.get(`/quizzes/category/${categoryId}`).then(res => res.data),
    getQuizById: (id: string) => axios.get(`/quizzes/${id}`).then(res => res.data),

    // ─── Quiz Play / Submission ─────────────────────────────────
    startQuiz: (quizId: string) => axios.post(`/quiz/play`, { quizId }).then(res => res.data),
    submitQuiz: (quizId: string, userId: string, quizTitle: string, quizPoints: number) => axios.post(`/quizzes/completed`, { quizId, userId, quizTitle, quizPoints }).then(res => res.data),

    // ─── Referral ───────────────────────────────────────────────
    getReferralHistory: () => axios.get('/referral/history').then(res => res.data),

    // ─── Points ────────────────────────────────────────────────
    getPointHistory: (userId: string) => axios.get(`/points/${userId}`).then(res => res.data),
    getTotalPoints: () => axios.get('/points/total').then(res => res.data),

    // ─── Withdrawal Requests ─────────────────────────────────────
    requestWithdrawal: (points: number, userId: string, paymentMethod: string, paymenDetails: object) => axios.post('/withdrawals/request', { points, userId, paymenDetails, paymentMethod }).then(res => res.data),
};

export default api;
