async function upgradeCode() {

    const code =
        document.getElementById("inputCode").value;

    const response = await fetch(
        "http://localhost:3000/upgrade",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                code
            })
        }
    );

    const data = await response.json();

    document.getElementById("outputCode").value =
        data.result;
}

function copyCode() {

    const output =
        document.getElementById("outputCode");

    output.select();

    navigator.clipboard.writeText(
        output.value
    );

    alert("Copied!");
}
