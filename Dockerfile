# Get the base image for nodejs version 12
FROM node:12

# Copy package.json file
COPY ./package.json ./

# Install dependencies
RUN ["npm", "i"]

# Copy Source
COPY . .

# Expose port 3000
EXPOSE 3000

# Runs the server when the container starts
CMD [ "npm", "start" ]