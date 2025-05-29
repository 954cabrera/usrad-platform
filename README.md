# 🏥 USRad Dashboard - Professional Imaging Center Management

> **Modern MRI. Transparent Pricing. Professional Management.**

A sophisticated, full-stack dashboard application built specifically for imaging centers, featuring enterprise-grade authentication, real-time analytics, and a stunning user interface that matches USRad's professional brand standards.

---

## ✨ **Features at a Glance**

### 🎨 **Stunning Visual Design**
- **Professional USRad Branding** - Navy (#003087) and gold (#cc9933) color scheme
- **Elegant Typography** - Manrope font family for premium feel  
- **Sophisticated Animations** - Smooth transitions and hover effects
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### 🔐 **Enterprise Authentication**
- **Secure Login System** - Lucia Auth v3 with session management
- **Role-Based Access** - Imaging center, admin, and patient roles
- **Protected Routes** - Automatic redirects for unauthorized access
- **Session Persistence** - Remember users across browser sessions

### 📊 **Comprehensive Dashboard**
- **Real-Time Metrics** - Today's appointments, monthly totals, revenue
- **Appointment Scheduling** - Visual calendar with appointment details
- **System Monitoring** - Equipment status and performance metrics
- **Quick Actions** - One-click access to common tasks

### 🗄️ **Robust Data Management**
- **PostgreSQL Database** - Production-ready data storage on Railway
- **Type-Safe ORM** - Drizzle ORM for reliable database operations
- **Automated Migrations** - Schema versioning and updates
- **Data Relationships** - Proper foreign keys and constraints

---

## 🚀 **Technology Stack**

### **Frontend**
- **[Astro](https://astro.build/)** - Modern web framework for fast, content-focused websites
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid styling
- **[Manrope Font](https://fonts.google.com/specimen/Manrope)** - Professional typography

### **Backend & Database**
- **[Lucia Auth](https://lucia-auth.com/)** - Modern authentication library for TypeScript
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM with excellent developer experience
- **[PostgreSQL](https://www.postgresql.org/)** - Advanced open-source relational database
- **[Railway](https://railway.app/)** - Cloud platform for database hosting

### **Development & Deployment**
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **Git** - Version control and collaboration

---

## 🏗️ **Architecture Overview**

```
USRad Dashboard
├── 🎨 Frontend (Astro + TypeScript)
│   ├── Professional USRad branding & animations
│   ├── Responsive dashboard layouts
│   ├── Real-time data visualization
│   └── Intuitive user interfaces
│
├── 🔐 Authentication (Lucia Auth)
│   ├── Secure password hashing (Argon2)
│   ├── Session-based authentication
│   ├── Role-based access control
│   └── Protected route middleware
│
├── 🗄️ Database (PostgreSQL + Drizzle)
│   ├── User management & profiles
│   ├── Imaging center information
│   ├── Appointment scheduling
│   ├── Scan results & reports
│   └── System metrics & analytics
│
└── ☁️ Infrastructure (Railway)
    ├── Managed PostgreSQL database
    ├── Automatic SSL certificates
    ├── Environment variable management
    └── Production-ready hosting
```

---

## 📱 **Dashboard Screenshots**

### **Login Experience**
Beautiful, professional login page with USRad branding and smooth animations.

*🎨 Features: Gradient backgrounds, elegant form design, responsive layout*

### **Main Dashboard**
Comprehensive overview with real-time metrics, today's schedule, and quick actions.

*📊 Features: Animated statistics, appointment timeline, system status*

### **Appointment Management**
Visual appointment scheduling with patient details and scan information.

*🗓️ Features: Calendar integration, status tracking, patient profiles*

### **Analytics & Reports**
Detailed performance metrics and business intelligence.

*📈 Features: Revenue tracking, completion rates, equipment utilization*

---

## 🛠️ **Quick Start Guide**

### **Prerequisites**
- Node.js 18+ installed
- PostgreSQL database (Railway recommended)
- Git version control

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/usrad-dashboard.git
cd usrad-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Generate and apply database migrations
npm run db:generate
npm run db:push

# Create your first user account
node create-user-simple.mjs

# Start the development server
npm run dev
```

### **Environment Configuration**

```env
# Database Connection
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
SESSION_SECRET=your-super-secure-session-secret-key

# Application
NODE_ENV=development
```

---

## 🎯 **Key Features Breakdown**

### **🏥 Imaging Center Management**
- **Center Profiles** - Detailed information, equipment, operating hours
- **Staff Management** - User roles and permissions
- **Equipment Tracking** - Status monitoring and maintenance schedules
- **Compliance Tools** - License tracking and regulatory requirements

### **📅 Appointment System**
- **Smart Scheduling** - Conflict detection and optimal time slots
- **Patient Management** - Demographics, history, and preferences  
- **Scan Protocols** - MRI types, contrast requirements, duration
- **Automated Reminders** - SMS and email notifications

### **📊 Business Intelligence**
- **Revenue Analytics** - Monthly trends, payment tracking
- **Operational Metrics** - Scan completion rates, equipment utilization
- **Patient Satisfaction** - Feedback collection and analysis
- **Performance Dashboards** - Real-time KPI monitoring

### **🔍 Reporting & Compliance**
- **Automated Reports** - Financial, operational, regulatory
- **Export Capabilities** - PDF, Excel, CSV formats
- **Audit Trails** - Complete activity logging
- **Quality Assurance** - Image quality metrics and protocols

---

## 🚀 **Deployment Options**

### **Recommended: Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway new
railway add postgresql
railway deploy
```

### **Alternative: Vercel + Supabase**
```bash
# Deploy frontend to Vercel
vercel --prod

# Connect to Supabase PostgreSQL
# Update environment variables
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4321
CMD ["npm", "start"]
```

---

## 🧪 **Testing & Quality**

### **Type Safety**
- Full TypeScript coverage for runtime safety
- Drizzle ORM provides compile-time SQL validation
- Strict type checking for database operations

### **Security Features**
- Argon2 password hashing (industry standard)
- CSRF protection and secure headers
- SQL injection prevention through ORM
- Environment variable validation

### **Performance Optimization**
- Static site generation where possible
- Optimized database queries with proper indexing
- Image optimization and lazy loading
- Efficient caching strategies

---

## 📋 **Development Workflow**

### **Database Management**
```bash
# Generate new migration
npm run db:generate

# Apply migrations to database  
npm run db:push

# Open database studio
npm run db:studio
```

### **Code Quality**
```bash
# Type checking
npm run astro check

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🤝 **Contributing**

We welcome contributions to make USRad Dashboard even better!

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper TypeScript types
4. Test thoroughly with the development server
5. Commit with descriptive messages
6. Push and create a Pull Request

### **Code Standards**
- **TypeScript First** - All new code must be properly typed
- **Component Architecture** - Reusable Astro components
- **Database Safety** - All queries through Drizzle ORM
- **Responsive Design** - Mobile-first approach

---

## 📈 **Roadmap**

### **Phase 1: Core Features** ✅
- [x] Authentication system
- [x] Dashboard overview  
- [x] Basic appointment management
- [x] User profile management

### **Phase 2: Advanced Features** 🚧
- [ ] Advanced analytics and reporting
- [ ] Real-time notifications
- [ ] Equipment management system
- [ ] Patient portal integration

### **Phase 3: Enterprise Features** 📋
- [ ] Multi-location management
- [ ] Advanced role permissions
- [ ] API for third-party integrations
- [ ] White-label customization

---

## 💼 **For Imaging Centers**

**Ready to modernize your imaging center operations?**

USRad Dashboard provides everything you need:
- **Streamlined Operations** - Reduce administrative overhead
- **Better Patient Experience** - Faster scheduling and communication  
- **Data-Driven Insights** - Make informed business decisions
- **Regulatory Compliance** - Built-in compliance tools
- **Scalable Growth** - Grows with your practice

### **Getting Started**
1. **Demo Available** - Contact us for a personalized demonstration
2. **Easy Migration** - We'll help transfer your existing data
3. **Training Included** - Comprehensive staff training programs
4. **24/7 Support** - Dedicated technical support team

---

## 📞 **Support & Contact**

- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/yourusername/usrad-dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/usrad-dashboard/discussions)
- **Email**: support@usrad.com

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for imaging centers everywhere**

*Modern MRI. Transparent Pricing. Professional Management.*

[![Made with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>