export async function getAllSongs() {
    const response = await fetch("/api/v1/songs");
    const json = await response.json();

    return json;
}

export async function sendVotes(votes) {
    const response = await fetch('/api/v1/vote', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(votes)
    });
}

export async function getPairs() {
    const response = await fetch("/api/v1/pairs");
    const json = await response.json();

    return json;
}

export async function getMostlyVoted() {
    const response = await fetch("/api/v1/mostlyVoted");
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Cannot get mostly voted songs. Status: ' +  response.status);
    }
}

export async function getUser() {
    const response = await fetch("/api/v1/getUser");
    const text = await response.text();

    return text;
}
