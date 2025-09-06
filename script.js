    // --- AUDIO ---
    let ambient, godsVoice;
    function initAudio() {
      ambient = new Howl({
        src: ["assets/audio/mystical-temple-audio.mp3"],
        loop: true,
        volume: 0.5,
        onloaderror: (id, err) => console.warn("Ambient load error", err)
      });
      godsVoice = new Howl({
        src: ["assets/audio/gods-voice.mp3"],
        volume: 1.0,
        onloaderror: (id, err) => console.warn("Gods voice load error", err)
      });
    }

    // --- STORY DATA (now in story.js) ---

    // DOM refs
    const startScreen = document.getElementById('startScreen');
    const startBtn = document.getElementById('startBtn');
    const game = document.getElementById('game');
    const bgImage = document.getElementById('bgImage');
    const mainCharacter = document.getElementById('mainCharacter');
    const wakeUpTop = document.getElementById('wakeUpTop');
    const wakeUpBottom = document.getElementById('wakeUpBottom');
    const dialogueBox = document.getElementById('dialogueBox');
    const dialogueText = document.getElementById('dialogueText');
    const choicesBox = document.getElementById('choices');

    let currentScene = story.act1.scene1;

    // simple typewriter (no sync)
    function typeWriter(text, el, speed = 35, cb) {
      el.textContent = "";
      let i = 0;
      function tick() {
        if (i < text.length) {
          el.textContent += text.charAt(i++);
          setTimeout(tick, speed);
        } else if (cb) cb();
      }
      tick();
    }

    // typewriter synced with Howler audio duration (safe fallback if audio not loaded)
    function typeWriterSync(text, el, audioHowl, cb) {
      el.textContent = "";
      let i = 0;

      function startWithDuration(durSec) {
        const durationMs = Math.max(durSec * 1000, 700); // min duration
        const speed = durationMs / Math.max(text.length, 1);
        audioHowl.play();
        function tick() {
          if (i < text.length) {
            el.textContent += text.charAt(i++);
            setTimeout(tick, speed);
          } else if (cb) cb();
        }
        tick();
      }

      // If audio duration available, use it; else wait for load or fallback
      const dur = (audioHowl && typeof audioHowl.duration === 'function') ? audioHowl.duration() : 0;
      if (dur && dur > 0) {
        startWithDuration(dur);
      } else {
        // wait briefly for load event
        if (audioHowl && typeof audioHowl.once === 'function') {
          audioHowl.once('load', () => startWithDuration(audioHowl.duration()));
        }
        // fallback if load doesn't happen
        setTimeout(() => {
          if (i === 0) typeWriter(text, el, 45, cb);
        }, 2000);
      }
    }

    // Opening sequence (handles eyelids, blur clear, hero fade-in + drift, then dialogue)
    function playOpeningSequence(scene) {
      // ensure eyelids visible
      wakeUpTop.style.display = 'block';
      wakeUpBottom.style.display = 'block';
      wakeUpTop.classList.remove('open');
      wakeUpBottom.classList.remove('open');

      // small delay then open eyelids
      setTimeout(() => {
        wakeUpTop.classList.add('open');
        wakeUpBottom.classList.add('open');
      }, 300);

      // when eyelids have opened (after transition), remove them and clear blur
      setTimeout(() => {
        // clear blur to focus background
        bgImage.classList.add('focused');
        // remove eyelids from DOM/flow so they won't block clicks or show vignette
        wakeUpTop.style.display = 'none';
        wakeUpBottom.style.display = 'none';
      }, 1400); // matches the CSS transition timing (1s) + small buffer

      // hero fades in shortly after eyelids start opening
      setTimeout(() => mainCharacter.classList.add('visible'), 1400);

      // pause center, then drift left
      setTimeout(() => {
        mainCharacter.classList.add('drift-left');
      }, 2900); // ~1.5s pause in center

      // after drift completes, show dialogue (timings tuned)
      setTimeout(() => {
        showDialogueForScene(scene);
      }, 4200); // allow drift (approx 1.1s) to finish
    }

    // show dialogue (intro text then narration + choices)
    function showDialogueForScene(scene) {
      dialogueBox.classList.remove('hidden');
      dialogueText.textContent = "";
      choicesBox.innerHTML = "";

      // first quick intro text (scene.text)
      typeWriter(scene.text, dialogueText, 36, () => {
        // small pause then play synced narration
        setTimeout(() => {
          typeWriterSync(scene.narration, dialogueText, godsVoice, () => {
            // show choices
            scene.choices.forEach((choice, idx) => {
              const btn = document.createElement('button');
              btn.className = 'choice-btn';
              btn.textContent = choice.text;
              btn.onclick = () => transitionToScene(choice.next);
              choicesBox.appendChild(btn);
              setTimeout(() => btn.classList.add('show'), idx * 260);
            });
          });
        }, 500);
      });
    }

    // Transition to next scene (fade out/in)
    function transitionToScene(nextKey) {
      const scene = story.act1[nextKey];
      if (!scene) {
        console.warn("No scene for key:", nextKey);
        return;
      }

      // fade out current UI
      dialogueBox.classList.add('fade-out');
      mainCharacter.classList.add('fade-out');
      bgImage.classList.add('fade-out');

      // small delay to let fade finish, then swap background and reset UI
      setTimeout(() => {
        // reset dialogue and choices
        dialogueText.textContent = "";
        choicesBox.innerHTML = "";
        dialogueBox.classList.add('hidden');
        dialogueBox.classList.remove('fade-out'); // <-- Fix: remove fade-out class

        // swap background
        bgImage.src = scene.background;
        // ensure bg visible after load
        bgImage.onload = () => {
          bgImage.classList.remove('fade-out');
          bgImage.classList.add('fade-in');
          // ensure focused (no blur) once background shown
          setTimeout(() => bgImage.classList.add('focused'), 250);
        };

        // bring character back (keeps left position)
        mainCharacter.classList.remove('fade-out');
        mainCharacter.classList.add('visible', 'drift-left');

        // small delay then display dialogue + narration
        setTimeout(() => {
          showDialogueForScene(scene);
        }, 900);
      }, 700);
    }

    // initial entrypoint when start clicked
    startBtn.addEventListener('click', () => {
      startScreen.classList.add('hidden');
      game.classList.remove('hidden');

      initAudio();
      // safe to play ambient now (user gesture)
      ambient.play();

      // play opening sequence for scene1
      playOpeningSequence(currentScene);
    }, { once: true });