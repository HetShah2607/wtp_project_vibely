
/* =========================================
   VIBELY - SHARED MUSIC PLAYER
   Works with Home, Artists, Albums and
   Categories pages.
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // MUSIC PLAYER ELEMENTS
    const audioPlayer = document.getElementById("audioPlayer");
    const mainPlayButton = document.getElementById("mainPlayButton");
    const currentTitle = document.getElementById("currentTitle");
    const currentArtist = document.getElementById("currentArtist");
    const currentCover = document.getElementById("currentCover");
    const progressBar = document.getElementById("progressBar");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");
    const volumeBar = document.getElementById("volumeBar");
    const favoriteButton = document.getElementById("favoriteButton");
    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");

    // SUPPORTED SONG BUTTON CLASSES
    const songButtonSelector = [
        ".play-song",
        ".artist-play-button",
        ".album-track-play",
        '[data-action="play"]'
    ].join(",");

    let currentSong = null;
    let currentQueue = [];
    let currentIndex = -1;
    let activeCategory = "all";
    let searchQuery = "";

    // SAVE FAVORITES IN THIS BROWSER
    let favorites = [];

    try {
        favorites = JSON.parse(
            localStorage.getItem("vibelyFavorites") || "[]"
        );

        if (!Array.isArray(favorites)) {
            favorites = [];
        }
    } catch (error) {
        favorites = [];
    }

    // FIND A SONG'S CONTAINER
    function getSongContainer(button) {
        return button.closest(
            ".song-card, .artist-song-title, .artist-song-row, " +
            ".album-track-row, .album-track-info, tr, article"
        ) || button.parentElement;
    }

    // GET SONG INFORMATION FROM THE BUTTON OR ITS CONTAINER
    function getSongInfo(button) {

        const container = getSongContainer(button);

        const audioPath =
            button.dataset.audio ||
            button.closest("[data-audio]")?.dataset.audio;

        if (!audioPath) {
            return null;
        }

        const titleElement = container?.querySelector(
            ".artist-song-title strong, " +
            ".album-track-info h3, " +
            ".album-track-title, h3"
        );

        const title =
            button.dataset.title ||
            container?.dataset.title ||
            titleElement?.textContent.trim() ||
            button.getAttribute("aria-label") ||
            "Unknown Song";

        const artistElement = container?.querySelector(
            ".artist-song-title small, " +
            ".album-track-info p, " +
            ".artist-song-artist"
        );

        const artist =
            button.dataset.artist ||
            container?.dataset.artist ||
            artistElement?.textContent.trim() ||
            document.querySelector(".artist-profile-info h1")
                ?.textContent.trim() ||
            document.querySelector(".specific-album-info h1")
                ?.textContent.trim() ||
            "Vibely Artist";

        const image =
            button.dataset.cover ||
            container?.querySelector("img")?.getAttribute("src") ||
            document.getElementById("currentCover")?.getAttribute("src") ||
            "assets/images/Baby_Groot.jpeg";

        return {
            title: title,
            artist: artist,
            audio: audioPath,
            cover: image
        };
    }

    // FIND ALL PLAYABLE SONGS VISIBLE ON THE CURRENT PAGE
    function getPlayableButtons() {

        return Array.from(
            document.querySelectorAll(songButtonSelector)
        ).filter(function (button) {

            const song = getSongInfo(button);

            if (!song) {
                return false;
            }

            if (button.disabled) {
                return false;
            }

            const hiddenContainer = button.closest("[hidden]");

            return !hiddenContainer;
        });
    }

    // FORMAT TIME AS MINUTES:SECONDS
    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return minutes + ":" +
            String(remainingSeconds).padStart(2, "0");
    }

    // UPDATE THE FAVORITE BUTTON
    function updateFavoriteButton() {

        if (!favoriteButton || !currentSong) {
            return;
        }

        const isFavorite = favorites.some(function (item) {
            return item.audio === currentSong.audio;
        });

        favoriteButton.textContent = isFavorite ? "♥" : "♡";
        favoriteButton.classList.toggle("liked", isFavorite);

        favoriteButton.setAttribute(
            "aria-label",
            isFavorite ? "Remove from favorites" : "Add to favorites"
        );
    }

    // PLAY A SONG
    async function playSong(button) {

        const song = getSongInfo(button);

        if (!song || !audioPlayer) {
            return;
        }

        currentQueue = getPlayableButtons();

        currentIndex = currentQueue.indexOf(button);
        currentSong = song;

        if (currentTitle) {
            currentTitle.textContent = song.title;
        }

        if (currentArtist) {
            currentArtist.textContent = song.artist;
        }

        if (currentCover) {
            currentCover.src = song.cover;
            currentCover.alt = song.title + " cover";
        }

        if (progressBar) {
            progressBar.value = 0;
        }

        if (currentTime) {
            currentTime.textContent = "0:00";
        }

        if (duration) {
            duration.textContent = "0:00";
        }

        updateFavoriteButton();

        audioPlayer.src = song.audio;
        audioPlayer.load();

        try {
            await audioPlayer.play();
        } catch (error) {
            if (mainPlayButton) {
                mainPlayButton.textContent = "▶";
            }

            console.error(
                "Unable to play this song. Check its audio path:",
                song.audio,
                error
            );
        }
    }

    // CONNECT ALL SONG BUTTONS
    document.addEventListener("click", function (event) {

        const button = event.target.closest(songButtonSelector);

        if (!button) {
            return;
        }

        if (!getSongInfo(button)) {
            return;
        }

        event.preventDefault();
        playSong(button);
    });

    // MAIN PLAY / PAUSE
    if (mainPlayButton && audioPlayer) {

        mainPlayButton.addEventListener("click", async function () {

            if (!audioPlayer.src || !currentSong) {

                const buttons = getPlayableButtons();

                if (buttons.length > 0) {
                    playSong(buttons[0]);
                }

                return;
            }

            if (audioPlayer.paused) {

                try {
                    await audioPlayer.play();
                } catch (error) {
                    console.error("Playback failed:", error);
                }

            } else {
                audioPlayer.pause();
            }
        });
    }

    // PLAY NEXT SONG
    function playNextSong() {

        const buttons = getPlayableButtons();

        if (buttons.length === 0) {
            return;
        }

        let nextIndex = buttons.findIndex(function (button) {
            return getSongInfo(button)?.audio === currentSong?.audio;
        });

        nextIndex = nextIndex < 0
            ? 0
            : (nextIndex + 1) % buttons.length;

        playSong(buttons[nextIndex]);
    }

    // PLAY PREVIOUS SONG
    function playPreviousSong() {

        const buttons = getPlayableButtons();

        if (buttons.length === 0) {
            return;
        }

        let previousIndex = buttons.findIndex(function (button) {
            return getSongInfo(button)?.audio === currentSong?.audio;
        });

        previousIndex = previousIndex < 0
            ? 0
            : (previousIndex - 1 + buttons.length) % buttons.length;

        playSong(buttons[previousIndex]);
    }

    if (nextButton) {
        nextButton.addEventListener("click", playNextSong);
    }

    if (previousButton) {
        previousButton.addEventListener("click", playPreviousSong);
    }

    // UPDATE PLAY BUTTON
    if (audioPlayer) {

        audioPlayer.addEventListener("play", function () {
            if (mainPlayButton) {
                mainPlayButton.textContent = "Ⅱ";
            }
        });

        audioPlayer.addEventListener("pause", function () {
            if (mainPlayButton) {
                mainPlayButton.textContent = "▶";
            }
        });

        // UPDATE DURATION
        audioPlayer.addEventListener("loadedmetadata", function () {

            if (duration) {
                duration.textContent = formatTime(audioPlayer.duration);
            }
        });

        // UPDATE PLAYBACK PROGRESS
        audioPlayer.addEventListener("timeupdate", function () {

            if (currentTime) {
                currentTime.textContent =
                    formatTime(audioPlayer.currentTime);
            }

            if (progressBar && audioPlayer.duration) {
                progressBar.value =
                    (audioPlayer.currentTime / audioPlayer.duration) * 100;
            }
        });

        // AUTOMATICALLY PLAY NEXT SONG
        audioPlayer.addEventListener("ended", playNextSong);

        // RESTORE VOLUME
        if (volumeBar) {
            audioPlayer.volume = Number(volumeBar.value);

            volumeBar.addEventListener("input", function () {
                audioPlayer.volume = Number(volumeBar.value);
            });
        }

        // SEEK THROUGH A SONG
        if (progressBar) {
            progressBar.addEventListener("input", function () {

                if (audioPlayer.duration) {
                    audioPlayer.currentTime =
                        (Number(progressBar.value) / 100) *
                        audioPlayer.duration;
                }
            });
        }
    }

    // ADD / REMOVE FAVORITES
    if (favoriteButton) {

        favoriteButton.addEventListener("click", function () {

            if (!currentSong) {
                return;
            }

            const index = favorites.findIndex(function (item) {
                return item.audio === currentSong.audio;
            });

            if (index >= 0) {
                favorites.splice(index, 1);
            } else {
                favorites.push({
                    title: currentSong.title,
                    artist: currentSong.artist,
                    audio: currentSong.audio,
                    cover: currentSong.cover
                });
            }

            try {
                localStorage.setItem(
                    "vibelyFavorites",
                    JSON.stringify(favorites)
                );
            } catch (error) {
                console.error("Could not save favorites:", error);
            }

            updateFavoriteButton();
        });
    }

    // SEARCH AND CATEGORY FILTERING
    function applyFilters() {

        const searchableItems = document.querySelectorAll(
            ".song-card, .artist-card, .album-card, " +
            ".album-track-row, .artist-song-row"
        );

        let visibleCount = 0;

        searchableItems.forEach(function (item) {

            const text = (
                item.textContent + " " +
                (item.dataset.search || "") + " " +
                (item.dataset.category || "")
            ).toLowerCase();

            const matchesSearch =
                !searchQuery || text.includes(searchQuery);

            const itemCategory = item.dataset.category || "all";

            const matchesCategory =
                activeCategory === "all" ||
                itemCategory.split(",").map(function (value) {
                    return value.trim();
                }).includes(activeCategory);

            const visible = matchesSearch && matchesCategory;

            item.hidden = !visible;

            if (visible) {
                visibleCount++;
            }
        });

        const noResults = document.getElementById("noResults");

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    }

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    if (searchForm && searchInput) {

        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            searchQuery = searchInput.value.trim().toLowerCase();
            applyFilters();
        });

        searchInput.addEventListener("input", function () {
            searchQuery = searchInput.value.trim().toLowerCase();
            applyFilters();
        });
    }

    // CATEGORY BUTTONS
    document.querySelectorAll("[data-category-filter]")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                activeCategory = button.dataset.categoryFilter || "all";

                document.querySelectorAll("[data-category-filter]")
                    .forEach(function (item) {
                        item.classList.toggle("active", item === button);
                    });

                applyFilters();
            });
        });

});
