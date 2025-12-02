# Chọn image Node.js
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép file package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn vào image
COPY . .

# Mở cổng
EXPOSE 5001

# Lệnh khởi động ứng dụng
CMD ["npm", "run", "dev"]