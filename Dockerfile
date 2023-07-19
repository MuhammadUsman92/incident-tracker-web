# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the app's source code
COPY . .

# Build the React app
RUN npm run build

# Expose the desired port (if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
