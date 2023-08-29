let queryParams = new URLSearchParams(window.location.search);

let params = {};
for (let [key, value] of queryParams.entries()) {
    params[key] = value;
}

let tableHtml = '<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';

for (let [key, value] of Object.entries(params)) {
    if (key == "Timestamp") {
        let date = new Date(parseInt(value)),
        year = date.getFullYear(), 
        month = (date.getMonth() + 1).toString().padStart(2, "0"),
        day = date.getDate().toString().padStart(2, '0'),
        hours = date.getHours().toString().padStart(2, '0'),
        minutes = date.getMinutes().toString().padStart(2, '0'),
        seconds = date.getSeconds().toString().padStart(2, '0');
        value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        tableHtml += `<tr><td>${key}</td><td>${value}</td></tr>`;
    } else {
        tableHtml += `<tr><td>${key}</td><td>${value}</td></tr>`;
    }
    
}

tableHtml += '</tbody></table>';

document.body.innerHTML += tableHtml;
