export function securityHeaders(req, res, next) {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
}

export function extractUserId(req) {
  const userId = (req.headers['x-user-id'] || '').toString().trim();
  if (/^[A-F0-9]{32}$/.test(userId)) return userId;
  return null;
}

export function requireUser(req, res, next) {
  const userId = extractUserId(req);
  if (!userId) return res.status(401).json({ error: 'Missing or invalid x-user-id (32-char uppercase hex)' });
  req.userId = userId;
  next();
}

export function requireAdmin(req, res, next) {
  const provided = (req.headers['x-admin-key'] || '').toString();
  if (!process.env.ADMIN_API_KEY || provided !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: 'Admin key invalid' });
  }
  next();
}
