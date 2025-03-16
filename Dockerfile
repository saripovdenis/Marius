# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the port (not needed for a bot, but good practice)
EXPOSE 3000

# Build the project (creates "dist" folder)
RUN npm run build

# Start the bot
CMD ["npm", "run", "start"]
