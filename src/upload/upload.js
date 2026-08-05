const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
});

const folders = [];
const media = [];
let currentFolder = null;
let editingFolderId = null;
let editingMediaId = null;
let deleteTarget = null;

const gallery = document.getElementById("gallery");
const breadcrumb = document.getElementById("breadcrumb");
const uploadButton = document.getElementById("upload-button");
const folderButton = document.getElementById("folder-button");
const backButton = document.getElementById("back-button");
const fileInput = document.getElementById("file-input");
const logoutButton = document.getElementById("logout-button");

const folderDialog = document.getElementById("folder-dialog");
const folderName = document.getElementById("folder-name");
const saveFolder = document.getElementById("save-folder");
const cancelFolder = document.getElementById("cancel-folder");

const mediaDialog = document.getElementById("media-dialog");
const mediaDescription = document.getElementById("media-description");
const mediaHashtags = document.getElementById("media-hashtags");
const saveMedia = document.getElementById("save-media");
const cancelMedia = document.getElementById("cancel-media");

const confirmDialog = document.getElementById("confirm-dialog");
const confirmMessage = document.getElementById("confirm-message");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const MAX_VIDEO_SIZE = 5 * 1024 * 1024 * 1024;

uploadButton.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", handleUpload);

function handleUpload(event) {
    const files = Array.from(event.target.files);

    files.forEach(file => {
        if (!validateFile(file)) {
            return;
        }

        media.push({
            id: crypto.randomUUID(),
            folderId: currentFolder,
            name: file.name,
            type: file.type.startsWith("image/") ? "image" : "video",
            url: URL.createObjectURL(file),
            description: "",
            hashtags: ""
        });
    });

    render();
    fileInput.value = "";
}

function validateFile(file) {
    if (file.type.startsWith("image/")) {
        return file.size <= MAX_IMAGE_SIZE;
    }

    if (file.type.startsWith("video/")) {
        return file.size <= MAX_VIDEO_SIZE;
    }

    return false;
}

folderButton.addEventListener("click", () => {
    editingFolderId = null;
    folderName.value = "";
    folderDialog.showModal();
});

saveFolder.addEventListener("click", () => {
    const name = folderName.value.trim();

    if (!name) {
        return;
    }

    if (editingFolderId) {
        const folder = folders.find(item => item.id === editingFolderId);

        if (folder) {
            folder.name = name;
        }
    } else {
        folders.push({
            id: crypto.randomUUID(),
            name
        });
    }

    folderDialog.close();
    render();
});

cancelFolder.addEventListener("click", () => {
    folderDialog.close();
});

function openFolder(id) {
    currentFolder = id;
    render();
}

function editFolder(id) {
    const folder = folders.find(item => item.id === id);

    if (!folder) {
        return;
    }

    editingFolderId = id;
    folderName.value = folder.name;
    folderDialog.showModal();
}

function deleteFolder(id) {
    deleteTarget = {
        type: "folder",
        id
    };

    const folder = folders.find(item => item.id === id);
    const files = media.filter(item => item.folderId === id).length;

    confirmMessage.textContent = `Delete ${folder.name}? ${files} files will be removed.`;
    confirmDialog.showModal();
}

function editMedia(id) {
    const item = media.find(file => file.id === id);

    if (!item) {
        return;
    }

    editingMediaId = id;
    mediaDescription.value = item.description;
    mediaHashtags.value = item.hashtags;
    mediaDialog.showModal();
}

saveMedia.addEventListener("click", () => {
    const item = media.find(file => file.id === editingMediaId);

    if (item) {
        item.description = mediaDescription.value.trim();
        item.hashtags = mediaHashtags.value.trim();
    }

    mediaDialog.close();
    render();
});

cancelMedia.addEventListener("click", () => {
    mediaDialog.close();
});

function deleteMedia(id) {
    deleteTarget = {
        type: "media",
        id
    };

    confirmMessage.textContent = "Delete this media?";
    confirmDialog.showModal();
}

confirmDelete.addEventListener("click", () => {
    if (!deleteTarget) {
        return;
    }

    if (deleteTarget.type === "media") {
        const index = media.findIndex(item => item.id === deleteTarget.id);

        if (index >= 0) {
            URL.revokeObjectURL(media[index].url);
            media.splice(index, 1);
        }
    }

    if (deleteTarget.type === "folder") {
        const index = folders.findIndex(item => item.id === deleteTarget.id);

        if (index >= 0) {
            folders.splice(index, 1);
        }

        for (let i = media.length - 1; i >= 0; i--) {
            if (media[i].folderId === deleteTarget.id) {
                URL.revokeObjectURL(media[i].url);
                media.splice(i, 1);
            }
        }
    }

    deleteTarget = null;
    confirmDialog.close();
    render();
});

cancelDelete.addEventListener("click", () => {
    confirmDialog.close();
});

backButton.addEventListener("click", () => {
    currentFolder = null;
    render();
});

function render() {
    gallery.innerHTML = "";
    updateNavigation();

    folders
        .filter(folder => currentFolder === null)
        .forEach(folder => {
            gallery.appendChild(createFolder(folder));
        });

    media
        .filter(item => item.folderId === currentFolder)
        .forEach(item => {
            gallery.appendChild(createMedia(item));
        });
}

function updateNavigation() {
    if (currentFolder) {
        const folder = folders.find(item => item.id === currentFolder);

        breadcrumb.textContent = `Home / ${folder.name}`;
        backButton.hidden = false;
    } else {
        breadcrumb.textContent = "Home";
        backButton.hidden = true;
    }
}

function createFolder(folder) {
    const element = document.createElement("article");
    element.className = "item";

    element.innerHTML = `
        <div class="item-preview">
            <div class="folder">
                ${folder.name}
            </div>
        </div>
        <strong class="item-title">
            Folder
        </strong>
        <div class="item-actions">
            <button class="button secondary">
                Open
            </button>
            <button class="button secondary">
                Edit
            </button>
            <button class="button">
                Delete
            </button>
        </div>
    `;

    const buttons = element.querySelectorAll("button");
    buttons[0].onclick = () => openFolder(folder.id);
    buttons[1].onclick = () => editFolder(folder.id);
    buttons[2].onclick = () => deleteFolder(folder.id);

    return element;
}

function createMedia(item) {
    const element = document.createElement("article");
    element.className = "item";

    const preview = item.type === "image"
        ? `<img src="${item.url}" alt="${item.name}">`
        : `<video controls><source src="${item.url}"></video>`;

    element.innerHTML = `
        <div class="item-preview">
            ${preview}
        </div>
        <strong class="item-title">
            ${item.name}
        </strong>
        <p class="item-description">
            ${item.description}
            <br>
            ${item.hashtags}
        </p>
        <div class="item-actions">
            <button class="button secondary">
                Edit
            </button>
            <button class="button">
                Delete
            </button>
        </div>
    `;

    const buttons = element.querySelectorAll("button");
    buttons[0].onclick = () => editMedia(item.id);
    buttons[1].onclick = () => deleteMedia(item.id);

    return element;
}

logoutButton.addEventListener("click", () => {
    window.location.href = "../index.html";
});

render();