chrome.storage.local.get().then(function (settings) {
    document.dispatchEvent(new CustomEvent('yttwStorageData', {
        detail: function (data) { try { return cloneInto(data, window) } catch { return data } }(settings)
    }));
});

chrome.storage.onChanged.addListener(handleStorageChange);

document.addEventListener('yttwSaveSetting', async function (e) {
    chrome.storage.onChanged.removeListener(handleStorageChange);
    await chrome.storage.local.set(e.detail);
    chrome.storage.onChanged.addListener(handleStorageChange);
});

async function handleStorageChange(changes) {
    document.dispatchEvent(new CustomEvent('yttwStorageChanged', {
        detail: function (data) { try { return cloneInto(data, window) } catch { return data } }({ changes: changes, settings: await chrome.storage.local.get() })
    }));
}