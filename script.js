const artData = [
    {
        id: 1,
        folder: "w-1",
        title: "Choose Your Destiny Chad: YES or NO",
        category: "illustration",
        date: "Jan 6, 2025",
        tools: ["Medibang"],
        description: `Graiku all 🐉, 

        Today I made an Art for @raikucom , after the slop and not slop update, I thought of making an art related to that.

        I think this update is really fair to those who are contributing because there is a reason why their art or content can be slop or non-slop. 
        
        Keep cooking for the next art, stay tuned 🧑‍🍳.`,
        link: "https://x.com/kersa1n/status/2008327117868793858"
    },
    {
        id: 2,
        folder: "w-2",
        title: "Raiku Speed & Precision",
        category: "raiku-tweets",
        date: "Jan 12, 2026",
        tools: ["Medibang"],
        description: `Speed is a choice 🐉. 

Precision is an infrastructure. 

@raikucom was born from the frustration of broken promises and fragmented tools. 

Today, we’re the coordination layer that streamlines the win for hundreds of developers worldwide.

Cross the finish line with execution you can trust.`,
        link: "https://x.com/kersa1n/status/2010537174442414376"
    },
    {
        id: 3,
        folder: "w-3",
        title: "Party Day Townhall",
        category: "raiku-tweets",
        date: "Jan 23, 2026",
        tools: ["Medibang"],
        description: `Today is a party day on @raikucom.

But wait...........who is that?

Don't disturb our fun tonight.

Have fun @_offmylawn, @duckk9x and Raiku gank!

Don't sleep before joining Raiku Townhall 🐉.`,
        link: "https://x.com/kersa1n/status/2014604016349806678"
    },
    {
        id: 4,
        folder: "w-4",
        title: "The Last Champion Standing",
        category: "illustration",
        date: "Jan 28, 2026",
        tools: ["Medibang"],
        description: `gRyku banger 🐉. 

        @raikucom has been making some interesting moves lately.

The once bustling community has suddenly disappeared, leaving only the winners consistently present.

I'm really looking forward to Raiku Talku.

Talking and listening to each other allows Raiku to grow.`,
        link: "https://x.com/kersa1n/status/2016459500363079830"
    },
    {
        id: 5,
        folder: "w-5",
        title: "Raiku Cinema Tonight",
        category: "illustration",
        date: "1 Feb, 2026",
        tools: ["Medibang"],
        description: `Happy Weekend Ryku 🐉

Tonight we spent relaxing at @raikucom Cinema.

Get your coke and popcorn ready to start the fun.

Did you see that? 

Yes, @_offmylawn belly is getting bigger.

Looks like he needs to go on a diet 😰.`,
        link: "https://x.com/kersa1n/status/2017941181695701232"
    }
];

let currentIndex = 0;
let filteredData = [];
const galleryContainer = document.getElementById('gallery');
const modal = document.getElementById("artModal");
const modalMainImg = document.getElementById("modalMainImg");
const modalMainVideo = document.getElementById("modalMainVideo");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCategory = document.getElementById("modalCategory");
const modalTools = document.getElementById("modalTools");
const modalLink = document.getElementById("modalLink");
const artThumbnail = document.getElementById("artThumbnail");
const powStaticImg = document.getElementById("powStaticImg");
const btnMdp = document.getElementById("btnMdp");

function renderGallery(filter = 'all') {
    galleryContainer.innerHTML = ''; 
    
    if (filter === 'all') {
        filteredData = artData;
    } else {
        filteredData = artData.filter(item => item.category === filter);
    }

    filteredData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.style.animationDelay = `${index * 100}ms`;
        
        const imgPath = `img/${item.folder}/art.png`;
        
        card.onclick = () => openModal(item.id);

        card.innerHTML = `
            <img src="${imgPath}" alt="${item.title}" loading="lazy">
            <div class="art-overlay">
                <div class="art-meta">
                    <span class="art-cat">${item.category === 'raiku-tweets' ? 'RAIKU' : 'ART'}</span>
                    <span>${item.date}</span>
                </div>
                <h3>${item.title}</h3>
            </div>
        `;
        galleryContainer.appendChild(card);
    });
}

function filterGallery(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderGallery(category);
}

function openModal(id) {
    currentIndex = filteredData.findIndex(item => item.id === id);
    updateModalContent();
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function updateModalContent() {
    const item = filteredData[currentIndex];
    const artPath = `img/${item.folder}/art.png`;
    const proofImgPath = `img/${item.folder}/proof.jpg`;
    const proofVidPath = `img/${item.folder}/proof-vid.mp4`;
    const sourceMdpPath = `img/${item.folder}/source.mdp`;

    viewMainImage();

    modalTitle.innerText = item.title;
    modalDesc.innerText = item.description;
    modalCategory.innerText = item.category.replace('-', ' ').toUpperCase();
    modalLink.href = item.link;
    modalTools.innerHTML = item.tools.map(t => `<span class="tool-badge">${t}</span>`).join('');

    artThumbnail.src = artPath;
    powStaticImg.src = proofImgPath;
    
    modalMainVideo.src = proofVidPath;
    modalMainVideo.load();

    btnMdp.href = sourceMdpPath;
}

function viewMainImage() {
    const item = filteredData[currentIndex];
    const artPath = `img/${item.folder}/art.png`;
    
    modalMainVideo.pause();
    modalMainVideo.classList.add('hidden-media');
    modalMainVideo.classList.remove('active-media');

    modalMainImg.src = artPath;
    modalMainImg.classList.remove('hidden-media');
    modalMainImg.classList.add('active-media');
    
    resetZoom();
}

function viewProofImage() {
    const item = filteredData[currentIndex];
    const proofImgPath = `img/${item.folder}/proof.jpg`;

    modalMainVideo.pause();
    modalMainVideo.classList.add('hidden-media');
    modalMainVideo.classList.remove('active-media');

    modalMainImg.src = proofImgPath;
    modalMainImg.classList.remove('hidden-media');
    modalMainImg.classList.add('active-media');
    
    resetZoom();
}

function playProofVideo() {
    modalMainImg.classList.add('hidden-media');
    modalMainImg.classList.remove('active-media');
    
    modalMainVideo.classList.remove('hidden-media');
    modalMainVideo.classList.add('active-media');

    modalMainVideo.play();
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modalMainVideo.pause();
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= filteredData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = filteredData.length - 1;
    updateModalContent();
}

document.addEventListener('keydown', e => {
    if (modal.style.display === "block") {
        if (e.key === "ArrowLeft") changeSlide(-1);
        if (e.key === "ArrowRight") changeSlide(1);
        if (e.key === "Escape") closeModal();
    }
});

let touchStartX = 0;
const modalContent = document.querySelector('.modal-content');

modalContent.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
modalContent.addEventListener('touchend', e => {
    let touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) changeSlide(1);
    if (touchEndX - touchStartX > 50) changeSlide(-1);
}, {passive: true});

const mediaContainer = document.getElementById('mediaContainer');

mediaContainer.onclick = function(e) {
    if (modalMainVideo.classList.contains('active-media')) return;

    this.classList.toggle('zoomed');
    
    if (this.classList.contains('zoomed')) {
        modalMainImg.style.transform = "scale(2)";
        modalMainImg.style.cursor = "zoom-out";
        moveImage(e);
        this.onmousemove = moveImage;
    } else {
        resetZoom();
    }
};

function moveImage(e) {
    const { left, top, width, height } = mediaContainer.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    modalMainImg.style.transformOrigin = `${x}% ${y}%`;
}

function resetZoom() {
    mediaContainer.classList.remove('zoomed');
    modalMainImg.style.transform = "scale(1)";
    modalMainImg.style.cursor = "zoom-in";
    mediaContainer.onmousemove = null;
}

window.onclick = e => { if (e.target == modal) closeModal(); };

renderGallery('all');