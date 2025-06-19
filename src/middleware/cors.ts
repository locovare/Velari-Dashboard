import type { Connect } from 'vite'

export function corsMiddleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }
    
    next()
  }
} 