let data = {
  entries: [],
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-data', dataJSON);
});

const localData = JSON.parse(localStorage.getItem('code-journal-data'));
if (localData) {
  data = localData;
}

export function readEntries() {
  return data.entries;
}

export function addEntry(entry) {
  entry.entryId = data.nextEntryId++;
  data.entries.unshift(entry);
}

export function updateEntry(entry) {
  const newEntries = data.entries.map((e) =>
    e.entryId === entry.entryId ? entry : e
  );
  data.entries = newEntries;
}

export function removeEntry(entryId) {
  const updatedArray = data.entries.filter(
    (entry) => entry.entryId !== entryId
  );
  data.entries = updatedArray;
}
