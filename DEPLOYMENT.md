# Task Manager App - Vercel Deployment Guide

## Deployment Steps

### 1. Server Deployment (API)

1. **Deploy the server folder to Vercel:**

   ```bash
   cd server
   vercel --prod
   ```

2. **Set environment variables in Vercel dashboard:**

   - `MONGO_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your client deployment URL (for CORS)

3. **Note your server URL** (e.g., `https://your-server-name.vercel.app`)

### 2. Client Deployment

1. **Update the API URL in `.env.production`:**
   Replace `https://your-server-domain.vercel.app/api` with your actual server URL

2. **Deploy the client folder to Vercel:**
   ```bash
   cd client
   vercel --prod
   ```

### 3. Update CORS Configuration

After both deployments, update your server's `FRONTEND_URL` environment variable in Vercel dashboard to point to your client's URL.

## Local Development

1. **Start the server:**

   ```bash
   cd server
   npm run dev
   ```

2. **Start the client:**
   ```bash
   cd client
   npm run dev
   ```

The client will automatically use `http://localhost:5000/api` for local development.

## Important Notes

- Server runs on Vercel's serverless functions
- Database connections are cached for performance
- CORS is properly configured for production
- Environment variables handle different deployment environments

## Troubleshooting

1. **CORS errors**: Ensure `FRONTEND_URL` is set correctly in server environment
2. **Database connection**: Verify `MONGO_URI` is set and accessible
3. **API calls failing**: Check that client's `VITE_API_URL` points to correct server URL
