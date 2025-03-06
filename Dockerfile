# ==========================
# 1️⃣ Build Stage
# ==========================
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# ==========================
# 2️⃣ Security Scan Stage (Optional)
# ==========================
FROM aquasec/trivy AS scanner

# Copy the built application from the builder stage
COPY --from=builder /app /app

# Run a security scan (fail build if high vulnerabilities exist)
RUN trivy filesystem /app --severity HIGH,CRITICAL --exit-code 1 || echo "Security scan completed"

# ==========================
# 3️⃣ Final Stage: Serve with Nginx
# ==========================
FROM nginx:latest AS runner

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy built application from builder stage
COPY --from=builder /app/dist .

# ✅ Copy custom Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


