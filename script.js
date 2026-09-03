/* =========================================================
   PIXORA — COMPLETE WORKING IMAGE EDITOR
   Upload + Filters + Adjustments + Before/After
   Undo/Redo + Crop + Rotate + Flip + Zoom
   Professional Text + Drag + Resize + Delete
   Save + Drag & Drop
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const imageInput = document.getElementById("imageInput");

const startEditing = document.getElementById("startEditing");
const topStartEditing = document.getElementById("topStartEditing");

const uploadTool = document.getElementById("uploadTool");
const uploadMessage = document.getElementById("uploadMessage");
const uploadIcon = document.querySelector(".upload-icon");

const canvasArea = document.getElementById("canvasArea");
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d", {
    willReadFrequently: true
});

const dropOverlay = document.getElementById("dropOverlay");

const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const beforeAfterButton =
    document.getElementById("beforeAfterButton");

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const zoomReset = document.getElementById("zoomReset");
const zoomValue = document.getElementById("zoomValue");

const saveImageBtn =
    document.getElementById("saveImageBtn");

const cropTool =
    document.getElementById("cropTool");

const rotateTool =
    document.getElementById("rotateTool");

const flipHorizontal =
    document.getElementById("flipHorizontal");

const flipVertical =
    document.getElementById("flipVertical");

const filterTool =
    document.getElementById("filterTool");

const adjustTool =
    document.getElementById("adjustTool");

const textTool =
    document.getElementById("textTool");

const filterPanel =
    document.getElementById("filterPanel");

const adjustPanel =
    document.getElementById("adjustPanel");

const textPanel =
    document.getElementById("textPanel");

const resetFilter =
    document.getElementById("resetFilter");


/* =========================================================
   ADJUSTMENTS
========================================================= */

const brightnessSlider =
    document.getElementById("brightnessSlider");

const contrastSlider =
    document.getElementById("contrastSlider");

const saturationSlider =
    document.getElementById("saturationSlider");

const grayscaleSlider =
    document.getElementById("grayscaleSlider");

const temperatureSlider =
    document.getElementById("temperatureSlider");

const sharpenSlider =
    document.getElementById("sharpenSlider");


const brightnessValue =
    document.getElementById("brightnessValue");

const contrastValue =
    document.getElementById("contrastValue");

const saturationValue =
    document.getElementById("saturationValue");

const grayscaleValue =
    document.getElementById("grayscaleValue");

const temperatureValue =
    document.getElementById("temperatureValue");

const sharpenValue =
    document.getElementById("sharpenValue");


const resetAdjustments =
    document.getElementById("resetAdjustments");

const resetAdjustmentsBottom =
    document.getElementById(
        "resetAdjustmentsBottom"
    );


const filterCards =
    document.querySelectorAll(".filter-card");


/* =========================================================
   TEXT
========================================================= */

const textInput =
    document.getElementById("textInput");

const textSize =
    document.getElementById("textSize");

const textSizeValue =
    document.getElementById("textSizeValue");

const textColor =
    document.getElementById("textColor");

const textColorValue =
    document.getElementById("textColorValue");

const textBold =
    document.getElementById("textBold");

const textItalic =
    document.getElementById("textItalic");

const addTextButton =
    document.getElementById("addTextButton");

const deleteTextButton =
    document.getElementById("deleteTextButton");


/* =========================================================
   CROP
========================================================= */

const cropModal =
    document.getElementById("cropModal");

const cropImage =
    document.getElementById("cropImage");

const cropContainer =
    document.getElementById("cropContainer");

const cropFrame =
    document.getElementById("cropFrame");

const cropCancel =
    document.getElementById("cropCancel");

const cropApply =
    document.getElementById("cropApply");

const ratioButtons =
    document.querySelectorAll(".ratio-button");


/* =========================================================
   TOAST
========================================================= */

const toast =
    document.getElementById("toast");


/* =========================================================
   STATE
========================================================= */

let originalImage = null;

let imageLoaded = false;

let currentFilter = "original";

let adjustments = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    grayscale: 0,
    temperature: 0,
    sharpen: 0
};

let rotation = 0;

let flipX = 1;
let flipY = 1;

let zoom = 1;

let history = [];
let historyIndex = -1;

let showingBefore = false;


/* =========================================================
   TEXT STATE
========================================================= */

let textObjects = [];

let selectedText = null;

let textSettings = {
    size: 32,
    color: "#ffffff",
    bold: false,
    italic: false
};

let isDraggingText = false;

let dragOffsetX = 0;
let dragOffsetY = 0;


/* =========================================================
   TEXT SELECTION STATE
========================================================= */

let textSelectionBox = null;

let resizingText = false;

let resizeStartY = 0;

let resizeStartSize = 32;


/* =========================================================
   FILTERS
========================================================= */

const filters = {

    original: {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        grayscale: 0,
        temperature: 0
    },

    vintage: {
        brightness: 5,
        contrast: -10,
        saturation: -20,
        grayscale: 5,
        temperature: 25
    },

    noir: {
        brightness: -5,
        contrast: 35,
        saturation: -100,
        grayscale: 100,
        temperature: 0
    },

    warm: {
        brightness: 8,
        contrast: 8,
        saturation: 20,
        grayscale: 0,
        temperature: 45
    },

    cool: {
        brightness: 3,
        contrast: 8,
        saturation: 10,
        grayscale: 0,
        temperature: -45
    },

    vivid: {
        brightness: 3,
        contrast: 25,
        saturation: 55,
        grayscale: 0,
        temperature: 5
    },

    fade: {
        brightness: 12,
        contrast: -25,
        saturation: -25,
        grayscale: 0,
        temperature: 5
    },

    dreamy: {
        brightness: 15,
        contrast: -12,
        saturation: 12,
        grayscale: 0,
        temperature: 18
    }
};


/* =========================================================
   OPEN FILE PICKER
========================================================= */

function openFilePicker(e) {

    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (imageInput) {
        imageInput.click();
    }
}


/* =========================================================
   UPLOAD BUTTONS
========================================================= */

if (startEditing) {
    startEditing.addEventListener(
        "click",
        openFilePicker
    );
}

if (topStartEditing) {
    topStartEditing.addEventListener(
        "click",
        openFilePicker
    );
}

if (uploadTool) {
    uploadTool.addEventListener(
        "click",
        openFilePicker
    );
}

if (uploadIcon) {
    uploadIcon.addEventListener(
        "click",
        openFilePicker
    );
}

if (uploadMessage) {

    uploadMessage.addEventListener(
        "click",
        openFilePicker
    );

}


/* =========================================================
   FILE INPUT
========================================================= */

if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) return;

            loadImage(file);

            this.value = "";

        }
    );

}


/* =========================================================
   LOAD IMAGE
========================================================= */

function loadImage(file) {

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        showToast(
            "Please choose an image."
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function (event) {

            const img =
                new Image();


            img.onload =
                function () {

                    originalImage = img;

                    imageLoaded = true;

                    currentFilter = "original";

                    adjustments = {
                        brightness: 0,
                        contrast: 0,
                        saturation: 0,
                        grayscale: 0,
                        temperature: 0,
                        sharpen: 0
                    };

                    rotation = 0;

                    flipX = 1;
                    flipY = 1;

                    zoom = 1;

                    textObjects = [];

                    selectedText = null;

                    showingBefore = false;

                    hideTextSelection();


                    if (beforeAfterButton) {

                        beforeAfterButton.classList.remove(
                            "active"
                        );

                    }


                    history = [];

                    historyIndex = -1;


                    resetAdjustmentValues(false);


                    if (canvas) {
                        canvas.style.display =
                            "block";
                    }


                    if (uploadMessage) {
                        uploadMessage.style.display =
                            "none";
                    }


                    updateFilterActive();

                    drawImage();

                    createFilterPreviews();

                    saveHistory();

                    updateZoom();

                    showToast(
                        "Image loaded ✨"
                    );

                };


            img.onerror =
                function () {

                    showToast(
                        "Could not load image."
                    );

                };


            img.src =
                event.target.result;

        };


    reader.readAsDataURL(file);
}


/* =========================================================
   MAIN DRAW
========================================================= */

function drawImage() {

    if (!originalImage) return;


    const imgWidth =
        originalImage.naturalWidth;

    const imgHeight =
        originalImage.naturalHeight;


    let width = imgWidth;
    let height = imgHeight;


    if (rotation % 180 !== 0) {

        width = imgHeight;
        height = imgWidth;

    }


    canvas.width = width;
    canvas.height = height;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.save();


    ctx.translate(
        canvas.width / 2,
        canvas.height / 2
    );


    ctx.rotate(
        rotation *
        Math.PI /
        180
    );


    ctx.scale(
        flipX,
        flipY
    );


    ctx.drawImage(
        originalImage,

        -imgWidth / 2,
        -imgHeight / 2,

        imgWidth,
        imgHeight
    );


    ctx.restore();


    applyPixelAdjustments();

    drawTexts();


    requestAnimationFrame(
        function () {

            if (selectedText) {
                updateTextSelection();
            }

        }
    );

}


/* =========================================================
   PIXEL ADJUSTMENTS
========================================================= */

function applyPixelAdjustments() {

    if (
        !canvas.width ||
        !canvas.height
    ) {
        return;
    }


    const imageData =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );


    const data =
        imageData.data;


    const filter =
        filters[currentFilter] ||
        filters.original;


    const brightness =
        adjustments.brightness +
        filter.brightness;


    const contrast =
        adjustments.contrast +
        filter.contrast;


    const saturation =
        adjustments.saturation +
        filter.saturation;


    const grayscale =
        Math.min(
            100,
            Math.max(
                0,
                adjustments.grayscale +
                filter.grayscale
            )
        );


    const temperature =
        adjustments.temperature +
        filter.temperature;


    const brightnessFactor =
        brightness / 100;


    const contrastFactor =
        (259 * (contrast + 255)) /
        (255 * (259 - contrast));


    const saturationFactor =
        1 + saturation / 100;


    const temperatureAmount =
        temperature / 100;


    for (
        let i = 0;
        i < data.length;
        i += 4
    ) {

        let r = data[i];

        let g = data[i + 1];

        let b = data[i + 2];


        r += 255 * brightnessFactor;

        g += 255 * brightnessFactor;

        b += 255 * brightnessFactor;


        r =
            contrastFactor *
            (r - 128) +
            128;

        g =
            contrastFactor *
            (g - 128) +
            128;

        b =
            contrastFactor *
            (b - 128) +
            128;


        const gray =
            0.299 * r +
            0.587 * g +
            0.114 * b;


        r =
            gray +
            (r - gray) *
            saturationFactor;

        g =
            gray +
            (g - gray) *
            saturationFactor;

        b =
            gray +
            (b - gray) *
            saturationFactor;


        const grayValue =
            0.299 * r +
            0.587 * g +
            0.114 * b;


        const grayAmount =
            grayscale / 100;


        r =
            r * (1 - grayAmount) +
            grayValue * grayAmount;

        g =
            g * (1 - grayAmount) +
            grayValue * grayAmount;

        b =
            b * (1 - grayAmount) +
            grayValue * grayAmount;


        if (temperatureAmount > 0) {

            r +=
                50 *
                temperatureAmount;

            g +=
                15 *
                temperatureAmount;

            b -=
                45 *
                temperatureAmount;

        }
        else if (
            temperatureAmount < 0
        ) {

            r +=
                40 *
                temperatureAmount;

            g +=
                10 *
                temperatureAmount;

            b -=
                50 *
                temperatureAmount;

        }


        data[i] =
            clamp(r);

        data[i + 1] =
            clamp(g);

        data[i + 2] =
            clamp(b);

    }


    ctx.putImageData(
        imageData,
        0,
        0
    );


    if (adjustments.sharpen > 0) {

        applySharpen(
            adjustments.sharpen
        );

    }

}


/* =========================================================
   CLAMP
========================================================= */

function clamp(value) {

    return Math.max(
        0,
        Math.min(
            255,
            Math.round(value)
        )
    );

}


/* =========================================================
   SHARPEN
========================================================= */

function applySharpen(amount) {

    const width =
        canvas.width;

    const height =
        canvas.height;


    if (
        width < 3 ||
        height < 3
    ) {
        return;
    }


    const imageData =
        ctx.getImageData(
            0,
            0,
            width,
            height
        );


    const source =
        new Uint8ClampedArray(
            imageData.data
        );


    const output =
        imageData.data;


    const strength =
        amount / 100;


    for (
        let y = 1;
        y < height - 1;
        y++
    ) {

        for (
            let x = 1;
            x < width - 1;
            x++
        ) {

            const i =
                (y * width + x) *
                4;


            for (
                let c = 0;
                c < 3;
                c++
            ) {

                const center =
                    source[i + c];

                const top =
                    source[
                        ((y - 1) *
                            width +
                            x) *
                        4 +
                        c
                    ];

                const bottom =
                    source[
                        ((y + 1) *
                            width +
                            x) *
                        4 +
                        c
                    ];

                const left =
                    source[
                        (y *
                            width +
                            x - 1) *
                        4 +
                        c
                    ];

                const right =
                    source[
                        (y *
                            width +
                            x + 1) *
                        4 +
                        c
                    ];


                const value =
                    center +
                    strength *
                    (
                        4 * center -
                        top -
                        bottom -
                        left -
                        right
                    );


                output[i + c] =
                    clamp(value);

            }

        }

    }


    ctx.putImageData(
        imageData,
        0,
        0
    );

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

filterCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                if (!imageLoaded) {

                    showToast(
                        "Upload an image first."
                    );

                    return;
                }


                currentFilter =
                    this.dataset.filter;


                updateFilterActive();

                drawImage();

                createFilterPreviews();

                saveHistory();


                if (
                    currentFilter ===
                    "original"
                ) {

                    showToast(
                        "Original restored"
                    );

                }
                else {

                    showToast(
                        capitalize(
                            currentFilter
                        ) +
                        " filter applied ✨"
                    );

                }

            }
        );

    }
);


/* =========================================================
   ACTIVE FILTER
========================================================= */

function updateFilterActive() {

    filterCards.forEach(
        function (card) {

            card.classList.toggle(
                "active",
                card.dataset.filter ===
                currentFilter
            );

        }
    );

}


/* =========================================================
   FILTER RESET
========================================================= */

if (resetFilter) {

    resetFilter.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            currentFilter =
                "original";


            updateFilterActive();

            drawImage();

            saveHistory();


            showToast(
                "Filter reset"
            );

        }
    );

}


/* =========================================================
   FILTER PREVIEWS
========================================================= */

function createFilterPreviews() {

    if (!originalImage) return;


    const previews =
        document.querySelectorAll(
            ".filter-preview"
        );


    previews.forEach(
        function (preview) {

            const previewCtx =
                preview.getContext(
                    "2d"
                );


            const width = 120;
            const height = 85;


            preview.width =
                width;

            preview.height =
                height;


            previewCtx.clearRect(
                0,
                0,
                width,
                height
            );


            const filterName =
                preview.dataset.preview;


            const filter =
                filters[filterName] ||
                filters.original;


            const scale =
                Math.max(
                    width /
                    originalImage.width,

                    height /
                    originalImage.height
                );


            const drawWidth =
                originalImage.width *
                scale;


            const drawHeight =
                originalImage.height *
                scale;


            const x =
                (width -
                    drawWidth) /
                2;


            const y =
                (height -
                    drawHeight) /
                2;


            previewCtx.drawImage(
                originalImage,
                x,
                y,
                drawWidth,
                drawHeight
            );


            const imageData =
                previewCtx.getImageData(
                    0,
                    0,
                    width,
                    height
                );


            const data =
                imageData.data;


            const brightness =
                filter.brightness;

            const contrast =
                filter.contrast;

            const saturation =
                filter.saturation;

            const grayscale =
                filter.grayscale;

            const temperature =
                filter.temperature;


            const brightnessFactor =
                brightness / 100;


            const contrastFactor =
                (259 *
                    (contrast + 255)) /
                (255 *
                    (259 - contrast));


            const saturationFactor =
                1 +
                saturation / 100;


            const temperatureAmount =
                temperature / 100;


            for (
                let i = 0;
                i < data.length;
                i += 4
            ) {

                let r = data[i];

                let g = data[i + 1];

                let b = data[i + 2];


                r +=
                    255 *
                    brightnessFactor;

                g +=
                    255 *
                    brightnessFactor;

                b +=
                    255 *
                    brightnessFactor;


                r =
                    contrastFactor *
                    (r - 128) +
                    128;

                g =
                    contrastFactor *
                    (g - 128) +
                    128;

                b =
                    contrastFactor *
                    (b - 128) +
                    128;


                const gray =
                    0.299 * r +
                    0.587 * g +
                    0.114 * b;


                r =
                    gray +
                    (r - gray) *
                    saturationFactor;

                g =
                    gray +
                    (g - gray) *
                    saturationFactor;

                b =
                    gray +
                    (b - gray) *
                    saturationFactor;


                const grayValue =
                    0.299 * r +
                    0.587 * g +
                    0.114 * b;


                const grayAmount =
                    grayscale / 100;


                r =
                    r *
                    (1 - grayAmount) +
                    grayValue *
                    grayAmount;

                g =
                    g *
                    (1 - grayAmount) +
                    grayValue *
                    grayAmount;

                b =
                    b *
                    (1 - grayAmount) +
                    grayValue *
                    grayAmount;


                if (
                    temperatureAmount > 0
                ) {

                    r +=
                        50 *
                        temperatureAmount;

                    g +=
                        15 *
                        temperatureAmount;

                    b -=
                        45 *
                        temperatureAmount;

                }
                else if (
                    temperatureAmount < 0
                ) {

                    r +=
                        40 *
                        temperatureAmount;

                    g +=
                        10 *
                        temperatureAmount;

                    b -=
                        50 *
                        temperatureAmount;

                }


                data[i] =
                    clamp(r);

                data[i + 1] =
                    clamp(g);

                data[i + 2] =
                    clamp(b);

            }


            previewCtx.putImageData(
                imageData,
                0,
                0
            );

        }
    );

}


/* =========================================================
   SLIDERS
========================================================= */

const sliderMap = {

    brightness:
        brightnessSlider,

    contrast:
        contrastSlider,

    saturation:
        saturationSlider,

    grayscale:
        grayscaleSlider,

    temperature:
        temperatureSlider,

    sharpen:
        sharpenSlider
};


const valueMap = {

    brightness:
        brightnessValue,

    contrast:
        contrastValue,

    saturation:
        saturationValue,

    grayscale:
        grayscaleValue,

    temperature:
        temperatureValue,

    sharpen:
        sharpenValue
};


Object.keys(sliderMap).forEach(
    function (key) {

        const slider =
            sliderMap[key];

        const value =
            valueMap[key];


        if (!slider || !value) {
            return;
        }


        slider.addEventListener(
            "input",
            function () {

                adjustments[key] =
                    Number(this.value);


                value.textContent =
                    this.value;


                if (imageLoaded) {
                    drawImage();
                }

            }
        );


        slider.addEventListener(
            "change",
            function () {

                if (imageLoaded) {
                    saveHistory();
                }

            }
        );

    }
);


/* =========================================================
   RESET ADJUSTMENTS
========================================================= */

function resetAdjustmentValues(
    save = true
) {

    adjustments = {

        brightness: 0,
        contrast: 0,
        saturation: 0,
        grayscale: 0,
        temperature: 0,
        sharpen: 0

    };


    if (brightnessSlider)
        brightnessSlider.value = 0;

    if (contrastSlider)
        contrastSlider.value = 0;

    if (saturationSlider)
        saturationSlider.value = 0;

    if (grayscaleSlider)
        grayscaleSlider.value = 0;

    if (temperatureSlider)
        temperatureSlider.value = 0;

    if (sharpenSlider)
        sharpenSlider.value = 0;


    if (brightnessValue)
        brightnessValue.textContent = "0";

    if (contrastValue)
        contrastValue.textContent = "0";

    if (saturationValue)
        saturationValue.textContent = "0";

    if (grayscaleValue)
        grayscaleValue.textContent = "0";

    if (temperatureValue)
        temperatureValue.textContent = "0";

    if (sharpenValue)
        sharpenValue.textContent = "0";


    if (imageLoaded) {

        drawImage();

        if (save) {
            saveHistory();
        }

    }

}


if (resetAdjustments) {

    resetAdjustments.addEventListener(
        "click",
        function () {

            resetAdjustmentValues(true);

            showToast(
                "Adjustments reset"
            );

        }
    );

}


if (resetAdjustmentsBottom) {

    resetAdjustmentsBottom.addEventListener(
        "click",
        function () {

            resetAdjustmentValues(true);

            showToast(
                "Adjustments reset"
            );

        }
    );

}


/* =========================================================
   PANEL SWITCHING
========================================================= */

function hidePanels() {

    if (filterPanel) {
        filterPanel.style.display =
            "none";
    }

    if (adjustPanel) {
        adjustPanel.style.display =
            "none";
    }

    if (textPanel) {
        textPanel.classList.remove(
            "show"
        );
    }


    document
        .querySelectorAll(
            ".tools button"
        )
        .forEach(
            function (btn) {

                btn.classList.remove(
                    "active-tool"
                );

            }
        );


    canvas.classList.remove(
        "text-mode"
    );

}


if (filterTool) {

    filterTool.addEventListener(
        "click",
        function () {

            hidePanels();

            filterPanel.style.display =
                "block";

            this.classList.add(
                "active-tool"
            );

            createFilterPreviews();

        }
    );

}


if (adjustTool) {

    adjustTool.addEventListener(
        "click",
        function () {

            hidePanels();

            adjustPanel.style.display =
                "block";

            this.classList.add(
                "active-tool"
            );

        }
    );

}


if (textTool) {

    textTool.addEventListener(
        "click",
        function () {

            hidePanels();

            textPanel.classList.add(
                "show"
            );

            this.classList.add(
                "active-tool"
            );

            canvas.classList.add(
                "text-mode"
            );

        }
    );

}


/* =========================================================
   ROTATE
========================================================= */

if (rotateTool) {

    rotateTool.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            returnToAfter();


            rotation =
                (rotation + 90) % 360;


            drawImage();

            saveHistory();


            showToast(
                "Image rotated ↻"
            );

        }
    );

}


/* =========================================================
   FLIP HORIZONTAL
========================================================= */

if (flipHorizontal) {

    flipHorizontal.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            returnToAfter();


            flipX *= -1;


            drawImage();

            saveHistory();


            showToast(
                "Flipped horizontally"
            );

        }
    );

}


/* =========================================================
   FLIP VERTICAL
========================================================= */

if (flipVertical) {

    flipVertical.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            returnToAfter();


            flipY *= -1;


            drawImage();

            saveHistory();


            showToast(
                "Flipped vertically"
            );

        }
    );

}


/* =========================================================
   ZOOM
========================================================= */

if (zoomIn) {

    zoomIn.addEventListener(
        "click",
        function () {

            zoom =
                Math.min(
                    3,
                    zoom + 0.1
                );

            updateZoom();

        }
    );

}


if (zoomOut) {

    zoomOut.addEventListener(
        "click",
        function () {

            zoom =
                Math.max(
                    0.3,
                    zoom - 0.1
                );

            updateZoom();

        }
    );

}


if (zoomReset) {

    zoomReset.addEventListener(
        "click",
        function () {

            zoom = 1;

            updateZoom();

        }
    );

}


function updateZoom() {

    if (!zoomValue || !canvas) {
        return;
    }


    zoomValue.textContent =
        Math.round(
            zoom * 100
        ) + "%";


    canvas.style.transform =
        `scale(${zoom})`;


    requestAnimationFrame(
        function () {

            if (selectedText) {
                updateTextSelection();
            }

        }
    );

}


/* =========================================================
   BEFORE / AFTER
========================================================= */

if (beforeAfterButton) {

    beforeAfterButton.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            showingBefore =
                !showingBefore;


            if (showingBefore) {

                drawOriginalImage();


                this.classList.add(
                    "active"
                );


                hideTextSelection();


                showToast(
                    "Before — Original image"
                );

            }
            else {

                drawImage();


                this.classList.remove(
                    "active"
                );


                showToast(
                    "After — Edited image"
                );

            }

        }
    );

}


/* =========================================================
   DRAW ORIGINAL IMAGE
========================================================= */

function drawOriginalImage() {

    if (!originalImage) {
        return;
    }


    const imgWidth =
        originalImage.naturalWidth;

    const imgHeight =
        originalImage.naturalHeight;


    let width =
        imgWidth;

    let height =
        imgHeight;


    if (rotation % 180 !== 0) {

        width =
            imgHeight;

        height =
            imgWidth;

    }


    canvas.width =
        width;

    canvas.height =
        height;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.save();


    ctx.translate(
        canvas.width / 2,
        canvas.height / 2
    );


    ctx.rotate(
        rotation *
        Math.PI /
        180
    );


    ctx.scale(
        flipX,
        flipY
    );


    ctx.drawImage(
        originalImage,

        -imgWidth / 2,
        -imgHeight / 2,

        imgWidth,
        imgHeight
    );


    ctx.restore();

}


/* =========================================================
   RETURN TO AFTER
========================================================= */

function returnToAfter() {

    if (!showingBefore) {
        return;
    }


    showingBefore = false;


    if (beforeAfterButton) {

        beforeAfterButton.classList.remove(
            "active"
        );

    }


    drawImage();

}


/* =========================================================
   HISTORY
========================================================= */

function getState() {

    return {

        filter:
            currentFilter,

        adjustments:
            {
                ...adjustments
            },

        rotation:
            rotation,

        flipX:
            flipX,

        flipY:
            flipY,

        textObjects:
            JSON.parse(
                JSON.stringify(
                    textObjects
                )
            )

    };

}


function restoreState(state) {

    currentFilter =
        state.filter;


    adjustments =
        {
            ...state.adjustments
        };


    rotation =
        state.rotation;


    flipX =
        state.flipX;


    flipY =
        state.flipY;


    textObjects =
        JSON.parse(
            JSON.stringify(
                state.textObjects
            )
        );


    selectedText = null;

    hideTextSelection();


    if (brightnessSlider)
        brightnessSlider.value =
            adjustments.brightness;

    if (contrastSlider)
        contrastSlider.value =
            adjustments.contrast;

    if (saturationSlider)
        saturationSlider.value =
            adjustments.saturation;

    if (grayscaleSlider)
        grayscaleSlider.value =
            adjustments.grayscale;

    if (temperatureSlider)
        temperatureSlider.value =
            adjustments.temperature;

    if (sharpenSlider)
        sharpenSlider.value =
            adjustments.sharpen;


    if (brightnessValue)
        brightnessValue.textContent =
            adjustments.brightness;

    if (contrastValue)
        contrastValue.textContent =
            adjustments.contrast;

    if (saturationValue)
        saturationValue.textContent =
            adjustments.saturation;

    if (grayscaleValue)
        grayscaleValue.textContent =
            adjustments.grayscale;

    if (temperatureValue)
        temperatureValue.textContent =
            adjustments.temperature;

    if (sharpenValue)
        sharpenValue.textContent =
            adjustments.sharpen;


    showingBefore = false;


    if (beforeAfterButton) {

        beforeAfterButton.classList.remove(
            "active"
        );

    }


    updateFilterActive();

    drawImage();

}


/* =========================================================
   SAVE HISTORY
========================================================= */

function saveHistory() {

    if (!imageLoaded) {
        return;
    }


    const state =
        getState();


    history =
        history.slice(
            0,
            historyIndex + 1
        );


    history.push(state);


    historyIndex =
        history.length - 1;


    updateHistoryButtons();

}


/* =========================================================
   HISTORY BUTTONS
========================================================= */

function updateHistoryButtons() {

    if (undoButton) {

        undoButton.disabled =
            historyIndex <= 0;

    }

    if (redoButton) {

        redoButton.disabled =
            historyIndex >=
            history.length - 1;

    }

}


if (undoButton) {

    undoButton.addEventListener(
        "click",
        function () {

            if (
                historyIndex <= 0
            ) {
                return;
            }


            historyIndex--;


            restoreState(
                history[
                    historyIndex
                ]
            );


            updateHistoryButtons();


            showToast(
                "Undo ↶"
            );

        }
    );

}


if (redoButton) {

    redoButton.addEventListener(
        "click",
        function () {

            if (
                historyIndex >=
                history.length - 1
            ) {
                return;
            }


            historyIndex++;


            restoreState(
                history[
                    historyIndex
                ]
            );


            updateHistoryButtons();


            showToast(
                "Redo ↷"
            );

        }
    );

}


/* =========================================================
   TEXT SIZE
========================================================= */

if (textSize) {

    textSize.addEventListener(
        "input",
        function () {

            textSettings.size =
                Number(this.value);


            textSizeValue.textContent =
                this.value + "px";


            if (selectedText) {

                selectedText.size =
                    textSettings.size;


                drawImage();

            }

        }
    );


    textSize.addEventListener(
        "change",
        function () {

            if (selectedText) {
                saveHistory();
            }

        }
    );

}


/* =========================================================
   TEXT COLOR
========================================================= */

if (textColor) {

    textColor.addEventListener(
        "input",
        function () {

            textSettings.color =
                this.value;


            textColorValue.textContent =
                this.value.toUpperCase();


            if (selectedText) {

                selectedText.color =
                    textSettings.color;


                drawImage();

            }

        }
    );


    textColor.addEventListener(
        "change",
        function () {

            if (selectedText) {
                saveHistory();
            }

        }
    );

}


/* =========================================================
   TEXT BOLD
========================================================= */

if (textBold) {

    textBold.addEventListener(
        "click",
        function () {

            textSettings.bold =
                !textSettings.bold;


            this.classList.toggle(
                "active",
                textSettings.bold
            );


            if (selectedText) {

                selectedText.bold =
                    textSettings.bold;


                drawImage();

                saveHistory();

            }

        }
    );

}


/* =========================================================
   TEXT ITALIC
========================================================= */

if (textItalic) {

    textItalic.addEventListener(
        "click",
        function () {

            textSettings.italic =
                !textSettings.italic;


            this.classList.toggle(
                "active",
                textSettings.italic
            );


            if (selectedText) {

                selectedText.italic =
                    textSettings.italic;


                drawImage();

                saveHistory();

            }

        }
    );

}


/* =========================================================
   ADD TEXT
========================================================= */

if (addTextButton) {

    addTextButton.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            const value =
                textInput.value.trim();


            if (!value) {

                showToast(
                    "Write something first."
                );

                return;
            }


            returnToAfter();


            const newText = {

                text:
                    value,

                x:
                    canvas.width / 2,

                y:
                    canvas.height / 2,

                size:
                    textSettings.size,

                color:
                    textSettings.color,

                bold:
                    textSettings.bold,

                italic:
                    textSettings.italic

            };


            textObjects.push(
                newText
            );


            selectedText =
                newText;


            drawImage();

            createTextSelectionBox();

            updateTextSelection();

            saveHistory();


            textInput.value = "";


            showToast(
                "Text added ✨"
            );

        }
    );

}


/* =========================================================
   DELETE SELECTED TEXT
========================================================= */

if (deleteTextButton) {

    deleteTextButton.addEventListener(
        "click",
        function () {

            if (!selectedText) {

                showToast(
                    "Select a text first."
                );

                return;
            }


            textObjects =
                textObjects.filter(
                    function (text) {

                        return (
                            text !==
                            selectedText
                        );

                    }
                );


            selectedText = null;


            hideTextSelection();


            drawImage();

            saveHistory();


            showToast(
                "Text deleted"
            );

        }
    );

}


/* =========================================================
   DRAW TEXT
========================================================= */

function drawTexts() {

    if (!textObjects.length) {
        return;
    }


    textObjects.forEach(
        function (text) {

            ctx.save();


            let style = "";


            if (text.italic) {
                style += "italic ";
            }


            if (text.bold) {
                style += "bold ";
            }


            ctx.font =
                `${style}${text.size}px DM Sans`;


            ctx.fillStyle =
                text.color;


            ctx.textAlign =
                "center";


            ctx.textBaseline =
                "middle";


            ctx.shadowColor =
                "rgba(0,0,0,.25)";


            ctx.shadowBlur =
                4;


            ctx.fillText(
                text.text,
                text.x,
                text.y
            );


            ctx.restore();

        }
    );

}


/* =========================================================
   GET TEXT BOUNDS
========================================================= */

function getTextBounds(text) {

    ctx.save();


    let style = "";


    if (text.italic) {
        style += "italic ";
    }


    if (text.bold) {
        style += "bold ";
    }


    ctx.font =
        `${style}${text.size}px DM Sans`;


    const metrics =
        ctx.measureText(
            text.text
        );


    const width =
        Math.max(
            metrics.width,
            10
        );


    const height =
        Math.max(
            text.size * 1.35,
            15
        );


    ctx.restore();


    return {

        left:
            text.x -
            width / 2,

        top:
            text.y -
            height / 2,

        width:
            width,

        height:
            height

    };

}


/* =========================================================
   CREATE TEXT SELECTION BOX
========================================================= */

function createTextSelectionBox() {

    if (textSelectionBox) {
        return;
    }


    textSelectionBox =
        document.createElement("div");


    textSelectionBox.className =
        "text-selection-box";


    const label =
        document.createElement("div");


    label.className =
        "text-selection-label";


    label.textContent =
        "Text";


    textSelectionBox.appendChild(
        label
    );


    const positions = [
        "tl",
        "tr",
        "bl",
        "br"
    ];


    positions.forEach(
        function (position) {

            const handle =
                document.createElement("div");


            handle.className =
                `text-selection-handle ${position}`;


            handle.addEventListener(
                "pointerdown",
                function (e) {

                    if (!selectedText) {
                        return;
                    }


                    e.preventDefault();

                    e.stopPropagation();


                    resizingText = true;


                    resizeStartY =
                        e.clientY;


                    resizeStartSize =
                        selectedText.size;


                    handle.setPointerCapture(
                        e.pointerId
                    );

                }
            );


            handle.addEventListener(
                "pointermove",
                function (e) {

                    if (
                        !resizingText ||
                        !selectedText
                    ) {
                        return;
                    }


                    const difference =
                        e.clientY -
                        resizeStartY;


                    let newSize =
                        resizeStartSize +
                        difference *
                        0.5;


                    newSize =
                        Math.max(
                            10,
                            Math.min(
                                200,
                                newSize
                            )
                        );


                    selectedText.size =
                        Math.round(
                            newSize
                        );


                    textSettings.size =
                        selectedText.size;


                    if (textSize) {

                        textSize.value =
                            selectedText.size;

                    }


                    if (textSizeValue) {

                        textSizeValue.textContent =
                            selectedText.size +
                            "px";

                    }


                    drawImage();

                }
            );


            handle.addEventListener(
                "pointerup",
                function () {

                    if (resizingText) {

                        resizingText =
                            false;

                        saveHistory();

                    }

                }
            );


            handle.addEventListener(
                "pointercancel",
                function () {

                    resizingText =
                        false;

                }
            );


            textSelectionBox.appendChild(
                handle
            );

        }
    );


    canvasArea.appendChild(
        textSelectionBox
    );

}


/* =========================================================
   UPDATE TEXT SELECTION BOX
========================================================= */

function updateTextSelection() {

    if (
        !selectedText ||
        !imageLoaded ||
        !canvasArea
    ) {

        hideTextSelection();

        return;

    }


    createTextSelectionBox();


    const bounds =
        getTextBounds(
            selectedText
        );


    const rect =
        canvas.getBoundingClientRect();


    const areaRect =
        canvasArea.getBoundingClientRect();


    const scaleX =
        rect.width /
        canvas.width;


    const scaleY =
        rect.height /
        canvas.height;


    const left =
        rect.left +
        bounds.left *
        scaleX;


    const top =
        rect.top +
        bounds.top *
        scaleY;


    const width =
        bounds.width *
        scaleX;


    const height =
        bounds.height *
        scaleY;


    textSelectionBox.style.left =
        (
            left -
            areaRect.left
        ) + "px";


    textSelectionBox.style.top =
        (
            top -
            areaRect.top
        ) + "px";


    textSelectionBox.style.width =
        width + "px";


    textSelectionBox.style.height =
        height + "px";


    textSelectionBox.classList.add(
        "show"
    );

}


/* =========================================================
   HIDE TEXT SELECTION
========================================================= */

function hideTextSelection() {

    if (!textSelectionBox) {
        return;
    }


    textSelectionBox.classList.remove(
        "show"
    );

}


/* =========================================================
   SELECT TEXT
========================================================= */

function selectText(text) {

    selectedText =
        text;


    textSettings.size =
        text.size;

    textSettings.color =
        text.color;

    textSettings.bold =
        text.bold;

    textSettings.italic =
        text.italic;


    if (textSize) {

        textSize.value =
            text.size;

    }


    if (textSizeValue) {

        textSizeValue.textContent =
            text.size +
            "px";

    }


    if (textColor) {

        textColor.value =
            text.color;

    }


    if (textColorValue) {

        textColorValue.textContent =
            text.color.toUpperCase();

    }


    if (textBold) {

        textBold.classList.toggle(
            "active",
            text.bold
        );

    }


    if (textItalic) {

        textItalic.classList.toggle(
            "active",
            text.italic
        );

    }


    createTextSelectionBox();

    updateTextSelection();

}


/* =========================================================
   FIND TEXT UNDER POINTER
========================================================= */

function getTextAtPoint(x, y) {

    for (
        let i =
            textObjects.length - 1;
        i >= 0;
        i--
    ) {

        const text =
            textObjects[i];


        const bounds =
            getTextBounds(
                text
            );


        const padding =
            Math.max(
                10,
                text.size * 0.15
            );


        if (
            x >=
                bounds.left -
                padding &&

            x <=
                bounds.left +
                bounds.width +
                padding &&

            y >=
                bounds.top -
                padding &&

            y <=
                bounds.top +
                bounds.height +
                padding
        ) {

            return text;

        }

    }


    return null;

}


/* =========================================================
   TEXT POINTER DOWN
========================================================= */

canvas.addEventListener(
    "pointerdown",
    function (e) {

        if (!imageLoaded) {
            return;
        }


        if (resizingText) {
            return;
        }


        const rect =
            canvas.getBoundingClientRect();


        const scaleX =
            canvas.width /
            rect.width;


        const scaleY =
            canvas.height /
            rect.height;


        const x =
            (e.clientX -
                rect.left) *
            scaleX;


        const y =
            (e.clientY -
                rect.top) *
            scaleY;


        const foundText =
            getTextAtPoint(
                x,
                y
            );


        if (!foundText) {

            if (
                isDraggingText
            ) {
                return;
            }


            selectedText =
                null;


            hideTextSelection();

            return;

        }


        selectText(
            foundText
        );


        isDraggingText =
            true;


        dragOffsetX =
            x -
            foundText.x;


        dragOffsetY =
            y -
            foundText.y;


        canvas.classList.add(
            "dragging-text"
        );


        canvas.setPointerCapture(
            e.pointerId
        );

    }
);


/* =========================================================
   TEXT POINTER MOVE
========================================================= */

canvas.addEventListener(
    "pointermove",
    function (e) {

        if (
            !isDraggingText ||
            !selectedText
        ) {
            return;
        }


        const rect =
            canvas.getBoundingClientRect();


        const scaleX =
            canvas.width /
            rect.width;


        const scaleY =
            canvas.height /
            rect.height;


        selectedText.x =
            (
                e.clientX -
                rect.left
            ) *
            scaleX -
            dragOffsetX;


        selectedText.y =
            (
                e.clientY -
                rect.top
            ) *
            scaleY -
            dragOffsetY;


        drawImage();

    }
);


/* =========================================================
   FINISH TEXT DRAG
========================================================= */

function finishTextDrag(e) {

    if (!isDraggingText) {
        return;
    }


    isDraggingText =
        false;


    canvas.classList.remove(
        "dragging-text"
    );


    if (
        e &&
        canvas.hasPointerCapture(
            e.pointerId
        )
    ) {

        canvas.releasePointerCapture(
            e.pointerId
        );

    }


    saveHistory();

    updateTextSelection();

}


canvas.addEventListener(
    "pointerup",
    finishTextDrag
);


canvas.addEventListener(
    "pointercancel",
    finishTextDrag
);


/* =========================================================
   CROP
========================================================= */

if (cropTool) {

    cropTool.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            returnToAfter();


            cropImage.src =
                canvas.toDataURL(
                    "image/png"
                );


            cropModal.style.display =
                "flex";


            requestAnimationFrame(
                function () {

                    cropFrame.style.left =
                        "10%";

                    cropFrame.style.top =
                        "10%";

                    cropFrame.style.width =
                        "80%";

                    cropFrame.style.height =
                        "80%";

                }
            );

        }
    );

}


/* =========================================================
   CROP CANCEL
========================================================= */

if (cropCancel) {

    cropCancel.addEventListener(
        "click",
        function () {

            cropModal.style.display =
                "none";

        }
    );

}


/* =========================================================
   CROP APPLY
========================================================= */

if (cropApply) {

    cropApply.addEventListener(
        "click",
        function () {

            if (
                !cropImage.naturalWidth
            ) {
                return;
            }


            const imageRect =
                cropImage.getBoundingClientRect();


            const frameRect =
                cropFrame.getBoundingClientRect();


            const scaleX =
                cropImage.naturalWidth /
                imageRect.width;


            const scaleY =
                cropImage.naturalHeight /
                imageRect.height;


            let cropX =
                (frameRect.left -
                    imageRect.left) *
                scaleX;


            let cropY =
                (frameRect.top -
                    imageRect.top) *
                scaleY;


            let cropWidth =
                frameRect.width *
                scaleX;


            let cropHeight =
                frameRect.height *
                scaleY;


            cropX =
                Math.max(
                    0,
                    Math.min(
                        cropX,
                        cropImage.naturalWidth
                    )
                );


            cropY =
                Math.max(
                    0,
                    Math.min(
                        cropY,
                        cropImage.naturalHeight
                    )
                );


            cropWidth =
                Math.min(
                    cropWidth,
                    cropImage.naturalWidth -
                    cropX
                );


            cropHeight =
                Math.min(
                    cropHeight,
                    cropImage.naturalHeight -
                    cropY
                );


            const temp =
                document.createElement(
                    "canvas"
                );


            temp.width =
                Math.max(
                    1,
                    Math.round(
                        cropWidth
                    )
                );


            temp.height =
                Math.max(
                    1,
                    Math.round(
                        cropHeight
                    )
                );


            const tempCtx =
                temp.getContext("2d");


            tempCtx.drawImage(
                cropImage,

                cropX,
                cropY,

                cropWidth,
                cropHeight,

                0,
                0,

                temp.width,
                temp.height
            );


            const newImage =
                new Image();


            newImage.onload =
                function () {

                    originalImage =
                        newImage;


                    currentFilter =
                        "original";


                    resetAdjustmentValues(
                        false
                    );


                    rotation = 0;

                    flipX = 1;

                    flipY = 1;


                    textObjects = [];

                    selectedText = null;

                    hideTextSelection();


                    updateFilterActive();

                    drawImage();

                    createFilterPreviews();


                    cropModal.style.display =
                        "none";


                    saveHistory();


                    showToast(
                        "Image cropped ✂"
                    );

                };


            newImage.src =
                temp.toDataURL(
                    "image/png"
                );

        }
    );

}


/* =========================================================
   CROP RATIOS
========================================================= */

ratioButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                ratioButtons.forEach(
                    function (b) {

                        b.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                const ratio =
                    this.dataset.ratio;


                if (
                    ratio ===
                    "free"
                ) {

                    cropFrame.style.width =
                        "80%";

                    cropFrame.style.height =
                        "80%";

                    return;

                }


                const value =
                    Number(ratio);


                const rect =
                    cropContainer.getBoundingClientRect();


                let width =
                    rect.width *
                    0.8;


                let height =
                    width /
                    value;


                if (
                    height >
                    rect.height *
                    0.8
                ) {

                    height =
                        rect.height *
                        0.8;

                    width =
                        height *
                        value;

                }


                cropFrame.style.width =
                    width + "px";


                cropFrame.style.height =
                    height + "px";


                cropFrame.style.left =
                    (
                        rect.width -
                        width
                    ) /
                    2 +
                    "px";


                cropFrame.style.top =
                    (
                        rect.height -
                        height
                    ) /
                    2 +
                    "px";

            }
        );

    }
);


/* =========================================================
   CROP DRAG
========================================================= */

let cropDragging = false;

let cropStartX = 0;
let cropStartY = 0;


cropFrame.addEventListener(
    "pointerdown",
    function (e) {

        cropDragging = true;


        cropStartX =
            e.clientX -
            cropFrame.offsetLeft;


        cropStartY =
            e.clientY -
            cropFrame.offsetTop;


        cropFrame.setPointerCapture(
            e.pointerId
        );

    }
);


cropFrame.addEventListener(
    "pointermove",
    function (e) {

        if (!cropDragging) {
            return;
        }


        const rect =
            cropContainer.getBoundingClientRect();


        let left =
            e.clientX -
            rect.left -
            cropStartX;


        let top =
            e.clientY -
            rect.top -
            cropStartY;


        left =
            Math.max(
                0,
                Math.min(
                    left,
                    rect.width -
                    cropFrame.offsetWidth
                )
            );


        top =
            Math.max(
                0,
                Math.min(
                    top,
                    rect.height -
                    cropFrame.offsetHeight
                )
            );


        cropFrame.style.left =
            left + "px";


        cropFrame.style.top =
            top + "px";

    }
);


cropFrame.addEventListener(
    "pointerup",
    function () {

        cropDragging = false;

    }
);


cropFrame.addEventListener(
    "pointercancel",
    function () {

        cropDragging = false;

    }
);


/* =========================================================
   SAVE IMAGE
========================================================= */

if (saveImageBtn) {

    saveImageBtn.addEventListener(
        "click",
        function () {

            if (!imageLoaded) {

                showToast(
                    "Upload an image first."
                );

                return;
            }


            if (showingBefore) {

                showingBefore = false;

                beforeAfterButton.classList.remove(
                    "active"
                );

                drawImage();

            }


            const link =
                document.createElement(
                    "a"
                );


            link.download =
                "pixora-edited-image.png";


            link.href =
                canvas.toDataURL(
                    "image/png"
                );


            link.click();


            showToast(
                "Image saved ✨"
            );

        }
    );

}


/* =========================================================
   DRAG & DROP
========================================================= */

[
    "dragenter",
    "dragover"
].forEach(
    function (eventName) {

        canvasArea.addEventListener(
            eventName,
            function (e) {

                e.preventDefault();

                e.stopPropagation();

                dropOverlay.classList.add(
                    "show"
                );

            }
        );

    }
);


[
    "dragleave",
    "drop"
].forEach(
    function (eventName) {

        canvasArea.addEventListener(
            eventName,
            function (e) {

                e.preventDefault();

                e.stopPropagation();

                dropOverlay.classList.remove(
                    "show"
                );

            }
        );

    }
);


canvasArea.addEventListener(
    "drop",
    function (e) {

        const files =
            e.dataTransfer.files;


        if (
            files &&
            files.length > 0
        ) {

            loadImage(
                files[0]
            );

        }

    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        showToast.timer
    );


    showToast.timer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            1800
        );

}


/* =========================================================
   HELPER
========================================================= */

function capitalize(str) {

    return (
        str.charAt(0).toUpperCase() +
        str.slice(1)
    );

}


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (selectedText) {

            updateTextSelection();

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

if (filterPanel) {

    filterPanel.style.display =
        "block";

}

if (adjustPanel) {

    adjustPanel.style.display =
        "none";

}

if (textPanel) {

    textPanel.classList.remove(
        "show"
    );

}

if (canvas) {

    canvas.style.display =
        "none";

}


/* =========================================================
   CREATE TEXT SELECTION BOX
========================================================= */

createTextSelectionBox();

updateHistoryButtons();

updateZoom();


console.log(
    "✨ PIXORA — Complete Editor Ready"
);
/* =========================================================
   REMOVE ACCIDENTAL "Text" FROM UPLOAD AREA
========================================================= */

function removeStrayText() {

    const canvasArea =
        document.getElementById("canvasArea");

    if (!canvasArea) return;


    /* Remove any element whose only visible text is "Text" */

    canvasArea.querySelectorAll("*").forEach(
        function (element) {

            if (
                element.children.length === 0 &&
                element.textContent.trim() === "Text"
            ) {

                element.remove();

            }

        }
    );


    /* Also remove direct text nodes containing "Text" */

    canvasArea.childNodes.forEach(
        function (node) {

            if (
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim() === "Text"
            ) {

                node.remove();

            }

        }
    );

}


removeStrayText();