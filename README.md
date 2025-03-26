# BharatGo
## Deploymen link
https://rainbow-smakager-9c2d79.netlify.app/

## 🚨 Deployment Issue
This project is **not running on deployment** due to Firebase domain access restrictions. I hev done every actions to solve this but it is not solving issue ,However, you can run it locally by following the instructions below.

## 🛠️ How to Run Locally

### **1. Clone the Repository**
```sh
git clone https://github.com/Pratik-S-Rathod/Bharatgo.git
cd your-repo
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run the Project**
```sh
npm start
```

### **4. Configure Firebase**
1. Ensure that **Firebase Authentication** and **Firestore** are enabled.
2. Create a `.env` file in the root directory and add your Firebase credentials:
   ```sh
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_AUTH_DOMAIN=your-auth-domain
   VITE_PROJECT_ID=your-project-id
   VITE_STORAGE_BUCKET=your-storage-bucket
   VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_APP_ID=your-app-id
   ```
3. Restart the project using `npm start`.

## 📌 Features
- Firebase Authentication (Google Login, Email/Password Sign-in)
- Firestore Database Integration
- Redux for State Management
- Tailwind CSS for Styling

## 📜 License
This project is licensed under the MIT License.
