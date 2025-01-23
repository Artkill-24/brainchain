FROM node:20-alpine

WORKDIR /app

# Installa le dipendenze
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copia il codice sorgente
COPY . .

# Compila TypeScript
RUN npm run build

# Espone la porta
EXPOSE 3000

# Imposta il comando di avvio
CMD ["npm", "run", "dev"]
