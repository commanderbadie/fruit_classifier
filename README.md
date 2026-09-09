# Fruit Classifier

An AI-powered web application that identifies fruits from uploaded images using a trained image classification model.

The project uses **TensorFlow.js** to run the trained model directly in the browser, allowing predictions without a backend or server-side inference.

### Key Features

* Image upload and drag-and-drop support
* AI-based fruit classification
* 120+ fruit classes
* Top prediction with confidence score
* Top 5 predictions with probability scores
* Client-side inference using TensorFlow.js
* Responsive and modern web interface

### Tech Stack

* HTML
* CSS
* JavaScript
* TensorFlow.js
* Teachable Machine

### Dataset

The model was trained using the **Fruits 360** dataset, which contains images across 120+ fruit classes.

### How It Works

```text
User uploads image
        ↓
JavaScript processes image
        ↓
TensorFlow.js loads trained model
        ↓
Model performs inference
        ↓
Top predictions + confidence scores
        ↓
Results displayed on website
```

### Project Goal

The goal of this project is to demonstrate how a trained machine learning image-classification model can be integrated into a real-world web application and deployed directly in the browser.

