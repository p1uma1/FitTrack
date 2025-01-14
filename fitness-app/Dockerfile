# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /fitness-app

# Copy package.json and package-lock.json (if available) for dependency installation
COPY package.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port used by Vite preview
EXPOSE 4173

# Preview the React app using Vite
CMD ["npm", "run", "preview"]
