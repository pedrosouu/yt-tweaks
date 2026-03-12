ytTweaks.tweaks.push(function (settings) {
	let player, video;

	function getPlayerAndVideo() {
		if (!player?.clientWidth || !video?.clientWidth) {
			for (const el of document.querySelectorAll('video')) {
				if (el.clientWidth) {
					video = el;
					player = el.parentElement.parentElement;
					break;
				}
			}
		}
	}

	const showFeedback = (function () {
		let osd, timeoutId;

		return function (strg, icon, timeoutTime) {
			if (!osd) {
				osd = document.createElement('div');
				osd.id = 'yttw-feedback';
				const style = document.createElement('style');
				document.documentElement.appendChild(style);

				style.textContent = `
				#yttw-feedback {
				  pointer-events: none;
				  color: rgb(255, 255, 255);
				  font-size: 155%;
				  position: absolute;
				  display: flex;
				  box-sizing: border-box;
				  align-items: center;
				  gap: 6px;
				  height: 40px;
				  top: 10%;
				  left: 50%;
				  transform: translateX(-50%);
				  transform-origin: 0 50% 0;
				  scale: 0.75;
				  opacity: 0;
				  z-index: 999;
				  background: rgba(0, 0, 0, 0.7);
				  border-radius: 20px;
				  padding: 10px 16px;
				  transition: scale .15s cubic-bezier(0.25, 0, 0.25, 1.75), opacity .15s;
				}
	
				#yttw-feedback.show {
				  scale: 1;
				  opacity: 1;
				}
		  
				#yttw-feedback.showIcon:before {
				  content: "";
				  height: 24px;
				  width: 24px;
				  background-image: var(--icon);
				  background-repeat: no-repeat no-repeat;
				  background-position: center center;
				  background-size: cover;
				}`;
			}

			osd.textContent = strg;

			if (icon) {
				osd.style.setProperty('--icon', `url("${icon}")`);
				osd.classList.add('showIcon');
			} else {
				osd.classList.remove('showIcon');
			}

			if (osd.parentElement != player) {
				player.appendChild(osd);
				osd.clientWidth;
			}

			osd.classList.add('show');

			clearTimeout(timeoutId);

			timeoutId = setTimeout(function () {
				osd.classList.remove('show');
			}, timeoutTime || 1000);
		}
	})();

	function formatSecToDDHHMMSS(totalSecLeft) {
		let daysLeft, hoursLeft, minLeft, secLeft;

		daysLeft = Math.floor(totalSecLeft / 86400);
		hoursLeft = Math.floor((totalSecLeft - (daysLeft * 86400)) / 3600);
		minLeft = Math.floor((totalSecLeft - (daysLeft * 86400) - (hoursLeft * 3600)) / 60);
		secLeft = Math.floor(totalSecLeft - (daysLeft * 86400) - (hoursLeft * 3600) - (minLeft * 60));

		return (
			daysLeft ?
				daysLeft + (hoursLeft < 10 ? ':0' + hoursLeft : ':' + hoursLeft) + (minLeft < 10 ? ':0' + minLeft : ':' + minLeft) + (secLeft < 10 ? ':0' + secLeft : ':' + secLeft) :
				hoursLeft ?
					hoursLeft + (minLeft < 10 ? ':0' + minLeft : ':' + minLeft) + (secLeft < 10 ? ':0' + secLeft : ':' + secLeft) :
					minLeft + (secLeft < 10 ? ':0' + secLeft : ':' + secLeft)
		);
	}

	function overwriteStorageSetItem() {
		overwriteStorageSetItem = ytTweaks.noop;

		const store = Storage.prototype.setItem;

		Storage.prototype.setItem = function () {
			ytTweaks.videoQuality?.handleManuallySetQuality(arguments);
			ytTweaks.videoSpeed?.handleManuallySetSpeed(arguments);
			ytTweaks.perChannelVideoSpeed?.handleManuallySetSpeed(arguments);

			store.apply(this, arguments);
		}
	}

	ytTweaks.playerButtons = [];
	function addButtonToPlayer() {
		if (!ytTweaks.playerButtons.length) document.addEventListener('loadstart', function handler() {
			if ((ytTweaks.mainPlayer || (ytTweaks.mainPlayer = document.getElementById('movie_player')))) {
				document.removeEventListener('loadstart', handler, true);
				ytTweaks.mainPlayer.querySelector('.ytp-right-controls').prepend(...ytTweaks.playerButtons);
			}
		}, true);

		ytTweaks.playerButtons.push(...arguments);
	}

	if (settings.videoQuality) {
		const qualities = {
			tiny: 0,
			small: 1,
			medium: 2,
			large: 3,
			hd720: 4,
			hd1080: 5,
			hd1440: 6,
			hd2160: 7,
			highres: 8
		}

		const qualities2 = {
			0: 'auto',
			144: 'tiny',
			240: 'small',
			360: 'medium',
			480: 'large',
			720: 'hd720',
			1080: 'hd1080',
			1440: 'hd1440',
			2160: 'hd2160',
			4320: 'highres'
		}

		const qualitiesArray = Object.keys(qualities);

		let availableQualities, preferredQuality;
		const fallback = settings.vqFallback;

		try {
			preferredQuality = sessionStorage.getItem('yttwVideoQuality');
			overwriteStorageSetItem();
		} catch { }

		if (!preferredQuality) preferredQuality = settings.videoQuality;

		document.addEventListener('loadstart', setQuality, true);

		function setQuality(e) {
			player = e.target.parentElement.parentElement;
			if (!player.className.includes('unstarted-mode')) return;

			availableQualities = player.getAvailableQualityLevels();

			if (availableQualities.includes(preferredQuality)) {
				player.setPlaybackQualityRange(preferredQuality);
			}

			else if (qualities[preferredQuality] > qualities[availableQualities[0]]) {
				player.setPlaybackQualityRange(availableQualities[0]);
			}

			else if (qualities[preferredQuality] < qualities[availableQualities[availableQualities.length - 2]]) {
				player.setPlaybackQualityRange(availableQualities[availableQualities.length - 2]);
			}

			else {
				if (fallback == 'highest') {
					for (let i = qualities[preferredQuality] + 1; i >= 0; i++) {
						if (availableQualities.includes(qualitiesArray[i])) {
							player.setPlaybackQualityRange(qualitiesArray[i]);
							break;
						}
					}
				} else {
					for (let i = qualities[preferredQuality] - 1; i >= 0; i--) {
						if (availableQualities.includes(qualitiesArray[i])) {
							player.setPlaybackQualityRange(qualitiesArray[i]);
							break;
						}
					}
				}
			}
		}

		ytTweaks.videoQuality = {
			storageChanged: function () {
				document.removeEventListener('loadstart', setQuality, true);
				delete ytTweaks.videoQuality;
			},
			handleManuallySetQuality: function (arg) {
				if (arg[0] == 'yt-player-quality') {
					preferredQuality = qualities2[JSON.parse(JSON.parse(arg[1]).data).quality];
					sessionStorage.setItem('yttwVideoQuality', preferredQuality);
				}
			}
		};
	}

	if (settings.videoSpeed && !settings.perChannelVideoSpeed) {
		document.addEventListener('loadstart', setSpeed, true);

		let preferredSpeed;

		try {
			preferredSpeed = +sessionStorage.getItem('yttwGlobalSpeed');
			overwriteStorageSetItem();
		} catch { }

		if (!preferredSpeed) preferredSpeed = settings.vsSpeed ?? 1.5;

		function setSpeed(e) {
			player = e.target.parentElement.parentElement;
			if (player.className.includes('ad-showing') || !player.className.includes('unstarted-mode')) return;

			player.setPlaybackRate(preferredSpeed);
			e.target.playbackRate = preferredSpeed;
		}

		ytTweaks.videoSpeed = {
			storageChanged: function () {
				document.removeEventListener('loadstart', setSpeed, true);
				delete ytTweaks.videoSpeed;
			},

			handleManuallySetSpeed: function (arg) {
				if (arg[0] == 'yt-player-playback-rate') {
					preferredSpeed = +JSON.parse(arg[1]).data;
					sessionStorage.setItem('yttwGlobalSpeed', preferredSpeed);
				}
			}
		};
	}

	else if (settings.perChannelVideoSpeed) {
		let author, setSpeed, lastSpeedSet, globalSpeed, speeds;

		try {
			globalSpeed = +sessionStorage.getItem('yttwGlobalSpeed');
			overwriteStorageSetItem();
			setSpeed = function (e) {
				video = e.target;
				player = video.parentElement.parentElement;
				author = navigator.mediaSession.metadata.artist;

				if (player.className.includes('ad-showing') || !player.className.includes('unstarted-mode')) return;

				if (speeds[author]) {
					player.setPlaybackRate(speeds[author]);
					video.playbackRate = speeds[author];
				}

				else if (video.playbackRate != globalSpeed) {
					player.setPlaybackRate(globalSpeed);
					video.playbackRate = globalSpeed;
				}
			}
		}
		// User has the storage API disabled //
		catch {
			setSpeed = function (e) {
				video = e.target;
				player = e.target.parentElement.parentElement;
				author = navigator.mediaSession.metadata.artist;

				if (player.className.includes('ad-showing') || !player.className.includes('unstarted-mode')) return;

				if (speeds[author]) {
					player.setPlaybackRate(speeds[author]);
					lastSpeedSet = player.getPlaybackRate();
					e.target.playbackRate = speeds[author];
				}

				else if (settings.videoSpeed) {
					player.setPlaybackRate(globalSpeed);
					e.target.playbackRate = globalSpeed;
				}

				else if (e.target.playbackRate == lastSpeedSet) {
					player.setPlaybackRate(1);
				}
			}
		}

		if (!globalSpeed) globalSpeed = settings.videoSpeed ? settings.vsSpeed ?? 1.5 : 1;
		speeds = settings.perChannelSpeeds || {};

		document.addEventListener('loadstart', setSpeed, true);

		const showButton = settings.channelSpeedButton != false;

		const img = document.createElement('img');
		img.style = 'display: block; margin: auto; height: 60%';
		img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M12 1c1.44 0 2.87.28 4.21.83a11 11 0 0 1 3.45 2.27l-1.81 1.05A9 9 0 0 0 3 12a9 9 0 0 0 18-.00l-.01-.44a8.99 8.99 0 0 0-.14-1.20l1.81-1.05A11.00 11.00 0 0 1 10.51 22.9 11 11 0 0 1 12 1Zm7.08 6.25-7.96 3.25a1.74 1.74 0 1 0 1.73 2.99l6.8-5.26a.57.57 0 0 0-.56-.98Z'/%3E%3C/svg%3E";

		const speedButton = document.createElement('button');
		speedButton.addEventListener('click', handleSpeedSetting);
		speedButton.classList.add('ytp-button');
		speedButton.style = 'vertical-align: top';
		speedButton.appendChild(img);
		if (showButton) addButtonToPlayer(speedButton);

		function handleSpeedSetting(e) {
			let speed = +prompt(author, speeds[author] || '')?.replace(',', '.');
			if (isNaN(speed)) return;
			if (speed) {
				player.setPlaybackRate(speed);
				video.playbackRate = speed;
				speeds[author] = speed;
			} else {
				player.setPlaybackRate(globalSpeed);
				video.playbackRate = globalSpeed;
				delete speeds[author];
			}

			document.dispatchEvent(new CustomEvent('yttwSaveSetting', {
				detail: {
					perChannelSpeeds: speeds
				}
			}));
		}

		if (settings.setChannelSpeedHotkey) {
			ytTweaks.listenForHotkeys();
			ytTweaks.getHotkeys()[settings.setChannelSpeedHotkey] = handleSpeedSetting;
		}

		ytTweaks.perChannelVideoSpeed = {
			storageChanged: function () {
				document.removeEventListener('loadstart', setSpeed, true);
				speedButton.removeEventListener('click', handleSpeedSetting);
				speedButton.remove();
				delete ytTweaks.perChannelVideoSpeed;
			},
			handleManuallySetSpeed: function (arg) {
				if (arg[0] == 'yt-player-playback-rate') {
					globalSpeed = +JSON.parse(arg[1]).data;
					sessionStorage.setItem('yttwGlobalSpeed', globalSpeed);
				}
			}
		};
	}

	if (settings.changeSpeedOnScroll || settings.changeVolOnScroll || settings.seekOnScroll) {
		ytTweaks.sheet.textContent += `
		.blockHoldFor2x .ytp-speedmaster-overlay {
		  display: none;
		}
	
		.blockHoldFor2x .ytp-chrome-bottom {
		  display: block !important;
		}`;

		let preventDefault;

		const changeSpeedOnScroll = settings.changeSpeedOnScroll;
		const changeVolOnScroll = settings.changeVolOnScroll;
		const seekOnScroll = settings.seekOnScroll;

		const normalSpeed = settings.videoSpeed ? settings.vsSpeed ?? 1.5 : 1;

		const speedChange = settings.speedChangePerScroll ?? 0.05;
		const changeSpeedModifier = settings.changeSpeedOnScrollModifier;
		const resetSpeedAction = settings.resetSpeedOnPlayerClick;
		const resetSpeedModifier = settings.resetSpeedOnPlayerClickModifier;

		const volChange = settings.volChangePerScroll ?? 5;
		const changeVolModifier = settings.changeVolOnScrollModifier;
		const toggleMuteAction = settings.toggleMuteOnPlayerClick;
		const toggleMuteModifier = settings.toggleMuteOnPlayerClickModifier;

		const seekFtime = settings.seekOnScrollFtime ?? 5;
		const seekBtime = settings.seekOnScrollBtime ?? 5;
		const seekModifier = settings.seekOnScrollModifier;

		document.addEventListener('loadstart', main, true);

		function main(e) {
			player = e.target.parentElement.parentElement;
			if (player.id == 'inline-preview-player') return;
			player.video = e.target;

			if (player.handleWheel == handleWheel) return;
			player.handleWheel = handleWheel;
			HTMLElement.prototype.addEventListener.call(player, 'wheel', handleWheel, true);
			HTMLElement.prototype.addEventListener.call(player, 'click', handlePlayerClick, true);
			HTMLElement.prototype.addEventListener.call(player, 'contextmenu', handleCtxMenu, true);
			HTMLElement.prototype.addEventListener.call(player, 'mousedown', handleMmbPress, true);
			HTMLElement.prototype.addEventListener.call(player, 'mouseup', handleMmbRelease, true);
		}

		let ctxMenuEvent;
		function handleCtxMenu(e) {
			if (!e.isTrusted) return;
			// Windows
			if (e.buttons != 2 && e.buttons != 3) handlePlayerClick(e);
			// Linux
			else {
				if (document.body.lastElementChild.matches('.ytp-contextmenu') && document.body.lastElementChild.clientWidth) return;
				if (e.currentTarget.lastElementChild.matches('.ytp-contextmenu') && e.currentTarget.lastElementChild.clientWidth) return;

				e.preventDefault();
				e.stopImmediatePropagation();

				Object.defineProperty(e, 'currentTarget', { value: e.currentTarget });
				Object.defineProperty(e, 'buttons', { value: e.buttons - 2 });
				ctxMenuEvent = e;
			}
		}

		function runFunction(e, func, modifier, clickAction) {
			if (!modifier) {
				if (e.target.parentElement != e.currentTarget && e.target != e.currentTarget.video && e.target != e.currentTarget) return;
				if (e.target.tagName == 'BUTTON') return;
				if (e.altKey || e.shiftKey || e.ctrlKey || e.buttons) return;
			}

			else {
				if (e[modifier] == false) return;
				if (modifier == 1 && e.buttons != 1) return;
				if (modifier == 2 && e.buttons != 2) return;
				if (modifier == e.buttons) preventDefault = true;
			}

			if (clickAction) {
				if (clickAction == 'middleClick') {
					if (e.type != 'mouseup') return;
				}

				else if (clickAction == 'rightClick') {
					if (e.type != 'contextmenu') return;
				}

				else if (e.type != 'click') return;
			}

			func(e);
		}

		const ogDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'playbackRate');
		let currSpeed, holdFor2xBlocked;

		Object.defineProperty(HTMLVideoElement.prototype, 'playbackRate', {
			set: function (value) {
				if (holdFor2xBlocked) return;
				ogDescriptor.set.call(this, value);
			},
			get: ogDescriptor.get,
			configurable: true
		});

		function blockHoldFor2x(e) {
			if (!holdFor2xBlocked && e.buttons == 1) {
				holdFor2xBlocked = true;
				e.currentTarget.classList.add('blockHoldFor2x');
				ogDescriptor.set.call(e.currentTarget.video, currSpeed);
				const currTarget = e.currentTarget;
				addEventListener('mouseup', function () {
					if (holdFor2xBlocked) {
						currTarget.setPlaybackRate(currTarget.video.playbackRate);
						currTarget.classList.remove('blockHoldFor2x');
						holdFor2xBlocked = false;
					}
				}, { once: true });
			}
		}

		function handleSpeedChange(e) {
			blockHoldFor2x(e);

			let newSpeed;

			if (e.deltaY < 0 || e.deltaX > 0) {
				newSpeed = Math.round((e.currentTarget.video.playbackRate + speedChange) * 100) / 100;
			} else {
				newSpeed = Math.round((e.currentTarget.video.playbackRate - speedChange) * 100) / 100;
			}

			// Touchpad scroll = small deltaX/deltaY
			if (Math.abs(e.deltaX) <= 5 && Math.abs(e.deltaY) <= 5) {
				setSpeedThrottle(e, newSpeed);
			}

			else setSpeed(e, newSpeed);
		}

		function handleVolChange(e) {
			blockHoldFor2x(e);

			let newVolume;

			if (e.deltaY < 0 || e.deltaX > 0) {
				newVolume = e.currentTarget.getVolume() + volChange;
			} else {
				newVolume = e.currentTarget.getVolume() - volChange;
			}

			if (Math.abs(e.deltaX) <= 5 && Math.abs(e.deltaY) <= 5) {
				setVolumeThrottle(e, newVolume);
			}

			else setVolume(e, newVolume);
		}

		function handleVideoTimeChange(e) {
			blockHoldFor2x(e);

			let newTime;

			if (e.deltaY < 0 || e.deltaX > 0) {
				newTime = e.currentTarget.video.currentTime + (seekBtime < 0 ? seekBtime : seekFtime) * e.currentTarget.video.playbackRate;
			} else {
				newTime = e.currentTarget.video.currentTime - (seekFtime < 0 ? seekFtime : seekBtime) * e.currentTarget.video.playbackRate;
			}

			if (Math.abs(e.deltaX) <= 5 && Math.abs(e.deltaY) <= 5) {
				seekToThrottle(e, newTime);
			}

			else seekTo(e, newTime);
		}

		function handleWheel(e) {
			if (changeSpeedOnScroll) {
				runFunction(e, handleSpeedChange, changeSpeedModifier);
			}

			if (changeVolOnScroll) {
				runFunction(e, handleVolChange, changeVolModifier);
			}

			if (seekOnScroll) {
				runFunction(e, handleVideoTimeChange, seekModifier);
			}
		}

		function handlePlayerClick(e) {
			if (preventDefault) {
				e.stopImmediatePropagation();
				e.preventDefault();
				preventDefault = false;
			}

			if (changeSpeedOnScroll && resetSpeedAction) {
				runFunction(e, setSpeed, resetSpeedModifier, resetSpeedAction);
			}

			if (changeVolOnScroll && toggleMuteAction) {
				runFunction(e, toggleMute, toggleMuteModifier, toggleMuteAction);
			}
		}

		function handleMmbPress(e) {
			if (e.button == 0) currSpeed = e.currentTarget.video.playbackRate;
			else if (e.button == 1) {
				if (changeSpeedOnScroll && resetSpeedAction == 'middleClick') {
					preventDefault(resetSpeedModifier, resetSpeedAction);
				}

				if (changeVolOnScroll && toggleMuteAction == 'middleClick') {
					preventDefault(toggleMuteModifier, toggleMuteAction);
				}

				function preventDefault(modifier) {
					if (modifier == 2 && e.buttons != 6) return;
					if (modifier == 1 && e.buttons != 5) return;
					if (modifier && e[modifier] == false) return;

					e.preventDefault();
				}
			}
		}

		function handleMmbRelease(e) {
			if (preventDefault && e.button + e.buttons == 0) {
				setTimeout(function () {
					preventDefault = false;
				}, 0);
			}

			else if (e.button == 1) handlePlayerClick(e);

			else if (e.button == 2 && ctxMenuEvent) {
				handlePlayerClick(ctxMenuEvent);
				ctxMenuEvent.currentTarget.dispatchEvent(ctxMenuEvent);
				ctxMenuEvent = 0;
			}
		}

		function setSpeed(e, speed) {
			e.stopImmediatePropagation();
			e.preventDefault();
			blockHoldFor2x(e);

			speed = speed ?? normalSpeed;
			e.currentTarget.setPlaybackRate(speed);
			ogDescriptor.set.call(e.currentTarget.video, speed);

			showFeedback(speed + 'x');

			try {
				sessionStorage.setItem('yt-player-playback-rate', JSON.stringify({
					data: speed + '',
					creation: Date.now()
				}))
			} catch { }
		}

		const muteIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24' fill='%23fff'%3E%3Cpath d='M11.60 2.08L11.48 2.14L3.91 6.68C3.02 7.21 2.28 7.97 1.77 8.87C1.26 9.77 1.00 10.79 1 11.83V12.16L1.01 12.56C1.07 13.52 1.37 14.46 1.87 15.29C2.38 16.12 3.08 16.81 3.91 17.31L11.48 21.85C11.63 21.94 11.80 21.99 11.98 21.99C12.16 22.00 12.33 21.95 12.49 21.87C12.64 21.78 12.77 21.65 12.86 21.50C12.95 21.35 13 21.17 13 21V3C12.99 2.83 12.95 2.67 12.87 2.52C12.80 2.37 12.68 2.25 12.54 2.16C12.41 2.07 12.25 2.01 12.08 2.00C11.92 1.98 11.75 2.01 11.60 2.08ZM4.94 8.4V8.40L11 4.76V19.23L4.94 15.6C4.38 15.26 3.92 14.80 3.58 14.25C3.24 13.70 3.05 13.07 3.00 12.43L3 12.17V11.83C2.99 11.14 3.17 10.46 3.51 9.86C3.85 9.25 4.34 8.75 4.94 8.4ZM21.29 8.29L19 10.58L16.70 8.29L16.63 8.22C16.43 8.07 16.19 7.99 15.95 8.00C15.70 8.01 15.47 8.12 15.29 8.29C15.12 8.47 15.01 8.70 15.00 8.95C14.99 9.19 15.07 9.43 15.22 9.63L15.29 9.70L17.58 12L15.29 14.29C15.19 14.38 15.12 14.49 15.06 14.61C15.01 14.73 14.98 14.87 14.98 15.00C14.98 15.13 15.01 15.26 15.06 15.39C15.11 15.51 15.18 15.62 15.28 15.71C15.37 15.81 15.48 15.88 15.60 15.93C15.73 15.98 15.86 16.01 15.99 16.01C16.12 16.01 16.26 15.98 16.38 15.93C16.50 15.87 16.61 15.80 16.70 15.70L19 13.41L21.29 15.70L21.36 15.77C21.56 15.93 21.80 16.01 22.05 15.99C22.29 15.98 22.53 15.88 22.70 15.70C22.88 15.53 22.98 15.29 22.99 15.05C23.00 14.80 22.93 14.56 22.77 14.36L22.70 14.29L20.41 12L22.70 9.70C22.80 9.61 22.87 9.50 22.93 9.38C22.98 9.26 23.01 9.12 23.01 8.99C23.01 8.86 22.98 8.73 22.93 8.60C22.88 8.48 22.81 8.37 22.71 8.28C22.62 8.18 22.51 8.11 22.39 8.06C22.26 8.01 22.13 7.98 22.00 7.98C21.87 7.98 21.73 8.01 21.61 8.06C21.49 8.12 21.38 8.19 21.29 8.29Z'%3E%3C/path%3E%3C/svg%3E";
		function setVolume(e, vol) {
			e.stopImmediatePropagation();
			e.preventDefault();

			if (vol < 0) vol = 0;
			else if (vol > 100) vol = 100;

			e.currentTarget.setVolume(vol);
			showFeedback(vol, e.currentTarget.video.muted ? muteIcon : '');
			storeVolume(e);
		}

		function toggleMute(e) {
			e.stopImmediatePropagation();
			e.preventDefault();
			blockHoldFor2x(e);

			if (e.currentTarget.video.muted) {
				e.currentTarget.unMute();
				showFeedback(e.currentTarget.getVolume());
			} else {
				e.currentTarget.mute();
				showFeedback('', muteIcon);
			}

			storeVolume(e);
		}

		function storeVolume(e) {
			try {
				localStorage.setItem('yt-player-volume', JSON.stringify({
					data: `{\"volume\":${e.currentTarget.getVolume()},\"muted\":${e.currentTarget.video.muted}}`,
					expiration: Date.now() + 2592E3 * 1E3,
					creation: Date.now()
				}))
				sessionStorage.setItem('yt-player-volume', JSON.stringify({
					data: `{\"volume\":${e.currentTarget.getVolume()},\"muted\":${e.currentTarget.video.muted}}`,
					creation: Date.now()
				}))
			} catch { }
		}

		const seekTo = function () {
			let seekedForward;
			let amountSeeked = 0;
			let timeoutId;

			return function (e, time) {
				e.stopImmediatePropagation();
				e.preventDefault();
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function () {
					amountSeeked = 0;
				}, 1000);

				if ((seekedForward && time - e.currentTarget.video.currentTime < 0 || !seekedForward && time - e.currentTarget.video.currentTime > 0) || (e.currentTarget.video.currentTime < 1 || e.currentTarget.video.currentTime == e.currentTarget.video.duration)) {
					amountSeeked = 0;
				}

				seekedForward = time - e.currentTarget.video.currentTime > 0;
				amountSeeked = amountSeeked + Math.round(time - e.currentTarget.video.currentTime);
				e.currentTarget.video.currentTime = time;
				e.currentTarget.wakeUpControls();
				showFeedback((seekedForward ? '+' : '-') + formatSecToDDHHMMSS(Math.abs(amountSeeked)));
			}
		}();

		let throttleWait = 200;
		let setSpeedThrottle = throttle(setSpeed);
		let setVolumeThrottle = throttle(setVolume);
		let seekToThrottle = throttle(seekTo);

		function throttle(func) {
			let isWaiting;

			return function (e, data) {
				e.stopImmediatePropagation();
				e.preventDefault();

				if (!isWaiting) {
					func(e, data);

					isWaiting = true
					setTimeout(function () {
						isWaiting = false
					}, throttleWait);
				}
			}
		}

		ytTweaks.changeSpeedOnScroll = {
			storageChanged: function () {
				document.removeEventListener('loadstart', main, true);
				for (const video of document.querySelectorAll('video')) {
					HTMLElement.prototype.removeEventListener.call(video.parentElement.parentElement, 'wheel', handleWheel, true);
					HTMLElement.prototype.removeEventListener.call(video.parentElement.parentElement, 'click', handlePlayerClick, true);
					HTMLElement.prototype.removeEventListener.call(video.parentElement.parentElement, 'contextmenu', handleCtxMenu, true);
					HTMLElement.prototype.removeEventListener.call(video.parentElement.parentElement, 'mousedown', handleMmbPress, true);
					HTMLElement.prototype.removeEventListener.call(video.parentElement.parentElement, 'mouseup', handleMmbRelease, true);
				}
			}
		};
	}

	if (settings.videoFocus) {
		let timeoutId;

		ytTweaks.sheet.textContent += `
		.yttw-video-focus {
		  scrollbar-width: none;
		}
	
		.yttw-video-focus :is(#movie_player, ytd-miniplayer, #player.skeleton) {
		  z-index: 2050 !important;
		}
	
		.yttw-video-focus ytd-live-chat-frame:not([collapsed]) {
		  position: relative;
		  z-index: 2050 !important;
		}
	
		/* Z-index is not applied to descendants of an element with a 'view-transition-name' set to a non-none value */
		.ytd-watch-flexy {
		  view-transition-name: none !important;
		}
		`;

		const backdrop = document.createElement('div');
		document.documentElement.appendChild(backdrop);
		backdrop.addEventListener('mouseenter', hideBackdrop);
		backdrop.style = `
		  position: fixed;
		  inset: 0;
		  opacity: 0;
		  visibility: hidden;
		  z-index: 2049;
		  background: rgb(0, 0, 0, ${settings.vfOpacity ?? 0.9});
		  transition: opacity .25s ease-in, visibility .25s;
		  backdrop-filter: blur(${settings.vfBlur ?? 0}px);
		`;

		document.addEventListener('loadstart', main, true);

		function main() {
			if ((ytTweaks.mainPlayer || (ytTweaks.mainPlayer = document.getElementById('movie_player')))) {
				document.removeEventListener('loadstart', main, true);

				if (ytTweaks.mainPlayer.matches(':hover')) { showBackdrop(); };
				HTMLElement.prototype.addEventListener.call(ytTweaks.mainPlayer, 'mouseenter', showBackdrop);
			}
		}

		function hideBackdrop() {
			timeoutId = setTimeout(function () {
				document.documentElement.classList.remove('yttw-video-focus');
			}, 250);
			backdrop.style.opacity = '0';
			backdrop.style.visibility = 'hidden';
		}

		function showBackdrop() {
			if (document.fullscreenElement) return;
			clearTimeout(timeoutId);
			document.documentElement.classList.add('yttw-video-focus');
			backdrop.style.opacity = '1';
			backdrop.style.visibility = 'visible';
		}

		ytTweaks.videoFocus = {
			storageChanged: function () {
				document.removeEventListener('loadstart', main, true);
				HTMLElement.prototype.removeEventListener.call(ytTweaks.mainPlayer, 'mouseenter', showBackdrop);
				backdrop.remove();
			}
		};
	}

	if (settings.volumeBoost) {
		const level = settings.boostingLevel ?? 2;
		const toggleOnRClick = settings.toggleVolBoost != false;
		const hotkey = settings.toggleVolBoostHotkey;
		const autoBoost = settings.autoVolumeBoost;

		if (autoBoost) document.addEventListener('loadstart', autoEnableVolBoost, true);

		if (hotkey) {
			ytTweaks.listenForHotkeys();
			ytTweaks.getHotkeys()[hotkey] = toggleVolBoost;
		}

		if (toggleOnRClick) {
			document.addEventListener('contextmenu', toggleVolBoost, true);
		}

		function toggleVolBoost(e) {
			if (e && !e.target.closest(':is([class*="mute"], [class*="Mute"], mute')) return;
			getPlayerAndVideo();
			if (!video?.clientWidth) return;
			e?.stopImmediatePropagation();
			e?.preventDefault();

			setupVolumeBoost();

			if (video.boosterGainNode.gain.value == level) {
				video.boosterGainNode.gain.value = 1;
				showFeedback(player.getVolume());
				autoEnableVolBoost.canRun = false;

			} else {
				video.boosterGainNode.gain.value = level;
				showFeedback(player.getVolume() * level);
				autoEnableVolBoost.canRun = true;
			}
		}

		function autoEnableVolBoost(e) {
			if (autoEnableVolBoost.canRun == false) return;

			video = e.target;
			setupVolumeBoost();
			video.boosterGainNode.gain.value = level;
		}

		function setupVolumeBoost() {
			if (!video.boosterGainNode) {
				if (!video.audioCtx) {
					video.audioCtx = new AudioContext();
					video.mediaSource = video.audioCtx.createMediaElementSource(video);
				}

				const gainNode = video.audioCtx.createGain();
				video.mediaSource.connect(gainNode);
				gainNode.connect(video.audioCtx.destination);
				video.boosterGainNode = gainNode;
			}
		}

		ytTweaks.volumeBoost = {
			storageChanged: function () {
				document.removeEventListener('loadstart', autoEnableVolBoost, true);
				document.removeEventListener('contextmenu', toggleVolBoost, true);

				for (const video of document.querySelectorAll('video')) {
					if (video.boosterGainNode) video.boosterGainNode.gain.value = 1;
				}
			}
		};
	}

	if (settings.monoAudio) {
		const hotkey = settings.toggleMonoAudioHotkey;
		const showButton = settings.monoAudioButton != false;
		const autoMono = settings.autoMono;

		const monoOffIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' fill='%23000000' width='24' height='24' viewBox='0 0 20.867935 20.867937' version='1.1' id='svg1' xml:space='preserve'%3E%3Cdefs id='defs1'/%3E%3Ctext xml:space='preserve' style='font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.2507px;font-family:Corbel;-inkscape-font-specification:Corbel;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:%23ffffff;fill-opacity:1;stroke:%23ffffff;stroke-width:0.3;stroke-dasharray:none;stroke-opacity:1' x='4.7291713' y='15.029335' id='text10' transform='scale(1.025579,0.97505897)'%3E%3Ctspan id='tspan10' style='font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:Corbel;-inkscape-font-specification:Corbel;fill:%23ffffff;fill-opacity:1;stroke:%23ffffff;stroke-width:0.3;stroke-dasharray:none;stroke-opacity:1' x='4.7291713' y='15.029335'%3EM%3C/tspan%3E%3C/text%3E%3Cellipse style='fill:none;fill-opacity:1;stroke:%23ffffff;stroke-width:1.51524;stroke-dasharray:none;stroke-opacity:1' id='path11' cx='10.433968' cy='10.433969' rx='9.6763477' ry='9.6763487'/%3E%3C/svg%3E";
		const monoOnIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' fill='%23000000' width='24' height='24' viewBox='0 0 20.867935 20.867937' version='1.1' id='svg1' xml:space='preserve'%3E%3Cdefs id='defs1'/%3E%3Cpath id='path12' d='M 10.433613,0 C 4.6800652,-2.6162365e-7 -2.6162359e-7,4.6800648 0,10.433613 c 4.162193e-7,5.753548 4.6800657,10.433556 10.433613,10.433555 5.753547,0 10.433555,-4.680008 10.433555,-10.433555 C 20.867169,4.6800653 16.18716,4.1621939e-7 10.433613,0 Z M 5.5925976,5.8484765 h 2.2014258 l 2.1893555,5.0009765 c 0.1369871,0.313539 0.2989421,0.742203 0.4507031,1.125469 0.153863,-0.389105 0.330122,-0.856994 0.450703,-1.125469 l 2.189356,-5.0009765 h 2.199375 v 9.1715625 h -1.85086 v -4.446797 c 0,-0.377428 0.02656,-0.8583215 0.03609,-1.2721288 -0.0602,0.1390175 -0.127429,0.3244704 -0.186328,0.4551563 v 0.00193 L 10.938867,15.020098 H 9.9292968 L 7.5936914,9.7563281 h 0.00199 C 7.5328118,9.6154312 7.4702406,9.4431128 7.4074218,9.2973632 c 0.00964,0.4169571 0.036035,0.8891648 0.036035,1.2759378 v 4.446797 H 5.5925976 Z' style='fill:%23ffffff'/%3E%3C/svg%3E";

		const img = document.createElement('img');
		img.style = 'display: block; margin: auto; height: 60%';
		img.src = monoOffIcon;

		const monoButton = document.createElement('button');
		monoButton.classList.add('ytp-button');
		monoButton.style = 'vertical-align: top';
		monoButton.appendChild(img);
		monoButton.addEventListener('click', toggleMonoAudio);

		if (autoMono) document.addEventListener('loadstart', autoEnableMono, true);

		if (showButton) addButtonToPlayer(monoButton);

		if (hotkey) {
			ytTweaks.listenForHotkeys();
			ytTweaks.getHotkeys()[hotkey] = toggleMonoAudio;
		}

		function toggleMonoAudio(e) {
			getPlayerAndVideo();
			if (!video?.clientWidth) return;

			setupMonoAudio();

			if (video.audioCtx.destination.channelCount == 1) {
				video.audioCtx.destination.channelCount = video.audioCtx.destination.maxChannelCount;
				if (!e) showFeedback('', monoOffIcon);
				img.src = monoOffIcon;
				autoEnableMono.canRun = false;
			} else {
				video.audioCtx.destination.channelCount = 1
				if (!e) showFeedback('', monoOnIcon);
				img.src = monoOnIcon;
				autoEnableMono.canRun = true;
			}
		}

		function autoEnableMono(e) {
			if (autoEnableMono.canRun == false) return;

			video = e.target;
			setupMonoAudio();
			video.audioCtx.destination.channelCount = 1;
			img.src = monoOnIcon;
		}

		function setupMonoAudio() {
			if (!video.audioCtx) {
				video.audioCtx = new AudioContext();
				video.mediaSource = video.audioCtx.createMediaElementSource(video);
				video.mediaSource.connect(video.audioCtx.destination);
			}
		}

		ytTweaks.monoAudio = {
			storageChanged: function () {
				document.removeEventListener('loadstart', autoEnableMono, true);
				monoButton.removeEventListener('click', toggleMonoAudio);
				monoButton.remove();

				for (const video of document.querySelectorAll('video')) {
					if (video.audioCtx) video.audioCtx.destination.channelCount = video.audioCtx.destination.maxChannelCount;
				}
			}
		};
	}

	if (settings.forceOgAudio) {
		let original = '';
		switch (document.documentElement.lang) {
			case 'en':
			case 'en-IN':
			case 'en-GB':
			case 'bs-Latn-BA':
			case 'ca-ES':
			case 'es-ES':
			case 'es-419':
			case 'es-US':
			case 'fr-FR':
			case 'nb-NO':
			case 'uz-Latn-UZ':
			case 'pt-PT':
			case 'pt-BR':
			case 'ro-RO':
				original += 'original';
				break;
			case 'de-DE':
				original += 'Original';
				break;
			case 'af-ZA':
				original += 'oorspronklike';
				break;
			case 'az-Latn-AZ':
			case 'tr-TR':
				original += 'orijinal';
				break;
			case 'id-ID':
				original += 'asli';
				break;
			case 'ms-MY':
				original += 'asal';
				break;
			case 'da-DK':
				original += 'originalt';
				break;
			case 'et-EE':
				original += 'algne';
				break;
			case 'eu-ES':
				original += 'jatorrizkoa';
				break;
			case 'cs-CZ':
				original += 'původní';
				break;
			case 'sl-SI':
				original += 'Izvirnik';
				break;
			case 'sk-SK':
				original += 'pôvodná zvuková stopa';
				break;
			case 'fi-FI':
				original += 'alkuperäinen';
				break;
			case 'sr-Latn-RS':
				original += 'originalna';
				break;
			case 'fil-PH':
				original += 'orihinal';
				break;
			case 'fr-CA':
			case 'it-IT':
				original += 'originale';
				break;
			case 'gl-ES':
				original += 'orixinal';
				break;
			case 'hr-HR':
				original += 'izvorno';
				break;
			case 'zu-ZA':
				original += 'yokuqala';
				break;
			case 'is-IS':
				original += 'upprunalegt';
				break;
			case 'sw-TZ':
				original += 'halisi';
				break;
			case 'lv-LV':
				original += 'oriģināls';
				break;
			case 'lt-LT':
				original += 'pradinis';
				break;
			case 'hu-HU':
				original += 'eredeti';
				break;
			case 'nl-NL':
				original += 'Originele';
				break;
			case 'sq-AL':
				original += 'origjinale';
				break;
			case 'pl-PL':
				original += 'oryginalny';
				break;
			case 'sv-SE':
				original += 'ursprungligt';
				break;
			case 'vi-VN':
				original += 'gốc';
				break;
			case 'be-BY':
				original += 'арыгінальны';
				break;
			case 'bg-BG':
			case 'mk-MK':
				original += 'оригинален';
				break;
			case 'ky-KG':
				original += 'түпнуска';
				break;
			case 'kk-KZ':
				original += 'түпнұсқа';
				break;
			case 'mn-MN':
				original += 'эх хувь';
				break;
			case 'ru-RU':
				original += 'оригинальная';
				break;
			case 'sr-Cyrl-RS':
				original += 'оригинална';
				break;
			case 'uk-UA':
				original += 'оригінал';
				break;
			case 'el-GR':
				original += 'πρωτότυπο αρχείο';
				break;
			case 'hy-AM':
				original += 'բնօրինակ';
				break;
			case 'he-IL':
				original += 'מקור';
				break;
			case 'ur-PK':
				original += 'اصل';
				break;
			case 'ar':
				original += 'أصلي';
				break;
			case 'fa-IR':
				original += 'اصلی';
				break;
			case 'ne-NP':
			case 'hi-IN':
				original += 'मूल';
				break;
			case 'mr-IN':
				original += 'मूळ';
				break;
			case 'as-IN':
			case 'bn-BD':
				original += 'মূল';
				break;
			case 'pa-Guru-IN':
				original += 'ਮੂਲ';
				break;
			case 'gu-IN':
				original += 'ઑરિજિનલ';
				break;
			case 'or-IN':
				original += 'ମୂଳ';
				break;
			case 'ta-IN':
				original += 'அசல்';
				break;
			case 'te-IN':
				original += 'అసలైనది';
				break;
			case 'kn-IN':
				original += 'ಮೂಲ';
				break;
			case 'ml-IN':
				original += 'ഒറിജിനൽ';
				break;
			case 'si-LK':
				original += 'මුල්';
				break;
			case 'th-TH':
				original += 'เสียงต้นฉบับภาษ';
				break;
			case 'lo-LA':
				original += 'ຕົ້ນສະບັບ';
				break;
			case 'my-MM':
				original += 'မူရင်း';
				break;
			case 'ka-GE':
				original += 'ორიგინალია';
				break;
			case 'am-ET':
				original += 'የመጀመሪያ';
				break;
			case 'km-KH':
				original += 'ដើម';
				break;
			case 'zh-Hans-CN':
				original += '原始';
				break;
			case 'zh-Hant-TW':
				original += '原文';
				break;
			case 'zh-Hant-HK':
				original += '原聲';
				break;
			case 'ja-JP':
				original += 'オリジナル';
				break;
			case 'ko-KR':
				original += '원본';
		}

		let tracks;
		document.addEventListener('playing', setOgAudio, true);

		function setOgAudio(e) {
			player = e.target.parentElement.parentElement;
			tracks = player.getAvailableAudioTracks();

			if (!tracks.length || player.getAudioTrack().getLanguageInfo().name.includes(original)) {
				return;
			}

			for (const p of tracks) {
				if (p.getLanguageInfo().name.includes(original)) {
					player.setAudioTrack(p);
				}
			}
		}

		ytTweaks.forceOgAudio = {
			storageChanged: function () {
				document.removeEventListener('playing', setOgAudio, true);
			}
		};
	}

	if (settings.videoSnapshot) {
		const format = settings.snapshotFormat || 'png';
		const quality = settings.snapshotQuality ?? 1;
		const showButton = settings.snapshotButton != false;
		const buttonSaveMethod = settings.snapshotButtonSaveMethod || 'file';
        const buttonSaveMethodRc = settings.snapshotButtonSaveMethodRc || 'clipboard';
        const subtitles = settings.snapshotWithSubtitles;

		const img = document.createElement('img');
		img.style = 'display: block; margin: auto; height: 60%';
		img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 15 15' fill='none'%3E%3Cpath d='M7 1.5L2 1.5M14.5 12.5L14.5 4.5C14.5 3.94772 14.0523 3.5 13.5 3.5L1.5 3.5C0.947717 3.5 0.500001 3.94772 0.500001 4.5L0.5 12.5C0.5 13.0523 0.947716 13.5 1.5 13.5L13.5 13.5C14.0523 13.5 14.5 13.0523 14.5 12.5ZM9.5 10.5C8.39543 10.5 7.5 9.60457 7.5 8.5C7.5 7.39543 8.39543 6.5 9.5 6.5C10.6046 6.5 11.5 7.39543 11.5 8.5C11.5 9.60457 10.6046 10.5 9.5 10.5Z' stroke='%23fff'/%3E%3C/svg%3E";

		const snapshotButton = document.createElement('button');
		snapshotButton.classList.add('ytp-button');
		snapshotButton.style = 'vertical-align: top';
		snapshotButton.appendChild(img);
		snapshotButton.addEventListener('click', snapshotButtonClicked);
        snapshotButton.addEventListener('contextmenu', snapshotButtonClicked);

		function snapshotButtonClicked(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            const saveMethod = e.type == 'click' ? buttonSaveMethod : buttonSaveMethodRc;
            if (saveMethod == 'file') takeSnapshot(true, false);
            else if (saveMethod == 'clipboard') takeSnapshot(false, true);
            else takeSnapshot(true, true);
		}

		if (showButton) addButtonToPlayer(snapshotButton);

		if (settings.snapshotToFileHotkey) {
			ytTweaks.listenForHotkeys();
			ytTweaks.getHotkeys()[settings.snapshotToFileHotkey] = function () {
				takeSnapshot(true, false);
			};
		}

		if (settings.snapshotToClipHotkey) {
			ytTweaks.listenForHotkeys();
			ytTweaks.getHotkeys()[settings.snapshotToClipHotkey] = function () {
				takeSnapshot(false, true);
			};
		}

		if (settings.snapshotToFileAndClipHotkey) {
			ytTweaks.listenForHotkeys();
			ytTweaks.getHotkeys()[settings.snapshotToFileAndClipHotkey] = function () {
				takeSnapshot(true, true);
			};
		}

		const takeSnapshot = function () {
			const a = document.createElement('a');
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');

			return function (saveToFile, saveToClip) {
				getPlayerAndVideo();
				showFeedback('', img.src);

				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
        
				context.drawImage(video, 0, 0, canvas.width, canvas.height);

                if (subtitles) {
                    const captions = player.querySelectorAll('.ytp-caption-segment');
                    const videoRect = video.getBoundingClientRect();

                    let outsideBottom = 0;
                    let outsideTop = 0;
                    let outsideLeft = 0
                    let outsideRight = 0;

                    for (const caption of captions) {
						if (caption.clientWidth - video.clientWidth > 0) {
							caption.style.width = video.clientWidth + 'px';
							caption.style.boxSizing = 'border-box';
						}
						
                        const capRect = caption.getBoundingClientRect();

						const num = videoRect.y + video.clientHeight - (capRect.y + caption.clientHeight);
						const num2 = capRect.y - videoRect.y;
						const num3 = capRect.x - videoRect.x;
						const num4 = videoRect.x + video.clientWidth - (capRect.x + caption.clientWidth);

						if (num < 0 && !(outsideBottom < num)) outsideBottom = num;
						if (num2 < 0 && !(outsideTop < num2)) outsideTop = num2;
						if (num3 < 0 && !(outsideLeft < num3)) outsideLeft = num3;
						if (num4 < 0 && !(outsideRight < num4)) outsideRight = num4;
                    }

                    for (const caption of captions) {
						const scaleX = 100 / video.clientWidth * video.videoWidth / 100;
                        const capRect = caption.getBoundingClientRect();
                        const fontSize = +caption.style.fontSize.replace('px', '') * scaleX;
						const y = (capRect.y - videoRect.y + (outsideBottom ? outsideBottom : Math.abs(outsideTop))) * scaleX;
						const x = (capRect.x - videoRect.x + (outsideRight ? outsideRight : Math.abs(outsideLeft))) * scaleX;

                        const width = caption.clientWidth * scaleX;
                        const height = caption.clientHeight * scaleX;

                        context.fillStyle = caption.style.backgroundColor;
                        context.fillRect(x, y, width, height);

						context.font = fontSize + 'px ' + caption.style.fontFamily;
                        context.fillStyle = caption.style.color;
						context.textBaseline = 'middle';
						context.textAlign = "center";

						const whiteSpace = /\s/g.test(caption.textContent) ? ' ' : '';
						const words = whiteSpace ? caption.textContent.split(' ') : [...caption.textContent];
						const lines = [words[0]];

						for (let i = 0; i < words.length - 1; i++) {
							if (context.measureText(lines[lines.length - 1] + whiteSpace + words[i + 1]).width > width) {
								lines.push(words[i + 1]);
							}

							else lines[lines.length - 1] += whiteSpace + words[i + 1];
						}
						
						for (let i = 0; i < lines.length; i++) {
							context.fillText(lines[i], x + (width/2), y + (height / lines.length)/ 2 + height / lines.length * i);
						}
                    }

					for (const caption of captions) {
						caption.style.width = '';
						caption.style.boxSizing = '';
					}
                }
                
				if (saveToFile) canvas.toBlob(function (blob) {
					a.href = URL.createObjectURL(blob);
					a.download = navigator.mediaSession.metadata.artist + ' - ' + navigator.mediaSession.metadata.title + ' - ' + video.currentTime + '.' + format;
					a.click();
				}, `image/${format}`, quality);

				if (saveToClip) canvas.toBlob(function (blob) {
					navigator.clipboard.write([
						new ClipboardItem({ 'image/png': blob })
					]);
				}, 'image/png', quality);
			}
		}();

		ytTweaks.videoSnapshot = {
			storageChanged: function () {
				snapshotButton.remove();
			},
		};
	}

	if (settings.flipVideo) {
		ytTweaks.sheet.textContent += `
		.yttw-flip-horizontally video {
		  --sx: -1;
		  transform: scale(var(--sx, 1), var(--sy, 1)) !important;
		}
	
		.yttw-flip-vertically video {
		  --sy: -1;
		  transform: scale(var(--sx, 1), var(--sy, -1)) !important;
		}
		`;

		const showflipHorButton = settings.flipHorizontallyButton != false;
		const showflipVertButton = settings.flipVerticallyButton != false;

		const flipHorOffIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M11 3L11 21' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20 8.2L20 8.16146C20 7.63431 20 7.17955 19.9694 6.80497C19.9371 6.40963 19.8658 6.01641 19.673 5.63803C19.3854 5.07354 18.9265 4.6146 18.362 4.32698C17.9836 4.13419 17.5904 4.06287 17.195 4.03057C16.8205 3.99997 16.3657 3.99998 15.8385 4L15.8 4L14 4L14 6L15.8 6C16.3766 6 16.7488 6.00078 17.0322 6.02393C17.3038 6.04612 17.4045 6.0838 17.454 6.10899C17.6422 6.20487 17.7951 6.35785 17.891 6.54601C17.9162 6.59545 17.9539 6.69617 17.9761 6.96784C17.9992 7.25117 18 7.62345 18 8.2L18 15.8C18 16.3766 17.9992 16.7488 17.9761 17.0322C17.9539 17.3038 17.9162 17.4045 17.891 17.454C17.7951 17.6422 17.6422 17.7951 17.454 17.891C17.4045 17.9162 17.3038 17.9539 17.0322 17.9761C16.7488 17.9992 16.3766 18 15.8 18L14 18L14 20L15.8 20L15.8385 20C16.3657 20 16.8204 20 17.195 19.9694C17.5904 19.9371 17.9836 19.8658 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C19.8658 17.9836 19.9371 17.5904 19.9694 17.195C20 16.8205 20 16.3657 20 15.8385L20 15.8L20 8.2ZM12 20L12 18L8.2 18C7.62344 18 7.25117 17.9992 6.96783 17.9761C6.69617 17.9539 6.59545 17.9162 6.54601 17.891C6.35785 17.7951 6.20486 17.6422 6.10899 17.454C6.0838 17.4045 6.04612 17.3038 6.02393 17.0322C6.00078 16.7488 6 16.3766 6 15.8L6 8.2C6 7.62345 6.00078 7.25117 6.02393 6.96784C6.04612 6.69617 6.0838 6.59545 6.10899 6.54601C6.20487 6.35785 6.35785 6.20487 6.54601 6.10899C6.59545 6.0838 6.69617 6.04612 6.96783 6.02393C7.25117 6.00078 7.62345 6 8.2 6L12 6L12 4L8.2 4L8.16146 4C7.63431 3.99998 7.17954 3.99997 6.80497 4.03057C6.40963 4.06287 6.01641 4.13419 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4.13419 6.01641 4.06287 6.40963 4.03057 6.80497C3.99997 7.17955 3.99998 7.63432 4 8.16148L4 8.2L4 15.8L4 15.8385C3.99998 16.3657 3.99997 16.8205 4.03057 17.195C4.06287 17.5904 4.13419 17.9836 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.01641 19.8658 6.40963 19.9371 6.80497 19.9694C7.17955 20 7.63432 20 8.16148 20L8.2 20L12 20Z' fill='%23fff'/%3E%3C/svg%3E";
		const flipHorOnIcon = "data:image/svg+xml,%3Csvg xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none' version='1.1' id='svg2' sodipodi:docname='2.svg' inkscape:version='1.4 (86a8ad7, 2024-10-11)'%3E%3Cpath d='M 10.999999,2.9999995 V 20.999999' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='path1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='m 19.999999,8.1999995 v -0.03854 c 2e-5,-0.52715 3e-5,-0.98191 -0.03057,-1.35649 -0.0323,-0.39534 -0.10362,-0.78856 -0.29641,-1.16694 -0.28762,-0.56449 -0.74656,-1.02343 -1.31105,-1.31105 -0.37838,-0.19279 -0.7716,-0.26411 -1.16694,-0.29641 -0.37457,-0.0306 -0.82934,-0.03059 -1.35649,-0.03057 h -0.03854 -1.8 v 2 h 1.8 c 0.57655,0 0.94883,7.8e-4 1.23216,0.02393 0.27167,0.02219 0.37239,0.05987 0.42183,0.08506 0.18816,0.09588 0.34114,0.24886 0.43702,0.43702 0.02519,0.04944 0.06287,0.15016 0.08506,0.42183 0.02315,0.28333 0.02393,0.65561 0.02393,1.23216 v 7.5999995 c 0,0.5766 -7.8e-4,0.9488 -0.02393,1.2322 -0.02219,0.2716 -0.05987,0.3723 -0.08506,0.4218 -0.09588,0.1882 -0.24886,0.3411 -0.43702,0.437 -0.04944,0.0252 -0.15016,0.0629 -0.42183,0.0851 -0.28333,0.0231 -0.65561,0.0239 -1.23216,0.0239 h -1.8 v 2 h 1.8 0.03852 c 0.52716,0 0.98193,0 1.35651,-0.0306 0.39534,-0.0323 0.78856,-0.1036 1.16694,-0.2964 0.56449,-0.2876 1.02343,-0.7465 1.31105,-1.311 0.19279,-0.3784 0.26411,-0.7716 0.29641,-1.167 0.0306,-0.3745 0.03059,-0.8293 0.03057,-1.3565 v -0.0385 z m -8,11.7999995 v -2 H 8.1999995 c -0.5766,0 -0.9488,-8e-4 -1.2322,-0.0239 -0.2716,-0.0222 -0.3723,-0.0599 -0.4218,-0.0851 -0.1882,-0.0959 -0.3411,-0.2488 -0.437,-0.437 -0.0252,-0.0495 -0.0629,-0.1502 -0.0851,-0.4218 -0.0231,-0.2834 -0.0239,-0.6556 -0.0239,-1.2322 V 8.1999995 c 0,-0.57655 8e-4,-0.94883 0.0239,-1.23216 0.0222,-0.27167 0.0599,-0.37239 0.0851,-0.42183 0.0959,-0.18816 0.2488,-0.34114 0.437,-0.43702 0.0495,-0.02519 0.1502,-0.06287 0.4218,-0.08506 0.2834,-0.02315 0.6556,-0.02393 1.2322,-0.02393 h 3.7999995 v -2 h -3.7999995 -0.0385 c -0.5272,-2e-5 -0.982,-3e-5 -1.3565,0.03057 -0.3954,0.0323 -0.7886,0.10362 -1.167,0.29641 -0.5645,0.28762 -1.0234,0.74656 -1.311,1.31105 -0.1928,0.37838 -0.2641,0.7716 -0.2964,1.16694 -0.0306,0.37458 -0.0306,0.82935 -0.0306,1.35651 v 0.03852 7.5999995 0.0385 c 0,0.5272 0,0.982 0.0306,1.3565 0.0323,0.3954 0.1036,0.7886 0.2964,1.167 0.2876,0.5645 0.7465,1.0234 1.311,1.311 0.3784,0.1928 0.7716,0.2641 1.167,0.2964 0.3745,0.0306 0.8293,0.0306 1.3565,0.0306 h 0.0385 z' fill='%23fff' id='path2'/%3E%3Crect style='fill:%23fff;stroke-width:0.0466197' id='rect2' width='14.014849' height='4.3531132' x='4.9771724' y='-18.35318' rx='0' transform='rotate(90)'/%3E%3Crect style='fill:%23fff;stroke-width:0.0526548' id='rect2-0' width='14.014849' height='5.5531135' x='5.1161728' y='-11.064057' rx='0' transform='rotate(90)'/%3E%3C/svg%3E";
		const flipVertOffIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M3 13H21' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.2 4H8.16146C7.63431 3.99998 7.17955 3.99997 6.80497 4.03057C6.40963 4.06287 6.01641 4.13419 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4.13419 6.01641 4.06287 6.40963 4.03057 6.80497C3.99997 7.17954 3.99998 7.63431 4 8.16146V8.2V10H6V8.2C6 7.62345 6.00078 7.25117 6.02393 6.96784C6.04612 6.69617 6.0838 6.59545 6.10899 6.54601C6.20487 6.35785 6.35785 6.20487 6.54601 6.10899C6.59545 6.0838 6.69617 6.04612 6.96784 6.02393C7.25117 6.00078 7.62345 6 8.2 6H15.8C16.3766 6 16.7488 6.00078 17.0322 6.02393C17.3038 6.04612 17.4045 6.0838 17.454 6.10899C17.6422 6.20487 17.7951 6.35785 17.891 6.54601C17.9162 6.59545 17.9539 6.69617 17.9761 6.96784C17.9992 7.25117 18 7.62345 18 8.2V10H20V8.2V8.16148C20 7.63432 20 7.17955 19.9694 6.80497C19.9371 6.40963 19.8658 6.01641 19.673 5.63803C19.3854 5.07354 18.9265 4.6146 18.362 4.32698C17.9836 4.13419 17.5904 4.06287 17.195 4.03057C16.8205 3.99997 16.3657 3.99998 15.8385 4H15.8H8.2ZM20 12H18V15.8C18 16.3766 17.9992 16.7488 17.9761 17.0322C17.9539 17.3038 17.9162 17.4045 17.891 17.454C17.7951 17.6422 17.6422 17.7951 17.454 17.891C17.4045 17.9162 17.3038 17.9539 17.0322 17.9761C16.7488 17.9992 16.3766 18 15.8 18H8.2C7.62345 18 7.25117 17.9992 6.96784 17.9761C6.69617 17.9539 6.59545 17.9162 6.54601 17.891C6.35785 17.7951 6.20487 17.6422 6.10899 17.454C6.0838 17.4045 6.04612 17.3038 6.02393 17.0322C6.00078 16.7488 6 16.3766 6 15.8V12H4V15.8V15.8385C3.99998 16.3657 3.99997 16.8205 4.03057 17.195C4.06287 17.5904 4.13419 17.9836 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.01641 19.8658 6.40963 19.9371 6.80497 19.9694C7.17955 20 7.63432 20 8.16148 20H8.2H15.8H15.8385C16.3657 20 16.8205 20 17.195 19.9694C17.5904 19.9371 17.9836 19.8658 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C19.8658 17.9836 19.9371 17.5904 19.9694 17.195C20 16.8205 20 16.3657 20 15.8385V15.8V12Z' fill='%23fff'/%3E%3C/svg%3E";
		const flipVertOnIcon = "data:image/svg+xml,%3Csvg xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none' version='1.1' id='svg2' sodipodi:docname='flip-horizontal-1-svgrepo-com (1).svg' inkscape:version='1.4 (86a8ad7, 2024-10-11)'%3E%3Cpath d='M3 13H21' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='path1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.2 4H8.16146C7.63431 3.99998 7.17955 3.99997 6.80497 4.03057C6.40963 4.06287 6.01641 4.13419 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4.13419 6.01641 4.06287 6.40963 4.03057 6.80497C3.99997 7.17954 3.99998 7.63431 4 8.16146V8.2V10H6V8.2C6 7.62345 6.00078 7.25117 6.02393 6.96784C6.04612 6.69617 6.0838 6.59545 6.10899 6.54601C6.20487 6.35785 6.35785 6.20487 6.54601 6.10899C6.59545 6.0838 6.69617 6.04612 6.96784 6.02393C7.25117 6.00078 7.62345 6 8.2 6H15.8C16.3766 6 16.7488 6.00078 17.0322 6.02393C17.3038 6.04612 17.4045 6.0838 17.454 6.10899C17.6422 6.20487 17.7951 6.35785 17.891 6.54601C17.9162 6.59545 17.9539 6.69617 17.9761 6.96784C17.9992 7.25117 18 7.62345 18 8.2V10H20V8.2V8.16148C20 7.63432 20 7.17955 19.9694 6.80497C19.9371 6.40963 19.8658 6.01641 19.673 5.63803C19.3854 5.07354 18.9265 4.6146 18.362 4.32698C17.9836 4.13419 17.5904 4.06287 17.195 4.03057C16.8205 3.99997 16.3657 3.99998 15.8385 4H15.8H8.2ZM20 12H18V15.8C18 16.3766 17.9992 16.7488 17.9761 17.0322C17.9539 17.3038 17.9162 17.4045 17.891 17.454C17.7951 17.6422 17.6422 17.7951 17.454 17.891C17.4045 17.9162 17.3038 17.9539 17.0322 17.9761C16.7488 17.9992 16.3766 18 15.8 18H8.2C7.62345 18 7.25117 17.9992 6.96784 17.9761C6.69617 17.9539 6.59545 17.9162 6.54601 17.891C6.35785 17.7951 6.20487 17.6422 6.10899 17.454C6.0838 17.4045 6.04612 17.3038 6.02393 17.0322C6.00078 16.7488 6 16.3766 6 15.8V12H4V15.8V15.8385C3.99998 16.3657 3.99997 16.8205 4.03057 17.195C4.06287 17.5904 4.13419 17.9836 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.01641 19.8658 6.40963 19.9371 6.80497 19.9694C7.17955 20 7.63432 20 8.16148 20H8.2H15.8H15.8385C16.3657 20 16.8205 20 17.195 19.9694C17.5904 19.9371 17.9836 19.8658 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C19.8658 17.9836 19.9371 17.5904 19.9694 17.195C20 16.8205 20 16.3657 20 15.8385V15.8V12Z' fill='%23fff' id='path2'/%3E%3Crect style='fill:%23fff;stroke-width:0.0466197' id='rect2' width='14.014849' height='4.3531132' x='4.9771729' y='5.6468191' rx='0'/%3E%3Crect style='fill:%23fff;stroke-width:0.0526548' id='rect2-0' width='14.014849' height='5.5531135' x='5.1161733' y='12.935942' rx='0'/%3E%3Crect style='fill:%23fff;stroke-width:0.04686' id='rect3' width='2.6039784' height='1.3019892' x='7.20434' y='7.3779387'/%3E%3C/svg%3E";

		const img = document.createElement('img');
		const img2 = document.createElement('img');
		img.style = img2.style = 'display: block; margin: auto; height: 60%';
		img.src = flipHorOffIcon;
		img2.src = flipVertOffIcon;

		const flipHorButton = document.createElement('button');
		const flipVerButton = document.createElement('button');

		flipHorButton.classList.add('ytp-button');
		flipHorButton.appendChild(img);
		flipHorButton.addEventListener('click', function (e) {
			flipVideo(true, e)
		});

		flipVerButton.classList.add('ytp-button');
		flipVerButton.appendChild(img2);
		flipVerButton.addEventListener('click', function (e) {
			flipVideo(false, e);
		});

		flipHorButton.style = flipVerButton.style = 'vertical-align: top';

		if (showflipHorButton || showflipVertButton) addButtonToPlayer(showflipHorButton ? flipHorButton : '', showflipVertButton ? flipVerButton : '');

		if (settings.flipHorizontallyHotkey) {
			ytTweaks.listenForHotkeys();

			ytTweaks.getHotkeys()[settings.flipHorizontallyHotkey] = function () {
				flipVideo(true);
			}
		}

		if (settings.flipVerticallyHotkey) {
			ytTweaks.listenForHotkeys();

			ytTweaks.getHotkeys()[settings.flipVerticallyHotkey] = flipVideo;
		}

		function flipVideo(horizontally, e) {
			if (horizontally) {
				document.body.classList.toggle('yttw-flip-horizontally');
				img.src = img.src == flipHorOffIcon ? flipHorOnIcon : flipHorOffIcon;
				if (!e) showFeedback('', img.src);
			} else {
				document.body.classList.toggle('yttw-flip-vertically');
				img2.src = img2.src == flipVertOffIcon ? flipVertOnIcon : flipVertOffIcon;
				if (!e) showFeedback('', img2.src);
			}
		}

		ytTweaks.flipVideo = {
			storageChanged: function () {
				flipHorButton.remove();
				flipVerButton.remove();
			}
		};
	}

	if (settings.playOneVideoAtAtime) {
		const bc = new BroadcastChannel('yttwPlayOneVideoAtAtime');
		bc.addEventListener('message', function() {
			if (video?.paused == false) {
				document.hidden ? video.pause() : bc.postMessage('');
			}
		});

		document.addEventListener('playing', postMessage, true);

		function postMessage(e) {
			video = e.target;
			if (video.parentElement.parentElement.id == 'inline-preview-player') return;
			bc.postMessage('');
		}

		ytTweaks.playOneVideoAtAtime = {
			storageChanged: function () {
				bc.close();
				document.removeEventListener('playing', postMessage, true);
			}
		};
	}

	if (settings.disableAutoPause) {
		document.addEventListener('pause', handleVideoUnpause, true);

		function handleVideoUnpause(e) {
			const dialog = document.body.querySelector('yt-confirm-dialog-renderer');

			if (dialog?.parentElement.__data.opened) {
				e.target.play();
				dialog.querySelector('button').click();
			}
		}

		ytTweaks.disableAutoPause = {
			storageChanged: function () {
				document.removeEventListener('pause', handleVideoUnpause, true);
			}
		};
	}

	if (settings.disablePlAutoPlay) {
		ytTweaks.sheet.textContent += `  
		#yttw-playlist-autoplay-button {
		  position: relative;
		  height: 40px;
		  width: 40px;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  border-radius: 50%;
		  margin-right: 8px;
		  margin-left: -8px;
		  cursor: pointer;
		}
	
		#yttw-playlist-autoplay-button input {
		  appearance: none;
		}
	
		.yttw-playlist-autoplay-button-icon {
		  fill: none;
		  stroke: var(--yt-spec-text-primary);
		  stroke-linecap: round;
		  stroke-linejoin: round;
		  stroke-width: 2px;
		}
	
		input:checked + svg .yttw-playlist-autoplay-button-icon {
		  stroke-width: 3.5px;
		}
		`;

		let ypm, actions, autoPlay;
		const label = document.createElement('label');
		const input = document.createElement('input');
		label.id = 'yttw-playlist-autoplay-button';
		input.type = 'checkbox';
		label.appendChild(input);
		try {
			autoPlay = localStorage.getItem("playlistAutoPlay") || false;
		} catch {
			autoPlay = false;
		}
		input.checked = +autoPlay ? true : false;
		autoPlay = input.checked;
		label.title = `Auto-play is ${autoPlay ? 'on' : 'off'}`;
		label.insertAdjacentHTML('beforeend', `
			<svg viewBox="37 25 25 50" style="height: 24px; width: 24px; position: absolute;">
			  <polygon class="yttw-playlist-autoplay-button-icon" points="46.05 44.99 46.07 58 56.3 51.48 46.05 44.99"></polygon>
			  <polyline class="yttw-playlist-autoplay-button-icon" points="37.41 31.09 43.69 33.54 41.24 39.81"></polyline>
			  <path class="yttw-playlist-autoplay-button-icon" d="M43.67,33.55a18.22,18.22,0,1,0,13.18.37"></path>
			</svg>
			`);

		input.addEventListener('change', function (e) {
			if (e.target.checked) {
				autoPlay = 1;
				toggleAutoPlay(true);
				label.title = `Auto-play is on`;
				localStorage.setItem("playlistAutoPlay", 1);

			} else {
				autoPlay = 0;
				toggleAutoPlay(false);
				label.title = `Auto-play is off`;
				localStorage.setItem("playlistAutoPlay", 0);
			}
		});

		document.addEventListener('yt-player-updated', main);

		function main() {
			if ((actions = document.getElementById('playlist-actions'))) {
				document.removeEventListener('yt-player-updated', main);

				ypm = document.querySelector('yt-playlist-manager');
				actions.prepend(label);
				if (!autoPlay) toggleAutoPlay(false);
			}
		}

		function toggleAutoPlay(boolean) {
			Object.defineProperty(ypm.polymerController, 'canAutoAdvance_', {
				get: function () { return boolean; },
				set: ytTweaks.noop,
				configurable: true
			});
		}

		ytTweaks.disablePlAutoPlay = {
			storageChanged: function () {
				if (ypm) toggleAutoPlay(true);
				label.remove();
				document.removeEventListener('yt-player-updated', main);
			}
		};
	}

	if (settings.disableNumHotkeys) {
		ytTweaks.listenForHotkeys();

		const keys = {
			topRow: settings.dnhTopRow == '0' ? 'Digit0' : settings.dnhTopRow != '' ? `${settings.dnhTopRow != '1-9' ? 'Digit0' : ''} Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9` : '',
			numpad: settings.dnhNumpad == '0' ? 'Numpad0' : settings.dnhNumpad != '' ? `${settings.dnhNumpad != '1-9' ? 'Numpad0' : ''} Numpad1 Numpad2 Numpad3 Numpad4 Numpad5 Numpad6 Numpad7 Numpad8 Numpad9` : '',
			home: settings.dnhHome != false ? 'Home' : '',
			end: settings.dnhEnd != false ? 'End' : ''
		}

		const strg = keys.topRow + keys.numpad + keys.home + keys.end;

		ytTweaks.disableNumHotkeys = {
			main: function (e) {
				if (strg.includes(e.code)) e.stopImmediatePropagation();
			},
			storageChanged: function () {
				delete ytTweaks.disableNumHotkeys;
			}
		};
	}

	if (settings.autoScrollShorts) {
		ytTweaks.sheet.textContent += `
		 #yttw-shorts-autoplay-button {
		  appearance: none;
		  -webkit-tap-highlight-color: transparent;
		  position: relative;
		  height: 14.4px;
		  width: 36px;
		  border-radius: 14.4px;
		  cursor: pointer;
		  outline-offset: 2px !important;
		  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, .5);
		  opacity: 0;
		  transition: opacity .1s cubic-bezier(.4,0,1,1);
		}
	
		:hover > label  #yttw-shorts-autoplay-button {
		  opacity: 1;
		}
	
		 #yttw-shorts-autoplay-button:after {
		  content: '';
		  width: 100%;
		  height: 100%;
		  display: inline-block;
		  border-radius: 100px;
		  clear: both;
		  background: rgba(255, 255, 255, 0.3);
		  transition: background-color linear 0.08s;
		}
		
		 #yttw-shorts-autoplay-button:before {
		  content: '';
		  height: 20.4px;
		  width: 20.4px;
		  display: block;
		  position: absolute;
		  left: 0;
		  top: -3px;
		  border-radius: 50%;
		  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSI+PGRlZnMgLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTguNSAxNmE3LjUgNy41IDAgMTAwLTE1IDcuNSA3LjUgMCAwMDAgMTV6IiBmaWxsPSIjNzE3MTcxIiAvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcgOC41YTguNSA4LjUgMCAxMS0xNyAwIDguNSA4LjUgMCAwMTE3IDB6bS0xIDBhNy41IDcuNSAwIDExLTE1IDAgNy41IDcuNSAwIDAxMTUgMHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjE1IiAvPjxwYXRoIGQ9Ik01LjUgMTJoMlY1aC0ydjd6TTkuNSA1djdoMlY1aC0yeiIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4=);
		  box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 3px 0 rgba(0, 0, 0, .2);
		  transition: transform linear 0.1s, background-color linear 0.1s;
		}
		
		 #yttw-shorts-autoplay-button:checked:before {
		  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNyA4LjVhOC41IDguNSAwIDExLTE3IDAgOC41IDguNSAwIDAxMTcgMHptLTUgMEw2LjUgNXY3TDEyIDguNXptLTEuODYgMEw3LjUgNi44MnYzLjM2bDIuNjQtMS42OHpNOC41IDE2YTcuNSA3LjUgMCAxMDAtMTUgNy41IDcuNSAwIDAwMCAxNXoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjE1IiAvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYgOC41YTcuNSA3LjUgMCAxMS0xNSAwIDcuNSA3LjUgMCAwMTE1IDB6bS00IDBMNi41IDEyVjVMMTIgOC41eiIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4=);
		  transform: translateX(15.6px);
		  transition: transform linear 0.1s, background-color linear 0.1s;
		}
		`;

		let label = document.createElement('label');
		let autoPlay;
		label.style = `
		position: absolute; 
		right: 16px; 
		top: 74px; 
		z-index: 99;
		display: flex; 
		width: 48px; 
		height: 48px; 
		justify-content: center; 
		align-items: center; 
		cursor: pointer; 
		`;
		try {
			autoPlay = localStorage.getItem("shortsAutoPlay") || true;
		} catch {
			autoPlay = true;
		}
		const input = document.createElement('input');
		label.appendChild(input);
		input.type = 'checkbox';
		input.checked = +autoPlay ? true : false;
		input.id = 'yttw-shorts-autoplay-button';
		autoPlay = input.checked;
		label.title = `Auto-play is ${autoPlay ? 'on' : 'off'}`;

		let el, el2;

		input.addEventListener('change', function (e) {
			if (e.target.checked) {
				autoPlay = 1;
				label.title = 'Auto-play is on';
				localStorage.setItem("shortsAutoPlay", 1);
			} else {
				autoPlay = 0;
				label.title = 'Auto-play is off';
				localStorage.setItem("shortsAutoPlay", 0);
			}
		});

		document.addEventListener('ended', scrollToNextShort, true);
		document.addEventListener('loadstart', appendToggleButton, true);

		function scrollToNextShort(e) {
			if (window.location.pathname.includes('shorts')) {
				el = el || e.target.closest('ytd-shorts');
				el2 = e.target.closest('.reel-video-in-sequence-new').nextElementSibling;
				if (autoPlay && el2.tagName != 'DOM-REPEAT' && !el.querySelector('[visibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"')) {
					el.loadVideo(+el2.id);
					el2.scrollIntoView();
					setTimeout(function () {
						if (el2.__dataHost?.__data?.item?.adsOverlay) {
							el2 = el2.nextElementSibling;
							el.loadVideo(+el2.id);
							el2.scrollIntoView();
						}
					}, 1000)
				}
			}
		}

		function appendToggleButton(e) {
			if (window.location.pathname.includes('shorts')) {
				e.target.parentElement.after(label);
				e.target.removeAttribute('loop');
				Object.defineProperty(e.target, 'loop', {
					get: function () { return false; },
					set: ytTweaks.noop,
					configurable: true
				});
			}
		}

		ytTweaks.autoScrollShorts = {
			storageChanged: function () {
				label.remove();
				document.removeEventListener('ended', scrollToNextShort, true);
				document.removeEventListener('loadstart', appendToggleButton, true);
			}
		};
	}

	if (settings.pinVideoOnScroll) {
		// Makes player resizable in 'Default mode'.
		Object.defineProperty(Object.prototype, 'getPlayerSize', {
			get: function () {
				return this.getPlayerSizeValue;
			},
			set: function (x) {
				if (typeof x == 'function') {
					this.getPlayerSizeValue = function () {
						const result = x.apply(this, arguments);

						if (typeof result == 'object' && this.element?.id == 'movie_player') {
							result.width = this.element.clientWidth;
							result.height = this.element.clientHeight;
						}

						return result;
					};
				} else {
					this.getPlayerSizeValue = x;
				}
			},
			configurable: true
		});

		const size = settings.pinnedVideoSize?.match(/\d+/g) || [480, 270];
		const gap = settings.floatingPinnedVideo ?? 10;
		const position = settings.pinnedVideoPosition || 'Bottom right';
        const header = settings.pinnedVideoBelowHeader ? settings.compactHeaderBar ? 36 : 56 : 0;
		const cssProp = {
			top: 'initial',
			bottom: 'initial',
			right: 'initial',
			left: 'initial',
			transform: 'initial'
		};

		if (position.startsWith('Bottom')) {
			cssProp.bottom = gap + 'px';
		}

		else if (position.startsWith('Center')) {
			cssProp.bottom = '50vh';
			cssProp.transform = 'translateY(50%)';
		}

		else if (position.startsWith('Top')) {
            cssProp.top = gap + header + 'px';
		}

		if (position.endsWith('right')) {
			cssProp.right = gap + 'px';
		}

		else if (position.endsWith('left')) {
			cssProp.left = gap + 'px';
		}

		else if (position.endsWith('center')) {
			cssProp.right = '50vw';
			cssProp.transform = 'translateX(50%)';
		}

		ytTweaks.sheet.textContent += `	
		ytd-watch-flexy .yttw-sticky-player {
		  position: fixed !important;
		  width: ${size[0]}px !important;
		  height: ${size[1]}px !important;
		  top: ${cssProp.top} !important;
		  bottom: ${cssProp.bottom} !important;
		  right: ${cssProp.right} !important;
		  left: ${cssProp.left} !important;
		  transform: ${cssProp.transform};
		  z-index: 2050 !important;
		  border-radius: ${settings.pinnedVideoRoundCorners ?? '12'}px !important;
		  background: black;
		  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.3);
		}
	
		ytd-watch-flexy .yttw-sticky-player:hover > .yttw-sticky-player-button { 
		  opacity: 1;
		  visibility: visible;
		}
	
		.yttw-sticky-player-button {
		  display: initial !important;
		  opacity: 0;
		  visibility: hidden;
		  position: absolute;
		  top: 10px;
		  left: 10px;
		  width: 10.00125%;
		  height: 17.78%;
		  max-width: 45px;
		  max-height: 45px;
		  min-width: 38px;
		  min-height: 38px;
		  border-radius: 100%;
		  z-index: 999;
		  background-color: rgba(0, 0, 0, 0.6);
		  transition: opacity .25s cubic-bezier(0,0,.2,1), visibility .25s;
		  font-family: inherit;
		  border: initial;
		  cursor: pointer;
		}
	
		/* Z-index is not applied to descendants of an element with a 'view-transition-name' set to a non-none value */
		.ytd-watch-flexy {
		  view-transition-name: none !important;
		}
		`;

		const enableOnScroll = settings.pinOnScroll != false;

		const div = document.createElement('div');
		div.style = `
		position: absolute;
		top: -69px;
		height: 1px;
		`;

		const userScrolled = new IntersectionObserver(toggleStickyPlayer);

		const buttons = [document.createElement('button'), document.createElement('button')];
		buttons[0].classList.add('yttw-sticky-player-button');
		buttons[1].classList.add('yttw-sticky-player-button');
		buttons[0].insertAdjacentHTML('afterbegin', `<svg viewBox="-235 -240 945 945" fill="white"><polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256"></polygon></svg>`);
		buttons[1].insertAdjacentHTML('afterbegin', `<svg viewBox="2 1.5 20 20" fill="white"><path d="m7.997 10 3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10l-3 .001V18h-2v-7.999L7.997 10z"></path></svg>`);
		buttons[1].style = 'left: initial; right: 10px;';

		buttons[0].addEventListener('click', function () {
			ytTweaks.mainPlayer.classList.remove('yttw-sticky-player');
		});

		buttons[1].addEventListener('click', function () {
			window.scrollTo({ top: 0 });
		});

		let videoIsOutOfView, below;

		document.addEventListener('yt-player-updated', main);

		function main() {
			if ((ytTweaks.mainPlayer || (ytTweaks.mainPlayer = document.getElementById('movie_player')))) {
				document.removeEventListener('yt-player-updated', main);

				ytTweaks.mainPlayer.append(...buttons);

				below = document.getElementById('below');
				below.style.position = 'relative';
				below.appendChild(div);
				below.addEventListener('click', blockTimeStampScroll, true);

				userScrolled.observe(div);
			}
		}

		function toggleStickyPlayer(entries) {
			if (entries[0].boundingClientRect.height) {
				if (entries[0].isIntersecting) {
					ytTweaks.mainPlayer.classList.remove('yttw-sticky-player');
					window.dispatchEvent(new Event('orientationchange'));
					videoIsOutOfView = 0;
				} else {
					if (enableOnScroll && navigator.mediaSession.playbackState == 'playing') {
						ytTweaks.mainPlayer.classList.add('yttw-sticky-player');
						window.dispatchEvent(new Event('orientationchange'));
					}

					videoIsOutOfView = 1;
				}
			}
		}

		function blockTimeStampScroll(e) {
			const time = e.target.href?.match(/(?<=t=)\d+/);

			if (time) {
				const video = ytTweaks.mainPlayer.querySelector('video');
				video.currentTime = time;
				video.play();
				e.stopPropagation();
				e.preventDefault();

				if (videoIsOutOfView && !ytTweaks.mainPlayer.className.includes('yttw-sticky-player')) {
					ytTweaks.mainPlayer.classList.add('yttw-sticky-player');
					window.dispatchEvent(new Event('orientationchange'));
				}
			}
		}

		if (settings.pinUnpinHotkey) {
			ytTweaks.listenForHotkeys();

			ytTweaks.getHotkeys()[settings.pinUnpinHotkey] = function () {
				ytTweaks.mainPlayer.classList.toggle('yttw-sticky-player');
				window.dispatchEvent(new Event('orientationchange'));
			}
		}

		ytTweaks.pinVideoOnScroll = {
			storageChanged: function () {
				document.removeEventListener('yt-player-updated', main);
				below?.removeEventListener('click', blockTimeStampScroll, true);
				div.remove();
				buttons[0].remove();
				buttons[1].remove();
			}
		};
	}

	if (settings.fullscreenTheaterMode) {
		const videoHeight = settings.ftmHeight ?? 100;
		const autoHideHeader = settings.ftmAutoHideHeader != false;

		ytTweaks.sheet.textContent += `
		ytd-watch-flexy[theater]:not([fullscreen]) #full-bleed-container.ytd-watch-flexy {
		  max-height: initial !important;
		  min-height: initial !important;
		  height: ${autoHideHeader ? videoHeight + 'vh' : `calc(${videoHeight}vh - var(--ytd-toolbar-height))`} !important;
		  ${autoHideHeader ? 'margin-top: calc(0px - var(--ytd-toolbar-height));' : ''}
		}
	
		#player.skeleton.theater {
		  max-height: initial !important;
		  min-height: initial !important;
		  height: ${autoHideHeader ? videoHeight + 'vh' : `calc(${videoHeight}vh - var(--ytd-toolbar-height))`} !important;
		  margin-top: ${autoHideHeader ? '0px' : 'var(--ytd-toolbar-height)'}
		}
	  
		${autoHideHeader ? `
		ytd-watch-flexy[fixed-panels] #chat.ytd-watch-flexy {
		  top: 0;
		}
	
		#masthead[is-watch-page][theater]:not([fullscreen]) {
		  position: absolute;
		  transform: translateY(calc(0px - var(--ytd-toolbar-height)));
		  padding-bottom: 20px;
		  transition: transform 0.3s ease, padding 0.3s ease;
		}
	  
		#masthead[is-watch-page][theater]:not([fullscreen]):is(:hover, :focus-within) {
		  transform: initial;
		  padding-bottom: 0;
		}` : ''}
		`;
	}

	if (settings.videoRemTime) {
		let listener, timeoutId, updateTimeLeft, span, currTimeChanged, main;

		if (settings.whereToShowTime == 'tabTitle') {
			main = function () {
				HTMLElement.prototype.addEventListener.call(ytTweaks.mainPlayer, 'timeupdate', updateTimeLeft, true);
			}

			document.addEventListener('loadstart', handler, true);

			if (settings.timeFormat == 'left%') {
				updateTimeLeft = function (e) {
					if (e.target.currentTime) document.title = `${Math.floor(100 / (e.target.duration / e.target.playbackRate) * (e.target.duration - e.target.currentTime) / e.target.playbackRate)}% • ${navigator.mediaSession.metadata.title}`;
				}
			} else if (settings.timeFormat == 'left+left%') {
				updateTimeLeft = function (e) {
					const totalSecLeft = (e.target.duration - e.target.currentTime) / e.target.playbackRate || 0;
					if (e.target.currentTime) document.title = `${formatSecToDDHHMMSS(totalSecLeft)} (${Math.floor(100 / (e.target.duration / e.target.playbackRate) * totalSecLeft)}%) • ${navigator.mediaSession.metadata.title}`;
				}
			} else {
				updateTimeLeft = function (e) {
					if (e.target.currentTime) document.title = `${formatSecToDDHHMMSS((e.target.duration - e.target.currentTime) / e.target.playbackRate)} • ${navigator.mediaSession.metadata.title}`;
				}
			}
		} else {
			main = function () {
				span = document.createElement('span');
				span.style = 'color: #ddd';
				span.classList.add('yttw-rem-time');

				const cTime = ytTweaks.mainPlayer.querySelector('.ytp-chrome-bottom .ytp-time-current');

				currTimeChanged.observe(cTime, {
					childList: true
				});

				cTime.parentElement.appendChild(span);
			}

			document.addEventListener('loadstart', handler, true);

			currTimeChanged = new MutationObserver(handleCurrTimeChange);

			function handleCurrTimeChange() {
				if (!listener) {
					HTMLElement.prototype.addEventListener.call(ytTweaks.mainPlayer, 'timeupdate', updateTimeLeft, true);
					listener = 1;
				}

				clearTimeout(timeoutId);
				timeoutId = setTimeout(function () {
					HTMLElement.prototype.removeEventListener.call(ytTweaks.mainPlayer, 'timeupdate', updateTimeLeft, true);
					listener = 0;
				}, 5000);
			}

			if (settings.timeFormat == 'left%') {
				updateTimeLeft = function (e) {
					span.textContent = ` • ${Math.floor((100 / (e.target.duration / e.target.playbackRate) || 0) * (e.target.duration - e.target.currentTime) / e.target.playbackRate || 0)}%`;
				}
			} else if (settings.timeFormat == 'left+left%') {
				updateTimeLeft = function (e) {
					const totalSecLeft = (e.target.duration - e.target.currentTime) / e.target.playbackRate || 0;
					span.textContent = ` • ${formatSecToDDHHMMSS(totalSecLeft)} (${Math.floor((100 / (e.target.duration / e.target.playbackRate) || 0) * totalSecLeft)}%)`;
				}
			} else {
				updateTimeLeft = function (e) {
					span.textContent = ` • ${formatSecToDDHHMMSS((e.target.duration - e.target.currentTime) / e.target.playbackRate || 0)}`;
				}
			}

			ytTweaks.sheet.textContent += `
			.ytp-live .yttw-rem-time {
			  display: none;
			}
			`;
		}

		function handler() {
			if ((ytTweaks.mainPlayer || (ytTweaks.mainPlayer = document.getElementById('movie_player')))) {
				document.removeEventListener('loadstart', handler, true);
				main();
			}
		}

		ytTweaks.videoRemTime = {
			storageChanged: function () {
				document.removeEventListener('loadstart', handler, true);
				HTMLElement.prototype.removeEventListener.call(ytTweaks.mainPlayer, 'timeupdate', updateTimeLeft, true);
				span?.remove();
				currTimeChanged?.disconnect();
			}
		};
	}

	if (settings.alwaysShowProgBar) {
		const isPinned = settings.keepProgBarAtBottom ? '#movie_player' : '#movie_player:is(.ytp-autohide, .yttw-no-controls)';

		ytTweaks.sheet.textContent += `
		#movie_player.ytp-autohide:not(.ad-interrupting) .ytp-chrome-bottom {
		  opacity: 1 !important;
		}
	
		#movie_player:is(.ytp-autohide, .yttw-no-controls) :is(.ytp-chrome-controls, .ytp-scrubber-button) {
		  opacity: 0;
		}
	
		#movie_player:is(.ytp-autohide, .yttw-no-controls)  .ytp-progress-bar-container {
		  opacity: ${settings.progBarOpacity ?? 1};
		}
	
		${isPinned} .ytp-progress-bar-container {
		  bottom: 0px;
		}
	
		${settings.showProgBarOutsidePlayer ? `
		#movie_player,
		#ytd-player.ytd-watch-flexy {
		  overflow: initial !important;
		}
	
		ytd-watch-flexy:not([fullscreen]) ${isPinned} .ytp-progress-bar-container {
		  top: 100%;
		}
	
		#below {
		  margin-top: 12px;
		}
	
		/* Fix for video above header when 'Video focus' is enabled */
		#movie_player.ended-mode .html5-video-container {
		  overflow: hidden;
		}
		` : ''}
		
		#movie_player .ytp-progress-bar-container {
		  transition: bottom .1s cubic-bezier(.4,0,1,1);
		}
	
		#movie_player .ytp-chrome-controls {
		  transition: opacity .25s cubic-bezier(0,0,.2,1);
		}
		`;

		document.addEventListener('loadstart', main, true);
		let style;

		function main() {
			if ((ytTweaks.mainPlayer || (ytTweaks.mainPlayer = document.getElementById('movie_player')))) {
				document.removeEventListener('loadstart', main, true);
				style = getComputedStyle(ytTweaks.mainPlayer);
				HTMLElement.prototype.addEventListener.call(ytTweaks.mainPlayer, 'timeupdate', updateVideoData, true);
			}
		}

		function updateVideoData() {
			if (style.cursor == 'none') ytTweaks.mainPlayer.updateVideoData();
		}

		ytTweaks.alwaysShowProgBar = {
			storageChanged: function () {
				document.removeEventListener('loadstart', main, true);
				HTMLElement.prototype.removeEventListener.call(ytTweaks.mainPlayer, 'timeupdate', updateVideoData, true);
			}
		};
	}

	if (settings.customProgBar) {
		const progressBar = `
		.ytp-play-progress,
		.ytProgressBarLineProgressBarPlayed
		`;
		
		const scrubber = `
		.ytp-scrubber-button,
		.ytProgressBarPlayheadProgressBarPlayheadDot
		`;

		switch (settings.customProgBar) {
			case 'solidColor':
				ytTweaks.sheet.textContent += `
				${progressBar},
				${scrubber} {
				  background: ${settings.progBarColor || 'hsl(204, 100%, 50%)'} !important;
				}
				`;
				break;
			case 'nyanCat':
				ytTweaks.sheet.textContent += `
				${progressBar} {
				  background-image: linear-gradient(to bottom, #FF0000 0%, #FF0000 16.5%, #FF9900 16.5%, #FF9900 33%, #FFFF00 33%, #FFFF00 50%, #33FF00 50%, #33FF00 66%, #0099FF 66%, #0099FF 83.5%, #6633ff 83.5%, #6633ff 100%) !important;
				}
				
				.ytp-progress-bar-container,
				.ytProgressBarLineProgressBarLine {
				  height: 12px !important;
				}
				
				${scrubber} {
				  opacity: 1 !important;
				  background: url(data:image/gif;base64,R0lGODlhIgAVAKIHAL3/9/+Zmf8zmf/MmZmZmf+Z/wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMkJBNjY5RTU1NEJFMzExOUM4QUM2MDAwNDQzRERBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREIzOEIzMzRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREIzOEIzMjRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1QkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMyQkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECQcABwAsAAAAACIAFQAAA6J4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93bqCA7f7TFaYoIFAMMwczB5EkTzJllEUttmIGoG5bfPBjDawD7CsJC67uWcv2CRov929C/q2ZpcBbYBmLGk6W1BRY4MUDnMvJEsBAXdlknk2fCeRk2iJliAijpBlEmigjR0plKSgpKWvEUheF4tUZqZID1RHjEe8PsDBBwkAIfkECQcABwAsAAAAACIAFQAAA6B4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93TqS40XiKSYgTLBgIBAMqE/zmQSaZEzns+jQ9pC/5dQJ0VIv5KMVWxqb36opxHrNvu9ptPfGbmsBbgSAeRdydCdjXWRPchQPh1hNAQF4TpM9NnwukpRyi5chGjqJEoSOIh0plaYsZBKvsCuNjY5ptElgDyFIuj6+vwcJACH5BAkHAAcALAAAAAAiABUAAAOfeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GKifWaddvNQAtszXYCxgR/Zy5jYTFeXmSDiIZGdQEBd06QSBQ5e4cEkE9nnZQaG2J4F4MSLx8rkqUSZBeurhlTUqsLsi60DpZxSWBJugcJACH5BAkHAAcALAAAAAAiABUAAAOgeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GuifWaddvNwMkZtmY7AWMEgGcKY2ExXl5khFMVc0Z1AQF3TpJShDl8iASST2efloV5JTyJFpgOch8dgW9KZxexshGNLqgLtbW0SXFwvaJfCQAh+QQJBwAHACwAAAAAIgAVAAADoXi63P7wmUmrnVGOzbvfRsYYXGGe6MmF4kEOaSGYMwq2LizHfDGwIlLPNKGZfi6gZmggEAy2iVPZEKZqzakq+1xUFFYe90lxTsHmim6HGpvf3eR7skYJ3PC5tyystc0AboFnVXQ9XFJTZIQOYUYFTQEBeWaSVF4bbCeRk1meBJYSL3WbaReMIxQfHXh6jaYXsbEQni6oaF21ERR7l0ksvA0JACH5BAkHAAcALAAAAAAiABUAAAOeeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMfFlA4hTITEMxkIBMOuADwmhzqeM6mashTCXKw2TVKQyKuTRSx2wegnNkyJ1ozpOFiMLqcEU8BZHx6NYW8nVlZefQ1tZgQBAXJIi1eHUTRwi0lhl48QL0sogxaGDhMlUo2gh14fHhcVmnOrrxNqrU9joX21Q0IUElm7DQkAIfkECQcABwAsAAAAACIAFQAAA6J4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93bqCA7f7TFaYoIFAMMwczB5EkTzJllEUttmIGoG5bfPBjDawD7CsJC67uWcv2CRov929C/q2ZpcBbYBmLGk6W1BRY4MUDnMvJEsBAXdlknk2fCeRk2iJliAijpBlEmigjR0plKSgpKWvEUheF4tUZqZID1RHjEe8PsDBBwkAIfkECQcABwAsAAAAACIAFQAAA6B4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93TqS40XiKSYgTLBgIBAMqE/zmQSaZEzns+jQ9pC/5dQJ0VIv5KMVWxqb36opxHrNvu9ptPfGbmsBbgSAeRdydCdjXWRPchQPh1hNAQF4TpM9NnwukpRyi5chGjqJEoSOIh0plaYsZBKvsCuNjY5ptElgDyFIuj6+vwcJACH5BAkHAAcALAAAAAAiABUAAAOfeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GKifWaddvNQAtszXYCxgR/Zy5jYTFeXmSDiIZGdQEBd06QSBQ5e4cEkE9nnZQaG2J4F4MSLx8rkqUSZBeurhlTUqsLsi60DpZxSWBJugcJACH5BAkHAAcALAAAAAAiABUAAAOgeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GuifWaddvNwMkZtmY7AWMEgGcKY2ExXl5khFMVc0Z1AQF3TpJShDl8iASST2efloV5JTyJFpgOch8dgW9KZxexshGNLqgLtbW0SXFwvaJfCQAh+QQJBwAHACwAAAAAIgAVAAADoXi63P7wmUmrnVGOzbvfRsYYXGGe6MmF4kEOaSGYMwq2LizHfDGwIlLPNKGZfi6gZmggEAy2iVPZEKZqzakq+1xUFFYe90lxTsHmim6HGpvf3eR7skYJ3PC5tyystc0AboFnVXQ9XFJTZIQOYUYFTQEBeWaSVF4bbCeRk1meBJYSL3WbaReMIxQfHXh6jaYXsbEQni6oaF21ERR7l0ksvA0JACH5BAkHAAcALAAAAAAiABUAAAOeeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMfFlA4hTITEMxkIBMOuADwmhzqeM6mashTCXKw2TVKQyKuTRSx2wegnNkyJ1ozpOFiMLqcEU8BZHx6NYW8nVlZefQ1tZgQBAXJIi1eHUTRwi0lhl48QL0sogxaGDhMlUo2gh14fHhcVmnOrrxNqrU9joX21Q0IUElm7DQkAOw==) !important;
				  width: 34px !important;
				  height: 21px !important;
				  border: none !important;
				  margin-left: -17px;
				  transform: scale(0.8);
				}
				
				.ytp-load-progress {
				  background: url(data:image/gif;base64,R0lGODlhMAAMAIAAAAxBd////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAMAAMAAACJYSPqcvtD6MKstpLr24Z9A2GYvJ544mhXQmxoesElIyCcB3dRgEAIfkEBAoAAAAsAQACAC0ACgAAAiGEj6nLHG0enNQdWbPefOHYhSLydVhJoSYXPO04qrAmJwUAIfkEBAoAAAAsBQABACkACwAAAiGEj6nLwQ8jcC5ViW3evHt1GaE0flxpphn6BNTEqvI8dQUAIfkEBAoAAAAsAQABACoACwAAAiGEj6nLwQ+jcU5VidPNvPtvad0GfmSJeicUUECbxnK0RgUAIfkEBAoAAAAsAAAAACcADAAAAiCEj6mbwQ+ji5QGd6t+c/v2hZzYiVpXmuoKIikLm6hXAAAh+QQECgAAACwAAAAALQAMAAACI4SPqQvBD6NysloTXL480g4uX0iW1Wg21oem7ismLUy/LFwAACH5BAQKAAAALAkAAAAkAAwAAAIghI8Joe0Po0yBWTaz3g/z7UXhMX7kYmplmo0rC8cyUgAAIfkEBAoAAAAsBQAAACUACgAAAh2Ejwmh7Q+jbIFZNrPeEXPudU74IVa5kSiYqOtRAAAh+QQECgAAACwEAAAAIgAKAAACHISPELfpD6OcqTGKs4bWRp+B36YFi0mGaVmtWQEAIfkEBAoAAAAsAAAAACMACgAAAh2EjxC36Q+jnK8xirOW1kavgd+2BYtJhmnpiGtUAAAh+QQECgAAACwAAAAALgALAAACIYSPqcvtD+MKicqLn82c7e6BIhZQ5jem6oVKbfdqQLzKBQAh+QQECgAAACwCAAIALAAJAAACHQx+hsvtD2OStDplKc68r2CEm0eW5uSN6aqe1lgAADs=) !important;
				}
				`;
				break;
			case 'pacMan':
				ytTweaks.sheet.textContent += `
				${progressBar} {
				  background: #2121de !important;
				}
				
				${scrubber} {
				  opacity: 1 !important;
				  background: url("data:image/gif;base64,R0lGODlhGAAYAPAAAAAAAP//ACH/C05FVFNDQVBFMi4wAwEAAAAh/jBHSUYgY29udmVydGVkIHdpdGggaHR0cHM6Ly9lemdpZi5jb20vd2VicC10by1naWYAIfkECQoAAAAsAAAAABgAGAAAAjSEj6l74e8Yg1Aiip/MPKrOLWCWjN1lkk2KoWy1vlosB259y5++vyLfG1lYFhqsiEwql8oCACH5BAkKAAAALAAAAAAYABgAAAI1hI+pe+HvGINQIoqfzDyqzi1glozhZWoiaDVsC5Aw2s2p+t2BpXtlv9JNUjwi7DRLKpdMRAEAIfkEBQoAAAAsAAAAABgAGAAAAjKEj6l74e8Yg1Aiiq3BWfOqAV8QiiMZnqXZrd+6tS4Hs3SpwqOee72/S/2EsprxiFwUAAAh+QQFCgAAACwAAAAAGAAYAAACK4SPqcvtD1uYkc1b0cV57wx4XCSCI2ic6Kqoa4nCsRi8nv3hbErt/g/MFAAAOw==") !important;
				  height: 24px !important;
				  width: 24px !important;
				  margin-top: -40%;
				  transform: scale(1);
				}
				`;
				break;
			case 'lightSaber':
				let color = settings.progBarColor || 'hsl(204, 100%, 50%)';
				ytTweaks.sheet.textContent += `
				${progressBar} {
				  box-shadow: 0px 0px 8px 2px ${color} !important;
				  background: linear-gradient(to top, ${color} 0%, rgba(254, 254, 254, 1) 30%, rgba(254, 254, 254, 1) 0%, rgba(254, 254, 254, 1) 60%, ${color} 100%) !important;
				}
		
				${scrubber} {
				  box-shadow: 0px 0px 8px 2px ${color} !important;
				  background: radial-gradient(rgba(254, 254, 254, 1), rgba(254, 254, 254, 1), ${color}) !important;
				}
		
				.ytp-settings-menu .ytp-menuitem[aria-checked="true"] .ytp-menuitem-toggle-checkbox {
				  box-shadow: 0 0 9px 3px ${color} !important;
				  background: white !important;
				}
		
				.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox::after {
				  background: white !important;
				}
		
				.ytp-volume-slider-handle {
				  box-shadow: 0 0 9px 3px ${color} !important;
				  background: radial-gradient(rgba(254, 254, 254, 1), rgba(254, 254, 254, 1), ${color}) !important;
				}
		
				.ytp-chrome-controls .ytp-button[aria-pressed=true]:after {
				  background: linear-gradient(to top, ${color} 0%, rgba(254, 254, 254, 1) 30%, rgba(254, 254, 254, 1) 0%, rgba(254, 254, 254, 1) 60%, ${color} 100%) !important;
				  box-shadow: 0 0 9px 3px ${color} !important;
				}
		
				.ytp-volume-slider-handle:before {
				  box-shadow: 0px 0px 8px 2px ${color} !important;
				  background: linear-gradient(to top, ${color} 0%, rgba(254, 254, 254, 1) 30%, rgba(254, 254, 254, 1) 0%, rgba(254, 254, 254, 1) 60%, ${color} 100%) !important;
				  z-index: -117; 
				}
		
				.ytp-autonav-toggle-button[aria-checked=true]:after {
				  background-color: ${color} !important;
				  box-shadow: 0px 0px 8px 2px ${color} !important;   
				  }
		
				.ytp-live-badge[disabled]::before {
				  background: radial-gradient(rgba(254, 254, 254, 1), rgba(254, 254, 254, 1), ${color}) !important;
				  box-shadow: 0 0 9px 3px ${color} !important;
				}
				`;
		}
	}

	if (settings.hideControlsOnPause) {
		ytTweaks.sheet.textContent += `
        .yttw-no-controls {
          cursor: none !important;
        }

        ${settings.alwaysShowProgBar ? '' : `.yttw-no-controls .ytp-chrome-bottom,`}
        .yttw-no-controls .ytp-chrome-top,
        .yttw-no-controls .ytp-gradient-bottom,
        .yttw-no-controls .ytp-gradient-top {
          opacity: 0;
        }
  
        .yttw-no-controls .ytp-player-content {
          bottom: 12px;
        }
  
        .yttw-no-controls .caption-window.ytp-caption-window-bottom {
          margin-bottom: 0px;
        }
        `;

		let timeoutId;

		document.addEventListener('loadstart', main, true);

		function main() {
			if ((ytTweaks.mainPlayer || (ytTweaks.mainPlayer = document.getElementById('movie_player')))) {
				document.removeEventListener('loadstart', main, true);

				ytTweaks.mainPlayer.classList.add('yttw-no-controls');
				HTMLElement.prototype.addEventListener.call(ytTweaks.mainPlayer, 'mousemove', showControlsTemporarily);
				HTMLElement.prototype.addEventListener.call(ytTweaks.mainPlayer, 'mouseleave', hideControls);
				HTMLElement.prototype.addEventListener.call(ytTweaks.mainPlayer, 'keyup', handleKeyup);
			}
		}

		let canRun = true;
		function showControlsTemporarily() {
			if (canRun) {
				canRun = false;
				clearTimeout(timeoutId);
				ytTweaks.mainPlayer.classList.remove('yttw-no-controls');
				timeoutId = setTimeout(function () {
					canRun = true;
					timeoutId = setTimeout(function () {
						ytTweaks.mainPlayer.classList.add('yttw-no-controls');
					}, 2000);
				}, 1000);
			};
		}

		function hideControls() {
			canRun = true;
			ytTweaks.mainPlayer.classList.add('yttw-no-controls');
		}

		function handleKeyup(e) {
			if (!e.target.attributes.title) return;

			else if ('Tab, Enter, Space'.includes(e.code) || e.code.includes('Arrow') && e.target.matches('.ytp-volume-panel')) {
				showControlsTemporarily();
			}
		}

		ytTweaks.hideControlsOnPause = {
			storageChanged: function () {
				document.removeEventListener('loadstart', main, true);
				HTMLElement.prototype.removeEventListener.call(ytTweaks.mainPlayer, 'mousemove', showControlsTemporarily);
				HTMLElement.prototype.removeEventListener.call(ytTweaks.mainPlayer, 'mouseleave', hideControls);
				HTMLElement.prototype.removeEventListener.call(ytTweaks.mainPlayer, 'keyup', handleKeyup);
				ytTweaks.mainPlayer?.classList.remove('yttw-no-controls');
			}
		};
	}

	if (settings.hideEndCards) ytTweaks.sheet.textContent += `
    ${settings.hideEndCards == 'hide' ? '' : '.ytp-autohide'} .ytp-ce-element.ytp-ce-element-show {
    ${settings.hideEndCards == 'hide' ? 'display: none;' : 'opacity: 0;'}
    }
    `;

	// Hotkeys

	if (settings.increaseQualityHotkey || settings.decreaseQualityHotkey || settings.highestQualityHotkey || settings.lowestQualityHotkey) {
		ytTweaks.listenForHotkeys();

		const qualities = {
			auto: 0,
			tiny: 1,
			small: 2,
			medium: 3,
			large: 4,
			hd720: 5,
			hd1080: 6,
			hd1440: 7,
			hd2160: 8,
			highres: 9
		}

		const qualities2 = [
			['auto', 'Auto'],
			['tiny', '144p'],
			['small', '240p'],
			['medium', '360p'],
			['large', '480p'],
			['hd720', '720p'],
			['hd1080', '1080p (HD)'],
			['hd1440', '1440p (HD)'],
			['hd2160', '2160p (4K)'],
			['highres', '4320p (8K)']
		]

		if (settings.increaseQualityHotkey) {
			ytTweaks.getHotkeys()[settings.increaseQualityHotkey] = function () {
				getPlayerAndVideo();

				const currQuality = player.getPlaybackQuality();
				const newQuality = getNewQuality(currQuality, qualities2[qualities[currQuality] + 1][0], player.getAvailableQualityLevels(), 'nextHigher');
				setQuality(newQuality);
			}
		}

		if (settings.decreaseQualityHotkey) {
			ytTweaks.getHotkeys()[settings.decreaseQualityHotkey] = function () {
				getPlayerAndVideo();

				const currQuality = player.getPlaybackQuality();
				const newQuality = getNewQuality(currQuality, qualities2[qualities[currQuality] - 1][0], player.getAvailableQualityLevels(), 'nextLower');
				setQuality(newQuality);
			}
		}

		if (settings.highestQualityHotkey) {
			ytTweaks.getHotkeys()[settings.highestQualityHotkey] = function () {
				getPlayerAndVideo();
				setQuality(player.getAvailableQualityLevels()[0]);
			}
		}

		if (settings.lowestQualityHotkey) {
			ytTweaks.getHotkeys()[settings.lowestQualityHotkey] = function () {
				getPlayerAndVideo();
				setQuality(player.getAvailableQualityLevels()[player.getAvailableQualityLevels().length - 2]);
			}
		}

		function getNewQuality(currQuality, quality, availableQualities, fallback) {
			if (qualities[quality] == undefined) {
				return currQuality;
			}

			if (availableQualities.includes(quality)) {
				return quality;
			}

			else if (qualities[quality] > qualities[availableQualities[0]]) {
				return availableQualities[0];
			}

			else if (qualities[quality] < qualities[availableQualities[availableQualities.length - 1]]) {
				return availableQualities[availableQualities.length - 1];
			}

			else {
				if (fallback == 'nextHigher') {
					for (let i = qualities[quality] + 1; i >= 0; i++) {
						if (availableQualities.includes(qualities2[i][0])) {
							quality = qualities2[i][0];
							break;
						}
					}
				} else {
					for (let i = qualities[quality] - 1; i >= 0; i--) {
						if (availableQualities.includes(qualities2[i][0])) {
							quality = qualities2[i][0];
							break;
						}
					}
				}

				return quality;
			}
		}

		function setQuality(quality) {
			player.setPlaybackQualityRange(quality);
			showFeedback(qualities2[qualities[quality]][1]);
		}
	}

	if (settings.increaseSpeedHotkeys || settings.decreaseSpeedHotkeys || settings.resetSpeedHotkey || settings.customSpeedHotkeys) {
		ytTweaks.listenForHotkeys();

		if (settings.increaseSpeedHotkeys) {
			for (const p in settings.increaseSpeedHotkeys) {
				ytTweaks.getHotkeys()[p] = function () {
					getPlayerAndVideo();
					setSpeed(Math.round((video.playbackRate + settings.increaseSpeedHotkeys[p]) * 100) / 100);
				};
			}
		}

		if (settings.decreaseSpeedHotkeys) {
			for (const p in settings.decreaseSpeedHotkeys) {
				ytTweaks.getHotkeys()[p] = function () {
					getPlayerAndVideo();
					setSpeed(Math.round((video.playbackRate - settings.decreaseSpeedHotkeys[p]) * 100) / 100);
				};
			}
		}

		if (settings.resetSpeedHotkey) {
			const normalSpeed = settings.videoSpeed ? settings.vsSpeed ?? 1.5 : 1;

			ytTweaks.getHotkeys()[settings.resetSpeedHotkey] = function () {
				getPlayerAndVideo();
				setSpeed(normalSpeed);
			}
		}

		if (settings.customSpeedHotkeys) {
			for (const p in settings.customSpeedHotkeys) {
				ytTweaks.getHotkeys()[p] = function () {
					getPlayerAndVideo();
					setSpeed(settings.customSpeedHotkeys[p]);
				};
			}
		}

		function setSpeed(speed) {
			player.setPlaybackRate(speed);
			video.playbackRate = speed;
			showFeedback(speed + 'x');

			try {
				sessionStorage.setItem('yt-player-playback-rate', JSON.stringify({
					data: speed + '',
					creation: Date.now()
				}))
			} catch { }
		}
	}

	if (settings.increaseVolHotkeys || settings.decreaseVolHotkeys) {
		ytTweaks.listenForHotkeys();

		if (settings.increaseVolHotkeys) {
			for (const p in settings.increaseVolHotkeys) {
				ytTweaks.getHotkeys()[p] = function () {
					getPlayerAndVideo();
					setVolume(player.getVolume() + settings.increaseVolHotkeys[p]);
				};
			}
		}

		if (settings.decreaseVolHotkeys) {
			for (const p in settings.decreaseVolHotkeys) {
				ytTweaks.getHotkeys()[p] = function () {
					getPlayerAndVideo();
					setVolume(player.getVolume() - settings.decreaseVolHotkeys[p]);
				};
			}
		}

		function setVolume(vol) {
			if (vol < 0) vol = 0;
			else if (vol > 100) vol = 100;

			player.setVolume(vol);
			showFeedback(vol, video.muted ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24' fill='%23fff'%3E%3Cpath d='M11.60 2.08L11.48 2.14L3.91 6.68C3.02 7.21 2.28 7.97 1.77 8.87C1.26 9.77 1.00 10.79 1 11.83V12.16L1.01 12.56C1.07 13.52 1.37 14.46 1.87 15.29C2.38 16.12 3.08 16.81 3.91 17.31L11.48 21.85C11.63 21.94 11.80 21.99 11.98 21.99C12.16 22.00 12.33 21.95 12.49 21.87C12.64 21.78 12.77 21.65 12.86 21.50C12.95 21.35 13 21.17 13 21V3C12.99 2.83 12.95 2.67 12.87 2.52C12.80 2.37 12.68 2.25 12.54 2.16C12.41 2.07 12.25 2.01 12.08 2.00C11.92 1.98 11.75 2.01 11.60 2.08ZM4.94 8.4V8.40L11 4.76V19.23L4.94 15.6C4.38 15.26 3.92 14.80 3.58 14.25C3.24 13.70 3.05 13.07 3.00 12.43L3 12.17V11.83C2.99 11.14 3.17 10.46 3.51 9.86C3.85 9.25 4.34 8.75 4.94 8.4ZM21.29 8.29L19 10.58L16.70 8.29L16.63 8.22C16.43 8.07 16.19 7.99 15.95 8.00C15.70 8.01 15.47 8.12 15.29 8.29C15.12 8.47 15.01 8.70 15.00 8.95C14.99 9.19 15.07 9.43 15.22 9.63L15.29 9.70L17.58 12L15.29 14.29C15.19 14.38 15.12 14.49 15.06 14.61C15.01 14.73 14.98 14.87 14.98 15.00C14.98 15.13 15.01 15.26 15.06 15.39C15.11 15.51 15.18 15.62 15.28 15.71C15.37 15.81 15.48 15.88 15.60 15.93C15.73 15.98 15.86 16.01 15.99 16.01C16.12 16.01 16.26 15.98 16.38 15.93C16.50 15.87 16.61 15.80 16.70 15.70L19 13.41L21.29 15.70L21.36 15.77C21.56 15.93 21.80 16.01 22.05 15.99C22.29 15.98 22.53 15.88 22.70 15.70C22.88 15.53 22.98 15.29 22.99 15.05C23.00 14.80 22.93 14.56 22.77 14.36L22.70 14.29L20.41 12L22.70 9.70C22.80 9.61 22.87 9.50 22.93 9.38C22.98 9.26 23.01 9.12 23.01 8.99C23.01 8.86 22.98 8.73 22.93 8.60C22.88 8.48 22.81 8.37 22.71 8.28C22.62 8.18 22.51 8.11 22.39 8.06C22.26 8.01 22.13 7.98 22.00 7.98C21.87 7.98 21.73 8.01 21.61 8.06C21.49 8.12 21.38 8.19 21.29 8.29Z'%3E%3C/path%3E%3C/svg%3E" : '');

			try {
				localStorage.setItem('yt-player-volume', JSON.stringify({
					data: `{\"volume\":${player.getVolume()},\"muted\":${video.muted}}`,
					expiration: Date.now() + 2592E3 * 1E3,
					creation: Date.now()
				}))
				sessionStorage.setItem('yt-player-volume', JSON.stringify({
					data: `{\"volume\":${player.getVolume()},\"muted\":${video.muted}}`,
					creation: Date.now()
				}))
			} catch { }
		}
	}

	if (settings.seekFhotkeys || settings.seekBhotkeys) {
		ytTweaks.listenForHotkeys();

		if (settings.seekFhotkeys) {
			for (const p in settings.seekFhotkeys) {
				ytTweaks.getHotkeys()[p] = function () {
					getPlayerAndVideo();
					seekTo(video.currentTime + settings.seekFhotkeys[p] * video.playbackRate);
				};
			}
		}

		if (settings.seekBhotkeys) {
			for (const p in settings.seekBhotkeys) {
				ytTweaks.getHotkeys()[p] = function () {
					getPlayerAndVideo();
					seekTo(video.currentTime - settings.seekBhotkeys[p] * video.playbackRate);
				};
			}
		}

		const seekTo = function () {
			let seekedForward;
			let amountSeeked = 0;
			let timeoutId;

			return function (time) {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function () {
					amountSeeked = 0;
				}, 1000);

				if ((seekedForward && time - video.currentTime < 0 || !seekedForward && time - video.currentTime > 0) || (video.currentTime < 1 || video.currentTime == video.duration)) {
					amountSeeked = 0;
				}

				seekedForward = time - video.currentTime > 0;
				amountSeeked = amountSeeked + Math.round(time - video.currentTime);
				video.currentTime = time;
				player.wakeUpControls();
				showFeedback((seekedForward ? '+' : '-') + formatSecToDDHHMMSS(Math.abs(amountSeeked)));
			}
		}();
	}

	if (settings.undoSeekHotkey) {
		ytTweaks.listenForHotkeys();

		let undoStack, redoStack, currPage;

		const ogDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');
		Object.defineProperty(HTMLVideoElement.prototype, 'currentTime', {
			set: function (value) {
				video = this;
				clearStacks();

				undoStack.unshift(this.currentTime);
				ogDescriptor.set.call(this, value);
			},
			get: ogDescriptor.get,
			configurable: true
		});

		ytTweaks.getHotkeys()[settings.undoSeekHotkey] = function () {
			clearStacks();
			if (!undoStack.length) return;

			redoStack.unshift(video.currentTime);
			ogDescriptor.set.call(video, undoStack[0]);
			undoStack.shift();
		}

		if (settings.redoSeekHotkey) ytTweaks.getHotkeys()[settings.redoSeekHotkey] = function () {
			clearStacks();
			if (!redoStack.length) return;

			video.currentTime = redoStack[0];
			redoStack.shift();
		}

		function clearStacks() {
			if (currPage != location.href) {
				undoStack = [];
				redoStack = [];
				currPage = location.href;
			}
		}
	}

    if (settings.numbersThenEnter || settings.numbersThenArrowKey || settings.numbersThenShift) {
		ytTweaks.listenForHotkeys();

        let timeoutId;
		let num = '';

		ytTweaks.numbersThenKey = {
			main: function (e) {
				getPlayerAndVideo();
				if (!video?.clientWidth) return;

				if (e.key != ' ' && !isNaN(e.key)) {
					e.stopImmediatePropagation();
                    timeout();

					num += e.key;
					showFeedback(num, '', 2000);
				}

				if (!num) return;

				else if (settings.numbersThenEnter && e.key == 'Enter') {
                    showFeedback(formatSecToDDHHMMSS(convertToSeconds(num)) + ' (' + (convertToSeconds(num) - video.currentTime > 0 ? '+' : '-') + formatSecToDDHHMMSS(Math.abs(convertToSeconds(num) - video.currentTime)) + ')');
					seek(e, convertToSeconds(num));
				}

				else if (settings.numbersThenArrowKey && (e.key == 'ArrowRight' || e.key == 'ArrowLeft')) {
					showFeedback((e.key == 'ArrowRight' ? '+' : '-') + formatSecToDDHHMMSS(convertToSeconds(num)));
					seek(e, video.currentTime + (e.key == 'ArrowRight' ? convertToSeconds(num) : -convertToSeconds(num)));
				}

				else if (settings.numbersThenShift && e.key == 'Shift') {
                    let formattedRate;
                    if (num[0] == '0') formattedRate = +num.replace('0', '0.');
                    else formattedRate = +num >= 100 ? +num / 100 : +num;

                    if (formattedRate > 16) formattedRate = 16;
                    else if (formattedRate < 0.08) formattedRate = 1;

                    player.setPlaybackRate(formattedRate);
                    video.playbackRate = formattedRate;
                    showFeedback(formattedRate + 'x');
                    num = '';
                    
                    try {
                        sessionStorage.setItem('yt-player-playback-rate', JSON.stringify({
                            data: formattedRate + '',
                            creation: Date.now()
                        }))
                    } catch { }
                }

                else if (e.key == 'Backspace') {
                    timeout();
					num = num.slice(0, -1);
                    showFeedback(num, '', 2000);
                }

				return true;
			},
			storageChanged: function () {
                delete ytTweaks.numbersThenKey;
			}
		};

        function timeout() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                num = '';
            }, 2000);
		}

        function seek(e, sec) {
            e.stopImmediatePropagation();
			e.preventDefault();

            video.currentTime = sec;
            player.wakeUpControls();
            num = '';
        }

		function convertToSeconds(strg) {
			const arr = strg.split('').reverse().join('').match(/\d\d|\d/g);
			let sec = 0;

			if (arr[3]) sec = +arr[3].split('').reverse().join('') * 86400;
			if (arr[2]) sec += +arr[2].split('').reverse().join('') * 3600;
			if (arr[1]) sec += +arr[1].split('').reverse().join('') * 60;
			sec += +arr[0].split('').reverse().join('');

			return sec;
		}
	}

	if (settings.toggleLoopHotkey) {
		ytTweaks.listenForHotkeys();

		const loopOnIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M3.5 13L3.29592 12.0476C2.62895 8.93509 5.00172 6 8.18494 6H19M19 6L16 9M19 6L16 3M20.5 11L20.7041 11.9524C21.3711 15.0649 18.9983 18 15.8151 18H5M5 18L8 15M5 18L8 21' stroke='%234fff75' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
		const loopOffIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M3.5 13L3.29592 12.0476C2.62895 8.93509 5.00172 6 8.18494 6H19M19 6L16 9M19 6L16 3M20.5 11L20.7041 11.9524C21.3711 15.0649 18.9983 18 15.8151 18H5M5 18L8 15M5 18L8 21' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

		ytTweaks.getHotkeys()[settings.toggleLoopHotkey] = function () {
			getPlayerAndVideo();
			video.loop = !video.loop;
			showFeedback('', video.loop ? loopOnIcon : loopOffIcon);
		}
	}
});