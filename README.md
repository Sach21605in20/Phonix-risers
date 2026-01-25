# 🏥 MediFlow
### Proactive Digital Post-Discharge Follow-Up System

MediFlow is a **digital healthcare platform** that ensures **continuous, reliable, and proactive patient care after hospital discharge**.  
By combining **automated reminders, AI-based risk assessment, video consultations, and ASHA worker integration**, the system reduces missed follow-ups, prevents post-discharge complications, and improves recovery outcomes.

![WhatsApp Image 2026-01-25 at 09 00 14](https://github.com/user-attachments/assets/7a4b5edd-9adf-48eb-beeb-0b0ed40e98a1)

---

## 📋 Abstract

Patients are most vulnerable during the post-discharge period. Traditional follow-up systems rely on missed calls and patient-driven scheduling, leading to poor continuity of care and avoidable readmissions.

**Suraksha Setu** introduces a **proactive digital follow-up mechanism** that:
- Confirms patient availability **2 days before follow-up appointments**
- Allows **instant rescheduling**
- Enables **guaranteed video consultations**
- Uses **AI-based triage** to detect early warning signs
- Integrates **ASHA workers** for on-ground follow-ups

This approach improves patient compliance, reduces no-shows, enhances communication, and supports timely medical intervention.

---

## 🎯 Key Features

### 🔄 Proactive Patient Engagement
- Automated reminders via SMS/Email/Push Notifications
- Instant confirm or reschedule option
- Daily health check-ins (temperature, pain, symptoms)
- AI-powered risk classification

### 🚨 AI-Powered Risk Triage
| Risk Level | Condition |
|----------|-----------|
| 🔴 High Risk | Temperature > 100.4°F OR Pain ≥ 8 |
| 🟡 Warning | Temperature > 99.5°F OR Pain ≥ 6 |
| 🟢 Normal | All vitals within safe range |

- Real-time alerts to coordinators
- Automated escalation workflows

### 📅 Smart Appointment Management
- Physical visit scheduling
- Video consultations with meeting links
- Calendar synchronization
- No-show prevention through proactive confirmation

### 👥 Role-Based Access Control (RBAC)
- **Patients**: Daily check-ins, appointments, symptom tracking
- **Coordinators**: Triage dashboard, alerts, scheduling
- **ASHA Workers**: Task lists, follow-up tracking

### ⚡ Real-Time Data Synchronization
- WebSocket-based live updates
- Instant notifications
- Cross-role data consistency

### 🏠 ASHA Worker Integration
- Automatic task creation after 24h of no response
- Priority-based task assignment
- Home visit and phone follow-up tracking

---

## 🏗️ System Architecture

<img width="1498" height="787" alt="image" src="https://github.com/user-attachments/assets/3da05369-5944-4065-a7be-e249fe806cdd" />


---

## 🛠️ Technology Stack

### Frontend
- React 18.2 (Vite)
- React Router DOM 6
- Tailwind CSS 3.3
- Lucide React Icons

### Backend & Database
- Supabase (PostgreSQL)
- Supabase Authentication
- Row Level Security (RLS)
- Realtime Subscriptions

### Infrastructure
- Node.js Runtime
- Vercel / Netlify Deployment
- Environment-based Configuration


## 🚀 Quick Start

### Prerequisites
- Node.js **16+**
- npm or yarn
- Supabase account

### Installation

```bash
git clone https://github.com/yourusername/suraksha-setu.git
cd suraksha-setu
npm install
```
## 📊 Expected Impact

- ✅ Reduce hospital readmission rates by **30%**
- ✅ Improve follow-up compliance to **85%+**
- ✅ Decrease emergency visits by **25%**
- ✅ Enhance overall patient satisfaction
- ✅ Increase healthcare workforce efficiency

---

## 🔄 Future Enhancements

- WhatsApp bot for reminders and daily check-ins
- Multi-language support (Hindi, Tamil, Bengali)
- Offline mode with automatic data synchronization
- Integration with Electronic Health Records (EHR)
- Medication adherence tracking and reminders
- Analytics dashboard for hospital administrators





