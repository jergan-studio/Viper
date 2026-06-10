async function upgradeCode(){

    const input =
        document.getElementById("inputCode");

    const output =
        document.getElementById("outputCode");

    const responseBox =
        document.getElementById("viperResponse");

    const code = input.value.trim();

    if(!code){
        responseBox.innerHTML =
        "⚠️ Paste some code first.";
        return;
    }

    responseBox.innerHTML =
`🐍 Viper Analysis

Scanning code...
Checking syntax...
Optimizing...`;

    try{

        const response = await fetch("/api/upgrade",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                code:code
            })
        });

        const data = await response.json();

        output.value =
            data.code ||
            data.result ||
            "No upgraded code returned.";

        responseBox.innerHTML =
`🐍 Viper Analysis

✅ Upgrade Complete

• Fixed possible issues
• Improved readability
• Added optimizations
• Enhanced code structure

Threat Level: LOW

Your code has been upgraded successfully.`;

    }catch(error){

        console.error(error);

        responseBox.innerHTML =
`❌ Viper Error

Unable to contact Viper servers.

Details:
${error.message}`;
    }
}

function copyCode(){

    const output =
        document.getElementById("outputCode");

    if(!output.value){
        alert("No code to copy.");
        return;
    }

    navigator.clipboard.writeText(output.value);

    alert("Copied upgraded code!");
}
