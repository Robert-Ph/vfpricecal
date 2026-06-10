# Giai đoạn 1: Build mã nguồn Frontend bằng Node.js
FROM node:20-alpine AS build
WORKDIR /app

# Copy các file quản lý thư viện trước để tối ưu hóa việc tải
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn còn lại và tiến hành build ra file tĩnh
COPY . .
RUN npm run build

# Giai đoạn 2: Sử dụng Nginx siêu nhẹ để phục vụ các file tĩnh vừa build
FROM nginx:1.25-alpine

# Copy thư mục 'dist' (đầu ra của Vite) vào thư mục chạy mặc định của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80 chuẩn HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
