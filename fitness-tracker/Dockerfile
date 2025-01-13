# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /fitness-tracker

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
