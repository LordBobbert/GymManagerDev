# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the application using nodemon
CMD ["nodemon", "-L", "npm", "run", "dev"]
