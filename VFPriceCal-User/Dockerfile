# Giai đoạn 1
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -D sass

COPY . .
RUN npm run build

# Giai đoạn 2
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Thêm dòng này
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]