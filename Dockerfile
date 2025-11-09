# Use Node.js 20 Alpine
FROM node:20-alpine

# Install dependencies for building
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm install --legacy-peer-deps --verbose

# Copy all project files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application with verbose output
RUN echo "Starting Next.js build..." && \
    npm run build 2>&1 | tee build.log || \
    (echo "Build failed! Check build.log for details" && cat build.log && exit 1)

# Expose port
EXPOSE 3000

# Set environment variables for runtime
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]
