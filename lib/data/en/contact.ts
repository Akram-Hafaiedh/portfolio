// lib/data/en/contact.ts

export const contactPageContent = {
    hero: {
        badge: "Let's Connect",
        titlePrefix: "Ready to Start Your",
        titleHighlight: "Next Project?",
        description: "I'm here to help bring your ideas to life. Choose your preferred way to connect, and I'll get back to you promptly."
    },
    methods: [
        {
            iconName: "FaEnvelope",
            title: "Email",
            description: "Best for detailed project discussions",
            action: "hafaiedhakram@gmail.com",
            color: "blue"
        },
        {
            iconName: "FaPhone",
            title: "Phone",
            description: "Quick questions and consultations",
            action: "+216 50 569 298",
            color: "green"
        },
        {
            iconName: "FaCalendar",
            title: "Video Call",
            description: "30-min free consultation",
            action: "Book a Meeting",
            color: "purple"
        },
    ],
    responseTime: {
        title: "Response Time",
        subtitle: "I prioritize quick and helpful responses",
        items: [
            { time: "< 2 hours", type: "Urgent Inquiries", color: "from-red-500 to-orange-500" },
            { time: "< 24 hours", type: "General Messages", color: "from-blue-500 to-purple-500" },
            { time: "< 48 hours", type: "Project Proposals", color: "from-green-500 to-emerald-500" },
        ]
    },
    whyMe: {
        title: "Why Work With Me?",
        subtitle: "What you can expect from our collaboration",
        items: [
            { iconName: "FaCheckCircle", title: "Quality First", description: "Clean, maintainable code following best practices" },
            { iconName: "FaCheckCircle", title: "Clear Communication", description: "Regular updates and transparent progress tracking" },
            { iconName: "FaCheckCircle", title: "On-Time Delivery", description: "Meeting deadlines without compromising quality" },
            { iconName: "FaCheckCircle", title: "Post-Launch Support", description: "Continued assistance after project completion" },
        ]
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Common questions about working together"
    },
    cta: {
        title: "Let's Build Something Amazing Together",
        description: "Ready to take the next step? Choose how you'd like to connect and let's discuss your project.",
        schedule: "Schedule a Call",
        email: "Send an Email"
    }
};

export const bookingContent = {
    hero: {
        badge: "Instant Booking",
        title: "Schedule a Meeting",
        subtitle: "Let's discuss your project and bring your ideas to life",
        emphasis: "Choose a time that works for you."
    },
    calendar: {
        title: "Select Date & Time",
        dateLabel: "Choose a Date",
        durationLabel: "Meeting Duration",
        slotsLabel: "Available Time Slots",
        loadingSlots: "Loading available slots...",
        noSlots: "No available slots for this date",
        selectedTime: "Selected Meeting Time",
        minutes: "minutes"
    },
    form: {
        title: "Your Information",
        name: "Your Name",
        email: "Email Address",
        subject: "Meeting Subject",
        subjectPlaceholder: "e.g., Job Opportunity, Project Discussion, Technical Interview",
        message: "Additional Message",
        messagePlaceholder: "Tell me a bit about what you'd like to discuss, your project requirements, or any specific topics you want to cover...",
        namePlaceholder: "Enter your full name",
        emailPlaceholder: "your.email@example.com",
        required: "*",
        submit: "Schedule Meeting",
        submitting: "Scheduling Meeting...",
        disclaimer: "By scheduling this meeting, you agree to our privacy policy and terms of service."
    },
    meetingDetails: {
        title: "Meeting Details",
        googleMeet: "Google Meet link will be provided",
        calendar: "Calendar invitation with reminders",
        remote: "Available for remote meetings worldwide",
        flexible: "Flexible rescheduling available"
    },
    messages: {
        success: "Appointment scheduled successfully! Check your email for the meeting link.",
        error: "Error scheduling appointment. Please try again.",
        selectSlot: "Please select a time slot",
        fetchError: "Failed to fetch availability"
    },
    durations: {
        30: "30 minutes",
        45: "45 minutes",
        60: "1 hour",
        90: "1.5 hours",
        120: "2 hours"
    }
};
