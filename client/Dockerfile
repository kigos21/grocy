# Stage 1: Build the React application
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the static assets
COPY --from=build /app/public /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]