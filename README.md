# CrimeBook - Report Crimes Anonymously

CrimeBook is a user-friendly website that lets you report crimes without revealing your identity. You can upload images and videos, and even edit them if needed. Additionally, you can share important documents to support your report. Our goal is to create a safe space where people can talk openly about crime and help raise awareness in their communities. Join us in making the world safer by speaking up and taking action against crime.

## 🔗Link - [https://crimebook.cyclic.app](https://crimebook.cyclic.app)

### Demo

![CrimeBook](https://github.com/asniteshkumar/crimebook/assets/69412868/f9f8e5f7-7b7e-4103-b06e-744355b43015)

![CrimeBook 2](https://github.com/asniteshkumar/crimebook/assets/69412868/d7723264-1c60-4848-818f-724f9ee6fbe7)


### Tech Stack

* **MongoDB** ([https://www.mongodb.com/](https://www.mongodb.com/))
* **Express** ([https://expressjs.com/](https://expressjs.com/))
* **React** ([https://react.dev/](https://react.dev/))
* **Node.js** ([https://nodejs.org/](https://nodejs.org/))
* **Bootstrap** ([https://getbootstrap.com/](https://getbootstrap.com/))
* **Mongoose** ([https://mongoosejs.com/](https://mongoosejs.com/))
* **Cloudinary** ([https://cloudinary.com/](https://cloudinary.com/))
* **Firebase** ([https://firebase.google.com/](https://firebase.google.com/))

### NPM Packages

* **[@ffmpeg/core](https://www.npmjs.com/package/@ffmpeg/core)** (Used in `video editor`)
* **[@ffmpeg/ffmpeg](https://www.npmjs.com/package/@ffmpeg/ffmpeg)** (Used in `video editor`)
* **[react-image-crop](https://www.npmjs.com/package/react-image-crop)** (Used in `image editor`)
* **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** (`Authentication`/`Authorization`)
* **[multer](https://www.npmjs.com/package/multer)** (Handle `multipart/form-data`)


## How to Run the Project

### Prerequisites

Before running the project, ensure you have the following installed:
* **Node.js** ([https://nodejs.org/](https://nodejs.org/))
* **MongoDB** ([https://www.mongodb.com/](https://www.mongodb.com/))


### Installation
1. Clone the repository to your local machine using the following command :
	``` bash
	git clone git@github.com:asniteshkumar/crimebook.git
	```
	
2. Navigate to the project directory :
	``` bash
	cd crimebook
	```
	
3. Install the project dependencies using npm :
	``` bash
	npm install
	```
	
### Configuration

1. In the project's root directory, create a .env file and add the following :
	```
	JWT_SECRET_KEY=your-jwt-secret-key
	CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
	CLOUDINARY_KEY=your-cloudinary-key
	CLOUDINARY_SECRET=your-cloudinary-secret
	FIREBASE_apiKey=your-firebase-apikey
	FIREBASE_authDomain=your-firebase-authdomain
	FIREBASE_projectId=your-firebase-projectid
	FIREBASE_storageBucket=your-firebase-storagebucket
	FIREBASE_messagingSenderId=your-firebase-messagingsenderid
	FIREBASE_appId=your-firebase-appid
	DB_URL=your-mongodb-connection-url
	```
	
	Replace the `.env` file credentials  with your Cloudinary, Firebase and MongoDB connection strings.

### Usage
1. Start the server : 
	``` bash
	nodemon app.js
	```
	
2. Open your web browser and visit [http://localhost:8080](http://localhost:8080) to access the web application. 


## Credits
[@Akhilesh Gautam](https://github.com/Akhileshgautam1903)
[@Harsh Kumar Yadav](https://github.com/harshky23)
