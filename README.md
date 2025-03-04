# Plant Portal 🌱 (SCU Hacks Finalist)

An innovative platform empowering users to build virtual gardens that reflect their real-life planting efforts, fostering environmental awareness and community-driven sustainability.
Part of Hack for Humanity 2025.

## Project Overview 

### Inspiration
As climate change accelerates, taking action, no matter how small, can make a difference. Inspired by the nostalgic virtual pet games of the early 2000s and the modern need for sustainability, Plant Portal transforms gardening into an interactive and educational experience. This platform encourages users to cultivate real-world greenery while tracking their efforts in a virtual garden, reinforcing the impact of small, collective environmental actions.

### What it does 
Plant Portal bridges the gap between digital engagement and environmental responsibility by allowing users to:
 - Create a Virtual Garden by uploading images of real plants to generate a corresponding digital garden.
 - Identify and Learn using AI-powered plant recognition that provides details on the species and its environmental impact.
 - Track Carbon Reduction by seeing how each plant contributes to carbon absorption and sustainability efforts.
 - Connect with the Community by sharing your garden with others, inspire sustainable habits, and exchange gardening tips.
 - Encourage Eco-Friendly Actions by gamifying sustainability by rewarding users for planting, caring, and growing their digital and physical gardens.


### Technical Stack 

Frontend:
- React with Vite for fast development and building
- Three.js for 3D rendering
- TailwindCSS for responsive styling
- Framer Motion for smooth animations and transitions

Backend:
- Express.js (Node.js) for server framework
- MongoDB for database management
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Google Gemini Vision for plant identification

### Features 

- 3D garden visualization
- Plant care tips and guides
- Community sharing of garden designs
- Integration with IoT devices for real-time updates

## Quick Start 

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dwu006/scuhacks.git
cd scuhacks
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Create a `.env` file in the backend directory
- Add required environment variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
node server.js
```

## Future Development 

- User profile and customization options
- Integration with more IoT devices
- Enhanced 3D rendering capabilities
- Mobile application development

## Contributing 

We welcome contributions! Please feel free to submit a Pull Request.

## Acknowledgments 

- Three.js for 3D visualization
- MongoDB for database solutions
- Hack for Humanity 2025 for the opportunity
