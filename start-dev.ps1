# Stop any running Node.js processes
taskkill /F /IM node.exe 2>$null

# Set environment variables
$env:NODE_OPTIONS="--max-old-space-size=4096"

# Clear Next.js cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Start the development server
Write-Host "Starting development server..."
npm run dev
