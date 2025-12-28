# Commands Reference

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Runs at `http://localhost:5173`
- Hot module replacement enabled
- Auto-refresh on file changes

### Type Check
```bash
npx tsc --noEmit
```
- Check TypeScript errors without building
- Useful before committing

### Lint Check
```bash
npm run lint
```
- ESLint code quality check

---

## Build Commands

### Production Build
```bash
npm run build
```
- Creates optimized build in `dist/`
- Minified JS and CSS
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Serves `dist/` folder locally
- Test production build before deployment

---

## Docker Commands

### Build and Run
```bash
docker-compose up --build -d
```
- Builds Docker image
- Runs container in background
- App available at `http://localhost:3000`

### View Logs
```bash
docker logs quotation-generator
```
- Shows container output
- Add `-f` to follow logs

### Stop Container
```bash
docker-compose down
```
- Stops and removes container
- Network cleaned up

### Restart Container
```bash
docker-compose restart
```
- Quick restart without rebuild

### Rebuild After Changes
```bash
docker-compose up --build -d
```
- Rebuilds image with latest code
- Restarts container

### Remove All (Clean)
```bash
docker-compose down --rmi all -v
```
- Removes container, images, volumes
- Full cleanup

---

## Dependency Commands

### Install Dependencies
```bash
npm install
```
- Installs all packages from package.json

### Add New Package
```bash
npm install <package-name>
```
- Add to dependencies

### Add Dev Package
```bash
npm install -D <package-name>
```
- Add to devDependencies

### Update Packages
```bash
npm update
```
- Updates to latest compatible versions

### Check Outdated
```bash
npm outdated
```
- Shows packages with newer versions

---

## Useful One-Liners

### Clean Install
```bash
rm -rf node_modules package-lock.json && npm install
```
- Fresh install of all dependencies

### Clear Vite Cache
```bash
rm -rf node_modules/.vite && npm run dev
```
- Clears build cache

### Check Bundle Size
```bash
npm run build && du -sh dist/
```
- Build and show total size

### Find Port Process (Windows)
```bash
netstat -ano | findstr :5173
```
- Find what's using port 5173

### Kill Port Process (Windows)
```bash
taskkill /PID <PID> /F
```
- Force kill process by PID

---

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5173 | Dev server port |
| `HOST` | localhost | Dev server host |

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Docker up | `docker-compose up -d` |
| Docker down | `docker-compose down` |
| Type check | `npx tsc --noEmit` |
| View logs | `docker logs quotation-generator` |
