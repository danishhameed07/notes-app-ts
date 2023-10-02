# Use an official Node.js runtime as the base image with Node.js 18
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json to the container
COPY package.json /app/package.json

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app

# Build TypeScript code
RUN npm run build

# Expose the port your Express.js app is running on (adjust if necessary)
EXPOSE 8080

# Define the command to start your Express.js app
CMD ["npm", "start"]