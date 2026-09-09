// ==========================================
// YOUR TEACHABLE MACHINE MODEL
// ==========================================

const MODEL_URL =
    "https://teachablemachine.withgoogle.com/models/r4MKmtOEN/";


// ==========================================
// VARIABLES
// ==========================================

let model = null;
let selectedImage = null;


// ==========================================
// HTML ELEMENTS
// ==========================================

const imageUpload =
    document.getElementById("imageUpload");

const preview =
    document.getElementById("preview");

const previewCard =
    document.getElementById("previewCard");

const predictButton =
    document.getElementById("predictButton");

const resetButton =
    document.getElementById("resetButton");

const dropZone =
    document.getElementById("dropZone");

const fileInfo =
    document.getElementById("fileInfo");

const loadingCard =
    document.getElementById("loadingCard");

const resultsCard =
    document.getElementById("resultsCard");

const bestPrediction =
    document.getElementById("bestPrediction");

const bestConfidence =
    document.getElementById("bestConfidence");

const predictionList =
    document.getElementById("predictionList");


// ==========================================
// LOAD YOUR MODEL
// ==========================================

async function loadModel() {

    try {

        console.log("Loading AI model...");

        const modelURL =
            MODEL_URL + "model.json";

        const metadataURL =
            MODEL_URL + "metadata.json";


        model = await tmImage.load(
            modelURL,
            metadataURL
        );


        const totalClasses =
            model.getTotalClasses();


        console.log(
            "Model loaded successfully."
        );

        console.log(
            "Total classes:",
            totalClasses
        );

    }

    catch (error) {

        console.error(
            "Model loading failed:",
            error
        );

        alert(
            "Could not load the AI model. Check the browser console."
        );

    }

}


// ==========================================
// HANDLE IMAGE
// ==========================================

function handleImage(file) {

    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "Please upload an image file."
        );

        return;

    }


    selectedImage = file;


    const imageURL =
        URL.createObjectURL(file);


    preview.src =
        imageURL;


    previewCard.classList.remove(
        "hidden"
    );


    predictButton.disabled =
        false;


    fileInfo.textContent =
        file.name;


    resultsCard.classList.add(
        "hidden"
    );

}


// ==========================================
// FILE UPLOAD
// ==========================================

imageUpload.addEventListener(
    "change",
    function(event) {

        const file =
            event.target.files[0];

        handleImage(file);

    }
);


// ==========================================
// DRAG & DROP
// ==========================================

dropZone.addEventListener(
    "dragover",
    function(event) {

        event.preventDefault();

        dropZone.classList.add(
            "dragover"
        );

    }
);


dropZone.addEventListener(
    "dragleave",
    function() {

        dropZone.classList.remove(
            "dragover"
        );

    }
);


dropZone.addEventListener(
    "drop",
    function(event) {

        event.preventDefault();

        dropZone.classList.remove(
            "dragover"
        );


        const file =
            event.dataTransfer.files[0];


        handleImage(file);

    }
);


// ==========================================
// PREDICT IMAGE
// ==========================================

predictButton.addEventListener(
    "click",
    async function() {

        if (!model) {

            alert(
                "The AI model is still loading."
            );

            return;

        }


        if (!selectedImage) {

            alert(
                "Please upload an image first."
            );

            return;

        }


        loadingCard.classList.remove(
            "hidden"
        );

        resultsCard.classList.add(
            "hidden"
        );

        predictButton.disabled =
            true;


        try {

            // Run your trained model

            const predictions =
                await model.predict(
                    preview
                );


            // Highest confidence first

            predictions.sort(
                function(a, b) {

                    return (
                        b.probability -
                        a.probability
                    );

                }
            );


            // Best result

            const best =
                predictions[0];


            const confidence =
                best.probability * 100;


            bestPrediction.textContent =
                best.className;


            bestConfidence.textContent =
                confidence.toFixed(2) + "%";


            // Clear old results

            predictionList.innerHTML =
                "";


            // Show top 5

            const topPredictions =
                predictions.slice(0, 5);


            topPredictions.forEach(
                function(item) {

                    const percentage =
                        item.probability * 100;


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "prediction-row";


                    row.innerHTML = `

                        <div class="prediction-info">

                            <span class="prediction-name">
                                ${item.className}
                            </span>

                            <span class="prediction-percentage">
                                ${percentage.toFixed(2)}%
                            </span>

                        </div>

                        <div class="progress">

                            <div
                                class="progress-bar"
                                style="width: ${percentage}%"
                            ></div>

                        </div>

                    `;


                    predictionList.appendChild(
                        row
                    );

                }
            );


            loadingCard.classList.add(
                "hidden"
            );


            resultsCard.classList.remove(
                "hidden"
            );

        }

        catch (error) {

            console.error(
                "Prediction error:",
                error
            );

            alert(
                "Something went wrong while analyzing the image."
            );

            loadingCard.classList.add(
                "hidden"
            );

        }


        predictButton.disabled =
            false;

    }
);


// ==========================================
// RESET
// ==========================================

resetButton.addEventListener(
    "click",
    function() {

        selectedImage = null;

        imageUpload.value = "";

        preview.src = "";

        fileInfo.textContent =
            "JPG, PNG or WEBP";


        previewCard.classList.add(
            "hidden"
        );

        resultsCard.classList.add(
            "hidden"
        );

        loadingCard.classList.add(
            "hidden"
        );


        predictButton.disabled =
            true;

    }
);


// ==========================================
// START
// ==========================================

loadModel();