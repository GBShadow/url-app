#!/bin/sh

# Espera opcional pelo banco (ajuste host e porta)
# echo "Aguardando banco de dados..."
# ./wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Banco de dados está pronto"

echo "Executando prisma migrate deploy..."
npx prisma migrate deploy

echo "Iniciando aplicação..."
exec node dist/cluster.js
